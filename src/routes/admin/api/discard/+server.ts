import { json } from '@sveltejs/kit';
import { discardDrafts } from '#lib/server/content.ts';
import { getDb } from '#lib/server/db/index.ts';
import { requireSession } from '#lib/server/guard.ts';
import type { RequestHandler } from './$types';

/** Throws away this session's unpublished edits. */
export const POST: RequestHandler = async ({ locals }) => {
	const { sid } = requireSession(locals);
	await discardDrafts(await getDb(), sid);
	return json({ ok: true });
};
