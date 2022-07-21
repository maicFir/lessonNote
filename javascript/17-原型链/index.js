function Person() {
  this.name = 'Maic';
  this.age = 18;
}
Person.prototype.say = function () {
  return `hello ${this.name}`
}
const person = new Person();
console.log(person.name);

console.log(person.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype);
console.log(Person.__proto__ === Function.prototype); // true
console.log(person.__proto__.__proto__ === Object.prototype);
console.log(person.__proto__.__proto__ === Function.prototype.__proto__);
console.log(Object.prototype.__proto__ === null); // true
console.log(Function.prototype === Object.__proto__); // true
console.log(Function.prototype === Person.__proto__); // true
console.log(Person.__proto__ === Object.__proto__); // true
console.log(Function.prototype.__proto__ === Object.prototype);// true
console.log(Function.prototype.__proto__ === Object.prototype); // true
