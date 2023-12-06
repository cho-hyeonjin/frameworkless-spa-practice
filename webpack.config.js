const path = require("path");

module.exports = {
  mode: "none",
  entry: {
    main: "./src/main.js",
    detail: "./src/detail.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
