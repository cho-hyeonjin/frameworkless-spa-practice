const path = require("path");

module.exports = {
  mode: "none",
  entry: "./src/index.js", // 입구 역할 파일
  output: {
    filename: "main.js", // dependency graph 바탕으로 엮어낸 결과물(번들) - 정적 파일
    path: path.resolve(__dirname, "dist"), // 번들 저장 위치
  },
};
