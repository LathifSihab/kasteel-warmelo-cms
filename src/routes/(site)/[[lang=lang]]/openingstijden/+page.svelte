<script lang="ts">
	import { getSite } from '#lib/site/context.ts';

	const c = getSite();
</script>

<svelte:head>
	<title>{c.plain('seo.openingstijden.title')}</title>
	<meta name="description" content={c.plain('seo.openingstijden.description')} />
	<link rel="stylesheet" href="/assets/css/openingstijden.css" />
</svelte:head>

<header class="page-hero grain">
	<div class="page-hero__bg">
		<img
			fetchpriority="high"
			src={c.img('openingstijden-hero')}
			alt="Kasteel Warmelo"
			data-edit={c.edit('img:openingstijden-hero')}
			style={c.imgStyle('openingstijden-hero')}
			class={c.imgClass('openingstijden-hero', '')}
		/>
	</div>
	<div class="page-hero__atmo"></div>
	<div class="wrap page-hero__content">
		<div class="breadcrumb">
			<a href={c.href('./index.html')}>Home</a>
			<span class="breadcrumb__sep">◆</span>
			<span>Bezoek plannen</span>
		</div>
		<div class="page-hero__eyebrow">
			<span class="page-hero__eyebrow-line"></span>
			<span data-edit={c.edit('visit.hero.eyebrow')}>{@html c.t('visit.hero.eyebrow')}</span>
		</div>
		<h1 class="page-hero__title" data-edit={c.edit('visit.hero.title')}>
			{@html c.t('visit.hero.title')}
		</h1>
	</div>
	<div class="scroll-cue">
		<div class="scroll-cue__line"></div>
		<span data-edit={c.edit('home.scroll')}>{@html c.t('home.scroll')}</span>
	</div>
</header>

<section style="background:var(--gold); padding:28px 0;">
	<div class="wrap" style="text-align:center;">
		<p
			style="font-family:var(--ff-display); font-size:clamp(1.2rem,2.5vw,1.8rem); color:var(--white); letter-spacing:.04em;"
			data-edit={c.edit('visit.banner')}
		>
			{@html c.t('visit.banner')}
		</p>
	</div>
</section>

<section class="section" style="background:var(--ink);">
	<div class="wrap">
		<div style="text-align:center; margin-bottom:56px;">
			<span
				class="label label--light reveal"
				style="display:block; text-align:center;"
				data-edit={c.edit('visit.hours.label')}>{@html c.t('visit.hours.label')}</span
			>
			<div class="rule rule--center rule--light reveal d1"></div>
			<h2
				class="h-display h-display--white reveal d2"
				style="margin-bottom:16px;"
				data-edit={c.edit('visit.hours.title')}
			>
				{@html c.t('visit.hours.title')}
			</h2>
			<p
				class="body-copy body-copy--white reveal d3"
				style="max-width:480px; margin:0 auto;"
				data-edit={c.edit('visit.hours.sub')}
			>
				{@html c.t('visit.hours.sub')}
			</p>
		</div>

		<div class="big-hours reveal">
			<div class="bh-item bh-item--closed">
				<div class="bh-day" data-edit={c.edit('day.mon')}>{@html c.t('day.mon')}</div>
				<div class="bh-time bh-time--closed" data-edit={c.edit('time.closed')}>
					{@html c.t('time.closed')}
				</div>
			</div>
			<div class="bh-item">
				<div class="bh-day" data-edit={c.edit('day.tue')}>{@html c.t('day.tue')}</div>
				<div class="bh-time" data-edit={c.edit('cms:hours-tue')}>{@html c.v('cms:hours-tue')}</div>
			</div>
			<div class="bh-item">
				<div class="bh-day" data-edit={c.edit('day.wed')}>{@html c.t('day.wed')}</div>
				<div class="bh-time" data-edit={c.edit('cms:hours-wed')}>{@html c.v('cms:hours-wed')}</div>
			</div>
			<div class="bh-item">
				<div class="bh-day" data-edit={c.edit('day.thu')}>{@html c.t('day.thu')}</div>
				<div class="bh-time" data-edit={c.edit('cms:hours-thu')}>{@html c.v('cms:hours-thu')}</div>
			</div>
			<div class="bh-item">
				<div class="bh-day" data-edit={c.edit('day.fri')}>{@html c.t('day.fri')}</div>
				<div class="bh-time" data-edit={c.edit('cms:hours-fri')}>{@html c.v('cms:hours-fri')}</div>
			</div>
			<div class="bh-item">
				<div class="bh-day" data-edit={c.edit('day.sat')}>{@html c.t('day.sat')}</div>
				<div class="bh-time" data-edit={c.edit('cms:hours-sat')}>{@html c.v('cms:hours-sat')}</div>
			</div>
			<div class="bh-item">
				<div class="bh-day" data-edit={c.edit('day.sun')}>{@html c.t('day.sun')}</div>
				<div class="bh-time" data-edit={c.edit('cms:hours-sun')}>{@html c.v('cms:hours-sun')}</div>
			</div>
			<div class="bh-item">
				<div class="bh-day" data-edit={c.edit('day.ascension')}>{@html c.t('day.ascension')}</div>
				<div class="bh-time" data-edit={c.edit('cms:hours-ascension')}>
					{@html c.v('cms:hours-ascension')}
				</div>
			</div>
			<div class="bh-item">
				<div class="bh-day" data-edit={c.edit('day.whitsun')}>{@html c.t('day.whitsun')}</div>
				<div class="bh-time" data-edit={c.edit('cms:hours-whitsun')}>
					{@html c.v('cms:hours-whitsun')}
				</div>
			</div>
		</div>

		<div
			class="notice-box reveal"
			style="margin-top:32px; background:rgba(255,255,255,.04); border-color:rgba(255,255,255,.08); border-left-color:var(--gold);"
		>
			<p style="color:rgba(255,255,255,.55);" data-edit={c.edit('visit.notice')}>
				{@html c.t('visit.notice')}
			</p>
		</div>
	</div>
