/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/assets/ts/ApiRequest/CookieService.ts":
/*!******************************************************!*\
  !*** ./public/assets/ts/ApiRequest/CookieService.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***********************************************************!*\
  !*** ./public/assets/ts/ApiRequest/ApiRequestStrategy.ts ***!
  \***********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiRequestStrategy: () => (/* binding */ ApiRequestStrategy)
/* harmony export */ });
/* harmony import */ var _CookieService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CookieService */ "./public/assets/ts/ApiRequest/CookieService.ts");

// Classe abstrata pai da Strategy
class ApiRequestStrategy {
    constructor() {
        this.token = null;
        this.refreshTokenValue = null;
        this.cookieService = new _CookieService__WEBPACK_IMPORTED_MODULE_0__.CookieService();
    }
    // Define o token e, opcionalmente, registra em cookie
    setAuthToken(token) {
        this.cookieService.clearAllCookies();
        this.token = token;
        this.cookieService.setCookie('token', token);
    }
    loadToken() {
        this.token = this.cookieService.getCookie('token');
    }
    getAuthToken() {
        const meta = document.querySelector('meta[name="auth-token"]');
        return meta ? meta.getAttribute('content') : null;
    }
    // Define o refresh token
    setRefreshToken(refreshToken) {
        this.refreshTokenValue = refreshToken;
    }
    // Monta os headers: junta headers customizados e, se auth=true e token existir, adiciona o Bearer
    getHeaders(customHeaders, auth = true) {
        const headers = Object.assign({}, (customHeaders || {}));
        this.loadToken();
        if (auth && this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        headers['X-Requested-With'] = 'XMLHttpRequest';
        return headers;
    }
}

})();

/******/ })()
;
//# sourceMappingURL=ApiRequest\ApiRequestStrategy.js.map