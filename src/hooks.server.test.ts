import { isRedirect } from '@sveltejs/kit';
import { describe, expect, it } from 'vitest';
import { handle } from './hooks.server.ts';

/** Runs the hook for a GET of `href`; returns what it threw, or null. */
const thrown = (href: string) =>
	Promise.resolve(
		handle({
			event: {
				url: new URL(href),
				request: new Request(href),
				cookies: { get: () => undefined },
				locals: {}
			} as never,
			resolve: async () => new Response('ok')
		})
	).then(
		() => null,
		(e: unknown) => e
	);

describe('handle', () => {
	// SvelteKit refuses a redirect to another host unless it is allowed, and answered www with a 500
	it('redirects www to the bare domain, keeping path and query', async () => {
		const e = await thrown('https://www.kasteelwarmelo.nl/tuinen?x=1');
		expect(isRedirect(e)).toBe(true);
		expect(e).toMatchObject({ status: 301, location: 'https://kasteelwarmelo.nl/tuinen?x=1' });
	});

	it('redirects old static URLs', async () => {
		const e = await thrown('https://kasteelwarmelo.nl/tuinen.html?lang=en');
		expect(e).toMatchObject({ status: 301, location: '/en/tuinen' });
	});
});
