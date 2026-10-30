import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { FIELDS } from './fields.ts';

const source = (page: string) =>
	readFileSync(
		`src/routes/(site)/[[lang=lang]]/${page === 'index' ? '' : page + '/'}+page.svelte`,
		'utf8'
	);
const calls = (src: string, fn: string, id: string) =>
	new RegExp(`\\b${fn}\\(\\s*'${id.replace(/[-]/g, '\\-')}'`).test(src);

const images = FIELDS.pages.flatMap((p) =>
	p.sections.flatMap((s) =>
		s.fields.filter((f) => f.type === 'image').map((f) => ({ page: p.id, id: f.key.slice(4), f }))
	)
);

// The admin offers focus, zoom and height for every image; these broke silently when the
// page didn't apply them (zoom on hero/cards, height on heroes and flex-sized gallery tiles).
describe('image fields ↔ pages', () => {
	it.each(images)('$page: $id is cropped where it is shown', ({ page, id }) => {
		const src = source(page);
		expect(calls(src, 'imgStyle', id) || calls(src, 'bgStyle', id)).toBe(true);
	});

	it.each(images)('$page: $id offers a height only if the page applies it', ({ page, id, f }) => {
		expect(!!f.height).toBe(calls(source(page), 'imgHeight', id));
	});
});
