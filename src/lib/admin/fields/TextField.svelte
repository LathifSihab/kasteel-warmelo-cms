<script lang="ts">
	import { getEditor } from '../editor.svelte.ts';
	import { emTagOf, isSimple, toHtml, toSimple } from '../format';

	let { key, rich = false }: { key: string; rich?: boolean } = $props();
	const ed = getEditor();

	const html = $derived(ed.get(key, ed.lang));
	// texts with markup beyond line breaks and accents are edited as HTML, so nothing is lost
	const simple = $derived(!html || isSimple(html));
	const shown = $derived(simple ? toSimple(html) : html);
	const multiline = $derived(rich || !simple || shown.length > 70 || shown.includes('\n'));
	const missing = $derived(!html && ed.lang !== 'nl');

	// while typing, keep the field's own text (the HTML round trip would eat spaces)
	let focused = $state(false);
	let text = $state('');
	$effect(() => {
		if (!focused) text = shown;
	});

	function input() {
		const value = simple
			? toHtml(text, emTagOf(ed.original(key, ed.lang) || ed.fallback(key)))
			: text;
		ed.set(key, ed.lang, value);
		ed.liveHtml(key, value || ed.fallback(key));
	}
	function reset() {
		ed.set(key, ed.lang, null);
		ed.liveHtml(key, ed.factory(key, ed.lang) || ed.fallback(key));
	}
	const placeholder = $derived(
		missing ? 'Nog niet vertaald — toont: ' + toSimple(ed.fallback(key)) : ''
	);
</script>

<div class="txt">
	{#if multiline}
		<textarea
			rows={Math.min(8, Math.max(2, Math.ceil(text.length / 55), text.split('\n').length))}
			bind:value={text}
			oninput={input}
			onfocus={() => (focused = true)}
			onblur={() => (focused = false)}
			{placeholder}></textarea>
	{:else}
		<input
			type="text"
			bind:value={text}
			oninput={input}
			onfocus={() => (focused = true)}
			onblur={() => (focused = false)}
			{placeholder}
		/>
	{/if}
	{#if ed.isCustom(key, ed.lang)}
		<button type="button" class="reset" title="Terug naar de originele tekst" onclick={reset}
			>↺</button
		>
	{/if}
</div>
{#if !simple}
	<p class="hint">Deze tekst bevat opmaak en wordt als HTML bewerkt.</p>
{:else if rich || shown.includes('*')}
	<p class="hint">Enter = nieuwe regel · *woord* = accentkleur</p>
{/if}
