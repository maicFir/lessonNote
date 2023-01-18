// type
type NameType = string;
const nameStr: NameType = 'Maic'; // const nameStr: string
// or
const nameStr2: string = 'Tom'; // const nameStr2: string

// number类型
type ageType = number;
const age: ageType = 18;
// or
const age2: number = 20;
// Array<string>
type NamesType = Array<string>;
const students: NamesType = ['Maic', 'Tom'];
// or 等价于
type NamesType2 = string[];
const students2: NamesType2 = ['Maic', 'Tom'];

// 数组对象类型
type itemArr = {
  name: string;
  age: number;
};
const arr: itemArr[] = [{ name: 'tick', age: 18 }];
console.log(arr[0].age);
/** 定义对象类型 Object */
type Attrs = Object;
const personObj: Attrs = {};
type nameObj = {
  name: string;
  age: number;
};
const personObj2: nameObj = {
  name: '大大',
  age: 18
};
console.log(personObj2.age);
/** 定义函数类型 */
type Fn = Function;
const getAge: Fn = () => {};

/**函数形参参数类型 */
function getName(name: NameType, age?: number): string {
  return `我的名字是：${name}`;
}
getName('Maic');
/**
 * function getName(name: NameType): string
<<<<<<< Updated upstream
<<<<<<< Updated upstream
 函数形参参数类型
 应有 1 个参数，但获得 0 个。ts(2554)
=======
  函数形参参数类型
  应有 1 个参数，但获得 0 个。ts(2554)
>>>>>>> Stashed changes
=======
  函数形参参数类型
  应有 1 个参数，但获得 0 个。ts(2554)
>>>>>>> Stashed changes
  index.ts(8, 18): 未提供 "name" 的自变量。
 */

/**联合类型 */

type idTypes = string[] | number;
consresponseId: idTypes = 123;
consresponseId2: string | number = 123;

function gresponseId(id: idTypes, name?: string) {
  console.log(id.toString(), name);
  // console.log(id.join(','));
  if (Array.isArray(id)) {
    console.log(id.join(','));
  }
}
gresponseId(['1', '2']);

/*** interfaces */
interface personObj2 {
  name: string;
  age?: number;
}
const personObj4: personObj2 = {
  name: 'Maic'
};
interface personObj5 extends personObj2 {}
interface personObj5 extends personObj2 {
  money: number;
}
const personObj5: personObj5 = {
  name: 'Tom',
  money: 1000
};
/*** type 通过交集扩展属性 */
type personObj6 = personObj2 & { money: number };
const personObj6: personObj6 = {
  name: 'Tom',
  money: 100
};

/**
 * type 重载 & 交集扩展
 */

type Animal = {
  name: string;
};
// type Animal = {
//   age: string;
// }

type NewAnimal = Animal & { age: number };

type NewAnimals = string & number; // type NewAnimals = never

interface Dog {
  name: string;
}
interface Dog {
  age: number;
}
const dog: Dog = {
  name: '',
  age: 1
};
interface childDog extends Dog {
  money: string;
}
const cDog: childDog = {
  name: 'xx',
  age: 0.5,
  money: ''
};
// as 断言
function $id(id) {
  return document.getElementById(id);
}
type elm = HTMLElement;
const dom: elm = $id('app') as HTMLElement;

/**
 * 联合类型
 */

type namesType = string | number;

function getNames(name: namesType | 'Maic') {
  return name;
}
getNames('Maic');
type Options = {
  url: string;
  methods: string;
  params: Object;
};
function handlequest(url: string, methods: string, params: Object) {
  fetch(url);
}
const options = {
  url: 'https://www.baidu.com',
  methods: 'get',
  params: {
    q: 'test'
  }
};
handlequest(options.url, options.methods as 'get', options.params);
/**
 * in 收窄类型
 */
interface shopList {
  js: string;
  node: string;
}
function printShop(books: shopList) {
  if ('js' in books) {
    console.log(`我买了${books['js']}`);
  }
  if ('node' in books) {
    console.log(`这是一本${books['node']}书籍`);
  }
}
printShop({ js: 'js设计模式', node: 'nodejs入门到放弃' });

const enum FOODS {
  a = '鸭子',
  b = '鸡腿'
}
console.log(FOODS.a);
type values = keyof typeof FOODS; // type values = "a" | "b"
const foods: {
  [key in FOODS]: values;
} = {
  [FOODS.a]: 'a',
  [FOODS.b]: 'b'
};
/**
 * const foods: {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
 鸭子: "a" | "b";
 鸡腿: "a" | "b";
=======
    鸭子: "a" | "b";
    鸡腿: "a" | "b";
>>>>>>> Stashed changes
=======
    鸭子: "a" | "b";
    鸡腿: "a" | "b";
>>>>>>> Stashed changes
}
 */
console.log(foods[FOODS.a]);

/**
 * instanceof 收窄
 */
