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
/*!***********************************************************!*\
  !*** ./public/assets/ts/ApiRequest/ApiRequestStrategy.ts ***!
  \***********************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApiRequestStrategy: () => (/* binding */ ApiRequestStrategy)
/* harmony export */ });
// Classe abstrata pai da Strategy
class ApiRequestStrategy {
    constructor() {
        this.token = null;
        this.refreshTokenValue = null;
    }
    // Define o token e, opcionalmente, registra em cookie
    setAuthToken(token) {
        this.token = token;
        document.cookie = `token=${token}; path=/`;
    }
    // Define o refresh token
    setRefreshToken(refreshToken) {
        this.refreshTokenValue = refreshToken;
    }
    // Monta os headers: junta headers customizados e, se auth=true e token existir, adiciona o Bearer
    getHeaders(customHeaders, auth = true) {
        const headers = Object.assign({}, (customHeaders || {}));
        if (auth && this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }
        headers['X-Requested-With'] = 'XMLHttpRequest';
        return headers;
    }
}

/******/ })()
;
//# sourceMappingURL=public\assets\ts\ApiRequest\ApiRequestStrategy.js.map