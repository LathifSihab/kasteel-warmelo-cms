<script lang="ts">
	import { getSite } from '#lib/site/context.ts';

	const c = getSite();
</script>

<svelte:head>
	<title>{c.plain('seo.horeca.title')}</title>
	<meta name="description" content={c.plain('seo.horeca.description')} />
	<link rel="stylesheet" href="/assets/css/horeca.css" />
</svelte:head>

<header class="page-hero grain">
	<div class="page-hero__bg">
		<img
			fetchpriority="high"
			src={c.img('horeca-hero')}
			alt="Terras Kasteel Warmelo"
			data-edit={c.edit('img:horeca-hero')}
			style={c.imgStyle('horeca-hero')}
			class={c.imgClass('horeca-hero', '')}
		/>
	</div>
	<div class="page-hero__atmo"></div>
	<div class="wrap page-hero__content">
		<div class="breadcrumb">
			<a href={c.href('./index.html')}>Home</a>
			<span class="breadcrumb__sep">◆</span>
			<span>Horeca &amp; Terras</span>
		</div>
		<div class="page-hero__eyebrow">
			<span class="page-hero__eyebrow-line"></span>
			<span data-edit={c.edit('horeca.hero.eyebrow')}>{@html c.t('horeca.hero.eyebrow')}</span>
		</div>
		<h1 class="page-hero__title" data-edit={c.edit('horeca.hero.title')}>
			{@html c.t('horeca.hero.title')}
		</h1>
	</div>
	<div class="scroll-cue">
		<div class="scroll-cue__line"></div>
		<span data-edit={c.edit('home.scroll')}>{@html c.t('home.scroll')}</span>
	</div>
</header>

<section class="section" style="background:var(--ivory);">
	<div class="wrap">
		<div class="split split--wide">
			<div>
				<span class="label reveal" data-edit={c.edit('horeca.intro.label')}
					>{@html c.t('horeca.intro.label')}</span
				>
				<div class="rule reveal d1"></div>
				<h2
					class="h-display reveal d2"
					style="margin-bottom:24px;"
					data-edit={c.edit('horeca.intro.title')}
				>
					{@html c.t('horeca.intro.title')}
				</h2>
				<p
					class="body-copy reveal d3"
					style="margin-bottom:20px;"
					data-edit={c.edit('horeca.intro.body1')}
				>
					{@html c.t('horeca.intro.body1')}
				</p>

				<p
					class="body-copy reveal d5"
					style="margin-bottom:36px;"
					data-edit={c.edit('horeca.intro.body3')}
				>
					{@html c.t('horeca.intro.body3')}
				</p>
				<a
					class="btn btn-outline-g reveal d6"
					href={c.btnHref('horeca-intro', './openingstijden.html')}
					data-edit={c.edit('btn:horeca-intro')}
					style:display={c.btnHidden('horeca-intro') ? 'none' : undefined}
					><span>{@html c.btnLabel('horeca-intro', 'horeca.intro.btn')}</span></a
				>
			</div>
			<div style="display:flex; flex-direction:column; gap:3px;" class="reveal d2">
				<div class="zoom" style:height={c.imgHeight('horeca-lunch')}>
					<img
						loading="lazy"
						src={c.img('horeca-lunch')}
						alt="Lunch"
						style={c.imgStyle('horeca-lunch', 'height:100%;')}
						data-edit={c.edit('img:horeca-lunch')}
						class={c.imgClass('horeca-lunch', '')}
					/>
				</div>
				<div class="zoom" style:height={c.imgHeight('horeca-sfeer')}>
					<img
						loading="lazy"
						src={c.img('horeca-sfeer')}
						alt="Horeca sfeer"
						style={c.imgStyle('horeca-sfeer', 'height:100%;')}
						data-edit={c.edit('img:horeca-sfeer')}
						class={c.imgClass('horeca-sfeer', '')}
					/>
				</div>
			</div>
		</div>
	</div>
</section>

