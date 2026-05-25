<script lang="ts">
	import type { PageProps } from './$types';
	import { getProduct } from './products.remote';
	import DirectusImage from '$lib/components/shared/DirectusImage.svelte';
	import Container from '$lib/components/ui/Container.svelte';
	import Headline from '$lib/components/ui/Headline.svelte';
	import BaseText from '$lib/components/ui/Text.svelte';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import type { Product } from '$lib/types/directus-schema';

	let { params }: PageProps = $props();

	const products = $derived(await getProduct(params.slug));
	const product = $derived(products[0] as Product | undefined);

	function formatPrice(
		value: string | number | null | undefined,
		currency: Product['currency'] = 'USD'
	) {
		if (value == null || value === '') return null;
		const amount = typeof value === 'string' ? parseFloat(value) : value;
		if (Number.isNaN(amount)) return null;
		return new Intl.NumberFormat(undefined, {
			style: 'currency',
			currency: currency ?? 'USD'
		}).format(amount);
	}

	const price = $derived(formatPrice(product?.price, product?.currency ?? 'USD'));
	const compareAtPrice = $derived(
		formatPrice(product?.compare_at_price, product?.currency ?? 'USD')
	);
	const onSale = $derived(
		product?.compare_at_price != null &&
			product?.price != null &&
			parseFloat(String(product.compare_at_price)) > parseFloat(String(product.price))
	);
	const inStock = $derived(
		(product?.stock_quantity ?? 0) > 0 || product?.allow_backorder === true
	);
</script>

<svelte:head>
	<title>{product?.title ?? 'Product'}</title>
	{#if product?.short_description}
		<meta name="description" content={product.short_description} />
	{/if}
</svelte:head>

<Container class="py-12">
	{#if !product}
		<div class="py-24 text-center">
			<Headline as="h1" headline="Product not found" class="mb-4" />
			<p class="text-muted-foreground">We couldn't find a product with this URL.</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
			<div class="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
				{#if product.image}
					<DirectusImage
						uuid={product.image as string}
						alt={product.title}
						class="object-cover"
						fill
						sizes="(max-width: 1024px) 100vw, 50vw"
					/>
				{:else}
					<div class="flex h-full items-center justify-center text-muted-foreground">
						No image available
					</div>
				{/if}
			</div>

			<div class="flex flex-col">
				{#if product.featured}
					<Badge class="mb-4 w-fit">Featured</Badge>
				{/if}

				<Headline as="h1" headline={product.title} class="mb-2" />

				{#if product.sku}
					<p class="mb-4 text-sm text-muted-foreground">SKU: {product.sku}</p>
				{/if}

				{#if product.short_description}
					<p class="mb-6 text-lg text-muted-foreground">{product.short_description}</p>
				{/if}

				<div class="mb-6 flex flex-wrap items-baseline gap-3">
					{#if price}
						<span class="text-3xl font-semibold">{price}</span>
					{/if}
					{#if onSale && compareAtPrice}
						<span class="text-lg text-muted-foreground line-through">{compareAtPrice}</span>
						<Badge variant="secondary">Sale</Badge>
					{/if}
				</div>

				<p class="mb-8 text-sm {inStock ? 'text-green-600 dark:text-green-400' : 'text-destructive'}">
					{#if inStock}
						{(product.stock_quantity ?? 0) > 0
							? `${product.stock_quantity} in stock`
							: 'Available (backorder)'}
					{:else}
						Out of stock
					{/if}
				</p>

				<Separator class="mb-8" />

				{#if product.description}
					<div>
						<h2 class="mb-4 font-heading text-xl">Description</h2>
						<BaseText content={product.description} />
					</div>
				{/if}
			</div>
		</div>
	{/if}
</Container>
