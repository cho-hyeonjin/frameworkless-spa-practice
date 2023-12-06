import _ from "lodash";

function component() {
  const element = document.createElement("div");

  // 아래 라인 동작을 위해서는 lodash 라이브러리를 install해야 함.
  element.innerHTML = _.join(
    [
      "<h1>이번 커밋에서 한 작업</h1>",
      "<h2>웹팩 빌드를 위한 구성</h2>",
      "<h2>(index.html수정, webpack.config.js 생성 & 번들링을 위한 configuration, package.json내 scripts속성의 build 속성값 변경)</h2>",
      "<h2>번들링(npm run build)</h2>",
      "<h2>output 번들(dist/main.js) 라이브 서버에서 확인(Open With Live Server)</h2>",
    ],
    " "
  );

  return element;
}

document.body.appendChild(component());
