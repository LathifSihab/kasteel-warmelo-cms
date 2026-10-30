<script lang="ts">
	import type { Field } from '#lib/content/fields.ts';
	import { fieldDomId, getEditor } from '../editor.svelte.ts';
	import ButtonField from './ButtonField.svelte';
	import MediaField from './MediaField.svelte';
	import TextField from './TextField.svelte';
	import ToggleField from './ToggleField.svelte';
	import ValueField from './ValueField.svelte';

	let { field }: { field: Field } = $props();
	const ed = getEditor();

	const translated = $derived(field.type === 'text' || field.type === 'rich');
	const changed = $derived(
		ed.isDraft(field.key, translated ? ed.lang : '*') ||
			(field.labelKey ? ed.isDraft(field.labelKey, ed.lang) : false) ||
			(field.type === 'image' ? ed.isDraft('fit:' + field.key.slice(4), '*') : false)
	);
</script>

<div class="field" id={fieldDomId(field.key)} onfocusin={() => ed.show(field.key)}>
	{#if field.type !== 'toggle'}
		<div class="label">
			{field.label}
			{#if translated}<span class="lang">{ed.lang.toUpperCase()}</span>{/if}
			{#if changed}<span class="changed" title="Niet gepubliceerd">●</span>{/if}
		</div>
	{/if}
	{#if translated}
		<TextField key={field.key} rich={field.type === 'rich'} />
	{:else if field.type === 'button'}
		<ButtonField {field} />
	{:else if field.type === 'image' || field.type === 'video'}
		<MediaField {field} />
	{:else if field.type === 'toggle'}
		<ToggleField {field} />
	{:else}
		<ValueField {field} />
	{/if}
</div>
