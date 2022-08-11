


// 事件循环 1，3，9，5，6，2，10，7
console.log(1);
setTimeout(() => {
    console.log(2)
});

var p = new Promise((resolve, reject) => {
    console.log(3);
    reject();
})
p.then(() => {
    console.log(4);
}).catch(() => {
    console.log(5)
}).then(() => {
    console.log(6)
})
new Promise((resolve, reject) => {
    console.log(9)
    setTimeout(() => {
        console.log(10)
    })
})
setTimeout(() => {
    console.log(7)
});
console.log(11)