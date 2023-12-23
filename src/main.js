// Controller 컴포넌트

import createPages from "./pages.js";
import createRouter from "./router.js";

const container = document.querySelector("main");
const pages = createPages(container);
const router = createRouter();

router
  .addRoute("#/", pages.tech)
  .addRoute("#/design", pages.design)
  .addRoute("#/career", pages.career)
  .addRoute("#/list/:id", pages.detail)
  .addRoute("#/list/:id/:anotherId", pages.anotherDetail)
  .setNotFound(pages.notFound)
  .start();

// data attribute 이용해서 routing controll 하는 DOM 조작 로직
const NAV_BTN_SELECTOR = "button[data-navigate]";

document.body.addEventListener("click", (e) => {
  const { target } = e;
  if (target.matches(NAV_BTN_SELECTOR)) {
    const { navigate } = target.dataset;
    router.navigate(navigate);
  }
});
