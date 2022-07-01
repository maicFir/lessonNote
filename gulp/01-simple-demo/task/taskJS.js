const { src, dest } = require('gulp');
const babel = require('gulp-babel');
const teser = require('gulp-terser');
const { pathDir, targetDest, basePath } = require('./common.js')
// todo js任务
const taskJS = () => {
  return src(pathDir('public/**/*.js', basePath)).pipe(babel({
    presets: ['@babel/preset-env']
  })).pipe(teser({
    mangle: {
      toplevel: true // 混淆代码
    }
  })).pipe(dest(pathDir(targetDest)))
}
module.exports = taskJS;
