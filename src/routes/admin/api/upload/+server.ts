import { error, json } from '@sveltejs/kit';
import { getDb } from '#lib/server/db/index.ts';
import { requireSession } from '#lib/server/guard.ts';
import { putObject, storageConfigured } from '#lib/server/storage.ts';
import type { RequestHandler } from './$types';

// SVG is left out on purpose: served from the site's own domain it could run scripts.
const TYPES: Record<string, { ext: string; maxMb: number }> = {
	'image/jpeg': { ext: 'jpg', maxMb: 10 },
	'image/png': { ext: 'png', maxMb: 10 },
	'image/webp': { ext: 'webp', maxMb: 10 },
	'image/avif': { ext: 'avif', maxMb: 10 },
	'image/gif': { ext: 'gif', maxMb: 10 },
	'video/mp4': { ext: 'mp4', maxMb: 50 },
	'video/webm': { ext: 'webm', maxMb: 50 }
};

/** Stores an image or video in Neon Object Storage and returns its /media URL. */
export const POST: RequestHandler = async ({ request, locals }) => {
	requireSession(locals);
	if (!storageConfigured()) error(503, 'Opslag voor uploads is nog niet ingesteld.');

	const file = (await request.formData()).get('file');
	if (!(file instanceof File)) error(400, 'Geen bestand ontvangen');
	const type = TYPES[file.type];
	if (!type) error(415, 'Alleen JPG, PNG, WebP, AVIF, GIF, MP4 of WebM.');
	if (file.size > type.maxMb * 1024 * 1024)
		error(413, `Maximaal ${type.maxMb} MB voor dit bestandstype.`);

	const id = crypto.randomUUID();
	// a new key per upload, so files can be cached forever
	const key = `uploads/${new Date().getFullYear()}/${id}.${type.ext}`;
	await putObject(key, await file.arrayBuffer(), file.type);
	await (
		await getDb()
	).query(
		'insert into media (id, object_key, filename, content_type, size) values ($1, $2, $3, $4, $5)',
		[id, key, file.name.slice(0, 200), file.type, file.size]
	);
	return json({ url: '/media/' + key });
};
