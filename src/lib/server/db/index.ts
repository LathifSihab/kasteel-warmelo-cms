import { dev } from '$app/env';
import { DATABASE_URL } from '$app/env/private';
import { migrate } from './migrations';
import { createNeonDb } from './neon';
import type { Db } from './types';

export type { Db } from './types';

let db: Promise<Db> | undefined;

/**
 * Neon when DATABASE_URL is set. In dev without it, a local PGlite database in
 * .data/ that migrates itself; production never bundles PGlite.
 */
export function getDb(): Promise<Db> {
	db ??= (async () => {
		if (DATABASE_URL) return createNeonDb(DATABASE_URL);
		if (dev) {
			const { createPgliteDb } = await import('./pglite');
			const local = createPgliteDb('.data/pglite');
			await migrate(local, (m) => console.log('[pglite]', m));
			return local;
		}
		throw new Error('DATABASE_URL is not set');
	})();
	db.catch(() => (db = undefined)); // retry on the next request instead of caching the failure
	return db;
}
