// 이 컴포넌트는 main 페이지 rendering 엔진 역할을 하는 컴포넌트로 생각하고 작성중
import TestComponent from "./components/TestComponent";

window.customElements.define("test-component", TestComponent);

const changeColorTo = (color) => {
  document.querySelectorAll("test-component").forEach((testComponent) => {
    testComponent.color = color;
  });
};

document.querySelector("button").addEventListener("click", () => {
  changeColorTo("blue");
});

function initMain() {
  const element = document.createElement("h1");
  element.innerHTML = "메인 컴포넌트";
  return element;
}
document.body.appendChild(initMain());

