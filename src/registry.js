// Model과 View, Controller 등의 객체를 등록하고 관리하는데 사용되는 컴포넌트.

// component가 등록되고, reder하기 위한 중앙 저장소 역할을 하는 객체
const registry = {};

// component render를 위한 Wrapper를 생성하는 고차 함수. 이 Wrapper는 특정 컴포넌트의 하위 컴포넌트를 렌더링합니다.
const renderWrapper = (component) => {
  return (targetElement, state, events) => {
    const element = component(targetElement, state, events);

    const childComponents = element.querySelectorAll("[data-component]");

    Array.from(childComponents).forEach((target) => {
      const name = target.dataset.component;

      const child = registry[name];
      if (!child) {
        return;
      }

      target.replaceWith(child(target, state, events));
    });

    return element;
  };
};

// registry 객체에 component를 지정된 name으로 등록하는 함수
const add = (name, component) => {
  registry[name] = renderWrapper(component);
};

// root 컴포넌트를 render하고, regitry 객체에 등록된 component를 재귀적으로 render하는 함수
const renderRoot = (root, state, events) => {
  const cloneComponent = (root) => {
    return root.cloneNode(true);
  };

  return renderWrapper(cloneComponent)(root, state, events);
};

export default {
  add,
  renderRoot,
};
