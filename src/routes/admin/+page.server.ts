import { loadContent, loadDrafts } from '#lib/server/content.ts';
import { getDb } from '#lib/server/db/index.ts';
import { requireSession } from '#lib/server/guard.ts';
import { storageConfigured } from '#lib/server/storage.ts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const { sid } = requireSession(locals);
	const db = await getDb();
	const [published, drafts, [{ n }]] = await Promise.all([
		loadContent(db),
		loadDrafts(db, sid),
		db.query<{ n: number }>('select count(*)::int as n from messages where read_at is null')
	]);
	return { published, drafts, unread: n, storage: storageConfigured() };
};
