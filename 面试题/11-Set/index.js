/**
 * Set 对象是值的集合，你可以按照插入的顺序迭代它的元素。
 */

const set = new Set();

// 添加值
set.add("name");
set.add("age");

set.has("name");

// 删除值
set.delete("name");

console.log("size", set.size);

// 转换成数组
console.log([...set], Array.from(set));

// difference

const set1 = new Set([1, 2, 3]);
const set2 = new Set([2, 3, 4]);

// 求差集,在set1中不在set2中的值
const difference = set1.difference(set2);
console.log("difference", [...difference]);

// 求交集
const intersection = set1.intersection(set2);

console.log("intersection", [...intersection]); // 2,3

// 判断一个值与另外一个值是否有交集 没有交集返回true,否则返回false
set1.isDisjointFrom(set2); // false

// 子集 set1是否只set2的子集
console.log(set1.isSubsetOf(set2)); // false

// 超集 set1是否为set2的超集
console.log(set1.isSupersetOf(set2)); // false

const unionObj = set1.union(set2);

// 并集
console.log("unionObj", [...unionObj]); // 1,2,3,4
