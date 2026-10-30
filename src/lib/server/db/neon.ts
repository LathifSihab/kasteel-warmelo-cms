import { neon } from '@neondatabase/serverless';
import type { Db } from './types';

/** Neon over HTTP: one round trip per query, works on Cloudflare Workers. */
export function createNeonDb(url: string): Db {
	const sql = neon(url);
	return {
		async query<T>(text: string, params: unknown[] = []) {
			return (await sql.query(text, params)) as T[];
		},
		async transaction(statements) {
			await sql.transaction(statements.map((s) => sql.query(s.text, s.params ?? [])));
		}
	};
}
