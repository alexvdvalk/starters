import { getRequestEvent, query } from "$app/server";
import { fetchPageData, fetchPageDataById, getPageIdByPermalink } from "$lib/directus/fetchers";

export const getPageData = query(async () => {
    const { url, fetch } = getRequestEvent();


    const id = url.searchParams.get('id');
    const version = url.searchParams.get('version') ?? "main";
    const preview = url.searchParams.get('preview') === 'true';
    const token = url.searchParams.get('token') || '';

    // Get the page ID by permalink if not provided directly
    let pageId = id;
    if (version && !pageId) {
        const foundPageId = await getPageIdByPermalink(
            url.pathname,
            token || undefined,
            fetch
        );
        pageId = foundPageId || '';
    }
    console.log({ pageId, version, preview, token });


    if (pageId && version) {
        return fetchPageDataById(pageId, version, token || undefined, fetch);
    } else {
        return fetchPageData(url.pathname, 1, fetch, token || undefined, preview);
    }
});