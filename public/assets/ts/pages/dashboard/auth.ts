import {ApiRequest, ApiStrategyType} from '@/ApiRequest';
import {CookieService} from "@/ApiRequest/CookieService";

const api = ApiRequest(ApiStrategyType.Fetch);

interface userInterface {
    name: string;
    email: string;
    username: string;
}

async function userData(): Promise<userInterface | null> {
    try {
        return await api.get('/auth/user', {auth: true});
    } catch (error: any) {
        const errorMsg = error && error.message ? error.message : JSON.stringify(error);
        window.location.href = '/?error=' + encodeURIComponent(errorMsg);
        return null;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const token: string | null = api.getAuthToken();
    if (!token) {
        const user: userInterface | null = await userData();
        if (user) {
            const cookieService = new CookieService();
            cookieService.setCookie('name', user.name);
            cookieService.setCookie('email', user.email);
            cookieService.setCookie('username', user.username);
            window.location.reload();
        }
    }
});
