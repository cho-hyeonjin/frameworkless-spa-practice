// MVC -  Controller using Obserbarble Model
// 옵저버블 패턴에서의 모델 객체에서 state를 get하는 방법은 리스너 콜백을 사용하는 것이었고,
// 이 콜백은 구독할 때, 내부 상태가 변경될 때마다 호출되는데,
// 이는 컨트롤러를 단순화시킵니다.

// madel 객체(함수, model.js)를 modelFactory라는 이름으로 import
import modelFactory from "./model/model.js";

const model = modelFactory();

const { addChangeListener, ...events } = model;

const render = (state) => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector("#root");
    const newMain = registry.renderRoot(main, state, events);
    applyDiff(document.body, main, newMain);
  });
};

addChangeListener(render);
