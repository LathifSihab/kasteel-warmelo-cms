import { getContext, setContext, tick } from 'svelte';
import { FIELDS, type Field, type Section } from '#lib/content/fields.ts';
import { pathFor, type Lang, type PageId } from '#lib/site/pages.ts';
import { DEFAULTS, type Content } from '#lib/site/site.ts';

export type StoredLang = Lang | '*';
type DraftRow = { key: string; lang: StoredLang; value: string | null };

const id = (key: string, lang: StoredLang) => `${key}|${lang}`;
export const fieldDomId = (key: string) => 'f-' + key.replace(/[^a-zA-Z0-9_-]/g, '_');

/** The message of a failed admin API call (SvelteKit's `error()` sends { message }). */
export async function errorMessage(res: Response, fallback: string): Promise<string> {
	const body = (await res.json().catch(() => null)) as { message?: string } | null;
	return body?.message ?? fallback;
}

/**
 * Admin state. A field's value is: this session's draft → published content →
 * the original site. Drafts are saved to the server as you type (debounced);
 * the preview shows them, visitors only after Publiceren.
 */
export class Editor {
	page = $state<PageId>('index');
	lang = $state<Lang>('nl');
	drafts = $state<Record<string, DraftRow>>({});
	published = $state<Content>({ texts: {}, values: {} });
	open = $state<Record<string, boolean>>({});
	query = $state('');
	status = $state<'idle' | 'saving' | 'saved' | 'error'>('idle');
	message = $state('');
	busy = $state(false);

	readonly storage: boolean;
	// eslint-disable-next-line svelte/prefer-svelte-reactivity -- save queue, never rendered
	private queue = new Map<string, DraftRow>();
	private timer: ReturnType<typeof setTimeout> | undefined;
	private reloadAfterSave = false;
	frame: HTMLIFrameElement | undefined;

	constructor(published: Content, drafts: DraftRow[], storage: boolean) {
		this.published = published;
		this.storage = storage;
		for (const d of drafts) this.drafts[id(d.key, d.lang)] = d;
	}

	// ── values ──
	original(key: string, lang: StoredLang): string {
		if (lang === '*') return this.published.values[key] ?? DEFAULTS.values[key] ?? '';
		return this.published.texts[key]?.[lang] ?? DEFAULTS.texts[key]?.[lang] ?? '';
	}
	/** The value without this session's draft and without published edits: the old site. */
	factory(key: string, lang: StoredLang): string {
		return lang === '*' ? (DEFAULTS.values[key] ?? '') : (DEFAULTS.texts[key]?.[lang] ?? '');
	}
	get(key: string, lang: StoredLang): string {
		const d = this.drafts[id(key, lang)];
		if (d) return d.value ?? this.factory(key, lang);
		return this.original(key, lang);
	}
	/** Dutch text shown as a hint when a translation is missing. */
	fallback(key: string): string {
		return this.get(key, 'nl');
	}
	isDraft(key: string, lang: StoredLang): boolean {
		return id(key, lang) in this.drafts;
	}
	/** Differs from the original site (published edit or draft), so it can be reset. */
	isCustom(key: string, lang: StoredLang): boolean {
		const d = this.drafts[id(key, lang)];
		if (d) return d.value !== null;
		return lang === '*' ? key in this.published.values : this.published.texts[key]?.[lang] != null;
	}
	get draftCount(): number {
		return Object.keys(this.drafts).length;
	}

	/** value null = back to the original site. `reload` re-renders the preview once saved. */
	set(key: string, lang: StoredLang, value: string | null, { reload = false } = {}) {
		const row = { key, lang, value };
		this.drafts[id(key, lang)] = row;
		this.queue.set(id(key, lang), row);
		this.reloadAfterSave ||= reload;
		this.status = 'saving';
		clearTimeout(this.timer);
		this.timer = setTimeout(() => this.flush(), 600);
	}

