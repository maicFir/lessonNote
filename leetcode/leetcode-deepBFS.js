/**
 * 广度优先遍历
 * 
 * 利用队列，先进先出
 */
 const root = {
  name: '1',
  children: [
    {
      name: '2-1',
      children: [
        {
            name: '3-1',
            children: [
              {
                  name: '4-2',
                  children: null
              },
              {
                name: '4-1',
                children: null
              }
            ]
        },
        {
            name: '3-2',
            children: null
        }
      ]
    },
    {
      name: '2-2',
      children: null
    }
  ]
};
const deepBFS = (root, nodeList = []) => {
    // 将树放到一个队列中
    const queue = [root];
    // 循环判断队列的长度是否大于0
    while(queue.length > 0) {
      // 取出队列添加的节点
      const p = queue.shift();
      nodeList.push(p.name);
      // 根据节点是否含有children,如果有子节点则添加到队列中
      p.children &&  p.children.forEach(v => queue.push(v))
    }
    return nodeList;
}
console.time('BFS-start')
const result = deepBFS(root, []);
console.log(JSON.stringify(result, null, 2));
console.timeEnd('BFS-start')