console.time('start');
const { mergeDeep } = require('./utils/merge.js');
const { lazyFunction, memorize } = require('./utils/memorize.js');
import { sourceObj } from './utils/source.js'
// const timerChunk = require('./utils/timerChunk.js')
const timerChunk = lazyFunction(() => require('./utils/timerChunk.js'));
// or
// const timerChunk = memorize(() => require('./utils/timerChunk.js'))();
class renderApp {
  constructor(dom) {
    this.dom = dom;
    this.sourceArr = [];
    this.appDom = new WeakMap().set(dom, dom);
  }
  init() {
    this.createData();
    this.createElem('hello webpack');
    const curentRender = this.render();
    curentRender();
  }
  createData() {
    const arr = [], max = 100;
    for (let i = 0; i < max; i++) {
      arr.push(i)
    }
    this.sourceArr = arr;
  }
  createElem(res) {
    const divDom = document.createElement('div');
    divDom.innerText = res;
    this.appDom.get(this.dom).appendChild(divDom);
  }
  render() {
    const { sourceArr } = this;
    // 调用分时函数
    return timerChunk(sourceArr, (res) => {
      this.createElem(res);
    })
  }
}
new renderApp(document.getElementById('app')).init();
console.timeEnd('start');

/***
 * ---------深拷贝测试----------------
 */
console.log(sourceObj, 'start--sourceObj')
const cacheSource = mergeDeep({}, sourceObj);
cacheSource.public = '122';
cacheSource.children[0].title = 'web技术2'
console.log(cacheSource, 'end--cacheSource')