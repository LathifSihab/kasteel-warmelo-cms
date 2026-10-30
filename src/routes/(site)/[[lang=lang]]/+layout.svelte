<script lang="ts">
	import { setSite } from '#lib/site/context.ts';
	import { LANGS, pathFor } from '#lib/site/pages.ts';
	import { Site } from '#lib/site/site.ts';
	import Footer from '#lib/site/components/Footer.svelte';
	import Lightbox from '#lib/site/components/Lightbox.svelte';
	import Nav from '#lib/site/components/Nav.svelte';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();

	// Server-rendered only (csr = false), so the data never changes after this
	// svelte-ignore state_referenced_locally
	const site = new Site(data.lang, data.page, data.content, data.preview, data.today);
	setSite(site);

	const FONTS =
		'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Inter:wght@300;400;500&display=swap';
	const ICONS = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link rel="preload" as="style" href={FONTS} />
	<link rel="stylesheet" href={FONTS} media="print" data-async-css />
	<link rel="preload" as="style" href={ICONS} />
	<link rel="stylesheet" href={ICONS} media="print" data-async-css />
	<noscript><link rel="stylesheet" href={FONTS} /><link rel="stylesheet" href={ICONS} /></noscript>
	<link rel="icon" type="image/x-icon" href="/assets/images/favicon/favicon.ico" />
	<link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon/favicon-16x16.png" />
	<link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicon/apple-touch-icon.png" />
	<link rel="stylesheet" href="/assets/css/warmelo.min.css" />
	<link rel="stylesheet" href="/assets/css/site.css" />
	<link rel="canonical" href={data.origin + pathFor(data.page, data.lang)} />
	{#each LANGS as l (l)}
		<link rel="alternate" hreflang={l} href={data.origin + pathFor(data.page, l)} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={data.origin + pathFor(data.page, 'nl')} />
	<script src="/assets/js/async-css.js"></script>
	<script src="/assets/js/warmelo.min.js" defer></script>
	{#if data.preview}<script src="/assets/js/preview.js" defer></script>{/if}
</svelte:head>

<Nav />
{@render children()}
<Footer />
<Lightbox />
