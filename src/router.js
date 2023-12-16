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

  // ↓ Fragment에서 Parameter 추출하기 위한 코드 시작 ↓
  const ROUTE_PARAMETER_REGEXP = /:(\w+)/g; // 정규식1 - 이 정규식은 URL 경로에서 파라미터를 나타내는 패턴으로, 일반적으로 라우팅을 구현할 때 사용.
  //         URL 경로에서 특정 이름의 파라미터를 매칭하는 데에 사용할 수 있습니다..
  const URL_FRAGMENT_REGEXP = "([^\\/]+)"; // 정규식2 - 보통 URL 경로에서 첫 번째 슬래시가 나타날 때까지의 문자열을 일치시키기 위해 사용

  // 1. route 추가 함수
  router.addRoute = (fragment, component) => {
    const params = [];

    // Fragment를 (상수화시킨) 정규식을 이용하여 파싱하고, parsedFragment 변수에 담는다.
    const parsedFragment = fragment
      .replace(ROUTE_PARAMETER_REGEXP, (match, paramName) => {
        params.push(paramName);
        return URL_FRAGMENT_REGEXP;
      })
      .replace(/\//g, "\\/"); // 슬래시를 찾기 위한 replace라고 한다.
    // 아래는 GPT의 설명
    // • / : 슬래시(/)를 찾기 위해 정규식 내에 사용되었습니다.
    // • \/ : 슬래시를 이스케이핑하여 찾기 위한 패턴입니다.
    //        슬래시가 정규식 내에서 특수 문자로 사용되므로, 실제 슬래시(/)를 찾기 위해 이를 이스케이핑하여 검색 패턴으로 사용합니다.

    routes.push({
      testRegExp: new RegExp(`^${parsedFragment}$`),
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

  // 3. () 프로그래밍 방식으로 다른 페이지(View)로 이동하는 함수
  router.navigate = (fragment) => {
    window.location.hash = fragment;
  };

  // 4. 초기 페이지 라우팅 세팅 함수
  router.start = () => {
    window.addEventListener("hashchange", checkRoutes);

    if (!window.location.hash) {
      window.location.hash = "#/";
    }

    checkRoutes();
  };

  return router;
};
