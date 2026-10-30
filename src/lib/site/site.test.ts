import { describe, expect, it } from 'vitest';
import { toPlain } from './html.ts';
import { DEFAULTS, Site, telHref, type Content } from './site.ts';

const empty: Content = { texts: {}, values: {} };
const site = (over: Content = empty, lang: 'nl' | 'en' | 'de' = 'nl', today = '2026-12-15') =>
	new Site(lang, 'index', over, false, today);

describe('texts', () => {
	it('falls back from saved → original → Dutch', () => {
		expect(site().t('nav.home')).toBe(DEFAULTS.texts['nav.home'].nl);
		expect(site(empty, 'de').t('nav.home')).toBe(DEFAULTS.texts['nav.home'].de);
		expect(site({ texts: { 'nav.home': { nl: 'Start' } }, values: {} }).t('nav.home')).toBe(
			'Start'
		);
		// a key with only Dutch text (Verhuur) shows Dutch in English
		expect(site(empty, 'en').t('stay.homes.label')).toBe(DEFAULTS.texts['stay.homes.label'].nl);
		// an English edit wins over the original English text, not the Dutch edit
		const over = { texts: { 'nav.home': { nl: 'Start', en: 'Start EN' } }, values: {} };
		expect(site(over, 'en').t('nav.home')).toBe('Start EN');
	});

	it('plain() strips markup for titles and placeholders', () => {
		expect(toPlain('Kasteel<br><em>Warmelo</em> &amp; tuinen&nbsp;!')).toBe(
			'Kasteel Warmelo & tuinen !'
		);
	});
});

describe('links', () => {
	it('maps old links to the current language', () => {
		expect(site(empty, 'en').href('./tuinen.html#x')).toBe('/en/tuinen#x');
		expect(site().href('https://example.com')).toBe('https://example.com');
		expect(site(empty, 'de').langHref('nl')).toBe('/');
	});

	it('marks the current page in the menu', () => {
		expect(site().navClass('./index.html', 'nav__cta')).toBe('nav__cta active');
		expect(site().navClass('./tuinen.html', '')).toBe('');
	});
});

describe('buttons', () => {
	const winter = (extra = {}) => ({
		texts: {},
		values: {
			'btn:home-hero-visit': JSON.stringify({
				alt: {
					on: true,
					from: '2026-11-01',
					to: '2027-03-31',
					repeat: true,
					href: './evenementen.html',
					label: { nl: 'Bekijk evenementen' }
				},
				...extra
			})
		}
	});

	it('switches link and label during the season', () => {
		const s = site(winter());
		expect(s.btnHref('home-hero-visit', './openingstijden.html')).toBe('/evenementen');
		expect(s.btnLabel('home-hero-visit', 'home.hero.btn.visit')).toBe('Bekijk evenementen');
	});

	it('shows the normal button outside the season', () => {
		const s = site(winter(), 'nl', '2026-07-01');
		expect(s.btnHref('home-hero-visit', './openingstijden.html')).toBe('/openingstijden');
		expect(s.btnLabel('home-hero-visit', 'home.hero.btn.visit')).toBe(
			DEFAULTS.texts['home.hero.btn.visit'].nl
		);
	});

	it('keeps the normal label in a language without a seasonal label', () => {
		expect(site(winter(), 'en').btnLabel('home-hero-visit', 'home.hero.btn.visit')).toBe(
			DEFAULTS.texts['home.hero.btn.visit'].en
		);
	});

	it('escapes seasonal labels (they are plain text)', () => {
		const over = {
			texts: {},
			values: { 'btn:x': JSON.stringify({ alt: { on: true, label: { nl: '<b>x</b>' } } }) }
		};
		expect(site(over).btnLabel('x', 'nav.home')).toBe('&lt;b&gt;x&lt;/b&gt;');
	});

	it('can hide a button, and ignores broken settings', () => {
		expect(site({ texts: {}, values: { 'btn:x': '{"hidden":true}' } }).btnHidden('x')).toBe(true);
		expect(site({ texts: {}, values: { 'btn:x': '{broken' } }).btnHref('x', './tuinen.html')).toBe(
			'/tuinen'
		);
	});
});

describe('values', () => {
	it('formats prices and phone links', () => {
		expect(site({ texts: {}, values: { 'cms:price-kind': '4,50' } }).price('cms:price-kind')).toBe(
			'€ 4,50'
		);
		expect(site({ texts: {}, values: { 'cms:price-kind': '€ 4' } }).price('cms:price-kind')).toBe(
			'€ 4'
		);
		expect(telHref('0547 – 352547')).toBe('+31547352547');
		expect(telHref('+49 30 123')).toBe('+4930123');
		expect(telHref('0031 547 352547')).toBe('+31547352547');
	});

	it('uses the original crop until it is edited', () => {
		expect(site().imgStyle('zand-was')).toBe('object-position:55.2% 0.0%');
		expect(site().imgHeight('zand-was')).toBe('440px');
		const over = { texts: {}, values: { 'fit:zand-was': '{"pos":"50% 50%","scale":1.2}' } };
		expect(site(over).imgStyle('zand-was')).toContain('--cms-scale:1.2');
		expect(site(over).imgClass('zand-was', '')).toBe('cms-scaled');
		expect(site(over).imgHeight('zand-was')).toBeUndefined();
	});
});
