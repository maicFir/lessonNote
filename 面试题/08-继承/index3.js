/**
 * 组合式继承
 */
function Parent() {
  this.name = "parent";
  this.play = [1, 2, 3];
}
Parent.prototype.say = function () {
  return this.name;
};

function Son() {
  Parent.call(this);
  this.type = "son";
}

// 调用Parent构造函数
Son.prototype = new Parent();

Son.prototype.constructor = Son;
const son = new Son();
son.play.push(4);
const son2 = new Son();
console.log("son:", son.name, son.play);
console.log("son2", son.name, son2.play, son2.say());
