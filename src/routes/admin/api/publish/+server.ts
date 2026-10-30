import { json } from '@sveltejs/kit';
import { publishDrafts } from '#lib/server/content.ts';
import { getDb } from '#lib/server/db/index.ts';
import { requireSession } from '#lib/server/guard.ts';
import type { RequestHandler } from './$types';

/** Makes this session's drafts live for every visitor. */
export const POST: RequestHandler = async ({ locals }) => {
	const { sid } = requireSession(locals);
	return json({ ok: true, published: await publishDrafts(await getDb(), sid) });
};
