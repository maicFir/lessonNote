/**
 * 深拷贝
 */
var userInfo = {
  name: 'Maic',
  age: 18,
  fav: {
    play1: 'ping pang',
    play2: 'basket ball'
  },
  fav2: [
    {
      a: 1,
      b: 2
    },
    {
      a: 3,
      b: 4
    },
  ],
  fav3: [1, 2, 3]
}
// const newUseInfo = JSON.parse(JSON.stringify(userInfo));
// newUseInfo.fav.play1 = 'hello';
// console.log(userInfo, '----', newUseInfo);

const isType = (val) => {
  return (type) => Object.prototype.toString.call(val) === `[object ${type}]`
}
function deepMerge(target) {
  const ret = Array.isArray(target) ? [] : {};
  for (let key in target) {
    if (target.hasOwnProperty(key)) {
      if (isType(target[key])('Object')) {
        ret[key] = deepMerge(target[key])
      } else if (isType(target[key])('Array')) {
        ret[key] = [].concat([...deepMerge(target[key])]);
      } else {
        ret[key] = target[key];
      }
    }
  }
  return ret;
}
const cacheObj = deepMerge(userInfo);
cacheObj.fav.play1 = '111';
cacheObj.fav2[0].a = '666';
console.log(userInfo, '----', cacheObj);