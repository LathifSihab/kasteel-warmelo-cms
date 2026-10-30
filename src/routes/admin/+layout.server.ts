import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ locals, url }) => {
	if (!locals.session && url.pathname !== '/admin/login') redirect(303, '/admin/login');
	return {};
};
