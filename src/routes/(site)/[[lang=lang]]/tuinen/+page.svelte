<script lang="ts">
	import { getSite } from '#lib/site/context.ts';

	const c = getSite();
</script>

<svelte:head>
	<title>{c.plain('seo.tuinen.title')}</title>
	<meta name="description" content={c.plain('seo.tuinen.description')} />
	<link rel="stylesheet" href="/assets/css/tuinen.css" />
</svelte:head>

<header class="page-hero grain">
	<div class="page-hero__bg">
		<img
			fetchpriority="high"
			src={c.img('tuinen-hero')}
			alt="Kasteel Warmelo met historische tuinen en gracht"
			data-edit={c.edit('img:tuinen-hero')}
			style={c.imgStyle('tuinen-hero')}
			class={c.imgClass('tuinen-hero', '')}
		/>
	</div>
	<div class="page-hero__atmo"></div>
	<div class="wrap page-hero__content">
		<div class="breadcrumb">
			<a href={c.href('./index.html')}>Home</a>
			<span class="breadcrumb__sep">◆</span>
			<span>Tuinen</span>
		</div>
		<div class="page-hero__eyebrow">
			<span class="page-hero__eyebrow-line"></span>
			<span data-edit={c.edit('gardens.hero.eyebrow')}>{@html c.t('gardens.hero.eyebrow')}</span>
		</div>
		<h1 class="page-hero__title" data-edit={c.edit('gardens.hero.title')}>
			{@html c.t('gardens.hero.title')}
		</h1>
	</div>
	<div class="scroll-cue">
		<div class="scroll-cue__line"></div>
		<span data-edit={c.edit('home.scroll')}>{@html c.t('home.scroll')}</span>
	</div>
</header>

