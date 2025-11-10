<script lang="ts">
	import { useDirectus } from '$lib/directus/directus';
	import { readItem, readItems, withToken } from '@directus/sdk';

	const { getDirectus } = useDirectus();
	const directus = getDirectus(fetch);
	const { params } = $props();
	const id = $derived(params.id);

	const ships = await directus.request(
		withToken(
			'C7Dr5YTZjo4ySMJF3vTa9hFgo',
			readItems('ships', { fields: ['*'], filter: { country: { _eq: id } } })
		)
	);

	const submarines = await directus.request(
		withToken(
			'C7Dr5YTZjo4ySMJF3vTa9hFgo',
			readItems('submarines', { fields: ['*'], filter: { country: { _eq: id } } })
		)
	);
</script>

<svelte:boundary>
	<h1 class="text-2xl font-bold">Ships</h1>
	<ul>
		{#each ships as ship}
			<li>
				<a href={`/iiss/ship/${ship.id}`}> {ship.name}</a>
			</li>
		{/each}
	</ul>

	<h1 class="text-2xl font-bold">Submarines</h1>
	<ul>
		{#each submarines as submarine}
			<li>
				<a href={`/iiss/submarine/${submarine.id}`}> {submarine.name}</a>
			</li>
		{/each}
	</ul>
</svelte:boundary>
