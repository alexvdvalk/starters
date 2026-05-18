import { query } from '$app/server';
import { useDirectus } from '$lib/directus/directus';
import { readItems } from '@directus/sdk';
import { z } from 'zod';



export const getLiveBlog = query(z.string(), async (slug: string) => {

    const { getDirectus } = useDirectus();
    const directus = getDirectus();
    try {


        const liveblogs = await directus.request(readItems('live_blogs', {
            filter: {
                slug: {
                    _eq: slug
                }
            }, fields: ["*", { live_blog_items: ["*", { author: ["*"] }] }]
        }));


        return liveblogs?.[0] || null;
    } catch (error) {
        console.error('Error in getLiveBlog:', error);
        throw error;
    }

});