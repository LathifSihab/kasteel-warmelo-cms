<script lang="ts">
	import { getSite } from '#lib/site/context.ts';

	const c = getSite();
</script>

<svelte:head>
	<title>{c.plain('seo.verhuur.title')}</title>
	<meta name="description" content={c.plain('seo.verhuur.description')} />
	<link rel="stylesheet" href="/assets/css/verhuur.css" />
</svelte:head>

<header class="page-hero grain">
	<div class="page-hero__bg">
		<img
			fetchpriority="high"
			src={c.img('verhuur-hero')}
			alt="De Orangerie — slaapkamer met balkenplafond en open haard"
			style={c.imgStyle('verhuur-hero', 'width:100%;height:100%;object-fit:cover;display:block;')}
			data-edit={c.edit('img:verhuur-hero')}
			class={c.imgClass('verhuur-hero', '')}
		/>
	</div>
	<div class="page-hero__atmo"></div>
	<div class="wrap page-hero__content">
		<div class="breadcrumb">
			<a href={c.href('./index.html')}>Home</a>
			<span class="breadcrumb__sep">◆</span>
			<span>Verblijven</span>
		</div>
		<div class="page-hero__eyebrow">
			<span class="page-hero__eyebrow-line"></span>
			<span data-edit={c.edit('stay.hero.eyebrow')}>{@html c.t('stay.hero.eyebrow')}</span>
		</div>
		<h1 class="page-hero__title" data-edit={c.edit('stay.hero.title')}>
			{@html c.t('stay.hero.title')}
		</h1>
	</div>
	<div class="scroll-cue">
		<div class="scroll-cue__line"></div>
		<span data-edit={c.edit('home.scroll')}>{@html c.t('home.scroll')}</span>
	</div>
</header>

