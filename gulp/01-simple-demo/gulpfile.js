const { series } = require('gulp');
const { injectHtml, taskDevServer, taskHtml, taskImage, taskJS, taskLess } = require('./task/index.js')

// series组合多个任务
const seriseTask = series(taskHtml, taskJS, taskLess, taskLess, taskImage, injectHtml);
// 本地服务
const devServer = taskDevServer(seriseTask);
// 启动服务
const server = () => {
  devServer({
    port: 9000
  });
}
const taskBuild = seriseTask;
const defaultTask = (cb) => {
  console.log('hello gulp')
  cb();
}
exports.default = defaultTask;
exports.server = server;
exports.build = taskBuild;