<section style="background:var(--ink);">
	<div
		class="horeca-terras-grid"
		style="display:grid; grid-template-columns:1fr 1fr; min-height:480px;"
	>
		<div
			class="zoom"
			style="min-height:320px;position:relative;overflow:hidden;"
			style:height={c.imgHeight('horeca-terras')}
		>
			<img
				loading="lazy"
				src={c.img('horeca-terras')}
				alt="Tuinpaviljoen Kasteel Warmelo"
				style={c.imgStyle(
					'horeca-terras',
					'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;'
				)}
				data-edit={c.edit('img:horeca-terras')}
				class={c.imgClass('horeca-terras', '')}
			/>
		</div>
		<div
			style="background:var(--green-soft); display:flex; flex-direction:column; justify-content:center; padding:clamp(40px,6vw,80px);"
		>
			<span class="label label--light reveal" data-edit={c.edit('horeca.terras.label')}
				>{@html c.t('horeca.terras.label')}</span
			>
			<div class="rule rule--light reveal d1"></div>
			<h2
				class="h-display h-display--white reveal d2"
				style="margin-bottom:20px;"
				data-edit={c.edit('horeca.terras.title')}
			>
				{@html c.t('horeca.terras.title')}
			</h2>
			<p
				class="body-copy body-copy--white reveal d3"
				style="margin-bottom:28px;"
				data-edit={c.edit('horeca.terras.body')}
			>
				{@html c.t('horeca.terras.body')}
			</p>
			<ul style="display:flex; flex-direction:column; gap:12px;" class="reveal d4">
				<li
					style="display:flex; align-items:center; gap:12px; font-size:14px; color:rgba(255,255,255,.6);"
				>
					<i class="fas fa-check" style="color:var(--gold);"></i>
					<span data-edit={c.edit('horeca.terras.li1')}>{@html c.t('horeca.terras.li1')}</span>
				</li>
				<li
					style="display:flex; align-items:center; gap:12px; font-size:14px; color:rgba(255,255,255,.6);"
				>
					<i class="fas fa-check" style="color:var(--gold);"></i>
					<span data-edit={c.edit('horeca.terras.li2')}>{@html c.t('horeca.terras.li2')}</span>
				</li>
				<li
					style="display:flex; align-items:center; gap:12px; font-size:14px; color:rgba(255,255,255,.6);"
				>
					<i class="fas fa-check" style="color:var(--gold);"></i>
					<span data-edit={c.edit('horeca.terras.li3')}>{@html c.t('horeca.terras.li3')}</span>
				</li>
				<li
					style="display:flex; align-items:center; gap:12px; font-size:14px; color:rgba(255,255,255,.6);"
				>
					<i class="fas fa-check" style="color:var(--gold);"></i>
					<span data-edit={c.edit('horeca.terras.li4')}>{@html c.t('horeca.terras.li4')}</span>
				</li>
				<li
					style="display:flex; align-items:center; gap:12px; font-size:14px; color:rgba(255,255,255,.6);"
				>
					<i class="fas fa-check" style="color:var(--gold);"></i>
					<span data-edit={c.edit('horeca.terras.li5')}>{@html c.t('horeca.terras.li5')}</span>
				</li>
			</ul>
		</div>
	</div>
</section>