<section class="section" style="background:var(--green);">
	<div class="wrap">
		<div class="split">
			<div>
				<span class="label label--light reveal" data-edit={c.edit('stay.intro.label')}
					>{@html c.t('stay.intro.label')}</span
				>
				<div class="rule rule--light reveal d1"></div>
				<h2
					class="h-display h-display--white reveal d2"
					style="margin-bottom:24px;"
					data-edit={c.edit('stay.intro.title')}
				>
					{@html c.t('stay.intro.title')}
				</h2>
				<p
					class="body-copy body-copy--white reveal d3"
					style="margin-bottom:20px;"
					data-edit={c.edit('stay.intro.body1')}
				>
					{@html c.t('stay.intro.body1')}
				</p>
				<p
					class="body-copy body-copy--white reveal d4"
					style="margin-bottom:20px;"
					data-edit={c.edit('stay.intro.body2')}
				>
					{@html c.t('stay.intro.body2')}
				</p>
				<p
					class="body-copy body-copy--white reveal d5"
					style="margin-bottom:28px;"
					data-edit={c.edit('stay.intro.body3')}
				>
					{@html c.t('stay.intro.body3')}
				</p>

				<div class="amenity-list reveal d6">
					<div class="amenity-item">
						<i class="fas fa-key"></i>
						<span data-edit={c.edit('stay.amenity.garden')}>{@html c.t('stay.amenity.garden')}</span
						>
					</div>
					<div class="amenity-item">
						<i class="fas fa-tree"></i>
						<span data-edit={c.edit('stay.amenity.access')}>{@html c.t('stay.amenity.access')}</span
						>
					</div>
					<div class="amenity-item">
						<i class="fas fa-bicycle"></i>
						<span data-edit={c.edit('stay.amenity.bikes')}>{@html c.t('stay.amenity.bikes')}</span>
					</div>
					<div class="amenity-item">
						<i class="fas fa-house-chimney"></i>
						<span data-edit={c.edit('stay.amenity.ground')}>{@html c.t('stay.amenity.ground')}</span
						>
					</div>
					<div class="amenity-item">
						<i class="fas fa-shower"></i>
						<span data-edit={c.edit('stay.amenity.bath')}>{@html c.t('stay.amenity.bath')}</span>
					</div>
					<div class="amenity-item">
						<i class="fas fa-parking"></i>
						<span data-edit={c.edit('stay.amenity.parking')}
							>{@html c.t('stay.amenity.parking')}</span
						>
					</div>
					<div class="amenity-item">
						<i class="fas fa-ban"></i>
						<span data-edit={c.edit('stay.amenity.nopets')}>{@html c.t('stay.amenity.nopets')}</span
						>
					</div>
					<div class="amenity-item">
						<i class="fas fa-door-open"></i>
						<span data-edit={c.edit('stay.amenity.host')}>{@html c.t('stay.amenity.host')}</span>
					</div>
				</div>
			</div>

			<!-- Preview photos: Orangerie only in intro -->
			<div class="verhuur-photos reveal d2">
				<div
					class="zoom"
					data-lightbox={c.img('verhuur-img1')}
					style:height={c.imgHeight('verhuur-img1')}
				>
					<img
						loading="lazy"
						src={c.img('verhuur-img1')}
						alt="Woonkamer"
						style={c.imgStyle('verhuur-img1', 'height:100%;')}
						data-edit={c.edit('img:verhuur-img1')}
						class={c.imgClass('verhuur-img1', '')}
					/>
				</div>
				<div
					class="zoom"
					data-lightbox={c.img('verhuur-img2')}
					style:height={c.imgHeight('verhuur-img2')}
				>
					<img
						loading="lazy"
						src={c.img('verhuur-img2')}
						alt="Slaapkamer"
						style={c.imgStyle('verhuur-img2', 'height:100%;')}
						data-edit={c.edit('img:verhuur-img2')}
						class={c.imgClass('verhuur-img2', '')}
					/>
				</div>
				<div
					class="zoom"
					data-lightbox={c.img('verhuur-keuken')}
					style:height={c.imgHeight('verhuur-keuken')}
				>
					<img
						loading="lazy"
						src={c.img('verhuur-keuken')}
						alt="Keuken"
						style={c.imgStyle('verhuur-keuken', 'height:100%;')}
						data-edit={c.edit('img:verhuur-keuken')}
						class={c.imgClass('verhuur-keuken', '')}
					/>
				</div>
				<div
					class="zoom"
					data-lightbox={c.img('verhuur-img3')}
					style:height={c.imgHeight('verhuur-img3')}
				>
					<img
						loading="lazy"
						src={c.img('verhuur-img3')}
						alt="Badkamer"
						style={c.imgStyle('verhuur-img3', 'height:100%;')}
						data-edit={c.edit('img:verhuur-img3')}
						class={c.imgClass('verhuur-img3', '')}
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="section section--cream">
	<div class="wrap">
		<div style="text-align:center; margin-bottom:52px;">
			<span class="label reveal" style="display:block;" data-edit={c.edit('stay.homes.label')}
				>{@html c.t('stay.homes.label')}</span
			>
			<div class="rule rule--center reveal d1"></div>
			<h2 class="h-display reveal d2" data-edit={c.edit('stay.homes.title')}>
				{@html c.t('stay.homes.title')}
			</h2>
		</div>

		<div class="prop-cols">
			<!-- ── DE ORANGERIE ─────────────────────────────────────── -->
			<div class="prop-col reveal">
				<div class="prop-col__header">
					<div class="prop-col__label" data-edit={c.edit('stay.homes.orangerie.type')}>
						{@html c.t('stay.homes.orangerie.type')}
					</div>
					<h3 class="prop-col__title" data-edit={c.edit('stay.homes.orangerie.name')}>
						{@html c.t('stay.homes.orangerie.name')}
					</h3>
					<p class="prop-col__desc" data-edit={c.edit('stay.homes.orangerie.desc')}>
						{@html c.t('stay.homes.orangerie.desc')}
					</p>
				</div>

				<div class="prop-col__photos">
					<div
						class="zoom prop-zoom"
						data-lightbox={c.img('verhuur-img1-2')}
						style:height={c.imgHeight('verhuur-img1-2')}
					>
						<img
							loading="lazy"
							src={c.img('verhuur-img1-2')}
							alt="Woonkamer"
							data-edit={c.edit('img:verhuur-img1-2')}
							style={c.imgStyle('verhuur-img1-2')}
							class={c.imgClass('verhuur-img1-2', '')}
						/>
					</div>
					<div
						class="zoom prop-zoom"
						data-lightbox={c.img('verhuur-img3-2')}
						style:height={c.imgHeight('verhuur-img3-2')}
					>
						<img
							loading="lazy"
							src={c.img('verhuur-img3-2')}
							alt="Badkamer"
							data-edit={c.edit('img:verhuur-img3-2')}
							style={c.imgStyle('verhuur-img3-2')}
							class={c.imgClass('verhuur-img3-2', '')}
						/>
					</div>
					<div
						class="zoom prop-zoom"
						data-lightbox={c.img('verhuur-img5')}
						style:height={c.imgHeight('verhuur-img5')}
					>
						<img
							loading="lazy"
							src={c.img('verhuur-img5')}
							alt="Slaapkamer"
							data-edit={c.edit('img:verhuur-img5')}
							style={c.imgStyle('verhuur-img5')}
							class={c.imgClass('verhuur-img5', '')}
						/>
					</div>
					<div
						class="zoom prop-zoom"
						data-lightbox={c.img('verhuur-keuken-2')}
						style:height={c.imgHeight('verhuur-keuken-2')}
					>
						<img
							loading="lazy"
							src={c.img('verhuur-keuken-2')}
							alt="Keuken"
							data-edit={c.edit('img:verhuur-keuken-2')}
							style={c.imgStyle('verhuur-keuken-2')}
							class={c.imgClass('verhuur-keuken-2', '')}
						/>
					</div>
					<div
						class="zoom prop-zoom"
						data-lightbox={c.img('verhuur-img6')}
						style:height={c.imgHeight('verhuur-img6')}
					>
						<img
							loading="lazy"
							src={c.img('verhuur-img6')}
							alt="Interieur"
							data-edit={c.edit('img:verhuur-img6')}
							style={c.imgStyle('verhuur-img6')}
							class={c.imgClass('verhuur-img6', '')}
						/>
					</div>
					<div
						class="zoom prop-zoom"
						data-lightbox={c.img('verhuur-zij')}
						style:height={c.imgHeight('verhuur-zij')}
					>
						<img
							loading="lazy"
							src={c.img('verhuur-zij')}
							alt="Buitenkant"
							data-edit={c.edit('img:verhuur-zij')}
							style={c.imgStyle('verhuur-zij')}
							class={c.imgClass('verhuur-zij', '')}
						/>
					</div>
				</div>

				<a href={c.link('airbnb-orangerie')} target="_blank" rel="noopener" class="prop-col__book">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="rgba(255,90,71,1)"
						><path
							d="M16 1c-2.5 5.4-8.3 9.1-8.3 13.3a8.3 8.3 0 0016.6 0C24.3 10.1 18.5 6.4 16 1zm0 19.6a6.3 6.3 0 116.3-6.3 6.3 6.3 0 01-6.3 6.3z"
						></path></svg
					>
					<div>
						<div class="prop-col__book-label" data-edit={c.edit('stay.homes.orangerie.book.label')}>
							{@html c.t('stay.homes.orangerie.book.label')}
						</div>
						<div class="prop-col__book-name" data-edit={c.edit('stay.homes.orangerie.book.name')}>
							{@html c.t('stay.homes.orangerie.book.name')}
						</div>
					</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="rgba(255,255,255,.4)"
						stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"></path></svg
					>
				</a>
			</div>

			<!-- ── DE RENTMEESTERWONING ──────────────────────────────── -->
			<div class="prop-col reveal d1">
				<div class="prop-col__header">
					<div class="prop-col__label" data-edit={c.edit('stay.homes.rentmeester.type')}>
						{@html c.t('stay.homes.rentmeester.type')}
					</div>
					<h3 class="prop-col__title" data-edit={c.edit('stay.homes.rentmeester.name')}>
						{@html c.t('stay.homes.rentmeester.name')}
					</h3>
					<p class="prop-col__desc" data-edit={c.edit('stay.homes.rentmeester.desc')}>
						{@html c.t('stay.homes.rentmeester.desc')}
					</p>
				</div>

				<div class="prop-col__photos">
					<div
						class="zoom prop-zoom"
						data-lightbox={c.img('rentmeester-img1')}
						style:height={c.imgHeight('rentmeester-img1')}
					>
						<img
							loading="lazy"
							src={c.img('rentmeester-img1')}
							alt="Woonkamer"
							style={c.imgStyle('rentmeester-img1')}
							data-edit={c.edit('img:rentmeester-img1')}
							class={c.imgClass('rentmeester-img1', '')}
						/>
					</div>
					<div
						class="zoom prop-zoom"
						data-lightbox={c.img('rentmeester-img2')}
						style:height={c.imgHeight('rentmeester-img2')}
					>
						<img
							loading="lazy"
							src={c.img('rentmeester-img2')}
							alt="Slaapkamer"
							style={c.imgStyle('rentmeester-img2')}
							data-edit={c.edit('img:rentmeester-img2')}
							class={c.imgClass('rentmeester-img2', '')}
						/>
					</div>
					<div
						class="zoom prop-zoom"
						data-lightbox={c.img('rentmeester-img3')}
						style:height={c.imgHeight('rentmeester-img3')}
					>
						<img
							loading="lazy"
							src={c.img('rentmeester-img3')}
							alt="Tuin"
							style={c.imgStyle('rentmeester-img3')}
							data-edit={c.edit('img:rentmeester-img3')}
							class={c.imgClass('rentmeester-img3', '')}
						/>
					</div>
					<div
						class="zoom prop-zoom"
						data-lightbox={c.img('rentmeester-img4')}
						style:height={c.imgHeight('rentmeester-img4')}
					>
						<img
							loading="lazy"
							src={c.img('rentmeester-img4')}
							alt="Slaapkamer 2"
							style={c.imgStyle('rentmeester-img4')}
							data-edit={c.edit('img:rentmeester-img4')}
							class={c.imgClass('rentmeester-img4', '')}
						/>
					</div>
					<div
						class="zoom prop-zoom"
						data-lightbox={c.img('rentmeester-img5')}
						style:height={c.imgHeight('rentmeester-img5')}
					>
						<img
							loading="lazy"
							src={c.img('rentmeester-img5')}
							alt="Terras"
							style={c.imgStyle('rentmeester-img5')}
							data-edit={c.edit('img:rentmeester-img5')}
							class={c.imgClass('rentmeester-img5', '')}
						/>
					</div>
					<div
						class="zoom prop-zoom"
						data-lightbox={c.img('rentmeester-img6')}
						style:height={c.imgHeight('rentmeester-img6')}
					>
						<img
							loading="lazy"
							src={c.img('rentmeester-img6')}
							alt="Entree"
							style={c.imgStyle('rentmeester-img6')}
							data-edit={c.edit('img:rentmeester-img6')}
							class={c.imgClass('rentmeester-img6', '')}
						/>
					</div>
				</div>

				<a
					href={c.link('airbnb-rentmeester')}
					target="_blank"
					rel="noopener"
					class="prop-col__book"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="rgba(255,90,71,1)"
						><path
							d="M16 1c-2.5 5.4-8.3 9.1-8.3 13.3a8.3 8.3 0 0016.6 0C24.3 10.1 18.5 6.4 16 1zm0 19.6a6.3 6.3 0 116.3-6.3 6.3 6.3 0 01-6.3 6.3z"
						></path></svg
					>
					<div>
						<div
							class="prop-col__book-label"
							data-edit={c.edit('stay.homes.rentmeester.book.label')}
						>
							{@html c.t('stay.homes.rentmeester.book.label')}
						</div>
						<div class="prop-col__book-name" data-edit={c.edit('stay.homes.rentmeester.book.name')}>
							{@html c.t('stay.homes.rentmeester.book.name')}
						</div>
					</div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="none"
						stroke="rgba(255,255,255,.4)"
						stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"></path></svg
					>
				</a>
			</div>
		</div>
		<!-- /prop-cols -->
	</div>
