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
	}
	// Uploads: the R2 binding MEDIA in wrangler.jsonc, no variables needed
});
