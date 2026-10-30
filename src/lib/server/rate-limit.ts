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
	const [, hit] = await db.transaction([
		// one request per bucket at a time, so a burst can't all pass the count before any is recorded
		{ text: 'select pg_advisory_xact_lock(hashtext($1))', params: [bucket] },
		{
			text: `insert into rate_limits (bucket)
				select $1::text where (
					select count(*) from rate_limits
					where bucket = $1::text and at > now() - make_interval(mins => $2::int)
				) < $3::int
				returning 1`,
			params: [bucket, windowMinutes, limit]
		},
		{ text: `delete from rate_limits where at < now() - interval '1 day'` }
	]);
	return hit.length > 0;
}

/**
 * Rate-limit key for a client address: IPv4 as is, IPv6 by its /64, since one
 * subscriber usually gets a whole /64 and can pick any address in it.
 */
export function clientKey(ip: string): string {
	const mapped = ip.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/i);
	if (mapped) return mapped[1];
	if (!ip.includes(':')) return ip;
	const [head, tail] = ip.toLowerCase().split('::');
	const h = head ? head.split(':') : [];
	const t = tail ? tail.split(':') : [];
	const groups =
		tail === undefined ? h : [...h, ...Array(Math.max(0, 8 - h.length - t.length)).fill('0'), ...t];
	return (
		groups
			.slice(0, 4)
			.map((g) => parseInt(g || '0', 16).toString(16))
			.join(':') + '::/64'
	);
}
