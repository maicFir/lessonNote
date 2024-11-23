function shadowCopy(obj) {
  const target = {};
  for (let key in obj) {
    if (Reflect.has(obj, key)) {
      target[key] = obj[key];
    }
  }
  return target;
}

const obj = {
  a: 1,
  b: 2,
  c: {
    name: "Maic",
  },
};

const new_obj = shadowCopy(obj);
new_obj.a = 100;
new_obj.c.name = "Tom";
console.log(obj);
console.log(new_obj);
