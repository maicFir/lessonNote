const arr = [
    {
        name: 'Maic',
        age: 18
    },
    {
        name: 'Tom',
        age: 10
    }
]

// for (let item of arr) {
//     console.log(item)
// }
// const iterator = arr[Symbol.iterator]();
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())

/**
 * 模拟迭代器
 */
// const iteratorObj = {
//     value: [1, 2, 3],
//     count: -1,
//     next() {
//         this.count++
//         return {
//             value: this.value[this.count],
//             done: !this.value[this.count]
//         }
//     }
// }
// console.log(iteratorObj.next());
// console.log(iteratorObj.next());
// console.log(iteratorObj.next());
// console.log(iteratorObj.next());

function createIteror(arr) {
    let count = -1;
    return {
        next: function () {
            count++
            return {
                value: arr[count],
                done: count >= arr.length
            }
        }
    }
}

const newCreateInteror = createIteror([1, 2, 3]);

// console.log(newCreateInteror.next());
// console.log(newCreateInteror.next());
// console.log(newCreateInteror.next());
// console.log(newCreateInteror.next());

/**
 * 迭代器
 */

const coustomerInteror = {
    value: [1, 2, 3],
    [Symbol.iterator]: function () {
        let count = -1;
        return {
            next: () => {
                count++;
                return {
                    value: this.value[count],
                    done: count >= this.value.length
                }
            }
        }
    }
}
const newInter = coustomerInteror[Symbol.iterator]();

// console.log(newInter.next());
// console.log(newInter.next());
// console.log(newInter.next());
// console.log(newInter.next());

// for (let item of coustomerInteror) {
//     console.log(item, '=result')
// }

Object.prototype[Symbol.iterator] = function () {
    let count = -1;
    return {
        next: () => {
            count++;
            const keys = Object.keys(this);
            return {
                value: this[keys[count]],
                done: count >= keys.length
            }
        }
    }
}
const cobj = { a: 1, b: 2 };

const iteror = cobj[Symbol.iterator]();

// console.log(iteror.next());
// console.log(iteror.next())
// console.log(iteror.next())

// for (let item of cobj) {
//     console.log(item, '=rs')
// }
// const [a, b] = cobj;
// console.log(a, b);

class Person {
    constructor() {
        this.name = 'Maic';
        this.age = 18;
    }
    [Symbol.iterator]() {
        let count = -1;
        return {
            next: () => {
                count++;
                const keys = Object.keys(this);
                return {
                    value: this[keys[count]],
                    done: count >= keys.length
                }
            },
            return: () => {
                console.log('break中断触发');
                return {
                    value: undefined,
                    done: true
                }
            }
        }
    }
}
const person = new Person();

const iter = person[Symbol.iterator]();

console.log(iter.next(), '==');
console.log(iter.next(), '==');
console.log(iter.next(), '==');

for (let item of person) {
    if (item === 'Maic') {
        break;
    }
    console.log(item)
}
const [name, age] = person;
console.log(name, age)