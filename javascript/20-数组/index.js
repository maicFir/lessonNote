
console.log(JSON.stringify(Reflect.ownKeys(Array.prototype), null, 2))
/**
 * 
[
  "length",
  "constructor",
  "at",
  "concat",
  "copyWithin",
  "fill",
  "find",
  "findIndex",
  "lastIndexOf",
  "pop",
  "push",
  "reverse",
  "shift",
  "unshift",
  "slice",
  "sort",
  "splice",
  "includes",
  "indexOf",
  "join",
  "keys",
  "entries",
  "values",
  "forEach",
  "filter",
  "flat",
  "flatMap",
  "map",
  "every",
  "some",
  "reduce",
  "reduceRight",
  "toLocaleString",
  "toString",
  "findLast",
  "findLastIndex",
]
 */
var sourceArr = [
    {
        name: 'a',
        age: 18,
        arr: ['a', 'b']
    },
    {
        name: 'b',
        age: 20,
        arr: ['a', 'b', 'c']
    },
    {
        name: 'c',
        age: 15,
        arr: ['e', 'd', 'f']
    }
]
/* reduce方法
   arr.reduce((curent, prev) => {}, init) curent默认init值
   场景：应用比较丰富，常用有计算，构建对象原原数据映射关系等
*/
// 将一个数组与新建一个对象建立关系
const sourceMap = sourceArr.reduce((prev, cur) => {
    prev[cur.name] = cur;
    return prev
}, {})
console.log('reduce:', sourceMap)
/**
{
  a: { name: 'a', age: 18, arr: [ 'a', 'b' ] },
  b: { name: 'b', age: 20, arr: [ 'a', 'b', 'c' ] },
  c: { name: 'c', age: 15, arr: [ 'e', 'd', 'f' ] }
}
*/
// 此时可以根据sourceArr中的name的具体值,在sourceMap中能根据name值找到对应的原始数据
console.log('reduce:', sourceMap['a']) // { name: 'a', age: 18 }

/* 现在输入arr：['a', 'b']
// 只要该数组在原数据sourceArr的arr中完全包含，就返回true
*/
const inclu = (arr) => {
    return sourceArr.some(v => v.arr.every(val => arr.includes(val)))
}
// console.log(inclu(['a']), inclu(['a', 'b']), inclu(['e', 'd', 'f', 'g'])) false true true

/* some方法
   只要一个条件满足，就返回true
   场景：只要满足一个任意条件，即可返回一个true,否则就是false
*/
const arraySome = (arr, num) => {
    return arr.some(v => v > num)
}
console.log('some:', arraySome([1, 2, 3], 2), arraySome([4, 5, 6], 7)) // true, false

/**
 * every 方法
 * 所有条件必须都满足才会返回true
 * 场景：在业务中你想一个原数据的每一项都满足一个指定条件，此时会返回true,否则就是false
 */
const arrayEvery = (arr, num) => {
    return arr.every(v => v.includes(num))
}
console.log('every:', arrayEvery(['abc', 'cdabc', 'efg'], 'ab'), arrayEvery(['abc', 'cdabc', 'aefg'], 'a')) // false true

/**
 * at 方法
 * 与数组下标取值等价，主要是获取数组中的元素，如果没有就返回undefined
 */

const arrayAt = (arr = [], index) => {
    return arr.at(index)
}
// console.log('at:', arrayAt(['a', 'b', 'c'], 1)) // b  在chrome控制台验证

/**
 * arr: [1,2,3]
 * concat: 在原数组基础上浅拷贝一份新的数据，然后在新数据上追加对应的内容
 * 示例：ret = arr.concat(4) ----- ret: [1,2,3,4]
 *      ret = arr.concat('a', {a:'Maic'}, ['abc',{a: 'Tom'}])  ret: [1,2,3,'a',{a:'Maic'},'abc', {a: 'Tom'}]
 *      ret = arr.concat(1).concat(2) [1,2,3,1,2]
 * 场景：不太想影响原数据，又想在原数据上添加数据时，但是注意这个方法是一个浅拷贝，如果数组中是引用数据类型，修改新值会影响原有的值
 *                          
 */
