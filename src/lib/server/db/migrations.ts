import type { Db } from './types';

/** Append only. Each migration runs once, in order, inside a transaction. */
export const MIGRATIONS: { id: string; sql: string[] }[] = [
	{
		id: '001_init',
		sql: [
			// Saved content. lang is nl/en/de for translated texts, '*' for neutral values.
			`create table content (
				key text not null,
				lang text not null check (lang in ('nl', 'en', 'de', '*')),
				value text not null,
				updated_at timestamptz not null default now(),
				primary key (key, lang)
			)`,
			// Every published change, for undo and "who changed what when".
			`create table content_history (
				id bigserial primary key,
				key text not null,
				lang text not null,
				old_value text,
				new_value text,
				changed_at timestamptz not null default now()
			)`,
			`create index content_history_key on content_history (key, lang, changed_at desc)`,
			// Unpublished edits per admin session. value null = back to the original.
			`create table drafts (
				sid text not null,
				key text not null,
				lang text not null check (lang in ('nl', 'en', 'de', '*')),
				value text,
				updated_at timestamptz not null default now(),
				primary key (sid, key, lang)
			)`,
			`create table media (
				id uuid primary key,
				object_key text not null unique,
				filename text not null,
				content_type text not null,
				size integer not null,
				created_at timestamptz not null default now()
			)`,
			`create table messages (
				id bigserial primary key,
				name text not null,
				email text not null,
				phone text not null default '',
				subject text not null default '',
				message text not null,
				created_at timestamptz not null default now(),
				read_at timestamptz
			)`,
			`create table rate_limits (
				bucket text not null,
				at timestamptz not null default now()
			)`,
			`create index rate_limits_bucket on rate_limits (bucket, at)`
		]
	}
];

export async function migrate(db: Db, log: (msg: string) => void = () => {}): Promise<number> {
	await db.query(`create table if not exists schema_migrations (
		id text primary key,
		applied_at timestamptz not null default now()
	)`);
	const done = new Set(
		(await db.query<{ id: string }>('select id from schema_migrations')).map((r) => r.id)
	);
	let applied = 0;
	for (const m of MIGRATIONS) {
		if (done.has(m.id)) continue;
		await db.transaction([
			...m.sql.map((text) => ({ text })),
			{ text: 'insert into schema_migrations (id) values ($1)', params: [m.id] }
		]);
		log('applied ' + m.id);
		applied++;
	}
	return applied;
}
