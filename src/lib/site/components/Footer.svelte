<script lang="ts">
	import { getSite } from '#lib/site/context.ts';

	const c = getSite();
</script>

<footer class="footer">
	<div class="wrap">
		<div class="footer__gold-line"></div>
		<div class="footer__grid">
			<div>
				<div class="footer__logo">
					<img
						class="footer__crest"
						src="/assets/images/wapenschild-t.webp"
						width="342"
						height="440"
						alt="Wapen"
					/>
					<span class="footer__brand" data-edit={c.edit('contact:name')}>{c.contact('name')}</span>
				</div>
				<p class="footer__desc" data-edit={c.edit('footer.desc')}>{@html c.t('footer.desc')}</p>
				<div class="social-links" style="margin-top:24px;">
					<a
						href={c.link('facebook')}
						class="social-link"
						target="_blank"
						rel="noopener"
						aria-label="Facebook"><i class="fab fa-facebook-f"></i></a
					>
					<a
						href={c.link('instagram')}
						class="social-link"
						target="_blank"
						rel="noopener"
						aria-label="Instagram"><i class="fab fa-instagram"></i></a
					>
				</div>
			</div>
			<div>
				<div class="footer__heading" data-edit={c.edit('footer.open')}>
					{@html c.t('footer.open')}
				</div>
				<ul class="footer__links">
					<li style:display={c.btnHidden('footer-sand') ? 'none' : undefined}>
						<a
							href={c.btnHref('footer-sand', './zandsculpturen.html')}
							data-edit={c.edit('btn:footer-sand')}
							>{@html c.btnLabel('footer-sand', 'footer.link.sand')}</a
						>
					</li>
					<li style:display={c.btnHidden('footer-gardens') ? 'none' : undefined}>
						<a
							href={c.btnHref('footer-gardens', './tuinen.html')}
							data-edit={c.edit('btn:footer-gardens')}
							>{@html c.btnLabel('footer-gardens', 'footer.link.gardens')}</a
						>
					</li>
					<li style:display={c.btnHidden('footer-events') ? 'none' : undefined}>
						<a
							href={c.btnHref('footer-events', './evenementen.html')}
							data-edit={c.edit('btn:footer-events')}
							>{@html c.btnLabel('footer-events', 'footer.link.events')}</a
						>
					</li>
					<li style:display={c.btnHidden('footer-hours') ? 'none' : undefined}>
						<a
							href={c.btnHref('footer-hours', './openingstijden.html')}
							data-edit={c.edit('btn:footer-hours')}
							>{@html c.btnLabel('footer-hours', 'footer.link.visit')}</a
						>
					</li>
					<li style:display={c.btnHidden('footer-prices') ? 'none' : undefined}>
						<a
							href={c.btnHref('footer-prices', './openingstijden.html')}
							data-edit={c.edit('btn:footer-prices')}
							>{@html c.btnLabel('footer-prices', 'footer.link.prices')}</a
						>
					</li>
				</ul>
			</div>
			<div>
				<div class="footer__heading" data-edit={c.edit('footer.visit')}>
					{@html c.t('footer.visit')}
				</div>
				<ul class="footer__links">
					<li style:display={c.btnHidden('footer-horeca') ? 'none' : undefined}>
						<a
							href={c.btnHref('footer-horeca', './horeca.html')}
							data-edit={c.edit('btn:footer-horeca')}
							>{@html c.btnLabel('footer-horeca', 'footer.link.horeca')}</a
						>
					</li>
					<li style:display={c.btnHidden('footer-stay') ? 'none' : undefined}>
						<a
							href={c.btnHref('footer-stay', './verhuur.html')}
							data-edit={c.edit('btn:footer-stay')}
							>{@html c.btnLabel('footer-stay', 'footer.link.stay')}</a
						>
					</li>
					<li style:display={c.btnHidden('footer-contact') ? 'none' : undefined}>
						<a
							href={c.btnHref('footer-contact', './contact.html')}
							data-edit={c.edit('btn:footer-contact')}
							>{@html c.btnLabel('footer-contact', 'footer.link.contact')}</a
						>
					</li>
				</ul>
			</div>
			<div>
				<div class="footer__heading" data-edit={c.edit('footer.follow')}>
					{@html c.t('footer.follow')}
				</div>
				<div class="footer__contact">
					<div class="footer__contact-item">
						<i class="fas fa-location-dot"></i><span
							><span data-edit={c.edit('contact:street')}>{c.contact('street')}</span><br /><span
								data-edit={c.edit('contact:city')}>{c.contact('city')}</span
							></span
						>
					</div>
					<div class="footer__contact-item">
						<i class="fas fa-phone"></i><a
							href={c.contactHref('phone')}
							data-edit={c.edit('contact:phone')}>{c.contact('phone')}</a
						>
					</div>
					<div class="footer__contact-item">
						<i class="fas fa-envelope"></i><a
							href={c.contactHref('email')}
							data-edit={c.edit('contact:email')}>{c.contact('email')}</a
						>
					</div>
				</div>
			</div>
		</div>
		<div class="footer__bottom">
			<span data-edit={c.edit('footer.copy.full')}>{@html c.t('footer.copy.full')}</span>
			<span data-edit={c.edit('footer.copy')}>{@html c.t('footer.copy')}</span>
			<span class="footer__credit"
				>built by <a href="https://drpbuildlab.com" target="_blank" rel="noopener">DRP BuildLab</a
				></span
			>
		</div>
	</div>
</footer>
