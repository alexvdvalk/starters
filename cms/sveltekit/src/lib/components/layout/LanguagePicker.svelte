<script lang="ts">
	import { page } from '$app/state';
	import * as Select from '$lib/components/ui/select/index.js';

	const languages = $state([
		{ label: 'English', value: 'en' },
		{ label: 'German', value: 'de' }
	]);

	let value = $state('en');

	const triggerContent = $derived(languages.find((f) => f.value === value)?.label);
</script>

<div class="flex flex-row gap-2">
	{#each languages as language}
		<a href={`${page.url.pathname}?locale=${language.value}`}>{language.label}</a>
	{/each}
</div>
