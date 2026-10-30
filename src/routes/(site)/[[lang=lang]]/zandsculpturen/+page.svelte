<script lang="ts">
	import { getSite } from '#lib/site/context.ts';

	const c = getSite();
</script>

<svelte:head>
	<title>{c.plain('seo.zandsculpturen.title')}</title>
	<meta name="description" content={c.plain('seo.zandsculpturen.description')} />
	<link rel="stylesheet" href="/assets/css/zandsculpturen.css" />
</svelte:head>

<header class="page-hero grain">
	<div class="page-hero__bg">
		<img
			fetchpriority="high"
			src={c.img('zandsculpturen-hero')}
			alt="Zandsculpturen 2026 in het park van Kasteel Warmelo"
			data-edit={c.edit('img:zandsculpturen-hero')}
			style={c.imgStyle('zandsculpturen-hero')}
			class={c.imgClass('zandsculpturen-hero', '')}
		/>
	</div>
	<div class="page-hero__atmo"></div>
	<div class="wrap page-hero__content">
		<div class="breadcrumb">
			<a href={c.href('./index.html')}>Home</a>
			<span class="breadcrumb__sep">◆</span>
			<span>Zandsculpturen</span>
		</div>
		<div class="page-hero__eyebrow">
			<span class="page-hero__eyebrow-line"></span>
			<span data-edit={c.edit('sand.hero.eyebrow')}>{@html c.t('sand.hero.eyebrow')}</span>
		</div>
		<h1 class="page-hero__title" data-edit={c.edit('sand.hero.title')}>
			{@html c.t('sand.hero.title')}
		</h1>
	</div>
	<div class="scroll-cue">
		<div class="scroll-cue__line"></div>
		<span data-edit={c.edit('home.scroll')}>{@html c.t('home.scroll')}</span>
	</div>
</header>

<section class="section section--dark" style="background:var(--green-deep);">
	<div class="wrap">
		<div class="split split--wide">
			<div>
				<span class="label label--light reveal" data-edit={c.edit('sand.intro.label')}
					>{@html c.t('sand.intro.label')}</span
				>
				<div class="rule rule--light reveal d1"></div>
				<h2
					class="h-display h-display--white reveal d2"
					style="margin-bottom:28px;"
					data-edit={c.edit('sand.intro.title')}
				>
					{@html c.t('sand.intro.title')}
				</h2>
				<p
					class="body-copy body-copy--white reveal d3"
					style="margin-bottom:20px;"
					data-edit={c.edit('sand.intro.body1')}
				>
					{@html c.t('sand.intro.body1')}
				</p>
				<p
					class="body-copy body-copy--white reveal d4"
					style="margin-bottom:20px;"
					data-edit={c.edit('sand.intro.body2')}
				>
					{@html c.t('sand.intro.body2')}
				</p>
				<p
					class="body-copy body-copy--white reveal d5"
					style="margin-bottom:36px;"
					data-edit={c.edit('sand.intro.body3')}
				>
					{@html c.t('sand.intro.body3')}
				</p>
				<a
					class="btn btn-gold reveal d6"
					href={c.btnHref('sand-intro', './openingstijden.html')}
					data-edit={c.edit('btn:sand-intro')}
					style:display={c.btnHidden('sand-intro') ? 'none' : undefined}
					><span>{@html c.btnLabel('sand-intro', 'sand.intro.btn')}</span></a
				>
			</div>
			<div class="sand-intro-imgs reveal d2">
				<div class="zoom si-top" style:height={c.imgHeight('zand-was')}>
					<img
						style={c.imgStyle('zand-was')}
						loading="lazy"
						src={c.img('zand-was')}
						alt="Zandsculptuur"
						data-edit={c.edit('img:zand-was')}
						class={c.imgClass('zand-was', '')}
					/>
				</div>
				<div class="zoom si-top" style:height={c.imgHeight('zand-img9647')}>
					<img
						loading="lazy"
						src={c.img('zand-img9647')}
						alt="Zandsculptuur"
						data-edit={c.edit('img:zand-img9647')}
						style={c.imgStyle('zand-img9647')}
						class={c.imgClass('zand-img9647', '')}
					/>
				</div>
				<div class="zoom si-bot" style:height={c.imgHeight('zand-koe')}>
					<img
						style={c.imgStyle('zand-koe')}
						loading="lazy"
						src={c.img('zand-koe')}
						alt="Zandsculptuur"
						data-edit={c.edit('img:zand-koe')}
						class={c.imgClass('zand-koe', '')}
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<section style="background:var(--ink); padding-block:60px;">
	<div class="wrap">
		<div class="sand-facts">
			<div class="sand-fact reveal">
				<div class="sand-fact__num" data-count="28" data-suffix="">0</div>
				<div class="sand-fact__lbl" data-edit={c.edit('sand.facts.sculptures')}>
					{@html c.t('sand.facts.sculptures')}
				</div>
			</div>
			<div class="sand-fact reveal d1">
				<div class="sand-fact__num" data-count="10" data-suffix="">0</div>
				<div class="sand-fact__lbl" data-edit={c.edit('sand.facts.artists')}>
					{@html c.t('sand.facts.artists')}
				</div>
			</div>
			<div class="sand-fact reveal d2">
				<div class="sand-fact__num" data-count="6" data-suffix="">0</div>
				<div class="sand-fact__lbl" data-edit={c.edit('sand.facts.countries')}>
					{@html c.t('sand.facts.countries')}
				</div>
			</div>
			<div class="sand-fact reveal d3">
				<div class="sand-fact__num" data-count="2000" data-suffix=" m³">0</div>
				<div class="sand-fact__lbl" data-edit={c.edit('sand.facts.sand')}>
					{@html c.t('sand.facts.sand')}
				</div>
			</div>
		</div>
	</div>
