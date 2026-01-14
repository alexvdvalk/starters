import { getRequestEvent, query } from "$app/server";
import { fetchPageData, fetchPageDataById, getPageIdByPermalink } from "$lib/directus/fetchers";
import z from "zod";


export const getPageData = query(z.string(), async (permalink: string) => {
    const { url, fetch } = getRequestEvent();
    if (permalink.startsWith('/.well-known')) {
        return null;
    }
    const id = url.searchParams.get('id');
    const version = url.searchParams.get('version') ?? "main";
    const preview = url.searchParams.get('preview') === 'true';
    const token = url.searchParams.get('token') || '';


    // Get the page ID by permalink if not provided directly
    let pageId = id;
    if (version && !pageId) {
        const foundPageId = await getPageIdByPermalink(
            permalink,
            token || undefined,
            fetch
        );
        pageId = foundPageId || '';
    }
    console.log({ pageId, version, preview, token, permalink });


    if (pageId && version) {
        return fetchPageDataById(pageId, version, token || undefined, fetch);
    } else {
        return fetchPageData(permalink, 1, fetch, token || undefined, preview);
    }
});