/******/ (() => { // webpackBootstrap

/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {

/* harmony export */   "default": () => (/* binding */ GithubAvatar)
/* harmony export */ });
const ERROR_IMAGE = "https://files-82ee7vgzc.now.sh";
const LOADING_IMAGE = "https://files-8bga2nnt0.now.sh";
const getGithubAvatarUrl = async user => {
  if (!user) {
    return;
  }
  const url = `https://api.github.com/users/${user}`; // toss.tech 페이지 sources의 assets에 있는 이미지를 사용해보려 했으나, response가 json이 아닌 image 파일 자체여서 일단 예제코드 그대로 진행

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data.avatar_url;
};
class GithubAvatar extends HTMLElement {
  constructor() {
    super();
    this.url = LOADING_IMAGE;
  }
  get user() {
    return this.getAttribute("user");
  }
  set user(value) {
    this.setAttribute("user", value);
  }
  render() {
    window.requestAnimationFrame(() => {
      this.innerHTML = "";
      const img = document.createElement("img");
      img.src = this.url;
      this.appendChild(img);
    });
  }
  async loadNewAvatar() {
    const {
      user
    } = this;
    if (!user) {
      return;
    }
    try {
      this.url = await getGithubAvatarUrl(user);
    } catch (e) {
      this.url = ERROR_IMAGE;
    }
    this.render();
  }
  connectedCallback() {
    this.render();
    this.loadNewAvatar();
  }
}

/***/ })
/******/ 	]);
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_GithubAvatar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

window.customElements.define("github-avatar", _components_GithubAvatar_js__WEBPACK_IMPORTED_MODULE_0__["default"]);
})();


/******/ })()
