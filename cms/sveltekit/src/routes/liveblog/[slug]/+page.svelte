<script lang="ts">
	import type { PageProps } from './$types';
	import { getLiveBlog } from './liveblog.remote';
	import Container from '$lib/components/ui/Container.svelte';
	import { getDirectusAssetURL } from '$lib/directus/directus-utils';
	import Text from '$lib/components/ui/Text.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import setAttr from '$lib/directus/visualEditing';
	import { cn } from '$lib/utils';
	import Tagline from '$lib/components/ui/Tagline.svelte';
	import Headline from '$lib/components/ui/Headline.svelte';

	let { params }: PageProps = $props();

	// Use getLiveBlog directly with the slug param
	const liveblog = $derived(await getLiveBlog(params.slug));
</script>

<svelte:boundary>
	<article class="bg-white">
		<!-- Header Section -->
		<div class="border-b border-gray-100 pb-16 pt-12 md:pt-20">
			<Container>
				<div class="mx-auto max-w-4xl space-y-6">
					<!-- Subtitle and LIVE badge -->
					<div class="mb-6 flex items-center gap-4">
						{#if liveblog.subtitle}
							<Badge
								class="rounded-none border-0 bg-blue px-3 py-1 text-sm font-bold uppercase tracking-widest text-white hover:bg-blue/90"
								data-directus={setAttr({
									collection: 'live_blogs',
									item: liveblog.id,
									fields: 'subtitle',
									mode: 'popover'
								})}
							>
								{liveblog.subtitle}
							</Badge>
						{/if}
						<div
							class="flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-3 py-1"
						>
							<span class="relative flex h-2.5 w-2.5">
								<span
									class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"
								></span>
								<span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
							</span>
							<span class="text-xs font-black tracking-widest text-red-600">LIVE</span>
						</div>
					</div>

					<!-- Title -->
					<Headline
						headline={liveblog.main_title}
						as="h1"
						class="!mt-0 font-heading text-h2 leading-tight md:text-h1"
						data-directus={setAttr({
							collection: 'live_blogs',
							item: liveblog.id,
							fields: 'main_title',
							mode: 'popover'
						})}
					/>

					<!-- Summary Items -->
					{#if liveblog.summary && liveblog.summary.length > 0}
						<div
							class="my-10 rounded-r-xl border-l-4 border-accent bg-[#F8FAFC] p-8 shadow-sm"
							data-directus={setAttr({
								collection: 'live_blogs',
								item: liveblog.id,
								fields: 'summary',
								mode: 'drawer'
							})}
						>
							<h2 class="mb-4 text-lg font-bold uppercase tracking-wide text-blue">
								Key developments
							</h2>
							<ul class="space-y-4">
								{#each liveblog.summary as item (item.summary_item)}
									<li class="flex items-start gap-4 font-medium leading-relaxed text-gray-700">
										<span
											class="mt-2.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent shadow-[0_0_8px_rgba(102,68,255,0.4)]"
										></span>
										<span>{item.summary_item}</span>
									</li>
								{/each}
							</ul>
						</div>
					{/if}

					<!-- Author info -->
					<div class="flex items-center gap-4 border-t border-gray-100 pt-4">
						<div class="flex flex-col">
							<span class="text-sm font-bold text-gray-900">Directus Team</span>
							<span class="text-xs font-medium text-gray-500">
								Published {new Date(liveblog.date_created).toLocaleDateString('en-US', {
									month: 'long',
									day: 'numeric',
									year: 'numeric'
								})}
							</span>
						</div>
					</div>
				</div>
			</Container>
		</div>

		{#if liveblog.title_image}
			<div class="w-full overflow-hidden bg-gray-50">
				<img
					src={getDirectusAssetURL(liveblog.title_image)}
					alt={liveblog.main_title}
					class="max-h-[600px] w-full object-cover"
					data-directus={setAttr({
						collection: 'live_blogs',
						item: liveblog.id,
						fields: 'title_image',
						mode: 'popover'
					})}
				/>
			</div>
		{/if}

		<!-- Main Content & Timeline -->
		<div class="bg-[#FAFBFC] py-16 md:py-24">
			<Container>
				<div class="mx-auto max-w-3xl">
					<div class="mb-12 flex items-center gap-4">
						<h2 class="font-heading text-h3 text-blue">Live Feed</h2>
						<div class="h-px flex-grow bg-gray-200"></div>
					</div>

					<div class="relative">
						<!-- Continuous Timeline Line -->
						<div
							class="absolute bottom-0 left-12 top-2 hidden w-px bg-gradient-to-b from-accent via-gray-200 to-gray-100 md:block"
						></div>

						<div class="space-y-16">
							{#if liveblog.live_blog_items && liveblog.live_blog_items.length > 0}
								{#each liveblog.live_blog_items.sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime()) as item (item.id)}
									<div class="group relative gap-12 md:flex">
										<!-- Time marker -->
										<div class="hidden w-24 flex-shrink-0 flex-col items-center pt-1 md:flex">
											<span
												class="mb-2 text-sm font-black tracking-tighter text-blue transition-colors group-hover:text-accent"
											>
												{new Date(item.publish_date).toLocaleTimeString([], {
													hour: '2-digit',
													minute: '2-digit',
													hour12: false
												})}
											</span>
											<div
												class="z-10 h-4 w-4 rounded-full border-2 border-accent bg-white shadow-[0_0_10px_rgba(0,0,0,0.05)] transition-transform duration-300 group-hover:scale-125"
											>
												<div class="m-auto mt-0.5 h-1.5 w-1.5 rounded-full bg-accent"></div>
											</div>
										</div>

										<!-- Content Card -->
										<div
											class="flex-grow rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-300 group-hover:shadow-[0_10px_40px_rgba(0,0,0,0.06)] md:p-8"
										>
											<!-- Mobile Time -->
											<div
												class="mb-4 flex items-center gap-2 text-sm font-bold text-accent md:hidden"
											>
												<span class="h-2 w-2 rounded-full bg-accent"></span>
												{new Date(item.publish_date).toLocaleTimeString([], {
													hour: '2-digit',
													minute: '2-digit',
													hour12: false
												})}
											</div>

											{#if item.title}
												<h3
													class="mb-4 font-heading text-h3 leading-tight transition-colors group-hover:text-blue"
												>
													{item.title}
												</h3>
											{/if}

											{#if item.content}
												<div class="prose-sm max-w-none leading-relaxed text-gray-700 md:prose">
													<Text content={item.content} />
												</div>
											{/if}

											{#if item.image}
												<div class="mt-6 overflow-hidden rounded-xl shadow-sm">
													<img
														src={getDirectusAssetURL(item.image)}
														alt={item.title || ''}
														class="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
													/>
												</div>
											{/if}

											{#if item.author}
												<div class="mt-8 flex items-center gap-3 border-t border-gray-50 pt-6">
													{#if (item.author as any).avatar}
														<img
															src={getDirectusAssetURL((item.author as any).avatar)}
															alt={(item.author as any).first_name}
															class="h-8 w-8 rounded-full object-cover shadow-sm"
														/>
													{:else}
														<div
															class="bg-accent/10 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold uppercase text-accent"
														>
															{(item.author as any).first_name?.[0]}{(item.author as any)
																.last_name?.[0]}
														</div>
													{/if}
													<div class="flex flex-col">
														<span class="text-xs font-bold uppercase tracking-wide text-gray-900">
															{(item.author as any).first_name}
															{(item.author as any).last_name}
														</span>
														<span
															class="text-[10px] font-medium uppercase tracking-widest text-gray-400"
															>Live Reporter</span
														>
													</div>
												</div>
											{/if}
										</div>
									</div>
								{/each}
							{:else}
								<div
									class="rounded-2xl border border-dashed border-gray-200 bg-white p-12 text-center"
								>
									<p class="font-medium italic text-gray-400">Waiting for updates to arrive...</p>
								</div>
							{/if}
						</div>
					</div>
				</div>
			</Container>
		</div>
	</article>

	{#snippet failed(error)}
		<Container class="flex min-h-[50vh] items-center justify-center">
			<div class="space-y-6 text-center">
				<div class="text-6xl">🔍</div>
				<h1 class="font-heading text-h2 text-blue">Live blog not found</h1>
				<p class="mx-auto max-w-md text-gray-500">
					The live blog you're looking for might have been moved or archived.
				</p>
			</div>
		</Container>
	{/snippet}
</svelte:boundary>
