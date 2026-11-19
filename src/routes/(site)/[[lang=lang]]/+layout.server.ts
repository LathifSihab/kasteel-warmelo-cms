import { error } from '@sveltejs/kit';
import { getDb } from '#lib/server/db/index.ts';
import { loadContent } from '#lib/server/content.ts';
import { publishedContent } from '#lib/server/published.ts';
import { parsePath } from '#lib/site/pages.ts';
import { todayInNL } from '#lib/site/season.ts';
import type { LayoutServerLoad } from './$types';

// Public pages are plain server-rendered HTML; the original site script does the rest.
export const csr = false;

export const load: LayoutServerLoad = async ({ url, locals }) => {
	const at = parsePath(url.pathname);
	if (!at) error(404);
	const preview = url.searchParams.has('preview') && !!locals.session;
	return {
		...at,
		preview,
		origin: url.origin,
		today: todayInNL(),
		// visitors: from KV, without waking the database; the preview needs this session's drafts
		content: preview
			? await loadContent(await getDb(), locals.session!.sid)
			: await publishedContent(getDb)
	};
};
