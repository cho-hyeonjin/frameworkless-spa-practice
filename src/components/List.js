const TEMPLATE = '<ul class="todo-list"></ul>';

export const EVENTS = {
  DELETE_ITEM: "DELETE_ITEM",
};

export default class List extends HTMLElement {
  static get observedAttributes() {
    return ["todos"];
  }

  // getAttribute 메서드의 Wrapper. 접근자(Getter: this(클래스의 인스턴스)의 속성에 접근할 때 호출할 함수를 바인딩.)
  get todos() {
    if (!this.hasAttribute("todos")) {
      // Element: hasAttribute() 메서드 - List 클래스의 인스턴스가 'todos' 속성을 가지고 있으면 true 리턴
      return []; // true인 경우 빈배열 리턴
    }
    return JSON.parse(this.getAttribute("todos")); // false인 경우 this의 'todos' 속성값(JSON)을 JavaScript 객체로 변환하여 리턴
  }

  // setAttribute 메서드의 Wrapper. 설정자(Setter: this(클래스의 인스턴스)의 속성에 값을 할당할 때 호출할 함수를 바인딩.)
  set todos(value) {
    this.setAttribute("todos", JSON.stringify(value));
  }

  // List 클래스의 인스턴스 메서드 onDeleteClick 정의
  // -> 사용자가 리스트 아이템을 삭제할 때 호출되는 콜백 함수.
  //    리액트와 비교하면 컴포넌트 내에서 특정 액션이 일어날 때 실행되는 핸들러.
  onDeleteClick(index) {
    // CustomEvent 'event'를 생성하고
    const event = new CustomEvent(EVENTS.DELETE_ITEM, {
      detail: {
        index,
      },
    });
    // dispatchEvent()로 EventTarget에 event(CustomEvent) 전달
    this.dispatchEvent(event);
  }

  // List 클래스의 인스턴스 메서드 createNewTodoNode 정의
  // -> 리액트와 비교하면 렌더링 단계에서 새로운 가상 DOM 요소를 생성하고 반환하는 부분.
  createNewTodoNode() {
    // 인스턴스의 itemTemplate 요소의 content 중 firstElementChild(첫번째 요소)를 deepClone하여 새로운 독립적인 복제 Node를 생성
    return this.itemTemplate.content.firstElementChild.cloneNode(true);
  }

  // List 클래스의 인스턴스 메서드 getTodoElement 정의
  // -> 리액트와 비교하면 컴포넌트의 렌더링 로직에 해당.
  //    각각의 todo를 렌더링하기 위한 html 요소(DOM 요소로)를 생성
  getTodoElement(todo, index) {
    // 구조분해 할당으로 todo 객체에서 text, completed 속성 추출
    const { text, completed } = todo;
    // createNewTodoNode 메서드로 cloneNode 생성
    const element = this.createNewTodoNode();

    // HTML document에서 edit클래스를 가진 input요소의 value에 text를 할당
    element.querySelector("input.edit").value = text;
    // HTML document에서 첫번째 label요소의 textContent text를 할당
    element.querySelector("label").textContent = text;

    // completed가 true로 평가될 경우
    if (completed) {
      // 요소의 classList에 "completed" 추가하고
      element.classList.add("completed");
      // toggle클래스를 가진 input 요소의 checked속성값에 true를 할당
      element.querySelector("input.toggle").checked = true;
    }

    // completed가 false로 평가될 경우 destroy클래스를 가진 button요소의 dataset속성값의 index속성값으로 index를 할당
    element.querySelector("button.destroy").dataset.index = index;

    // 그렇게 완성된 요소를 리턴
    return element;
  }

  // List 클래스의 인스턴스 메서드 updateList 정의
  // -> 변경된 데이터에 따라 UI를 갱신.
  //    리액트와 비교하면 컴포넌트가 업데이트될 때 실행되는 렌더링과 관련된 작업.
  updateList() {
    // 인스턴스의 list객체의 innerHTML 빈문자열로 초기화
    this.list.innerHTML = "";
    // 인스턴스의 todos배열을 map돌려서 각 배열 요소를 list객체의 자식요소로 append
    this.todos.map(this.getTodoElement).forEach((element) => {
      this.list.appendChild(element);
    });
  }

  // List 클래스의 인스턴스 메서드 connectedCallback 정의
  // -> 리액트와 비교하면 컴포넌트 라이프사이클 메서드 중 componentDidMount()와 유사.
  //    컴포넌트가 마운트된 후 초기화 로직을 수행한다.
  connectedCallback() {
    // 인스턴스의 innerHTML로 TEMPLATE('<ul class="todo-list"></ul>') 재할당
    this.innerHTML = TEMPLATE;
    // 인스턴스의 itemTemplate속성값으로 todo-item이라는 id를 가진 HTML요소 할당
    this.itemTemplate = document.getElementById("todo-item");
    // 인스턴스의 list속성값으로 첫번째 <ul></ul>요소 할당
    this.list = this.querySelector("ul");
    // 인스턴스의 list속성값의 click 이벤트 핸들러로 인스턴스의 onDeleteClick(e.target.dataset.index) 메서드 연결
    this.list.addEventListener("click", (e) => {
      if (e.target.matches("button.destroy")) {
        this.onDeleteClick(e.target.dataset.index);
      }
    });

    // List 인스턴스의 updateList 메서드 호출
    this.updateList();
  }

  // List 클래스의 인스턴스 메서드 attributeChangedCallback 정의
  // -> 리액트와 비교하면 컴포넌트 라이프사이클 메서드 중 componentDidUpdate()와 유사.
  //    컴포넌트의 속성이 변경될 때마다 실행되는 로직을 담당한다.
  attributeChangedCallback() {
    // 인스턴스의 updateList 메서드 호출
    this.updateList();
  }
}
