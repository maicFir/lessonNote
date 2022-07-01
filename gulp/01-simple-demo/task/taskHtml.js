const { src, dest } = require('gulp');
const { pathDir, basePath, targetDest } = require('./common.js');
const taskHtml = () => {
  return src(pathDir('public/index.html'), basePath).pipe(dest(pathDir(targetDest)))
}
module.exports = taskHtml;