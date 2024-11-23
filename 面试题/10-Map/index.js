/**
 *
 * Map对象值键值对的集合
 *
 * key可以是任意类型
 */

const map = new Map();

// 设置值
map.set("name", "张三");
map.set("age", "18");
const xiaom = {};
// 用对象当作key
map.set(xiaom, "xiaoming");

// for...of 循环
for (const [key, value] of map) {
  console.log(key, value);
}

// keys或者values获取的是一个MapIterator对象，需要通过扩展运算符转化为数组
const keys = map.keys();
const value = map.values();
console.log(`keys:${[...keys]}, values:${[...value]}`);

// 判断这个key是否在对象中,返回的是一个MapIterator对象
console.log(map.has(xiaom), map.has("name"));

// 获取值
console.log(map.get(xiaom), map.get("name"));

// 删除值
console.log(map.delete("name")); // 返回true表示删除成功

console.log(map.get("name")); // 返回undefined

// entries
console.log("entries", map.entries());

console.log("obj", Object.fromEntries(map.entries()));

// 长度
console.log("size", map.size);

// 清空所有的key
map.clear();

const data = [
  { name: "tom", age: 5, num: 2 },
  { name: "tom2", age: 8, num: 1 },
  { name: "tom3", age: 10 },
  { name: "tom4", age: 1 },
];

const lessThen = true;
let moreThen = false;
// 会以lessThen与moreThen进行分组
const result = Map.groupBy(data, ({ age }) => {
  return age < 10 ? lessThen : moreThen;
});

console.log(result.get(lessThen));
console.log(result.get(moreThen));
