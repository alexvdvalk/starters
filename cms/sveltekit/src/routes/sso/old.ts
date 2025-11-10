import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {
    // console.log(event);
    const cookies = event.cookies;
    const directus_session_token = cookies.get('directus_session_token');
    console.log(directus_session_token);
    return new Response();
};

// http://localhost:8055/auth/login/auth0?redirect=http%3A%2F%2Flocalhost%3A5173%2Fsso
// http://localhost:8055/auth/login/auth0?redirect=https%3A%2F%2F6a1356320f5f.ngrok-free.app%2Fsso