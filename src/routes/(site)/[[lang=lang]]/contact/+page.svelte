<script lang="ts">
	import { getSite } from '#lib/site/context.ts';

	const c = getSite();
</script>

<svelte:head>
	<title>{c.plain('seo.contact.title')}</title>
	<meta name="description" content={c.plain('seo.contact.description')} />
	<link rel="stylesheet" href="/assets/css/contact.css" />
</svelte:head>

<header class="page-hero grain" style="height:clamp(380px,50vh,600px);">
	<div class="page-hero__bg">
		<img
			fetchpriority="high"
			src={c.img('contact-hero')}
			alt="Kasteel Warmelo met gracht en tuinen"
			data-edit={c.edit('img:contact-hero')}
			style={c.imgStyle('contact-hero')}
			class={c.imgClass('contact-hero', '')}
		/>
	</div>
	<div class="page-hero__atmo"></div>
	<div class="wrap page-hero__content">
		<div class="breadcrumb">
			<a href={c.href('./index.html')}>Home</a>
			<span class="breadcrumb__sep">◆</span>
			<span>Contact</span>
		</div>
		<div class="page-hero__eyebrow">
			<span class="page-hero__eyebrow-line"></span>
			<span data-edit={c.edit('contact.hero.eyebrow')}>{@html c.t('contact.hero.eyebrow')}</span>
		</div>
		<h1 class="page-hero__title" data-edit={c.edit('contact.hero.title')}>
			{@html c.t('contact.hero.title')}
		</h1>
	</div>
	<div class="scroll-cue">
		<div class="scroll-cue__line"></div>
		<span data-edit={c.edit('home.scroll')}>{@html c.t('home.scroll')}</span>
	</div>
</header>

