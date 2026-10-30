<script lang="ts">
	import { getSite } from '#lib/site/context.ts';

	const c = getSite();
</script>

<svelte:head>
	<title>{c.plain('seo.evenementen.title')}</title>
	<meta name="description" content={c.plain('seo.evenementen.description')} />
	<link rel="preload" as="image" href={c.img('index-hero')} fetchpriority="high" />
	<link rel="stylesheet" href="/assets/css/evenementen.css" />
</svelte:head>

<header class="page-hero grain">
	<div class="page-hero__bg">
		<video
			autoplay
			muted
			loop
			playsinline
			poster="/assets/images/dji_fly_20241108_182220_103_1731087789639_photo.webp"
			style="width:100%;height:100%;object-fit:cover;display:block;"
			data-edit={c.edit('video:evenementen-hero-video')}
		>
			<source src={c.video('evenementen-hero-video')} type="video/mp4" />
		</video>
	</div>
	<div class="page-hero__atmo"></div>
	<div class="wrap page-hero__content">
		<div class="breadcrumb">
			<a href={c.href('./index.html')}>Home</a>
			<span class="breadcrumb__sep">◆</span>
			<span>Evenementen</span>
		</div>
		<div class="page-hero__eyebrow">
			<span class="page-hero__eyebrow-line"></span>
			<span data-edit={c.edit('events.hero.eyebrow')}>{@html c.t('events.hero.eyebrow')}</span>
		</div>
		<h1 class="page-hero__title" data-edit={c.edit('events.hero.title')}>
			{@html c.t('events.hero.title')}
		</h1>
	</div>
	<div class="scroll-cue">
		<div class="scroll-cue__line"></div>
		<span data-edit={c.edit('home.scroll')}>{@html c.t('home.scroll')}</span>
	</div>
</header>

<section class="section" style="background:var(--green-deep);">
	<div class="wrap">
		<div class="split">
			<div>
				<span class="label label--light reveal" data-edit={c.edit('events.intro.label')}
					>{@html c.t('events.intro.label')}</span
				>
				<div class="rule rule--light reveal d1"></div>
				<h2
					class="h-display h-display--white reveal d2"
					style="margin-bottom:24px;"
					data-edit={c.edit('events.intro.title')}
				>
					{@html c.t('events.intro.title')}
				</h2>
				<p
					class="body-copy body-copy--white reveal d3"
					style="margin-bottom:20px;"
					data-edit={c.edit('events.intro.body1')}
				>
					{@html c.t('events.intro.body1')}
				</p>
				<p
					class="body-copy body-copy--white reveal d4"
					style="margin-bottom:36px;"
					data-edit={c.edit('events.intro.body2')}
				>
					{@html c.t('events.intro.body2')}
				</p>
				<a
					class="btn btn-gold reveal d5"
					href={c.btnHref('events-intro', './contact.html')}
					data-edit={c.edit('btn:events-intro')}
					style:display={c.btnHidden('events-intro') ? 'none' : undefined}
					><span>{@html c.btnLabel('events-intro', 'events.intro.btn')}</span></a
				>
			</div>
			<div class="zoom reveal d2" style:height={c.imgHeight('evenementen-hero')}>
				<img
					fetchpriority="high"
					src={c.img('evenementen-hero')}
					alt="Evenement op het landgoed"
					style={c.imgStyle('evenementen-hero', 'height:100%;')}
					data-edit={c.edit('img:evenementen-hero')}
					class={c.imgClass('evenementen-hero', '')}
				/>
			</div>
		</div>
	</div>
</section>

