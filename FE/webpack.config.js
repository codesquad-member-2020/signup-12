const path = require("path");
module.exports = {
  entry: "./src/join.js",
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "join_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};