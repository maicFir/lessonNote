var startTime = Date.now()
const count = 1000;
let wait = 10000;
// 设置延时
const time = wait * count;
for (let i = 0; i < time; i++) { }
var endTime = Date.now()
console.log(startTime, endTime)
console.log(`延迟了：${Math.ceil((endTime - startTime) / 1000)}s后执行的`)
