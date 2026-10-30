import { beforeEach, describe, expect, it, vi } from 'vitest';

type R2Like = { body: ReadableStream; size: number; httpEtag: string; httpMetadata: object };
const getObject = vi.fn<(key: string) => Promise<R2Like | null>>();
vi.mock('#lib/server/storage.ts', () => ({ getObject, storageConfigured: () => true }));
vi.mock('cloudflare:workers', () => ({ waitUntil: (p: Promise<unknown>) => p }));

// Cloudflare's edge cache, keyed by URL. Like the real one, it hands back immutable headers.
const stored = new Map<string, Response>();
const immutable = (res: Response) => {
	const headers = new Proxy(res.headers, {
		get(target, prop) {
			if (prop === 'set' || prop === 'append' || prop === 'delete')
				return () => {
					throw new TypeError("Can't modify immutable headers.");
				};
			const v = Reflect.get(target, prop);
			return typeof v === 'function' ? v.bind(target) : v;
		}
	});
	return Object.defineProperty(res, 'headers', { value: headers });
};
vi.stubGlobal('caches', {
	default: {
		match: async (r: Request) => {
			const res = stored.get(r.url);
			return res && immutable(res.clone());
		},
		put: async (r: Request, res: Response) => void stored.set(r.url, res)
	}
});

const { GET } = await import('./+server.ts');

const KEY = 'uploads/2026/7e200be7-4afa-4125-ac31-be9528899aaa.webp';
// an R2 object as the MEDIA binding returns it
const image = (): R2Like => ({
	body: new Response('img').body!,
	size: 3,
	httpEtag: '"e1"',
	httpMetadata: { contentType: 'image/webp' }
});
const get = (query = '') => {
	const request = new Request(`https://kasteelwarmelo.nl/media/${KEY}${query}`);
	const event = { params: { key: KEY }, request, url: new URL(request.url) };
	return Promise.resolve(GET(event as never)).catch(
		(e: { status: number }) => new Response(null, { status: e.status })
	);
};

beforeEach(() => {
	getObject.mockReset();
	stored.clear();
});

describe('GET /media/…', () => {
	// The adapter passes no `platform`, so nothing was ever cached and every view hit the bucket
	it('fetches a file from the bucket once, then serves it from the edge cache', async () => {
		getObject.mockImplementation(async () => image());
		const first = await get();
		expect(first.status).toBe(200);
		expect(first.headers.get('content-type')).toBe('image/webp');
		expect(first.headers.get('content-length')).toBe('3');
		const again = await get('?t=2');
		expect(again.status).toBe(200);
		expect(await again.text()).toBe('img');
		expect(getObject).toHaveBeenCalledTimes(1);
		// the hook adds security headers to every response; a cache hit 500'd on that
		expect(() => again.headers.set('x-content-type-options', 'nosniff')).not.toThrow();
	});

	it('answers 404 for a missing file and does not cache it', async () => {
		getObject.mockResolvedValue(null);
		expect((await get()).status).toBe(404);
		expect(stored.size).toBe(0);
	});
});
