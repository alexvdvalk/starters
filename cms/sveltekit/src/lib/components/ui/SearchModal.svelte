<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';

	import { Search } from '@lucide/svelte';
	import * as Command from '$lib/components/ui/command/index.js';

	import { resource } from 'runed';

	import Badge from './badge/badge.svelte';
	import { goto } from '$app/navigation';

	let open = $state(false);
	let search = $state('');

	type SearchResult = {
		id: string;
		title: string;
		description: string;
		type: string;
		link: string;
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open = !open;
		}
	};

	const fetchResults = async (search: string): Promise<SearchResult[]> => {
		try {
			const res = await fetch(`/api/search?search=${encodeURIComponent(search)}`);
			if (!res.ok) throw new Error('Failed to fetch results');
			const data: SearchResult[] = await res.json();
			return data.filter((r) => r.link);
		} catch (error) {
			console.error('Error fetching search results:', error);
			return [];
		}
	};

	let searchResource = resource(
		() => search,
		async (search: string) => {
			if (search.length < 3) {
				return { results: [], searched: false };
			}
			const results = await fetchResults(search);
			return { results, searched: true };
		},
		{
			initialValue: { results: [], searched: false },
			lazy: true,
			debounce: 300
		}
	);

	$inspect('SR CURRENT', searchResource.current);

	const handleSelect = (result: SearchResult) => {
		goto(result.link);
		open = false;
	};
</script>

<svelte:document onkeydown={handleKeydown} />

<div class="max-w-full sm:max-w-[540px]">
	<Button variant="ghost" size="icon" aria-label="Search" onclick={() => (open = true)}>
		<Search class="size-5" />
	</Button>

	<Command.Dialog bind:open shouldFilter={false}>
		<Command.Input
			placeholder="Type a command or search..."
			bind:value={search}
			class="m-2 p-4 text-base leading-normal focus:outline-none"
		/>
		<Command.List>
			{#if searchResource.loading}
				<Command.Empty class="py-2 text-center text-sm">Loading...</Command.Empty>
			{/if}

			{#if !searchResource.loading && searchResource.current.searched && searchResource.current.results.length === 0}
				<Command.Empty class="py-2 text-center text-sm">No results found.</Command.Empty>
			{/if}

			{#if searchResource.current.results.length > 0}
				<Command.Group heading="Search Results">
					{#each searchResource.current.results as result}
						<Command.Item
							class="flex items-start gap-4 px-2 py-3"
							onSelect={() => handleSelect(result)}
						>
							<Badge variant="default">{result.type}</Badge>
							<div class="ml-2 w-full">
								<p class="text-base font-medium">{result.title}</p>
								<p class="mt-1 line-clamp-2 text-sm">{result.description}</p>
							</div>
						</Command.Item>
					{/each}
				</Command.Group>
			{/if}
		</Command.List>
	</Command.Dialog>
</div>
