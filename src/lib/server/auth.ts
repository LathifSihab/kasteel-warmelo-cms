import { ADMIN_PASSWORD, SESSION_SECRET } from '$app/env/private';

export const SESSION_COOKIE = 'wcms_session';
export const SESSION_HOURS = 12;

const enc = new TextEncoder();

function secret(): string {
	if (!SESSION_SECRET || SESSION_SECRET.length < 32) {
		throw new Error('SESSION_SECRET must be set to a random string of at least 32 characters');
	}
	return SESSION_SECRET;
}

async function hmac(data: string): Promise<Uint8Array> {
	const key = await crypto.subtle.importKey(
		'raw',
		enc.encode(secret()),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign']
	);
	return new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(data)));
}

function equal(a: Uint8Array, b: Uint8Array): boolean {
	if (a.length !== b.length) return false;
	let diff = 0;
	for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
	return diff === 0;
}

const b64url = (bytes: Uint8Array) =>
	btoa(String.fromCharCode(...bytes))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '');

export function passwordConfigured(): boolean {
	return !!ADMIN_PASSWORD && !!SESSION_SECRET;
}

/** Constant-time: both sides are HMAC'd first, so length and content don't leak through timing. */
export async function checkPassword(input: string): Promise<boolean> {
	if (!ADMIN_PASSWORD) return false;
	return equal(await hmac('pw:' + input), await hmac('pw:' + ADMIN_PASSWORD));
}

/** Cookie value "<sid>.<expires>.<signature>". The sid also keys this session's drafts. */
export async function createSession(): Promise<string> {
	const payload = `${crypto.randomUUID()}.${Date.now() + SESSION_HOURS * 3600_000}`;
	return `${payload}.${b64url(await hmac(payload))}`;
}

export async function readSession(cookie: string | undefined): Promise<{ sid: string } | null> {
	if (!cookie || !SESSION_SECRET) return null;
	const [sid, expires, sig] = cookie.split('.');
	if (!sid || !expires || !sig || Number(expires) < Date.now()) return null;
	const expected = b64url(await hmac(`${sid}.${expires}`));
	return equal(enc.encode(sig), enc.encode(expected)) ? { sid } : null;
}
