// 옵저버 패턴을 구현하여 상태 변경을 감지하고, 상태가 변경될 때 등록된 Listener들에게 알리는 역할을 하는 컴포넌트.
// Model에서 import 하여 사용됩니다.

// 객체의 깊은 복사를 이용한 새로운 객체를 생성하는 함수
const cloneDeep = (x) => {
  return JSON.parse(JSON.stringify(x));
};

// 주어진 state를 변경할 수 없도록 불변성 주입
const freeze = (state) => Object.freeze(cloneDeep(state));

export default (model, stateGetter) => {
  let listeners = [];

  // 상태 변화를 감지하는 callback함수를 등록하는 함수
  const addChangeListener = (cb) => {
    listeners.push(cb); // listners 배열에 새로운 callback함수 추가
    cb(freeze(stateGetter()));
    return () => {
      listeners = listeners.filter((element) => element !== cb);
    };
  };

  // 모든 리스너에게 상태 변경을 알리는 함수
  const invokeListeners = () => {
    const data = freeze(stateGetter());
    listeners.forEach((l) => l(data)); // 각 listener에게 현재 state(data)를 전달하고 호출
  };

  // Model 내의 각 메서드들을 감싸고, 메서드가 실행될 때(User의 Action이 input되었을 때) listener를 호출하는 함수
  const wrapAction = (originalAction) => {
    return (...args) => {
      const value = originalAction(...args); // 주어진 Action(User Action Input)을 실행하고,
      invokeListeners(); // 상태 변경 후 invokedListeners 호출
      return value;
    };
  };

  // 옵저버 패턴에서 핵심적인 역할을 하는 proxy 객체
  // 상태 변화를 감지하고 그에 따라 등록된 리스너들에게 알림을 주는 중심 부분
  const baseProxy = {
    addChangeListener,
  };

  return Object.keys(model)
    .filter((key) => {
      return typeof model[key] === "function";
    })
    .reduce((proxy, key) => {
      const action = model[key];
      return {
        ...proxy,
        [key]: wrapAction(action),
      };
    }, baseProxy);
};
