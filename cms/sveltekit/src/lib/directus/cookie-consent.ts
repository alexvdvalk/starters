import { createItem, readItem, updateItem, withToken } from '@directus/sdk';
import { useDirectus } from './directus';
import type { RequestEvent } from '@sveltejs/kit';
import { COOKIE_BOT_TOKEN } from '$env/static/private';


export const fetchCookieConsent = async (event: RequestEvent) => {
    const { getDirectus } = useDirectus();
    const directus = getDirectus(event.fetch);


    const cookieConsentUUID = event.cookies.get('cookie-consent');
    console.log("Found cookie consent UUID", cookieConsentUUID)
    // check if consent exists
    try {
        if (!cookieConsentUUID) {
            throw new Error('No cookie consent UUID found');
            // Must be a brand new user, so we need to create a new cookie consent
        }
        const cookieConsent = await directus.request(withToken(COOKIE_BOT_TOKEN, readItem('cookie_consents', cookieConsentUUID)));
        await directus.request(withToken(COOKIE_BOT_TOKEN, updateItem('cookie_consents', cookieConsent.id, {
            last_seen: new Date().toISOString(),
        })));
        console.log("Found cookie consent", cookieConsent)
        return cookieConsent;
    } catch {
        // No cookie found, or invalid cookie found with no matchin UUID in the DB
        // So create a new one and return it
        const cookieConsent = await directus.request(withToken(COOKIE_BOT_TOKEN, createItem('cookie_consents', {
            ip_address: event.getClientAddress(),
            user_agent: event.request.headers.get('user-agent'),
            last_seen: new Date().toISOString(),
        })));
        event.cookies.set('cookie-consent', cookieConsent.id, {
            path: '/',
            maxAge: 60 * 60 * 24 * 365
        });
        console.log("Created new cookie consent", cookieConsent)
        return cookieConsent;
    }

};

