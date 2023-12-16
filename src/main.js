// Controller with Separated Model
// 상태를 컨트롤러에서 유지하는 것은 상태 관리의 좋은 방법이 아닙니다.
// 애플리케이션의 디자인(구조)을 향상시키는 첫 번째 단계는?
// → 상태 코드를 별도의 파일로 옮겨서 분리하는 것!
// 아래 코드는 애플리케이션의 상태를 외부 모델(분리된 별도의 상태 파일)에서 관리하는 컨트롤러의 업데이트된 버전입니다.

import modelFactory from "./model/model.js";

const model = modelFactory();

const events = {
  addItem: (text) => {
    model.addItem(text);
    render(model.getState());
  },
  updateItem: (index, text) => {
    model.updateItem(index, text);
    render(model.getState());
  },
  deleteItem: (index) => {
    model.deleteItem(index);
    render(model.getState());
  },
  toggleItemCompleted: (index) => {
    model.toggleItemCompleted(index);
    render(model.getState());
  },
  completeAll: () => {
    model.completeAll();
    render(model.getState());
  },
  clearCompleted: () => {
    model.clearCompleted();
    render(model.getState());
  },
  changeFilter: (filter) => {
    model.changeFilter(filter);
    render(model.getState());
  },
};

const render = (state) => {
  window.requestAnimationFrame(() => {
    const main = document.querySelector("#root");

    const newMain = registry.renderRoot(main, state, events);

    applyDiff(document.body, main, newMain);
  });
};

render(model.getState()); // rendering에 사용된 실제 데이터는 model 객체의 getState 메서드에서 반환됩니다.
