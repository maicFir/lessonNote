/**
 * @desption 缓存函数
 * @param {*} callback
 * @returns
 */

export const memorize = (callback: callBack) => {
  let cache = false;
  let result: unknown = null;
  return () => {
    // 如果缓存标识存在，则直接返回缓存的结果
    if (cache) {
      return result;
    } else {
      // 将执行的回调函数赋值给结果
      result = callback();
      // 把缓存开关打开
      cache = true;
      // 清除传入的回调函数
      callback = null;
      return result;
    }
  };
};
