import img1Src from '../assets/images/1.png';
import img3Src from '../assets/images/3.png';

import json from '../config/index.json';

function renderImage(imageSource) {
  const weakMap = new WeakMap();
  var appDom = document.getElementById('app');
  imageSource.forEach((src) => {
    const img = new Image();
    weakMap.set(img, img);
    if (weakMap.has(img)) {
      weakMap.get(img).src = src;
      appDom.appendChild(img);
    }
  });
}
renderImage([img1Src, img3Src]);

console.log(json);
