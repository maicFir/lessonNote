function PromiseRace(arg) {
    if (!Array.isArray(arg)) {
        return new Error('参数必须是数组')
    }
    return new Promise((resolve, reject) => {
        arg.forEach(v => {
            Promise.resolve(v).then((res) => {
                resolve(res)
            }, (err) => {
                reject(err)
            })
        })

    })
}

const p1 = Promise.resolve(2);
const p2 = Promise.resolve(3);
PromiseRace([p1, p2]).then((res) => {
    console.log(res); // 2
}).catch((err) => {
    console.log('err', err);
})