(() => {
  "use strict"; var r = {
    "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/(r, e, t) => { function o(r, e) { return r + e } t.d(e, { add: () => o }) }, "./src/utils/test.js":
/*!***************************!*\
  !*** ./src/utils/test.js ***!
  \***************************/(r, e, t) => { }
  }, e = {}; function t(o) { var s = e[o]; if (void 0 !== s) return s.exports; var n = e[o] = { exports: {} }; return r[o](n, n.exports, t), n.exports } t.d = (r, e) => { for (var o in e) t.o(e, o) && !t.o(r, o) && Object.defineProperty(r, o, { enumerable: !0, get: e[o] }) }, t.o = (r, e) => Object.prototype.hasOwnProperty.call(r, e), (() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/var r = t(/*! ./utils */"./src/utils/index.js"); t(/*! ./utils/test.js */"./src/utils/test.js"); console.log("Hello World!"), console.log((0, r.add)(1, 2))
  })()
})();
//# sourceMappingURL=main.js.map