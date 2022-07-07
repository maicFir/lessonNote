const deepCloneCopy = (obj) => {
  let retObj = {};
  if (Array.isArray(obj)) {
    return obj;
  }
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      retObj[key] = deepCloneCopy(obj[key]);
    } else {
      retObj[key] = obj[key]
    }
  }
}