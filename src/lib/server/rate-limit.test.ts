import { beforeEach, describe, expect, it } from 'vitest';
import { createMemoryDb } from './db/pglite.ts';
import { migrate } from './db/migrations.ts';
import type { Db } from './db/types.ts';
import { allow, clientKey } from './rate-limit.ts';

let db: Db;
beforeEach(async () => {
	db = createMemoryDb();
	await migrate(db);
});

describe('allow', () => {
	it('allows up to the limit per bucket', async () => {
		for (let i = 0; i < 3; i++) expect(await allow(db, 'login:a', 3, 15)).toBe(true);
		expect(await allow(db, 'login:a', 3, 15)).toBe(false);
		expect(await allow(db, 'login:b', 3, 15)).toBe(true);
	});

	it('never lets a burst of parallel requests past the limit', async () => {
		const results = await Promise.all(
			Array.from({ length: 20 }, () => allow(db, 'login:a', 5, 15))
		);
		expect(results.filter(Boolean)).toHaveLength(5);
	});
});

describe('clientKey', () => {
	it('keeps IPv4 addresses, including IPv4-mapped IPv6', () => {
		expect(clientKey('203.0.113.7')).toBe('203.0.113.7');
		expect(clientKey('::ffff:203.0.113.7')).toBe('203.0.113.7');
	});

	it('groups IPv6 addresses by their /64', () => {
		const key = clientKey('2001:db8:1:2:aaaa:bbbb:cccc:dddd');
		expect(key).toBe('2001:db8:1:2::/64');
		expect(clientKey('2001:0DB8:0001:0002::1')).toBe(key);
		expect(clientKey('2001:db8:1:2::')).toBe(key);
		expect(clientKey('2001:db8:1:3::1')).not.toBe(key);
		expect(clientKey('2001:db8::1')).toBe('2001:db8:0:0::/64');
	});
});
