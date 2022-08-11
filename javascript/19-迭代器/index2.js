function* genter() {
    yield 1;
    yield 2;
}

const gen = genter();

// console.log(gen.next());
// console.log(gen.next());
// console.log(gen.next());
// for (let item of gen) {
//     console.log(item);
// }

function* start() {
    console.log('start')
}
const genterStart = start();

// setTimeout(() => {
//     genterStart.next();
// }, 1000)

function* flat(arr) {
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (Array.isArray(item)) {
            // 如果是数组，则递归
            yield* flat(item)
        } else {
            yield item
        }
    }
}
const sourceArr = [1, [[2, 3], 4], [5, 6]]
const result = [];
for (let item of flat(sourceArr)) {
    result.push(item)
}
// console.log(result);

// 在Array的原型上绑定一个$myFlat
Array.prototype.$myFlat = function () {
    // const result = [];
    // 定义一个flat生成器
    function* flat(arr) {
        for (let i = 0; i < arr.length; i++) {
            const item = arr[i];
            if (Array.isArray(item)) {
                yield* flat(item);
            } else {
                yield item
            }

        }
    }
    const ngen = flat(this);
    // for (let item of ngen) {
    //     result.push(item)
    // }
    // return result

    return [...ngen];
}
const sourceArr2 = [1, 2, [3, 4, 5, 6, [7, 8]]]

console.log(sourceArr2.$myFlat(), '=sourceArr2')

function* test() {
    let b = 2;
    const logNum = (num) => num
    const n = yield 1; // n为下面第二个yield(10)这里n = 10
    yield n * b;
    yield logNum(5);
    return 4;
}
const gtest = test();
console.log(gtest[Symbol.iterator]() === gtest) // true
// gtest[Symbol.iterator]().next();
// gtest[Symbol.iterator]().next()
// gtest[Symbol.iterator]().next()
// gtest[Symbol.iterator]().next()
// 与下面等价
console.log(gtest.next())
console.log(gtest.next(10));
console.log(gtest.next());
console.log(gtest.next());
console.log(gtest.next());
// for (let item of gtest) {
//     console.log(item) 这里相当于已经调用了gtest.next()
// }
// const [a, b, c, d] = gtest;
// console.log('abc', a, b, c, d)

