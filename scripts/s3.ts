import { AwsClient } from 'aws4fetch';

export interface S3Config {
	accessKeyId: string;
	secretAccessKey: string;
	endpoint: string;
	region?: string;
	bucket: string;
}

/**
 * Minimal S3 client (path-style, SigV4) for scripts, e.g. R2's S3 API. The site itself
 * uses the R2 binding (src/lib/server/storage.ts).
 */
export function createS3(config: S3Config) {
	const aws = new AwsClient({
		accessKeyId: config.accessKeyId,
		secretAccessKey: config.secretAccessKey,
		region: config.region || 'auto',
		service: 's3'
	});
	const url = (key: string) =>
		`${config.endpoint.replace(/\/$/, '')}/${config.bucket}/${key.split('/').map(encodeURIComponent).join('/')}`;

	return {
		async put(key: string, body: ArrayBuffer, contentType: string): Promise<void> {
			const res = await aws.fetch(url(key), {
				method: 'PUT',
				body,
				headers: { 'content-type': contentType }
			});
			if (!res.ok) throw new Error(`Upload failed: ${res.status} ${await res.text()}`);
		},
		get(key: string): Promise<Response> {
			return aws.fetch(url(key));
		}
	};
}

export type S3 = ReturnType<typeof createS3>;
