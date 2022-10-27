'use strict';

var _01 = {};

var name = 'Web技术学苑';
var age = 18;
var a$1 = {
  name: name,
  age: age
};

// import b from './js/b.js'
var a = a$1;
var getName = function getName() {
  console.log('hello', a.name);
  // console.log('hello', b.name);
};

getName();

module.exports = _01;
