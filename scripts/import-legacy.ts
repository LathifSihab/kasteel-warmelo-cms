// Imports the content saved in the old Warmelo CMS (Netlify, /api/cms) as published content.
//
//   npx tsx --env-file=.env scripts/import-legacy.ts https://kasteelwarmelo.nl          # dry run
//   npx tsx --env-file=.env scripts/import-legacy.ts https://kasteelwarmelo.nl --apply  # write
//   npx tsx --env-file=.env scripts/import-legacy.ts ./cms-export.json --apply          # from a file
//
// Uploaded images (/api/cms-img?id=…) are copied into the R2 bucket when the AWS_* variables (an
// R2 API token for its S3 API, see .env.example) are set; otherwise they keep pointing at the old
// site and are listed as warnings.
import { readFileSync } from 'node:fs';
import { editableKeys } from '../src/lib/content/fields.ts';
import { publishDrafts, saveDrafts, type Change } from '../src/lib/server/content.ts';
import { parseLegacyHref } from '../src/lib/site/pages.ts';
import type { ButtonSettings } from '../src/lib/site/site.ts';
import { connect } from './db.ts';
import { createS3 } from './s3.ts';

type Json = Record<string, unknown>;
const [source, ...flags] = process.argv.slice(2);
const apply = flags.includes('--apply');
if (!source) {
	console.error('usage: tsx scripts/import-legacy.ts <site URL or JSON file> [--apply]');
	process.exit(1);
}

const isUrl = /^https?:\/\//.test(source);
const origin = isUrl ? new URL(source).origin : undefined;
const legacy = (
	isUrl ? await (await fetch(origin + '/api/cms')).json() : JSON.parse(readFileSync(source, 'utf8'))
) as Json;

const KEYS = editableKeys();
const changes: Change[] = [];
const skipped: string[] = [];
const warnings: string[] = [];

function put(key: string, lang: Change['lang'], value: unknown) {
	if (value === undefined || value === null || value === '') return;
	if (!KEYS.has(key)) return void skipped.push(key);
	changes.push({ key, lang, value: typeof value === 'string' ? value : JSON.stringify(value) });
}
const entries = (o: unknown) => Object.entries((o ?? {}) as Json);

// ── texts: per language ({ nl: {…}, en: {…} }) or the old flat format (all languages → nl)
const i18n = (legacy.i18n ?? {}) as Json;
const perLang = ['nl', 'en', 'de'].some((l) => typeof i18n[l] === 'object');
for (const [lang, texts] of perLang ? entries(i18n) : [['nl', i18n] as [string, unknown]]) {
	for (const [k, v] of entries(texts)) put(k, lang as Change['lang'], v);
}

