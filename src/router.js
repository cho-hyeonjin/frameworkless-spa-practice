export default () => {
  const routes = [];
  let notFound = () => {};

  const router = {};

  const checkRoutes = () => {
    // 현재 Fragment Identifier은 window.location 객체의 hash 속성에 저장.
    // find 메서드로 routes에서 fragment가 location객체의 hash 값과 동일한 요소를 리턴
    const currentRoute = routes.find((route) => {
      return route.fragment === window.location.hash;
    });

    if (!currentRoute) {
      notFound();
      return;
    }

    currentRoute.component();
  };

  // ↓ router 객체에 route 함수들 추가해주는 로직 ↓
  // 1. route 추가 함수
  router.addRoute = (fragment, component) => {
    routes.push({
      fragment,
      component,
    });

    return router;
  };

  // 2. Page Not Found 페이지 라우팅 세팅 함수
  router.setNotFound = (cb) => {
    notFound = cb;
    return router;
  };

  // 3. 초기 페이지 라우팅 세팅 함수
  router.start = () => {
    window.addEventListener("hashchange", checkRoutes);

    if (!window.location.hash) {
      window.location.hash = "#/";
    }

    checkRoutes();
  };

  return router;
};
