import {getRequestEvent, query} from '$app/server';
import { useDirectus } from '$lib/directus/directus';
import { readItems } from '@directus/sdk';

export const getProducts = query(async () => {
    const event = getRequestEvent();
    const { getDirectus } = useDirectus();
    const directus = getDirectus(event.fetch);
    const products = await directus.request(readItems('logitech_products', {
        filter: {
            slug: { _eq: event.params.slug }
        },
        fields: [
            '*',
            {
                translations: ['*'],
                retailers: [
                    '*',
                    {
                        logitech_retailers_id: ['*']
                    }
                ],
                gallery: ['*', { directus_files_id: ['*'] }],
                product_type: ['*']
            }
        ],
        limit: 1
    }));

    if (products.length === 0) {
        throw new Error('No products found');
    }

    return products[0];
});