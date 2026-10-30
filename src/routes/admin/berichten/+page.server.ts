import { getDb } from '#lib/server/db/index.ts';
import { requireSession } from '#lib/server/guard.ts';
import type { Actions, PageServerLoad } from './$types';

export interface Message {
	id: string;
	name: string;
	email: string;
	phone: string;
	subject: string;
	message: string;
	created_at: string;
	read_at: string | null;
}

export const load: PageServerLoad = async ({ locals }) => {
	requireSession(locals);
	const messages = await (
		await getDb()
	).query<Message>(
		`select id::text, name, email, phone, subject, message, created_at::text, read_at::text
		from messages order by created_at desc limit 200`
	);
	return { messages };
};

const idOf = async (request: Request) => String((await request.formData()).get('id') ?? '');

export const actions: Actions = {
	read: async ({ request, locals }) => {
		requireSession(locals);
		await (
			await getDb()
		).query('update messages set read_at = coalesce(read_at, now()) where id = $1::bigint', [
			await idOf(request)
		]);
	},
	unread: async ({ request, locals }) => {
		requireSession(locals);
		await (
			await getDb()
		).query('update messages set read_at = null where id = $1::bigint', [await idOf(request)]);
	},
	delete: async ({ request, locals }) => {
		requireSession(locals);
		await (
			await getDb()
		).query('delete from messages where id = $1::bigint', [await idOf(request)]);
	}
};