<section class="section" style="background:var(--green-deep);">
	<div class="wrap">
		<div style="text-align:center; margin-bottom:48px;">
			<span
				class="label label--light reveal"
				style="display:block; text-align:center;"
				data-edit={c.edit('horeca.menu.label')}>{@html c.t('horeca.menu.label')}</span
			>
			<div class="rule rule--light rule--center reveal d1"></div>
			<h2
				class="h-display h-display--white reveal d2"
				style="margin-bottom:0;"
				data-edit={c.edit('horeca.menu.title')}
			>
				{@html c.t('horeca.menu.title')}
			</h2>
		</div>
		<div class="split">
			<div>
				<div class="menu-section reveal d3">
					<div class="menu-heading" data-edit={c.edit('cms:menu-head-1')}>
						{@html c.v('cms:menu-head-1')}
					</div>
					<div class="menu-item">
						<div>
							<div class="menu-item__name">
								<span data-edit={c.edit('cms:menu-koffie')}>{@html c.v('cms:menu-koffie')}</span>
							</div>
						</div>
						<div class="menu-item__price" data-edit={c.edit('menuprice:koffie')}>
							{c.price('menuprice:koffie')}
						</div>
					</div>
					<div class="menu-item">
						<div>
							<div class="menu-item__name">
								<span data-edit={c.edit('cms:menu-espresso')}>{@html c.v('cms:menu-espresso')}</span
								>
							</div>
						</div>
						<div class="menu-item__price" data-edit={c.edit('menuprice:espresso')}>
							{c.price('menuprice:espresso')}
						</div>
					</div>
					<div class="menu-item">
						<div>
							<div class="menu-item__name">
								<span data-edit={c.edit('cms:menu-cappuccino')}
									>{@html c.v('cms:menu-cappuccino')}</span
								>
							</div>
						</div>
						<div class="menu-item__price" data-edit={c.edit('menuprice:cappuccino')}>
							{c.price('menuprice:cappuccino')}
						</div>
					</div>
					<div class="menu-item">
						<div>
							<div class="menu-item__name">
								<span data-edit={c.edit('cms:menu-thee')}>{@html c.v('cms:menu-thee')}</span>
							</div>
						</div>
						<div class="menu-item__price" data-edit={c.edit('menuprice:thee')}>
							{c.price('menuprice:thee')}
						</div>
					</div>
					<div class="menu-item">
						<div>
							<div class="menu-item__name">
								<span data-edit={c.edit('cms:menu-muntthee')}>{@html c.v('cms:menu-muntthee')}</span
								>
							</div>
						</div>
						<div class="menu-item__price" data-edit={c.edit('menuprice:muntthee')}>
							{c.price('menuprice:muntthee')}
						</div>
					</div>
					<div class="menu-item">
						<div>
							<div class="menu-item__name">
								<span data-edit={c.edit('cms:menu-kannetje')}>{@html c.v('cms:menu-kannetje')}</span
								>
								<span style="color:var(--gold-bright);font-size:10px;letter-spacing:.12em;"
									>TIP</span
								>
							</div>
						</div>
						<div class="menu-item__price" data-edit={c.edit('menuprice:kannetje')}>
							{c.price('menuprice:kannetje')}
						</div>
					</div>
				</div>

				<div class="menu-section reveal d4">
					<div class="menu-heading" data-edit={c.edit('cms:menu-head-2')}>
						{@html c.v('cms:menu-head-2')}
					</div>
					<div class="menu-item">
						<div>
							<div class="menu-item__name">
								<span data-edit={c.edit('cms:menu-frisdrank')}
									>{@html c.v('cms:menu-frisdrank')}</span
								>
							</div>
						</div>
						<div class="menu-item__price" data-edit={c.edit('menuprice:frisdrank')}>
							{c.price('menuprice:frisdrank')}
						</div>
					</div>
					<div class="menu-item">
						<div>
							<div class="menu-item__name">
								<span data-edit={c.edit('cms:menu-vitaminewater')}
									>{@html c.v('cms:menu-vitaminewater')}</span
								>
							</div>
						</div>
						<div class="menu-item__price" data-edit={c.edit('menuprice:vitaminewater')}>
							{c.price('menuprice:vitaminewater')}
						</div>
					</div>
				</div>

				<div class="menu-section reveal d5">
					<div class="menu-heading" data-edit={c.edit('cms:menu-head-3')}>
						{@html c.v('cms:menu-head-3')}
					</div>
					<div class="menu-item">
						<div>
							<div class="menu-item__name">
								<span data-edit={c.edit('cms:menu-wittewijn')}
									>{@html c.v('cms:menu-wittewijn')}</span
								>
							</div>
							<div class="menu-item__desc" data-edit={c.edit('cms:menu-wittewijn-desc')}>
								{@html c.v('cms:menu-wittewijn-desc')}
							</div>
						</div>
						<div class="menu-item__price" data-edit={c.edit('menuprice:wittewijn')}>
							{c.price('menuprice:wittewijn')}
						</div>
					</div>
					<div class="menu-item">
						<div>
							<div class="menu-item__name">
								<span data-edit={c.edit('cms:menu-rose')}>{@html c.v('cms:menu-rose')}</span>
							</div>
							<div class="menu-item__desc" data-edit={c.edit('cms:menu-rose-desc')}>
								{@html c.v('cms:menu-rose-desc')}
							</div>
						</div>
						<div class="menu-item__price" data-edit={c.edit('menuprice:rose')}>
							{c.price('menuprice:rose')}
						</div>
					</div>
					<div class="menu-item">
						<div>
							<div class="menu-item__name">
								<span data-edit={c.edit('cms:menu-rodewijn')}>{@html c.v('cms:menu-rodewijn')}</span
								>
							</div>
							<div class="menu-item__desc" data-edit={c.edit('cms:menu-rodewijn-desc')}>
								{@html c.v('cms:menu-rodewijn-desc')}
							</div>
						</div>
						<div class="menu-item__price" data-edit={c.edit('menuprice:rodewijn')}>
							{c.price('menuprice:rodewijn')}
						</div>
					</div>
					<div class="menu-item">
						<div>
							<div class="menu-item__name">
								<span data-edit={c.edit('cms:menu-bier')}>{@html c.v('cms:menu-bier')}</span>
							</div>
						</div>
						<div class="menu-item__price" data-edit={c.edit('menuprice:bier')}>
							{c.price('menuprice:bier')}
						</div>
					</div>
					<div class="menu-item">
						<div>
							<div class="menu-item__name">
								<span data-edit={c.edit('cms:menu-witbier')}>{@html c.v('cms:menu-witbier')}</span>
							</div>
						</div>
						<div class="menu-item__price" data-edit={c.edit('menuprice:witbier')}>
							{c.price('menuprice:witbier')}
						</div>
					</div>
					<div class="menu-item">
						<div>
							<div class="menu-item__name">
								<span data-edit={c.edit('cms:menu-radler')}>{@html c.v('cms:menu-radler')}</span>
							</div>
						</div>
						<div class="menu-item__price" data-edit={c.edit('menuprice:radler')}>
							{c.price('menuprice:radler')}
						</div>
					</div>
					<div class="menu-item">
						<div>
							<div class="menu-item__name">
								<span data-edit={c.edit('cms:menu-bier00')}>{@html c.v('cms:menu-bier00')}</span>
							</div>
						</div>
						<div class="menu-item__price" data-edit={c.edit('menuprice:bier00')}>
							{c.price('menuprice:bier00')}
						</div>
					</div>
				</div>
			</div>

			<div>
				<div>
					<div class="menu-section reveal d3">
						<div class="menu-heading" data-edit={c.edit('cms:menu-head-4')}>
							{@html c.v('cms:menu-head-4')}
						</div>
						<div class="menu-item">
							<div>
								<div class="menu-item__name">
									<span data-edit={c.edit('cms:menu-gezond')}>{@html c.v('cms:menu-gezond')}</span>
								</div>
							</div>
							<div class="menu-item__price" data-edit={c.edit('menuprice:gezond')}>
								{c.price('menuprice:gezond')}
							</div>
						</div>
						<div class="menu-item">
							<div>
								<div class="menu-item__name">
									<span data-edit={c.edit('cms:menu-brie')}>{@html c.v('cms:menu-brie')}</span>
								</div>
							</div>
							<div class="menu-item__price" data-edit={c.edit('menuprice:brie')}>
								{c.price('menuprice:brie')}
							</div>
						</div>
						<div class="menu-item">
							<div>
								<div class="menu-item__name">
									<span data-edit={c.edit('cms:menu-eiersalade')}
										>{@html c.v('cms:menu-eiersalade')}</span
									>
								</div>
							</div>
							<div class="menu-item__price" data-edit={c.edit('menuprice:eiersalade')}>
								{c.price('menuprice:eiersalade')}
							</div>
						</div>
						<div class="menu-item">
							<div>
								<div class="menu-item__name">
									<span data-edit={c.edit('cms:menu-kipkerrie')}
										>{@html c.v('cms:menu-kipkerrie')}</span
									>
								</div>
							</div>
							<div class="menu-item__price" data-edit={c.edit('menuprice:kipkerrie')}>
								{c.price('menuprice:kipkerrie')}
							</div>
						</div>
						<div class="menu-item">
							<div>
								<div class="menu-item__name">
									<span data-edit={c.edit('cms:menu-ham')}>{@html c.v('cms:menu-ham')}</span>
								</div>
							</div>
							<div class="menu-item__price" data-edit={c.edit('menuprice:ham')}>
								{c.price('menuprice:ham')}
							</div>
						</div>
						<div class="menu-item">
							<div>
								<div class="menu-item__name">
									<span data-edit={c.edit('cms:menu-kaas')}>{@html c.v('cms:menu-kaas')}</span>
								</div>
							</div>
							<div class="menu-item__price" data-edit={c.edit('menuprice:kaas')}>
								{c.price('menuprice:kaas')}
							</div>
						</div>
					</div>

					<div class="menu-section reveal d4">
						<div class="menu-heading" data-edit={c.edit('cms:menu-head-5')}>
							{@html c.v('cms:menu-head-5')}
						</div>
						<div class="menu-item">
							<div>
								<div class="menu-item__name">
									<span data-edit={c.edit('cms:menu-appelflap')}
										>{@html c.v('cms:menu-appelflap')}</span
									>
								</div>
							</div>
							<div class="menu-item__price" data-edit={c.edit('menuprice:appelflap')}>
								{c.price('menuprice:appelflap')}
							</div>
						</div>
						<div class="menu-item">
							<div>
								<div class="menu-item__name">
									<span data-edit={c.edit('cms:menu-saucijzen')}
										>{@html c.v('cms:menu-saucijzen')}</span
									>
								</div>
							</div>
							<div class="menu-item__price" data-edit={c.edit('menuprice:saucijzen')}>
								{c.price('menuprice:saucijzen')}
							</div>
						</div>
						<div class="menu-item">
							<div>
								<div class="menu-item__name">
									<span data-edit={c.edit('cms:menu-kroket')}>{@html c.v('cms:menu-kroket')}</span>
								</div>
							</div>
							<div class="menu-item__price" data-edit={c.edit('menuprice:kroket')}>
								{c.price('menuprice:kroket')}
							</div>
						</div>
						<div class="menu-item">
							<div>
								<div class="menu-item__name">
									<span data-edit={c.edit('cms:menu-tosti')}>{@html c.v('cms:menu-tosti')}</span>
								</div>
							</div>
							<div class="menu-item__price" data-edit={c.edit('menuprice:tosti')}>
								{c.price('menuprice:tosti')}
							</div>
						</div>
						<div class="menu-item">
							<div>
								<div class="menu-item__name">
									<span data-edit={c.edit('cms:menu-bitterballen')}
										>{@html c.v('cms:menu-bitterballen')}</span
									>
								</div>
							</div>
							<div class="menu-item__price" data-edit={c.edit('menuprice:bitterballen')}>
								{c.price('menuprice:bitterballen')}
							</div>
						</div>
					</div>

					<div class="menu-section reveal d5">
						<div class="menu-heading" data-edit={c.edit('cms:menu-head-6')}>
							{@html c.v('cms:menu-head-6')}
						</div>
						<div class="menu-item">
							<div>
								<div class="menu-item__name">
									<span data-edit={c.edit('cms:menu-appelgebak')}
										>{@html c.v('cms:menu-appelgebak')}</span
									>
								</div>
							</div>
							<div class="menu-item__price" data-edit={c.edit('menuprice:appelgebak')}>
								{c.price('menuprice:appelgebak')}
							</div>
						</div>
						<div class="menu-item">
							<div>
								<div class="menu-item__name">
									<span data-edit={c.edit('cms:menu-luxegebak')}
										>{@html c.v('cms:menu-luxegebak')}</span
									>
								</div>
								<div class="menu-item__desc" data-edit={c.edit('cms:menu-luxegebak-desc')}>
									{@html c.v('cms:menu-luxegebak-desc')}
								</div>
							</div>
							<div class="menu-item__price" data-edit={c.edit('menuprice:luxegebak')}>
								{c.price('menuprice:luxegebak')}
							</div>
						</div>
						<div class="menu-item">
							<div>
								<div class="menu-item__name">
									<span data-edit={c.edit('cms:menu-petitfour')}
										>{@html c.v('cms:menu-petitfour')}</span
									>
								</div>
							</div>
							<div class="menu-item__price" data-edit={c.edit('menuprice:petitfour')}>
								{c.price('menuprice:petitfour')}
							</div>
						</div>
						<div class="menu-item">
							<div>
								<div class="menu-item__name">
									<span data-edit={c.edit('cms:menu-stroopwafel')}
										>{@html c.v('cms:menu-stroopwafel')}</span
									>
								</div>
							</div>
							<div class="menu-item__price" data-edit={c.edit('menuprice:stroopwafel')}>
								{c.price('menuprice:stroopwafel')}
							</div>
						</div>
					</div>

					<div
						class="notice-box reveal d6"
						style="margin-top:24px; background:rgba(255,255,255,.04); border-color:rgba(255,255,255,.08); border-left-color:var(--gold);"
					>
						<p style="color:rgba(255,255,255,.5); font-size:13px;">
							Menukaart seizoen 2026. Kleine aanpassingen voorbehouden.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section style="background:var(--green-deep);">
	<div class="wrap" style="text-align:center; padding-block:80px;">
		<span
			class="label label--light reveal"
			style="display:block; text-align:center;"
			data-edit={c.edit('horeca.cta.label')}>{@html c.t('horeca.cta.label')}</span
		>
		<div class="rule rule--center rule--light reveal d1"></div>
		<h2
			class="h-display h-display--white reveal d2"
			style="font-size:clamp(2.4rem,5vw,4.2rem); margin-bottom:24px;"
			data-edit={c.edit('horeca.cta.title')}
		>
			{@html c.t('horeca.cta.title')}
		</h2>
		<p
			class="body-copy body-copy--white reveal d3"
			style="max-width:480px; margin:0 auto 36px;"
			data-edit={c.edit('horeca.cta.body')}
		>
			{@html c.t('horeca.cta.body')}
		</p>
		<a
			class="btn btn-gold reveal d4"
			href={c.btnHref('horeca-cta', './openingstijden.html')}
			data-edit={c.edit('btn:horeca-cta')}
			style:display={c.btnHidden('horeca-cta') ? 'none' : undefined}
			><span>{@html c.btnLabel('horeca-cta', 'horeca.cta.btn')}</span></a
		>
	</div>
</section>
