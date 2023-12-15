// 이 파일은 todos Model 객체를 보여주는 역할을 합니다.
// 컨트롤러(main.js)에서 HTTP Client의 함수들을 직접 사용하지 않고,
// 이 파일(todos Model 객체)에서처럼 캡슐화 하는 것이 좋습니다.

// http.js를 http라는 이름으로 import
import http from "./http.js";

// 요청 HEADER로 던져 줄 파라미터 객체 생성
const HEADERS = {
  "Content-Type": "application/json",
};

// 기본 요청 URL로 던져 줄 파라미터 생성
const BASE_URL = "/api/todos";

// 1. GET 메서드 캡슐화
const list = () => http.get(BASE_URL);

// 2. POST 메서드 캡슐화
const create = (text) => {
  // record의 todo값에 매핑할 객체 생성
  const todo = {
    text,
    completed: false,
  };

  return http.post(BASE_URL, todo, HEADERS);
};

// 3. PATCH 메서드 캡슐화
const update = (newTodo) => {
  const url = `${BASE_URL}/${newTodo.id}`;
  return http.patch(url, newTodo, HEADERS);
};

// 4. DELETE 메서드 캡슐화
const deleteTodo = (id) => {
  const url = `${BASE_URL}/${id}`;
  return http.delete(url, HEADERS);
};

export default {
  list,
  create,
  update,
  delete: deleteTodo,
};
