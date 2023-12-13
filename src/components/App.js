// 이 컴포넌트는 상태관리(state management) 로직을 담당하는 컴포넌트이다.

// 이 Compnent는 속성(attribute)이 없는 대신, 내부에 상태(state)를 가진다.
// DOM Event가 이 Component에 내재된 state를 변경하고,
// syncAttributes() 메서드에서는 해당 state를 하위 속성과 동기화 한다.

import { EVENTS } from "./List";

export default class App extends HTMLElement {
  constructor() {
    super();
    this.state = {
      todos: [],
      filter: "All",
    };

    this.template = document.getElementById("todo-app");
  }

  deleteItem(index) {
    this.state.todos.splice(index, 1);
    this.syncAttributes();
  }

  addItem(text) {
    this.state.todos.push({
      text,
      completed: false,
    });
    this.syncAttributes();
  }

  syncAttributes() {
    this.list.todos = this.state.todos;
    this.footer.todos = this.state.todos;
    this.footer.filter = this.state.filter;
  }

  connectedCallback() {
    window.requestAnimationFrame(() => {
      const content = this.template.content.firstElementChild.cloneNode(true);

      this.appendChild(content);

      this.querySelector(".new-todo").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.addItem(e.target.value);
          e.target.value = "";
        }
      });

      this.footer = this.querySelector("todomvc-footer");

      this.list = this.querySelector("todomvc-list");
      this.list.addEventListener(EVENTS.DELETE_ITEM, (e) => {
        this.deleteItem(e.detail.index);
      });

      this.syncAttributes();
    });
  }
}
