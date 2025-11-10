import { fetchPageData } from '$lib/directus/fetchers';
import type { PageServerLoad } from './$types';
import { getRequestEvent } from '$app/server';

export const load = (async (event) => {

	const sss = getRequestEvent();
	console.log({ SSS: sss });
	const data = await fetchPageData(event.url.pathname, 1, event.fetch);
	return data;
}) satisfies PageServerLoad;
