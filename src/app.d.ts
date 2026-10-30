// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		interface Platform {
			env: Env;
			ctx: ExecutionContext;
			/** Cloudflare's edge cache: `caches.default` */
			caches: CacheStorage & { default: Cache };
			cf?: IncomingRequestCfProperties;
		}

		interface Locals {
			/** Signed-in admin; `sid` also keys the session's unpublished drafts. */
			session: { sid: string } | null;
		}
	}
}

export {};
