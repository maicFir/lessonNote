const { marked } = require('marked');
module.exports = function (content) {
  // 解析md
  const ret = marked.parse(content)
  console.log(ret);
  return ret;
}