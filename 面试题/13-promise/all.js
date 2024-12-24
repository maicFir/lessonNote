/**
 * 实现一个Promise.all方法
 */

function PromiseAll(arg) {
    if (!Array.isArray(arg)) {
        return new Error('参数必须是数组')
    }
    if (arg.length === 0) {
        return [];
    }
    return new Promise((resolve, reject) => {
        let count = 0;
        let results = [];
        arg.forEach((v, index) => {
            Promise.resolve(v).then((res) => {
                count++;
                results[count] = res;
                if (count === arg.length) {
                    resolve(results);
                }
            }, (err) => {
                reject(err);
            })
        })
    })
}

const p1 = Promise.resolve(1);
const p2 = Promise.reject(2);
PromiseAll([p1, p2]).then((res) => {
    console.log(res.length);
}).catch((err) => {
    console.log('err', err);
})