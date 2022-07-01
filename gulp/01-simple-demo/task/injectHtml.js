const { src, dest } = require('gulp');
const inject = require('gulp-inject');
const { targetDest, rootDir } = require('./common.js');
// 将css,js插入html中
const injectHtml = () => {
  // 目标资源
  const targetSources = src([`${rootDir}/${targetDest}/**/*.js`, `${rootDir}/${targetDest}/**/*.css`]);
  // 目标html
  const targetHtml = src(`${rootDir}/${targetDest}/*.html`)
  // 把目标资源插入目标html中，同时输出到dist文件下
  const result = targetHtml.pipe(inject(targetSources, { relative: true })).pipe(dest(targetDest));
  return result
}
module.exports = injectHtml;