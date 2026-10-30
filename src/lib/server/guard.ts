import { error } from '@sveltejs/kit';

/** For admin endpoints: the signed-in session, or 401. */
export function requireSession(locals: App.Locals): { sid: string } {
	if (!locals.session) error(401, 'Niet ingelogd');
	return locals.session;
}
