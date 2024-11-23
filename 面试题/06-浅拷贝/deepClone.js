const deepCloneObj = function (obj) {
  let target = {};
  for (let key in obj) {
    if (Reflect.has(obj, key)) {
      if (typeof obj[key] === "object") {
        target[key] = deepCloneObj(obj[key]);
      } else {
        target[key] = obj[key];
      }
    }
  }
  return target;
};
