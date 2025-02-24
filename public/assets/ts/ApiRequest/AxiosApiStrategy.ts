import axios from 'axios';

import Swal from 'sweetalert2';
import {ApiRequestStrategy, RequestOptions} from './ApiRequestStrategy';

export class AxiosApiStrategy extends ApiRequestStrategy {
    private axiosInstance: Axios.AxiosInstance;

    constructor() {
        super();
        this.axiosInstance = axios.create({});

        // Interceptador de requisições: insere o token se disponível
        this.axiosInstance.interceptors.request.use((config: any) => {
            if (config.headers && this.token) {
                config.headers['Authorization'] = `Bearer ${this.token}`;
            }
            return config;
        }, (error: any) => Promise.reject(error));

        // Interceptador de respostas: se retornar 401, tenta atualizar o token
        this.axiosInstance.interceptors.response.use(
            (response: any) => response,
            async (error: any) => {
                if (error.response && error.response.status === 401) {
                    try {
                        await this.refreshTokenRequest();
                        // Reexecuta a requisição com o novo token
                        error.config.headers['Authorization'] = `Bearer ${this.token}`;
                        return this.axiosInstance.request(error.config);
                    } catch (refreshError) {
                        Swal.fire({
                            title: 'Sessão expirada',
                            text: 'Por favor, faça login novamente.',
                            icon: 'warning'
                        });
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    async get(url: string, options?: RequestOptions): Promise<any> {
        const config: any = {
            headers: this.getHeaders(options?.headers, options?.auth !== false)
        };
        return this.axiosInstance.get(url, config);
    }

    async post(url: string, data: any, options?: RequestOptions): Promise<any> {
        let headers = this.getHeaders(options?.headers, options?.auth !== false);
        if (options?.isMultipart) {
            headers['Content-Type'] = 'multipart/form-data';
        }
        const config: any = {headers};
        return this.axiosInstance.post(url, data, config);
    }

    async put(url: string, data: any, options?: RequestOptions): Promise<any> {
        let headers = this.getHeaders(options?.headers, options?.auth !== false);
        if (options?.isMultipart) {
            headers['Content-Type'] = 'multipart/form-data';
        }
        const config: any = {headers};
        return this.axiosInstance.put(url, data, config);
    }

    async patch(url: string, data: any, options?: RequestOptions): Promise<any> {
        let headers = this.getHeaders(options?.headers, options?.auth !== false);
        if (options?.isMultipart) {
            headers['Content-Type'] = 'multipart/form-data';
        }
        const config: any = {headers};
        return this.axiosInstance.patch(url, data, config);
    }

    async delete(url: string, options?: RequestOptions): Promise<any> {
        const config: any = {
            headers: this.getHeaders(options?.headers, options?.auth !== false)
        };
        return this.axiosInstance.delete(url, config);
    }

    async login(url: string, credentials: any, options?: RequestOptions): Promise<any> {
        const response = await this.axiosInstance.post(url, credentials, {
            headers: options?.headers,
        });
        const {token, refreshToken} = response.data as { token: string, refreshToken: string };
        this.setAuthToken(token);
        this.setRefreshToken(refreshToken);
        return response.data;
    }

    protected async refreshTokenRequest(): Promise<any> {
        const refreshEndpoint = '/api/refresh-token'; // ajuste conforme sua API
        if (!this.refreshTokenValue) {
            return Promise.reject(new Error("No refresh token available"));
        }
        try {
            const response = await this.axiosInstance.post(refreshEndpoint, {refreshToken: this.refreshTokenValue}, {
                headers: this.getHeaders(undefined, false)
            });
            const {token, refreshToken} = response.data as { token: string, refreshToken: string };
            this.setAuthToken(token);
            this.setRefreshToken(refreshToken);
            return token;
        } catch (error) {
            return Promise.reject(error);
        }
    }
}
