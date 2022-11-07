
var a = 1;
var b = a;
b = 2;
console.log(`a:${a}`, `b:${b}`)
/**
 * a:1,b:2
 * a是基础数据类型，存放在栈内存中，当a赋值给b后，修改b的值不会影响a的值
 */

const obj = { c: 1 };
const obj2 = obj;
obj2.c = '22';

console.log(obj.c, obj2.c)
/**
 * 因为obj定义的是一个引用数据类型，存放在堆内存中，当obj被直接赋值给obj2时，此时obj2与obj是同一份引用地址，
 * 
 * 当我们修改obj2.c的值改变时，那么obj的值也会改变
 * 
 * 所以此时打印的结果就是22,22
 */

const obj3 = { name: 'Maic', info: { name: 'Web技术学苑' } }

const obj4 = { ...obj3 };

obj4.name = 'Tom';
obj4.info.name = 'infoQ';
/**
 * ...是一个扩展运算符，在es6中是一个浅拷贝，只会拷贝一层，当对象中的值是一个引用数据类型时，修改新值会改变原有的值
 * 当修改obj4.name时，因为原数据name的值是基础数据类型，所以修改新值并不会修改原有的值
 * 当修改obj4.info.name时，因为info的值是一个引用数据类型，es6的扩展运算符是一个浅拷贝，所以新值修改，会影响原有值
 */
console.log(`obj3:${JSON.stringify(obj3, null, 2)}`, `obj4:${JSON.stringify(obj4, null, 2)}`);
/**
 * 
 * obj3:{
  "name": "Maic",
  "info": {
    "name": "infoQ"
  }
} obj4:{
  "name": "Tom",
  "info": {
    "name": "infoQ"
  }
}
 */