function transformParams(params) {
  if (params instanceof String) {
    console.log(params.toLocaleLowerCase());
  }
  if (params instanceof Date) {
    console.log(params.toLocaleDateString());
  }
}
transformParams('abc');
transformParams(new Date());

/**
 * is 判断参数类型
 */
interface Fish {
  swim: Function;
}
interface Bird {
  fly: Function;
}
function isFish(arg: Fish | Bird): arg is Fish {
  return (arg as Fish).swim !== undefined;
}
const isfish = isFish({ swim: () => {} });
const isBird = isFish({ fly: () => {} });

/**
 * rest params
 */

function add(num: number, ...arg: number[]) {
  return arg.map((s) => s + num);
}
add(1, 2, 4, 5, 6); // [3,5,6,7]

interface params {
  id: number;
  name: string;
  age: number;
  fav: string;
}
const curentParams: params = { id: 1, name: 'Maic', age: 18, fav: 'play' };
const { id, ...arg } = curentParams;
/*
const arg: {
  name: string;
  age: number;
  fav: string;
}
*/

/***
 *
 * 对象属性修饰符  ? 可选  readonly 只读
 */

interface params2 {
  readonly id: number;
  name: string;
  age?: number;
}
const curentParams2: params2 = { id: 123, name: '' }; // age 可有可无
// curentParams2.id = 456; // 无法分配到 "id" ，因为它是只读属性。 readonly id的属性不能修改

/**
 * 对象属性索引类型
 */
interface params3 {
  [key: string]: string | number;
  [key: number]: number;
}
const params3: params3 = {
  age: 18,
  1: 123
};
enum LANGUAGE {
  ru = '俄罗斯',
  ch = '中国',
  usa = '美国'
}
type languKey = keyof typeof LANGUAGE; // type languKey = "ru" | "ch" | "usa"
/**
 * const lang: {
    ru: string;
    ch: string;
    usa: string;
}
 */
const lang: {
  [key in languKey]: string;
} = {
  ru: '1',
  ch: '2',
  usa: '3'
};

/**
 * 交叉类型
 */

interface span {
  color: string;
}
interface a {
  cursor: string;
}
type divType = span & a;

const divStyle: divType = {
  color: '#111',
  cursor: 'pointer'
};
console.log(divStyle.color, divStyle.cursor);
/**
 * extends
 */
interface img extends a {
  color: string;
}
const imgStyle: img = {
  color: '#111',
  cursor: 'pointer'
};

/**
 * 利用泛型复用interfance
 */
interface obj1 {
  a: boolean;
}
interface obj2 {
  a: string;
}
const obj1: obj1 = { a: true };
const obj2: obj2 = { a: '111' };

interface objType<T> {
  a: T;
}
const obj3: objType<boolean> = {
  a: false
};
const obj4: objType<string> = {
  a: 'hello'
};
// Type泛型
type obj4Type<Type> = {
  content: Type;
};
const obj5: obj4Type<obj2> = {
  content: {
    a: ''
  }
};
console.log(obj5.content.a);
/***
 *
 * 方法泛型
 */
function genterFeach<T>(url: string) {
  return {
    get: (params: T, config?) => {
      return fetch(url, {
        method: 'get',
        body: JSON.stringify(params),
        ...config
      });
    },
    post: (params: T, config?) => {
      return fetch(url, {
        method: 'post',
        body: JSON.stringify(params),
        ...config
      });
    }
  };
}
interface paramsF {
  id: number;
  password: number;
  name: string;
}
const useInfo = genterFeach<paramsF>('/v1/useInfo');
const login = genterFeach<paramsF>('/v1/login');
useInfo.get({ id: 111, password: 12, name: 'Maic' });
login.post({ id: 111, password: 12, name: 'Maic' });

/**
 *
 * readonly
 */

type readData = readonly [string, number];

const data: readData = ['Maic', 18];
// data[1] = 20;
type readData2<T> = T;
const data2: readData2<readonly string[]> = ['Maic'];
// data2[0] = 'tom';// 类型“readonly string[]”中的索引签名仅允许读取
console.log(data2[0]);

/**
 *  [] as const
 */
const strArr = ['a', 'b', 3] as const;

type strVal = typeof strArr;

const strArr2: strVal = ['a', 'b', 3];

function getStrArr([a, b, c]: [string, string, number]) {
  console.log(a, b, c);
}
function getStrArr2([a, b, c]: strVal) {
  console.log(a, b, c);
}
getStrArr2(strArr);
// getStrArr(strArr);// 类型 "readonly ["a", "b", 3]" 为 "readonly"，不能分配给可变类型 "[string, string, number]"。

/***
 *
 * 泛型
 * 
 */