<section class="section" style="background:var(--ivory);">
	<div class="wrap">
		<div class="split split--text">
			<div>
				<span class="label reveal" data-edit={c.edit('gardens.intro.label')}
					>{@html c.t('gardens.intro.label')}</span
				>
				<div class="rule reveal d1"></div>
				<h2
					class="h-display reveal d2"
					style="margin-bottom:28px;"
					data-edit={c.edit('gardens.intro.title')}
				>
					{@html c.t('gardens.intro.title')}
				</h2>
				<p
					class="body-copy reveal d3"
					style="margin-bottom:20px;"
					data-edit={c.edit('gardens.intro.body1')}
				>
					{@html c.t('gardens.intro.body1')}
				</p>
				<p
					class="body-copy reveal d4"
					style="margin-bottom:20px;"
					data-edit={c.edit('gardens.intro.body2')}
				>
					{@html c.t('gardens.intro.body2')}
				</p>
				<p
					class="body-copy reveal d5"
					style="margin-bottom:36px;"
					data-edit={c.edit('gardens.intro.body3')}
				>
					{@html c.t('gardens.intro.body3')}
				</p>
				<div
					style="display:grid; grid-template-columns:1fr 1fr; gap:20px;"
					class="reveal d6 stats-grid-2col"
				>
					<div style="border-left:2px solid var(--gold); padding-left:16px;">
						<div
							style="font-family:var(--ff-display); font-size:2rem; color:var(--green);"
							data-count="7"
							data-suffix=" ha"
						>
							0
						</div>
						<div
							style="font-size:9px; letter-spacing:.28em; text-transform:uppercase; color:var(--muted); margin-top:4px;"
							data-edit={c.edit('gardens.intro.stat1')}
						>
							{@html c.t('gardens.intro.stat1')}
						</div>
					</div>
					<div style="border-left:2px solid var(--gold); padding-left:16px;">
						<div
							style="font-family:var(--ff-display); font-size:2rem; color:var(--green);"
							data-count="4"
							data-suffix=" stijlen"
						>
							0
						</div>
						<div
							style="font-size:9px; letter-spacing:.28em; text-transform:uppercase; color:var(--muted); margin-top:4px;"
							data-edit={c.edit('gardens.intro.stat2')}
						>
							{@html c.t('gardens.intro.stat2')}
						</div>
					</div>
				</div>
			</div>
			<div style="display:flex; flex-direction:column; gap:3px;" class="reveal d2">
				<div class="zoom" style:height={c.imgHeight('tuinen-zomer')}>
					<img
						loading="lazy"
						src={c.img('tuinen-zomer')}
						alt="Vijver met rododendrons in het park van Kasteel Warmelo"
						style={c.imgStyle('tuinen-zomer', 'height:100%;')}
						data-edit={c.edit('img:tuinen-zomer')}
						class={c.imgClass('tuinen-zomer', '')}
					/>
				</div>
				<div class="zoom" style:height={c.imgHeight('tuinen-achterkant')}>
					<img
						loading="lazy"
						src={c.img('tuinen-achterkant')}
						alt="Formeel tuinpad naar Kasteel Warmelo"
						style={c.imgStyle('tuinen-achterkant', 'height:100%;')}
						data-edit={c.edit('img:tuinen-achterkant')}
						class={c.imgClass('tuinen-achterkant', '')}
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="section" style="background:var(--green);">
	<div class="wrap">
		<div class="split">
			<div>
				<span class="label label--light reveal" data-edit={c.edit('gardens.timeline.label')}
					>{@html c.t('gardens.timeline.label')}</span
				>
				<div class="rule rule--light reveal d1"></div>
				<h2
					class="h-display h-display--white reveal d2"
					style="margin-bottom:48px;"
					data-edit={c.edit('gardens.timeline.title')}
				>
					{@html c.t('gardens.timeline.title')}
				</h2>

				<div class="timeline">
					<div class="timeline-item reveal d3">
						<div class="timeline-era" data-edit={c.edit('gardens.tl1.era')}>
							{@html c.t('gardens.tl1.era')}
						</div>
						<div class="timeline-title" data-edit={c.edit('gardens.tl1.title')}>
							{@html c.t('gardens.tl1.title')}
						</div>
						<p class="timeline-text" data-edit={c.edit('gardens.tl1.text')}>
							{@html c.t('gardens.tl1.text')}
						</p>
					</div>
					<div class="timeline-item reveal d4">
						<div class="timeline-era" data-edit={c.edit('gardens.tl2.era')}>
							{@html c.t('gardens.tl2.era')}
						</div>
						<div class="timeline-title" data-edit={c.edit('gardens.tl2.title')}>
							{@html c.t('gardens.tl2.title')}
						</div>
						<p class="timeline-text" data-edit={c.edit('gardens.tl2.text')}>
							{@html c.t('gardens.tl2.text')}
						</p>
					</div>
					<div class="timeline-item reveal d5">
						<div class="timeline-era" data-edit={c.edit('gardens.tl3.era')}>
							{@html c.t('gardens.tl3.era')}
						</div>
						<div class="timeline-title" data-edit={c.edit('gardens.tl3.title')}>
							{@html c.t('gardens.tl3.title')}
						</div>
						<p class="timeline-text" data-edit={c.edit('gardens.tl3.text')}>
							{@html c.t('gardens.tl3.text')}
						</p>
					</div>
					<div class="timeline-item reveal d6">
						<div class="timeline-era" data-edit={c.edit('gardens.tl4.era')}>
							{@html c.t('gardens.tl4.era')}
						</div>
						<div class="timeline-title" data-edit={c.edit('gardens.tl4.title')}>
							{@html c.t('gardens.tl4.title')}
						</div>
						<p class="timeline-text" data-edit={c.edit('gardens.tl4.text')}>
							{@html c.t('gardens.tl4.text')}
						</p>
					</div>
					<div class="timeline-item reveal d7">
						<div class="timeline-era" data-edit={c.edit('gardens.tl5.era')}>
							{@html c.t('gardens.tl5.era')}
						</div>
						<div class="timeline-title" data-edit={c.edit('gardens.tl5.title')}>
							{@html c.t('gardens.tl5.title')}
						</div>
						<p class="timeline-text" data-edit={c.edit('gardens.tl5.text')}>
							{@html c.t('gardens.tl5.text')}
						</p>
					</div>
				</div>
			</div>

			<div style="display:grid; grid-template-columns:1fr; gap:3px;" class="reveal d2">
				<div class="zoom" style:height={c.imgHeight('tuinen-evolutie')}>
					<img
						loading="lazy"
						src={c.img('tuinen-evolutie')}
						alt="Kasteeltuin"
						style={c.imgStyle('tuinen-evolutie', 'height:100%;')}
						data-edit={c.edit('img:tuinen-evolutie')}
						class={c.imgClass('tuinen-evolutie', '')}
					/>
				</div>
				<div class="zoom" style:height={c.imgHeight('tuinen-kasteel')}>
					<img
						loading="lazy"
						src={c.img('tuinen-kasteel')}
						alt="Kasteel Warmelo"
						style={c.imgStyle('tuinen-kasteel', 'height:100%;')}
						data-edit={c.edit('img:tuinen-kasteel')}
						class={c.imgClass('tuinen-kasteel', '')}
					/>
				</div>
				<div class="zoom" style:height={c.imgHeight('tuinen-tuinen2')}>
					<img
						loading="lazy"
						src={c.img('tuinen-tuinen2')}
						alt="Historische tuinen"
						style={c.imgStyle('tuinen-tuinen2', 'height:100%;')}
						data-edit={c.edit('img:tuinen-tuinen2')}
						class={c.imgClass('tuinen-tuinen2', '')}
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="parallax-section">
	<div
		class="parallax-section__bg"
		style={c.bgStyle('tuinen-bg-new-english-garden-panoramic')}
		data-edit={c.edit('img:tuinen-bg-new-english-garden-panoramic')}
	></div>
	<div class="parallax-section__overlay"></div>
	<div class="parallax-section__content">
		<div class="wrap" style="text-align:center; padding-block:80px;">
			<span
				class="label label--light reveal"
				style="display:block; text-align:center;"
				data-edit={c.edit('gardens.cta.label')}>{@html c.t('gardens.cta.label')}</span
			>
			<h2
				class="h-display h-display--white reveal d1"
				style="font-size:clamp(2.6rem,5vw,4.5rem); margin-bottom:24px;"
				data-edit={c.edit('gardens.cta.title')}
			>
				{@html c.t('gardens.cta.title')}
			</h2>
			<p
				class="body-copy body-copy--white reveal d2"
				style="max-width:500px; margin:0 auto 36px;"
				data-edit={c.edit('gardens.cta.body')}
			>
				{@html c.t('gardens.cta.body')}
			</p>
			<div
				style="display:flex; gap:14px; justify-content:center; flex-wrap:wrap;"
				class="reveal d3"
			>
				<a
					class="btn btn-gold"
					href={c.btnHref('gardens-cta-visit', './openingstijden.html')}
					data-edit={c.edit('btn:gardens-cta-visit')}
					style:display={c.btnHidden('gardens-cta-visit') ? 'none' : undefined}
					><span>{@html c.btnLabel('gardens-cta-visit', 'gardens.cta.btn1')}</span></a
				>
				<a
					class="btn btn-outline-w"
					href={c.btnHref('gardens-cta-sand', './zandsculpturen.html')}
					data-edit={c.edit('btn:gardens-cta-sand')}
					style:display={c.btnHidden('gardens-cta-sand') ? 'none' : undefined}
					><span>{@html c.btnLabel('gardens-cta-sand', 'gardens.cta.btn2')}</span></a
				>
			</div>
		</div>
	</div>
</section>
