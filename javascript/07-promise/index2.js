
const p1 = new Promise((resolve, reject) => {
    resolve(1)
});
const p2 = new Promise((resolve, reject) => {
    resolve(2)
})
const p3 = new Promise((resolve, reject) => {
    resolve(3)
})

const pAll = Promise.all([p1, p2, p3]);

pAll.then((res) => {
    // 如果p1,p2,p3全是resolve，那么返回的就是一个数组结果
    // 如果p2是reject，那么就直接catch当前的reject
    console.log(res, 'all');
})

const p4 = new Promise((resolve, reject) => {
    reject(4)
})
const p5 = new Promise((resolve, reject) => {
    resolve(5)
});

const pRace = Promise.race([p1, p2]);

// 只要传入race中迭代中，只要返回的都是第一个拒绝或者成功的值
pRace.then((res) => {
    console.log(res, 'race')
}).catch((err) => {
    console.log(err)
})
