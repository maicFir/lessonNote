
const { src, dest } = require('gulp');
const less = require('gulp-less');
const uglifycss = require('gulp-uglifycss');
const { pathDir, basePath, targetDest } = require('./common.js');
// todo less任务 
const taskLess = () => {
  return src(pathDir('public/css/*.less'), basePath).pipe(less()).pipe(uglifycss()).pipe(dest(pathDir(targetDest)))
}
module.exports = taskLess;