</section>

<section class="section section--ivory">
	<div class="wrap">
		<div style="text-align:center; margin-bottom:60px;">
			<span
				class="label reveal"
				style="display:block; text-align:center;"
				data-edit={c.edit('visit.prices.label')}>{@html c.t('visit.prices.label')}</span
			>
			<div class="rule rule--center reveal d1"></div>
			<h2
				class="h-display reveal d2"
				style="margin-bottom:16px;"
				data-edit={c.edit('visit.prices.title')}
			>
				{@html c.t('visit.prices.title')}
			</h2>
			<p
				class="body-copy reveal d3"
				style="max-width:480px; margin:0 auto;"
				data-edit={c.edit('visit.prices.sub')}
			>
				{@html c.t('visit.prices.sub')}
			</p>
		</div>

		<div class="price-cards reveal">
			<div class="price-card">
				<div class="price-card__who" data-edit={c.edit('visit.pc.adult.who')}>
					{@html c.t('visit.pc.adult.who')}
				</div>
				<div class="price-card__price" data-edit={c.edit('cms:price-volwassene')}>
					{c.price('cms:price-volwassene')}
				</div>
				<div class="price-card__note" data-edit={c.edit('visit.pc.adult.note')}>
					{@html c.t('visit.pc.adult.note')}
				</div>
			</div>
			<div class="price-card price-card--featured">
				<div class="price-card__who" data-edit={c.edit('visit.pc.child.who')}>
					{@html c.t('visit.pc.child.who')}
				</div>
				<div class="price-card__price" data-edit={c.edit('cms:price-kind')}>
					{c.price('cms:price-kind')}
				</div>
				<div class="price-card__note" data-edit={c.edit('visit.pc.child.note')}>
					{@html c.t('visit.pc.child.note')}
				</div>
			</div>
			<div class="price-card">
				<div class="price-card__who" data-edit={c.edit('visit.pc.infant.who')}>
					{@html c.t('visit.pc.infant.who')}
				</div>
				<div
					class="price-card__price"
					style="color:var(--emerald);"
					data-edit={c.edit('visit.pc.infant.price')}
				>
					{@html c.t('visit.pc.infant.price')}
				</div>
				<div class="price-card__note" data-edit={c.edit('visit.pc.infant.note')}>
					{@html c.t('visit.pc.infant.note')}
				</div>
			</div>
			<div class="price-card">
				<div class="price-card__who" data-edit={c.edit('visit.pc.park.who')}>
					{@html c.t('visit.pc.park.who')}
				</div>
				<div
					class="price-card__price"
					style="color:var(--emerald);"
					data-edit={c.edit('visit.pc.park.price')}
				>
					{@html c.t('visit.pc.park.price')}
				</div>
				<div class="price-card__note" data-edit={c.edit('contact:entrance')}>
					{c.contact('entrance')}
				</div>
			</div>
		</div>

		<div class="notice-box reveal" style="margin-top:28px;">
			<p data-edit={c.edit('visit.school.notice')}>{@html c.t('visit.school.notice')}</p>
		</div>
	</div>
