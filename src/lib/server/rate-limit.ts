import type { Db } from './db';

/**
 * Allows `limit` hits per `windowMinutes` for a bucket (e.g. "login:<ip>").
 * Returns false when the limit is reached; the hit is then not recorded.
 */
export async function allow(
	db: Db,
	bucket: string,
	limit: number,
	windowMinutes: number
): Promise<boolean> {
	const [{ n }] = await db.query<{ n: number }>(
		`select count(*)::int as n from rate_limits where bucket = $1 and at > now() - make_interval(mins => $2)`,
		[bucket, windowMinutes]
	);
	if (n >= limit) return false;
	await db.transaction([
		{ text: 'insert into rate_limits (bucket) values ($1)', params: [bucket] },
		{ text: `delete from rate_limits where at < now() - interval '1 day'` }
	]);
	return true;
}
