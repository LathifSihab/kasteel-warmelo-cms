import { fail, redirect } from '@sveltejs/kit';
import {
	checkPassword,
	createSession,
	passwordConfigured,
	SESSION_COOKIE,
	SESSION_HOURS
} from '#lib/server/auth.ts';
import { getDb } from '#lib/server/db/index.ts';
import { allow } from '#lib/server/rate-limit.ts';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = ({ locals }) => {
	if (locals.session) redirect(303, '/admin');
	return { configured: passwordConfigured() };
};

export const actions: Actions = {
	default: async ({ request, cookies, getClientAddress }) => {
		if (!passwordConfigured())
			return fail(500, { error: 'ADMIN_PASSWORD en SESSION_SECRET zijn niet ingesteld.' });

		const db = await getDb();
		if (!(await allow(db, 'login:' + getClientAddress(), 5, 15))) {
			return fail(429, { error: 'Te veel pogingen. Probeer het over 15 minuten opnieuw.' });
		}
		const password = String((await request.formData()).get('password') ?? '');
		if (!(await checkPassword(password))) return fail(401, { error: 'Onjuist wachtwoord.' });

		cookies.set(SESSION_COOKIE, await createSession(), {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: SESSION_HOURS * 3600
		});
		redirect(303, '/admin');
	}
};
