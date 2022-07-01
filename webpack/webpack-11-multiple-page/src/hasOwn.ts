const Maic_utils = require('../dist/js/index.js');
const has = Reflect.has;

const hasOwn = (obj: Record<string, any>, key: string) => has.call(obj, key);

console.log(Maic_utils);
export { hasOwn };