</section>

<section class="section" style="background:var(--green);">
	<div class="wrap">
		<div class="split">
			<div>
				<span class="label label--light reveal" data-edit={c.edit('visit.loc.label')}
					>{@html c.t('visit.loc.label')}</span
				>
				<div class="rule rule--light reveal d1"></div>
				<h2
					class="h-display h-display--white reveal d2"
					style="margin-bottom:32px;"
					data-edit={c.edit('visit.loc.title')}
				>
					{@html c.t('visit.loc.title')}
				</h2>

				<div style="display:flex; flex-direction:column; gap:20px;" class="reveal d3">
					<div style="display:flex; gap:20px; align-items:flex-start;">
						<div
							style="width:44px; height:44px; background:var(--gold); display:flex; align-items:center; justify-content:center; flex-shrink:0;"
						>
							<i class="fas fa-location-dot" style="color:var(--white);"></i>
						</div>
						<div>
							<div
								style="font-size:9px; letter-spacing:.26em; text-transform:uppercase; color:var(--gold-bright); margin-bottom:6px;"
								data-edit={c.edit('visit.loc.entrance')}
							>
								{@html c.t('visit.loc.entrance')}
							</div>
							<p style="font-size:14px; color:rgba(255,255,255,.65); line-height:1.8;">
								<span data-edit={c.edit('contact:entrance')}>{c.contact('entrance')}</span><br
								/><span data-edit={c.edit('contact:street')}>{c.contact('street')}</span>,
								<span data-edit={c.edit('contact:city')}>{c.contact('city')}</span>
							</p>
						</div>
					</div>
					<div style="display:flex; gap:20px; align-items:flex-start;">
						<div
							style="width:44px; height:44px; background:var(--gold); display:flex; align-items:center; justify-content:center; flex-shrink:0;"
						>
							<i class="fas fa-car" style="color:var(--white);"></i>
						</div>
						<div>
							<div
								style="font-size:9px; letter-spacing:.26em; text-transform:uppercase; color:var(--gold-bright); margin-bottom:6px;"
								data-edit={c.edit('visit.loc.car.label')}
							>
								{@html c.t('visit.loc.car.label')}
							</div>
							<p
								style="font-size:14px; color:rgba(255,255,255,.65); line-height:1.8;"
								data-edit={c.edit('visit.loc.car.body')}
							>
								{@html c.t('visit.loc.car.body')}
							</p>
						</div>
					</div>
					<div style="display:flex; gap:20px; align-items:flex-start;">
						<div
							style="width:44px; height:44px; background:var(--gold); display:flex; align-items:center; justify-content:center; flex-shrink:0;"
						>
							<i class="fas fa-bicycle" style="color:var(--white);"></i>
						</div>
						<div>
							<div
								style="font-size:9px; letter-spacing:.26em; text-transform:uppercase; color:var(--gold-bright); margin-bottom:6px;"
								data-edit={c.edit('visit.loc.bike.label')}
							>
								{@html c.t('visit.loc.bike.label')}
							</div>
							<p
								style="font-size:14px; color:rgba(255,255,255,.65); line-height:1.8;"
								data-edit={c.edit('visit.loc.bike.body')}
							>
								{@html c.t('visit.loc.bike.body')}
							</p>
						</div>
					</div>
					<div style="display:flex; gap:20px; align-items:flex-start;">
						<div
							style="width:44px; height:44px; background:var(--gold); display:flex; align-items:center; justify-content:center; flex-shrink:0;"
						>
							<i class="fas fa-bus" style="color:var(--white);"></i>
						</div>
						<div>
							<div
								style="font-size:9px; letter-spacing:.26em; text-transform:uppercase; color:var(--gold-bright); margin-bottom:6px;"
								data-edit={c.edit('visit.loc.bus.label')}
							>
								{@html c.t('visit.loc.bus.label')}
							</div>
							<p
								style="font-size:14px; color:rgba(255,255,255,.65); line-height:1.8;"
								data-edit={c.edit('visit.loc.bus.body')}
							>
								{@html c.t('visit.loc.bus.body')}
							</p>
						</div>
					</div>
					<div style="display:flex; gap:20px; align-items:flex-start;">
						<div
							style="width:44px; height:44px; background:var(--gold); display:flex; align-items:center; justify-content:center; flex-shrink:0;"
						>
							<i class="fas fa-phone" style="color:var(--white);"></i>
						</div>
						<div>
							<div
								style="font-size:9px; letter-spacing:.26em; text-transform:uppercase; color:var(--gold-bright); margin-bottom:6px;"
							>
								Contact
							</div>
							<p style="font-size:14px; color:rgba(255,255,255,.65); line-height:1.8;">
								<a
									href={c.contactHref('phone')}
									style="color:var(--gold-bright);"
									data-edit={c.edit('contact:phone')}>{c.contact('phone')}</a
								><br /><a
									href={c.contactHref('email')}
									style="color:var(--gold-bright);"
									data-edit={c.edit('contact:email')}>{c.contact('email')}</a
								>
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Map + directions -->
			<div
				class="reveal d2"
				style="min-height:420px; background:var(--green-deep); border:1px solid rgba(255,255,255,.1); overflow:hidden; position:relative; display:flex; flex-direction:column;"
			>
				<iframe
					src="https://www.google.com/maps/embed?pb=!1m28!1m12!1m3!1d1323.4!2d6.5199!3d52.3383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m13!3e2!4m5!1s0x47b81f3ca25e5baf%3A0xe1da3d2c0!2sBorculoseweg%2C+7478+RV+Diepenheim!3m2!1d52.3393!2d6.5179!4m5!1s0x47b81f3a8ef02c15%3A0x3d05c16b6f929ec9!2sKasteel+Warmelo%2C+Stedeke+11%2C+7478+RV+Diepenheim!3m2!1d52.3376!2d6.5222!5e0!3m2!1snl!2snl!4v1748867000000"
					width="100%"
					height="100%"
					style="border:0; flex:1; min-height:300px;"
					allowfullscreen
					loading="lazy"
					referrerpolicy="no-referrer-when-downgrade"
					title="Wandelroute parkeren naar Kasteel Warmelo"
				>
				</iframe>
				<div
					style="background:var(--green-deep); padding:16px 20px; border-top:1px solid rgba(255,255,255,.08);"
				>
					<div
						style="font-size:9px; letter-spacing:.26em; text-transform:uppercase; color:var(--gold-bright); margin-bottom:6px;"
						data-edit={c.edit('contact:entrance')}
					>
						{c.contact('entrance')}
					</div>
					<div
						style="font-size:12px; color:rgba(255,255,255,.6); line-height:1.6; margin-bottom:12px;"
						data-edit={c.edit('visit.loc.map.caption')}
					>
						{@html c.t('visit.loc.map.caption')}
					</div>
					<div style="display:flex; gap:10px; flex-wrap:wrap;">
						<a
							href="https://www.google.com/maps/dir/Borculoseweg,+7478+Diepenheim/Kasteel+Warmelo,+Stedeke+11,+7478+RV+Diepenheim/@52.3384,6.5183,17z/data=!3m1!4b1!4m9!4m8!1m3!2m2!1d6.519!2d52.3390!1m3!2m2!1d6.5222!2d52.3376!3e2"
							target="_blank"
							rel="noopener"
							style="display:inline-flex; align-items:center; gap:8px; background:var(--gold); color:var(--ink); padding:9px 18px; font-size:9px; font-weight:700; letter-spacing:.16em; text-transform:uppercase; text-decoration:none; transition:background .2s;"
							class="hover-gold"
						>
							<i class="fas fa-walking"></i>
							<span data-edit={c.edit('visit.loc.map.btn')}>{@html c.t('visit.loc.map.btn')}</span>
						</a>
						<a
							href="https://www.google.com/maps/search/Bushalte+Warmelo,+Diepenheim/@52.3390,6.5179,17z"
							target="_blank"
							rel="noopener"
							style="display:inline-flex; align-items:center; gap:8px; background:transparent; border:1px solid rgba(255,255,255,.2); color:rgba(255,255,255,.75); padding:9px 18px; font-size:9px; font-weight:500; letter-spacing:.14em; text-transform:uppercase; text-decoration:none; transition:all .2s;"
							class="hover-outline-gold"
						>
							<i class="fas fa-bus"></i>
							<span data-edit={c.edit('visit.loc.map.bus')}>{@html c.t('visit.loc.map.bus')}</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="section section--cream">
	<div class="wrap">
		<div style="text-align:center; margin-bottom:56px;">
			<span
				class="label reveal"
				style="display:block; text-align:center;"
				data-edit={c.edit('visit.tips.label')}>{@html c.t('visit.tips.label')}</span
			>
			<div class="rule rule--center reveal d1"></div>
			<h2 class="h-display reveal d2" data-edit={c.edit('visit.tips.title')}>
				{@html c.t('visit.tips.title')}
			</h2>
		</div>
		<div class="card-grid">
			<div class="card reveal">
				<div class="card__body">
					<div class="card__tag" data-edit={c.edit('visit.tip1.tag')}>
						{@html c.t('visit.tip1.tag')}
					</div>
					<h3 class="card__title" data-edit={c.edit('visit.tip1.title')}>
						{@html c.t('visit.tip1.title')}
					</h3>
					<p class="card__text" data-edit={c.edit('visit.tip1.text')}>
						{@html c.t('visit.tip1.text')}
					</p>
				</div>
			</div>
			<div class="card reveal d1">
				<div class="card__body">
					<div class="card__tag" data-edit={c.edit('visit.tip2.tag')}>
						{@html c.t('visit.tip2.tag')}
					</div>
					<h3 class="card__title" data-edit={c.edit('visit.tip2.title')}>
						{@html c.t('visit.tip2.title')}
					</h3>
					<p class="card__text" data-edit={c.edit('visit.tip2.text')}>
						{@html c.t('visit.tip2.text')}
					</p>
				</div>
			</div>
			<div class="card reveal d2">
				<div class="card__body">
					<div class="card__tag" data-edit={c.edit('visit.tip3.tag')}>
						{@html c.t('visit.tip3.tag')}
					</div>
					<h3 class="card__title" data-edit={c.edit('visit.tip3.title')}>
						{@html c.t('visit.tip3.title')}
					</h3>
					<p class="card__text" data-edit={c.edit('visit.tip3.text')}>
						{@html c.t('visit.tip3.text')}
					</p>
				</div>
			</div>
			<div class="card reveal d3">
				<div class="card__body">
					<div class="card__tag" data-edit={c.edit('visit.tip4.tag')}>
						{@html c.t('visit.tip4.tag')}
					</div>
					<h3 class="card__title" data-edit={c.edit('visit.tip4.title')}>
						{@html c.t('visit.tip4.title')}
					</h3>
					<p class="card__text" data-edit={c.edit('visit.tip4.text')}>
						{@html c.t('visit.tip4.text')}
					</p>
					<a
						class="card__link"
						href={c.href('./verhuur.html')}
						data-edit={c.edit('visit.tip4.link')}>{@html c.t('visit.tip4.link')}</a
					>
				</div>
			</div>
			<div class="card reveal d4">
				<div class="card__body">
					<div class="card__tag" data-edit={c.edit('visit.tip5.tag')}>
						{@html c.t('visit.tip5.tag')}
					</div>
					<h3 class="card__title" data-edit={c.edit('visit.tip5.title')}>
						{@html c.t('visit.tip5.title')}
					</h3>
					<p class="card__text" data-edit={c.edit('visit.tip5.text')}>
						{@html c.t('visit.tip5.text')}
					</p>
				</div>
			</div>
		</div>
	</div>
</section>
