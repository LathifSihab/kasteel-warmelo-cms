import defaultsJson from '#lib/content/defaults.json';
import { escapeHtml, toPlain } from './html';
import { DEFAULT_LANG, parseLegacyHref, pathFor, type Lang, type PageId } from './pages';
import { seasonActive, type Season } from './season';

/**
 * Site content as stored: translated texts per language, and language-neutral
 * values (contact details, prices, image URLs, button settings…) by key.
 */
export interface Content {
	texts: Record<string, Partial<Record<Lang, string>>>;
	values: Record<string, string>;
}

export const DEFAULTS = defaultsJson as Content;

/** Stored under `btn:<id>` as JSON. */
export interface ButtonSettings {
	href?: string;
	hidden?: boolean;
	alt?: Season & { href?: string; label?: Partial<Record<Lang, string>> };
}

/** Stored under `fit:<id>` as JSON: how an image is cropped. */
export interface ImageFit {
	pos?: string;
	scale?: number;
	height?: string;
}

function parseJson<T>(s: string | undefined): T | undefined {
	if (!s) return undefined;
	try {
		return JSON.parse(s) as T;
	} catch {
		return undefined;
	}
}

/** "0547 – 352547" → "+31547352547" */
export function telHref(phone: string): string {
	const d = phone.replace(/[^\d+]/g, '');
	if (d.startsWith('00')) return '+' + d.slice(2);
	if (d.startsWith('0')) return '+31' + d.slice(1);
	return d;
}

/**
 * Everything a page template asks for. Saved content (`over`) wins over the
 * original site (`DEFAULTS`); a missing translation falls back to Dutch.
 */
export class Site {
	constructor(
		readonly lang: Lang,
		readonly page: PageId,
		private readonly over: Content,
		/** Admin preview: elements get data-edit attributes so they can be clicked. */
		readonly preview = false,
		/** YYYY-MM-DD in the Netherlands, for seasonal buttons. */
		readonly today = ''
	) {}

	// ── texts ──
	/** Translated text as HTML. */
	t(key: string): string {
		const o = this.over.texts[key],
			d = DEFAULTS.texts[key];
		return o?.[this.lang] ?? d?.[this.lang] ?? o?.[DEFAULT_LANG] ?? d?.[DEFAULT_LANG] ?? '';
	}
	/** Translated text without markup. */
	plain(key: string): string {
		return toPlain(this.t(key));
	}
	/** Language-neutral value. */
	v(key: string): string {
		return this.over.values[key] ?? DEFAULTS.values[key] ?? '';
	}
	flag(key: string): boolean {
		return this.v(key) === 'true';
	}
	price(key: string): string {
		const v = this.v(key).trim();
		return v && !v.startsWith('€') ? '€ ' + v : v;
	}
	edit(key: string): string | undefined {
		return this.preview ? key : undefined;
	}

	// ── links ──
	/** Old './page.html#x' links → this language's URL; anything else unchanged. */
	href(raw: string): string {
		const legacy = parseLegacyHref(raw);
		return legacy ? pathFor(legacy.page, this.lang) + legacy.hash : raw;
	}
	langHref(lang: Lang): string {
		return pathFor(this.page, lang);
	}
	isCurrent(raw: string): boolean {
		return parseLegacyHref(raw)?.page === this.page;
	}
	navClass(raw: string, cls: string): string {
		return this.isCurrent(raw) ? (cls + ' active').trim() : cls;
	}
	link(id: string): string {
		return this.v('link:' + id);
	}

	// ── buttons ──
	button(id: string): ButtonSettings {
		return parseJson<ButtonSettings>(this.over.values['btn:' + id]) ?? {};
	}
	private seasonal(id: string) {
		const alt = this.button(id).alt;
		return alt && seasonActive(alt, this.today) ? alt : undefined;
	}
	btnHref(id: string, def: string): string {
		return this.href(this.seasonal(id)?.href || this.button(id).href || def);
	}
	btnHidden(id: string): boolean {
		return !!this.button(id).hidden;
	}
	btnLabel(id: string, key: string): string {
		const label = this.seasonal(id)?.label?.[this.lang];
		return label ? escapeHtml(label) : this.t(key);
	}

	// ── contact ──
	contact(k: string): string {
		return this.v('contact:' + k);
	}
	contactHref(k: string): string {
		const v = this.contact(k);
		return k === 'email' ? 'mailto:' + v : 'tel:' + telHref(v);
	}

	// ── media ──
	img(id: string): string {
		return this.v('img:' + id);
	}
	bg(id: string): string {
		return `url('${this.img(id)}')`;
	}
	video(id: string): string {
		return this.v('video:' + id);
	}
	fit(id: string): ImageFit {
		return parseJson<ImageFit>(this.v('fit:' + id)) ?? {};
	}
	/** The image's own inline style (`base`) plus its crop. */
	imgStyle(id: string, base = ''): string | undefined {
		const f = this.fit(id);
		const css = base ? [base.replace(/;\s*$/, '')] : [];
		if (f.pos) css.push(`object-position:${f.pos}`);
		if (f.scale && f.scale > 1.01) {
			css.push(
				`--cms-scale:${f.scale}`,
				`--cms-scale-hover:${(f.scale * 1.07).toFixed(3)}`,
				`--cms-origin:${f.pos || '50% 50%'}`
			);
		}
		return css.length ? css.join(';') : undefined;
	}
	imgClass(id: string, cls: string): string | undefined {
		const scaled = (this.fit(id).scale ?? 1) > 1.01;
		return [cls, scaled ? 'cms-scaled' : ''].filter(Boolean).join(' ') || undefined;
	}
	imgHeight(id: string): string | undefined {
		return this.fit(id).height || undefined;
	}
}
