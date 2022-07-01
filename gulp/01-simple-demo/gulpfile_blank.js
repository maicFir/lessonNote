
const { src, dest, series, watch } = require('gulp');
const less = require('gulp-less');
const image = require('gulp-image');
const babel = require('gulp-babel');
const teser = require('gulp-terser');
const uglifycss = require('gulp-uglifycss');
const inject = require('gulp-inject');
const browserSync = require('browser-sync');
const path = require('path');
const pathDir = (dir) => {
  return path.resolve(__dirname, dir);
}
const basePath = {
  base: './public'
};
// todo html
const taskHtml = () => {
  return src(pathDir('public/index.html'), basePath).pipe(dest(pathDir('dist')))
}
// todo js任务
const taskJS = () => {
  return src(pathDir('public/**/*.js', basePath)).pipe(babel({
    presets: ['@babel/preset-env']
  })).pipe(teser({
    mangle: {
      toplevel: true // 混淆代码
    }
  })).pipe(dest(pathDir('dist')))
}
// todo less任务 
const taskLess = () => {
  return src(pathDir('public/css/*.less'), basePath).pipe(less()).pipe(uglifycss()).pipe(dest(pathDir('dist')))
}
// todo 图片资源，有压缩，并输出到对应的dist/images文件夹下
const taskImage = () => {
  return src(pathDir('public/images/*.*'), basePath).pipe(image()).pipe(dest(pathDir('dist')))
}
// 将css,js插入html中
const injectHtml = () => {
  // 目标资源
  const targetSources = src(['./dist/**/*.js', './dist/**/*.css']);
  // 目标html
  const targetHtml = src('./dist/*.html')
  // 把目标资源插入目标html中，同时输出到dist文件下
  const result = targetHtml.pipe(inject(targetSources, { relative: true })).pipe(dest('dist'));
  return result
}
// series组合多个任务
const seriseTask = series(taskHtml, taskJS, taskLess, taskLess, taskImage, injectHtml);

const taskBuild = seriseTask;
// 本地服务
const taskDevServer = () => {
  // 监听public所有目录下，只要文件发生改变，就重新加载
  watch(pathDir('public'), taskBuild);
  const server = browserSync.create();
  server.init({
    port: '8081', //设置端口
    open: true,  // 自动打开浏览器
    files: './dist/*', // 当dist文件下有改动时，会自动刷新页面
    server: {
      baseDir: './dist' // 基于当前dist目录
    },

  })
}


const defaultTask = (cb) => {
  console.log('hello gulp')
  cb();
}

exports.default = defaultTask;
exports.taskJS = taskJS;
exports.taskLess = taskLess;
exports.taskImage = taskImage;
exports.taskDevServer = taskDevServer;
exports.taskBuild = taskBuild;
