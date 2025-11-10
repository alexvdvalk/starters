<script lang="ts">
	import { useDirectus } from '$lib/directus/directus';
	import { readItems, withToken } from '@directus/sdk';

	const { getDirectus } = useDirectus();
	const directus = getDirectus(fetch);

	const countries = await directus.request(
		withToken('C7Dr5YTZjo4ySMJF3vTa9hFgo', readItems('country', { fields: ['name', 'id'] }))
	);

	$inspect(countries);
</script>

<svelte:boundary>
	<h1>Countries</h1>
	<ul>
		{#each countries as country}
			<li>
				<a href={`/iiss/country/${country.id}`}> {country.name}</a>
			</li>
		{/each}
	</ul>
</svelte:boundary>
