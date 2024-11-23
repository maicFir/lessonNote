/**
 * 构造函数继承, 解决了原型链继承的问题
 *
 * 弊端: 1. 无法实现复用，每次创建实例都会创建一遍方法
 *      2.父类prototype上面的方法，无法实现复用
 */

function Parent() {
  this.name = "parent";
  this.play = [1, 2, 3];
}
Parent.prototype.eat = function () {
  return this.name;
};

function Son() {
  Parent.call(this);
  this.type = "son";
}
const son = new Son();
const son2 = new Son();
const parent = new Parent();
son2.play.push(4);

// console.log(son.eat()) 无法使用
console.log("son:", son.name, son.play);
console.log("son2", son2.play);
