import { query } from '$app/server';
import { useDirectus } from '$lib/directus/directus';
import { readItems } from '@directus/sdk';
import { z } from 'zod';

export const getProduct = query(z.string(), async (slug: string) => {
    const { getDirectus } = useDirectus();
    const directus = getDirectus();

    try {
        return await directus.request(
            readItems('products', {
                filter: {
                    slug: {
                        _eq: slug
                    }
                },
                fields: ['*'],
                limit: 1
            })
        );
    } catch (error) {
        console.error('Error in getProduct:', error);
        return [];
    }
});