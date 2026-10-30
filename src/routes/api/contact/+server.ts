import { error, json } from '@sveltejs/kit';
import { getDb } from '#lib/server/db/index.ts';
import { allow } from '#lib/server/rate-limit.ts';
import type { RequestHandler } from './$types';

const LIMITS = { fname: 100, lname: 100, email: 200, phone: 50, subject: 100, message: 5000 };
type Form = Record<keyof typeof LIMITS, string>;

/** The contact form (sent by warmelo.min.js). Messages land in the admin inbox. */
export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	const body = (await request.json().catch(() => null)) as Partial<Record<string, unknown>> | null;
	if (!body) error(400, 'Ongeldig verzoek');

	const f = {} as Form;
	for (const [k, max] of Object.entries(LIMITS) as [keyof Form, number][]) {
		f[k] = typeof body[k] === 'string' ? (body[k] as string).trim() : '';
		if (f[k].length > max) error(400, `${k} is te lang`);
	}
	if (!f.fname || !f.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
		error(400, 'Naam, e-mail en bericht zijn verplicht');

	const db = await getDb();
	if (!(await allow(db, 'contact:' + getClientAddress(), 5, 60)))
		error(429, 'Te veel berichten, probeer het later opnieuw');

	await db.query(
		'insert into messages (name, email, phone, subject, message) values ($1, $2, $3, $4, $5)',
		[[f.fname, f.lname].filter(Boolean).join(' '), f.email, f.phone, f.subject, f.message]
	);
	return json({ ok: true });
};
