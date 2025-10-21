
import { getRequestEvent, query } from '$app/server';
import { PRIVATE_DIRECTUS_TOKEN } from '$env/static/private';
import { useDirectus } from '$lib/directus/directus';
import { readItems, withToken } from '@directus/sdk';
import { error } from '@sveltejs/kit';
import z from 'zod';

export const getLocations = query(async () => {
    const event = getRequestEvent()
    const directus = useDirectus().getDirectus(event.fetch);
    const locations = await directus.request(withToken(PRIVATE_DIRECTUS_TOKEN, readItems('locations', {
        fields: [
            'id',
            'slug',
            'display_name',
            'seo_slug',
            'seo_description',
            'location_experiences',
        ]
    })))

    return locations;
});

export const getLocationBySlug = query(z.string().min(1), async (locationSlug) => {
    const event = getRequestEvent()
    const directus = useDirectus().getDirectus(event.fetch);
    const locationPages = await directus.request(withToken(PRIVATE_DIRECTUS_TOKEN, readItems('locations', {
        fields: [{ location_experiences: ["*", { experience: ["title", "slug", { experience: ["id", "title", "slug"] }] }] }],
        filter: {

            slug: {
                _eq: locationSlug
            }

        }
    })))
    if (locationPages.length !== 1) {
        error(404, { message: 'Location not found' });
    }
    return locationPages[0];
});


export const getExperienceBySlug = query(z.object({ experienceSlug: z.string().min(1), locationSlug: z.string().min(1) }), async ({ experienceSlug, locationSlug }) => {
    const event = getRequestEvent()
    const directus = useDirectus().getDirectus(event.fetch);
    const experience = await directus.request(withToken(PRIVATE_DIRECTUS_TOKEN, readItems('location_experiences', {
        fields: ["*"],
        filter: {
            experience: {
                slug: {
                    _eq: experienceSlug
                }
            },
            location: {
                slug: {
                    _eq: locationSlug
                }
            }
        }
    })))
    if (experience.length !== 1) {
        error(404, { message: 'Experience not found' });
    }
    return experience[0];
});