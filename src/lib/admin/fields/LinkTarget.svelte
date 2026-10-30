<script lang="ts">
	import { PAGES } from '#lib/site/pages.ts';

	/** A link target: one of the site's pages (stored as './page.html') or any URL. '' = the default. */
	let {
		value,
		defaultLabel,
		onchange
	}: { value: string; defaultLabel: string; onchange: (v: string) => void } = $props();

	const pageValue = (id: string) => `./${id}.html`;
	const isPage = $derived(PAGES.some((p) => pageValue(p.id) === value));
	let custom = $state(false);
	$effect(() => {
		if (value && !isPage) custom = true;
	});
	const selected = $derived(custom ? '__custom' : value);
</script>

<select
	value={selected}
	onchange={(e) => {
		const v = e.currentTarget.value;
		custom = v === '__custom';
		if (!custom) onchange(v);
	}}
>
	<option value="">{defaultLabel}</option>
	{#each PAGES as p (p.id)}<option value={pageValue(p.id)}>{p.name}</option>{/each}
	<option value="__custom">Eigen URL…</option>
</select>
{#if custom}
	<input
		type="text"
		value={isPage ? '' : value}
		placeholder="https://… of ./evenementen.html#agenda"
		oninput={(e) => onchange(e.currentTarget.value.trim())}
	/>
{/if}