const arrayConcat = () => {
    const arr = [1, 2, 3, { name: 'Maic' }]
    const newArr = arr.concat('abc')
    newArr[3].name = 'Tom'
    const arr2 = arr.concat('a', { a: 'Maic' }, ['abc', { a: 'Tom' }])
    const arr3 = arr.concat([1, 2, 3])
    const arr4 = [1, 2, 3].concat(4).concat(5)
    return {
        newArr,
        arr,
        arr2,
        arr3,
        arr4
    }
}
console.log('concat:', arrayConcat())

/**
 * fill: 在数组中快速复制一份相同的数据，注意数组不能是空数组，否则无效，必须是有长度的数组
 * 场景： 比如你想Mock一份测试数据时
 * 
 */

const arrayFill = (num, val) => {
    return Array(num).fill(val)
}
console.log('fill:', arrayFill(3, 'Maic'))

/**
 * find: 寻找数组的item,并返回其寻找到的结果, 如果没有找到就返回undefined
 * 场景：需要根据某个条件值找到数据中的当前item数据时
 */
const arrayFind = (sourceData, key, target) => {
    return sourceData.find(v => v[key] === target)
}
console.log('find:', arrayFind([{ name: 'Maic', age: 18 }, { name: 'Tom', age: 25 }], 'name', 'Maic')) // {name: 'Maic', age: 18}

/**
 * findIndex: 寻找目标值的当前索引,如果没找到就返回-1
 * 场景：在你根据某个条件想获取当前条件的索引值，比如进行删除，或者插入，替换等操作
 */

const arrayFindIndex = (sourceData, key, target) => {
    return sourceData.findIndex(v => v[key] === target)
}
console.log('findIndex', arrayFindIndex([{ name: 'Maic', age: 18 }, { name: 'Tom', age: 25 }], 'name', 'Jack'))


/**
 * lastIndexOf: 找到元素的当前下标索引
 * 场景：功能与findIndex类似，根据其值寻找目标值的当前下标索引
 */
const arrayLastIndexOf = (sourceData, val) => {
    return sourceData.lastIndexOf(val)
}
console.log('lastIndexOf', arrayLastIndexOf(['a', 'b', 'c', 'd'], 'b')) // 1

/**
 * pop: 获取数组元素最后一个元素的值，会改变原数组的长度,每一次pop操作，就会将数组的最后一个值弹出去，原数组长度会减一
 * 场景：模拟栈特性，或者分时函数
 */
const arrayPop = function (sourceData) {
    return sourceData.pop()
}
console.log('pop:', arrayPop(['a', 'b', 'c'])) // c

/**
 * push: 想数组中添加元素，原数组长度会发生变化,返回的是新增元素后长度
 * 场景: 页面新增数据，添加等
 */

const arrayPush = (sourceData, val) => {
    const result = sourceData.push(val)
    return {
        sourceData,
        result
    }
}
console.log('push', arrayPush([1, 2, 3], 'a')) // [1,2,3,'a'], 4

/**
 * reverse：反转数组
 * 场景：当一个数据需要正序或者倒序排列时
 */
const arrayReverse = (sourceData) => {
    return sourceData.reverse()
}
console.log('reverse', arrayReverse([1, 2, 3, 4])) // [4,3,2,1]

/**
 * shift: 获取数组的第一个元素，会改变原数组的长度
 * 场景：模拟队列
 */
const arrayShift = (sourceData) => {
    return {
        data: sourceData.shift(),
        sourceData
    }
}
console.log('shift', arrayShift([1, 2, 3, 4])) // {data:1, sourceData: [2,3,4]}


/**
 * unshift: 向原数据添加数据，每次操作都会往数组的首位添加，会改变原数组的长度,返回值是当前新增数组的长度
 * 场景：每次操作需要在数据的首位添加一组数据
 */
const arrayUnshift = (sourceData, val) => {
    return {
        result: sourceData.unshift(val),
        sourceData
    }
}
console.log('unshift:', arrayUnshift([1, 2, 3], 'a'))

