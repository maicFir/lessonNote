const STATUS = {
  0: '未开始',
  1: '进行中',
  2: '结束了'
};
let user = '';

const STATUS1 = '';
console.log(STATUS1);

// 对象解构
const userInfo = {
  name: 'Maic',
  age: 18,
  number: 10
}
const {name,age} = userInfo;
console.log(name, age);
const {name: nname, ...rests } = userInfo
console.log(nname, rests); // Maic {age: 18, number: 10}

const url = new URL('https://github.com/type-challenges/type-challenges/issues?q=label%3A5+label%3Aanswer');
const search = url.search;
const [, params] = search.split('?');
console.log(params);

const arr = [1,2,3,4];
const [first, ...rest] = arr;
console.log(first, rest); // 1 [2,3,4]

// 对象动态赋值
var key = 'test1';
var obj = {
  [key]: 'test'
};
console.log(obj);
/** 对象合并 */
const objs = {name: 'Tom', age: 10};
const merge = (target,options) => {
    const ret = Object.assign(Object.create({}), target, options);
    return ret;
}
const nobj = merge(objs, {age: 18})
// or
const nobj2 = {...objs, age:18};

// 浅拷贝
var nuserInfo = {...userInfo};
console.log(nuserInfo);

const queryDetail = () => {
  console.log('query detail');
};
const queryList = () => {
  console.log('query list');
}
const queryPic = () => {
  console.log('query pic')
}
const request = new Map([
  ['getDetail', queryDetail],
  ['queryList', queryList]
]);
if (request.has('getDetail')) {
  request.get('getDetail')();
}
if (!request.has('queryPic')) {
  request.set('queryPic', queryPic);
}
// or 循环执行
request.forEach(fn => {
  fn();
})
request.get('queryPic')();

console.log(request.entries(request));
// 获取所有的值
console.log(request.values(request));
// 获取所有的key
console.log(request.keys(request));

// 对象转Map
const obj2 = {a:1,b:2};
const map = new Map(Object.entries(obj2));
console.log(map);
// Map转对象
var map2 = new Map([['a','123'],['b','234']])
Object.fromEntries(map2.entries()) // {a: '123', b: '234'}

// const bodyDom = document.getElementsByTagName('body')[0];
// const weakMap = new WeakMap();
// weakMap.set(bodyDom, 'bodyDom')
// console.log(weakMap.get(bodyDom))

var arrsSet = new Set();
arrsSet.add({name: 'Maic'}).add({name: 'Tom'})
console.log([...arrsSet], arrsSet.keys());

const arrsSet2 = new Set([1,2,3]);
console.log(arrsSet2.has(1));


// proxy观察者
var bucket = new Set();
var effect = (fn) => {
  bucket.add(fn)
}
const proxyOption = {
  set(target, key, val, receiver) {
      const result = Reflect.set(target, key, val, receiver);
      bucket.forEach(item => {
        Reflect.apply(item, this,[])
      })
      return result
  },
  get(target, key,receiver) {
      return Reflect.get(target, key)
  }
}
// 创建观察器
const observer = (obj) => new Proxy(obj, proxyOption);
const obj3 = {
  name: 'Maic',
  age: 18
}
// 将obj添加到观察器中
const userInfo2 = observer(obj3);

effect(() => {
    console.log(userInfo2.name, userInfo2.age);
});

userInfo2.name = 'Tom'; // 触发Proxy
/**
 * async/await 
 * @returns 
 */
const featchList = () => new Promise((resolve, reject) => {
  resolve({code: 0, message: '成功'})
})
const requests = async () => {
  try {
    const {code} = await featchList();
  } catch (error) {
      throw error;
  }
  
  console.log(code, '=code');
}
requests();