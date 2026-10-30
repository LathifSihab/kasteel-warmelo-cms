<script lang="ts">
	import type { Field } from '#lib/content/fields.ts';
	import { getEditor } from '../editor.svelte.ts';

	let { field }: { field: Field } = $props();
	const ed = getEditor();
</script>

<label class="check">
	<input
		type="checkbox"
		checked={ed.get(field.key, '*') === 'true'}
		onchange={(e) =>
			ed.set(field.key, '*', e.currentTarget.checked ? 'true' : null, { reload: true })}
	/>
	{field.label}
</label>
