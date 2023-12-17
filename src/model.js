// 이전 버전에서는 Model과 Controller 간 통합(integration)이 완벽하지 않습니다.
// 1. 상태가 변경된 후의 rendering을 위해 수동으로 호출해야 합니다. --> 오류가 발생하기 쉬운 접근 방식
// 2. 사용자의 동작이 상태를 변경하지 않았음에도(e.g. li로 빈 항목을 추가) render 메서드가 호출됩니다.
//
// 이러한 문제를 해결하기 위해 기존 MVC 모델의 Next Version인 Observer Pattern을 적용해서 코드를 리팩토링 해보았습니다.
// 기존 코드의 getState 메서드가 사라지고, addChangeListener 메서드가 추가되었습니다.
// addChangeListener 메서드는 아래 두 가지 상황에서 콜백함수로 호출됩니다.
// 1. 구독할 때
// 2. 내부 상태가 변경될 때

// ↓ cloneDeep 메서드 - 객체를 깊은 복사 합니다.
const cloneDeep = (x) => {
  // 자바스크립트 객체를 JSON 문자열로 직렬화 한 뒤 그것을 파싱하여 다시 JSON객체로 역직렬화 합니다.
  return JSON.parse(JSON.stringify(x));
};

const freeze = (x) => Object.freeze(cloneDeep(x));

const INITIAL_STATE = {
  todos: [],
  currentFilter: "All",
};

export default (initialState = INITIAL_STATE) => {
  const state = cloneDeep(initialState); // 1. initialState에는 초기 상태값(객체)이 들어올 것입니다.
  //                                          그 값을 깊은 복사하여 state에 담습니다.

  let listeners = [];

  const addChangeListener = (listener) => {
    listeners.push(listener);

    listener(freeze(state));

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const invokeListeners = () => {
    const data = freeze(state);
    listeners.forEach((l) => l(data));
  };

  const addItem = (text) => {
    if (!text) {
      return;
    }

    state.todos.push({
      text,
      completed: false,
    });

    invokeListeners();
  };

  const updateItem = (index, text) => {
    if (!text) {
      return;
    }

    if (index < 0) {
      return;
    }

    if (!state.todos[index]) {
      return;
    }

    state.todos[index].text = text;

    invokeListeners();
  };

  const deleteItem = (index) => {
    if (index < 0) {
      return;
    }

    if (!state.todos[index]) {
      return;
    }

    state.todos.splice(index, 1);

    invokeListeners();
  };

  const toggleItemCompleted = (index) => {
    if (index < 0) {
      return;
    }

    if (!state.todos[index]) {
      return;
    }

    state.todos[index].completed = !state.todos[index].completed;

    invokeListeners();
  };

  const completeAll = () => {
    state.todos.forEach((t) => {
      t.completed = true;
    });

    invokeListeners();
  };

  const clearCompleted = () => {
    state.todos = state.todos.filter((t) => !t.completed);
    invokeListeners();
  };

  const changeFilter = (filter) => {
    state.currentFilter = filter;
    invokeListeners();
  };

  return {
    addItem,
    updateItem,
    deleteItem,
    toggleItemCompleted,
    completeAll,
    clearCompleted,
    changeFilter,
    addChangeListener,
  };
};
