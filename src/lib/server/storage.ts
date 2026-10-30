import { env } from 'cloudflare:workers';

/**
 * Uploads live in the private R2 bucket bound as MEDIA (wrangler.jsonc) and are
 * served through /media/<key>, so they stay on the site's own domain. In dev the
 * binding is a local bucket in .wrangler/state.
 */
export function storageConfigured(): boolean {
	return !!env.MEDIA;
}

export async function putObject(key: string, body: ArrayBuffer, contentType: string) {
	await env.MEDIA.put(key, body, { httpMetadata: { contentType } });
}

/** The object, or null if there is none under `key`. */
export const getObject = (key: string) => env.MEDIA.get(key);
