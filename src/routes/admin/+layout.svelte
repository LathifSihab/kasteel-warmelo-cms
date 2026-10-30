<script lang="ts">
	import '#lib/admin/admin.css';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon/favicon-32x32.png" />
	<meta name="robots" content="noindex" />
</svelte:head>

{@render children()}
