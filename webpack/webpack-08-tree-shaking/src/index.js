import { add } from './utils';
import _ from 'loadsh';
import Image from './images/1.jpeg'
import './utils/watch';
import './css/index.css';
console.log("Hello World!");

console.log(add(1, 2))
// /*#__PURE__*/ watchEnv(process.env.NODE_ENV)

const bodyDom = document.getElementsByTagName('body')[0];
const imgDom = document.createElement('img');
imgDom.src = Image;
const divDom = document.createElement('div');
divDom.setAttribute('class', 'wrap-box');
divDom.innerText = 'wrap-box';
bodyDom.appendChild(divDom);
bodyDom.appendChild(imgDom);

console.log(_.last(['Maic', 'Web技术学苑']));


