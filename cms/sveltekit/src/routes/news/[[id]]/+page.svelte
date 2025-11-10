<script lang="ts">
	import DirectusImage from '$lib/components/shared/DirectusImage.svelte';
	import { Button } from '$lib/components/ui/button';
	import { addComment, getNews } from './news.remote';

	const posts = getNews();

	const add = async (id: string) => {
		await addComment(id).updates(posts);
		// posts.refresh();
	};
</script>

<div class="container mx-auto my-2 flex flex-col gap-6">
	{#each posts.current ?? [] as post}
		<div class="flex w-full flex-col gap-6 rounded-xl border p-6 md:mx-auto md:w-2/3">
			<p>{@html post.content}</p>
			<DirectusImage uuid={post.image as string} alt={'News image'} />
			<div class="flex flex-row justify-end gap-2">
				<Button variant="outline" onclick={() => add(post.id)}>
					<span class="text-sm">+ {post.comments?.length ?? 0}</span>
				</Button>
			</div>
		</div>
	{/each}
</div>
