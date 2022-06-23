/*! For license information please see main.js.LICENSE.txt */
(() => {
  'use strict';
  var r,
    e = {
      './src/utils/index.js': (r, e, o) => {
        function t(r, e) {
          return r + e;
        }
        o.d(e, { add: () => t });
      }
    },
    o = {};
  function t(r) {
    var n = o[r];
    if (void 0 !== n) return n.exports;
    var s = (o[r] = { exports: {} });
    return e[r](s, s.exports, t), s.exports;
  }
  (t.d = (r, e) => {
    for (var o in e) t.o(e, o) && !t.o(r, o) && Object.defineProperty(r, o, { enumerable: !0, get: e[o] });
  }),
    (t.o = (r, e) => Object.prototype.hasOwnProperty.call(r, e)),
    (r = t('./src/utils/index.js')),
    console.log('Hello World!'),
    console.log((0, r.add)(1, 2));
})();
//# sourceMappingURL=main.js.map
