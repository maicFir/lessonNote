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
}
// // 深度优先遍历
const deepDFS = (root, nodeList = []) => {
  if (root) {
      nodeList.push(root.name);
      root.children && root.children.forEach(v => deepDFS(v, nodeList))
  }
  /**
   * 与下面等价
   * 
   if (root) {
     nodeList.push(root.name);
     const child = root.children;
     if (child && child.length > 0) {
       for (let i=0;i<child.length;i++) {
          deepDFS(child[i], nodeList)
       }
     }
   }
   * 
   */
  return nodeList
}
console.time('DFS-start');
console.log(JSON.stringify(deepDFS(root, []), null, 2));
console.timeEnd('DFS-start')

