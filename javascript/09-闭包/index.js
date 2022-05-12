function A () {
  var name = 'Maic',age = 0;
  function B() {
      age++;
      console.log(name, age);
  }
  return B
}
// A()();
// A()();
var b1 = A();
b1();
b1();
// console.log(name)

/** 函数柯里化 */
function count() {
    const args = [...arguments].slice(0);
    return (arg2) => {
        const nargs = args.concat(arg2)
        return nargs.reduce((cur,prev) => cur+prev, 0)
    }
}
const sum = count(1)(2);
console.log(sum);
/**例子 */
function regKey(reg) {
  return (val) => {
     return reg.test(val) 
  }
}
const checkPhone = regKey(/^1[3,5,7,8,9]\d{9}$/);
const checkNum = regKey(/\d/);

const isPhone = checkPhone(13754123124) // true
const isNumber = checkNum(123); // true

