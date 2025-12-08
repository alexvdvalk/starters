<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	// @ts-ignore - qrious doesn't have type definitions
	import QRious from 'qrious';

	// Reactive state
	let urlValue = $state('');
	let qr: QRious | null = null;
	let showQR = $derived(true);
	let toastMessage = $state('');
	let showToast = $state(false);

	// Element references
	let qrCanvas = $state<HTMLCanvasElement | null>(null);

	// Initialize QRious when canvas is available
	$effect(() => {
		if (qrCanvas && !qr) {
			qr = new QRious({
				element: qrCanvas,
				size: 200,
				level: 'L' // High error correction
			});
		}
	});

	// Initialize from URL on mount
	onMount(() => {
		// Check for 'target' query parameter
		const target = page.url.searchParams.get('target');
		if (target) {
			urlValue = target;
			generateQR(target);
		}
	});

	const trimmedUrlValue = $derived(urlValue.trim());

	// Reactive statement to update QR when input changes
	$effect(() => {
		generateQR(trimmedUrlValue);
	});

	// Generate QR Logic
	function generateQR(value: string) {
		if (!qr) return;
		qr.value = value;
		showQR = true;
	}

	// Download QR as Image
	function downloadQR() {
		if (!qrCanvas) return;
		const link = document.createElement('a');
		link.download = 'qrcode.png';
		link.href = qrCanvas.toDataURL('image/png');
		link.click();
		displayToast('QR Code downloaded!');
	}

	// Copy a link that pre-fills this QR code
	async function copyGeneratorLink() {
		const currentUrl = window.location.href.split('?')[0];
		const targetValue = encodeURIComponent(urlValue);
		const shareableLink = `${currentUrl}?target=${targetValue}`;

		// Clipboard API fallback for iframes/specific environments
		if (navigator.clipboard && navigator.clipboard.writeText) {
			try {
				await navigator.clipboard.writeText(shareableLink);
				displayToast('Generator link copied to clipboard!');
			} catch {
				fallbackCopy(shareableLink);
			}
		} else {
			fallbackCopy(shareableLink);
		}
	}

	function fallbackCopy(text: string) {
		const tempInput = document.createElement('input');
		tempInput.value = text;
		document.body.appendChild(tempInput);
		tempInput.select();
		document.execCommand('copy');
		document.body.removeChild(tempInput);
		displayToast('Generator link copied to clipboard!');
	}

	// Simple Toast Notification
	function displayToast(message: string) {
		toastMessage = message;
		showToast = true;

		setTimeout(() => {
			showToast = false;
		}, 3000);
	}
</script>

<!-- Main Card -->
<div class="fade-in w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
	<!-- Header -->
	<div class="mb-8 text-center">
		<div
			class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 shadow-lg shadow-blue-200"
		>
			<i class="fas fa-qrcode text-xl text-white"></i>
		</div>
		<h1 class="text-2xl font-bold text-gray-800">QR Generator</h1>
		<p class="mt-1 text-sm text-gray-500">Enter a URL or use the param <code>?target=...</code></p>
	</div>

	<!-- Input Section -->
	<div class="space-y-4">
		<div>
			<label for="urlInput" class="mb-1 block text-sm font-medium text-gray-700"
				>Target Content</label
			>
			<div class="relative">
				<input
					type="text"
					id="urlInput"
					bind:value={urlValue}
					class="block w-full rounded-lg border border-gray-300 py-3 pl-4 pr-10 outline-none transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
					placeholder="https://your-website.com"
				/>
				<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
					<i class="fas fa-link text-gray-400"></i>
				</div>
			</div>
		</div>

		<!-- Canvas Container -->
		{#if showQR}
			<div
				class="mt-6 flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-6"
			>
				<canvas bind:this={qrCanvas} class="rounded-lg shadow-sm"></canvas>
				<p class="mt-3 max-w-full truncate px-4 font-mono text-xs text-gray-400">
					{urlValue}
				</p>
			</div>

			<!-- Action Buttons -->
			<div class="mt-6 grid grid-cols-2 gap-3">
				<button
					onclick={downloadQR}
					class="flex items-center justify-center space-x-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-800"
				>
					<i class="fas fa-download"></i>
					<span>Download</span>
				</button>
				<button
					onclick={copyGeneratorLink}
					class="flex items-center justify-center space-x-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
				>
					<i class="fas fa-share-alt"></i>
					<span>Share Link</span>
				</button>
			</div>
		{/if}
	</div>
</div>

<!-- Toast Notification -->
<div
	class="pointer-events-none fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 transform items-center space-x-2 rounded-full bg-gray-800 px-6 py-3 text-white shadow-lg transition-opacity duration-300"
	class:opacity-0={!showToast}
>
	<i class="fas fa-check-circle text-green-400"></i>
	<span>{toastMessage}</span>
</div>

<!-- Footer -->
<footer class="mt-8 text-center text-xs text-gray-400">
	<p>Generates high-quality QR codes instantly in your browser.</p>
</footer>
