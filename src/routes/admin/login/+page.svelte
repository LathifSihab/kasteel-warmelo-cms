<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();
	let busy = $state(false);
</script>

<svelte:head><title>Inloggen — Kasteel Warmelo</title></svelte:head>

<div class="login">
	<form
		method="POST"
		use:enhance={() => {
			busy = true;
			return async ({ update }) => {
				await update();
				busy = false;
			};
		}}
	>
		<img src="/assets/images/wapenschild-t.webp" alt="" width="56" />
		<h1>Website beheer</h1>
		<p>Kasteel Warmelo</p>
		{#if !data.configured}
			<p class="error">De beheerder moet ADMIN_PASSWORD en SESSION_SECRET nog instellen.</p>
		{/if}
		<!-- svelte-ignore a11y_autofocus -->
		<input
			type="password"
			name="password"
			placeholder="Wachtwoord"
			autocomplete="current-password"
			required
			autofocus
		/>
		{#if form?.error}<p class="error">{form.error}</p>{/if}
		<button type="submit" class="primary" disabled={busy}>{busy ? 'Bezig…' : 'Inloggen'}</button>
	</form>
</div>
