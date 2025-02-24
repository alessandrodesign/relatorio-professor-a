import $ from 'jquery';
import Swal from 'sweetalert2';
import { ApiRequestStrategy, RequestOptions } from './ApiRequestStrategy';

export class JqueryApiStrategy extends ApiRequestStrategy {
    async get(url: string, options?: RequestOptions): Promise<any> {
        const headers = this.getHeaders(options?.headers, options?.auth !== false);
        return $.ajax({ url, method: 'GET', headers });
    }

    async post(url: string, data: any, options?: RequestOptions): Promise<any> {
        const headers = this.getHeaders(options?.headers, options?.auth !== false);
        if (options?.isMultipart) {
            return $.ajax({
                url,
                method: 'POST',
                data,
                headers,
                processData: false,
                contentType: false
            });
        }
        return $.ajax({ url, method: 'POST', data, headers });
    }

    async put(url: string, data: any, options?: RequestOptions): Promise<any> {
        const headers = this.getHeaders(options?.headers, options?.auth !== false);
        if (options?.isMultipart) {
            return $.ajax({
                url,
                method: 'PUT',
                data,
                headers,
                processData: false,
                contentType: false
            });
        }
        return $.ajax({ url, method: 'PUT', data, headers });
    }

    async patch(url: string, data: any, options?: RequestOptions): Promise<any> {
        const headers = this.getHeaders(options?.headers, options?.auth !== false);
        if (options?.isMultipart) {
            return $.ajax({
                url,
                method: 'PATCH',
                data,
                headers,
                processData: false,
                contentType: false
            });
        }
        return $.ajax({ url, method: 'PATCH', data, headers });
    }

    async delete(url: string, options?: RequestOptions): Promise<any> {
        const headers = this.getHeaders(options?.headers, options?.auth !== false);
        return $.ajax({ url, method: 'DELETE', headers });
    }

    async login(url: string, credentials: any, options?: RequestOptions): Promise<any> {
        const response = await $.ajax({
            url,
            method: 'POST',
            data: credentials,
            headers: options?.headers,
        });
        const { token, refreshToken } = response;
        this.setAuthToken(token);
        this.setRefreshToken(refreshToken);
        return response;
    }

    protected async refreshTokenRequest(): Promise<any> {
        const refreshEndpoint = '/api/refresh-token';
        if (!this.refreshTokenValue) {
            return Promise.reject(new Error("No refresh token available"));
        }
        try {
            const response = await $.ajax({
                url: refreshEndpoint,
                method: 'POST',
                data: { refreshToken: this.refreshTokenValue },
                headers: this.getHeaders(undefined, false)
            });
            const { token, refreshToken } = response;
            this.setAuthToken(token);
            this.setRefreshToken(refreshToken);
            return token;
        } catch (error) {
            Swal.fire({
                title: 'Sessão expirada',
                text: 'Por favor, faça login novamente.',
                icon: 'warning'
            });
            return Promise.reject(error);
        }
    }
}
