import createPages from "./pages.js";
import createRouter from "./router.js";

const container = document.querySelector("main");
const pages = createPages(container);
const router = createRouter();

router
  .addRoute("#/", pages.tech)
  .addRoute("#/design", pages.design)
  .addRoute("#/career", pages.career)
  .setNotFound(pages.notFound)
  .start();
