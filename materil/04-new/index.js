/**
 * 实现一个new操作符
 * 
 * 1、创建一个对象
 * 
 * 2、将对象的__propto__与构造函数联系起来
 * 3、改变构造函数内部的this,并执行构造函数
 * 4、返回这个对象
 * 
 * 本质上new 构造函数就是做了下面三件事
 * const obj = {};
 * obj.__proto__ = fn.prototype;
 * // 执行构造函数，并改变fn的this
 * fn.call(obj, ...arg)
 */
function mynew(fn, ...arg) {
  // 构建一个对象
  const obj = {};
  // 将对象的构造函数__proto__与函数的prototype进行绑定
  Object.setPrototypeOf(obj, fn.prototype);
  // 执行构造函数，并改变内部的this
  const result = fn.call(obj, ...arg);
  return typeof result === 'object' ? result : obj;
}
function mynew2() {
  const obj = new Object();
  const fn = [].shift.call(arguments);
  obj.__proto__ = fn.prototype;
  const result = fn.call(obj, ...arguments);
  return typeof result === 'object' ? result : obj;
}

