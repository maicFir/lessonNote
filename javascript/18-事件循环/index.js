
// 事件循环
console.log(888);
setTimeout(() => {
    console.log(111)
});

var p = new Promise((resolve, reject) => {
    console.log(222);
    reject();
})
p.then(() => {
    console.log(999)
}).catch(() => {
    console.log(222)
}).then(() => {
    console.log(333)
})
setTimeout(() => {
    console.log(888)
});