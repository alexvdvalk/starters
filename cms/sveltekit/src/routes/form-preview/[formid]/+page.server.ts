import { useDirectus } from '$lib/directus/directus';
import { readItem } from '@directus/sdk';
import type { PageServerLoad } from '../$types';

export const load = (async ({ fetch, params }) => {
    const { formid } = params as { formid: string };
    const { getDirectus } = useDirectus();

    const directus = getDirectus(fetch);
    const form = await directus.request(readItem('forms', formid, {
        fields: [
            'id',
            'title',
            'submit_label',
            'success_message',
            'on_success',
            'success_redirect_url',
            'is_active',
            {
                fields: [
                    'id',
                    'name',
                    'type',
                    'label',
                    'placeholder',
                    'help',
                    'validation',
                    'width',
                    'choices',
                    'required',
                    'sort'
                ]
            }
        ]
    }));
    return { form };
}) satisfies PageServerLoad;