
/**
 * 根据原数据pid，转行成树结构
 * const arr = [{ id: 0, pid: 1, order: 1 }, 
 *  { id: 1, pid: 0, order: 1 }, 
 *  { id: 2, pid: 0, order: 1 }, { id: 3, pid: 2, order: 1 }, { id: 4, pid: 2, order: 1 }, { id: 5, pid: 3, order: 1 }, { id: 6, pid: 6, order: 1 }, {id: 7, pid: 1, order: 2}];
 * 
 * 转换成
 [
    {
        id: 0,
        pid: 1,
        order: 1,
        child: [
            {
              id: 1,
              pid: 0,
              order: 1,
              child: [
                 { id: 7, pid: 1, order: 2}
              ]
            },
            {
              id: 2,
              pid: 0,
              order: 1
            }
        ]
    },
    {   id: 3, pid: 2, order: 1, 
        child: [
            { id: 5, pid: 3, order: 1 }
        ] 
    },
    { id: 4, pid: 2, order: 1 },
    { id: 6, pid: 5, order: 1 }
 ]
 * 题意：将pid与id相等的数据归类到id的child中去
 */

var sourceData = [
    { id: 0, pid: 1, order: 1 },
    { id: 1, pid: 0, order: 1 },
    { id: 2, pid: 0, order: 1 },
    { id: 3, pid: 2, order: 1 },
    { id: 4, pid: 2, order: 1 },
    { id: 5, pid: 2, order: 1 },
    { id: 5, pid: 3, order: 1 },
    { id: 6, pid: 5, order: 1 },
    { id: 7, pid: 1, order: 2 }
];


const transformTree = (source) => {
    // 拷贝一份新的数据
    let newData = JSON.parse(JSON.stringify(source));
    for (let i = 0; i < newData.length; i++) {
        const item = newData[i];
        item.child = [];
        // 从第二个开始比较
        for (let j = i + 1; j < newData.length; j++) {
            // 0-1，0-2，0-3,...,1-1，1-2...这样依次比较
            if (item.id === newData[j].pid) {
                item.child.push(newData[j]);
            }
        }
    }
    return newData
}
const transformTree2 = (source, arr) => {
    source.forEach(v => {
        arr.push(v)
    })
    for (let i = 0; i < arr.length; i++) {
        const item = JSON.parse(JSON.stringify(arr[i]));
        // 每一项添加一个child属性
        item.child = [];
        for (let j = i + 1; j < arr.length; j++) {
            // 0-1，0-2，0-3,...,1-1，1-2...这样依次比较
            if (item.id === arr[j].pid) {
                item.child.push(arr[j]);
            }
        }
    }
    return arr
}
const transformTree3 = (source) => {
    const arr = JSON.parse(JSON.stringify(source));
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        item.child = arr.slice(i + 1, arr.length).filter(v => v.pid === item.id);
    }
    return arr;
}
// console.log(JSON.stringify(transformTree(sourceData), null, 2));
// console.log(sourceData);

console.log(JSON.stringify(transformTree3(sourceData), null, 2));




