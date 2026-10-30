import { beforeEach, describe, expect, it } from 'vitest';
import { discardDrafts, loadContent, publishDrafts, saveDrafts } from './content.ts';
import { createMemoryDb } from './db/pglite.ts';
import { migrate } from './db/migrations.ts';
import type { Db } from './db/types.ts';

let db: Db;
beforeEach(async () => {
	db = createMemoryDb();
	await migrate(db);
});

describe('drafts and publishing', () => {
	it('drafts show only in that session’s preview until published', async () => {
		await saveDrafts(db, 'a', [{ key: 'nav.home', lang: 'nl', value: 'Start' }]);
		expect((await loadContent(db)).texts['nav.home']).toBeUndefined();
		expect((await loadContent(db, 'a')).texts['nav.home']).toEqual({ nl: 'Start' });
		expect((await loadContent(db, 'b')).texts['nav.home']).toBeUndefined();

		expect(await publishDrafts(db, 'a')).toBe(1);
		expect((await loadContent(db)).texts['nav.home']).toEqual({ nl: 'Start' });
		expect(await publishDrafts(db, 'a')).toBe(0); // drafts are gone
	});

	it('the last draft of a key wins, and null resets to the original', async () => {
		await saveDrafts(db, 'a', [{ key: 'contact:phone', lang: '*', value: '1' }]);
		await saveDrafts(db, 'a', [{ key: 'contact:phone', lang: '*', value: '2' }]);
		await publishDrafts(db, 'a');
		expect((await loadContent(db)).values['contact:phone']).toBe('2');

		await saveDrafts(db, 'a', [{ key: 'contact:phone', lang: '*', value: null }]);
		expect((await loadContent(db, 'a')).values['contact:phone']).toBeUndefined();
		await publishDrafts(db, 'a');
		expect((await loadContent(db)).values).toEqual({});
	});

	it('records history with old and new values', async () => {
		await saveDrafts(db, 'a', [{ key: 'nav.home', lang: 'en', value: 'Start' }]);
		await publishDrafts(db, 'a');
		await saveDrafts(db, 'a', [{ key: 'nav.home', lang: 'en', value: 'Begin' }]);
		await publishDrafts(db, 'a');
		const rows = await db.query<{ old_value: string | null; new_value: string }>(
			'select old_value, new_value from content_history order by id'
		);
		expect(rows).toEqual([
			{ old_value: null, new_value: 'Start' },
			{ old_value: 'Start', new_value: 'Begin' }
		]);
	});

	it('discard throws away only that session’s drafts', async () => {
		await saveDrafts(db, 'a', [{ key: 'nav.home', lang: 'nl', value: 'A' }]);
		await saveDrafts(db, 'b', [{ key: 'nav.home', lang: 'nl', value: 'B' }]);
		await discardDrafts(db, 'a');
		expect((await loadContent(db, 'a')).texts['nav.home']).toBeUndefined();
		expect((await loadContent(db, 'b')).texts['nav.home']).toEqual({ nl: 'B' });
	});

	it('migrations run once', async () => {
		expect(await migrate(db)).toBe(0);
	});
});
