/**
 * @desption 判断基础数据类型以及引用数据类型，替代typeof
 * @param {*} val
 * @returns
 */
export const isType = (val: string | object | number | any[]) => {
  return (type: string) => {
    return Object.prototype.toString.call(val) === `[object ${type}]`;
  };
};
