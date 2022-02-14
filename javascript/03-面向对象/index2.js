// 实现一个new
function mynew(constructor, params) {
    const args = [].slice.call(arguments);
    const curentConstr = args.shift();
    // 创建一个对象，继承构造函数的原型
    const ctx = Object.create(curentConstr.prototype);
    // 调用构造函数
    const ret = curentConstr.call(ctx, ...args);
    if (typeof ret === 'object' && ret !== null) {
        return ret;
    }
    return ctx
};
function Person(name, age) {
    this.name = name;
    this.age = age;
}
const ret = mynew(Person, 'Maic', 18);
console.log(ret); // { name: 'Maic', age: 18 }