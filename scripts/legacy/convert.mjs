// One-off migration: converts the static Warmelo site into this SvelteKit app.
//
//   node scripts/legacy/convert.mjs ../Warmelo
//
// Writes
//   src/lib/site/components/{Nav,Footer,Loader,Lightbox}.svelte   shared chrome (from index.html)
//   src/routes/(site)/[[lang=lang]]/**/+page.svelte               one component per page
//   src/lib/content/defaults.json                                 original texts (nl/en/de) and values
//   src/lib/content/fields.json                                   what the admin can edit, grouped per section
//
// Every editable spot in the old markup (data-i18n, data-cms*, images, videos,
// internal links…) becomes a call on the page's `c` (Site) object, so content
// comes from the database with the original as fallback.
import fs from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';

const SRC = path.resolve(process.argv[2] ?? '../Warmelo');
const OUT = path.resolve(import.meta.dirname, '../..');

const PAGES = [
	{ id: 'index', route: '', name: 'Home' },
	{ id: 'zandsculpturen', route: 'zandsculpturen', name: 'Zandsculpturen' },
	{ id: 'tuinen', route: 'tuinen', name: 'Tuinen' },
	{ id: 'evenementen', route: 'evenementen', name: 'Evenementen' },
	{ id: 'horeca', route: 'horeca', name: 'Horeca' },
	{ id: 'verhuur', route: 'verhuur', name: 'Verhuur' },
	{ id: 'openingstijden', route: 'openingstijden', name: 'Bezoek' },
	{ id: 'contact', route: 'contact', name: 'Contact' }
];

const CONTACT_LABELS = {
	name: 'Naam',
	street: 'Straat en huisnummer',
	city: 'Postcode en plaats',
	entrance: 'Ingang & parkeren',
	phone: 'Telefoon',
	email: 'E-mail'
};
const LINK_LABELS = {
	facebook: 'Facebook',
	instagram: 'Instagram',
	'airbnb-orangerie': 'Airbnb — De Orangerie',
	'airbnb-rentmeester': 'Airbnb — Rentmeesterwoning'
};

const read = (f) => fs.readFileSync(path.join(SRC, f), 'utf8');
const write = (f, s) => {
	const p = path.join(OUT, f);
	fs.mkdirSync(path.dirname(p), { recursive: true });
	fs.writeFileSync(p, s);
	console.log('wrote', f);
};
const norm = (s) => String(s).replace(/\s+/g, ' ').trim();
// visible text, without soft hyphens (they would break the admin search)
const plain = (html) =>
	norm(
		new JSDOM(
			`<p>${String(html).replace(/<br\s*\/?>/gi, ' ')}</p>`
		).window.document.body.textContent.replace(/\u00ad/g, '')
	);
