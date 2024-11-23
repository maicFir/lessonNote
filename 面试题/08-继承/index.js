/**
 * // 原型链继承
 * @param {*} name
 *
 * 弊端: 1. 原型链继承多个实例的引用类型属性指向相同，被一个实例修改，其他实例也会受到影响
 */
function Person(name) {
  this.name = name;
  this.number = [1, 2];
  this.say = function () {
    return this.name;
  };
}
Person.prototype.say2 = function () {
  return this.name;
};
const xiaoming = new Person("xiaoming");

console.log("xiaoming:", xiaoming.name);

// 原型继承

function Tom() {
  this.address = "beijing";
  // 会覆盖Person中的属性，以当下这个属性为主
  this.name = "jake";
}

Tom.prototype = new Person("Tom");
// 会覆盖Person.prototype.say2方法
Tom.prototype.say2 = function () {
  return this.name + " " + this.address;
};

const tom = new Tom();
const tom2 = new Tom();
tom.number.push(3);

console.log("tom:", tom.name, tom.say(), tom.say2());
console.log("address:", tom.address);
console.log("tom:number:", tom.number);
console.log("xiaoming:number:", xiaoming.number);
console.log("tom2:", tom2.number);