interface resopnseID {
  id: number
}
interface responseName {
  name: string
}
const responseId: resopnseID = {
  id: 123
}
const responseName: responseName = {
  name: 'Maic'
}
interface keysType<T, V> {
   [key in T]: V
}
const responseId2: keysType<{id: number}, number>;
const responseName2: keysType<{name: string}, string> = {
  name: 'tom'
};
// console.log(responseName2.age); // 类型“keysType<{ name: string; }, string>”上不存在属性“age”。
responseName2['name'] = 'Maic';
// 函数泛型
function setParamsType<T>(arg: T): T {
 return arg
}
console.log(setParamsType<string>('maic'));

console.log(setParamsType<number>(18));
// 接口泛型
interface parsType<T> {
  [arg: T]: T
}
const myParams: parsType<number> = setParamsType;
// type 泛型
type parsType2<T> = {
  [arg: T]: T
}
const myParams2: parsType2<number> = setParamsType;

/**
 * 类泛型
 */

class Calculate<T> {
  initNum: T;
  max: string;
  add: (x: T, y:T) => T
}
const cal = new Calculate<number>();
cal.initNum = 0;
cal.add = (x, y) => x+y;
cal.add(1,2);

/**
 * 约束泛型
 */

function getParams<T extends {id: string}>(params: T) {
    if (params.id) {
      console.log('进行xxx操作')
    }
}
getParams({id: '123'});

interface parmasType {
  id: string
}
function getParams2<T extends parmasType>(params: T) {
  if (params.id) {
    console.log('进行xxx操作')
  }
}
/**
 *在泛型约束中使用类型参数, 获取对象的某个值
 */
function getPrototype<Type, Key extends keyof Type>(obj: Type, key: Key) {
   return obj[key];
}
const obj = {a: 1, b:'2'}
getPrototype({a:1}, 'a');

/**
 * 原型推断使用属性
 */
class Animal2 {
   name: string = 'animal';
}
class Sleep {
  hour: number = 10;
}
class Bee extends  Animal2 {
    age: number = 1;
    action: Sleep = new Sleep();
}
function createInstance<T extends Animal2>(c: new () => T): T {
    return new c();
}
console.log(createInstance(Bee).action.hour); // animal

/**
 * keyof 类型操作符
 */
interface keysObj {
  id: string;
  name: string,
  date: string | number,
  content: string
}
type keytype = keyof keysObj;
const objkey: keytype = 'content';
const objkey2: keyof keysObj = 'id';

interface keysP {
  [key: number]: string
}
type keysType3 = keyof keysP; // type keysType3 = number
const objkey3: keyof keysP = 1;

/**
 *  typeof
 */
const objkey4 = {
  a: '111',
  b: '222',
  c: 333,
  d: 444
}
type result = keyof typeof objkey4; // type result = "a" | "b" | "c" | "d"

const objkey5:result = 'a'; // true
// const objkey6:result = 'e'; error

/* 
  Extract
*/
// function useKey<T, Key extends keyof T>(o: T, key: Key) {
//   const keyName: string = key; // 不能将类型“string | number | symbol”分配给类型“string”
//   console.log(o[keyName]);
// }
function useKey2<T, Key extends Extract<keyof T, string>>(o: T, key: Key) {
  const keyName: string = ''; // "string" 可赋给 "Key" 类型的约束，但可以使用约束 "string | number | symbol"
  console.log(o[keyName]);
}

function useKey3<T, Key extends string>(o: T, key: Key) {
  const keyName: string = key; 
  console.log(o[keyName]);
}

function useKey4<T, Key extends keyof T>(o: T, key: Key) {
  const keyName: string | number | symbol = key;
  console.log(o[keyName]);
}
/**
 * typeof 
 */

 let publicWebTech = '关注公众号：Web技术学苑';
 type publicWeb = typeof publicWebTech;
 const publicName: publicWeb = '关注公众号：Web技术学苑';

 // const publicWebAuthor = 'Maic';
 let publicWebAuthor = 'Maic' as const;
 type publicWebAuthor = typeof publicWebAuthor;
 const publicAuthor: publicWebAuthor = 'Maic';

 const objResult = {a: '11', b: '222'};

 type objResultType = typeof objResult;

 function fnTest() {
   return {
     a: '111',
     b: '222'
   }
 }
 type fntest = ReturnType<typeof fnTest>;
 /**
  * type fntest = {
    a: string;
    b: string;
}
  */

enum SERVER {
   TEST = 1,
   PRD = 2,
   DEV = 3,
}

type serverType = keyof typeof SERVER
/**
 * 访问索引类型
 */
interface person {
   name: string;
  id: number,
  age: number
}
type nametype = person['age'];
// type nametype = number
type nameOrAge = person['age' | 'name'];
// type nameOrAge = string | number

type personKeys = person[keyof person];
// type personKeys = string | number

const personArr = [
  {
    name: 'Maic',
    age: 10
  },
  {
    name: 'tom',
    age: 18,
    id: 189
  }
];
type items = typeof personArr[number];

// 条件类型

type messageOf<T extends {message: string}> = T['message'];

type isNumber<T> = T extends number ? number : string;

const num: isNumber<string> = '123';