const babelCore = require('@babel/core');

module.exports = function (content) {
  // 获取options
  const options = this.getOptions();
  // 必须异步方式
  const callback = this.async();
  // 转换es6
  babelCore.transform(content, options, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res.code);
    }
  })
}