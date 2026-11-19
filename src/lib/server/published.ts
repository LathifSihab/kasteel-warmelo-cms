import { env, waitUntil } from 'cloudflare:workers';
import type { Content } from '#lib/site/site.ts';
import { loadContent } from './content.ts';
import type { Db } from './db/types.ts';

const KEY = 'published';

/**
 * Published content for the public pages, kept in Workers KV (binding CONTENT) so
 * visitors never wake the database: on Neon's Free plan every query keeps the
 * compute running for five more minutes. The admin refreshes it when it publishes
 * and whenever it loads; only a miss (a new deploy) reads the database.
 */
export async function publishedContent(getDb: () => Promise<Db>): Promise<Content> {
	const cached = await env.CONTENT.get<Content>(KEY, { type: 'json' });
	if (cached) return cached;
	const content = await loadContent(await getDb());
	waitUntil(env.CONTENT.put(KEY, JSON.stringify(content)));
	return content;
}

/** Stores what is published now; visitors see it within a minute (KV's edge cache). */
export async function refreshPublished(db: Db, content?: Content): Promise<void> {
	await env.CONTENT.put(KEY, JSON.stringify(content ?? (await loadContent(db))));
}
