/**
 * 主要考察事件循环
 * 
 * 在事件循环中，主线程同步任务>异步任务(微任务>宏任务)
 * 
 * 1、setTimeout是一个宏任务，会放到队列中，不会立即执行
 * 2、执行Promise的回调函数，回掉函数会立即执行，222相当于同步任务，会打印222，
 * 3、resolve()执行—>then微任务等待执行
 * 4、执行同步任务333
 * 5、当同步任务执行完毕后，就会去执行微任务，然后再执行宏任务
 * 
 * 最后的结果就是:
    222
    333
    then 1000
    111
 */
setTimeout(() => {
    console.log(111)
})

new Promise((resolve, reject) => {
    console.log(222);
    for (let i = 0; i <= 1000; i++) {
        if (i === 1000) {
            resolve(i);
        }
    }
}).then((res) => {
    console.log('then', res)
})

console.log(333)
