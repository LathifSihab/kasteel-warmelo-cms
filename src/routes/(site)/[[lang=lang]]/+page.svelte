<script lang="ts">
	import { getSite } from '#lib/site/context.ts';
	import Loader from '#lib/site/components/Loader.svelte';

	const c = getSite();
</script>

<svelte:head>
	<title>{c.plain('seo.index.title')}</title>
	<meta name="description" content={c.plain('seo.index.description')} />
	<link rel="preload" as="image" href={c.img('index-hero')} fetchpriority="high" />
	<link rel="stylesheet" href="/assets/css/index.css" />
</svelte:head>

{#if !c.preview}<Loader />{/if}

<section class="hero grain">
	<div class="hero__media">
		<video
			class="hero__video"
			autoplay
			muted
			loop
			playsinline
			poster="/assets/images/dji_fly_20241108_182220_103_1731087789639_photo.webp"
			preload="metadata"
			data-edit={c.edit('video:index-hero-video')}
		>
			<source src={c.video('index-hero-video')} type="video/mp4" />
		</video>
		<img
			class={c.imgClass('index-hero', 'hero__bg-img')}
			src={c.img('index-hero')}
			alt="Kasteel Warmelo luchtfoto"
			data-edit={c.edit('img:index-hero')}
			style={c.imgStyle('index-hero')}
		/>
	</div>
	<div class="hero__atmo"></div>
	<div class="hero__glow"></div>

	<div class="hero__content">
		<div class="wrap">
			<div class="hero__text">
				<div class="hero__eyebrow">
					<span class="hero__eyebrow-line"></span>
					<span data-edit={c.edit('home.hero.eyebrow')}>{@html c.t('home.hero.eyebrow')}</span>
				</div>
				<h1 class="hero__title" data-edit={c.edit('home.hero.title')}>
					{@html c.t('home.hero.title')}
				</h1>
				<div class="hero__sep"></div>
				<p class="hero__sub" data-edit={c.edit('home.hero.sub')}>{@html c.t('home.hero.sub')}</p>
				<div class="hero__actions">
					<a
						class="btn btn-gold"
						href={c.btnHref('home-hero-sand', './zandsculpturen.html')}
						data-edit={c.edit('btn:home-hero-sand')}
						style:display={c.btnHidden('home-hero-sand') ? 'none' : undefined}
						><span>{@html c.btnLabel('home-hero-sand', 'home.hero.btn.sand')}</span></a
					>
					<a
						class="btn btn-outline-w"
						href={c.btnHref('home-hero-visit', './openingstijden.html')}
						data-edit={c.edit('btn:home-hero-visit')}
						style:display={c.btnHidden('home-hero-visit') ? 'none' : undefined}
						><span>{@html c.btnLabel('home-hero-visit', 'home.hero.btn.visit')}</span></a
					>
				</div>
			</div>
		</div>
	</div>

	<div class="hero__aside">
		<div class="hero__stat">
			<div
				class="hero__stat-num"
				data-count={c.v('cms:stat-history')}
				data-suffix="+"
				data-edit={c.edit('cms:stat-history')}
			>
				0
			</div>
			<div class="hero__stat-lbl" data-edit={c.edit('home.hero.stat.history')}>
				{@html c.t('home.hero.stat.history')}
			</div>
		</div>
		<div class="hero__stat">
			<div
				class="hero__stat-num"
				data-count={c.v('cms:stat-garden')}
				data-suffix=" ha"
				data-edit={c.edit('cms:stat-garden')}
			>
				0
			</div>
			<div class="hero__stat-lbl" data-edit={c.edit('home.hero.stat.garden')}>
				{@html c.t('home.hero.stat.garden')}
			</div>
		</div>
		<div class="hero__stat">
			<div
				class="hero__stat-num"
				data-count={c.v('cms:stat-sand-count')}
				data-suffix=""
				data-edit={c.edit('cms:stat-sand-count')}
			>
				0
			</div>
			<div class="hero__stat-lbl" data-edit={c.edit('home.hero.stat.sand')}>
				{@html c.t('home.hero.stat.sand')}
			</div>
		</div>
	</div>

	<div class="scroll-cue">
		<div class="scroll-cue__line"></div>
		<span data-edit={c.edit('home.scroll')}>{@html c.t('home.scroll')}</span>
	</div>
</section>

<section class="sand-promo">
	<div class="sand-promo__grid">
		<div class="sand-promo__text">
			<span class="label label--light reveal" data-edit={c.edit('home.sand.label')}
				>{@html c.t('home.sand.label')}</span
			>
			<div class="rule rule--light reveal d1"></div>
			<h2
				class="h-display h-display--white reveal d2"
				style="font-size: clamp(2.8rem,5vw,4.8rem); margin-bottom: 28px;"
				data-edit={c.edit('home.sand.title')}
			>
				{@html c.t('home.sand.title')}
			</h2>
			<p
				class="body-copy body-copy--white reveal d3"
				style="margin-bottom: 32px; max-width: 460px;"
				data-edit={c.edit('home.sand.body')}
			>
				{@html c.t('home.sand.body')}
			</p>
			<div class="reveal d4" style="display:flex; gap:14px; flex-wrap:wrap;">
				<a
					class="btn btn-gold"
					href={c.btnHref('home-sand-more', './zandsculpturen.html')}
					data-edit={c.edit('btn:home-sand-more')}
					style:display={c.btnHidden('home-sand-more') ? 'none' : undefined}
					><span>{@html c.btnLabel('home-sand-more', 'btn.sand.more')}</span></a
				>
				<a
					class="btn btn-outline-w"
					href={c.btnHref('home-sand-hours', './openingstijden.html')}
					data-edit={c.edit('btn:home-sand-hours')}
					style:display={c.btnHidden('home-sand-hours') ? 'none' : undefined}
					><span>{@html c.btnLabel('home-sand-hours', 'btn.hours')}</span></a
				>
			</div>

			<div
				class="reveal d5 stats-grid-2col"
				style="margin-top: 48px; display:grid; grid-template-columns:1fr 1fr; gap:24px; max-width:380px;"
			>
				<div>
					<div
						style="font-family:var(--ff-display); font-size:2.6rem; color:var(--gold-bright); line-height:1;"
						data-count={c.v('cms:stat-sculpturen')}
						data-suffix=""
						data-edit={c.edit('cms:stat-sculpturen')}
					>
						0
					</div>
					<div
						style="font-size:9px; letter-spacing:.28em; text-transform:uppercase; color:rgba(255,255,255,.4); margin-top:6px;"
						data-edit={c.edit('home.sand.stat.sculpturen')}
					>
						{@html c.t('home.sand.stat.sculpturen')}
					</div>
				</div>
				<div>
					<div
						style="font-family:var(--ff-display); font-size:2.6rem; color:var(--gold-bright); line-height:1;"
						data-count={c.v('cms:stat-artists')}
						data-suffix=""
						data-edit={c.edit('cms:stat-artists')}
					>
						0
					</div>
					<div
						style="font-size:9px; letter-spacing:.28em; text-transform:uppercase; color:rgba(255,255,255,.4); margin-top:6px;"
						data-edit={c.edit('home.sand.stat.artists')}
					>
						{@html c.t('home.sand.stat.artists')}
					</div>
				</div>
				<div>
					<div
						style="font-family:var(--ff-display); font-size:2.6rem; color:var(--gold-bright); line-height:1;"
						data-count={c.v('cms:stat-zand')}
						data-suffix=" m³"
						data-edit={c.edit('cms:stat-zand')}
					>
						0
					</div>
					<div
						style="font-size:9px; letter-spacing:.28em; text-transform:uppercase; color:rgba(255,255,255,.4); margin-top:6px;"
						data-edit={c.edit('home.sand.stat.sand')}
					>
						{@html c.t('home.sand.stat.sand')}
					</div>
				</div>
				<div>
					<div
						style="font-family:var(--ff-display); font-size:2.6rem; color:var(--gold-bright); line-height:1;"
						data-count={c.v('cms:stat-landen')}
						data-suffix=""
						data-edit={c.edit('cms:stat-landen')}
					>
						0
					</div>
					<div
						style="font-size:9px; letter-spacing:.28em; text-transform:uppercase; color:rgba(255,255,255,.4); margin-top:6px;"
						data-edit={c.edit('home.sand.stat.countries')}
					>
						{@html c.t('home.sand.stat.countries')}
					</div>
				</div>
			</div>
		</div>

		<div class="sand-promo__images" style="grid-template-columns:1fr; grid-template-rows:1fr;">
			<div class="sand-promo__img" data-lightbox="/assets/images/dino.webp" title="Dino sculptuur">
				<img
					loading="lazy"
					src={c.img('index-dino')}
					alt="Dino zandsculptuur"
					data-edit={c.edit('img:index-dino')}
					style={c.imgStyle('index-dino')}
					class={c.imgClass('index-dino', '')}
				/>
			</div>
		</div>
	</div>
</section>

<div class="about-strip">
	<div class="about-strip__image">
		<img
			loading="lazy"
			src={c.img('index-luchtfoto2')}
			alt="Kasteel Warmelo met formele tuin en rozenperken"
			data-edit={c.edit('img:index-luchtfoto2')}
			style={c.imgStyle('index-luchtfoto2')}
			class={c.imgClass('index-luchtfoto2', '')}
		/>
		<div class="about-strip__image-overlay"></div>
	</div>
	<div class="about-strip__content">
		<span class="label label--light reveal" data-edit={c.edit('home.about.label')}
			>{@html c.t('home.about.label')}</span
		>
		<div class="rule rule--light reveal d1"></div>
		<h2
			class="h-display h-display--white reveal d2"
			style="margin-bottom:28px;"
			data-edit={c.edit('home.about.title')}
		>
			{@html c.t('home.about.title')}
		</h2>
		<blockquote class="about-strip__quote reveal d3" data-edit={c.edit('home.about.quote')}>
			{@html c.t('home.about.quote')}
		</blockquote>
		<p
			class="body-copy body-copy--white reveal d4"
			style="margin-bottom:16px;"
			data-edit={c.edit('home.about.body1')}
		>
			{@html c.t('home.about.body1')}
		</p>
		<p
			class="body-copy body-copy--white reveal d5"
			style="margin-bottom:36px;"
			data-edit={c.edit('home.about.body2')}
		>
			{@html c.t('home.about.body2')}
		</p>
		<a
			class="btn btn-outline-w reveal d6"
			href={c.btnHref('home-about', './tuinen.html')}
			data-edit={c.edit('btn:home-about')}
			style:display={c.btnHidden('home-about') ? 'none' : undefined}
			><span>{@html c.btnLabel('home-about', 'home.about.btn')}</span></a
		>
	</div>
</div>

<section>
	<div class="highlights-grid">
		<a class="highlight-card" href={c.href('./tuinen.html')}>
			<div class="highlight-card__bg">
				<img
					loading="lazy"
					src={c.img('index-luchtfoto')}
					alt="Tuinen"
					data-edit={c.edit('img:index-luchtfoto')}
					style={c.imgStyle('index-luchtfoto')}
					class={c.imgClass('index-luchtfoto', '')}
				/>
			</div>
			<div class="highlight-card__atmo"></div>
			<div class="highlight-card__content">
				<span class="highlight-card__tag" data-edit={c.edit('home.grid.gardens.tag')}
					>{@html c.t('home.grid.gardens.tag')}</span
				>
				<h3 class="highlight-card__title" data-edit={c.edit('home.grid.gardens.title')}>
					{@html c.t('home.grid.gardens.title')}
				</h3>
				<span class="highlight-card__arrow" data-edit={c.edit('home.grid.gardens.arrow')}
					>{@html c.t('home.grid.gardens.arrow')}</span
				>
			</div>
		</a>
		<a class="highlight-card" href={c.href('./evenementen.html')}>
			<div class="highlight-card__bg">
				<img
					loading="lazy"
					src={c.img('index-menwedstrijd')}
					alt="Evenementen"
					data-edit={c.edit('img:index-menwedstrijd')}
					style={c.imgStyle('index-menwedstrijd')}
					class={c.imgClass('index-menwedstrijd', '')}
				/>
			</div>
			<div class="highlight-card__atmo"></div>
			<div class="highlight-card__content">
				<span class="highlight-card__tag" data-edit={c.edit('home.grid.events.tag')}
					>{@html c.t('home.grid.events.tag')}</span
				>
				<h3 class="highlight-card__title" data-edit={c.edit('home.grid.events.title')}>
					{@html c.t('home.grid.events.title')}
				</h3>
				<span class="highlight-card__arrow" data-edit={c.edit('home.grid.events.arrow')}
					>{@html c.t('home.grid.events.arrow')}</span
				>
			</div>
		</a>
		<a class="highlight-card" href={c.href('./horeca.html')}>
			<div class="highlight-card__bg">
				<img
					loading="lazy"
					src={c.img('index-terras')}
					alt="Horeca &amp; Terras"
					data-edit={c.edit('img:index-terras')}
					style={c.imgStyle('index-terras')}
					class={c.imgClass('index-terras', '')}
				/>
			</div>
			<div class="highlight-card__atmo"></div>
			<div class="highlight-card__content">
				<span class="highlight-card__tag" data-edit={c.edit('home.grid.horeca.tag')}
					>{@html c.t('home.grid.horeca.tag')}</span
				>
				<h3 class="highlight-card__title" data-edit={c.edit('home.grid.horeca.title')}>
					{@html c.t('home.grid.horeca.title')}
				</h3>
				<span class="highlight-card__arrow" data-edit={c.edit('home.grid.horeca.arrow')}
					>{@html c.t('home.grid.horeca.arrow')}</span
				>
			</div>
		</a>
		<a class="highlight-card" href={c.href('./verhuur.html')}>
			<div class="highlight-card__bg">
				<img
					loading="lazy"
					src={c.img('index-boven')}
					alt="Vakantiewoning"
					data-edit={c.edit('img:index-boven')}
					style={c.imgStyle('index-boven')}
					class={c.imgClass('index-boven', '')}
				/>
			</div>
			<div class="highlight-card__atmo"></div>
			<div class="highlight-card__content">
				<span class="highlight-card__tag" data-edit={c.edit('home.grid.stay.tag')}
					>{@html c.t('home.grid.stay.tag')}</span
				>
				<h3 class="highlight-card__title" data-edit={c.edit('home.grid.stay.title')}>
					{@html c.t('home.grid.stay.title')}
				</h3>
				<span class="highlight-card__arrow" data-edit={c.edit('home.grid.stay.arrow')}
					>{@html c.t('home.grid.stay.arrow')}</span
				>
			</div>
		</a>
	</div>
</section>

<section class="season section">
	<div class="wrap">
		<div class="season__inner">
			<div>
				<span class="label label--light reveal" data-edit={c.edit('home.season.label')}
					>{@html c.t('home.season.label')}</span
				>
				<div class="rule rule--light reveal d1"></div>
				<h2
					class="h-display h-display--white reveal d2"
					style="margin-bottom:24px;"
					data-edit={c.edit('home.season.title')}
				>
					{@html c.t('home.season.title')}
				</h2>
				<p
					class="body-copy body-copy--white reveal d3"
					style="margin-bottom:36px;"
					data-edit={c.edit('home.season.body')}
				>
					{@html c.t('home.season.body')}
				</p>
				<div
					class="notice-box reveal d4"
					style="background:rgba(255,255,255,.04); border-color:rgba(255,255,255,.08); border-left-color:var(--gold);"
				>
					<p style="color:rgba(255,255,255,.6);" data-edit={c.edit('home.season.notice')}>
						{@html c.t('home.season.notice')}
					</p>
				</div>
				<div style="margin-top:36px;" class="reveal d5">
					<a
						class="btn btn-gold"
						href={c.btnHref('home-season', './openingstijden.html')}
						data-edit={c.edit('btn:home-season')}
						style:display={c.btnHidden('home-season') ? 'none' : undefined}
						><span>{@html c.btnLabel('home-season', 'home.season.btn')}</span></a
					>
				</div>
			</div>

			<div class="season__hours-block reveal d2">
				<div
					style="font-family:var(--ff-display); font-size:1.5rem; color:var(--white); margin-bottom:24px;"
					data-edit={c.edit('home.hours.title')}
				>
					{@html c.t('home.hours.title')}
				</div>
				<table class="hours-table" style="margin-bottom:36px;">
					<tbody
						><tr
							><td style="color:rgba(255,255,255,.6);" data-edit={c.edit('home.hours.season')}
								>{@html c.t('home.hours.season')}</td
							><td data-edit={c.edit('cms:season-period')}>{@html c.v('cms:season-period')}</td></tr
						>
						<tr
							><td style="color:rgba(255,255,255,.6);" data-edit={c.edit('home.hours.tuzo')}
								>{@html c.t('home.hours.tuzo')}</td
							><td data-edit={c.edit('cms:season-hours')}>{@html c.v('cms:season-hours')}</td></tr
						>
						<tr
							><td style="color:rgba(255,255,255,.6);" data-edit={c.edit('home.hours.ascension')}
								>{@html c.t('home.hours.ascension')}</td
							><td data-edit={c.edit('cms:season-hours')}>{@html c.v('cms:season-hours')}</td></tr
						>
						<tr
							><td style="color:rgba(255,255,255,.6);" data-edit={c.edit('home.hours.whitsun')}
								>{@html c.t('home.hours.whitsun')}</td
							><td data-edit={c.edit('cms:season-hours')}>{@html c.v('cms:season-hours')}</td></tr
						>
						<tr
							><td style="color:rgba(255,255,255,.6);" data-edit={c.edit('home.hours.monday')}
								>{@html c.t('home.hours.monday')}</td
							><td style="color:rgba(255,100,100,.7);" data-edit={c.edit('home.hours.closed')}
								>{@html c.t('home.hours.closed')}</td
							></tr
						>
					</tbody>
				</table>
				<div
					style="font-family:var(--ff-display); font-size:1.5rem; color:var(--white); margin-bottom:24px;"
					data-edit={c.edit('home.prices.title')}
				>
					{@html c.t('home.prices.title')}
				</div>
				<table class="hours-table">
					<tbody
						><tr
							><td style="color:rgba(255,255,255,.6);" data-edit={c.edit('home.prices.adult')}
								>{@html c.t('home.prices.adult')}</td
							><td data-edit={c.edit('cms:price-volwassene')}>{c.price('cms:price-volwassene')}</td
							></tr
						>
						<tr
							><td style="color:rgba(255,255,255,.6);" data-edit={c.edit('home.prices.child')}
								>{@html c.t('home.prices.child')}</td
							><td data-edit={c.edit('cms:price-kind')}>{c.price('cms:price-kind')}</td></tr
						>
						<tr
							><td style="color:rgba(255,255,255,.6);" data-edit={c.edit('home.prices.infant')}
								>{@html c.t('home.prices.infant')}</td
							><td style="color:rgba(120,220,120,.8);" data-edit={c.edit('home.prices.free')}
								>{@html c.t('home.prices.free')}</td
							></tr
						>
						<tr
							><td style="color:rgba(255,255,255,.6);" data-edit={c.edit('home.prices.park')}
								>{@html c.t('home.prices.park')}</td
							><td style="color:rgba(120,220,120,.8);" data-edit={c.edit('home.prices.free')}
								>{@html c.t('home.prices.free')}</td
							></tr
						>
					</tbody>
				</table>
				<div style="margin-top:28px; padding-top:24px; border-top:1px solid rgba(255,255,255,.07);">
					<div
						style="font-size:9px; letter-spacing:.28em; text-transform:uppercase; color:var(--gold); margin-bottom:10px;"
						data-edit={c.edit('home.loc.label')}
					>
						{@html c.t('home.loc.label')}
					</div>
					<div style="font-size:14px; color:rgba(255,255,255,.55); line-height:1.8;">
						<span data-edit={c.edit('contact:entrance')}>{c.contact('entrance')}</span><br /><span
							data-edit={c.edit('contact:street')}>{c.contact('street')}</span
						>, <span data-edit={c.edit('contact:city')}>{c.contact('city')}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="vw-banner">
	<div class="vw-banner__bg">
		<img
			loading="lazy"
			src={c.img('index-overnachten')}
			alt="Kasteel Warmelo ingang met brug"
			data-edit={c.edit('img:index-overnachten')}
			style={c.imgStyle('index-overnachten')}
			class={c.imgClass('index-overnachten', '')}
		/>
	</div>
	<div class="vw-banner__overlay"></div>
	<div class="wrap" style="position:relative; z-index:2;">
		<div class="vw-banner__content">
			<span class="label label--light reveal" data-edit={c.edit('home.vw.label')}
				>{@html c.t('home.vw.label')}</span
			>
			<div class="rule rule--light reveal d1"></div>
			<h2
				class="h-display h-display--white reveal d2"
				style="font-size:clamp(2.4rem,4.5vw,4rem); margin-bottom:22px;"
				data-edit={c.edit('home.vw.title')}
			>
				{@html c.t('home.vw.title')}
			</h2>
			<p
				class="body-copy body-copy--white reveal d3"
				style="margin-bottom:32px;"
				data-edit={c.edit('home.vw.body')}
			>
				{@html c.t('home.vw.body')}
			</p>
			<a
				class="btn btn-gold reveal d4"
				href={c.btnHref('home-stay', './verhuur.html')}
				data-edit={c.edit('btn:home-stay')}
				style:display={c.btnHidden('home-stay') ? 'none' : undefined}
				><span>{@html c.btnLabel('home-stay', 'home.vw.btn')}</span></a
			>
		</div>
	</div>
</section>

<section class="section section--ivory">
	<div class="wrap">
		<div class="split">
			<div>
				<span class="label reveal" data-edit={c.edit('home.kids.label')}
					>{@html c.t('home.kids.label')}</span
				>
				<div class="rule reveal d1"></div>
				<h2
					class="h-display reveal d2"
					style="margin-bottom:22px;"
					data-edit={c.edit('home.kids.title')}
				>
					{@html c.t('home.kids.title')}
				</h2>
				<p
					class="body-copy reveal d3"
					style="margin-bottom:20px;"
					data-edit={c.edit('home.kids.body1')}
				>
					{@html c.t('home.kids.body1')}
				</p>
				<p
					class="body-copy reveal d4"
					style="margin-bottom:32px;"
					data-edit={c.edit('home.kids.body2')}
				>
					{@html c.t('home.kids.body2')}
				</p>
				<a
					class="btn btn-outline-g reveal d5"
					href={c.btnHref('home-kids', './zandsculpturen.html')}
					data-edit={c.edit('btn:home-kids')}
					style:display={c.btnHidden('home-kids') ? 'none' : undefined}
					><span>{@html c.btnLabel('home-kids', 'home.kids.btn')}</span></a
				>
			</div>
			<div class="zoom reveal d3" style:height={c.imgHeight('index-kinderen')}>
				<img
					loading="lazy"
					src={c.img('index-kinderen')}
					alt="Kinderen bij de zandsculpturen"
					style={c.imgStyle('index-kinderen', 'height:100%;')}
					data-edit={c.edit('img:index-kinderen')}
					class={c.imgClass('index-kinderen', '')}
				/>
			</div>
		</div>
	</div>
</section>
