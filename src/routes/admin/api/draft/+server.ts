import { error, json } from '@sveltejs/kit';
import { editableKeys } from '#lib/content/fields.ts';
import { saveDrafts, type Change } from '#lib/server/content.ts';
import { getDb } from '#lib/server/db/index.ts';
import { requireSession } from '#lib/server/guard.ts';
import type { RequestHandler } from './$types';

const KEYS = editableKeys();
const MAX_VALUE = 20_000;

function validate(body: unknown): Change[] {
	const changes = (body as { changes?: unknown })?.changes;
	if (!Array.isArray(changes) || changes.length > 500) error(400, 'Ongeldige wijzigingen');
	return changes.map((c): Change => {
		const { key, lang, value } = (c ?? {}) as Record<string, unknown>;
		const kind = typeof key === 'string' ? KEYS.get(key) : undefined;
		if (!kind) error(400, `Onbekend veld: ${String(key)}`);
		const langOk =
			kind === 'neutral' ? lang === '*' : lang === 'nl' || lang === 'en' || lang === 'de';
		if (!langOk) error(400, `Ongeldige taal voor ${key}`);
		if (value !== null && (typeof value !== 'string' || value.length > MAX_VALUE))
			error(400, `Ongeldige waarde voor ${key}`);
		return { key: key as string, lang: lang as Change['lang'], value: value as string | null };
	});
}

/** Saves unpublished edits for this session; the preview shows them, visitors don't. */
export const POST: RequestHandler = async ({ request, locals }) => {
	const { sid } = requireSession(locals);
	const changes = validate(await request.json().catch(() => null));
	await saveDrafts(await getDb(), sid, changes);
	return json({ ok: true, saved: changes.length });
};
