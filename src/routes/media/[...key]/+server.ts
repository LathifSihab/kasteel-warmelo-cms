import { error } from '@sveltejs/kit';
import { waitUntil } from 'cloudflare:workers';
import { getObject, storageConfigured } from '#lib/server/storage.ts';
import type { RequestHandler } from './$types';

const TRIES = 3;

/** The bucket, retried: requests from Cloudflare sometimes fail for a moment. */
async function fetchObject(key: string): Promise<Response> {
	let last = 'no response';
	for (let i = 0; i < TRIES; i++) {
		if (i) await new Promise((r) => setTimeout(r, 150 * i));
		try {
			const res = await getObject(key);
			if (res.ok || res.status === 404) return res;
			last = `${res.status} ${(await res.text()).slice(0, 200)}`;
		} catch (e) {
			last = String(e);
		}
	}
	console.error(`media: ${key} failed after ${TRIES} tries: ${last}`);
	error(502, 'Bestand kon niet worden geladen');
}

/**
 * Uploaded files, served from the private bucket under the site's own domain.
 * Keys are unique per upload, so responses are immutable and edge-cached
 * (keyed by path, so a query string can't bypass the cache).
 */
export const GET: RequestHandler = async ({ params, url }) => {
	if (!/^uploads\/\d{4}\/[0-9a-f-]{36}\.[a-z0-9]+$/.test(params.key)) error(404);
	const cache = (caches as CacheStorage & { default: Cache }).default;
	const cacheKey = new Request(url.origin + url.pathname);
	const hit = await cache.match(cacheKey);
	// a cached response's headers are immutable, and the hook still adds its own
	if (hit) return new Response(hit.body, hit);
	if (!storageConfigured()) error(404);

	const upstream = await fetchObject(params.key);
	if (upstream.status === 404) error(404);

	const headers = new Headers({
		'content-type': upstream.headers.get('content-type') ?? 'application/octet-stream',
		'cache-control': 'public, max-age=31536000, immutable',
		'x-content-type-options': 'nosniff'
	});
	const length = upstream.headers.get('content-length');
	if (length) headers.set('content-length', length);
	const response = new Response(upstream.body, { headers });
	waitUntil(cache.put(cacheKey, response.clone()));
	return response;
};
