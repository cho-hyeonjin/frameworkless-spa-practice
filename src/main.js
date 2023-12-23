// 이 파일은 Model Controller 역할을 하는 파일입니다.
// Model(todos.js)에서는 XMLHttpRequest를 이용한 HTTP 요청 로직(http.js)을 캡슐화 했습니다.
// 이 파일에서는 Model(todos.js)을 통해 Application을 컨트롤 하는 코드를 작성해보겠습니다.

// todos.js를 todos라는 이름으로 import
import todos from "./todos.js";

// 기존 onAddClick메서드에서 문자열을 바로 사용하던 방식에서 아래와 같이 상수화 시켜서 사용
const NEW_TODO_TEXT = "A simple todo Element";

const printResult = (action, result) => {
  const time = new Date().toTimeString();
  const node = document.createElement("p");
  node.textContent = `${action.toUpperCase()}: ${JSON.stringify(
    result
  )} (${time})`;

  document.querySelector("div").appendChild(node);
};

// HTTP Client(http.js)를 Controller(main.js)에서 다이렉트로 import하여 사용하지 X,
// HTTP Client(http.js)는 Model객체(todos.js)에서 import해서 list라는 이름을 가진 메서드로 Wrapping(캡슐화)하여 export.
// 컨트롤러(main.js)에서는 Model(todos)을 import하여 Model에서 Wrapping한 GET 요청 메서드 'list'를 사용했다.
const onListClick = async () => {
  const result = await todos.list();
  printResult("list todos", result);
};

// HTTP Client(http.js)를 Controller(main.js)에서 다이렉트로 import하여 사용하지 X,
// HTTP Client(http.js)는 Model객체(todos.js)에서 import해서 create라는 이름을 가진 메서드로 Wrapping(캡슐화)하여 export.
// 컨트롤러(main.js)에서는 Model(todos)을 import하여 Model에서 Wrapping한 POST 요청 메서드 'create'를 사용했다.
const onAddClick = async () => {
  const result = await todos.create(NEW_TODO_TEXT); // 기존 문자열을 상수화하여 사용
  printResult("add todo", result);
};

// HTTP Client(http.js)를 Controller(main.js)에서 다이렉트로 import하여 사용하지 X,
// HTTP Client(http.js)는 Model객체(todos.js)에서 import해서 update라는 이름을 가진 메서드로 Wrapping(캡슐화)하여 export.
// 컨트롤러(main.js)에서는 Model(todos)을 import하여 Model에서 Wrapping한 PATCH 요청 메서드 'update'를 사용했다.
const onUpdateClick = async () => {
  const list = await todos.list();

  const { id } = list[0];
  const newTodo = {
    id,
    completed: true,
  };

  const result = await todos.update(newTodo);
  printResult("update todo", result);
};

// HTTP Client(http.js)를 Controller(main.js)에서 다이렉트로 import하여 사용하지 X,
// HTTP Client(http.js)는 Model객체(todos.js)에서 import해서 delete라는 이름을 가진 메서드로 Wrapping(캡슐화)하여 export.
// 컨트롤러(main.js)에서는 Model(todos)을 import하여 Model에서 Wrapping한 PATCH 요청 메서드 'delete'를 사용했다.
const onDeleteClick = async () => {
  const list = await todos.list();
  const { id } = list[0];

  const result = await todos.delete(id);
  printResult("delete todo", result);
};

document
  .querySelector("button[data-list]")
  .addEventListener("click", onListClick);

document
  .querySelector("button[data-add]")
  .addEventListener("click", onAddClick);

document
  .querySelector("button[data-update]")
  .addEventListener("click", onUpdateClick);

document
  .querySelector("button[data-delete]")
  .addEventListener("click", onDeleteClick);
