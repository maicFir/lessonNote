const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isProduction = process.env.NODE_ENV;
console.log(isProduction);
const entry = {
  index: "./index.js",
  index2: "./index2.js",
  index3: "./index3.js",
};
const multipeHtmlPlugin = () => {
  const entryKeys = Object.keys(entry);
  return entryKeys.map(
    (key) =>
      new HtmlWebpackPlugin({
        inject: true,
        template: `./public/${key}.html`,
        filename: `${key}.html`, // 这里不能加文件夹例如:example/${key}.html
        chunks: [key],
        title: `${key} page`,
      })
  );
};
module.exports = {
  context: __dirname,
  entry,
  // experiments: {
  //   outputModule: true,
  // },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js"],
  },
  plugins: [...multipeHtmlPlugin()],
  devServer: {
    port: 3000,
  },
};
