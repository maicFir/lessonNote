/**
 * 柯里化函数
 */
function setRect(w) {
  return function (h) {
    return w * h;
  };
}
const setRect1 = setRect(100);
const setRect1_area = setRect1(100);
console.log("area:", setRect1_area);

/**
 *
 * 模拟私有方法
 */

const counter = (function () {
  let count = 0;
  const addCount = function () {
    count++;
  };
  const reduceCount = function () {
    count--;
  };
  return {
    add() {
      addCount();
    },
    reduce() {
      reduceCount();
    },
    get() {
      return count;
    },
  };
})();

counter.add();
console.log(counter.get());
counter.reduce();
console.log(counter.get());
