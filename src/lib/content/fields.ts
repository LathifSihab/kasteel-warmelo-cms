import json from './fields.json';
import type { PageId } from '#lib/site/pages.ts';

/**
 * What the admin can edit, generated from the original site by
 * scripts/legacy/convert.mjs and grouped per page section.
 *
 *   text, rich  translated text (rich keeps line breaks and *accent*)
 *   value       language-neutral text (contact details, numbers, menu names)
 *   price       amount shown with €
 *   link        external URL
 *   button      link target, hide, optional seasonal version (JSON)
 *   image       image URL (+ crop settings under fit:<id>)
 *   video       video URL
 *   toggle      on/off, stored as "true"
 */
export type FieldType =
	'text' | 'rich' | 'value' | 'price' | 'link' | 'button' | 'image' | 'video' | 'toggle';

export interface Field {
	key: string;
	type: FieldType;
	label: string;
	/** button: the translated text key of its label */
	labelKey?: string;
	/** button: the original link target */
	default?: string;
	/** button: may have a seasonal version */
	seasonal?: boolean;
	/** image: the page sizes its frame with the crop's height (c.imgHeight) */
	height?: boolean;
}

export interface Section {
	id: string;
	title: string;
	fields: Field[];
}

export interface PageFields {
	id: PageId;
	name: string;
	route: string;
	sections: Section[];
}

export const FIELDS = json as { pages: PageFields[]; shared: Section[] };

export const isTranslated = (f: Field) => f.type === 'text' || f.type === 'rich';

/**
 * The sections the admin can reorder: all but the page's header (the first) and its
 * search-engine fields, which aren't a block on the page. Saved under `order:<page>`.
 */
export const movableSections = (p: PageFields) =>
	p.sections.slice(1).filter((s) => !s.id.endsWith('-seo'));

export function allFields(): Field[] {
	return [...FIELDS.shared, ...FIELDS.pages.flatMap((p) => p.sections)].flatMap((s) => s.fields);
}

/** Every key the admin may write, with whether it is translated (nl/en/de) or neutral (*). */
export function editableKeys(): Map<string, 'translated' | 'neutral'> {
	const keys = new Map<string, 'translated' | 'neutral'>();
	for (const f of allFields()) {
		keys.set(f.key, isTranslated(f) ? 'translated' : 'neutral');
		if (f.labelKey) keys.set(f.labelKey, 'translated');
		if (f.type === 'image') keys.set('fit:' + f.key.slice(4), 'neutral');
	}
	for (const p of FIELDS.pages) keys.set('order:' + p.id, 'neutral');
	return keys;
}
