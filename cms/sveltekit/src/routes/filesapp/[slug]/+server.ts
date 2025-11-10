import { useDirectus } from '$lib/directus/directus';
import { readAssetRaw, readFiles } from '@directus/sdk';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, fetch }) => {
    const { slug } = params;
    const { getDirectus } = useDirectus();
    const directus = getDirectus(fetch);
    const files = await directus.request(readFiles({ fields: ['id'], filter: { slug: { _eq: slug } } }));
    const file = files[0];
    const rawFile = await directus.request(readAssetRaw(file.id));
    return new Response(rawFile);
};