<section class="section section--cream">
	<div class="wrap">
		<div style="text-align:center; margin-bottom:60px;">
			<span
				class="label reveal"
				style="display:block; text-align:center;"
				data-edit={c.edit('events.gallery.label')}>{@html c.t('events.gallery.label')}</span
			>
			<div class="rule rule--center reveal d1"></div>
			<h2 class="h-display reveal d2" data-edit={c.edit('events.gallery.title')}>
				{@html c.t('events.gallery.title')}
			</h2>
		</div>

		<div class="ev-grid reveal">
			<div
				class="zoom"
				data-lightbox={c.img('evenementen-ballon')}
				style:height={c.imgHeight('evenementen-ballon')}
			>
				<img
					loading="lazy"
					src={c.img('evenementen-ballon')}
					alt="Ballonvaart evenement Kasteel Warmelo"
					style={c.imgStyle('evenementen-ballon', 'height:100%;')}
					data-edit={c.edit('img:evenementen-ballon')}
					class={c.imgClass('evenementen-ballon', '')}
				/>
			</div>
			<div
				class="zoom"
				data-lightbox={c.img('evenementen-winter')}
				style:height={c.imgHeight('evenementen-winter')}
			>
				<img
					loading="lazy"
					src={c.img('evenementen-winter')}
					alt="Winter Heerlijckheid Kasteel Warmelo"
					style={c.imgStyle('evenementen-winter', 'height:100%;')}
					data-edit={c.edit('img:evenementen-winter')}
					class={c.imgClass('evenementen-winter', '')}
				/>
			</div>
			<div
				class="zoom"
				data-lightbox={c.img('evenementen-licht')}
				style:height={c.imgHeight('evenementen-licht')}
			>
				<img
					loading="lazy"
					src={c.img('evenementen-licht')}
					alt="Zandsculpturen in het Licht — Kasteel Warmelo"
					style={c.imgStyle('evenementen-licht', 'height:100%;')}
					data-edit={c.edit('img:evenementen-licht')}
					class={c.imgClass('evenementen-licht', '')}
				/>
			</div>
			<div
				class="zoom"
				data-lightbox={c.img('evenementen-men')}
				style:height={c.imgHeight('evenementen-men')}
			>
				<img
					loading="lazy"
					src={c.img('evenementen-men')}
					alt="Internationale menwedstrijd"
					style={c.imgStyle('evenementen-men', 'height:100%;')}
					data-edit={c.edit('img:evenementen-men')}
					class={c.imgClass('evenementen-men', '')}
				/>
			</div>
			<div
				class="zoom"
				data-lightbox={c.img('evenementen-nk')}
				style:height={c.imgHeight('evenementen-nk')}
			>
				<img
					loading="lazy"
					src={c.img('evenementen-nk')}
					alt="Kampioenschap paarden"
					style={c.imgStyle('evenementen-nk', 'height:100%;')}
					data-edit={c.edit('img:evenementen-nk')}
					class={c.imgClass('evenementen-nk', '')}
				/>
			</div>
			<div
				class="zoom"
				data-lightbox={c.img('evenementen-rijtuighal')}
				style:height={c.imgHeight('evenementen-rijtuighal')}
			>
				<img
					loading="lazy"
					src={c.img('evenementen-rijtuighal')}
					alt="Rijtuighal"
					style={c.imgStyle('evenementen-rijtuighal', 'height:100%;')}
					data-edit={c.edit('img:evenementen-rijtuighal')}
					class={c.imgClass('evenementen-rijtuighal', '')}
				/>
			</div>
		</div>
	</div>
</section>

