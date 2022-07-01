// 分时函数
module.exports = (sourceArr: any[] = [], callback: (args: unknown) => void, count = 1, wait = 200) => {
  let ret: any,
    timer: any = null;
  const renderData = () => {
    for (let i = 0; i < Math.min(count, sourceArr.length); i++) {
      // 取出数据
      ret = sourceArr.shift();
      callback(ret);
    }
  };
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
      }, wait);
    }
  };
};
