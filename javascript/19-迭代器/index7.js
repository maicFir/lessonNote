
function fn1() {
    return {
        code: 1,
        message: '我是fn1,你成功了，请进行下一步'
    }
}
function fn2() {
    return {
        code: 0,
        message: '我是fn2,失败了'
    }
}
function fn3() {
    console.log('恭喜你，闯关成功了...');

}
const source = [fn1, fn2, fn3];

function* main(arr = []) {
    for (let i = 0; i < arr.length; i++) {
        yield arr[i]()
    }
}
const it = main(source);

for (let item of it) {
    console.log(item)
    if (item.code === 0) {
        break;
    }
}