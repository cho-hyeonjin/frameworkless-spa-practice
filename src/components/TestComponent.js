import applyDiff from "./applyDiff";

const DEFAULT_COLOR = "black";

const createDomElement = (color) => {
  const div = document.createElement("div");
  div.textContent = "createDomElement🪄";
  div.style.color = color;
  return div;
};
export default class TestComponent extends HTMLElement {
  static get observedAttributes() {
    return ["color"];
  }

  get color() {
    return this.getAttribute("color") || DEFAULT_COLOR;
  }

  set color(value) {
    this.setAttribute("color", value);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.hasChildNodes()) {
      return;
    }
    applyDiff(
      this, // parentNode
      this.firstElementChild, // realNode
      createDomElement(newValue) // virtualNode
    );
  }

  connectedCallback() {
    window.requestAnimationFrame(() => {
      this.appendChild(createDomElement(this.color));
    });
  }
}