</section>

<section class="section section--cream">
	<div class="wrap">
		<div style="text-align:center; margin-bottom:60px;">
			<span
				class="label reveal"
				style="text-align:center; display:block;"
				data-edit={c.edit('sand.gallery.label')}>{@html c.t('sand.gallery.label')}</span
			>
			<div class="rule rule--center reveal d1"></div>
			<h2
				class="h-display reveal d2"
				style="margin-bottom:16px;"
				data-edit={c.edit('sand.gallery.title')}
			>
				{@html c.t('sand.gallery.title')}
			</h2>
			<p
				class="body-copy reveal d3"
				style="max-width:520px; margin-inline:auto;"
				data-edit={c.edit('sand.gallery.body')}
			>
				{@html c.t('sand.gallery.body')}
			</p>
		</div>

		<div class="gallery gallery--masonry reveal">
			<!-- Row 1: shepherd | harrypotter | schutterij (tall, rows 1-2) -->
			<div
				class="gallery__item"
				style="grid-row:1;grid-column:1;"
				data-lightbox={c.img('zand-img8341')}
				style:height={c.imgHeight('zand-img8341')}
			>
				<img
					loading="lazy"
					src={c.img('zand-img8341')}
					alt="Zandsculptuur"
					style={c.imgStyle('zand-img8341')}
					data-edit={c.edit('img:zand-img8341')}
					class={c.imgClass('zand-img8341', '')}
				/>
			</div>
			<div
				class="gallery__item"
				style="grid-row:1;grid-column:2;"
				data-lightbox={c.img('zand-harrypotter')}
				style:height={c.imgHeight('zand-harrypotter')}
			>
				<img
					loading="lazy"
					src={c.img('zand-harrypotter')}
					alt="Harry Potter"
					style={c.imgStyle('zand-harrypotter')}
					data-edit={c.edit('img:zand-harrypotter')}
					class={c.imgClass('zand-harrypotter', '')}
				/>
			</div>
			<div
				class="gallery__item"
				style="grid-row:1/3;grid-column:3;"
				data-lightbox={c.img('zand-schutterij')}
				style:height={c.imgHeight('zand-schutterij')}
			>
				<img
					loading="lazy"
					src={c.img('zand-schutterij')}
					alt="Schutterij"
					style={c.imgStyle('zand-schutterij')}
					data-edit={c.edit('img:zand-schutterij')}
					class={c.imgClass('zand-schutterij', '')}
				/>
			</div>
			<!-- Row 2: dino | koe | (schutterij continues) -->
			<div
				class="gallery__item"
				style="grid-row:2;grid-column:1;"
				data-lightbox={c.img('zand-dino')}
				style:height={c.imgHeight('zand-dino')}
			>
				<img
					loading="lazy"
					src={c.img('zand-dino')}
					alt="Dino sculptuur"
					style={c.imgStyle('zand-dino')}
					data-edit={c.edit('img:zand-dino')}
					class={c.imgClass('zand-dino', '')}
				/>
			</div>
			<div
				class="gallery__item"
				style="grid-row:2;grid-column:2;"
				data-lightbox={c.img('zand-koe-2')}
				style:height={c.imgHeight('zand-koe-2')}
			>
				<img
					loading="lazy"
					src={c.img('zand-koe-2')}
					alt="Koe sculptuur"
					style={c.imgStyle('zand-koe-2')}
					data-edit={c.edit('img:zand-koe-2')}
					class={c.imgClass('zand-koe-2', '')}
				/>
			</div>
			<!-- Rows 3-4: flex wrapper (class used for mobile override) -->
			<div
				class="gal-bottom"
				style="grid-row:3/5;grid-column:1/4;display:flex;gap:3px;height:523px;overflow:hidden;"
			>
				<!-- Left 2/3: piper (smaller, top) + women (larger, bottom) -->
				<div
					class="gal-bottom-left"
					style="flex:2;display:flex;flex-direction:column;gap:3px;min-width:0;overflow:hidden;"
				>
					<div
						class="gallery__item"
						style="flex:5;min-height:0;"
						data-lightbox={c.img('zand-rattenvanger')}
					>
						<img
							class={c.imgClass('zand-rattenvanger', '')}
							loading="lazy"
							src={c.img('zand-rattenvanger')}
							alt="Rattenvanger"
							style={c.imgStyle(
								'zand-rattenvanger',
								'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;'
							)}
							data-edit={c.edit('img:zand-rattenvanger')}
						/>
					</div>
					<div
						class="gallery__item"
						style="flex:7;min-height:0;"
						data-lightbox={c.img('zand-was-2')}
					>
						<img
							loading="lazy"
							src={c.img('zand-was-2')}
							alt="Was sculptuur"
							style={c.imgStyle(
								'zand-was-2',
								'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;'
							)}
							data-edit={c.edit('img:zand-was-2')}
							class={c.imgClass('zand-was-2', '')}
						/>
					</div>
				</div>
				<!-- Right 1/3: clock fills full height -->
				<div
					class="gallery__item"
					style="flex:1;min-height:0;min-width:0;"
					data-lightbox={c.img('zand-img9647-2')}
					style:height={c.imgHeight('zand-img9647-2')}
				>
					<img
						loading="lazy"
						src={c.img('zand-img9647-2')}
						alt="Sculptuur"
						style={c.imgStyle(
							'zand-img9647-2',
							'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;'
						)}
						data-edit={c.edit('img:zand-img9647-2')}
						class={c.imgClass('zand-img9647-2', '')}
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="section section--green">
	<div class="wrap">
		<div class="split">
			<div class="zoom reveal" style:height={c.imgHeight('zand-kinderen')}>
				<img
					loading="lazy"
					src={c.img('zand-kinderen')}
					alt="Kinderen bij zandsculpturen"
					style={c.imgStyle('zand-kinderen', 'height:100%;')}
					data-edit={c.edit('img:zand-kinderen')}
					class={c.imgClass('zand-kinderen', '')}
				/>
			</div>
			<div>
				<span class="label label--light reveal" data-edit={c.edit('sand.kids.label')}
					>{@html c.t('sand.kids.label')}</span
				>
				<div class="rule rule--light reveal d1"></div>
				<h2
					class="h-display h-display--white reveal d2"
					style="margin-bottom:24px;"
					data-edit={c.edit('sand.kids.title')}
				>
					{@html c.t('sand.kids.title')}
				</h2>
				<p
					class="body-copy body-copy--white reveal d3"
					style="margin-bottom:20px;"
					data-edit={c.edit('sand.kids.body1')}
				>
					{@html c.t('sand.kids.body1')}
				</p>
				<p
					class="body-copy body-copy--white reveal d4"
					style="margin-bottom:36px;"
					data-edit={c.edit('sand.kids.body2')}
				>
					{@html c.t('sand.kids.body2')}
				</p>
				<div
					style="background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.1); padding:28px 32px;"
					class="reveal d5"
				>
					<div
						style="font-size:9px; letter-spacing:.28em; text-transform:uppercase; color:var(--gold-bright); margin-bottom:14px;"
						data-edit={c.edit('sand.kids.price.label')}
					>
						{@html c.t('sand.kids.price.label')}
					</div>
					<div style="font-size:15px; color:var(--white); line-height:2.2;">
						<span data-edit={c.edit('sand.kids.price.child')}
							>{@html c.t('sand.kids.price.child')}</span
						>
						&nbsp;&nbsp;
						<strong style="color:var(--gold-bright);" data-edit={c.edit('cms:price-kind')}
							>{c.price('cms:price-kind')}</strong
						><br /><span data-edit={c.edit('sand.kids.price.under6')}
							>{@html c.t('sand.kids.price.under6')}</span
						>
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						<strong style="color:rgba(120,220,120,.9);" data-edit={c.edit('sand.kids.price.free')}
							>{@html c.t('sand.kids.price.free')}</strong
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="parallax-section">
	<div
		class="parallax-section__bg"
		style={c.bgStyle('zandsculpturen-bg-new-lake-rhodo-panoramic')}
		data-edit={c.edit('img:zandsculpturen-bg-new-lake-rhodo-panoramic')}
	></div>
	<div class="parallax-section__overlay"></div>
	<div class="parallax-section__content">
		<div class="wrap" style="text-align:center; padding-block:80px;">
			<span
				class="label label--light reveal"
				style="display:block; text-align:center;"
				data-edit={c.edit('sand.cta.label')}>{@html c.t('sand.cta.label')}</span
			>
			<h2
				class="h-display h-display--white reveal d1"
				style="font-size:clamp(2.6rem,5vw,4.5rem); margin-bottom:24px;"
				data-edit={c.edit('sand.cta.title')}
			>
				{@html c.t('sand.cta.title')}
			</h2>
			<p
				class="body-copy body-copy--white reveal d2"
				style="max-width:500px; margin:0 auto 36px;"
				data-edit={c.edit('sand.cta.body')}
			>
				{@html c.t('sand.cta.body')}
			</p>
			<div
				style="display:flex; gap:14px; justify-content:center; flex-wrap:wrap;"
				class="reveal d3"
			>
				<a
					class="btn btn-gold"
					href={c.btnHref('sand-cta-hours', './openingstijden.html')}
					data-edit={c.edit('btn:sand-cta-hours')}
					style:display={c.btnHidden('sand-cta-hours') ? 'none' : undefined}
					><span>{@html c.btnLabel('sand-cta-hours', 'sand.cta.btn1')}</span></a
				>
				<a
					class="btn btn-outline-w"
					href={c.btnHref('sand-cta-contact', './contact.html')}
					data-edit={c.edit('btn:sand-cta-contact')}
					style:display={c.btnHidden('sand-cta-contact') ? 'none' : undefined}
					><span>{@html c.btnLabel('sand-cta-contact', 'sand.cta.btn2')}</span></a
				>
			</div>
		</div>
	</div>
</section>
