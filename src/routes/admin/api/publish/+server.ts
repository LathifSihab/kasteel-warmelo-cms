import { json } from '@sveltejs/kit';
import { publishDrafts } from '#lib/server/content.ts';
import { getDb } from '#lib/server/db/index.ts';
import { requireSession } from '#lib/server/guard.ts';
import { refreshPublished } from '#lib/server/published.ts';
import type { RequestHandler } from './$types';

/** Makes this session's drafts live for every visitor. */
export const POST: RequestHandler = async ({ locals }) => {
	const { sid } = requireSession(locals);
	const db = await getDb();
	const published = await publishDrafts(db, sid);
	await refreshPublished(db);
	return json({ ok: true, published });
};
