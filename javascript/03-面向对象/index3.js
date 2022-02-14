// 实现new
function mynew(constuct, params) {
    const args = [].slice.call(arguments);
    // 获取构造函数
    const curentConstr = args.shift();
    const ctx = Object.create({});
    ctx.__prototype__ = curentConstr.prototype;
    const ret = curentConstr.call(ctx, ...args);
    if (typeof ret === 'object' && ret !== null) {
        return ret;
    }
    return ctx;
}
function Person(name, age) {
    this.name = name;
    this.age = age;
}
const t = mynew(Person, 'Maic', 18);
console.log(t);