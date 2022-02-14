
// 定义空间
function Person(name) {
    this.name = name; // 人的名字
    // 可以说话
    this.say = function () {
        console.log(`我的名字：${this.name}`)
    };
    // 可以吃饭
    this.eat = function () {
        console.log(`今天我要吃黄焖鸡`);
    }
}
var person = new Person('Maic');
var person2 = new Person('张三');

console.log(person);
console.log(person2);

// 实现一个new
function mynew(constructor, params) {
    // 获取参数
    const args = [].slice.call(arguments);
    const curentConstr = args.shift();
    // 创建一个对象
    const obj = Object.create({});
    // 调用构造函数,改变构造函数内部的this
    const ret = curentConstr.call(obj, ...args);
    if (typeof ret === 'object' && ret !== null) {
        return obj;
    }
    return obj;
}
function Person2(name, age) {
    this.name = name;
    this.age = age;
}
const ret = mynew(Person2, 'name', 12);
console.log(ret);
