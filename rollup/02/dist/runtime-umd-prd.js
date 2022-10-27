(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Nice_utils = {}));
})(this, (function (exports) { 'use strict';

  /**
   * @desption 缓存函数
   * @param {*} callback
   * @returns
   */
  var memorize = function (callback) {
      var cache = false;
      var result = null;
      return function () {
          // 如果缓存标识存在，则直接返回缓存的结果
          if (cache) {
              return result;
          }
          else {
              // 将执行的回调函数赋值给结果
              result = callback();
              // 把缓存开关打开
              cache = true;
              return result;
          }
      };
  };

  /**
   * @desption 懒加载可执行函数
   * @param {*} factory
   * @returns
   */
  var lazyFunction = function (factory) {
      var fac = memorize(factory);
      var f = function () {
          var args = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              args[_i] = arguments[_i];
          }
          return fac().apply(void 0, args);
      };
      return f;
  };

  var hasOwn = function (obj, key) { return Reflect.has(obj, key); };

  var getOrigin = function () {
      var _a = window.location, origin = _a.origin, protocol = _a.protocol, hostname = _a.hostname, port = _a.port;
      if (!origin) {
          return "".concat(protocol, "//").concat(hostname).concat(port ? ':' : '');
      }
      return origin;
  };
  var locationOrigin = getOrigin();

  /**
   * @desption 判断基础数据类型以及引用数据类型，替代typeof
   * @param {*} val
   * @returns
   */
  var isType = function (val) {
      return function (type) {
          return Object.prototype.toString.call(val) === "[object ".concat(type, "]");
      };
  };

  /**
   * @desption 将url参数转换成对象
   * @param params
   * @returns
   */
  var formateUrl = function (params) {
      if (isType(params)('String')) {
          if (/^http(s)?/.test(params)) {
              var url = new URL(params);
              // 将参数转换成http://localhost:8080?a=1&b=2   -> {a:1,b:2}
              return Object.fromEntries(url.searchParams.entries());
          }
          // params如果为a=1&b=2,则转换成{a:1,b:2}
          return Object.fromEntries(new URLSearchParams(params).entries());
      }
  };

  /**
   * @desption 深拷贝一个对象
   * @param {*} obj
   * @param {*} targets
   */
  var mergeDeep = function (obj, targets) {
      var descriptors = Object.getOwnPropertyDescriptors(targets);
      // todo 针对不同的数据类型做value处理
      var helpFn = function (val) {
          if (isType(val)('String')) {
              return val;
          }
          if (isType(val)('Object')) {
              return Object.assign(Object.create({}), val);
          }
          if (isType(val)('Array')) {
              var ret_1 = [];
              // todo 辅助函数，递归数组内部, 这里递归可以考虑用分时函数来代替优化
              var loopFn_1 = function (curentVal) {
                  curentVal.forEach(function (item) {
                      if (isType(item)('Object')) {
                          ret_1.push(helpFn(item));
                      }
                      else if (isType(item)('Array')) {
                          loopFn_1(item);
                      }
                      else {
                          ret_1.push(item);
                      }
                  });
              };
              loopFn_1(val);
              return ret_1;
          }
      };
      for (var _i = 0, _a = Object.keys(descriptors); _i < _a.length; _i++) {
          var name_1 = _a[_i];
          // todo 根据name取出对象属性的每个descriptor
          var descriptor = descriptors[name_1];
          if (descriptor.get) {
              var fn = descriptor.get;
              Object.defineProperty(obj, name_1, {
                  configurable: false,
                  enumerable: true,
                  writable: true,
                  get: memorize(fn) // 参考https://github.com/webpack/webpack/blob/main/lib/index.js
              });
          }
          else {
              Object.defineProperty(obj, name_1, {
                  value: helpFn(descriptor.value),
                  writable: true
              });
          }
      }
      return obj;
  };

  var domApp = document.getElementById('app');
  console.log(11122);
  domApp.innerHTML = 'hello，欢迎关注公众号:Web技术学苑';

  exports.formateUrl = formateUrl;
  exports.hasOwn = hasOwn;
  exports.isType = isType;
  exports.lazyFunction = lazyFunction;
  exports.locationOrigin = locationOrigin;
  exports.memorize = memorize;
  exports.mergeDeep = mergeDeep;

}));
//# sourceMappingURL=runtime-umd-prd.js.map
