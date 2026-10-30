// Database commands (run outside SvelteKit):
//
//   npm run db:migrate      apply pending migrations to DATABASE_URL (Neon),
//                           or to the local PGlite database when DATABASE_URL is empty
import { migrate } from '../src/lib/server/db/migrations.ts';
import { createNeonDb } from '../src/lib/server/db/neon.ts';
import { createPgliteDb } from '../src/lib/server/db/pglite.ts';
import type { Db } from '../src/lib/server/db/types.ts';

export function connect(): { db: Db; where: string } {
	const url = process.env.DATABASE_URL;
	if (url) return { db: createNeonDb(url), where: 'Neon (' + new URL(url).host + ')' };
	return { db: createPgliteDb('.data/pglite'), where: 'local PGlite (.data/pglite)' };
}

if (import.meta.main) {
	const [command] = process.argv.slice(2);
	if (command !== 'migrate') {
		console.error('usage: tsx scripts/db.ts migrate');
		process.exit(1);
	}
	const { db, where } = connect();
	console.log('Database:', where);
	const n = await migrate(db, (m) => console.log('  ' + m));
	console.log(n ? `${n} migration(s) applied` : 'Up to date');
	await db.close?.();
}
