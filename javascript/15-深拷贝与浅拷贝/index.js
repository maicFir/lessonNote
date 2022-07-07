/**
 * 值拷贝，浅拷贝浅析
 */
var userName = 'Maic';
var age = 18;
var userInfo = {
  name: 'Maic',
  age: 18,
  fav: {
    play1: 'ping pang',
    play2: 'basket ball'
  }
}
var cacheUserName = userName;
var cacheAge = age;
// 对象值拷贝
// var cacheUserInfo = userInfo;

// 对象浅拷贝
// var cacheUserInfo = { ...userInfo }
// 与下面等价
// var cacheUserInfo = Object.assign({}, userInfo);
// 修改值拷贝后值
cacheUserName = 'Tom';
cacheAge = 20;
cacheUserInfo.name = 'jake';
cacheUserInfo.age = 10;
cacheUserInfo.fav.play1 = 'swim';

console.log(userName, age, userInfo, '------', cacheUserName, cacheAge, cacheUserInfo);