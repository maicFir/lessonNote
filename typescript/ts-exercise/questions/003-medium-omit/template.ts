type MyOmit<T, K extends string | number | symbol> = {
  [P in Exclude<keyof T, K>]: T[P];
};

interface person {
  name: string;
  age: number;
}
/**
 * Omit<T, KEY>
 * 删除对象T中的KEY,返回T剩余参数
 */
const userName: MyOmit<person, 'age'> = { name: 'Maic' };

const userName2: Omit<person, 'age'> = { name: 'Maic' };

type personKey = keyof person; // type personKey = 'name' | 'age'
const person: personKey = 'name';
/**
 * Exclude<T, key>
 * 返回T中不包含key的所有元素
 */
type age = Exclude<personKey, 'name'>;
const newAge: age = 'age';
