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

  const notFound = () => {
    container.textContent = "Page Not Found!";
  };

  return {
    tech,
    design,
    career,
    notFound,
  };
};
