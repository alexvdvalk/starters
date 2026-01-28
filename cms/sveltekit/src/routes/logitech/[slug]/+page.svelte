<script lang="ts">
	import type { PageProps } from './$types';
	import { getProducts } from './products.remote';
	import DirectusImage from '$lib/components/shared/DirectusImage.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import Headline from '$lib/components/ui/Headline.svelte';
	import Text from '$lib/components/ui/Text.svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import type { LogitechProduct, LogitechProductsGallery } from '$lib/types/directus-schema';

	let { data }: PageProps = $props();

	const productsQuery = getProducts();
	const product = $derived(productsQuery.current);

    $inspect(product);
	// Get the first translation's description (or you could filter by language)
	const description = $derived.by(() => {
		if (!product || !product.translations || product.translations.length === 0) return "";
		const translation = Array.isArray(product.translations) 
			? product.translations[0] 
			: null;
		return translation?.description || null;
	});

	// Get gallery images
	const galleryImages = $derived.by(() => {
		if (!product || !product.gallery) return [];
		return product.gallery as LogitechProductsGallery[];
	});

	// Get retailers
	const retailers = $derived.by(() => {
		if (!product || !product.retailers) return [];
		return  product.retailers;
	});
</script>

<svelte:head>
	<title>{product?.name || 'Product'}</title>
	<meta name="description" content={description || product?.name || ''} />
</svelte:head>

<Container class="py-12">
	<svelte:boundary>
		{#if product}
			<!-- Product Header -->
			<div class="mb-8">
				{#if product.cover_image}
					<div class="relative mb-8 h-[500px] w-full overflow-hidden rounded-lg">
						<DirectusImage
							uuid={product.cover_image}
							alt={product.name || 'Product cover image'}
							class="object-cover"
							fill
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
						/>
					</div>
				{/if}

				<div class="mb-6">
					{#if product.product_type}
						<p class="mb-2 text-sm font-semibold uppercase text-accent">
							{typeof product.product_type === 'object' 
								? product.product_type.name 
								: product.product_type}
						</p>
					{/if}
					<Headline as="h1" headline={product.name} class="mb-4" />
					{#if description}
						<div class="prose dark:prose-invert max-w-none">
							<Text content={description} />
						</div>
					{/if}
				</div>
			</div>

			<Separator class="mb-8" />

			<!-- Product Details Grid -->
			<div class="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,_2fr)_400px]">
				<main class="space-y-8">
					<!-- Gallery -->
					{#if galleryImages.length > 0}
						<div>
							<h2 class="mb-4 text-2xl font-bold">Gallery</h2>
							<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
								{#each galleryImages as galleryItem}
									{#if galleryItem.directus_files_id}
										<div class="relative h-[300px] w-full overflow-hidden rounded-lg">
											<DirectusImage
												uuid={galleryItem.directus_files_id}
												alt={product.name || 'Gallery image'}
												class="object-cover"
												fill
												sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
											/>
										</div>
									{/if}
								{/each}
							</div>
						</div>
					{/if}
				</main>

				<aside class="h-fit space-y-6 rounded-lg bg-background-muted p-6">
					<!-- Product Links -->
					<div class="space-y-4">
						<h3 class="text-lg font-bold">Resources</h3>
						{#if product.help_documentation_url}
							<a
								href={product.help_documentation_url}
								target="_blank"
								rel="noopener noreferrer"
								class="block text-accent hover:underline"
							>
								Help Documentation →
							</a>
						{/if}
						{#if product.drivers_url}
							<a
								href={product.drivers_url}
								target="_blank"
								rel="noopener noreferrer"
								class="block text-accent hover:underline"
							>
								Download Drivers →
							</a>
						{/if}
					</div>

					<!-- Retailers -->
					{#if retailers.length > 0}
						<div>
							<Separator class="my-4" />
							<h3 class="mb-4 text-lg font-bold">Where to Buy</h3>
							<div class="space-y-3">
								{#each retailers as retailer}
									{#if typeof retailer === 'object' && retailer.logitech_retailers_id}
										{#if typeof retailer.logitech_retailers_id === 'object'}
											<a
												href={retailer.logitech_retailers_id.website || '#'}
												target="_blank"
												rel="noopener noreferrer"
												class="flex items-center gap-3 text-accent hover:underline"
											>
												{#if retailer.logitech_retailers_id.logo}
													<DirectusImage
														uuid={retailer.logitech_retailers_id.logo}
														alt={retailer.logitech_retailers_id.name || 'Retailer logo'}
														width={40}
														height={40}
														class="object-contain"
													/>
												{/if}
												<span>{retailer.logitech_retailers_id.name}</span>
											</a>
										{/if}
									{/if}
								{/each}
							</div>
						</div>
					{/if}

					<!-- Product Info -->
					<div>
						<Separator class="my-4" />
						<div class="space-y-2 text-sm">
							{#if product.status}
								<p>
									<span class="font-semibold">Status:</span> {product.status}
								</p>
							{/if}
							{#if product.slug}
								<p>
									<span class="font-semibold">Slug:</span> {product.slug}
								</p>
							{/if}
						</div>
					</div>
				</aside>
			</div>
		{:else}
			<div class="flex flex-col items-center justify-center py-12">
				<h1 class="mb-4 text-2xl font-bold">Product Not Found</h1>
				<p class="text-muted-foreground">The product you're looking for doesn't exist.</p>
			</div>
		{/if}

		{#snippet failed(error)}
			<div class="flex flex-col items-center justify-center py-12">
				<h1 class="mb-4 text-2xl font-bold">Error</h1>
				<p class="text-muted-foreground">Failed to load product: {error}</p>
			</div>
		{/snippet}
	</svelte:boundary>
</Container>