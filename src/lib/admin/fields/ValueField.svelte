<script lang="ts">
	import type { Field } from '#lib/content/fields.ts';
	import { getEditor } from '../editor.svelte.ts';

	let { field }: { field: Field } = $props();
	const ed = getEditor();

	const value = $derived(ed.get(field.key, '*'));
	let focused = $state(false);
	let text = $state('');
	$effect(() => {
		if (!focused) text = value;
	});
</script>

<div class="txt">
	{#if field.type === 'price'}<span class="prefix">€</span>{/if}
	<input
		type={field.type === 'link' ? 'url' : 'text'}
		bind:value={text}
		oninput={() => ed.set(field.key, '*', text.trim(), { reload: true })}
		onfocus={() => (focused = true)}
		onblur={() => (focused = false)}
		placeholder={field.type === 'price' ? '0,00' : field.type === 'link' ? 'https://…' : ''}
	/>
	{#if ed.isCustom(field.key, '*')}
		<button
			type="button"
			class="reset"
			title="Terug naar het origineel"
			onclick={() => ed.set(field.key, '*', null, { reload: true })}>↺</button
		>
	{/if}
</div>
