export default class TestComponent extends HTMLElement {
  connectedCallback() {
    window.requestAnimationFrame(() => {
      this.innerHTML = "<div>TestComponent</div>";
    });
  }
}
