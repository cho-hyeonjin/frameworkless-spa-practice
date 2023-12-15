// Fetch는 이미 Promise 기반으로 구현된 API이기 때문에,
// Callback 기반인 XMLHttpRequest를 사용한 코드에서처럼 Promise로 Wrapping 해주는 별도의 작업이 필요하지 않습니다.
// async 키워드로 비동기 함수(Promise 반환)를 정의해주고,
// 적절한 곳에서 await 키워드로 async 함수를 호출해주면,
// async 함수의 비동기 작업이 완료되어 반환된 Promise애 이어서 작업하게 됩니다.

// response 데이터를 parsing하여 리턴하는 함수를 async 함수로 정의.
const parseResponse = async (response) => {
  // async 함수
  const { status } = response;
  let data;

  if (status !== 204) {
    data = await response.json(); // response.json() 작업이 완료될 때까지 기다림
  }

  return {
    status,
    data,
  };
};

// ↓ request 메서드 ↓
const request = async (params) => {
  const { method = "GET", url, headers = {}, body } = params;

  const config = {
    method,
    headers: new window.Headers(headers),
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await window.fetch(url, config);

  return parseResponse(response);
};

// Representational State Transfer(웹 서비스 아키텍처 스타일)
// ↓ RESTful HTTP 메서드 구현 ↓
// 1. GET 메서드 - DB에서 가져온 정보 읽기
const get = async (url, headers) => {
  const response = await request({
    url,
    headers,
    method: "GET",
  });

  return response.data;
};

// 2. POST 메서드 - DB에 새로운 record 넣기(생성)
const post = async (url, body, headers) => {
  const response = await request({
    url,
    headers,
    method: "POST",
    body,
  });
  return response.data;
};

// 3. PUT 메서드 - DB의 특정 record 교체
const put = async (url, body, headers) => {
  const response = await request({
    url,
    headers,
    method: "PUT",
    body,
  });
  return response.data;
};

// 4. PATCH 메서드 - DB의 특정 record에서 일부분 교체(수정)
const patch = async (url, body, headers) => {
  const response = await request({
    url,
    headers,
    method: "PATCH",
    body,
  });
  return response.data;
};

// 5. DELETE 메서드 - DB의 특정 record 삭제
const deleteRequest = async (url, headers) => {
  const response = await request({
    url,
    headers,
    method: "DELETE",
  });
  return response.data;
};

export default {
  get,
  post,
  put,
  patch,
  delete: deleteRequest,
};