// ── language-neutral values
for (const [k, v] of entries(legacy.text)) put('cms:' + k, '*', v);
for (const [k, v] of entries(legacy.season)) put('cms:season-' + k, '*', v);
for (const [k, v] of entries(legacy.prices)) put('cms:price-' + k, '*', v);
for (const [k, v] of entries(legacy.menu)) put('menuprice:' + k, '*', v);
for (const [k, v] of entries(legacy.links)) put('link:' + k, '*', v);
for (const [k, v] of entries(legacy.contact)) put('contact:' + k, '*', v);
// the old CMS also stored bare page names ('openingstijden'); store them like the site's own links,
// or they stay relative and lose the language (/en → /openingstijden)
const pageLink = (href: unknown) => {
	const m = typeof href === 'string' ? href.match(/^([a-z-]+)(#.*)?$/) : null;
	const link = m && `./${m[1]}.html${m[2] ?? ''}`;
	return link && parseLegacyHref(link) ? link : href;
};
for (const [k, v] of entries(legacy.buttons)) {
	const b = v as ButtonSettings;
	put('btn:' + k, '*', {
		...b,
		href: pageLink(b.href),
		alt: b.alt && { ...b.alt, href: pageLink(b.alt.href) }
	});
}
for (const [k, v] of entries(legacy.imgfit)) put('fit:' + k, '*', v);

// ── events: the old CMS showed these texts in every language; they are imported as Dutch
const events = Array.isArray(legacy.events) ? (legacy.events as Json[]) : [];
events.forEach((e, i) => {
	const n = i + 1;
	put(`cms:event-e${n}-day`, '*', e.day);
	for (const f of ['month', 'tag', 'title', 'desc']) put(`events.e${n}.${f}`, 'nl', e[f]);
	if (e.hidden) put(`event:${n}:hidden`, '*', 'true');
});

// ── media: copy old uploads into the R2 bucket
const env = process.env;
const s3 =
	env.AWS_ACCESS_KEY_ID && env.AWS_SECRET_ACCESS_KEY && env.AWS_ENDPOINT_URL_S3
		? createS3({
				accessKeyId: env.AWS_ACCESS_KEY_ID,
				secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
				endpoint: env.AWS_ENDPOINT_URL_S3,
				region: env.AWS_REGION,
				bucket: env.MEDIA_BUCKET || 'kasteel-warmelo-media'
			})
		: undefined;
const { db, where } = connect();

async function media(key: string, url: unknown) {
	if (typeof url !== 'string' || !url) return;
	if (url.startsWith('/assets/') || url.startsWith('assets/'))
		return put(key, '*', '/' + url.replace(/^\//, ''));
	const absolute =
		url.startsWith('data:') || /^https?:/.test(url)
			? url
			: origin
				? origin + (url.startsWith('/') ? '' : '/') + url
				: undefined;
	if (!absolute)
		return void warnings.push(`${key}: cannot resolve ${url.slice(0, 60)} without a site URL`);
	if (!s3 || !apply) {
		warnings.push(
			`${key}: ${apply ? 'storage not configured, keeps old URL' : 'would be copied to storage'} (${absolute.slice(0, 70)})`
		);
		if (apply && !absolute.startsWith('data:')) put(key, '*', absolute);
		return;
	}
	const res = await fetch(absolute);
	if (!res.ok) return void warnings.push(`${key}: download failed (${res.status})`);
	const type = res.headers.get('content-type')?.split(';')[0] ?? 'application/octet-stream';
	const ext = {
		'image/jpeg': 'jpg',
		'image/png': 'png',
		'image/webp': 'webp',
		'image/gif': 'gif',
		'image/avif': 'avif',
		'video/mp4': 'mp4',
		'video/webm': 'webm'
	}[type];
	if (!ext) return void warnings.push(`${key}: unsupported type ${type}`);
	const id = crypto.randomUUID();
	const objectKey = `uploads/${new Date().getFullYear()}/${id}.${ext}`;
	const body = await res.arrayBuffer();
	await s3.put(objectKey, body, type);
	await db.query(
		'insert into media (id, object_key, filename, content_type, size) values ($1, $2, $3, $4, $5)',
		[id, objectKey, key, type, body.byteLength]
	);
	put(key, '*', '/media/' + objectKey);
}
for (const [k, v] of entries(legacy.images)) await media('img:' + k, v);
for (const [k, v] of entries(legacy.backgrounds)) await media('img:' + k, v);
for (const [k, v] of entries(legacy.videos)) await media('video:' + k, v);

// ── report and write
console.log(`Source: ${isUrl ? origin + '/api/cms' : source}`);
console.log(`Database: ${where}`);
console.log(`${changes.length} values to import`);
for (const c of changes)
	console.log(`  ${c.key} [${c.lang}] = ${c.value!.replace(/\s+/g, ' ').slice(0, 70)}`);
if (skipped.length)
	console.log(`Skipped (no longer on the site): ${[...new Set(skipped)].join(', ')}`);
for (const w of warnings) console.log('  ⚠ ' + w);

if (!apply) {
	console.log('\nDry run — nothing written. Add --apply to import.');
} else {
	await saveDrafts(db, 'legacy-import', changes);
	const n = await publishDrafts(db, 'legacy-import');
	console.log(`\nImported and published ${n} values.`);
}
await db.close?.();
