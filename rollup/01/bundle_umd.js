(function (factory) {
    typeof define === 'function' && define.amd ? define(factory) :
    factory();
})((function () { 'use strict';

    // import b from './js/b.js'
    var a = require('./js/a.js');
    var getName = function getName() {
      console.log('hello', a.name);
      // console.log('hello', b.name);
    };

    getName();

}));
