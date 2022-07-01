import * as nice_utils from '../src/index';
// umd
// const nice_utils = require('../dist/umd/index.js');
// cjs
// const { nice_utils } = require('../dist/cjs/index.js');
// esm error
// import nice_utils from '../dist/esm/index.js';

const appDom = document.getElementById('app');
appDom!.innerHTML = 'hello, 欢迎关注公众号：Web技术学苑，好好学习，天天向上!';
console.log(nice_utils);
console.log('formateUrl:', nice_utils.formateUrl('http://www.example.com?name=Maic&age=18'));
console.log('hasOwn:', nice_utils.hasOwn({ publictext: 'Web技术学苑' }, 'publictext'));
console.log('isType:', nice_utils.isType('Web技术学苑')('String'));
