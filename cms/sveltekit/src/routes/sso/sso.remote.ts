import { query } from "$app/server";
import axios from "axios";


export const getLoginDetails = query(async () => {
    const response = await axios.get(`http://localhost:8055/auth/login/auth0`, {
        maxRedirects: 0,
        validateStatus: (status: number) => {
            return status === 302;
        }
    });
    console.log(response);
    const loc = new URL(response.headers.location);
    loc.searchParams.set('redirect_uri', 'http://localhost:3000/sso/callback');
    const url = loc.href

    return {
        url
    };
});