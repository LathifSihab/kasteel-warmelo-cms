export const LANGS = ['nl', 'en', 'de'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'nl';

export const PAGES = [
	{ id: 'index', route: '', name: 'Home' },
	{ id: 'zandsculpturen', route: 'zandsculpturen', name: 'Zandsculpturen' },
	{ id: 'tuinen', route: 'tuinen', name: 'Tuinen' },
	{ id: 'evenementen', route: 'evenementen', name: 'Evenementen' },
	{ id: 'horeca', route: 'horeca', name: 'Horeca' },
	{ id: 'verhuur', route: 'verhuur', name: 'Verhuur' },
	{ id: 'openingstijden', route: 'openingstijden', name: 'Bezoek' },
	{ id: 'contact', route: 'contact', name: 'Contact' }
] as const;
export type PageId = (typeof PAGES)[number]['id'];

export const isLang = (v: unknown): v is Lang => LANGS.includes(v as Lang);
export const pageById = (id: string) => PAGES.find((p) => p.id === id);
export const pageByRoute = (route: string) => PAGES.find((p) => p.route === route);

/** '/', '/zandsculpturen', '/en', '/en/zandsculpturen' */
export function pathFor(page: PageId, lang: Lang): string {
	const route = pageById(page)!.route;
	const prefix = lang === DEFAULT_LANG ? '' : '/' + lang;
	return route ? `${prefix}/${route}` : prefix || '/';
}

/** Which page and language a site path points to (null if it is not a site page). */
export function parsePath(pathname: string): { page: PageId; lang: Lang } | null {
	const parts = pathname.split('/').filter(Boolean);
	let lang: Lang = DEFAULT_LANG;
	if (parts[0] && isLang(parts[0]) && parts[0] !== DEFAULT_LANG) lang = parts.shift() as Lang;
	if (parts.length > 1) return null;
	const page = pageByRoute(parts[0] ?? '');
	return page ? { page: page.id, lang } : null;
}

/**
 * Old static-site links ('./tuinen.html#x', 'index.html') → the page id and hash.
 * Returns null for anything else (external URLs, mailto:, absolute paths…).
 */
export function parseLegacyHref(href: string): { page: PageId; hash: string } | null {
	const m = href.match(/^(?:\.\/)?([a-z-]+)\.html(#.*)?$/);
	const page = m && pageById(m[1]);
	return page ? { page: page.id, hash: m![2] ?? '' } : null;
}
