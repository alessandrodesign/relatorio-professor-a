import {ApiRequest, ApiStrategyType} from '@/ApiRequest';

const api = ApiRequest(ApiStrategyType.Fetch);

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById('loginForm') as HTMLFormElement;
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(loginForm);
            const login = formData.get('login');
            const password = formData.get('password');
            try {
                const response = await api.login('/auth/login', {login, password});
                window.location.href = '/' + response.authorized;
            } catch (error) {
                alert('Erro no login:' + error);
            }
        });
    }
});