<section class="section" style="background:var(--ink);">
	<div class="wrap">
		<div style="text-align:center; margin-bottom:60px;">
			<span
				class="label label--light reveal"
				style="display:block; text-align:center;"
				data-edit={c.edit('events.agenda.label')}>{@html c.t('events.agenda.label')}</span
			>
			<div class="rule rule--center rule--light reveal d1"></div>
			<h2
				class="h-display h-display--white reveal d2"
				style="margin-bottom:16px;"
				data-edit={c.edit('events.agenda.title')}
			>
				{@html c.t('events.agenda.title')}
			</h2>
			<p
				class="body-copy body-copy--white reveal d3"
				style="max-width:500px; margin:0 auto;"
				data-edit={c.edit('events.agenda.body')}
			>
				{@html c.t('events.agenda.body')}
			</p>
		</div>

		<div style="display:flex; flex-direction:column; gap:3px; max-width:800px; margin:0 auto;">
			<div class="event-card reveal" style:display={c.flag('event:1:hidden') ? 'none' : undefined}>
				<div class="event-card__date">
					<div class="event-card__day" data-edit={c.edit('cms:event-e1-day')}>
						{@html c.v('cms:event-e1-day')}
					</div>
					<div class="event-card__month" data-edit={c.edit('events.e1.month')}>
						{@html c.t('events.e1.month')}
					</div>
				</div>
				<div class="event-card__body">
					<div class="event-card__tag" data-edit={c.edit('events.e1.tag')}>
						{@html c.t('events.e1.tag')}
					</div>
					<div class="event-card__title" data-edit={c.edit('events.e1.title')}>
						{@html c.t('events.e1.title')}
					</div>
					<div class="event-card__desc" data-edit={c.edit('events.e1.desc')}>
						{@html c.t('events.e1.desc')}
					</div>
				</div>
			</div>

			<div
				class="event-card reveal d1"
				style:display={c.flag('event:2:hidden') ? 'none' : undefined}
			>
				<div class="event-card__date">
					<div class="event-card__day" data-edit={c.edit('cms:event-e2-day')}>
						{@html c.v('cms:event-e2-day')}
					</div>
					<div class="event-card__month" data-edit={c.edit('events.e2.month')}>
						{@html c.t('events.e2.month')}
					</div>
				</div>
				<div class="event-card__body">
					<div class="event-card__tag" data-edit={c.edit('events.e2.tag')}>
						{@html c.t('events.e2.tag')}
					</div>
					<div class="event-card__title" data-edit={c.edit('events.e2.title')}>
						{@html c.t('events.e2.title')}
					</div>
					<div class="event-card__desc" data-edit={c.edit('events.e2.desc')}>
						{@html c.t('events.e2.desc')}
					</div>
				</div>
			</div>

			<div
				class="event-card reveal d2"
				style:display={c.flag('event:3:hidden') ? 'none' : undefined}
			>
				<div class="event-card__date">
					<div class="event-card__day" data-edit={c.edit('cms:event-e3-day')}>
						{@html c.v('cms:event-e3-day')}
					</div>
					<div class="event-card__month" data-edit={c.edit('events.e3.month')}>
						{@html c.t('events.e3.month')}
					</div>
				</div>
				<div class="event-card__body">
					<div class="event-card__tag" data-edit={c.edit('events.e3.tag')}>
						{@html c.t('events.e3.tag')}
					</div>
					<div class="event-card__title" data-edit={c.edit('events.e3.title')}>
						{@html c.t('events.e3.title')}
					</div>
					<div class="event-card__desc" data-edit={c.edit('events.e3.desc')}>
						{@html c.t('events.e3.desc')}
					</div>
				</div>
			</div>

			<div
				class="event-card reveal d3"
				style:display={c.flag('event:4:hidden') ? 'none' : undefined}
			>
				<div class="event-card__date">
					<div class="event-card__day" data-edit={c.edit('cms:event-e4-day')}>
						{@html c.v('cms:event-e4-day')}
					</div>
					<div class="event-card__month" data-edit={c.edit('events.e4.month')}>
						{@html c.t('events.e4.month')}
					</div>
				</div>
				<div class="event-card__body">
					<div class="event-card__tag" data-edit={c.edit('events.e4.tag')}>
						{@html c.t('events.e4.tag')}
					</div>
					<div class="event-card__title" data-edit={c.edit('events.e4.title')}>
						{@html c.t('events.e4.title')}
					</div>
					<div class="event-card__desc" data-edit={c.edit('events.e4.desc')}>
						{@html c.t('events.e4.desc')}
					</div>
				</div>
			</div>
		</div>

		<div style="text-align:center; margin-top:48px;" class="reveal">
			<p
				class="body-copy body-copy--white"
				style="margin-bottom:24px; max-width:480px; margin-inline:auto;"
				data-edit={c.edit('events.social.body')}
			>
				{@html c.t('events.social.body')}
			</p>
			<div style="display:flex; gap:14px; justify-content:center;">
				<a href={c.link('facebook')} target="_blank" rel="noopener" class="btn btn-outline-w"
					><i class="fab fa-facebook-f"></i>&nbsp; Facebook</a
				>
				<a href={c.link('instagram')} target="_blank" rel="noopener" class="btn btn-outline-w"
					><i class="fab fa-instagram"></i>&nbsp; Instagram</a
				>
			</div>
		</div>
	</div>
</section>
