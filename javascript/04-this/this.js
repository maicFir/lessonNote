/**
 * 面相对象 this
 */
function f() {
  return this.name
}
var A = {
  name: '123',
  getName() {
    return `A: ${this.name}`
  },
  descption: f
}
var B = {
  name: '456',
  descption: f
}
B.getName = A.getName;

var C = A.getName;

console.log('A:'+ A.getName()); // A: 123
console.log(`B: ${B.getName()}`); // 456
console.log(`C: ${C()}`) // undefined
console.log(`A: ${A.descption()}, B: ${B.descption()}`);


var Cs = {
  name: 'maic',
  descption: function() {
    console.log(`f: ${this}`)
    return this.name;
  }
}
var name = 'tom'; // window.name === tom  true 控制台下是true,node环境下就是false
var fs = Cs.descption;
console.log(`f: ${fs()}`); // tom

var obj = {
  a: '123',
  name: 'obj',
  b: {
    name: 'b',
    b2() {
      return this.name
    }
  }
}

console.log(obj.b.b2()); // b
var name = 'jack';
var obj2 = obj.b.b2; // 内部this指向window
console.log( 'obj2:', obj2()); // 内部this指向window

// var obj3 = {
//    f1() {
//      console.log(this); // this === obj2
//      var f2 = function() {
//        console.log(this); // window
//      }
//      f2();
//    }
// }
// 等价于
var ff = function() {
  console.log(this); // window
}
var obj3 = {
   f1() {
     console.log(this); // this === obj2
     var f2 =  ff;
     f2();
   }
}

obj3.f1();

// 严格模式,访问顶层对象就会报错
// var Counter = {
//   count: 0
// }
// Counter.inc = function() {
//   'use strict'
//    this.count++;
//    console.log(`count:${this.count}`);
// }
// var f1 = Counter.inc;
// f1();

// 改变this指向的三种方式 call,apply,bind

var obj = {
  age: 18
};

var f3 = function() {
  return this;
}
// console.log(f3() === window); // 浏览器环境下true
console.log(f3.call(obj) === obj);

var f4 = function(a,b) {
  console.log(this.age);
  console.log(`arg=${a+b}`);
}
f4.call(obj, 2,3);
f4.apply(obj, [5,6]);

/**
 * 构造函数继承
 */

function Parent() {
  this.name = 'parent';
  this.say = function() {
    console.log('hello'+this.name);
  }
}
// 让子类继承父类
function Child() {
  Parent.call(this)
}
Child.prototype = Object.create(Parent.prototype);

Child.prototype.constructor = Child;

const c = new Child();

console.log(c.name)



