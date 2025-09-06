import { getRequestEvent, query } from '$app/server';
import { PUBLIC_SITE_URL } from '$env/static/public';
import { getDirectusAssetURL } from '$lib/directus/directus-utils';
import { fetchAuthorById, fetchPostBySlug, fetchRelatedPosts } from '$lib/directus/fetchers';
import { error } from '@sveltejs/kit';


export const getPostBySlug = query("unchecked", async ({ slug, language, draft }: { slug: string, language: string, draft: boolean }) => {
    const event = getRequestEvent();

    // const draft = event.url.searchParams.get('draft') === 'true' && event.url.searchParams.get('token') === DRAFT_MODE_SECRET;
    // const language = event.url.searchParams.get('locale');
    // const slug = event.params.slug;

    console.log("got language parameter", { slug, language, draft })


    if (!slug) {
        return error(404, "not found")
    }
    const post = await fetchPostBySlug(slug, { draft, language: language as "en-US" | "de-DE" }, event.fetch);

    if (!post) {
        error(404, {
            message: 'Post Not found'
        });
    }

    // TODO optimize this to run in parallel
    const ogImage = post.image ? getDirectusAssetURL(post.image) : null;

    const [relatedPosts, author] = await Promise.all([
        fetchRelatedPosts(post.id, event.fetch),
        post.author ? fetchAuthorById(post.author as string, event.fetch) : null
    ]);

    return {
        post,
        author,
        relatedPosts,
        title: post?.seo?.title ?? post.title ?? '',
        description: post?.seo?.meta_description ?? '',
        openGraph: {
            title: post?.seo?.title ?? post.title ?? '',
            description: post?.seo?.meta_description ?? '',
            url: `${PUBLIC_SITE_URL}/blog/${slug}`,
            type: 'article',
            images: ogImage ? [{ url: ogImage }] : undefined
        }
    };


});