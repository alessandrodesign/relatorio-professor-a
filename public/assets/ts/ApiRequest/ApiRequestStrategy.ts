import {CookieService} from "./CookieService";

export interface RequestOptions {
    headers?: Record<string, string>;
    auth?: boolean;       // true por padrão; se false, não adiciona o Authorization
    isMultipart?: boolean; // se true, indica que será enviado FormData para upload
}

// Classe abstrata pai da Strategy
export abstract class ApiRequestStrategy {
    protected token: string | null = null;
    protected refreshTokenValue: string | null = null;
    protected cookieService: CookieService;

    constructor() {
        this.cookieService = new CookieService();
    }

    // Define o token e, opcionalmente, registra em cookie
    public setAuthToken(token: string): void {
        this.cookieService.clearAllCookies();

        this.token = token;

        this.cookieService.setCookie('token', token);
    }

    private loadToken(): void {
        this.token = this.cookieService.getCookie('token');
    }

    public getAuthToken(): string | null {
        const meta = document.querySelector('meta[name="auth-token"]');
        return meta ? meta.getAttribute('content') : null;
    }

    // Define o refresh token
    public setRefreshToken(refreshToken: string): void {
        this.refreshTokenValue = refreshToken;
    }

    // Monta os headers: junta headers customizados e, se auth=true e token existir, adiciona o Bearer
    protected getHeaders(customHeaders?: Record<string, string>, auth: boolean = true): Record<string, string> {
        const headers: Record<string, string> = {...(customHeaders || {})};

        this.loadToken();

        if (auth && this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        headers['X-Requested-With'] = 'XMLHttpRequest';
        return headers;
    }

    // Métodos abstratos para serem implementados pelas strategies
    abstract get(url: string, options?: RequestOptions): Promise<any>;

    abstract post(url: string, data: any, options?: RequestOptions): Promise<any>;

    abstract put(url: string, data: any, options?: RequestOptions): Promise<any>;

    abstract patch(url: string, data: any, options?: RequestOptions): Promise<any>;

    abstract delete(url: string, options?: RequestOptions): Promise<any>;

    abstract login(url: string, credentials: any, options?: RequestOptions): Promise<any>;

    // Cada strategy deve implementar sua lógica de refresh token
    protected abstract refreshTokenRequest(): Promise<any>;
}
