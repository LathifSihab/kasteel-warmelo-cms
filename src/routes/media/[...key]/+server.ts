import { error } from '@sveltejs/kit';
import { waitUntil } from 'cloudflare:workers';
import { getObject, storageConfigured } from '#lib/server/storage.ts';
import type { RequestHandler } from './$types';

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

	const object = await getObject(params.key);
	if (!object) error(404);

	const response = new Response(object.body, {
		headers: {
			'content-type': object.httpMetadata?.contentType ?? 'application/octet-stream',
			'content-length': String(object.size),
			etag: object.httpEtag,
			'cache-control': 'public, max-age=31536000, immutable',
			'x-content-type-options': 'nosniff'
		}
	});
	waitUntil(cache.put(cacheKey, response.clone()));
	return response;
};
