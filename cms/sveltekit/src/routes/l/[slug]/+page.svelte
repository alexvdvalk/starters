<script lang="ts">
	import type { PageProps } from './$types';
	import { getLocationBySlug } from './l.remote';
	import DirectusImage from '$lib/components/shared/DirectusImage.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import Headline from '$lib/components/ui/Headline.svelte';
	import Tagline from '$lib/components/ui/Tagline.svelte';
	import BaseText from '$lib/components/ui/Text.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Card, CardContent, CardTitle } from '$lib/components/ui/card';
	import { Calendar, Star, ExternalLink } from '@lucide/svelte';
	import { PUBLIC_DIRECTUS_URL } from '$env/static/public';

	let { params }: PageProps = $props();

	const locationSlug = $derived(params.slug);
	const location = $derived(await getLocationBySlug(locationSlug));

	// Extract location name from display_name or slug
	const locationName = $derived(location.display_name || location.slug || 'Location');
</script>

<svelte:head>
	<title>{locationName} - Karls Erlebnis-Dorf</title>
	<meta name="description" content={location.seo_description || `Besuchen Sie ${locationName}`} />
</svelte:head>

<!-- Hero Section -->
<!-- <section class="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
	{#if location.location_map_file && typeof location.location_map_file !== 'string'}
		<div class="absolute inset-0">
			<DirectusImage
				uuid={location.location_map_file.id}
				alt={locationName}
				class="h-full w-full object-cover"
			/>
			<div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
		</div>
	{:else}
		<div class="from-primary/80 to-primary absolute inset-0 bg-gradient-to-br"></div>
	{/if}
	<div class="relative z-10 flex h-full items-end pb-12">
		<Container class="w-full">
			<div class="text-foreground max-w-3xl">
				<Tagline tagline="Karls Erlebnis-Dorf" class="text-foreground" />
				<Headline headline={locationName} as="h1" class="text-foreground mb-4" />
				{#if location.seo_description}
					<p class="text-foreground text-xl md:text-2xl">{location.seo_description}</p>
				{/if}
			</div>
		</Container>
	</div>
</section> -->

<!-- Quick Info Bar -->
<!-- {#if location.rating_info || location.price_info}
	<section class="border-b bg-white py-4">
		<Container>
			<div class="flex flex-wrap items-center gap-6 text-sm">
				{#if location.rating_info}
					<div class="flex items-center gap-2">
						<Star class="h-4 w-4 text-yellow-500" />
						<span>{location.rating_info}</span>
					</div>
				{/if}
				{#if location.price_info}
					<div class="flex items-center gap-2">
						<span class="font-semibold">Preise:</span>
						<span>{location.price_info}</span>
					</div>
				{/if}
			</div>
		</Container>
	</section>
{/if} -->

<!-- Info Cards Grid -->
<!-- {#if location.opening_info || location.arrival_info || location.price_info}

	<section class="bg-white py-20">
		<Container>
			<div class="mb-12 text-center">
				<Tagline tagline="Besucherinformationen" />
				<Headline headline="Planen Sie Ihren Besuch" as="h5" class="mt-4" />
			</div>

			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#if location.opening_info}
					<Card
						class="border-foreground/30 hover:border-primary/70 border-4 shadow-md transition-all hover:shadow-lg"
					>
						<CardHeader>
							<div
								class="bg-primary/10 mb-4 flex h-14 w-14 items-center justify-center rounded-full"
							>
								<Clock class="text-primary h-7 w-7" />
							</div>
							<CardTitle class="text-xl">Öffnungszeiten</CardTitle>
						</CardHeader>
						<CardContent>
							<BaseText content={location.opening_info} class="prose-sm" />
						</CardContent>
					</Card>
				{/if}

				{#if location.price_info}
					<Card
						class="border-foreground/30 hover:border-primary/70 border-4 shadow-md transition-all hover:shadow-lg"
					>
						<CardHeader>
							<div
								class="bg-primary/10 mb-4 flex h-14 w-14 items-center justify-center rounded-full"
							>
								<Calendar class="text-primary h-7 w-7" />
							</div>
							<CardTitle class="text-xl">Preise & Tickets</CardTitle>
						</CardHeader>
						<CardContent>
							<BaseText content={location.price_info} class="prose-sm" />
						</CardContent>
					</Card>
				{/if}

				{#if location.rating_info}
					<Card
						class="border-foreground/30 hover:border-primary/70 border-4 shadow-md transition-all hover:shadow-lg"
					>
						<CardHeader>
							<div
								class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-100"
							>
								<Star class="h-7 w-7 fill-yellow-600 text-yellow-600" />
							</div>
							<CardTitle class="text-xl">Bewertungen</CardTitle>
						</CardHeader>
						<CardContent>
							<BaseText content={location.rating_info} class="prose-sm" />
						</CardContent>
					</Card>
				{/if}
			</div>
		</Container>
	</section>
{/if} -->

<section>
	<Container>
		<video
			class="rounded"
			src={`${PUBLIC_DIRECTUS_URL}assets/${location.hero_asset}`}
			autoplay
			muted
			loop
		></video>
	</Container>
</section>

<!-- Experiences Section -->
{#if location.location_experiences && location.location_experiences.length > 0}
	<section class="bg-gradient-to-b from-white to-gray-50 py-20">
		<Container>
			<div class="mb-16 text-center">
				<Tagline tagline="Erleben & Entdecken" />
				<Headline headline="Unsere Attraktionen" as="h2" class="mt-4" />
				<p class="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
					Entdecken Sie die vielfältigen Erlebnisse und Attraktionen an unserem Standort
				</p>
			</div>

			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each location.location_experiences as locationExperience, index}
					{#if typeof locationExperience !== 'string' && locationExperience.experience && typeof locationExperience.experience !== 'string'}
						{@const subExperience = locationExperience.experience}
						{@const parentExperience =
							typeof subExperience.experience !== 'string' ? subExperience.experience : null}
						{@const cardTitle =
							locationExperience.title || subExperience.title || subExperience.slug || 'Erlebnis'}
						{@const imageUrl =
							subExperience && typeof (subExperience as any).cover_image === 'string'
								? `${PUBLIC_DIRECTUS_URL}assets/${(subExperience as any).cover_image}`
								: subExperience &&
									  typeof (subExperience as any).cover_image === 'object' &&
									  (subExperience as any).cover_image
									? (subExperience as any).cover_image
									: null}

						<Card
							class="border-foreground/30 hover:border-primary/70 group relative h-[400px] overflow-hidden border-4 shadow-md transition-all hover:shadow-xl"
						>
							<!-- Background Image -->
							{#if imageUrl}
								<div class="absolute inset-0">
									{#if typeof imageUrl === 'string'}
										<img src={imageUrl} alt={cardTitle} class="h-full w-full object-cover" />
									{:else}
										<DirectusImage
											uuid={imageUrl}
											alt={cardTitle}
											class="h-full w-full object-cover"
										/>
									{/if}
								</div>
							{:else}
								<div class="from-primary/20 to-primary/40 absolute inset-0 bg-gradient-to-br"></div>
							{/if}

							<!-- Fixed Background Overlay at Bottom -->
							<div class="absolute inset-x-0 bottom-0 bg-black px-6 py-6">
								<CardTitle
									class="text-center text-2xl font-bold uppercase tracking-wide text-white"
								>
									{cardTitle}
								</CardTitle>
								{#if locationExperience.description}
									<p class="mt-2 text-center text-sm text-white/90">
										{@html locationExperience.description}
									</p>
								{:else if parentExperience?.title}
									<p class="mt-2 text-center text-sm text-white/90">
										{parentExperience.title}
									</p>
								{/if}
							</div>
						</Card>
					{/if}
				{/each}
			</div>
		</Container>
	</section>
{/if}

<!-- Arrival Details Section -->
{#if location.arrival_info && !location.price_info && !location.opening_info}
	<section class="bg-gray-50 py-16">
		<Container>
			<div class="mx-auto max-w-3xl">
				<div class="mb-8 text-center">
					<Tagline tagline="Anreise" />
					<Headline headline="So erreichen Sie uns" as="h2" class="mt-4" />
				</div>
				<Card class="border-foreground/30 border-4 shadow-md">
					<CardContent class="p-8">
						<BaseText content={location.arrival_info} />
					</CardContent>
				</Card>
			</div>
		</Container>
	</section>
{/if}

<!-- Location Map Display -->
{#if location.location_map}
	<section class="bg-gray-50 py-16">
		<Container>
			<div class="mb-8 text-center">
				<Tagline tagline="Karte" />
				<Headline headline="Unser Standort" as="h2" class="mt-4" />
			</div>
			<div class="overflow-hidden rounded-lg shadow-lg">
				<BaseText content={location.location_map} />
			</div>
		</Container>
	</section>
{/if}

<!-- CTA Section -->
<section
	class="from-primary to-primary/80 text-foreground relative overflow-hidden bg-gradient-to-r py-20"
>
	<!-- Decorative elements -->
	<div class="absolute inset-0 opacity-10">
		<div class="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white"></div>
		<div class="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-white"></div>
	</div>

	<Container class="relative z-10">
		<div class="text-center">
			<div
				class="mb-6 inline-flex items-center justify-center gap-2 rounded-full bg-white/20 px-6 py-2 backdrop-blur-sm"
			>
				<Star class="fill-foreground h-5 w-5" />
				<span class="text-foreground font-semibold">Einzigartige Erlebnisse warten auf Sie</span>
			</div>
			<Headline headline="Besuchen Sie uns!" as="h2" class="text-foreground mb-6" />
			<p class="text-foreground mx-auto mb-10 max-w-2xl text-xl">
				Erleben Sie einen unvergesslichen Tag voller Spaß, Abenteuer und kulinarischer Genüsse bei
				Karls {locationName}
			</p>
			<div class="flex flex-wrap justify-center gap-4">
				<Button
					variant="secondary"
					size="lg"
					class="h-14 px-8 text-base font-semibold shadow-lg hover:shadow-xl"
				>
					<Calendar class="mr-2 h-5 w-5" />
					Jetzt Tickets buchen
				</Button>
				<Button
					variant="outline"
					size="lg"
					class="border-foreground text-foreground hover:bg-foreground hover:text-background h-14 border-2 bg-transparent px-8 text-base font-semibold shadow-lg"
				>
					<ExternalLink class="mr-2 h-5 w-5" />
					Mehr erfahren
				</Button>
			</div>
		</div>
	</Container>
</section>

<!-- <pre>{JSON.stringify(location, null, 2)}</pre> -->

<!-- Debug (remove in production) -->
<!-- <Container class="py-8">
	<details class="rounded border p-4">
		<summary class="cursor-pointer font-semibold">Debug: Location Data</summary>
		<pre class="mt-4 overflow-auto text-xs">{JSON.stringify(location, null, 2)}</pre>
	</details>
</Container> -->
