import deepMerge from './utils/index';
import '../assets/css/app.css';
import image1 from '../assets/images/1.png';
import image2 from '../assets/images/2.jpg';
const nice_titls = require('@maicfir/nice_utils');
// const { deepMerge } = require('./utils/index.js');
function twoSum(a, b) {
  return a + b;
}
const userInfo = {
  name: 'Maic',
  age: 18,
  test: {
    book: '公众号:Web技术学苑'
  }
};

const result = twoSum(1, 2);
console.log(result, deepMerge(userInfo));
if (module.hot) {
  // 这个文件
  module.hot.accept('./utils/index.js', () => { });
}
const str = `<div>
      <h5>hello, webpack</h5>
      <div>
          <img src=${image1} />
      </div>
      <div>
        <img src=${image2} />
      </div>
    </div>`;
// console.log(str);

const app = document.getElementById('app');
console.log(nice_titls, '---')
app.innerHTML = str;
