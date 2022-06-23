'use strict';
(self.webpackChunkmy_webpack_project = self.webpackChunkmy_webpack_project || []).push([
  ['main'],
  {
    './src/index.js': /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/ (s, e, o) => {
        var d = o(/*! ./utils */ './src/utils/index.js'),
          n = o(/*! loadsh */ './node_modules/loadsh/lodash.js'),
          c = o.n(n);
        o(/*! ./css/index.css */ './src/css/index.css');
        console.log('Hello World!'), console.log((0, d.add)(1, 2));
        var l = document.getElementsByTagName('body')[0],
          a = document.createElement('div');
        a.setAttribute('class', 'wrap-box'), (a.innerText = 'wrap-box'), l.appendChild(a), console.log(c().last(['Maic', 'Web技术学苑']));
      },
    './src/utils/index.js': /*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/ (s, e, o) => {
        function d(s, e) {
          return s + e;
        }
        o.d(e, { add: () => d });
      },
    './src/css/index.css': /*!***************************!*\
  !*** ./src/css/index.css ***!
  \***************************/ () => { }
  },
  (s) => {
    s.O(0, ['vendors-node_modules_loadsh_lodash_js'], () => {
      return (e = './src/index.js'), s((s.s = e));
      var e;
    });
    s.O();
  }
]);
//# sourceMappingURL=main.js.map
