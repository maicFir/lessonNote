// tree

/**
 * 深度优先遍历
 * 
 * 尽可能的搜索树的分支，遇到一个节点就会遍历子节点，不会立即遍历兄弟节点，访问根节点的children,进行深度优先遍历
 */
const root = {
   id: '1',
   children: [
     {
       id: '1-1',
       children: [
         {
           id: '1-1-2',
         },
         {
           id: '1-1-3',
         }
       ]
     },
     {
       id: '1-2',
       children: [
        {
          id: '1-2-1',
        },
        {
          id: '1-2-2',
        }
       ]
     }
   ]
}
/**
 * 深度优先遍历
 */
const deepDFS  = (root, nodeList = []) => {
    if (root) {
      nodeList.push(root.id)
        if (root.children && root.children.length > 0) {
          const child = root.children;
          for (let i=0;i<child.length;i++) {
            deepDFS(child[i], nodeList);
          }
        }
        
    }
    return nodeList;
}
console.log(JSON.stringify(deepDFS(root), null,2));

/**
 * 广度优先遍历
 * 先遍历兄弟节点，再遍历自己节点
 */
const deepBFS = (tree, list = []) => {
  let stack = [tree];
  while (stack.length > 0) {
    const node = stack.shift();
    list.push(node.id)
    if (node.children) {
      node.children.forEach(v => stack.push(v))
    }
  }
  return list
}
console.log(JSON.stringify(deepBFS(root), null,2));
// or 
const deepBFS2 = (tree, list = []) => {
    const p = [...tree];
    let node = null;
    while(node = p.shift()) {
      list.push(node.id);
      node.children && p.push(...node.children)
    }
    return list
}
console.log(JSON.stringify(deepBFS2(root), null,2));