/**
 * Serviço para manipulação de cookies.
 *
 * Esta classe fornece métodos para definir, obter e limpar cookies.
 */
export class CookieService {
    /**
     * Limpa um cookie específico.
     *
     * @param {string} name - O nome do cookie a ser limpo.
     * @param {string} [path='/'] - O caminho do cookie (opcional, padrão é '/').
     */
    public clearCookie(name: string, path: string = '/'): void {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path}`;
    }

    /**
     * Limpa todos os cookies existentes.
     *
     * @param {string} [path='/'] - O caminho dos cookies (opcional, padrão é '/').
     */
    public clearAllCookies(path: string = '/'): void {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            const equalSignIndex = cookie.indexOf('=');
            const cookieName = equalSignIndex > -1 ? cookie.substring(0, equalSignIndex) : cookie;
            this.clearCookie(cookieName, path);
        }
    }

    /**
     * Obtém o valor de um cookie específico.
     *
     * @param {string} name - O nome do cookie.
     * @returns {string | null} - O valor do cookie, ou null se o cookie não existir.
     */
    public getCookie(name: string): string | null {
        const cookieString = document.cookie;
        if (!cookieString) {
            return null;
        }

        const cookies = cookieString.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(`${name}=`)) {
                return cookie.substring(name.length + 1);
            }
        }

        return null;
    }

    /**
     * Define um cookie.
     *
     * @param {string} name - O nome do cookie.
     * @param {string} value - O valor do cookie.
     * @param {number} [days=30] - O número de dias até a expiração do cookie (opcional, padrão é 30).
     * @param {string} [path='/'] - O caminho do cookie (opcional, padrão é '/').
     */
    public setCookie(name: string, value: string, days: number = 30, path: string = '/'): void {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=${path}`;
    }
}

// Exemplo de uso:
// const cookieService = new CookieService();
//
// // Define um cookie:
// cookieService.setCookie('user_id', '12345');
//
// // Obtém o valor de um cookie:
// const userId = cookieService.getCookie('user_id');
// console.log(userId); // Saída: 12345
//
// // Limpa um cookie:
// cookieService.clearCookie('user_id');
//
// // Limpa todos os cookies:
// cookieService.clearAllCookies();