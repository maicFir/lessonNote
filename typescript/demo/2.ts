interface Person {
    name: string;
    age: number;
}
type Person22 = {
    name: string;
    age: number;
}
function greet(person: Person) {
    console.log(person.name, person.age);
}
function greet2(person: Person22) {
    console.log(person.age, person.name);
}
interface ColorFul {
    color: '#111'
}
interface Circle {
    background: '#ccc'
}
interface ColorCircle extends ColorFul, Circle { };
type ColorCircle2 = ColorFul & Circle;
const cc: ColorCircle;
const cc2: ColorCircle2;
console.log(cc.background);
console.log(cc2.color);
interface apple {
    age: number
}
interface Box<Type> {
    contents: Type
}
const box: Box<string> = {
    contents: 'hello'
}
const box2: Box<apple> = {
    contents: {
        age: 123
    }
}

function setContent<Type>(box: Box<Type>, newContent: Type) {
    box.contents = newContent;
}
setContent({contents: 'hello' }, 'test');
console.log(box.contents, '=contents');

interface Arrays<Type> {
    length: number;
    pop(): Type | undefined;
    push(): number;
}
function doSomeThings(value: Array<string>) {
    console.log(value);
}
const arr: string[] = ['hello', 'world'];

doSomeThings(arr);

function identify<Type>(arg: Type): Type {
    return arg;
}
identify(123);
interface IDENTIFY {
    <Type>(arg: Type): Type
}
interface IDENTIEY2<Type> {
    (arg: Type): Type
}
const myidentify: <Type>(arg: Type) => Type = identify;
myidentify('hello, world');

const myidentify2: { <Type>(arg: Type): Type } = identify;
const myidentify3: IDENTIFY = identify;
const myidentify4: IDENTIEY2<number> = identify;


myidentify2('123');
myidentify3('234');
myidentify4(123);

function logging<Type>(arg: Array<Type>): Array<Type> {
    console.log(arg.length);
    return arg;
}
logging([1, 2, 3]);

class Person2<ageType, nameType> {
    age: ageType;
    name: nameType;
    setAge(age: ageType): ageType {
        this.age = age;
        return this.age;
    }
    setName(name: nameType) {
        this.name = name;
        return this.name;
    }
}
const nperson = new Person2<number, string>();
nperson.setAge(18);
nperson.setName('maic');

// 约束泛型
function loggingIdentify<Type extends {length: number}>(arg: Type) {
    console.log(arg.length);
    return arg;
}
function getPrototype<Type, Key extends keyof Type>(obj: Type, key: Key) {
    return obj[key]
}
let x = { a: 1, b: 2, c: 3 };
const a = getPrototype(x, 'a');
getPrototype(x, 'b');
console.log(a);
class Mounse {
    name: string;
}
function create<Type>(c: {new (): Type}): Type {
    return new c();
}
function create2<Type>(c: new() => Type): Type {
    return new c();
}
console.log(create(Mounse).name, create2(Mounse).name);

class Animal {
    name: string;
    setName(name) {
        this.name = name;
    }
}
class BeeKeeper {
    hasMask: boolean = true;
}
class Bee extends Animal {
    keep: BeeKeeper = new BeeKeeper();
}
function createInstance<A extends Animal>(A: new ()=> A): A {
    return new A();
}
createInstance(Bee).keep.hasMask;