// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	// No App.Platform: adapter-cloudflare 8 passes none. Use `cloudflare:workers` and the
	// global `caches` instead.
	namespace App {
		interface Locals {
			/** Signed-in admin; `sid` also keys the session's unpublished drafts. */
			session: { sid: string } | null;
		}
	}
}

export {};
