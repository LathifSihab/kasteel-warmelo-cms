import { defineEnvVars } from '@sveltejs/kit/env';

const optional = (v: string | undefined) => v || undefined;

export const variables = defineEnvVars({
	DATABASE_URL: {
		description:
			'Neon Postgres connection string (pooled). Unset in dev: a local PGlite database in .data/',
		schema: optional
	},
	ADMIN_PASSWORD: {
		description: 'Shared password for /admin',
		schema: optional
	},
	SESSION_SECRET: {
		description: 'Long random string used to sign admin sessions',
		schema: optional
	},
	MEDIA_BUCKET: {
		description: 'Neon Object Storage bucket for uploads',
		schema: (v) => v || 'media'
	},
	AWS_ACCESS_KEY_ID: {
		description: 'Neon Object Storage credential (from `neon env pull`)',
		schema: optional
	},
	AWS_SECRET_ACCESS_KEY: { description: 'Neon Object Storage credential', schema: optional },
	AWS_ENDPOINT_URL_S3: { description: 'Neon Object Storage branch endpoint', schema: optional },
	AWS_REGION: { description: 'Neon Object Storage region, e.g. eu-central-1', schema: optional }
});
