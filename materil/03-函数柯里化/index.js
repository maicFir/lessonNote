/**
 * 函数柯里化，本质上就是将一个参数很多的函数分解成单一的多个函数
 */

// 案例1
function add (a, b) {
  return a+b
}

function sum(a) {
  return function(b) {
    return a+b
  }
}
sum(1)(2);

// 案例2

function checkStr (reg, val) {
  return reg.test(val)
}
const isNum = checkStr(/\d/g, 123);
const isStr = checkStr(/[a-z]+/g, 'abc');

// 函数柯里化
function checkStr2(reg) {
  return function(val) {
    return reg.test(val)
  }
}
const check = checkStr2(/\d/g);
const check2 = checkStr2(/[a-z]+/g);

const isNum2 = check(123);
const isStr2 = check2('abc');

// 实现自定义添加事件
const addEvent = (el, event, handle) => {
  if (document.addEventListener) {
      el.addEventListener(event, handle, false);
  } else {
    el.attachEvent(event, handle)
  }
}