</section>

<section class="section" style="background:var(--green-deep);">
	<div class="wrap">
		<!-- Booking heading -->
		<div style="text-align:center; margin-bottom:52px;">
			<span class="label label--light reveal" data-edit={c.edit('stay.options.label')}
				>{@html c.t('stay.options.label')}</span
			>
			<div class="rule rule--center rule--light reveal d1"></div>
			<h2
				class="h-display h-display--white reveal d2"
				style="margin-bottom:20px;"
				data-edit={c.edit('stay.options.title')}
			>
				{@html c.t('stay.options.title')}
			</h2>
			<p
				class="body-copy body-copy--white reveal d3"
				style="max-width:520px; margin-inline:auto;"
				data-edit={c.edit('stay.options.intro')}
			>
				{@html c.t('stay.options.intro')}
			</p>
		</div>

		<!-- Two-property booking cards -->
		<div class="booking-cards reveal d3">
			<!-- ── De Orangerie ── -->
			<div
				style="background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.1); display:flex; flex-direction:column;"
			>
				<div style="padding:36px 36px 28px;">
					<div
						style="font-size:8.5px; letter-spacing:.3em; text-transform:uppercase; color:var(--gold); margin-bottom:14px;"
						data-edit={c.edit('stay.book.orangerie.type')}
					>
						{@html c.t('stay.book.orangerie.type')}
					</div>
					<h3
						style="font-family:var(--ff-display); font-size:clamp(1.6rem,2.5vw,2.2rem); font-weight:400; color:var(--white); margin-bottom:16px;"
						data-edit={c.edit('stay.book.orangerie.name')}
					>
						{@html c.t('stay.book.orangerie.name')}
					</h3>
					<p
						style="font-size:14px; color:rgba(255,255,255,.55); line-height:1.8; margin-bottom:24px;"
						data-edit={c.edit('stay.book.orangerie.desc')}
					>
						{@html c.t('stay.book.orangerie.desc')}
					</p>
					<ul
						style="list-style:none; padding:0; margin:0 0 28px; display:flex; flex-direction:column; gap:8px;"
					>
						<li
							style="display:flex; align-items:center; gap:10px; font-size:13px; color:rgba(255,255,255,.55);"
						>
							<i class="fas fa-check" style="color:var(--gold); font-size:10px; width:14px;"></i>
							<span data-edit={c.edit('stay.book.orangerie.f1')}
								>{@html c.t('stay.book.orangerie.f1')}</span
							>
						</li>
						<li
							style="display:flex; align-items:center; gap:10px; font-size:13px; color:rgba(255,255,255,.55);"
						>
							<i class="fas fa-check" style="color:var(--gold); font-size:10px; width:14px;"></i>
							<span data-edit={c.edit('stay.book.orangerie.f2')}
								>{@html c.t('stay.book.orangerie.f2')}</span
							>
						</li>
						<li
							style="display:flex; align-items:center; gap:10px; font-size:13px; color:rgba(255,255,255,.55);"
						>
							<i class="fas fa-check" style="color:var(--gold); font-size:10px; width:14px;"></i>
							<span data-edit={c.edit('stay.book.orangerie.f3')}
								>{@html c.t('stay.book.orangerie.f3')}</span
							>
						</li>
						<li
							style="display:flex; align-items:center; gap:10px; font-size:13px; color:rgba(255,255,255,.55);"
						>
							<i class="fas fa-check" style="color:var(--gold); font-size:10px; width:14px;"></i>
							<span data-edit={c.edit('stay.book.orangerie.f4')}
								>{@html c.t('stay.book.orangerie.f4')}</span
							>
						</li>
					</ul>
				</div>
				<div style="margin-top:auto; padding:0 36px 36px;">
					<a
						href={c.link('airbnb-orangerie')}
						target="_blank"
						rel="noopener"
						style="display:flex; align-items:center; gap:14px; background:rgba(255,90,71,.12); border:1px solid rgba(255,90,71,.4); padding:20px 24px; text-decoration:none; transition:background .25s, border-color .25s;"
						class="hover-airbnb"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 32 32"
							style="width:24px;height:24px;flex-shrink:0;"
							fill="rgba(255,90,71,1)"
						>
							<path
								d="M16 1c-2.5 5.4-8.3 9.1-8.3 13.3a8.3 8.3 0 0016.6 0C24.3 10.1 18.5 6.4 16 1zm0 19.6a6.3 6.3 0 116.3-6.3 6.3 6.3 0 01-6.3 6.3z"
							></path>
						</svg>
						<div>
							<div
								style="font-size:8.5px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,90,71,.8); margin-bottom:3px;"
								data-edit={c.edit('stay.book.orangerie.book.label')}
							>
								{@html c.t('stay.book.orangerie.book.label')}
							</div>
							<div
								style="font-family:var(--ff-display); font-size:1.05rem; color:var(--white);"
								data-edit={c.edit('stay.book.orangerie.book.name')}
							>
								{@html c.t('stay.book.orangerie.book.name')}
							</div>
						</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							style="width:15px;height:15px;margin-left:auto;flex-shrink:0;"
							fill="none"
							stroke="rgba(255,255,255,.4)"
							stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"></path></svg
						>
					</a>
				</div>
			</div>

			<!-- ── De Rentmeesterwoning ── -->
			<div
				style="background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.1); display:flex; flex-direction:column;"
			>
				<div style="padding:36px 36px 28px;">
					<div
						style="font-size:8.5px; letter-spacing:.3em; text-transform:uppercase; color:var(--gold); margin-bottom:14px;"
						data-edit={c.edit('stay.book.rentmeester.type')}
					>
						{@html c.t('stay.book.rentmeester.type')}
					</div>
					<h3
						style="font-family:var(--ff-display); font-size:clamp(1.6rem,2.5vw,2.2rem); font-weight:400; color:var(--white); margin-bottom:16px;"
						data-edit={c.edit('stay.book.rentmeester.name')}
					>
						{@html c.t('stay.book.rentmeester.name')}
					</h3>
					<p
						style="font-size:14px; color:rgba(255,255,255,.55); line-height:1.8; margin-bottom:24px;"
						data-edit={c.edit('stay.book.rentmeester.desc')}
					>
						{@html c.t('stay.book.rentmeester.desc')}
					</p>
					<ul
						style="list-style:none; padding:0; margin:0 0 28px; display:flex; flex-direction:column; gap:8px;"
					>
						<li
							style="display:flex; align-items:center; gap:10px; font-size:13px; color:rgba(255,255,255,.55);"
						>
							<i class="fas fa-check" style="color:var(--gold); font-size:10px; width:14px;"></i>
							<span data-edit={c.edit('stay.book.rentmeester.f1')}
								>{@html c.t('stay.book.rentmeester.f1')}</span
							>
						</li>
						<li
							style="display:flex; align-items:center; gap:10px; font-size:13px; color:rgba(255,255,255,.55);"
						>
							<i class="fas fa-check" style="color:var(--gold); font-size:10px; width:14px;"></i>
							<span data-edit={c.edit('stay.book.rentmeester.f2')}
								>{@html c.t('stay.book.rentmeester.f2')}</span
							>
						</li>
						<li
							style="display:flex; align-items:center; gap:10px; font-size:13px; color:rgba(255,255,255,.55);"
						>
							<i class="fas fa-check" style="color:var(--gold); font-size:10px; width:14px;"></i>
							<span data-edit={c.edit('stay.book.rentmeester.f3')}
								>{@html c.t('stay.book.rentmeester.f3')}</span
							>
						</li>
						<li
							style="display:flex; align-items:center; gap:10px; font-size:13px; color:rgba(255,255,255,.55);"
						>
							<i class="fas fa-check" style="color:var(--gold); font-size:10px; width:14px;"></i>
							<span data-edit={c.edit('stay.book.rentmeester.f4')}
								>{@html c.t('stay.book.rentmeester.f4')}</span
							>
						</li>
					</ul>
				</div>
				<div style="margin-top:auto; padding:0 36px 36px;">
					<a
						href={c.link('airbnb-rentmeester')}
						target="_blank"
						rel="noopener"
						style="display:flex; align-items:center; gap:14px; background:rgba(255,90,71,.12); border:1px solid rgba(255,90,71,.4); padding:20px 24px; text-decoration:none; transition:background .25s, border-color .25s;"
						class="hover-airbnb"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 32 32"
							style="width:24px;height:24px;flex-shrink:0;"
							fill="rgba(255,90,71,1)"
						>
							<path
								d="M16 1c-2.5 5.4-8.3 9.1-8.3 13.3a8.3 8.3 0 0016.6 0C24.3 10.1 18.5 6.4 16 1zm0 19.6a6.3 6.3 0 116.3-6.3 6.3 6.3 0 01-6.3 6.3z"
							></path>
						</svg>
						<div>
							<div
								style="font-size:8.5px; letter-spacing:.2em; text-transform:uppercase; color:rgba(255,90,71,.8); margin-bottom:3px;"
								data-edit={c.edit('stay.book.rentmeester.book.label')}
							>
								{@html c.t('stay.book.rentmeester.book.label')}
							</div>
							<div
								style="font-family:var(--ff-display); font-size:1.05rem; color:var(--white);"
								data-edit={c.edit('stay.book.rentmeester.book.name')}
							>
								{@html c.t('stay.book.rentmeester.book.name')}
							</div>
						</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							style="width:15px;height:15px;margin-left:auto;flex-shrink:0;"
							fill="none"
							stroke="rgba(255,255,255,.4)"
							stroke-width="2"><path d="M7 17L17 7M17 7H7M17 7v10"></path></svg
						>
					</a>
				</div>
			</div>
		</div>

		<!-- Practical info row -->
		<div class="booking-info reveal d4">
			<div
				style="background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08); padding:24px 28px;"
			>
				<div
					style="font-size:9px; letter-spacing:.28em; text-transform:uppercase; color:var(--gold); margin-bottom:12px;"
					data-edit={c.edit('stay.checkin.label')}
				>
					{@html c.t('stay.checkin.label')}
				</div>
				<p
					style="font-size:14px; color:rgba(255,255,255,.6); line-height:1.8;"
					data-edit={c.edit('stay.checkin.body')}
				>
					{@html c.t('stay.checkin.body')}
				</p>
			</div>
			<div
				style="background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08); padding:24px 28px;"
			>
				<div
					style="font-size:9px; letter-spacing:.28em; text-transform:uppercase; color:var(--gold); margin-bottom:12px;"
					data-edit={c.edit('stay.checkout.label')}
				>
					{@html c.t('stay.checkout.label')}
				</div>
				<p
					style="font-size:14px; color:rgba(255,255,255,.6); line-height:1.8;"
					data-edit={c.edit('stay.checkout.body')}
				>
					{@html c.t('stay.checkout.body')}
				</p>
			</div>
			<div
				style="background:rgba(255,100,80,.08); border:1px solid rgba(255,100,80,.15); padding:24px 28px;"
			>
				<div
					style="font-size:9px; letter-spacing:.28em; text-transform:uppercase; color:rgba(255,140,100,.8); margin-bottom:12px;"
					data-edit={c.edit('stay.pets.label')}
				>
					{@html c.t('stay.pets.label')}
				</div>
				<p
					style="font-size:14px; color:rgba(255,255,255,.6); line-height:1.8;"
					data-edit={c.edit('stay.pets.body')}
				>
					{@html c.t('stay.pets.body')}
				</p>
			</div>
		</div>
	</div>
