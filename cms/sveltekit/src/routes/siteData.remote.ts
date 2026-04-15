import { query, getRequestEvent } from "$app/server";
import { fetchSiteData } from "$lib/directus/fetchers";

import { env } from '$env/dynamic/public';


export const getSiteData = query(async () => {
    console.log("getting site data")
    const event = getRequestEvent();
    // Enabled by default; set to 'false' to disable
    const visualEditingEnabled =
        event.url.searchParams.get('visual-editing') === 'true' &&
        env.PUBLIC_ENABLE_VISUAL_EDITING !== 'false';
    const { globals, headerNavigation, footerNavigation } = await fetchSiteData();
    const accentColor = globals?.accent_color || '#6644ff';
    return { globals, headerNavigation, footerNavigation, accentColor, visualEditingEnabled };

})