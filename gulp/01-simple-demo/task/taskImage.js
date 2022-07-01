const { src, dest } = require('gulp');
const image = require('gulp-image');
const { pathDir, basePath, targetDest } = require('./common.js');
// todo 图片资源，有压缩，并输出到对应的dist/images文件夹下
const taskImage = () => {
  return src(pathDir('public/images/*.*'), basePath).pipe(image()).pipe(dest(pathDir(targetDest)))
}
module.exports = taskImage;