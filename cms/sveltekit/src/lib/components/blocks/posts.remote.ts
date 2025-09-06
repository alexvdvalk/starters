

import { query } from '$app/server';
import { fetchPaginatedPosts, fetchTotalPostCount } from '$lib/directus/fetchers';

export const getPostsPaginated = query('unchecked', async ({ perPage, currentPage }: { perPage: number, currentPage: number }) => {
    return await fetchPaginatedPosts(perPage, currentPage);
});

export const getTotalPostCount = query(async () => {
    return await fetchTotalPostCount();
});