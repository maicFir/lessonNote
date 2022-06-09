(() => {
  var __webpack_modules__ = {
    './src/utils/common.js': (module) => {
      function twoSum(a, b) {
        return a + b;
      }

      module.exports = {
        twoSum: twoSum
      };
    },

    './src/assets/images/1.png': (module, __unused_webpack_exports, __webpack_require__) => {
      'use strict';
      module.exports = __webpack_require__.p + 'images/1.png';
    }
  };

  var __webpack_module_cache__ = {};

  function __webpack_require__(moduleId) {
    var cachedModule = __webpack_module_cache__[moduleId];
    if (cachedModule !== undefined) {
      return cachedModule.exports;
    }
    var module = (__webpack_module_cache__[moduleId] = {
      exports: {}
    });

    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

    return module.exports;
  }

  (() => {
    __webpack_require__.g = (function () {
      if (typeof globalThis === 'object') return globalThis;
      try {
        return this || new Function('return this')();
      } catch (e) {
        if (typeof window === 'object') return window;
      }
    })();
  })();

  (() => {
    __webpack_require__.r = (exports) => {
      if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      }
      Object.defineProperty(exports, '__esModule', { value: true });
    };
  })();

  (() => {
    var scriptUrl;
    if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + '';
    var document = __webpack_require__.g.document;
    if (!scriptUrl && document) {
      if (document.currentScript) scriptUrl = document.currentScript.src;
      if (!scriptUrl) {
        var scripts = document.getElementsByTagName('script');
        if (scripts.length) scriptUrl = scripts[scripts.length - 1].src;
      }
    }
    if (!scriptUrl) throw new Error('Automatic publicPath is not supported in this browser');
    scriptUrl = scriptUrl
      .replace(/#.*$/, '')
      .replace(/\?.*$/, '')
      .replace(/\/[^\/]+$/, '/');
    __webpack_require__.p = scriptUrl + '../';
  })();

  var __webpack_exports__ = {};
  (() => {
    'use strict';
    __webpack_require__.r(__webpack_exports__);
    var _assets_images_1_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/images/1.png */ './src/assets/images/1.png');
    var _require = __webpack_require__(/*! ./utils/common.js */ './src/utils/common.js'),
      twoSum = _require.twoSum;

    console.log('cm_sum=' + twoSum(1, 2));
    var domApp = document.getElementById('app');
    var img = new Image();
    img.src = _assets_images_1_png__WEBPACK_IMPORTED_MODULE_0__;
    domApp.appendChild(img);
  })();
})();
