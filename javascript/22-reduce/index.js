const sum = (arr) => {
    return arr.reduce((prev, cur) => {
        return prev + cur
    }, 0)
}
console.log('sum:', sum([1, 2, 3, 4, 5]))

const sum2 = (arr) => {
    let ret = 0;
    arr.forEach(val => {
        ret += val;
    })
    return ret
}
console.log('sum2:', sum2([1, 2, 3, 4, 5]))

let sourceArr = [
    { id: 1, name: 'Web技术学苑', age: 18 },
    { id: 2, name: 'Maic', age: 20 },
    { id: 3, name: 'Tom', age: 16 },
]
const ret = sourceArr.reduce((prev, cur) => {
    const { id, age } = cur;
    return prev.concat({ id, age })
}, [])
console.log('ret', ret)
const ret2 = sourceArr.map(v => {
    return { id: v.id, age: v.age }
})
console.log('ret2', ret2);

const sourceArr2 = [[1, 2, 3], [4, 5, 6], [8, 9], 0]
const ret3 = sourceArr2.reduce((prev, cur) => {
    return prev.concat(cur)
}, [])
console.log(ret3)
var flatLoop = (source, ret = []) => {
    const loop = (arr) => {
        arr.forEach(v => {
            if (Array.isArray(v)) {
                loop(v)
            } else {
                ret.push(v)
            }
        })
    }
    loop(source)
    return ret
}
const ret4 = flatLoop(sourceArr2, [])
console.log('ret4', ret4)

const strCount = (arr) => {
    const obj = {}
    arr.forEach(key => {
        if (key in obj) {
            obj[key] += 1;
        } else {
            obj[key] = 1;
        }
    });
    return obj
}
const ret5 = strCount(['a', 'a', 'b', 'c', 'd'])
console.log('ret5', ret5)

const strCount2 = (arr) => {
    return arr.reduce((prev, cur) => {
        if (cur in prev) {
            prev[cur] += 1;
        } else {
            prev[cur] = 1;
        }
        return prev
    }, {})
}
console.log('ret6', strCount2(['a', 'a', 'b', 'c', 'd']))
var publicInfo = [
    {
        id: '1',
        name: 'Web技术学苑',
        age: 10
    },
    {
        id: '2',
        name: '前端从进阶到入院',
        age: 10
    },
    {
        id: '3',
        name: '前端之神',
        age: 12
    },
    {
        id: '3',
        name: '前端之巅',
        age: 12
    }
]
const ret7 = publicInfo.map(v => v.name)
console.log('ret7', ret7)
const ret8 = publicInfo.reduce((prev, cur) => {
    return prev.concat(cur.name)
}, [])
console.log('ret8', ret8)

const sourceData = ['1', '1', '2', 3, 4, 5, 3]
console.log([...new Set(sourceData)])

const obj = {}
sourceData.forEach(item => {
    obj[item] = item
})
console.log(Object.values(obj))

const ret9 = publicInfo.reduce((prev, cur) => {
    if (cur.age > 10) {
        prev.push(cur.name)
    }
    return prev
}, []);

console.log('ret9', ret9);