<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import axios from 'axios';
	import type { PageProps } from './$types';
	import { getLoginDetails } from './sso.remote';
	import { goto } from '$app/navigation';

	let { data }: PageProps = $props();

	const f = async () => {
		const response = await fetch('https://avcloud.directus.app/collections', {
			credentials: 'include'
		});
		const data = await response.json();
		console.log(data);
	};

	const login = async () => {
		let response = await getLoginDetails();
		console.log('RESPONSE LOCATION', response);
		window.location.href = response.url;
	};
	// https://avcloud.directus.app
	// const serverURL = 'http://localhost:8055';
	const serverURL = 'https://avcloud.directus.app';
	// http://localhost:5173/sso
	const getMe = async () => {
		const response = await fetch(`${serverURL}/collections`, {
			credentials: 'include'
		});
		const data = await response.json();
		console.log(data);
	};
</script>

<Button onclick={f}>Click me</Button>

<Button onclick={login}>DO Login</Button>

<a href={`${serverURL}/auth/login/auth0?redirect=http://localhost:3000/sso`}>Click me</a>

<div>
	<Button onclick={getMe}>getMe</Button>
</div>
