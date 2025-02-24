/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!******************************************************!*\
  !*** ./public/assets/ts/ApiRequest/CookieService.ts ***!
  \******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CookieService: () => (/* binding */ CookieService)
/* harmony export */ });
/**
 * Serviço para manipulação de cookies.
 *
 * Esta classe fornece métodos para definir, obter e limpar cookies.
 */
class CookieService {
    /**
     * Limpa um cookie específico.
     *
     * @param {string} name - O nome do cookie a ser limpo.
     * @param {string} [path='/'] - O caminho do cookie (opcional, padrão é '/').
     */
    clearCookie(name, path = '/') {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=${path}`;
    }
    /**
     * Limpa todos os cookies existentes.
     *
     * @param {string} [path='/'] - O caminho dos cookies (opcional, padrão é '/').
     */
    clearAllCookies(path = '/') {
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
    getCookie(name) {
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
    setCookie(name, value, days = 30, path = '/') {
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

/******/ })()
;
//# sourceMappingURL=ApiRequest\CookieService.js.map