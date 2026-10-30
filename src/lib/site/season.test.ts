import { describe, expect, it } from 'vitest';
import { seasonActive, todayInNL } from './season.ts';

const winter = { on: true, from: '2026-11-01', to: '2027-03-31', repeat: true };

describe('seasonActive', () => {
	it.each([
		['2026-12-15', true],
		['2027-02-10', true],
		['2027-03-31', true], // last day included
		['2026-11-01', true], // first day included
		['2027-04-01', false],
		['2026-07-01', false],
		['2028-01-05', true] // repeats every year
	])('recurring winter window on %s → %s', (today, expected) => {
		expect(seasonActive(winter, today)).toBe(expected);
	});

	it('a fixed (non-repeating) window does not come back next year', () => {
		expect(seasonActive({ ...winter, repeat: false }, '2026-12-15')).toBe(true);
		expect(seasonActive({ ...winter, repeat: false }, '2028-01-05')).toBe(false);
	});

	it('without dates it is a manual switch', () => {
		expect(seasonActive({ on: true }, '2026-07-01')).toBe(true);
		expect(seasonActive({ on: false }, '2026-07-01')).toBe(false);
		expect(seasonActive(undefined, '2026-07-01')).toBe(false);
	});
});

describe('todayInNL', () => {
	it('uses Dutch time, so the switch happens at Dutch midnight', () => {
		// 23:30 UTC on 31 March is already 1 April in Amsterdam (CEST, UTC+2)
		expect(todayInNL(new Date('2027-03-31T23:30:00Z'))).toBe('2027-04-01');
		expect(todayInNL(new Date('2027-03-31T21:30:00Z'))).toBe('2027-03-31');
	});
});
