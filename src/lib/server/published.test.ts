import { beforeEach, describe, expect, it } from 'vitest';
import type { Content } from '#lib/site/site.ts';
import { publishDrafts, saveDrafts } from './content.ts';
import { migrate } from './db/migrations.ts';
import { createMemoryDb } from './db/pglite.ts';
import type { Db } from './db/types.ts';

// Workers KV as the CONTENT binding. The adapter's stand-in for `cloudflare:workers` reads
// its env from this global (vi.mock can't reach it: the adapter marks the module external).
const kv = new Map<string, string>();
Object.assign(globalThis, {
	__sveltekit_cloudflare_platform: {
		env: {
			CONTENT: {
				get: async (key: string, opts: { type: string }) => {
					const v = kv.get(key);
					return v === undefined ? null : opts.type === 'json' ? JSON.parse(v) : v;
				},
				put: async (key: string, value: string) => void kv.set(key, value)
			}
		}
	}
});

const { publishedContent, refreshPublished } = await import('./published.ts');

let db: Db;
let opened: number;
const getDb = async () => (opened++, db);
beforeEach(async () => {
	kv.clear();
	opened = 0;
	db = createMemoryDb();
	await migrate(db);
});

// Every public page view queried Neon, so the Free plan's compute never got to sleep
describe('published content for visitors', () => {
	it('reads the database once, then serves from KV without touching it', async () => {
		await saveDrafts(db, 'a', [{ key: 'contact:phone', lang: '*', value: '1' }]);
		await publishDrafts(db, 'a');

		expect((await publishedContent(getDb)).values['contact:phone']).toBe('1');
		expect(opened).toBe(1);
		for (let i = 0; i < 5; i++) await publishedContent(getDb);
		expect(opened).toBe(1);
	});

	it('shows a publish once the admin refreshes KV, and never shows drafts', async () => {
		await publishedContent(getDb); // cached: nothing published yet
		await saveDrafts(db, 'a', [{ key: 'contact:phone', lang: '*', value: '2' }]);
		expect((await publishedContent(getDb)).values['contact:phone']).toBeUndefined();

		await publishDrafts(db, 'a');
		await refreshPublished(db);
		const seen: Content = await publishedContent(getDb);
		expect(seen.values['contact:phone']).toBe('2');
		expect(opened).toBe(1);
	});
});
