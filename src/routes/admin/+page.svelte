<script lang="ts">
	import { onMount } from 'svelte';
	import { resolve } from '$app/paths';
	import { Editor, setEditor } from '#lib/admin/editor.svelte.ts';
	import FieldRow from '#lib/admin/fields/FieldRow.svelte';
	import { LANGS, PAGES } from '#lib/site/pages.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	// svelte-ignore state_referenced_locally
	const ed = new Editor(data.published, data.drafts, data.storage);
	setEditor(ed);

	onMount(() => {
		const onMessage = (e: MessageEvent) => {
			if (e.origin !== location.origin) return;
			if (e.data?.type === 'wcms:focus') ed.focus(e.data.key);
		};
		const beforeUnload = (e: BeforeUnloadEvent) => {
			if (ed.status === 'saving') e.preventDefault();
		};
		window.addEventListener('message', onMessage);
		window.addEventListener('beforeunload', beforeUnload);
		return () => {
			window.removeEventListener('message', onMessage);
			window.removeEventListener('beforeunload', beforeUnload);
		};
	});

	const statusText = $derived(
		ed.status === 'saving'
			? 'Opslaan…'
			: ed.status === 'error'
				? '⚠ ' + ed.message
				: ed.draftCount
					? `${ed.draftCount} niet-gepubliceerde wijziging${ed.draftCount === 1 ? '' : 'en'} — alleen zichtbaar in deze preview`
					: ed.message || 'Alles is gepubliceerd'
	);
</script>

<svelte:head><title>Beheer — Kasteel Warmelo</title></svelte:head>

<div class="app">
	<header class="top">
		<nav class="pages" aria-label="Pagina's">
			{#each PAGES as p (p.id)}
				<button type="button" class:active={ed.page === p.id} onclick={() => (ed.page = p.id)}
					>{p.name}</button
				>
			{/each}
		</nav>
		<div class="langs" role="group" aria-label="Taal">
			{#each LANGS as l (l)}
				<button type="button" class:active={ed.lang === l} onclick={() => (ed.lang = l)}
					>{l.toUpperCase()}</button
				>
			{/each}
		</div>
		<a class="inbox" href={resolve('/admin/berichten')}
			>✉ Berichten{#if data.unread}<span class="badge">{data.unread}</span>{/if}</a
		>
		<a class="inbox" href={resolve('/(site)/[[lang=lang]]', {})} target="_blank" rel="noopener"
			>↗ Website</a
		>
		<form method="POST" action="/admin/logout">
			<button
				type="submit"
				class="ghost"
				onclick={(e) => {
					if (
						ed.draftCount &&
						!confirm(
							'Er zijn niet-gepubliceerde wijzigingen. Toch uitloggen? Ze gaan dan verloren.'
						)
					)
						e.preventDefault();
				}}>Uitloggen</button
			>
		</form>
	</header>

	<aside class="panel">
		<div class="search">
			<input type="search" placeholder="Zoek een tekst of veld…" bind:value={ed.query} />
		</div>
		<div class="sections">
			{#each ed.sections as { group, section, fields }, i (section.id)}
				{#if i === 0 || ed.sections[i - 1].group !== group}<h2 class="group">{group}</h2>{/if}
				{@const open = !!ed.open[section.id] || !!ed.query}
				{@const changed = fields.filter((f) =>
					ed.isDraft(f.key, f.type === 'text' || f.type === 'rich' ? ed.lang : '*')
				).length}
				<section class="sec">
					<button
						type="button"
						class="sec-head"
						aria-expanded={open}
						onclick={() => (ed.open[section.id] = !open)}
					>
						<span>{section.title}</span>
						<span class="count"
							>{#if changed}<span class="changed">●</span>{/if}{fields.length}</span
						>
					</button>
					{#if open}
						<div class="sec-body">
							{#each fields as field (field.key)}<FieldRow {field} />{/each}
						</div>
					{/if}
				</section>
			{:else}
				<p class="empty">Niets gevonden voor “{ed.query}”.</p>
			{/each}
		</div>
		<footer class="savebar">
			<p class="status" class:error={ed.status === 'error'}>{statusText}</p>
			<div class="acts">
				<button
					type="button"
					class="ghost"
					disabled={!ed.draftCount || ed.busy}
					onclick={() => confirm('Alle niet-gepubliceerde wijzigingen weggooien?') && ed.discard()}
					>Verwerpen</button
				>
				<button
					type="button"
					class="primary"
					disabled={!ed.draftCount || ed.busy}
					onclick={() => ed.publish()}>Publiceren</button
				>
			</div>
		</footer>
	</aside>

	<main class="preview">
		<p class="preview-hint">✏️ Klik in de preview op een tekst, knop of foto om die te bewerken.</p>
		<iframe bind:this={ed.frame} src={ed.previewUrl} title="Voorbeeld van de website"></iframe>
	</main>
</div>
