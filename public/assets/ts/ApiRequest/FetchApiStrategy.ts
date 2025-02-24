import { ApiRequestStrategy, RequestOptions } from './ApiRequestStrategy';
import Swal from 'sweetalert2';

export class FetchApiStrategy extends ApiRequestStrategy {
    async get(url: string, options?: RequestOptions): Promise<any> {
        const headers = new Headers(this.getHeaders(options?.headers, options?.auth !== false));
        const response = await fetch(url, { method: 'GET', headers });
        return this.handleResponse(response);
    }

    async post(url: string, data: any, options?: RequestOptions): Promise<any> {
        let headersObj = this.getHeaders(options?.headers, options?.auth !== false);
        let body: any;
        if (options?.isMultipart && data instanceof FormData) {
            body = data;
            // Não define Content-Type para FormData
        } else {
            headersObj['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        }
        const headers = new Headers(headersObj);
        const response = await fetch(url, { method: 'POST', headers, body });
        return this.handleResponse(response);
    }

    async put(url: string, data: any, options?: RequestOptions): Promise<any> {
        let headersObj = this.getHeaders(options?.headers, options?.auth !== false);
        let body: any;
        if (options?.isMultipart && data instanceof FormData) {
            body = data;
        } else {
            headersObj['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        }
        const headers = new Headers(headersObj);
        const response = await fetch(url, { method: 'PUT', headers, body });
        return this.handleResponse(response);
    }

    async patch(url: string, data: any, options?: RequestOptions): Promise<any> {
        let headersObj = this.getHeaders(options?.headers, options?.auth !== false);
        let body: any;
        if (options?.isMultipart && data instanceof FormData) {
            body = data;
        } else {
            headersObj['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        }
        const headers = new Headers(headersObj);
        const response = await fetch(url, { method: 'PATCH', headers, body });
        return this.handleResponse(response);
    }

    async delete(url: string, options?: RequestOptions): Promise<any> {
        const headers = new Headers(this.getHeaders(options?.headers, options?.auth !== false));
        const response = await fetch(url, { method: 'DELETE', headers });
        return this.handleResponse(response);
    }

    async login(url: string, credentials: any, options?: RequestOptions): Promise<any> {
        const headers = new Headers(options?.headers || { 'Content-Type': 'application/json' });
        const response = await fetch(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(credentials)
        });
        const data = await response.json();
        const { token, refreshToken } = data;
        this.setAuthToken(token);
        this.setRefreshToken(refreshToken);
        return data;
    }

    protected async refreshTokenRequest(): Promise<any> {
        const refreshEndpoint = '/api/refresh-token';
        if (!this.refreshTokenValue) {
            return Promise.reject(new Error("No refresh token available"));
        }
        const headers = new Headers(this.getHeaders(undefined, false));
        const response = await fetch(refreshEndpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify({ refreshToken: this.refreshTokenValue })
        });
        const data = await response.json();
        if (response.ok) {
            const { token, refreshToken } = data;
            this.setAuthToken(token);
            this.setRefreshToken(refreshToken);
            return token;
        } else {
            await Swal.fire({
                title: 'Sessão expirada',
                text: 'Por favor, faça login novamente.',
                icon: 'warning'
            });
            return Promise.reject(new Error("Authentication required"));
        }
    }

    // Método auxiliar para tratar a resposta e disparar refresh se necessário
    private async handleResponse(response: Response): Promise<any> {
        if (response.status === 401) {
            try {
                await this.refreshTokenRequest();
                // Aqui não reexecutamos automaticamente a requisição; a aplicação pode optar por repetir a chamada
                return Promise.reject(new Error("Token refreshed, please retry the request."));
            } catch (error) {
                return Promise.reject(error);
            }
        }
        const data = await response.json();
        if (!response.ok) {
            return Promise.reject(data);
        }
        return data;
    }
}
