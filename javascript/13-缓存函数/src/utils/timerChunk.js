// 分时函数
module.exports = (sourceArr = [], callback, count = 1, wait = 200) => {
  let ret, timer = null;
  const renderData = () => {
    for (let i = 0; i < sourceArr.length; i++) {
      // 取出数据
      ret = sourceArr.shift();
      callback(ret);
    }
  }
  return () => {
    if (!timer) {
      // 利用定时器每隔200ms取出数据
      timer = setInterval(() => {
        // 如果数据取完了，就清空定时器
        if (sourceArr.length === 0) {
          clearInterval(timer);
          ret = null;
          return;
        }
        renderData();
      }, wait)
    }
  }
}