<section class="section" style="background:var(--ink);">
	<div class="wrap">
		<div class="split split--text">
			<!-- Contact info -->
			<div>
				<span class="label label--light reveal" data-edit={c.edit('contact.info.label')}
					>{@html c.t('contact.info.label')}</span
				>
				<div class="rule rule--light reveal d1"></div>
				<h2
					class="h-display h-display--white reveal d2"
					style="margin-bottom:36px;"
					data-edit={c.edit('contact.info.title')}
				>
					{@html c.t('contact.info.title')}
				</h2>

				<div class="reveal d3">
					<div class="contact-block">
						<div class="contact-block__icon"><i class="fas fa-location-dot"></i></div>
						<div>
							<div class="contact-block__label" data-edit={c.edit('contact.block.address.label')}>
								{@html c.t('contact.block.address.label')}
							</div>
							<div class="contact-block__value">
								<span data-edit={c.edit('contact.block.address.estate')}
									>{@html c.t('contact.block.address.estate')}</span
								><br /><span data-edit={c.edit('contact:street')}>{c.contact('street')}</span><br
								/><span data-edit={c.edit('contact:city')}>{c.contact('city')}</span>
							</div>
						</div>
					</div>

					<div class="contact-block">
						<div class="contact-block__icon"><i class="fas fa-map-pin"></i></div>
						<div>
							<div class="contact-block__label" data-edit={c.edit('contact.block.entrance.label')}>
								{@html c.t('contact.block.entrance.label')}
							</div>
							<div class="contact-block__value">
								<span data-edit={c.edit('contact:entrance')}>{c.contact('entrance')}</span><br />
								<span
									style="font-size:13px; color:rgba(255,255,255,.4);"
									data-edit={c.edit('contact.block.entrance.note')}
									>{@html c.t('contact.block.entrance.note')}</span
								>
							</div>
						</div>
					</div>

					<div class="contact-block">
						<div class="contact-block__icon"><i class="fas fa-phone"></i></div>
						<div>
							<div class="contact-block__label" data-edit={c.edit('contact.block.phone.label')}>
								{@html c.t('contact.block.phone.label')}
							</div>
							<div class="contact-block__value">
								<a href={c.contactHref('phone')} data-edit={c.edit('contact:phone')}
									>{c.contact('phone')}</a
								>
							</div>
						</div>
					</div>

					<div class="contact-block">
						<div class="contact-block__icon"><i class="fas fa-envelope"></i></div>
						<div>
							<div class="contact-block__label" data-edit={c.edit('contact.block.email.label')}>
								{@html c.t('contact.block.email.label')}
							</div>
							<div class="contact-block__value">
								<a href={c.contactHref('email')} data-edit={c.edit('contact:email')}
									>{c.contact('email')}</a
								><br />
								<a
									href={c.contactHref('email')}
									style="font-size:13px; color:rgba(255,255,255,.4);"
									data-edit={c.edit('contact:email')}>{c.contact('email')}</a
								>
							</div>
						</div>
					</div>

					<div class="contact-block">
						<div class="contact-block__icon"><i class="fab fa-facebook-f"></i></div>
						<div>
							<div class="contact-block__label" data-edit={c.edit('contact.block.social.label')}>
								{@html c.t('contact.block.social.label')}
							</div>
							<div class="contact-block__value">
								<a href={c.link('facebook')} target="_blank" rel="noopener"
									>Facebook — Kasteel Warmelo</a
								><br />
								<a
									href={c.link('instagram')}
									target="_blank"
									rel="noopener"
									style="color:rgba(255,255,255,.55);">Instagram — @kasteelwarmelo</a
								>
							</div>
						</div>
					</div>

					<div class="contact-block">
						<div class="contact-block__icon"><i class="fas fa-clock"></i></div>
						<div>
							<div class="contact-block__label" data-edit={c.edit('contact.block.hours.label')}>
								{@html c.t('contact.block.hours.label')}
							</div>
							<div
								class="contact-block__value"
								style="font-size:14px;"
								data-edit={c.edit('contact.block.hours.value')}
							>
								{@html c.t('contact.block.hours.value')}
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Contact form -->
			<div>
				<span class="label label--light reveal" data-edit={c.edit('contact.form.label')}
					>{@html c.t('contact.form.label')}</span
				>
				<div class="rule rule--light reveal d1"></div>
				<h2
					class="h-display h-display--white reveal d2"
					style="margin-bottom:36px;"
					data-edit={c.edit('contact.form.title')}
				>
					{@html c.t('contact.form.title')}
				</h2>

				<form id="contactForm" class="reveal d3" novalidate>
					<input type="text" name="bot-field" style="display:none" />
					<div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;" class="name-row">
						<div class="form-group">
							<label class="form-label" for="fname" data-edit={c.edit('label.fname')}
								>{@html c.t('label.fname')}</label
							>
							<input
								class="form-input form-input--dark"
								type="text"
								id="fname"
								name="fname"
								placeholder={c.plain('ph.fname')}
								required
							/>
						</div>
						<div class="form-group">
							<label class="form-label" for="lname" data-edit={c.edit('label.lname')}
								>{@html c.t('label.lname')}</label
							>
							<input
								class="form-input form-input--dark"
								type="text"
								id="lname"
								name="lname"
								placeholder={c.plain('ph.lname')}
								required
							/>
						</div>
					</div>

					<div class="form-group">
						<label class="form-label" for="email" data-edit={c.edit('label.email')}
							>{@html c.t('label.email')}</label
						>
						<input
							class="form-input form-input--dark"
							type="email"
							id="email"
							name="email"
							placeholder={c.plain('ph.email')}
							required
						/>
					</div>

					<div class="form-group">
						<label class="form-label" for="phone" data-edit={c.edit('label.phone')}
							>{@html c.t('label.phone')}</label
						>
						<input
							class="form-input form-input--dark"
							type="tel"
							id="phone"
							name="phone"
							placeholder={c.plain('ph.phone')}
						/>
					</div>

					<div class="form-group">
						<label class="form-label" for="subject" data-edit={c.edit('label.subject')}
							>{@html c.t('label.subject')}</label
						>
						<select
							class="form-input form-input--dark"
							id="subject"
							name="subject"
							style="cursor:pointer;"
						>
							<option value="" disabled selected data-edit={c.edit('contact.subject.placeholder')}
								>{@html c.t('contact.subject.placeholder')}</option
							>
							<option value="algemeen" data-edit={c.edit('contact.subject.general')}
								>{@html c.t('contact.subject.general')}</option
							>
							<option value="zandsculpturen" data-edit={c.edit('contact.subject.sand')}
								>{@html c.t('contact.subject.sand')}</option
							>
							<option value="verhuur" data-edit={c.edit('contact.subject.stay')}
								>{@html c.t('contact.subject.stay')}</option
							>
							<option value="evenementen" data-edit={c.edit('contact.subject.events')}
								>{@html c.t('contact.subject.events')}</option
							>
							<option value="schoolbezoek" data-edit={c.edit('contact.subject.school')}
								>{@html c.t('contact.subject.school')}</option
							>
							<option value="overig" data-edit={c.edit('contact.subject.other')}
								>{@html c.t('contact.subject.other')}</option
							>
						</select>
					</div>

					<div class="form-group">
						<label class="form-label" for="message" data-edit={c.edit('label.message')}
							>{@html c.t('label.message')}</label
						>
						<textarea
							class="form-textarea form-textarea--dark"
							id="message"
							name="message"
							placeholder={c.plain('ph.message')}
							required></textarea>
					</div>

					<button type="submit" class="btn btn-gold" style="width:100%; justify-content:center;">
						<i class="fas fa-paper-plane" style="font-size:12px;"></i>
						<span data-edit={c.edit('contact.form.submit')}>{@html c.t('contact.form.submit')}</span
						>
					</button>

					<p
						style="margin-top:16px; font-size:12px; color:rgba(255,255,255,.3); text-align:center; line-height:1.7;"
						data-edit={c.edit('contact.form.privacy')}
					>
						{@html c.t('contact.form.privacy')}
					</p>
				</form>
			</div>
		</div>
	</div>
