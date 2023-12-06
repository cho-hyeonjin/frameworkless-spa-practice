function component() {
  const element = document.createElement("div");

  // 아래 라인 동작을 위해서는 lodash 라이브러리를 install해야 함.
  element.innerHTML = _.join(["Hello", "webpack"], " ");

  return element;
}

document.body.appendChild(component());
