export default (container) => {
  const tech = () => {
    container.textContent = "This is Default Page: 🧑🏻‍💻개발";
  };

  const design = () => {
    container.textContent = "This is Design Page: 🎨디자인";
  };

  const career = () => {
    container.textContent = "This is Career Page: 🧑🏻‍💼채용 바로가기";
  };

  // 매개변수가 있는 컴포넌트 추가
  const detail = (params) => {
    const { id } = params;
    container.textContent = `This is Detail Page with Id ${id}`;
  };
  const anotherDetail = (params) => {
    const { id, anotherId } = params;
    container.textContent = `This is Detail Page with Id ${id} \n and AnotherId ${anotherId}`;
  };

  const notFound = () => {
    container.textContent = "Page Not Found!";
  };

  return {
    tech,
    design,
    career,
    detail,
    anotherDetail,
    notFound,
  };
};
