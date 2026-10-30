import {
	AWS_ACCESS_KEY_ID,
	AWS_ENDPOINT_URL_S3,
	AWS_REGION,
	AWS_SECRET_ACCESS_KEY,
	MEDIA_BUCKET
} from '$app/env/private';
import { createS3, type S3 } from './s3.ts';

/**
 * Uploads live in a private Neon Object Storage bucket and are served through
 * /media/<key>, so they stay on the site's own domain.
 */
let s3: S3 | undefined;

export function storageConfigured(): boolean {
	return !!(AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY && AWS_ENDPOINT_URL_S3);
}

function client(): S3 {
	if (!storageConfigured())
		throw new Error('Object storage is not configured (AWS_* variables from `neon env pull`)');
	s3 ??= createS3({
		accessKeyId: AWS_ACCESS_KEY_ID!,
		secretAccessKey: AWS_SECRET_ACCESS_KEY!,
		endpoint: AWS_ENDPOINT_URL_S3!,
		region: AWS_REGION,
		bucket: MEDIA_BUCKET
	});
	return s3;
}

export const putObject = (key: string, body: ArrayBuffer, contentType: string) =>
	client().put(key, body, contentType);
export const getObject = (key: string) => client().get(key);
