<script lang="ts">
	import type { PageProps } from './$types';
	import { getLocationBySlug } from '../locations.remote';

	let { params }: PageProps = $props();

	const locationSlug = $derived(params.locationSlug);
	const location = $derived(await getLocationBySlug(locationSlug));
</script>

{#each location.location_experiences as experience}
	<a href={`/locations/${locationSlug}/${experience?.experience?.slug || ''}`}
		>{experience?.title || ''}</a
	>
{/each}

<pre>{JSON.stringify(location.location_experiences, null, 2)}</pre>
