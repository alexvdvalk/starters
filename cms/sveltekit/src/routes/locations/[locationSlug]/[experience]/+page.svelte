<script lang="ts">
	import { getExperienceBySlug } from '../../locations.remote';
	import type { PageProps } from './$types';

	let { params }: PageProps = $props();

	const locationSlug = $derived(params.locationSlug);
	const experienceSlug = $derived(params.experience);

	const experience = $derived(await getExperienceBySlug({ experienceSlug, locationSlug }));
</script>

<h1>{experience.title}</h1>
<p>{experience.description || ''}</p>

<pre>{JSON.stringify(experience, null, 2)}</pre>
