import { command, getRequestEvent, query } from '$app/server';
import { useDirectus } from '$lib/directus/directus';
import { createItem, readItems, readItem } from '@directus/sdk';

export const getNews = query(async () => {
    const { fetch, params } = getRequestEvent();

    const { getDirectus } = useDirectus()
    const directus = getDirectus(fetch)

    if (!params.id) {
        const posts = await directus.request(readItems("feed_news_item", {
            fields: ["*", { comments: ["*"] }],
        }))

        return posts;
    }

    const post = await directus.request(readItem("feed_news_item", params.id, {
        fields: ["*", { comments: ["*"] }],
    }))

    return [post];
});

export const addComment = command("unchecked", async (id: string) => {
    const { fetch } = getRequestEvent();

    const { getDirectus } = useDirectus()
    const directus = getDirectus(fetch)

    const comment = await directus.request(createItem("news_item_comment", {
        news_item: id,
        comments: "Hello, world!"
    }))
    getNews().refresh();
    return comment;
})