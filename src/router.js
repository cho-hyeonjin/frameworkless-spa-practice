const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;
const URL_FRAGMENT_REGEXP = "([^\\/]+)";

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// 5-1. extractUrlParams 메서드
const extractUrlParams = (route, windowHash) => {
  const params = {};

  if (route.params.length === 0) {
    return params;
  }

  const matches = windowHash.match(route.testRegExp);

  matches.shift();
  // String.matches 메서드는 첫번째 요소가 일치하는 배열을 반환하지만 다른 요소는 캡처 그룹의 결과다.
  // shift를 사용해 해당 배열에서 첫 번째 요소를 삭제한다. ---> 이해 안 가는 부분..

  matches.forEach((paramValue, index) => {
    const paramName = route.params[index];
    params[paramName] = paramValue;
  });

  return params;
}; // 5-2. extractUrlParams 메서드는 이 객체의 현재 프래그먼트에서 실제 매개변수를 추출한다. {id: 1, anotherId: 2}

export default () => {
  const routes = [];
  let notFound = () => {};

  const router = {};

  // 4-1. checkRoutes 메서드
  const checkRoutes = () => {
    const { hash } = window.location;

    const currentRoute = routes.find((route) => {
      const { testRegExp } = route;
      return testRegExp.test(hash); // 여기 주목
    });

    if (!currentRoute) {
      notFound();
      return;
    }

    const urlParams = extractUrlParams(currentRoute, window.location.hash); // 4-2. 사용자가 #/list/1/2 같은 fragment를 탐색할 때 checkRoutes 메서드는 정규식을 사용해 올바른 경로를 선택한다.

    currentRoute.component(urlParams); // 4-3. 객체가 DOM을 업데이트하는 component 함수로 전달된다.
  };

  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  // 1. document의 #/list/:id/:anotherId Fragment가 addRoute 메서드로 전달된다.
  router.addRoute = (fragment, component) => {
    // 2. addRoute 메서드는 2개의 매개변수 name-함수 시그니처-(fragment, component)을 추출하고
    const params = [];

    const parsedFragment = fragment
      .replace(ROUTE_PARAMETER_REGEXP, (match, paramName) => {
        params.push(paramName);
        return URL_FRAGMENT_REGEXP;
      })
      .replace(/\//g, "\\/"); // 3. 정규식 ^#\/list\/([^\\/]+)\/ ([^\\/]+)$ 에서 fragment를 변환한다.

    console.log(`^${parsedFragment}$`);

    routes.push({
      testRegExp: new RegExp(`^${parsedFragment}$`),
      component,
      params,
    });

    return router;
  };

  router.setNotFound = (cb) => {
    notFound = cb;
    return router;
  };

  router.navigate = (fragment) => {
    window.location.hash = fragment;
  };

  router.start = () => {
    window.addEventListener("hashchange", checkRoutes);

    if (!window.location.hash) {
      window.location.hash = "#/";
    }

    checkRoutes();
  };

  return router;
};
