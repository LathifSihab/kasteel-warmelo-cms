// Neon infrastructure for this project (see README → "Neon").
// `neon deploy` provisions it on the linked branch and pulls the credentials into .env.
import { defineConfig } from '@neon/config/v1';

export default defineConfig({
	buckets: {
		// uploads from the admin; private, served through /media/<key>
		media: {}
	}
});
