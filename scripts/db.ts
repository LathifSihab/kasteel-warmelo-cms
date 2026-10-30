// Database commands (run outside SvelteKit):
//
//   npm run db:migrate      apply pending migrations to DATABASE_URL (Neon),
//                           or to the local PGlite database when DATABASE_URL is empty
//   npm run db:app-role     create the "warmelo_app" role the Worker connects as (or give it
//                           a new password): read/write on the app's tables, no schema changes,
//                           no roles. Writes its pooled connection string to .env as
//                           APP_DATABASE_URL. Re-running it rotates the password, so update the
//                           Worker's DATABASE_URL secret afterwards (see README → Cloudflare).
import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { migrate } from '../src/lib/server/db/migrations.ts';
import { createNeonDb } from '../src/lib/server/db/neon.ts';
import { createPgliteDb } from '../src/lib/server/db/pglite.ts';
import type { Db } from '../src/lib/server/db/types.ts';

export const APP_ROLE = 'warmelo_app';

export function connect(): { db: Db; where: string } {
	const url = process.env.DATABASE_URL;
	if (url) return { db: createNeonDb(url), where: 'Neon (' + new URL(url).host + ')' };
	return { db: createPgliteDb('.data/pglite'), where: 'local PGlite (.data/pglite)' };
}

/** Creates or updates the app role; returns its connection string (same host as `ownerUrl`). */
async function appRole(db: Db, ownerUrl: string): Promise<string> {
	const password = randomBytes(32).toString('base64url'); // no quotes or backslashes
	const [{ exists, database, owner }] = await db.query<{
		exists: boolean;
		database: string;
		owner: string;
	}>(
		`select exists (select 1 from pg_roles where rolname = $1) as exists,
			current_database() as database, current_user as owner`,
		[APP_ROLE]
	);
	const role = `"${APP_ROLE}"`;
	await db.transaction(
		[
			`${exists ? 'alter' : 'create'} role ${role} with login password '${password}'`,
			`grant connect on database "${database}" to ${role}`,
			`grant usage on schema public to ${role}`,
			`grant select, insert, update, delete on all tables in schema public to ${role}`,
			`grant usage, select on all sequences in schema public to ${role}`,
			// tables that later migrations create (they run as the owner)
			`alter default privileges for role "${owner}" in schema public
				grant select, insert, update, delete on tables to ${role}`,
			`alter default privileges for role "${owner}" in schema public
				grant usage, select on sequences to ${role}`
		].map((text) => ({ text }))
	);
	const url = new URL(ownerUrl);
	url.username = APP_ROLE;
	url.password = password;
	return url.toString();
}

/** Sets KEY=value in an env file, keeping every other line. */
function setEnv(file: string, key: string, value: string): void {
	const lines = existsSync(file) ? readFileSync(file, 'utf8').split(/\r?\n/) : [];
	const i = lines.findIndex((l) => l.startsWith(key + '='));
	if (i >= 0) lines[i] = `${key}=${value}`;
	else lines.splice(lines.at(-1) === '' ? -1 : lines.length, 0, `${key}=${value}`);
	writeFileSync(file, lines.join('\n').replace(/\n*$/, '\n'));
}

if (import.meta.main) {
	const [command] = process.argv.slice(2);
	if (command === 'migrate') {
		const { db, where } = connect();
		console.log('Database:', where);
		const n = await migrate(db, (m) => console.log('  ' + m));
		console.log(n ? `${n} migration(s) applied` : 'Up to date');
		await db.close?.();
	} else if (command === 'app-role') {
		const url = process.env.DATABASE_URL;
		if (!url) {
			console.error('DATABASE_URL (the owner connection string) must be set');
			process.exit(1);
		}
		const { db, where } = connect();
		console.log('Database:', where);
		setEnv('.env', 'APP_DATABASE_URL', await appRole(db, url));
		console.log(`Role ${APP_ROLE} ready; its connection string is in .env as APP_DATABASE_URL`);
	} else {
		console.error('usage: tsx scripts/db.ts migrate | app-role');
		process.exit(1);
	}
}
