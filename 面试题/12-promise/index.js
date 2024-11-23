/**
 * Promise
 *
 * 静态方法主要有:
 * all,allSettled,any,race,resolve,reject
 *
 *
 * Promise.all([p1,p2,p3]).then((value) => {
 *   console.log(value); // p1,p2,p3的结果,返回一个数组， 一旦有一个失败，则catch就会捕获那个错误
 * })
 *
 * // 会返回所有传入的聚合promise的结果，包含status和value
 * Promise.allSettled([p1,p2,p3]).then((value) => {})
 *
 * // 只要有一个成功，则返回那个成功的结果
 * Promise.any([p1,p2,p3]).then((value) => {})
 *
 * // 传入的Promise，谁最快，就谁先返回，则返回谁的结果
 * Promise.rice([p1,p2,p3]).then((value) => {})
 *
 *
 */

// const promise1 = Promise.resolve(1);
// const promise2 = Promise.reject("error");
// const promise3 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 100, "hello");
// });

// Promise.all([promise1, promise2, promise3])
//   .then((values) => {
//     console.log(values);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const p1 = Promise.resolve(1);
// const p2 = Promise.reject("error");
// const p3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("hello");
//   }, 100);
// });

// Promise.allSettled([p1, p2, p3])
//   .then((values) => {
//     console.log(values);
//     values.forEach((v) => {
//       console.log(v.status);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const p1 = Promise.reject("1");
// const p2 = Promise.resolve("success");
// const p3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     reject("hello");
//   }, 100);
// });

// Promise.any([p1, p2, p3])
//   .then((value) => {
//     console.log(value);
//   })
//   .catch((err) => {
//     console.log("err:", err);
//   });

function sleep(time, value, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 1) {
        return resolve(value);
      } else {
        return reject(new Error(value));
      }
    }, time);
  });
}

const p1 = sleep(5000, "1", 1);
const p2 = sleep(1000, "2", 1);

Promise.race([p1, p2])
  .then((value) => {
    console.log("value:", value); // 2
  })
  .catch((err) => {
    console.log("err:", err);
  });
