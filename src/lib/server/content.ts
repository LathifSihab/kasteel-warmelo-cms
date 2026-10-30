import type { Content } from '#lib/site/site.ts';
import { LANGS, type Lang } from '#lib/site/pages.ts';
import type { Db } from './db';

export type StoredLang = Lang | '*';
/** value null = remove the saved value, i.e. back to the original site. */
export interface Change {
	key: string;
	lang: StoredLang;
	value: string | null;
}

interface Row {
	key: string;
	lang: StoredLang;
	value: string | null;
}

export const isStoredLang = (l: unknown): l is StoredLang => l === '*' || LANGS.includes(l as Lang);

function apply(content: Content, rows: Row[]): Content {
	for (const { key, lang, value } of rows) {
		if (lang === '*') {
			if (value === null) delete content.values[key];
			else content.values[key] = value;
		} else {
			const t = (content.texts[key] ??= {});
			if (value === null) delete t[lang];
			else t[lang] = value;
		}
	}
	return content;
}

/** Published content, plus this admin session's drafts when previewing. */
export async function loadContent(db: Db, draftSid?: string): Promise<Content> {
	const content = apply(
		{ texts: {}, values: {} },
		await db.query<Row>('select key, lang, value from content')
	);
	if (draftSid) apply(content, await loadDrafts(db, draftSid));
	return content;
}

export function loadDrafts(db: Db, sid: string): Promise<Row[]> {
	return db.query<Row>('select key, lang, value from drafts where sid = $1 order by updated_at', [
		sid
	]);
}

export async function saveDrafts(db: Db, sid: string, changes: Change[]): Promise<void> {
	if (!changes.length) return;
	await db.transaction(
		changes.map((c) => ({
			text: `insert into drafts (sid, key, lang, value) values ($1, $2, $3, $4)
				on conflict (sid, key, lang) do update set value = excluded.value, updated_at = now()`,
			params: [sid, c.key, c.lang, c.value]
		}))
	);
}

/** Publishes the session's drafts in one transaction, recording each change. Returns how many. */
export async function publishDrafts(db: Db, sid: string): Promise<number> {
	const drafts = await loadDrafts(db, sid);
	if (!drafts.length) return 0;
	const statements = drafts.flatMap((d) => [
		{
			text: `insert into content_history (key, lang, old_value, new_value)
				values ($1, $2, (select value from content where key = $1 and lang = $2), $3)`,
			params: [d.key, d.lang, d.value]
		},
		d.value === null
			? { text: 'delete from content where key = $1 and lang = $2', params: [d.key, d.lang] }
			: {
					text: `insert into content (key, lang, value) values ($1, $2, $3)
						on conflict (key, lang) do update set value = excluded.value, updated_at = now()`,
					params: [d.key, d.lang, d.value]
				}
	]);
	statements.push({ text: 'delete from drafts where sid = $1', params: [sid] });
	await db.transaction(statements);
	return drafts.length;
}

export async function discardDrafts(db: Db, sid: string): Promise<void> {
	await db.query('delete from drafts where sid = $1', [sid]);
}
