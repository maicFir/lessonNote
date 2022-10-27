import { isType } from './isType';
import { memorize } from './memorize';
/**
 * @desption 深拷贝一个对象
 * @param {*} obj
 * @param {*} targets
 */
export const mergeDeep = (obj: object, targets: object) => {
  const descriptors = Object.getOwnPropertyDescriptors(targets);
  // todo 针对不同的数据类型做value处理
  const helpFn = (val: any) => {
    if (isType(val)('String')) {
      return val;
    }
    if (isType(val)('Object')) {
      return Object.assign(Object.create({}), val);
    }
    if (isType(val)('Array')) {
      const ret: any[] = [];
      // todo 辅助函数，递归数组内部, 这里递归可以考虑用分时函数来代替优化
      const loopFn = (curentVal: any[]) => {
        curentVal.forEach((item) => {
          if (isType(item)('Object')) {
            ret.push(helpFn(item));
          } else if (isType(item)('Array')) {
            loopFn(item);
          } else {
            ret.push(item);
          }
        });
      };
      loopFn(val);
      return ret;
    }
  };
  for (const name of Object.keys(descriptors)) {
    // todo 根据name取出对象属性的每个descriptor
    const descriptor = descriptors[name];
    if (descriptor.get) {
      const fn = descriptor.get;
      Object.defineProperty(obj, name, {
        configurable: false,
        enumerable: true,
        writable: true,
        get: memorize(fn) // 参考https://github.com/webpack/webpack/blob/main/lib/index.js
      });
    } else {
      Object.defineProperty(obj, name, {
        value: helpFn(descriptor.value),
        writable: true
      });
    }
  }
  return obj;
};