</section>

<section style="height:480px; position:relative; background:var(--green-deep);">
	<iframe
		src="https://maps.google.com/maps?q=Kasteel+Warmelo,+Stedeke+11,+7478+RV+Diepenheim,+Nederland&amp;t=k&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
		width="100%"
		height="100%"
		style="border:0; display:block;"
		allowfullscreen
		loading="lazy"
		referrerpolicy="no-referrer-when-downgrade"
		title="Kasteel Warmelo op de kaart"
	>
	</iframe>
	<div
		style="position:absolute; top:24px; left:50%; transform:translateX(-50%); background:var(--ink); padding:12px 20px; display:flex; align-items:center; gap:12px; box-shadow:0 8px 40px rgba(0,0,0,.4); z-index:10; white-space:nowrap; max-width:calc(100vw - 32px); overflow:hidden;"
	>
		<i class="fas fa-location-dot" style="color:var(--gold); flex-shrink:0;"></i>
		<span
			style="font-size:13px; color:var(--white); overflow:hidden; text-overflow:ellipsis;"
			data-edit={c.edit('contact.map.pin')}>{@html c.t('contact.map.pin')}</span
		>
	</div>
</section>

<section class="section" style="background:var(--green-deep);">
	<div class="wrap">
		<div style="text-align:center; margin-bottom:56px;">
			<span
				class="label label--light reveal"
				style="display:block; text-align:center;"
				data-edit={c.edit('contact.explore.label')}>{@html c.t('contact.explore.label')}</span
			>
			<div class="rule rule--center rule--light reveal d1"></div>
			<h2 class="h-display h-display--white reveal d2" data-edit={c.edit('contact.explore.title')}>
				{@html c.t('contact.explore.title')}
			</h2>
		</div>
		<div class="card-grid">
			<div class="card card--dark reveal">
				<div class="card__img" style="height:180px;">
					<img
						loading="lazy"
						src={c.img('contact-zand')}
						alt="Zandsculpturen"
						data-edit={c.edit('img:contact-zand')}
						style={c.imgStyle('contact-zand')}
						class={c.imgClass('contact-zand', '')}
					/>
				</div>
				<div class="card__body">
					<div class="card__tag" data-edit={c.edit('contact.card1.tag')}>
						{@html c.t('contact.card1.tag')}
					</div>
					<h3 class="card__title" data-edit={c.edit('contact.card1.title')}>
						{@html c.t('contact.card1.title')}
					</h3>
					<p class="card__text" data-edit={c.edit('contact.card1.text')}>
						{@html c.t('contact.card1.text')}
					</p>
					<a
						class="card__link"
						href={c.href('./zandsculpturen.html')}
						data-edit={c.edit('contact.card1.link')}>{@html c.t('contact.card1.link')}</a
					>
				</div>
			</div>
			<div class="card card--dark reveal d1">
				<div class="card__img" style="height:180px;">
					<img
						loading="lazy"
						src={c.img('contact-park')}
						alt="Tuinen"
						data-edit={c.edit('img:contact-park')}
						style={c.imgStyle('contact-park')}
						class={c.imgClass('contact-park', '')}
					/>
				</div>
				<div class="card__body">
					<div class="card__tag" data-edit={c.edit('contact.card2.tag')}>
						{@html c.t('contact.card2.tag')}
					</div>
					<h3 class="card__title" data-edit={c.edit('contact.card2.title')}>
						{@html c.t('contact.card2.title')}
					</h3>
					<p class="card__text" data-edit={c.edit('contact.card2.text')}>
						{@html c.t('contact.card2.text')}
					</p>
					<a
						class="card__link"
						href={c.href('./tuinen.html')}
						data-edit={c.edit('contact.card2.link')}>{@html c.t('contact.card2.link')}</a
					>
				</div>
			</div>
			<div class="card card--dark reveal d2">
				<div class="card__img" style="height:180px;">
					<img
						loading="lazy"
						src={c.img('contact-boven')}
						alt="Vakantiewoning"
						data-edit={c.edit('img:contact-boven')}
						style={c.imgStyle('contact-boven')}
						class={c.imgClass('contact-boven', '')}
					/>
				</div>
				<div class="card__body">
					<div class="card__tag" data-edit={c.edit('contact.card3.tag')}>
						{@html c.t('contact.card3.tag')}
					</div>
					<h3 class="card__title" data-edit={c.edit('contact.card3.title')}>
						{@html c.t('contact.card3.title')}
					</h3>
					<p class="card__text" data-edit={c.edit('contact.card3.text')}>
						{@html c.t('contact.card3.text')}
					</p>
					<a
						class="card__link"
						href={c.href('./verhuur.html')}
						data-edit={c.edit('contact.card3.link')}>{@html c.t('contact.card3.link')}</a
					>
				</div>
			</div>
		</div>
	</div>
</section>
