/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EVENTS: () => (/* binding */ EVENTS),
/* harmony export */   "default": () => (/* binding */ GitHubAvatar)
/* harmony export */ });
const ERROR_IMAGE = "https://files-82ee7vgzc.now.sh";
const LOADING_IMAGE = "https://files-8bga2nnt0.now.sh";
// 이전 코드까지는 사용자와의 상호작용이 아닌 도메인에 국한된 DOM이벤트를 생성했다.
// 이번 코드에서는 github avatar가 로드됐을 때와 오류가 발생했을 때 각각 다른 이벤트를 발생시켜보자!
const AVATAR_LOAD_COMPLETE = "AVATAR_LOAD_COMPLETE"; // 성공한 경우,
const AVATAR_LOAD_ERROR = "AVATAR_LOAD_ERROR"; // 실패한 경우를 분기 처리하여 렌더링하기 위한 식별자
// 식별자들을 하나의 객체로 묶어 export 한다. (렌더링 엔진 모듈에서 DOM조작 이벤트 리스너에 parameter로 전달하기 위함)
const EVENTS = {
  AVATAR_LOAD_COMPLETE,
  AVATAR_LOAD_ERROR
};
const getGitHubAvatarUrl = async user => {
  if (!user) {
    return;
  }
  const url = `https://api.github.com/users/${user}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data.avatar_url;
};
class GitHubAvatar extends HTMLElement {
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

  // HTTP 요청이 성공하여 github avatar가 로드 되었을 때 발생시키는 이벤트
  onLoadAvatarComplete() {
    const event = new CustomEvent(AVATAR_LOAD_COMPLETE, {
      detail: {
        avatar: this.url
      }
    });
    this.dispatchEvent(event);
  }

  // HTTP 요청이 실패하여 github avatar가 로드 되지 못했을 때 발생시키는 이벤트
  onLoadAvatarError(error) {
    const event = new CustomEvent(AVATAR_LOAD_ERROR, {
      detail: {
        error
      }
    });
    this.dispatchEvent(event);
  }
  async loadNewAvatar() {
    const {
      user
    } = this;
    if (!user) {
      return;
    }
    try {
      this.url = await getGitHubAvatarUrl(user);
      this.onLoadAvatarComplete();
    } catch (e) {
      this.url = ERROR_IMAGE;
      this.onLoadAvatarError(e);
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
document.querySelectorAll("github-avatar").forEach(avatar => {
  avatar.addEventListener(_components_GithubAvatar_js__WEBPACK_IMPORTED_MODULE_0__.EVENTS.AVATAR_LOAD_COMPLETE, e => {
    console.log("Avatar Loaded", e.detail.avatar);
  });
  avatar.addEventListener(_components_GithubAvatar_js__WEBPACK_IMPORTED_MODULE_0__.EVENTS.AVATAR_LOAD_ERROR, e => {
    console.log("Avatar Loading error", e.detail.error);
  });
});
})();

/******/ })()
;