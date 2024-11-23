/**
 * WeakSet 是一种特殊的 Set，它的成员只能是对象，而不能是其他类型的值。
 * WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，
 * 如果没有其他变量或属性引用该对象，那么该对象会被垃圾回收。
 * WeakSet 不能遍历，也没有 size 属性。
 * WeakSet 适用于存储那些不需要长期引用的对象，例如 DOM 节点。
 *
 */
const weakSet = new WeakSet();

const obj1 = { name: "1" };
const obj2 = { name: "2" };

weakSet.add(obj1);
weakSet.add(obj2);
weakSet.delete(obj1);

console.log(weakSet.has(obj1));
