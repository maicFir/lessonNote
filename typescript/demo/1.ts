const msg: string = "hello";
console.log(msg.toLocaleLowerCase());

function curentYear(year: string, date: Date) {
    return `今年${year}, ${date.toLocaleDateString()}`;
}
curentYear('100', new Date());

function prirntName(name: string, age?: number) {
    console.log(`name:` + name);
    console.log(`age:`+age);
}
prirntName('maic');

// 联合类型
function printId(id: string | number) {
    console.log(id);
}
printId('123');

// 定义接口
interface Animal {
    name: string
}
// 继承Animal
interface Bear extends Animal {
    age: number
}
const bear: Bear = {name: 'test', age: 10};
console.log(bear.age);

// 定义类型,通过交集扩展类型
type Animal2 = {
  name: string
}
type bear2 = Animal2 & { age: number }

// 类型收展
function paddLeft(padding:number | string, input: string): string {
    if (typeof padding === 'string') {
        return padding
    }
    return input
}
// in操作符收展
type Fish = {
    swim: () => void
}
type Bird = {
    fly: () => void
}
function move(animal: Fish | Bird) {
    if ('swim' in animal) {
        return animal.swim()
    }
    return animal.fly;
}
// is收展
function isFish(pet: Fish | Bird): pet is Fish {
    return (pet as Fish).swim !== undefined;
}
interface Circle {
    kind: string;
    radius: number
}
interface Squere {
    kind: string;
    slide: number
}
type Shape = Circle & Squere;
function getArea(shape: Shape) {
    return shape.kind;
} 
// 函数
function gretter(fn: (a: string) => void) {
    fn('hello')
}
function printConsole(s: string) {
    console.log(s);
}
gretter(printConsole);

type DesciableFunction = {
    desption: string;
    (someArg: number): boolean
}
function dosomethings(fn: DesciableFunction) {
    console.log(fn.desption, fn(123));
}
// 构造函数
type SomeConstructor = {
    new(s: string): string
}
// 泛型函数
function firstElement<Type>(arr: Type[]): Type {
    return arr[0]
}
const s1 = firstElement([1, 2]);
const s2 = firstElement(['a', 'b']);
console.log(s2, s1);
function map<Input, Output>(arr: Input[],func: (arg: Input) => Output): Output[] {
    return arr.map(func)
}
const parsed = map(['1', '2', '3'], (n) => parseInt(n));
// 比较两个元素的大小
function longTest<Type extends {length: number}>(a: Type, b: Type) {
    if (a.length > b.length) {
        return a;
    } else {
        return b;
    }
}
const t = longTest([1, 2], [1, 2, 3]);

function minLength<Type extends { length: number}>(obj: Type, minum: number): Type {
    if (obj.length >= minum) {
        return obj;
    }
    // return {
    //     length: minum
    // }
}
function greet<Str extends string>(s: Str) {
    console.log('hello'+s);
}
greet('word');

// 可选项
function f(n?: number) {
    console.log(n.toFixed(2));
    console.log(n.toString());
}
f(10);

function my_for_each(arr: any[], callback: (arg: any, index?: number) => void) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i], i);
    }
}
my_for_each(['a', 'b', 'c', '4'], (a, i) => {
    console.log(a, i);
});