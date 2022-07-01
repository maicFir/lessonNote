import * as path from 'path';
import * as webpack from 'webpack';
const { merge } = require('webpack-merge');
const HtmlWebpackPlguin = require('html-webpack-plugin');
const webpackCommon = require('./webpack.common');

const devConfig: webpack.Configuration = merge(webpackCommon, {
  entry: {
    index: path.join(__dirname, '../example/index.ts') // 以测试页面example
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlguin({
      inject: true,
      filename: 'index.html', // 只能是文件名 不能是xxx/index.html 会造成页面模版加载ejs解析错误
      template: path.resolve(__dirname, '../example/index.html'),
      title: 'example'
    })
  ]
});
module.exports = devConfig;
