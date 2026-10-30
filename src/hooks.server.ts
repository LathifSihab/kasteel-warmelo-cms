import { error, redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit/hooks';
import { readSession, SESSION_COOKIE } from '#lib/server/auth.ts';
import { isLang, parseLegacyHref, parsePath, pathFor, DEFAULT_LANG } from '#lib/site/pages.ts';

export const handle: Handle = async ({ event, resolve }) => {
	const { url } = event;

	// Old static URLs: /tuinen.html?lang=en → /en/tuinen, /nl/… → /…
	const legacy = parseLegacyHref(url.pathname.slice(1));
	if (legacy || url.pathname === '/nl' || url.pathname.startsWith('/nl/')) {
		const lang = url.searchParams.get('lang');
		const target = legacy
			? pathFor(legacy.page, isLang(lang) ? lang : DEFAULT_LANG)
			: url.pathname.slice(3) || '/';
		redirect(301, target);
	}
	if (url.searchParams.has('lang')) {
		const site = parsePath(url.pathname);
		const lang = url.searchParams.get('lang');
		if (site && isLang(lang)) redirect(301, pathFor(site.page, lang));
	}

	event.locals.session = await readSession(event.cookies.get(SESSION_COOKIE));

	// Admin writes must come from the admin itself (JSON endpoints aren't covered by SvelteKit's form CSRF check)
	if (url.pathname.startsWith('/admin') && !['GET', 'HEAD'].includes(event.request.method)) {
		if (event.request.headers.get('origin') !== url.origin)
			error(403, 'Cross-site request blocked');
	}

	const lang = parsePath(url.pathname)?.lang ?? DEFAULT_LANG;
	const response = await resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});

	response.headers.set('x-content-type-options', 'nosniff');
	response.headers.set('referrer-policy', 'strict-origin-when-cross-origin');
	response.headers.set('x-frame-options', 'SAMEORIGIN');
	if (url.pathname.startsWith('/admin') || url.searchParams.has('preview')) {
		response.headers.set('cache-control', 'no-store');
		response.headers.set('x-robots-tag', 'noindex');
	}
	return response;
};
