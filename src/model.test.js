// 비즈니스 로직(state management)이 model 부분으로 완전 분리된 코드는
// 높은 수준의 테스트 가능성을 띄고, 테스트를 통한 애플리케이션 유지에 도움이 됩니다.
// 이 파일은 애플리케이션의 상태를 model.js에서 관리하는 코드에서의 테스트파일.

import modelFactory from "./model.js";

describe("TodoMVC Model", () => {
  test("data should be immutable", () => {
    const model = modelFactory();

    expect(() => {
      model.getState().currentFilter = "WRONG";
    }).toThrow();
  });

  test("should add an item", () => {
    const model = modelFactory();

    model.addItem("dummy");

    const { todos } = model.getState();

    expect(todos.length).toBe(1);
    expect(todos[0]).toEqual({
      text: "dummy",
      completed: false,
    });
  });

  test("should not add an item when a falsy text is provided", () => {
    const model = modelFactory();

    model.addItem("");
    model.addItem(undefined);
    model.addItem(0);
    model.addItem();
    model.addItem(false);

    const { todos } = model.getState();

    expect(todos.length).toBe(0);
  });

  test("should update an item", () => {
    const model = modelFactory({
      todos: [
        {
          text: "dummy",
          completed: false,
        },
      ],
    });

    model.updateItem(0, "new-dummy");

    const { todos } = model.getState();

    expect(todos[0].text).toBe("new-dummy");
  });

  test("should not update an item when an invalid index is provided", () => {
    const model = modelFactory({
      todos: [
        {
          text: "dummy",
          completed: false,
        },
      ],
    });

    model.updateItem(1, "new-dummy");

    const { todos } = model.getState();

    expect(todos[0].text).toBe("dummy");
  });
});