const asset = (p) => p.replace(/^(\.\/)?assets\//, '/assets/');

// Inline styles are split as text: jsdom's CSS parser drops values it doesn't know, like clamp().
const parseStyle = (s) =>
	new Map(
		(s ?? '')
			.split(/;(?![^(]*\))/)
			.map((d) => d.trim())
			.filter(Boolean)
			.map((d) => [
				d.slice(0, d.indexOf(':')).trim().toLowerCase(),
				d.slice(d.indexOf(':') + 1).trim()
			])
	);
const styleText = (map) => [...map].map(([k, v]) => `${k}:${v};`).join('');
const q = (s) => JSON.stringify(s);

// ── original dictionary (assets/js/i18n.min.js) ──────────────────────────────
const dict = Function(
	'return ' + read('assets/js/i18n.min.js').match(/var e=(\{nl:[\s\S]*?\}\});function n\(/)[1]
)();

// ── fixups for markup the old runtime handled badly ──────────────────────────
// sand.kids.price.line was one translated string with the child price baked in,
// so the CMS price (data-cms="price-kind") inside it was overwritten on load.
// Split it into translated labels around the shared price.
const KIDS_LINE = {
	'sand.kids.price.child': {
		nl: 'Kinderen 6–12 jaar',
		en: 'Children 6–12 yrs',
		de: 'Kinder 6–12 Jahre'
	},
	'sand.kids.price.under6': {
		nl: 'Kinderen &lt; 6 jaar',
		en: 'Children &lt; 6 yrs',
		de: 'Kinder &lt; 6 Jahre'
	},
	'sand.kids.price.free': { nl: 'Gratis', en: 'Free', de: 'Kostenlos' }
};
for (const [k, t] of Object.entries(KIDS_LINE))
	for (const l of ['nl', 'en', 'de']) dict[l][k] = t[l];

function fixup(doc) {
	const line = doc.querySelector('[data-i18n="sand.kids.price.line"]');
	if (line) {
		line.removeAttribute('data-i18n');
		line.innerHTML =
			'<span data-i18n="sand.kids.price.child">Kinderen 6–12 jaar</span> &nbsp;&nbsp; ' +
			'<strong style="color:var(--gold-bright);" data-cms="price-kind">€ 4</strong><br>' +
			'<span data-i18n="sand.kids.price.under6">Kinderen &lt; 6 jaar</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ' +
			'<strong style="color:rgba(120,220,120,.9);" data-i18n="sand.kids.price.free">Gratis</strong>';
	}
	// Anything else tagged inside a translated text was always overwritten by the
	// translation on the live site (e.g. season-label in events.agenda.label): keep the translation.
	for (const inner of doc.querySelectorAll('[data-i18n] [data-cms]')) {
		console.log(
			'  unwrap',
			inner.getAttribute('data-cms'),
			'inside',
			inner.closest('[data-i18n]').getAttribute('data-i18n')
		);
		inner.replaceWith(...inner.childNodes);
	}
}

// ── collected output ─────────────────────────────────────────────────────────
const defaults = { texts: {}, values: {} };
const shared = new Map(); // section id → section
const pageSections = {}; // page id → Map
const seen = new Set(); // field keys already listed (per scope)

function sharedSection(id, title) {
	if (!shared.has(id)) shared.set(id, { id, title, fields: [] });
	return shared.get(id);
}

function addText(key, fallbackHtml) {
	if (defaults.texts[key]) return;
	const t = {};
	for (const l of ['nl', 'en', 'de']) if (dict[l][key] != null) t[l] = norm(dict[l][key]);
	if (t.nl == null) t.nl = norm(fallbackHtml);
	defaults.texts[key] = t;
}
const isRich = (key) =>
	Object.values(defaults.texts[key]).some((v) => /<(br|em|strong|span)\b/i.test(v));

function addField(section, scope, field) {
	const id = scope + '|' + field.key;
	if (seen.has(id)) return;
	seen.add(id);
	section.fields.push(field);
}

function textLabel(el) {
	const tag = el.tagName;
	if (el.closest('nav, .nav__overlay')) return 'Menu-item';
	if (tag === 'H1') return 'Hoofdtitel';
	if (tag === 'H2') return 'Titel';
	if (/^H[3-6]$/.test(tag)) return 'Subtitel';
	if (el.closest('li')) return 'Opsommingspunt';
	if (el.closest('a')) return 'Linktekst';
	if (tag === 'P' || norm(el.textContent).length > 90) return 'Tekst';
	return 'Label';
}

// ── convert one fragment of markup into Svelte ───────────────────────────────
function convert(root, ctx) {
	const doc = root.ownerDocument;
	const exprs = [];
	const tok = (expr) => '@@' + (exprs.push(expr) - 1) + '@@';
	const sectionOf = ctx.sectionOf;
	const imgIds = ctx.imgIds;

	for (const el of [root, ...root.querySelectorAll('*')]) {
		if (el !== root && !root.contains(el)) continue; // replaced by an ancestor

		// language buttons → links to the same page in that language
		if (el.matches('button.lang-btn')) {
			const l = el.getAttribute('data-lang');
			const a = doc.createElement('a');
			a.setAttribute('class', tok(`c.lang === ${q(l)} ? "lang-btn active" : "lang-btn"`));
			a.setAttribute('href', tok(`c.langHref(${q(l)})`));
			a.setAttribute('hreflang', l);
			a.textContent = el.textContent;
			el.replaceWith(a);
			continue;
		}

		// ── attributes ──
		if (el.hasAttribute('data-i18n-placeholder')) {
			const k = el.getAttribute('data-i18n-placeholder');
			addText(k, el.getAttribute('placeholder') ?? '');
			addField(sectionOf(el), ctx.scope, {
				key: k,
				type: 'text',
				label: 'Invulveld (voorbeeldtekst)'
			});
			el.setAttribute('placeholder', tok(`c.plain(${q(k)})`));
			el.removeAttribute('data-i18n-placeholder');
		}

		if (el.hasAttribute('data-cms-btn')) {
			const id = el.getAttribute('data-cms-btn');
			const def = el.getAttribute('href');
			const labelEl = el.matches('[data-i18n]') ? el : el.querySelector('[data-i18n]');
			const lk = labelEl.getAttribute('data-i18n');
			addText(lk, labelEl.innerHTML);
			const inFooter = !!el.closest('footer');
			const section = inFooter ? sharedSection('footer-links', 'Footerlinks') : sectionOf(el);
			addField(section, ctx.scope, {
				key: 'btn:' + id,
				type: 'button',
				label: plain(defaults.texts[lk].nl),
				labelKey: lk,
				default: def,
				seasonal: !inFooter
			});
			el.setAttribute('href', tok(`c.btnHref(${q(id)}, ${q(def)})`));
			el.setAttribute('data-edit', tok(`c.edit(${q('btn:' + id)})`));
			const hideOn = el.parentElement.tagName === 'LI' ? el.parentElement : el;
			hideOn.setAttribute('style:display', tok(`c.btnHidden(${q(id)}) ? "none" : undefined`));
			labelEl.innerHTML = tok(`@html c.btnLabel(${q(id)}, ${q(lk)})`);
			labelEl.removeAttribute('data-i18n');
			el.removeAttribute('data-cms-btn');
		} else if (el.hasAttribute('data-cms-link')) {
			const id = el.getAttribute('data-cms-link');
			const def = el.getAttribute('href');
			addField(sharedSection('links', 'Links'), 'shared', {
				key: 'link:' + id,
				type: 'link',
				label: LINK_LABELS[id] ?? id,
				default: def
			});
			defaults.values['link:' + id] ??= def;
			el.setAttribute('href', tok(`c.link(${q(id)})`));
			el.removeAttribute('data-cms-link');
		} else if (el.matches('a[href]')) {
			const href = el.getAttribute('href');
			if (/^(\.\/)?[a-z-]+\.html(#.*)?$/.test(href)) {
				if (el.closest('.nav__links, .nav__overlay') || el.matches('.nav__cta')) {
					const cls = (el.getAttribute('class') ?? '').replace(/\bactive\b/, '').trim();
					el.setAttribute('class', tok(`c.navClass(${q(href)}, ${q(cls)})`));
					el.setAttribute('aria-current', tok(`c.isCurrent(${q(href)}) ? "page" : undefined`));
				}
				el.setAttribute('href', tok(`c.href(${q(href)})`));
			}
		}

		if (el.hasAttribute('data-cms-contact')) {
			const k = el.getAttribute('data-cms-contact');
			defaults.values['contact:' + k] ??= norm(el.textContent);
			addField(sharedSection('contact', 'Contactgegevens'), 'shared', {
				key: 'contact:' + k,
				type: 'value',
				label: CONTACT_LABELS[k] ?? k
			});
			if (el.matches('a[href^="tel:"], a[href^="mailto:"]'))
				el.setAttribute('href', tok(`c.contactHref(${q(k)})`));
			el.setAttribute('data-edit', tok(`c.edit(${q('contact:' + k)})`));
			el.textContent = tok(`c.contact(${q(k)})`);
			el.removeAttribute('data-cms-contact');
			continue;
		}

		if (el.matches('img') && !el.closest('nav, .nav__overlay, footer, #loader')) {
			const src = asset(el.getAttribute('src'));
			// one id per spot on the page, even when the same photo is used twice (each spot has its own crop)
			const name =
				el.getAttribute('data-cms-img') ??
				`${ctx.scope}-${path
					.basename(src)
					.replace(/\.[^.]+$/, '')
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, '-')}`;
			let id = name;
			for (let n = 2; imgIds.has(id); n++) id = `${name}-${n}`;
			imgIds.set(id, src);
			defaults.values['img:' + id] ??= src;
			addField(sectionOf(el), ctx.scope, {
				key: 'img:' + id,
				type: 'image',
				label: 'Afbeelding' + (el.getAttribute('alt') ? ': ' + el.getAttribute('alt') : '')
			});
			el.setAttribute('src', tok(`c.img(${q(id)})`));
			el.setAttribute('data-edit', tok(`c.edit(${q('img:' + id)})`));
			// Crop settings (object-position, the old CMS's --cms-scale, the frame's height) move out
			// of the markup into the image's default fit, so the editor starts from and resets to
			// the original. The rest of the inline style stays as it was.
			const imgStyle = parseStyle(el.getAttribute('style'));
			const pos = imgStyle.get('object-position');
			const scale = parseFloat(imgStyle.get('--cms-scale')) || undefined;
			for (const p of ['object-position', '--cms-scale', '--cms-scale-hover', '--cms-origin'])
				imgStyle.delete(p);
			const base = styleText(imgStyle);
			const box = el.closest('.gallery__item, .zoom');
			const boxStyle = parseStyle(box?.getAttribute('style'));
			const height = boxStyle.get('height');
			const fit = {
				...(pos ? { pos } : {}),
				...(scale ? { scale } : {}),
				...(height ? { height } : {})
			};
			if (Object.keys(fit).length) defaults.values['fit:' + id] ??= JSON.stringify(fit);
			el.setAttribute(
				'style',
				tok(base ? `c.imgStyle(${q(id)}, ${q(base)})` : `c.imgStyle(${q(id)})`)
			);
			const cls = (el.getAttribute('class') ?? '').replace(/\bcms-scaled\b/, '').trim();
			el.setAttribute('class', tok(`c.imgClass(${q(id)}, ${q(cls)})`));
			if (box) {
				boxStyle.delete('height');
				if (boxStyle.size) box.setAttribute('style', styleText(boxStyle));
				else box.removeAttribute('style');
				box.setAttribute('style:height', tok(`c.imgHeight(${q(id)})`));
			}
			const lb = el.closest('[data-lightbox]');
			if (lb && asset(lb.getAttribute('data-lightbox')) === src)
				lb.setAttribute('data-lightbox', tok(`c.img(${q(id)})`));
			el.removeAttribute('data-cms-img');
		}

		const bgMatch = (el.getAttribute('style') ?? '').match(
			/background-image:\s*url\('([^']+)'\);?/
		);
		if (bgMatch) {
			const id = `${ctx.scope}-bg-${path
				.basename(bgMatch[1])
				.replace(/\.[^.]+$/, '')
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')}`;
			defaults.values['img:' + id] ??= asset(bgMatch[1]);
			addField(sectionOf(el), ctx.scope, {
				key: 'img:' + id,
				type: 'image',
				label: 'Achtergrondafbeelding'
			});
			const rest = el.getAttribute('style').replace(bgMatch[0], '').trim();
			if (rest) el.setAttribute('style', rest);
			else el.removeAttribute('style');
			el.setAttribute('style:background-image', tok(`c.bg(${q(id)})`));
			el.setAttribute('data-edit', tok(`c.edit(${q('img:' + id)})`));
		}

		if (el.matches('video')) {
			const id = el.getAttribute('data-cms-vid') ?? `${ctx.scope}-video`;
			const source = el.querySelector('source');
			defaults.values['video:' + id] ??= asset(source.getAttribute('src'));
			addField(sectionOf(el), ctx.scope, { key: 'video:' + id, type: 'video', label: 'Video' });
			source.setAttribute('src', tok(`c.video(${q(id)})`));
			el.setAttribute('data-edit', tok(`c.edit(${q('video:' + id)})`));
			el.removeAttribute('data-cms-vid');
		}

		if (el.hasAttribute('data-cms-event')) {
			const n = el.getAttribute('data-cms-event');
			addField(sectionOf(el), ctx.scope, {
				key: `event:${n}:hidden`,
				type: 'toggle',
				label: `Evenement ${n} verbergen`
			});
			el.setAttribute(
				'style:display',
				tok(`c.flag(${q(`event:${n}:hidden`)}) ? "none" : undefined`)
			);
			el.removeAttribute('data-cms-event');
		}

		// ── content ──
		if (el.hasAttribute('data-cms-price')) {
			const id = el.getAttribute('data-cms-price');
			defaults.values['menuprice:' + id] ??= norm(el.textContent).replace(/^€\s*/, '');
			addField(sectionOf(el), ctx.scope, { key: 'menuprice:' + id, type: 'price', label: 'Prijs' });
			el.setAttribute('data-edit', tok(`c.edit(${q('menuprice:' + id)})`));
			el.textContent = tok(`c.price(${q('menuprice:' + id)})`);
			el.removeAttribute('data-cms-price');
			continue;
		}

		if (el.hasAttribute('data-cms')) {
			const k = el.getAttribute('data-cms');
			const key = 'cms:' + k;
			const global = /^(season|price)-/.test(k);
			const section = global ? sharedSection('season', 'Seizoen & prijzen') : sectionOf(el);
			el.setAttribute('data-edit', tok(`c.edit(${q(key)})`));
			el.removeAttribute('data-cms');
			if (el.hasAttribute('data-count')) {
				defaults.values[key] ??= el.getAttribute('data-count');
				addField(section, global ? 'shared' : ctx.scope, { key, type: 'value', label: 'Getal' });
				el.setAttribute('data-count', tok(`c.v(${q(key)})`));
			} else {
				defaults.values[key] ??= norm(el.innerHTML);
				addField(section, global ? 'shared' : ctx.scope, {
					key,
					type: /^price-/.test(k) ? 'price' : 'value',
					label: /^menu-head/.test(k)
						? 'Kop'
						: /^menu-.*-desc$/.test(k)
							? 'Omschrijving'
							: /^menu-/.test(k)
								? 'Gerecht'
								: /^price-/.test(k)
									? 'Prijs ' + k.slice(6)
									: /^season-/.test(k)
										? 'Seizoen: ' + k.slice(7)
										: textLabel(el)
				});
				el.innerHTML = tok(/^price-/.test(k) ? `c.price(${q(key)})` : `@html c.v(${q(key)})`);
			}
			continue;
		}

		if (el.hasAttribute('data-i18n')) {
			const k = el.getAttribute('data-i18n');
			addText(k, el.innerHTML);
			if (el.querySelector('[data-i18n], [data-cms], [data-cms-contact], img'))
				throw new Error(`${ctx.scope}: nested editable inside ${k}`);
			const inFooter = !!el.closest('footer');
			addField(
				inFooter ? sharedSection('footer', 'Footerteksten') : sectionOf(el),
				inFooter ? 'shared' : ctx.scope,
				{
					key: k,
					type: isRich(k) ? 'rich' : 'text',
					label: textLabel(el)
				}
			);
			el.setAttribute('data-edit', tok(`c.edit(${q(k)})`));
			el.innerHTML = tok(`@html c.t(${q(k)})`);
			el.removeAttribute('data-i18n');
		}
	}

	// serialize: static asset paths become absolute, then tokens become Svelte expressions
	let out = root.outerHTML.replace(/(["'(])(\.\/)?assets\//g, '$1/assets/');
	// boolean attributes are written bare (autoplay, required), as Svelte expects
	out = out.replace(
		/\s(autoplay|muted|loop|playsinline|novalidate|required|disabled|selected|checked|hidden|allowfullscreen)=""/g,
		' $1'
	);
	out = out.replace(/\s([\w:-]+)="@@(\d+)@@"/g, (m, attr, i) => ` ${attr}={${exprs[+i]}}`);
	out = out.replace(/@@(\d+)@@/g, (m, i) => `{${exprs[+i]}}`);
	if (/@@\d+@@/.test(out)) throw new Error('unreplaced token');
	return out;
}

// sections of a page: one per <section>/<header> (or top-level block), titled by its
// heading — or else its first text. Titles are read before conversion starts.
const boxOf = (el) =>
	el.closest('section, header') ?? [...el.ownerDocument.body.children].find((c) => c.contains(el));

function makeSectionOf(page, doc) {
	const textOf = (el) => {
		const k = el?.getAttribute('data-i18n');
		return el ? plain(k && dict.nl[k] ? dict.nl[k] : el.innerHTML) : '';
	};
	const titles = new Map();
	for (const box of [...doc.querySelectorAll('section, header'), ...doc.body.children]) {
		const t = textOf(box.querySelector('h1, h2, h3')) || textOf(box.querySelector('[data-i18n]'));
		titles.set(box, t.length > 40 ? t.slice(0, 38) + '…' : t);
	}
	const sections = new Map();
	pageSections[page.id] = sections;
	return (el) => {
		if (el.closest('nav, .nav__overlay')) return sharedSection('menu', 'Menu');
		if (el.closest('footer')) return sharedSection('footer', 'Footerteksten');
		const box = boxOf(el);
		if (!sections.has(box)) {
			sections.set(box, {
				id: `${page.id}-${sections.size + 1}`,
				title: titles.get(box) || 'Sectie',
				fields: []
			});
		}
		return sections.get(box);
	};
}

const svelteFile = (head, body, imports = []) =>
	`<script lang="ts">\n${["import { getSite } from '#lib/site/context.ts';", ...imports].map((i) => '\t' + i).join('\n')}\n\n\tconst c = getSite();\n</script>\n\n${head ? `<svelte:head>\n${head}\n</svelte:head>\n\n` : ''}${body}\n`;

const imgIds = new Map();

// ── shared chrome, taken from index.html ─────────────────────────────────────
{
	const page = PAGES[0];
	const doc = new JSDOM(read('index.html')).window.document;
	const ctx = { scope: 'shared', sectionOf: makeSectionOf(page, doc), imgIds };
	const nav =
		convert(doc.querySelector('nav.nav'), ctx) +
		'\n\n' +
		convert(doc.querySelector('.nav__overlay'), ctx);
	write('src/lib/site/components/Nav.svelte', svelteFile('', nav));
	write(
		'src/lib/site/components/Footer.svelte',
		svelteFile('', convert(doc.querySelector('footer'), ctx))
	);
	write(
		'src/lib/site/components/Loader.svelte',
		doc.querySelector('#loader').outerHTML.replace(/(["'(])(\.\/)?assets\//g, '$1/assets/') + '\n'
	);
	write('src/lib/site/components/Lightbox.svelte', doc.querySelector('#lightbox').outerHTML + '\n');
}

// ── pages ────────────────────────────────────────────────────────────────────
for (const page of PAGES) {
	const doc = new JSDOM(read(page.id + '.html')).window.document;
	fixup(doc);
	const ctx = { scope: page.id, sectionOf: makeSectionOf(page, doc), imgIds };
	const body = [...doc.body.children].filter(
		(el) => !el.matches('#loader, nav.nav, .nav__overlay, footer, #lightbox, script')
	);
	const markup = body.map((el) => convert(el, ctx)).join('\n\n');

	// title and description become editable SEO texts
	for (const [k, v] of [
		[`seo.${page.id}.title`, doc.title],
		[
			`seo.${page.id}.description`,
			doc.querySelector('meta[name="description"]').getAttribute('content')
		]
	]) {
		defaults.texts[k] = { nl: norm(v) };
	}
	const seo = {
		id: `${page.id}-seo`,
		title: 'Zoekmachines (titel en omschrijving)',
		fields: [
			{ key: `seo.${page.id}.title`, type: 'text', label: 'Paginatitel' },
			{ key: `seo.${page.id}.description`, type: 'text', label: 'Omschrijving' }
		]
	};
	pageSections[page.id].set('seo', seo);

	const css = [...doc.querySelectorAll('link[rel="stylesheet"][href^="assets/css/"]')]
		.map((l) => l.getAttribute('href').replace(/\?.*$/, ''))
		.filter((h) => !h.endsWith('warmelo.min.css'));
	const preload = [...doc.querySelectorAll('link[rel="preload"][as="image"]')];
	const head = [
		`\t<title>{c.plain(${q(`seo.${page.id}.title`)})}</title>`,
		`\t<meta name="description" content={c.plain(${q(`seo.${page.id}.description`)})} />`,
		...preload.map(
			(l) =>
				`\t<link rel="preload" as="image" href={c.img(${q([...imgIds].find(([, s]) => s === asset(l.getAttribute('href')))?.[0] ?? '')})} fetchpriority="high" />`
		),
		...css.map((h) => `\t<link rel="stylesheet" href="/${h}" />`)
	].join('\n');

	const dir = `src/routes/(site)/[[lang=lang]]${page.route ? '/' + page.route : ''}`;
	const isHome = page.id === 'index';
	write(
		`${dir}/+page.svelte`,
		svelteFile(
			head,
			(isHome ? '{#if !c.preview}<Loader />{/if}\n\n' : '') + markup,
			isHome ? ["import Loader from '#lib/site/components/Loader.svelte';"] : []
		)
	);
}

// ── content defaults and admin fields ────────────────────────────────────────
const fields = {
	pages: PAGES.map((p) => ({
		id: p.id,
		name: p.name,
		route: p.route,
		sections: [...pageSections[p.id].values()].filter((s) => s.fields.length)
	})),
	shared: ['menu', 'contact', 'footer', 'footer-links', 'links', 'season']
		.map((id) => shared.get(id))
		.filter(Boolean)
};
write('src/lib/content/defaults.json', JSON.stringify(defaults, null, '\t') + '\n');
write('src/lib/content/fields.json', JSON.stringify(fields, null, '\t') + '\n');

const count = (secs) => secs.reduce((n, s) => n + s.fields.length, 0);
console.log(
	`texts ${Object.keys(defaults.texts).length}, values ${Object.keys(defaults.values).length}`
);
console.log(
	'fields:',
	fields.pages.map((p) => `${p.id} ${count(p.sections)}`).join(', '),
	`| shared ${count(fields.shared)}`
);
