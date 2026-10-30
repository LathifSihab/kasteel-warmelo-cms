import { describe, expect, it } from 'vitest';
import { parseLegacyHref, parsePath, pathFor } from './pages.ts';

describe('pathFor / parsePath', () => {
	it.each([
		['index', 'nl', '/'],
		['index', 'en', '/en'],
		['tuinen', 'nl', '/tuinen'],
		['tuinen', 'de', '/de/tuinen']
	] as const)('%s in %s ↔ %s', (page, lang, path) => {
		expect(pathFor(page, lang)).toBe(path);
		expect(parsePath(path)).toEqual({ page, lang });
	});

	it('rejects unknown and nested paths', () => {
		expect(parsePath('/admin')).toBeNull();
		expect(parsePath('/en/tuinen/extra')).toBeNull();
		expect(parsePath('/fr/tuinen')).toBeNull();
	});
});

describe('parseLegacyHref', () => {
	it('maps old static links', () => {
		expect(parseLegacyHref('./evenementen.html#agenda')).toEqual({
			page: 'evenementen',
			hash: '#agenda'
		});
		expect(parseLegacyHref('index.html')).toEqual({ page: 'index', hash: '' });
	});
	it('leaves everything else alone', () => {
		expect(parseLegacyHref('https://www.airbnb.nl/rooms/1')).toBeNull();
		expect(parseLegacyHref('./onbekend.html')).toBeNull();
		expect(parseLegacyHref('mailto:info@kasteelwarmelo.nl')).toBeNull();
	});
});
