import { useDirectus } from '$lib/directus/directus';
import { readItem, updateItem, withToken } from '@directus/sdk';
import { COOKIE_BOT_TOKEN } from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async (event) => {
    const data = await event.request.json();

    const action: "accept" | "reject" = data.action;
    const cookieConsentUUID = event.cookies.get('cookie-consent');

    console.log("Cookie consent UUID", cookieConsentUUID)

    if (!['accept', 'reject'].includes(action)) {
        return new Response('Invalid action', { status: 400 });
    }

    if (!cookieConsentUUID) {
        return new Response('No cookie consent UUID found', { status: 400 });
    }
    const { getDirectus } = useDirectus();
    const directus = getDirectus(event.fetch);

    try {
        const cookieConsent = await directus.request(withToken(COOKIE_BOT_TOKEN, readItem('cookie_consents', cookieConsentUUID, { fields: ['id'] })));
        if (action === 'accept') {
            await directus.request(withToken(COOKIE_BOT_TOKEN, updateItem('cookie_consents', cookieConsent.id, {
                essential_cookies: true,
                analytics_cookies: true,
                marketing_cookies: true,
                last_seen: new Date().toISOString(),
            })));
        }
        else if (action === 'reject') {
            await directus.request(withToken(COOKIE_BOT_TOKEN, updateItem('cookie_consents', cookieConsent.id, {
                essential_cookies: false,
                analytics_cookies: false,
                marketing_cookies: false,
                last_seen: new Date().toISOString(),
            })));
        }
        return new Response('Cookie consent updated', { status: 200 });
    } catch (error) {
        console.error("Error updating cookie consent", error)
        return new Response('No cookie consent UUID found', { status: 400 });
    }


};