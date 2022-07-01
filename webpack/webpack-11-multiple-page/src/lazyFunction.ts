import { memorize } from './memorize';
/**
 * @desption 懒加载可执行函数
 * @param {*} factory
 * @returns
 */
export const lazyFunction = (factory: callBack) => {
  const fac: any = memorize(factory);
  const f = (...args: unknown[]) => fac()(...args);
  return f;
};
