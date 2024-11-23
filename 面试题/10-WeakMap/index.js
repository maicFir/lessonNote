/**
 * WeakMap 是一种特殊的 Map，它的键只能是对象，而不能是其他类型的值。
 * WeakMap 中的键都是弱引用，即垃圾回收机制不考虑 WeakMap 对该对象的引用，不能被forEach遍历。
 * 没有Size属性。
 */
const weakMap = new WeakMap();

const obj1 = { name: "obj1" };
const obj2 = { name: "obj2" };

weakMap.set(obj1, "value1");
weakMap.set(obj2, "value2");

console.log(weakMap.get(obj1));

// 删除
weakMap.delete(obj2);
console.log(weakMap.get(obj2));
