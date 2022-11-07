

/**
 * 去重数据中相同的id,并根据id进行排序
 */
const arr = [
    {
        id: 0,
        pid: 1,
        order: 2,
    },
    {
        id: 0,
        pid: 1,
        order: 2,
    },
    {
        id: 0,
        pid: 1,
        order: 3,
    },
    {
        id: 1,
        pid: 1,
        order: 3,
    },
    {
        id: 2,
        pid: 2,
        order: 5,
    },
    {
        id: 3,
        pid: 2,
        order: 4,
    }
]
/* 方法1
    通过对象存储id，利用对象key不重复，讲id当程key,并赋值
*/

const quchong = (arr) => {
    const ret = [], obj = {};
    arr.forEach(v => {
        // if (!obj[v.id]) {
        //     ret.push(v)
        // }
        /**
         * 与下面等价
         */
        if (!Reflect.has(obj, v.id)) {
            ret.push(v)
        }
        obj[v.id] = v.id;
    })
    return ret.sort((a, b) => a.id - b.id);
}
/**
 * 
 * 方法2: 利用reduce,然后利用findIndex
 */
const quchong2 = (arr) => {
    return arr.reduce((cur, prev) => {
        if (cur.findIndex(v => v.id === prev.id) === -1) {
            cur.push(prev)
        }
        return cur.sort((a, b) => a.id - b.id);
    }, [])
}
/**
 * 方法3: 通过Set去重重复的id
 *        然后根据reduce计算方法，将原数组的数据映射到对象中，然后返回对象的值
 */
const quchong3 = (arr) => {
    const arrId = [...new Set(arr.map(v => v.id))];
    return arrId.reduce((cur, id) => {
        if (!cur[id]) {
            cur[id] = arr.find(v => v.id === id)
        }
        return Object.values(cur).sort((a, b) => a.id - b.id)
    }, {})
}
/**
 * 方法4: Map, 利用map设置不重复的事
 */
const quchong4 = (arr, map = new Map()) => {
    arr.forEach(v => {
        if (!map.has(v.id)) {
            map.set(v.id, v)
        }
    });
    return Object.values(map).sort((a, b) => a.id - b.id)
}
console.log('quchong1:', quchong(arr));
console.log('quchong2:', quchong2(arr));
console.log('quchong3:', quchong3(arr));
console.log('quchong4:', quchong3(arr));