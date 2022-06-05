var str = '123';
function deepMerge(target) {
  console.log(target, '=22==');
  if (Array.isArray(target)) {
    return target;
  }
  const result = {};
  for (var key in target) {
    if (Reflect.has(target, key)) {
      if (Object.prototype.toString.call(target[key]) === '[object Object]') {
        result[key] = deepMerge(target[key]);
      } else {
        result[key] = target[key];
      }
    }
  }
  return result;
}
console.log('深拷贝一个对象22', str);
export default deepMerge;
// module.exports = {
//   deepMerge
// };
