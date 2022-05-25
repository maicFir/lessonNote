type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

interface person {
  name: string;
  age: number;
  souce: number;
}
/**
 * MyPick<T,K>
 * 根据T,返回带有K的对象
 */
const stu1: MyPick<person, 'name'> = { name: 'Maic' };

console.log(stu1.name);
