<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { cookieResponse } from './cookies.remote';
	import { Button } from './ui/button';
	let open = $state(false);

	if (!page.data.cookieConsent.essential_cookies) {
		open = true;
	}

	const updateCookieConsent = async (action: 'accept' | 'reject') => {
		await cookieResponse(action);
		invalidateAll();
		open = false;
	};
</script>

<Drawer.Root bind:open dismissible={false}>
	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title>We value your privacy</Drawer.Title>
			<Drawer.Description>
				<div class="flex flex-col justify-between gap-2 md:flex-row">
					<p>
						We use cookies to enhance your browsing experience, serve personalised ads or content,
						and analyse our traffic. By clicking "Accept All", you consent to our use of cookies.
					</p>
					<div class="flex flex-row justify-center gap-2 md:justify-start">
						<Button variant="outline" onclick={() => updateCookieConsent('accept')}
							>Accept All</Button
						>
						<Button variant="outline" onclick={() => updateCookieConsent('reject')}
							>Reject All</Button
						>
						<!-- <Button>Customise</Button> -->
					</div>
				</div>
			</Drawer.Description>
		</Drawer.Header>
		<!-- <Drawer.Footer>
			<Button>Submit</Button>
			<Drawer.Close>Cancel</Drawer.Close>
		</Drawer.Footer> -->
	</Drawer.Content>
</Drawer.Root>
