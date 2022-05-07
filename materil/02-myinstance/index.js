// 实现一个instanceof 
// [] instanceof Array true
function myinstanceof (left, right) {
  let pro = Object.getPrototypeOf(left);
  while(true) {
    if (!pro) return false;
    if (pro === right.prototype) return true;
    pro = Object.getPrototypeOf(pro);
  }
}
myinstanceof([], Array);

/**
 * 第二种方式
 */
function mystanceof2(obj1, obj2) {
  obj1 = obj1.__proto__;
  while(true) {
    if (!obj1) return false;
    if (obj1 === obj2.prototype) return true;
    obj1 = obj1.__proto__;
  }
}
mystanceof2([], Array);