import { getRequestEvent, query } from '$app/server';
import { DIRECTUS_SERVER_TOKEN } from '$env/static/private';
import { PUBLIC_SITE_URL } from '$env/static/public';
import { getDirectusAssetURL } from '$lib/directus/directus-utils';
import { fetchPostByIdAndVersion, fetchPostBySlug, getPostIdBySlug } from '$lib/directus/fetchers';
import type { DirectusUser } from '@directus/sdk';
import { error } from '@sveltejs/kit';


export const getPost = query("unchecked", async (slug: string) => {
    const event = getRequestEvent()

    const id = event.url.searchParams.get('id') || '';
    let version = event.url.searchParams.get('version') || '' || undefined;
    const preview = event.url.searchParams.get('preview') === 'true';
    const token = preview ? DIRECTUS_SERVER_TOKEN : undefined;

    const isDraft = preview || (!!version && version !== 'published');

    if (!slug) {
        error(404, {
            message: 'Slug is required'
        });
    }

    try {
        let postId = id;
        if (version && !postId) {
            const foundPostId = await getPostIdBySlug(slug, token);
            if (!foundPostId) {
                error(404, {
                    message: 'Post Not found'
                });
            }
            postId = foundPostId;
        }

        let result;
        if (postId && version) {
            result = await fetchPostByIdAndVersion(postId, version, slug, token);
        } else {
            result = await fetchPostBySlug(slug, { draft: isDraft, token });
        }

        const { post, relatedPosts } = result;

        if (!post) {
            error(404, {
                message: 'Post Not found'
            });
        }

        const ogImage = post.image ? getDirectusAssetURL(post.image) : null;
        const author =
            post.author && typeof post.author === 'object' ? (post.author as DirectusUser) : null;

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
    } catch (error) {
        console.error('Error loading blog post:', error);
        throw error;
    }

})

