import type { PageServerLoad } from './$types';

export const load = (async (event) => {
    console.log(event);
    // const token = e.cookies.get('directus_session_token')
    // console.log(token)
    // if (token) {
    //     e.cookies.set('avToken', token, {
    //         path: '/',
    //     })
    // }
    return {};
}) satisfies PageServerLoad;