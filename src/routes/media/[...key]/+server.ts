import { error } from '@sveltejs/kit';
import { getObject, storageConfigured } from '#lib/server/storage.ts';
import type { RequestHandler } from './$types';

/**
 * Uploaded files, served from the private bucket under the site's own domain.
 * Keys are unique per upload, so responses are immutable and edge-cached.
 */
export const GET: RequestHandler = async ({ params, request, platform }) => {
	if (!/^uploads\/\d{4}\/[0-9a-f-]{36}\.[a-z0-9]+$/.test(params.key)) error(404);
	const cache = platform?.caches?.default;
	const hit = await cache?.match(request);
	if (hit) return hit;
	if (!storageConfigured()) error(404);

	const upstream = await getObject(params.key);
	if (upstream.status === 404) error(404);
	if (!upstream.ok) error(502, 'Bestand kon niet worden geladen');

	const response = new Response(upstream.body, {
		headers: {
			'content-type': upstream.headers.get('content-type') ?? 'application/octet-stream',
			'content-length': upstream.headers.get('content-length') ?? '',
			'cache-control': 'public, max-age=31536000, immutable',
			'x-content-type-options': 'nosniff'
		}
	});
	if (cache) platform!.ctx.waitUntil(cache.put(request, response.clone()));
	return response;
};
