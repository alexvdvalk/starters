import { getRequestEvent, query } from "$app/server";
import { PRIVATE_DIRECTUS_TOKEN } from "$env/static/private";
import { useDirectus } from "$lib/directus/directus";
import { withToken, readItems } from "@directus/sdk";
import { error } from "@sveltejs/kit";
import z from "zod";

export const getLocationBySlug = query(z.string().min(1), async (locationSlug) => {
    const event = getRequestEvent()
    const directus = useDirectus().getDirectus(event.fetch);
    console.log(locationSlug)
    const location = await directus.request(withToken(PRIVATE_DIRECTUS_TOKEN, readItems('locations', {
        fields: [
            '*',
            {
                location_map_file: ["*"]
            },
            {
                location_experiences: [
                    '*',
                    {
                        experience: [
                            '*',
                            {
                                experience: ['*']
                            }
                        ]
                    }
                ]
            }
        ],
        filter: {
            slug: {
                _eq: locationSlug
            }
        }
    })))
    console.log(location)
    if (location.length !== 1) {
        error(404, { message: 'Location not found' });
    }
    return location[0];
})