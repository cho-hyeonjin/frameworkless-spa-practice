// 렌더링에 사용되는 실제 데이터는 model 객체의 getState 메서드에서 반환됩니다.
// model 객체에서 추출한 값은 immutable 값입니다.
// model 객체에서 immutable 값을 만드는 로직은 cloneDeep함수부터 살펴보겠습니다.
// 보통 lodash 라이브러리의 _.cloneDeep 메서드를 쓰지만, 이 코드에서는 직접 구현해봤습니다.

// ↓ cloneDeep 메서드 - 객체를 깊은 복사 합니다.
const cloneDeep = (x) => {
  // 자바스크립트 객체를 JSON 문자열로 직렬화 한 뒤 그것을 파싱하여 다시 JSON객체로 역직렬화 합니다.
  return JSON.parse(JSON.stringify(x));
};

const INITIAL_STATE = {
  todos: [],
  currentFilter: "All",
};

export default (initialState = INITIAL_STATE) => {
  const state = cloneDeep(initialState); // 1. initialState에는 초기 상태값(객체)이 들어올 것입니다.
  //                                          그 값을 깊은 복사하여 state에 담습니다.

  const getState = () => {
    return Object.freeze(cloneDeep(state)); // 2. 초기 상태 객체를 깊이 복제한 객체 state를 고정합니다. (이제 state 객체의 속성과 프로토타입은 변경될 수 없습니다.)
  }; // getState()는 공개 메서드(외부에서 접근할 수 있도록 반환된 메서드)입니다.
  //    이 함수를 통과하여 반환된 값은 freezing되어 읽기 전용(read-only, immutable) 값이 되기 때문에
  //    getState() 메서드를 통해 상태를 담고 있는 식별자(state)로 상태를 읽기만 할 수 있고, 수정할 수는 없습니다.
  //    비즈니스 로직이 이런 식으로 구현되어 있으면 (state값이 Model 객체에 완전히 포함되어 있으면)
  //    애플리케이션의 다른 부분에 흩어지지 않습니다.
  //    따라서, 상태를 유지하고 관리하는 수준을 높일 수 있게 됩니다.

  const addItem = (text) => {
    if (!text) {
      return;
    }

    state.todos.push({
      text,
      completed: false,
    });
  };
  // Using an Immutable State to transfer data Forces the consumers of this API
  // to Use Public Methods to Manipulate the State.
  // This way, the Business Logic is Completely Contained In the Model object and Not Scattered in variouse parts of the application.

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
  };

  const deleteItem = (index) => {
    if (index < 0) {
      return;
    }

    if (!state.todos[index]) {
      return;
    }

    state.todos.splice(index, 1);
  };

  const toggleItemCompleted = (index) => {
    if (index < 0) {
      return;
    }

    if (!state.todos[index]) {
      return;
    }

    state.todos[index].completed = !state.todos[index].completed;
  };

  const completeAll = () => {
    state.todos.forEach((t) => {
      t.completed = true;
    });
  };

  const clearCompleted = () => {
    state.todos = state.todos.filter((t) => !t.completed);
  };

  const changeFilter = (filter) => {
    state.currentFilter = filter;
  };

  return {
    addItem,
    updateItem,
    deleteItem,
    toggleItemCompleted,
    completeAll,
    clearCompleted,
    changeFilter,
    getState,
  };
};
