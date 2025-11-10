import { command, getRequestEvent } from "$app/server";
import { COOKIE_BOT_TOKEN } from "$env/static/private";
import { useDirectus } from "$lib/directus/directus";
import { readItem, updateItem, withToken } from "@directus/sdk";

export const cookieResponse = command("unchecked", async (action: "accept" | "reject") => {
    const { fetch, cookies } = getRequestEvent();

    const cookieConsentUUID = cookies.get('cookie-consent');

    if (!cookieConsentUUID) {
        return new Response('No cookie consent UUID found', { status: 400 });
    }
    const { getDirectus } = useDirectus();
    const directus = getDirectus(fetch);
    const cookieConsent = await directus.request(withToken(COOKIE_BOT_TOKEN, readItem('cookie_consents', cookieConsentUUID, { fields: ['id'] })));

    const response = await directus.request(withToken(COOKIE_BOT_TOKEN, updateItem('cookie_consents', cookieConsent.id, {
        essential_cookies: action === "accept" ? true : false,
        analytics_cookies: action === "accept" ? true : false,
        marketing_cookies: action === "accept" ? true : false,
        last_seen: new Date().toISOString(),
    })));
});