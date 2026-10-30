// Checks the SvelteKit site against the original static site, page by page and
// language by language: visible text, image sources and link targets.
//
//   node scripts/legacy/parity.mjs ../Warmelo http://localhost:5180
//
// Known, intended differences are listed in EXPECTED and reported separately.
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';

const SRC = path.resolve(process.argv[2] ?? '../Warmelo');
const BASE = process.argv[3] ?? 'http://localhost:5180';
const PAGES = [
	'index',
	'zandsculpturen',
	'tuinen',
	'evenementen',
	'horeca',
	'verhuur',
	'openingstijden',
	'contact'
];
const LANGS = ['nl', 'en', 'de'];
const route = (page, lang) =>
	(lang === 'nl' ? '' : '/' + lang) + (page === 'index' ? '' : '/' + page) || '/';

// Intended changes, as [page or '*', region, old substring, new substring]
const EXPECTED = [
	// the child price on Zandsculpturen now comes from "Seizoen & prijzen" (was stuck in the translation)
	['zandsculpturen', 'main', '€ 4,00', '€ 4'],
	['zandsculpturen', 'main', '€ 4.00', '€ 4'],
	// the map caption shows the shared entrance address, so editing it updates this too
	['openingstijden', 'main', 'Borculoseweg · Diepenheim', 'Borculoseweg, Diepenheim']
];

// Svelte drops whitespace-only text between table cells and <option>s; browsers don't render it either
const squash = (s) => s.replace(/\s+/g, '');

const i18n = fs.readFileSync(path.join(SRC, 'assets/js/i18n.min.js'), 'utf8');
const norm = (s) => s.replace(/\s+/g, ' ').trim();

function oldPage(page, lang) {
	const html = fs
		.readFileSync(path.join(SRC, page + '.html'), 'utf8')
		.replace(/<script[\s\S]*?<\/script>/g, '');
	const w = new JSDOM(html, {
		runScripts: 'outside-only',
		url: `https://old.test/${page}.html?lang=${lang}`
	}).window;
	w.eval(i18n);
	w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
	return w.document;
}

async function newPage(page, lang) {
	const res = await fetch(BASE + route(page, lang));
	if (!res.ok) throw new Error(`${route(page, lang)}: HTTP ${res.status}`);
	return new JSDOM(await res.text()).window.document;
}

// old './tuinen.html#x' → new '/en/tuinen#x'; asset paths made absolute
function mapHref(href, lang) {
	const m = href?.match(/^(?:\.\/)?([a-z-]+)\.html(#.*)?$/);
	if (m) return route(m[1], lang) + (m[2] ?? '');
	return href?.replace(/^(\.\/)?assets\//, '/assets/');
}

function regions(doc, side, lang) {
	const pick = (sel) => [...doc.querySelectorAll(sel)];
	const top = doc.body.querySelector(':scope > div[style*="contents"]') ?? doc.body; // SvelteKit's wrapper
	const body = [...top.children].filter(
		(el) => !el.matches('script, #loader, nav.nav, .nav__overlay, footer, #lightbox')
	);
	const describe = (els) => ({
		text: norm(els.map((e) => e.textContent).join(' ')),
		imgs: els.flatMap((e) =>
			[...e.querySelectorAll('img, source')].map((i) => mapHref(i.getAttribute('src'), lang))
		),
		// language switches are links now (one URL per language) instead of buttons
		links: els.flatMap((e) =>
			[...e.querySelectorAll('a[href]:not(.lang-btn)')].map((a) =>
				side === 'old' ? mapHref(a.getAttribute('href'), lang) : a.getAttribute('href')
			)
		)
	});
	return {
		nav: describe(pick('nav.nav, .nav__overlay')),
		main: describe(body),
		footer: describe(pick('footer'))
	};
}

let problems = 0,
	expected = 0,
	whitespace = 0;
const footerOld = {};
for (const lang of LANGS) footerOld[lang] = regions(oldPage('index', lang), 'old', lang).footer;

for (const page of PAGES) {
	for (const lang of LANGS) {
		const o = regions(oldPage(page, lang), 'old', lang);
		const n = regions(await newPage(page, lang), 'new', lang);
		o.footer = footerOld[lang]; // every page now uses the home page footer
		for (const region of ['nav', 'main', 'footer']) {
			let ot = o[region].text;
			for (const [p, r, from, to] of EXPECTED) {
				if (
					(p === '*' || p === page) &&
					r === region &&
					ot.includes(from) &&
					n[region].text.includes(to)
				) {
					ot = ot.split(from).join(to);
					expected++;
				}
			}
			if (ot !== n[region].text && squash(ot) === squash(n[region].text)) {
				whitespace++;
			} else if (ot !== n[region].text) {
				problems++;
				const i = [...ot].findIndex((ch, k) => ch !== n[region].text[k]);
				console.log(
					`✗ ${page} ${lang} ${region} text differs at ${i}:\n   old …${ot.slice(Math.max(0, i - 40), i + 60)}\n   new …${n[region].text.slice(Math.max(0, i - 40), i + 60)}`
				);
			}
			for (const kind of ['imgs', 'links']) {
				if (JSON.stringify(o[region][kind]) !== JSON.stringify(n[region][kind])) {
					problems++;
					const k = o[region][kind].findIndex((v, j) => v !== n[region][kind][j]);
					console.log(
						`✗ ${page} ${lang} ${region} ${kind} differ at #${k}: old ${o[region][kind][k]} / new ${n[region][kind][k]} (counts ${o[region][kind].length}/${n[region][kind].length})`
					);
				}
			}
		}
	}
}
console.log(
	problems
		? `${problems} differences`
		: `identical: ${PAGES.length} pages × ${LANGS.length} languages (nav, content, footer: text, images, links)`,
	`| ${expected} intended differences | ${whitespace} regions differ only in whitespace between table cells/options`
);
process.exit(problems ? 1 : 0);
