import {ApiRequest, ApiStrategyType} from '@/ApiRequest';

const api = ApiRequest(ApiStrategyType.Fetch);

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById('registerForm') as HTMLFormElement;
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(registerForm);
            const name = formData.get('name');
            const username = formData.get('username');
            const email = formData.get('email');
            const password = formData.get('password');
            try {
                const response = await api.login('/admin/register', {name, username, email, password});
                console.log('Registro realizado com sucesso:', response);
            } catch (error) {
                console.error('Erro no registro:', error);
            }
        });
    }
});