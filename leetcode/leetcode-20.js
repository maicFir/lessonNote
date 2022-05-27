/**
 * 
 * 有效括号 leetcode 20
 * 
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效
 * 有效字符串满足条件
 * 1.左括号必须用相同的类型的右括号闭合
 * 2.左括号必须一正确的顺序闭合
 * */

const isVaild = (s) => {
    var stack = [];
    for (let i=0;i<s.length;i++) {
      const str = s[i];
      if (str === '(') {
        stack.push(')');
      } else if (str === '{') {
        stack.push('}');
      } else if (str === '[') {
        stack.push(']')
      } else if (str !== stack.pop()) {
        return false
      }
    }
  
    return stack.length === 0;
}
console.log(isVaild("({})"), '===1');

const isValid2 = (str) => {
  const stack = [];
  const map = new Map([
    ['(', ')'],
    ['{', '}'],
    ['[', ']'],
  ]);
  for (let i=0;i<str.length;i++) {
    const c = str[i];
    // 如果是左边(,{,[就入栈
    if (map.has(c)) {
      stack.push(c)
    } else {
      // 取出栈中的值
      const stackVal = stack[stack.length -1];
      // 如果有这个值就出栈
      if (map.get(stackVal) === c) {
        stack.pop();
      } else {
        return false;
      }
    }
  }
  return stack.length === 0;
}
console.log('2222', isValid2("({})"));