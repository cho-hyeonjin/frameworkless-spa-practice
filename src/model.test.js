// 비즈니스 로직(state management)이 model 부분으로 완전 분리된 코드는
// 높은 수준의 테스트 가능성을 띄고, 테스트를 통한 애플리케이션 유지에 도움이 됩니다.
// 이 파일은 애플리케이션의 상태를 model.js에서 관리하는 코드에서의 테스트파일.

import modelFactory from "./model.js";
let model;

describe("observable model", () => {
  beforeEach(() => {
    model = modelFactory();
  });

  test("listeners should be invoked immediatly", () => {
    let counter = 0;
    model.addChangeListener((data) => {
      counter++;
    });
    expect(counter).toBe(1);
  });

  test("listeners should be invoked when changing data", () => {
    let counter = 0;
    model.addChangeListener((data) => {
      counter++;
    });
    model.addItem("dummy");
    expect(counter).toBe(2);
  });

  test("listeners should be removed when unsubscribing", () => {
    let counter = 0;
    const unsubscribe = model.addChangeListener((data) => {
      counter++;
    });
    unsubscribe();
    model.addItem("dummy");
    expect(counter).toBe(1);
  });

  test("state should be immutable", () => {
    model.addChangeListener((data) => {
      expect(() => {
        data.currentFilter = "WRONG";
      }).toThrow();
    });
  });
});
