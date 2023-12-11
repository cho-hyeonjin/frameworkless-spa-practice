const DEFAULT_COLOR = "black";

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
    if (!this.div) {
      return;
    }

    if (name === "color") {
      this.div.style.color = newValue;
    }
  }

  connectedCallback() {
    window.requestAnimationFrame(() => {
      this.div = document.createElement("div");
      this.div.textContent = "TestComponent";
      this.div.style.color = this.color;
      this.appendChild(this.div);
    });
  }
}
