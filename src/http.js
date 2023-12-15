// 이 파일은 XMLHttpRequest API를 이용한 HTTP Client 파일입니다.
// XMLHttpRequest는 CallBack을 기반으로 합니다.
// > HTTP(Hyper Text Transfer Protocol)의 Client Side에서 사용하는 API(라이브러리, 모듈 - XMLHttpRequest, Fetch, Axios같은 것들)는
//   대부분 Promise를 기반으로 하기 때문에 이 코드 또한 Promise를 이용하여 구현되었습니다.
// 이 코드(XMLHttpRequest API로 구현한 HTTP Client)에서의 핵심이 되는 코드는 request 메서드입니다.
// 아래로 내려가 살펴보겠습니다.

const setHeaders = (xhr, headers) => {
  Object.entries(headers).forEach((entry) => {
    const [name, value] = entry;

    xhr.setRequestHeader(name, value);
  });
};

const parseResponse = (xhr) => {
  const { status, responseText } = xhr;

  let data;
  if (status !== 204) {
    data = JSON.parse(responseText);
  }

  return {
    status,
    data,
  };
};

// ↓ request 메서드 ↓
const request = (params) => {
  // XMLHttpRequest를 Promise 객체로 Wrapping 했습니다.
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest(); // XMLHttpRequest객체 생성

    const { method = "GET", url, headers = {}, body } = params;

    xhr.open(method, url); // XMLHttpRequest 메서드. 요청 초기화 메서드.

    setHeaders(xhr, headers); // 위에서 정의한 요청 헤더 설정 메서드

    xhr.send(JSON.stringify(body)); // XMLHttpRequest 메서드. 요청 전송 메서드. (stringify메서드로 Javascript → JSON 변환)

    xhr.onerror = () => {
      // XMLHttpRequest 이벤트. 전송된 요청이 오류를 일으켰을 때 발생.
      reject(new Error("HTTP Error")); // Promise의 status가 rejected인 경우 onerror가 rejected 실행
    };

    xhr.ontimeout = () => {
      // XMLHttpRequest 이벤트. 요청에 대한 응답에 소요된 시간이 사전에 지정한 값을 초과해서 취소될 때 발생.
      reject(new Error("Timeout Error")); // Promise의
    };

    xhr.onload = () => resolve(parseResponse(xhr)); // XMLHttpRequest 이벤트. XMLHttpRequest 트랜잭션이 성공적으로 끝나면 발생.
  });
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
