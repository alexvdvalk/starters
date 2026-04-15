import { query, getRequestEvent } from "$app/server";
import { PUBLIC_ENABLE_VISUAL_EDITING } from "$env/static/public";
import { fetchSiteData } from "$lib/directus/fetchers";

export const getSiteData = query(async () => {
    console.log("getting site data")
    const event = getRequestEvent();
    // Enabled by default; set to 'false' to disable
    const visualEditingEnabled =
        event.url.searchParams.get('visual-editing') === 'true' &&
        PUBLIC_ENABLE_VISUAL_EDITING !== 'false';
    const { globals, headerNavigation, footerNavigation } = await fetchSiteData();
    const accentColor = globals?.accent_color || '#6644ff';
    return { globals, headerNavigation, footerNavigation, accentColor, visualEditingEnabled };

})