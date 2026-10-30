import { mkdirSync } from 'node:fs';
import { PGlite } from '@electric-sql/pglite';
import type { Db } from './types';

function wrap(pg: PGlite): Db {
	return {
		async query<T>(text: string, params: unknown[] = []) {
			return (await pg.query<T>(text, params)).rows;
		},
		async transaction(statements) {
			await pg.transaction(async (tx) => {
				for (const s of statements) await tx.query(s.text, s.params ?? []);
			});
		},
		async close() {
			await pg.close();
		}
	};
}

/** Local development without Neon: Postgres in WebAssembly, stored in `dir`. */
export function createPgliteDb(dir: string): Db {
	// one instance per process; Vite reloads modules but the files stay locked
	const g = globalThis as { __pglite?: Map<string, PGlite> };
	g.__pglite ??= new Map();
	if (!g.__pglite.has(dir)) {
		mkdirSync(dir, { recursive: true });
		g.__pglite.set(dir, new PGlite(dir));
	}
	return wrap(g.__pglite.get(dir)!);
}

/** A throwaway in-memory database, for tests. */
export function createMemoryDb(): Db {
	return wrap(new PGlite());
}
