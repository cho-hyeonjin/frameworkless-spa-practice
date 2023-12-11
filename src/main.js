// 이 컴포넌트는 main 페이지 rendering 엔진 역할을 하는 컴포넌트로 생각하고 작성 중

import TestComponent from "./components/TestComponent";
// TestComponent의 connectedCallback 메서드의 color 속성 값을 가진다.
//                                  이 메서드는 appendChild API를 이용하여 이를 DOM에 적용한다.

window.customElements.define("test-component", TestComponent);
// window customElements 레지스트리에 test-component라는 이름(html tag)으로 TestComponent(js object) 등록
