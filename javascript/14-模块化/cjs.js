const user = require('./a');
user.age = 10;
/**
 * 引入的与内部的值是同一份值，值的拷贝
 */
console.log(user, '--2')