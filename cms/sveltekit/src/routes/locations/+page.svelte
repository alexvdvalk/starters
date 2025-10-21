<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { getLocations } from './locations.remote';
</script>

<h1 class="text-2xl font-bold">Locations</h1>
<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
	<ul>
		{#each await getLocations() as location}
			<li>
				<a href={`/locations/${location.slug}`}
					>{location.display_name} - {location.location_experiences?.length} experiences</a
				>
			</li>
		{/each}
	</ul>
</div>
