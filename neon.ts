// Neon infrastructure for this project (see README → "Neon").
// `neon deploy` provisions it on the linked branch and pulls the credentials into .env.
import { defineConfig } from '@neon/config/v1';

export default defineConfig({
	buckets: {
		// No longer used: uploads moved to Cloudflare R2 (wrangler.jsonc), because requests from
		// Workers to this bucket were intermittently refused (403). It still holds the copies from
		// before the move; remove it, and this entry, once R2 has run for a while.
		media: {}
	}
});
