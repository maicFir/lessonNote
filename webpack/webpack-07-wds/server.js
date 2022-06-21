const webpack = require('webpack');
const path = require('path');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');

// webpack处理入口配置相关文件
const compiler = webpack(webpackConfig);
// devServer的相关配置
const devServerOption = {
  port: 8081,
  // static: {
  //   directory: path.join(__dirname, 'public')
  // },
  // compress: true // 开启gizps压缩public中的html
};

const server = new webpackDevServer(devServerOption, compiler);

const startServer = async () => {
  console.log('server is start');
  await server.start();
}
startServer();