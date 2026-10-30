<script lang="ts">
	import { getSite } from '#lib/site/context.ts';

	const c = getSite();
</script>

<nav class="nav">
	<div class="wrap nav__inner">
		<a class="nav__logo" href={c.href('./index.html')}>
			<img
				class="nav__crest"
				src="/assets/images/wapenschild-t.webp"
				width="342"
				height="440"
				alt="Wapen"
			/>
			<span class="nav__name" data-edit={c.edit('contact:name')}>{c.contact('name')}</span>
		</a>
		<div class="nav__links">
			<a
				class={c.navClass('./index.html', '')}
				aria-current={c.isCurrent('./index.html') ? 'page' : undefined}
				href={c.href('./index.html')}
				data-edit={c.edit('nav.home')}>{@html c.t('nav.home')}</a
			>
			<a
				href={c.href('./zandsculpturen.html')}
				class={c.navClass('./zandsculpturen.html', '')}
				aria-current={c.isCurrent('./zandsculpturen.html') ? 'page' : undefined}
				data-edit={c.edit('nav.sand')}>{@html c.t('nav.sand')}</a
			>
			<a
				href={c.href('./tuinen.html')}
				class={c.navClass('./tuinen.html', '')}
				aria-current={c.isCurrent('./tuinen.html') ? 'page' : undefined}
				data-edit={c.edit('nav.gardens')}>{@html c.t('nav.gardens')}</a
			>
			<a
				href={c.href('./evenementen.html')}
				class={c.navClass('./evenementen.html', '')}
				aria-current={c.isCurrent('./evenementen.html') ? 'page' : undefined}
				data-edit={c.edit('nav.events')}>{@html c.t('nav.events')}</a
			>
			<a
				href={c.href('./horeca.html')}
				class={c.navClass('./horeca.html', '')}
				aria-current={c.isCurrent('./horeca.html') ? 'page' : undefined}
				data-edit={c.edit('nav.horeca')}>{@html c.t('nav.horeca')}</a
			>
			<a
				href={c.href('./verhuur.html')}
				class={c.navClass('./verhuur.html', '')}
				aria-current={c.isCurrent('./verhuur.html') ? 'page' : undefined}
				data-edit={c.edit('nav.stay')}>{@html c.t('nav.stay')}</a
			>
			<a
				href={c.href('./openingstijden.html')}
				class={c.navClass('./openingstijden.html', '')}
				aria-current={c.isCurrent('./openingstijden.html') ? 'page' : undefined}
				data-edit={c.edit('nav.visit')}>{@html c.t('nav.visit')}</a
			>
		</div>
		<div class="lang-switcher">
			<a
				class={c.lang === 'nl' ? 'lang-btn active' : 'lang-btn'}
				href={c.langHref('nl')}
				hreflang="nl">NL</a
			>
			<a
				class={c.lang === 'en' ? 'lang-btn active' : 'lang-btn'}
				href={c.langHref('en')}
				hreflang="en">EN</a
			>
			<a
				class={c.lang === 'de' ? 'lang-btn active' : 'lang-btn'}
				href={c.langHref('de')}
				hreflang="de">DE</a
			>
		</div>
		<a
			class={c.navClass('./contact.html', 'nav__cta')}
			href={c.href('./contact.html')}
			aria-current={c.isCurrent('./contact.html') ? 'page' : undefined}
			data-edit={c.edit('nav.cta')}>{@html c.t('nav.cta')}</a
		>
		<button class="nav__ham" aria-label="Menu">
			<span></span><span></span><span></span>
		</button>
	</div>
</nav>

<div class="nav__overlay">
	<button class="nav__close">✕</button>
	<a
		class={c.navClass('./index.html', '')}
		aria-current={c.isCurrent('./index.html') ? 'page' : undefined}
		href={c.href('./index.html')}
		data-edit={c.edit('nav.home')}>{@html c.t('nav.home')}</a
	>
	<a
		href={c.href('./zandsculpturen.html')}
		class={c.navClass('./zandsculpturen.html', '')}
		aria-current={c.isCurrent('./zandsculpturen.html') ? 'page' : undefined}
		data-edit={c.edit('nav.sand')}>{@html c.t('nav.sand')}</a
	>
	<a
		href={c.href('./tuinen.html')}
		class={c.navClass('./tuinen.html', '')}
		aria-current={c.isCurrent('./tuinen.html') ? 'page' : undefined}
		data-edit={c.edit('nav.gardens')}>{@html c.t('nav.gardens')}</a
	>
	<a
		href={c.href('./evenementen.html')}
		class={c.navClass('./evenementen.html', '')}
		aria-current={c.isCurrent('./evenementen.html') ? 'page' : undefined}
		data-edit={c.edit('nav.events')}>{@html c.t('nav.events')}</a
	>
	<a
		href={c.href('./horeca.html')}
		class={c.navClass('./horeca.html', '')}
		aria-current={c.isCurrent('./horeca.html') ? 'page' : undefined}
		data-edit={c.edit('nav.horeca')}>{@html c.t('nav.horeca')}</a
	>
	<a
		href={c.href('./verhuur.html')}
		class={c.navClass('./verhuur.html', '')}
		aria-current={c.isCurrent('./verhuur.html') ? 'page' : undefined}
		data-edit={c.edit('nav.stay')}>{@html c.t('nav.stay')}</a
	>
	<a
		href={c.href('./openingstijden.html')}
		class={c.navClass('./openingstijden.html', '')}
		aria-current={c.isCurrent('./openingstijden.html') ? 'page' : undefined}
		data-edit={c.edit('nav.visit')}>{@html c.t('nav.visit')}</a
	>
	<a
		href={c.href('./contact.html')}
		class={c.navClass('./contact.html', '')}
		aria-current={c.isCurrent('./contact.html') ? 'page' : undefined}
		data-edit={c.edit('nav.cta')}>{@html c.t('nav.cta')}</a
	>
	<div class="lang-switcher" style="margin-top:32px;">
		<a
			class={c.lang === 'nl' ? 'lang-btn active' : 'lang-btn'}
			href={c.langHref('nl')}
			hreflang="nl">NL</a
		>
		<a
			class={c.lang === 'en' ? 'lang-btn active' : 'lang-btn'}
			href={c.langHref('en')}
			hreflang="en">EN</a
		>
		<a
			class={c.lang === 'de' ? 'lang-btn active' : 'lang-btn'}
			href={c.langHref('de')}
			hreflang="de">DE</a
		>
	</div>
</div>
