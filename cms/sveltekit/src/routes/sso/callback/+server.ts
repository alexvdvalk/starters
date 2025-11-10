import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import axios from 'axios';

export const GET: RequestHandler = async (event) => {
    // console.log(event);
    const code = event.url.searchParams.get('code');
    const state = event.url.searchParams.get('state');


    // console.log(code, state);


    // const response = await axios.get(`http://localhost:8055/auth/login/auth0/callback?code=${code}&state=${state}`,
    //     {
    //         maxRedirects: 0,
    //         validateStatus: (status: number) => {
    //             return status === 302;
    //         }
    //     }
    // )

    console.log(event);

    // // console.log(code, state);
    // return json({
    //     message: 'Hello, world!'
    // });
    return new Response();
};

// http://localhost:8055/auth/login/auth0?redirect=http%3A%2F%2Flocalhost%3A5173%2Fsso
// http://localhost:8055/auth/login/auth0?redirect=http%3A%2F%2Flocalhost%3A5173%2Fsso%2Fcallback

// http://localhost:8055/auth/login/auth0?redirect=https%3A%2F%2F6a1356320f5f.ngrok-free.app%2Fsso


// https://avcloud.directus.app/auth/login/auth0?redirect=http://localhost:5173/sso



// https://av-directus-demo.uk.auth0.com/authorize?client_id=FcJqpvYjWsfGTd2vrsa2YceG232Thl6Q&scope=openid%20profile%20email&response_type=code&state=1&redirect_uri=http://localhost:3000/sso/callback
// & access_type=offline & code_challenge=Z_tt10l4YBm2hrWmil - 8k - heS4IYWtzYa57saSep4 - k & code_challenge_method=S256 & state=Z_tt10l4YBm2hrWmil - 8k - heS4IYWtzYa57saSep4 - k & nonce=Z_tt10l4YBm2hrWmil - 8k - heS4IYWtzYa57saSep4 - k