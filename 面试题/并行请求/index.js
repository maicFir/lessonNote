var requestA = () => new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('1---A');
      resolve(1)
    })
});
var requestB = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('2----B');
    resolve(2)
  })
});
var requestC = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('3----C');
    resolve(3)
  })
});
// 串行请求
requestA().then(() => {
    return requestB()
}).then(() => {
  return requestC();
})
// 串行
// const quecRequest = async () => {
//   const resA = await requestA();
//   const resB = await requestB();
//   const resC = await requestC();
//   console.log(resA);
//   console.log(resB);
//   console.log(resC);
// }
// quecRequest();

/** 
 * 控制并发
 */