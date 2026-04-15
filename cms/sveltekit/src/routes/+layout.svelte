<script lang="ts">
	import '../globals.css';
	import '../fonts.css';
	import NavigationBar from '$lib/components/layout/NavigationBar.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import { getDirectusAssetURL } from '$lib/directus/directus-utils';
	import { PUBLIC_DIRECTUS_URL } from '$env/static/public';
	import { afterNavigate, invalidateAll } from '$app/navigation';
	import { enableVisualEditing } from '$lib/directus/visualEditing';
	import { apply } from '@directus/visual-editing';
	import { getSiteData } from './siteData.remote';

	let { children } = $props();

	const siteData = $derived(await getSiteData());

	const globals = $derived(siteData?.globals);

	const siteTitle = $derived(globals?.title || 'Simple CMS');
	const siteDescription = $derived(
		globals?.description || 'A starter CMS template powered by Svelte and Directus.'
	);
	const faviconURL = $derived(
		globals?.favicon ? getDirectusAssetURL(globals.favicon) : '/favicon.ico'
	);
	const accentColor = $derived(globals?.accent_color || '#6644ff');

	enableVisualEditing();

	afterNavigate(async () => {
		// First apply: all [data-directus] elements get overlays
		await apply({
			directusUrl: PUBLIC_DIRECTUS_URL,
			onSaved: async () => {
				// await invalidateAll();
			}
		});
		// Second apply: add customClass to the Edit All Blocks overlay so the hide rule can target it
		const editButton = document.querySelector('#visual-editing-button');
		if (editButton) {
			await apply({
				directusUrl: PUBLIC_DIRECTUS_URL,
				elements: editButton as HTMLElement,
				customClass: 'visual-editing-button-class',
				onSaved: async () => {
					await invalidateAll();
				}
			});
		}
	});
</script>

<svelte:head>
	<title>{siteTitle}</title>
	<meta name="description" content={siteDescription} />
	<link rel="icon" href={faviconURL} />
	{@html `<style>:root{ --accent-color: ${accentColor} !important }</style>`}
</svelte:head>

<ModeWatcher />
<NavigationBar />
<main class="flex-grow">{@render children()}</main>
<Footer />