/**
 * slice: 获取原数据指定索引范围的值，不会影响原有值
 * 场景：应用很多
 * arr: [1,2,3,4]
 * 
 * arr.slice(0) --- [1,2,3,4] 浅拷贝
 * arr.slice(1) ---  [2,3,4]
 * 
 * arr.slice(1,3) --- [2,3]
 * 
 * arr.slice(-1) ---[4]
 * arr.slice(-2)----[3,4]
 * 
 */
const arraySlice = (sourceArr = []) => {
    const arr1 = sourceArr.slice(0);
    const arr2 = sourceArr.slice(1);
    const arr3 = sourceArr.slice(1, 3);
    const arr4 = sourceArr.slice(-1);
    const arr5 = sourceArr.slice(-2);
    return {
        arr1,
        arr2,
        arr3,
        arr4,
        arr5
    }
}
console.log('slice:', arraySlice([1, 2, 3, 4]));

/**
 * sort: 排序
 * arr.sort((a, b) => a - b) // 升序
 * arr.sort((a,b) => b-a) // 降序
 * 场景： 对数据的某个字段进行排序
 */

const arraySort = (sourceArr = []) => {
    const upSort = sourceArr.sort((a, b) => a - b)
    const downSort = sourceArr.sort((a, b) => b - a)
    return {
        upSort,
        downSort
    }
}
/**
 * splice: 对原数组进行删除，替换,截取操作，会影响原有数组
 * 场景：删除，替换，截取
 */

const arraySplice = () => {
    const arr1 = [1, 2, 3, 4].splice(1); // [2,3,4]
    const arr2 = [1, 2, 3, 4].splice(0, 2); // [1,2]
    const arr3 = [1, 2, 3, 4].splice(2, 1); // [1,2,4] 删除了索引为2的元素，返回剩下的元素
    const arr4 = [1, 2, 3, 4].splice(-1); // [4]
    return {
        arr1,
        arr2,
        arr3,
        arr4
    }
}
console.log('splice:', arraySplice())

/**
 * forEach: 循环数组
 * 场景： 对原数据进行循环
 */
const arrayForeach = (sourceArr) => {
    sourceArr.forEach(v => {
        console.log(v)
    })
}
console.log('forEach', arrayForeach([1, 2, 3, 4]))

/**
 * filter: 根据条件进行过滤，返回过滤后的结果
 * 场景： 需要过滤原数据中某些值时
 */

const arrayFilter = (sourceData, val) => {
    return sourceData.filter(v => v === val)
}
console.log('filter:', arrayFilter([1, 2, 3, 4], 4))

/**
 * flat(num): 打平多维数组,num是几，就会扁平到第几层
 *     (Infinity): 打平数组
 * 场景： 需要将多维数组打平成一维时
 */

const arrayFlat = (sourceArr) => {
    return sourceArr.flat(1)
}
console.log('flat:', arrayFlat([1, [1, 2]]))

/**
 * flatMap
 */

/**
 * map: 在原有基础上重新返回一个新数组
 */
const arrayMap = (sourceArr) => {
    return sourceArr.map(v => v + 1)
}
console.log('map:', arrayMap([1, 2, 3]))

/**
 * flatMap： 对原数据过滤操作
 */
const arrayFlatMap = (sourceArr) => {
    const arr = [{ id: 1, name: 'Maic', value: 0 }, { id: 2, name: 'Tom', value: 1 }]
    return {
        source: sourceArr.flatMap(v => typeof v === 'number' ? [v] : []),
        narr: arr.flatMap(v => [{ name: v.name, value: v.value }])
    }
}
console.log('flatMap:', arrayFlatMap([1, 2, [3, 4]]))
/**
 * flatMap: {
        source: [ 1, 2 ],
        narr: [ { name: 'Maic', value: 0 }, { name: 'Tom', value: 1 } ]
    }
 */

/**
 * toString: 将数组进行转换
 * 场景：想将一个数组变成字符串
 */
const arrayTostring = (sourceArr) => {
    return sourceArr.toString()
}
console.log('toString:', arrayTostring([1, 2, 3, 4]))