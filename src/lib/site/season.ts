/** A date window, e.g. winter. Dates are YYYY-MM-DD; with `repeat` only month and day count. */
export interface Season {
	on?: boolean;
	from?: string;
	to?: string;
	repeat?: boolean;
}

/** Today's date (YYYY-MM-DD) in the Netherlands, so the switch happens at Dutch midnight. */
export function todayInNL(now = new Date()): string {
	return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Amsterdam' }).format(now);
}

/** Whether a season is active on `today`. No dates means "always on" (a manual switch). */
export function seasonActive(s: Season | undefined, today: string): boolean {
	if (!s?.on) return false;
	let t = today,
		f = s.from ?? '',
		u = s.to ?? '';
	if (s.repeat) {
		t = t.slice(5);
		f = f.slice(5);
		u = u.slice(5);
		if (f && u && f > u) return t >= f || t <= u; // wraps over new year
	}
	return (!f || t >= f) && (!u || t <= u);
}