</section>

<section class="parallax-section">
	<div
		class="parallax-section__bg"
		style:background-image={c.bg('verhuur-bg-img-9209-conv')}
		data-edit={c.edit('img:verhuur-bg-img-9209-conv')}
	></div>
	<div class="parallax-section__overlay"></div>
	<div class="parallax-section__content">
		<div class="wrap" style="text-align:center; padding-block:80px;">
			<span
				class="label label--light reveal"
				style="display:block; text-align:center;"
				data-edit={c.edit('stay.cta.label')}>{@html c.t('stay.cta.label')}</span
			>
			<h2
				class="h-display h-display--white reveal d1"
				style="font-size:clamp(2.6rem,5vw,4.5rem); margin-bottom:24px;"
				data-edit={c.edit('stay.cta.title')}
			>
				{@html c.t('stay.cta.title')}
			</h2>
			<p
				class="body-copy body-copy--white reveal d2"
				style="max-width:520px; margin:0 auto 36px;"
				data-edit={c.edit('stay.cta.body')}
			>
				{@html c.t('stay.cta.body')}
			</p>
			<div
				style="display:flex; gap:14px; justify-content:center; flex-wrap:wrap;"
				class="reveal d3"
			>
				<a href={c.link('airbnb-orangerie')} target="_blank" rel="noopener" class="btn btn-gold"
					><span data-edit={c.edit('stay.cta.orangerie.btn')}
						>{@html c.t('stay.cta.orangerie.btn')}</span
					></a
				>
				<a
					href={c.link('airbnb-rentmeester')}
					target="_blank"
					rel="noopener"
					class="btn"
					style="border-color:rgba(255,255,255,.3);color:var(--white);"
					><span data-edit={c.edit('stay.cta.rentmeester.btn')}
						>{@html c.t('stay.cta.rentmeester.btn')}</span
					></a
				>
			</div>
		</div>
	</div>
</section>
