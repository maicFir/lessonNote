const { watch } = require('gulp');
const path = require('path');
const browserSync = require('browser-sync');
const { pathDir, targetDest, rootDir } = require('./common.js');
const taskDevServer = (taskBuild) => {
  return (options = {}) => {
    const defaultOption = {
      port: '8081', //设置端口
      open: true,  // 自动打开浏览器
      files: `${rootDir}/${targetDest}/*`, // 当dist文件下有改动时，会自动刷新页面
      server: {
        baseDir: `${rootDir}/${targetDest}` // 基于当前dist目录
      },
      ...options
    }
    // 监听public所有目录下，只要文件发生改变，就重新加载
    watch(pathDir('public'), taskBuild);
    const server = browserSync.create();
    server.init(defaultOption);
  }

}
module.exports = taskDevServer;