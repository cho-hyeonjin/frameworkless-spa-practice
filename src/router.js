// 라우팅을 위해 History API를 사용하면,
// Fragment identifier를 이용해서 경로를 지정해줄 필요가 없습니다.
// History API는 실제 URL을 사용합니다.
// (Fragment identifier = '#/page1')
// (History API = 'http://localhost:8080/page1')

const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;
const URL_FRAGMENT_REGEXP = "([^\\/]+)";
const TICKTIME = 250;

const extractUrlParams = (route, pathname) => {
  const params = {};

  if (route.params.length === 0) {
    return params;
  }

  const matches = pathname.match(route.testRegExp);

  matches.shift();

  matches.forEach((paramValue, index) => {
    const paramName = route.params[index];
    params[paramName] = paramValue;
  });

  return params;
};

export default () => {
  const routes = [];
  let notFound = () => {};

  let lastPathname;

  const router = {};

  const checkRoutes = () => {
    const { pathname } = window.location;
    if (lastPathname === pathname) {
      return;
    }
    lastPathname = pathname;
    const currentRoute = routes.find((route) => {
      const { testRegExp } = route;
      return testRegExp.test(pathname);
    });

    if (!currentRoute) {
      notFound();
      return;
    }

    const urlParams = extractUrlParams(currentRoute, pathname);
    currentRoute.callback(urlParams);
  };

  router.addRoute = (path, callback) => {
    const params = [];

    const parsedPath = path
      .replace(ROUTE_PARAMETER_REGEXP, (match, paramName) => {
        params.push(paramName);
        return URL_FRAGMENT_REGEXP;
      })
      .replace(/\//g, "\\/");

    routes.push({
      testRegExp: new RegExp(`^${parsedFragment}$`),
      callback,
      params,
    });

    return router;
  };

  router.setNotFound = (cb) => {
    notFound = cb;
    return router;
  };

  router.navigate = (path) => {
    window.history.pushState(null, null, path); // pushState는 History API를 이용한 라우팅 구현에서 사용된 유일한 메서드로,
    //                                             pushState(state, title, URL)입니다. history stack에 data를 push하고, URL로 이동합니다.
  };

  router.start = () => {
    checkRoutes();
    window.setInterval(checkRoutes, TICKTIME); // 이전 버전(Fragment Identifier 이용하여 구현한 라우터)에는 URL이 변경되면 그것을 감지하고 알려주는 이벤트 리스너 메서드(이전 버전의 checkRoutes 메서드)가 있었는데, 지금 코드에는 없다.
    //                                            그것과 비슷한 역할을 하는 코드를 만들기 위해 window의 setIntrval 메서드에 checkRoutes 콜백을 TICKTIME 마다 실행되게 호출하였다.
  };

  return router;
};
