<script lang="ts">
	import type { Field } from '#lib/content/fields.ts';
	import { LANGS, PAGES, parseLegacyHref } from '#lib/site/pages.ts';
	import { seasonActive, todayInNL } from '#lib/site/season.ts';
	import type { ButtonSettings } from '#lib/site/site.ts';
	import { getEditor } from '../editor.svelte.ts';
	import LinkTarget from './LinkTarget.svelte';
	import TextField from './TextField.svelte';

	let { field }: { field: Field } = $props();
	const ed = getEditor();

	const settings = $derived.by((): ButtonSettings => {
		try {
			return JSON.parse(ed.get(field.key, '*') || '{}');
		} catch {
			return {};
		}
	});
	const alt = $derived(settings.alt ?? {});
	const defaultName = $derived(
		PAGES.find((p) => p.id === parseLegacyHref(field.default ?? '')?.page)?.name ?? field.default
	);

	function update(patch: Partial<ButtonSettings>) {
		const next = { ...settings, ...patch };
		const empty = !next.href && !next.hidden && !next.alt?.on;
		ed.set(field.key, '*', empty ? null : JSON.stringify(next), { reload: true });
	}
	const updateAlt = (patch: Partial<NonNullable<ButtonSettings['alt']>>) =>
		update({ alt: { repeat: true, ...alt, ...patch } });

	const reversed = $derived(!alt.repeat && !!alt.from && !!alt.to && alt.from > alt.to);
	const activeToday = $derived(seasonActive(alt, todayInNL()));
</script>

<div class="card">
	<span class="sub">Knoptekst ({ed.lang.toUpperCase()})</span>
	<TextField key={field.labelKey!} />

	<span class="sub">Gaat naar</span>
	<LinkTarget
		value={settings.href ?? ''}
		defaultLabel={'Standaard — ' + defaultName}
		onchange={(href) => update({ href })}
	/>

	<label class="check"
		><input
			type="checkbox"
			checked={!!settings.hidden}
			onchange={(e) => update({ hidden: e.currentTarget.checked })}
		/> Verbergen</label
	>

	{#if field.seasonal}
		<label class="check"
			><input
				type="checkbox"
				checked={!!alt.on}
				onchange={(e) => updateAlt({ on: e.currentTarget.checked })}
			/> Seizoensversie</label
		>
		{#if alt.on}
			<div class="alt">
				<div class="row2">
					<label
						><span class="sub">Van</span><input
							type="date"
							value={alt.from ?? ''}
							onchange={(e) => updateAlt({ from: e.currentTarget.value })}
						/></label
					>
					<label
						><span class="sub">Tot en met</span><input
							type="date"
							value={alt.to ?? ''}
							onchange={(e) => updateAlt({ to: e.currentTarget.value })}
						/></label
					>
				</div>
				<label class="check"
					><input
						type="checkbox"
						checked={alt.repeat !== false}
						onchange={(e) => updateAlt({ repeat: e.currentTarget.checked })}
					/> Elk jaar herhalen (alleen dag en maand tellen)</label
				>
				<p class="hint">Zonder datums staat de seizoensversie direct en doorlopend aan.</p>
				<span class="sub">Gaat naar (seizoen)</span>
				<LinkTarget
					value={alt.href ?? ''}
					defaultLabel="Zelfde als hierboven"
					onchange={(href) => updateAlt({ href })}
				/>
				<div class="row3">
					{#each LANGS as l (l)}
						<label>
							<span class="sub">Tekst {l.toUpperCase()}</span>
							<input
								type="text"
								value={alt.label?.[l] ?? ''}
								oninput={(e) => updateAlt({ label: { ...alt.label, [l]: e.currentTarget.value } })}
							/>
						</label>
					{/each}
				</div>
				<p class="hint">Leeg = de gewone knoptekst blijft staan in die taal.</p>
				<p class="status" class:on={activeToday}>
					{reversed
						? '⚠ De einddatum ligt vóór de startdatum.'
						: activeToday
							? '● Vandaag actief op de website'
							: '○ Vandaag niet actief'}
				</p>
			</div>
		{/if}
	{/if}
</div>
