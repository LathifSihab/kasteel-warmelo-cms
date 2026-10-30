<script lang="ts">
	import type { Field } from '#lib/content/fields.ts';
	import type { ImageFit } from '#lib/site/site.ts';
	import { errorMessage, getEditor } from '../editor.svelte.ts';

	let { field }: { field: Field } = $props();
	const ed = getEditor();

	const isImage = $derived(field.type === 'image');
	const src = $derived(ed.get(field.key, '*'));
	const fitKey = $derived('fit:' + field.key.slice(4));
	const fit = $derived.by((): ImageFit => {
		try {
			return JSON.parse(ed.get(fitKey, '*') || '{}');
		} catch {
			return {};
		}
	});
	const [fx, fy] = $derived((fit.pos ?? '50% 50%').split(' ').map((v) => parseFloat(v)));
	// presets plus whatever the image uses now (e.g. the original clamp(…) height)
	const heights = $derived([
		...new Set(['240px', '320px', '440px', '580px', ...(fit.height ? [fit.height] : [])])
	]);

	let uploading = $state(false);
	let error = $state('');

	async function upload(e: Event & { currentTarget: HTMLInputElement }) {
		const file = e.currentTarget.files?.[0];
		e.currentTarget.value = '';
		if (!file) return;
		uploading = true;
		error = '';
		const body = new FormData();
		body.set('file', file);
		const res = await fetch('/admin/api/upload', { method: 'POST', body });
		uploading = false;
		if (!res.ok) {
			error = await errorMessage(res, 'Uploaden mislukt');
			return;
		}
		const { url } = (await res.json()) as { url: string };
		ed.set(field.key, '*', url, { reload: true });
	}

	function setFit(patch: Partial<ImageFit>) {
		const next = { ...fit, ...patch };
		const empty = !next.pos && (!next.scale || next.scale <= 1.01) && !next.height;
		ed.set(fitKey, '*', empty ? null : JSON.stringify(next), { reload: true });
	}
	function pickFocus(e: MouseEvent & { currentTarget: HTMLElement }) {
		const r = e.currentTarget.getBoundingClientRect();
		const pct = (v: number) => Math.max(0, Math.min(100, v)).toFixed(1) + '%';
		setFit({
			pos: `${pct(((e.clientX - r.left) / r.width) * 100)} ${pct(((e.clientY - r.top) / r.height) * 100)}`
		});
	}
</script>

<div class="card">
	{#if isImage}
		<button
			type="button"
			class="thumb"
			title="Klik om het belangrijkste punt van de foto te kiezen"
			onclick={pickFocus}
		>
			<img {src} alt="" style:object-position={fit.pos} />
			{#if fit.pos && !isNaN(fx) && !isNaN(fy)}<span
					class="dot"
					style:left="{fx}%"
					style:top="{fy}%"
				></span>{/if}
		</button>
	{:else}
		<p class="hint">Huidig: {src.split('/').pop()}</p>
	{/if}

	<div class="acts">
		<label class="btn" class:disabled={!ed.storage || uploading}>
			{uploading ? 'Bezig met uploaden…' : isImage ? '📁 Foto wisselen' : '📁 Video wisselen'}
			<input
				type="file"
				accept={isImage
					? 'image/jpeg,image/png,image/webp,image/avif,image/gif'
					: 'video/mp4,video/webm'}
				disabled={!ed.storage || uploading}
				onchange={upload}
				hidden
			/>
		</label>
		{#if ed.isCustom(field.key, '*')}
			<button
				type="button"
				class="btn ghost"
				onclick={() => ed.set(field.key, '*', null, { reload: true })}>↺ Origineel</button
			>
		{/if}
	</div>
	{#if !ed.storage}<p class="hint">
			Uploaden kan zodra de opslag (Neon Object Storage) is ingesteld.
		</p>{/if}
	{#if error}<p class="error">{error}</p>{/if}

	{#if isImage}
		<div class="row2">
			<label>
				<span class="sub">Zoom {Math.round((fit.scale ?? 1) * 100)}%</span>
				<input
					type="range"
					min="1"
					max="2"
					step="0.05"
					value={fit.scale ?? 1}
					onchange={(e) => setFit({ scale: +e.currentTarget.value })}
				/>
			</label>
			<label>
				<span class="sub">Hoogte</span>
				<select
					value={fit.height ?? ''}
					onchange={(e) => setFit({ height: e.currentTarget.value || undefined })}
				>
					<option value="">Automatisch</option>
					{#each heights as h (h)}<option value={h}
							>{h.startsWith('clamp') ? 'Origineel (meeschalend)' : h}</option
						>{/each}
				</select>
			</label>
		</div>
		<p class="hint">
			Klik op de foto om het belangrijkste punt te kiezen. Hoogte geldt voor fotogalerijen.
		</p>
		{#if ed.isCustom(fitKey, '*')}
			<button type="button" class="link" onclick={() => ed.set(fitKey, '*', null, { reload: true })}
				>Bijsnijden herstellen</button
			>
		{/if}
	{/if}
</div>
