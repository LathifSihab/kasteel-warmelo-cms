<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const when = (s: string) =>
		new Date(s).toLocaleString('nl-NL', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
</script>

<svelte:head><title>Berichten — Kasteel Warmelo</title></svelte:head>

<div class="page">
	<header class="page-head">
		<a href={resolve('/admin')}>← Terug naar de editor</a>
		<h1>Berichten</h1>
		<p>Ingestuurd via het contactformulier op de website.</p>
	</header>

	{#each data.messages as m (m.id)}
		<article class="msg" class:unread={!m.read_at}>
			<header>
				<strong>{m.name}</strong>
				<a
					href="mailto:{m.email}?subject={encodeURIComponent('Re: ' + (m.subject || 'uw bericht'))}"
					>{m.email}</a
				>
				{#if m.phone}<span>{m.phone}</span>{/if}
				<time datetime={m.created_at}>{when(m.created_at)}</time>
			</header>
			{#if m.subject}<p class="subject">{m.subject}</p>{/if}
			<p class="body">{m.message}</p>
			<div class="acts">
				<form method="POST" action={m.read_at ? '?/unread' : '?/read'} use:enhance>
					<input type="hidden" name="id" value={m.id} />
					<button type="submit" class="ghost"
						>{m.read_at ? 'Markeer als ongelezen' : 'Markeer als gelezen'}</button
					>
				</form>
				<form
					method="POST"
					action="?/delete"
					use:enhance={({ cancel }) => {
						if (!confirm('Dit bericht verwijderen?')) cancel();
					}}
				>
					<input type="hidden" name="id" value={m.id} />
					<button type="submit" class="ghost danger">Verwijderen</button>
				</form>
			</div>
		</article>
	{:else}
		<p class="empty">Nog geen berichten.</p>
	{/each}
</div>
