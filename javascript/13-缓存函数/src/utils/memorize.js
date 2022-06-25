
/**
 * @desption 缓存函数
 * @param {*} callback 
 * @returns 
 */
export const memorize = callback => {
  let cache = false;
  let result = null;
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
  }
}
/**
 * @desption 懒加载可执行函数
 * @param {*} factory 
 * @returns 
 */
export const lazyFunction = (factory) => {
  const fac = memorize(factory);
  const f = (...args) => fac()(...args);
  return f;
}