	async flush(): Promise<void> {
		clearTimeout(this.timer);
		if (!this.queue.size) return;
		const changes = [...this.queue.values()];
		this.queue.clear();
		const reload = this.reloadAfterSave;
		this.reloadAfterSave = false;
		const res = await fetch('/admin/api/draft', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ changes })
		});
		if (!res.ok) {
			this.status = 'error';
			this.message = await errorMessage(res, 'Opslaan mislukt');
			for (const c of changes) this.queue.set(id(c.key, c.lang), c);
			return;
		}
		this.status = this.queue.size ? 'saving' : 'saved';
		if (reload) this.reloadPreview();
	}

	async publish() {
		this.busy = true;
		await this.flush();
		const res = await fetch('/admin/api/publish', { method: 'POST' });
		this.busy = false;
		if (!res.ok) {
			this.status = 'error';
			this.message = 'Publiceren mislukt';
			return;
		}
		for (const { key, lang, value } of Object.values(this.drafts)) {
			if (lang === '*') {
				if (value === null) delete this.published.values[key];
				else this.published.values[key] = value;
			} else {
				const t = (this.published.texts[key] ??= {});
				if (value === null) delete t[lang];
				else t[lang] = value;
			}
		}
		this.drafts = {};
		this.message = 'Gepubliceerd — de website is bijgewerkt.';
		this.status = 'idle';
		this.reloadPreview();
	}

	async discard() {
		this.busy = true;
		clearTimeout(this.timer);
		this.queue.clear();
		await fetch('/admin/api/discard', { method: 'POST' });
		this.busy = false;
		this.drafts = {};
		this.message = 'Wijzigingen verworpen.';
		this.status = 'idle';
		this.reloadPreview();
	}

	// ── sections ──
	get pageFields() {
		return FIELDS.pages.find((p) => p.id === this.page)!;
	}
	/** Page sections first, then what every page shares; filtered by the search box. */
	get sections(): { group: string; section: Section; fields: Field[] }[] {
		const q = this.query.trim().toLowerCase();
		const match = (f: Field) =>
			!q ||
			f.label.toLowerCase().includes(q) ||
			this.get(
				f.labelKey ?? f.key,
				f.type === 'text' || f.type === 'rich' || f.labelKey ? this.lang : '*'
			)
				.toLowerCase()
				.includes(q);
		return [
			...this.pageFields.sections.map((s) => ({ group: this.pageFields.name, section: s })),
			...FIELDS.shared.map((s) => ({ group: 'Hele website', section: s }))
		]
			.map((x) => ({ ...x, fields: x.section.fields.filter(match) }))
			.filter((x) => x.fields.length);
	}

	// ── preview ──
	get previewUrl(): string {
		return pathFor(this.page, this.lang) + '?preview';
	}
	reloadPreview() {
		this.frame?.contentWindow?.location.reload();
	}
	private post(msg: object) {
		this.frame?.contentWindow?.postMessage(msg, location.origin);
	}
	/** Show unsaved text in the preview right away. */
	liveHtml(key: string, html: string) {
		this.post({ type: 'wcms:html', key, html });
	}
	/** Scroll the preview to the element being edited. */
	show(key: string) {
		this.post({ type: 'wcms:show', key });
	}

	/** Preview click → open the field's section and focus it. */
	async focus(key: string) {
		const all = this.sections.flatMap((s) => s.fields.map((f) => ({ f, s: s.section })));
		const hit = all.find(({ f }) => f.key === key || f.labelKey === key);
		if (!hit) return;
		this.query = '';
		this.open[hit.s.id] = true;
		await tick();
		const el = document.getElementById(fieldDomId(hit.f.key));
		el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
		el?.classList.add('flash');
		setTimeout(() => el?.classList.remove('flash'), 1800);
		el?.querySelector<HTMLElement>('input, textarea, select')?.focus({ preventScroll: true });
	}
}

const KEY = Symbol('editor');
export const setEditor = (e: Editor) => setContext(KEY, e);
export const getEditor = () => getContext<Editor>(KEY);
