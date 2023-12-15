const parseResponse = async (response) => {
  const { status } = response;
  let data;
  if (status !== 204) {
    data = await response.json();
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
