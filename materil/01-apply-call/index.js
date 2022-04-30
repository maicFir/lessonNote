
/**
 * 实现一个mycall
 */
Function.prototype.mycall = function(ctx) {
  if (this !== 'function') {
    return new Error('this is not function');
  }
  const context = ctx || window;
  // 改变当前的函数的this指向
  context.fn = this; // {fn: f}
  const arg = [...arguments].slice(1); // 获取第二个参数 arguments [{},xxx,xxx,xxx]
  const result = context.fn(...arg);
  Reflect.deleteProperty(context, 'fn');
  return result;
}
/**
 * 实现一个mybind
 */
Function.prototype.myAplay = function(ctx) {
  if (typeof this !== 'function') {
    return new Error('this is not function');
  }
  const context = ctx || window;
  let result = null;
  context.fn = this;
  // arguments[1] 获取数组
  if (arguments[1]) {
    result = context.fn(...arguments[1]);
  } else {
    result = context.fn();
  }
  Reflect.deleteProperty(context, 'fn');
  return result;
}
/**
 * 实现一个mybind
 * @param  {...any} arr 
 */

Function.prototype.mybind = function(ctx) {
  if (typeof this !== 'function') {
    return new Error('this is not function')
  }
  const arg = [...arguments].slice(1); // 获取第二参数
  const self = this;
  // 返回一个函数
  return function() {
    return self.call(ctx, [...arg, ...arguments])
  }
}
function test (...arr) {
  this.name = 'test';
  console.log(...arr);
}
test.mycall({}, 1,2,3,4)
test.myAplay({}, [1,2,4,5]);
