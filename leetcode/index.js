/**
 * leetcode:1
 * 题目：两数之和
 * 给定一个数组(source)与一个目标值(target)，请在数组中找到目标值(target)之和的两个下标，并找出这两个值
 * 假设数组中每一个元素不能重复，且输入结果只能有一种答案
 * 例如：示例1：num = [1,3,5] target = 6  结果输出：[0,2]
 *      示例2: num = [1,3,2,4,5] target = 6 结果输出: [0,4],[2,3]
 * 
 * 1.双重循环，数组中依次第一个与第二个、第三个相加之和是否等于目标值，如果相等，则返回当前索引下标
 * 
 * 2.利用map的key唯一性,将数组的值当成map的key,索引当成map的值, 反向法时间换空间，如果目标值-数组的值=map中存在的值，那么就可以返回当前map的值索引
 */

var twoSum = function (nums, target) {
  //  var index = 0;
  //  var len = nums.length;
  //  while(index < len) {
  //    var j = index++
  //    if (nums[j] + nums[index] === target) {
  //      return [index, j]
  //    }
  //  }

  // 双重循环
  // for (let i = 0; i < nums.length ; i++) {
  //   for (let j = i+1; j < nums.length; j++) {
  //     console.log(nums[i], nums[j]);
  //     if (nums[i] + nums[j] === target) {
  //      return [i,j]
  //     }
  //   }
  // }
  // 利用map
  let retMap = new Map();
  let len = nums.length;
    for (let i = 0; i < len; i++) {
    // 将数组中的值当成key,对应的key当成下标索引
    retMap.set(nums[i], i);
  }
  for (let i = 0; i < len; i++) {
    var nextVal = target - nums[i];
    if (retMap.has(nextVal)) {
      return [i, retMap.get(nextVal)]
    }
  }
}
console.log(twoSum([1, 3, 2], 5));

/**
 * lootcode:3
 * 题目：给定一个字符串，求无重复字符的最长子串
 * 例子：示例1: abcabcbb   结果最长不重复的字符串abc 且长度是3
 *      示例2: abbefgaca  befg 长度是4
 * 1、利用map,先将字符串的值存入map中，如果存在，则找出重复值的下一位，继续循环，清空map,和count,返回count的长度
 * 2、利用队列
 */

var lengthOfLongestSubstring = function (s) {
  let map = new Map();
  let result = 0, count = 0, i = 0;
  while (i < s.length) {
    if (!map.has(s[i])) {
      map.set(s[i], i);
      count++;
      i++
    } else {
      if (result < count) {
        result = count;
      }
      i = map.get(s[i]) + 1; // 从重复字符的索引下一位开始重新循环
      map.clear(); // 清空map
      count = 0; // 重置count
    }
  }
  return result < count ? count : result;
};
/**
 * leetcode:4
 * 题目：寻找两个正序数组的中位数
 * 给定两个大小分别为m和n的正序（从小到大），数组num1和num2,请你找出并返回这两个正序数组的中位数
 * 
 * 题解：
 *     主要分两种情况：数组长度为偶数时，就是中间两位数之和/2
 *                  数组长度为基数时，就是中间那个数
 *     例如：[1,4,6], [8] -> [1,4,6,8] 数组长度为偶数，那么就是 (4+6)/2  求得的中位数就是5
 *           [1,3,5] [7,9] ->[1,3,5,7,9] 数组长度为基数，那么就是中间那个数
 *          为偶数时，找到后一个数的索引下标，len / 2，那么前一个数的下标就是 len / 2 -1
 *          (arr[arr.length / 2] + arr[(arr.length / 2) -1]) / 2
 *          为基数时，找到中间那个数的索引 (arr.length - 1) / 2 就是中间数的下标
 *          arr[(arr.length -1)/2]
 *            
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  const arr = [...nums1, ...nums2].sort((a, b) => a - b);
  const len = arr.length;
  if (arr.length === 0) {
    return 0;
  }
  // 如果是偶数
  if (len % 2 == 0) {
    const i = len / 2; // 偶数中间位后一位
    return (arr[i] + arr[i - 1]) / 2 // 偶数中间的后一位与前一位之和 / 2
  } else {
    const j = len - 1; // 基数中间索引，直接返回中间那个值
    return arr[j / 2]
  }
};
console.log(findMedianSortedArrays([1, 2], [5]));

/**
 * leetcode:5
 * 题目：给你一个字符串 s，找到 s 中最长的回文子串。
 */
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {

};
/**
 * leetcode:7
 * 题目： 给定一个32位的有符号数x,返回将x的数字反转后的结果。
 * 
 * 输入x=123 结果:321
 *    x=120   结果:21
 * 结果没有通过，但是实际效果已经可以
 */
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  const num = x.toString();
  const arr = num.split('').reverse();
  const lastIndex = arr.length - 1;
  if (arr[lastIndex] === 0 || arr[lastIndex] === '-') {
    const ret = arr.slice(0, lastIndex).toString().replace(/,/g, '');
    if (/-/.test(num)) {
      return Number(`-${ret}`)
    }
  }
  return Number(arr.toString().replace(/,/g, ''));
};

/**
 * leetcode: 9
 * 题目：回文数，给定一个整数x,如果是一个回文整数，则返回true,否则返回false
 *      回文数指的是正序或者到序都是一样的整数
 */
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  const reverseNum = Number(String(x).split('').reverse().toString().replace(/,/g, ''));
  return x === reverseNum
};
isPalindrome(121);


/**
 * 题目： 判读有效括号
 * 左括号必须用相同类型的右括号闭合。
   左括号必须以正确的顺序闭合。
   循环遍历字符串，先判断前面(,然后添加),最后pop()取出对应的值，直到最后数组取完，长度为0
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    let c = s[i];
    if (c === '(') {
      stack.push(')');
    } else if (c === '[') {
      stack.push(']');
    } else if (c === '{') {
      stack.push('}');
    } else if (c !== stack.pop()) {
      return false
    }
  }
  return stack.length === 0;
};

/**
 * leecode: 22 括号生成
 * 设计一个函数，能够生成有效组合的()
 */
/**
 * @param {number} n
 * @return {string[]}
 */
function backtracking(n, result, left, right, str) {
  if (right > left) return;
  if (left === n && right === n) {
    result.push(str);
    return;
  }
  if (left < n) {
    backtracking(n, result, left + 1, right, str + '(')
  }
  if (right < left) {
    backtracking(n, result, left, right + 1, str + ')');
  }
}
var generateParenthesis = function (n) {
  const list = [];
  backtracking(n, list, 0, 0, "");
  return list;
};

/**
 * leetcode:27 移除元素
 * @description 给定一个数组num和一个值val,需要原地移除所有的数值等于val的元素，并返回移除后数组新长度
 */

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != val) {
      nums[k++] = nums[i]
    }
  }
  return k;
};

/**
 *leetcode:28
   描述：实现strStr,给一个字符串haystack和needle,找出该字符串的下标
 * 
 */
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  return haystack.indexOf(needle)
};

/**
 * leetcode:46
 * 描述：全排列  给定一个不重复的数组，返回所有可能的全排列，你可以按照任意顺序排列
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  const res = []
  const track = (path) => {
    if (path.length === nums.length) {
      res.push(path);
    }
    for (let item of nums) {
      // 如果path中不存在
      if (path.indexOf(item) === -1) {
        track([...path, item]);
      }
    }
  }
  track([]);
  return res;
};
/**
 * 
 * leetcode: 49 字母异位词分组
 * 描述：给定一个字符串数组，将字母异位词组合在一起，可以按任意顺序返回结果列表
 */
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const ret = {};
  for (const item of strs) {
    const val = item.split('').sort().join('');
    if (ret[val]) {
      ret[val].push(item)
    } else {
      ret[val] = [].concat(item);
    }
  }
  return Object.values(ret)
};
/**
 * 
 * leetcode:26 删除有序数组中的重复项，返回最新数组的长度
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  const len = nums.length;
  if (len === 0) return 0;
  let j = 1;
  for (let i = 1; i < len; i++) {
    if (nums[i] !== nums[i - 1]) {
      nums[j++] = nums[i]
    }
  }
  return j;

};
/**
 * leetcode: 58 最后单词的长度
 */
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  const ret = s.trim().replace(/\s+/g, ',');
  const arr = ret.split(',');
  return arr[arr.length - 1].length;
};
/**
 * leetcode:53  最大子数组和  给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和
 * @param {*} nums 
 * @returns 
 */
var maxSubArray = function (nums) {
  let arr = Array(nums.length); //状态定义为以i结尾的最大子数组和
  arr[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    //下面是状态转移方程
    if (arr[i - 1] > 0) { //如果前面累积起来大于0
      arr[i] = arr[i - 1] + nums[i];  //前面的积蓄是正的资产是有意义的，就加起来，最后结果会更大
    } else {  //前面的积蓄是负债，就不要，自立门户从自己开始
      arr[i] = nums[i];
    }
  }
  return Math.max(...arr);
}
/**
 * leetcode 70 爬楼梯
 */
/**
 * 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
   每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n == 0) return 0;
  if (n === 1) return 1;
  if (n === 2) return 2;
  let a = 1, b = 2, c = 0;
  for (let i = 2; i < n; i++) {
    c = a + b;
    a = b;
    b = c;
  }
  return c;
};
// /**
//  * leetcode:40
//  * 组合数总和： 给定一个候选人编号集合candidates和一个目标target数，找出candidates所有可以使数字之和为target的组合
//  * 
//  ** /
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  candidates.sort();
  let result = [];
  function loopSum(start, tempArr) {
    let sum = tempArr.reduce((a, b) => a + b, 0);
    if (sum === target) {
      result.push(tempArr.slice());
      return;
    }
    if (sum > target) {
      return;
    }
    // 总数小于target时，遍历循环candidates，从start位开始
    if (sum < target) {
      for (let i = start; i < candidates.length; i++) {
        // sort
        if (i - 1 >= start && candidates[i - 1] == candidates[i]) continue;
        tempArr.push(candidates[i]);
        loopSum(i + 1, tempArr);
        tempArr.pop(); // 每次取值去掉当前数组
      }
    }
  }
  loopSum(0, []);
  return result;
};
/**
 * leetcode: 69 x的平方根
 * 
 */

/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  return Math.floor(Math.pow(x, 0.5))
};
/**
 * leetcode:66 给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function (digits) {
  let index = digits.length - 1;
  // 获取最后一个值，如果等于9则将它置0，然后当前索引-1
  while (digits[index] === 9) {
    digits[index] = 0;
    index--
  }
  if (index < 0) {
    digits.unshift(1); // 向数组前面加1
  } else {
    digits[index] += 1; // 后一位加1
  }
  return digits;
};
/**
 * leetcode:100 相同的树
 * @param {*} nums 
 * @returns 
 * 给定两颗二叉树的节点p,q,编写一个函数来检验这两颗树是否相同，如果两颗树在结构上相同，并且节点具有相同的价值，则认为他们是相同的
 */

function isSameTree(p, q) {
  if (p === null && q === null) return true;
  if (p === null || q === null) return false;
  if (p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}


/**
 * leetcode: 136 只出现一次的数字
 * 
 * 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次，找出那个只出现一次的元素
 * 例如：[2,2,1]则输出1
 */
var singleNumber = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    const val = nums[i];
    let count = 0;
    for (let j = 0; j < nums.length; j++) {
      if (nums[j] === val) {
        count += 1;
      }
    }
    // 只出现过一次
    if (count === 1) return val
  }
  return 0;
}
/**
 * leetcode: 125. 验证回文串
 * 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
 */
var isPalindrome = function (s) {
  s = s.replace(/[\W|_]/g, "").toLowerCase();
  if (s.length < 2) {
    return true;
  }
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
};
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  const loop = (node, ret = []) => {
    if (node) {
      ret.push(node.val);
      loop(node.left, ret);
      loop(node.right, ret);
    }
    return ret;
  }
  return loop(root, [])
};

/**
 * 对称二叉树 leetcode:101
 * 给定一个二叉树的根节点root，检查是否轴对称
 */
const check = (left, right) => {
  if (!left && !right) return true;
  if (!left || !right) return false;
  return left.val === right.val && check(left.left, right.right) && check(right.right, left.left)
}
var isSymmetric = function (root) {
  return check(root, root);
};
/**
 * leetcode:151 颠倒字符串中的单词
 */
var reverseWords = function (s) {
  const nStr = s.trim();
  const arr = nStr.replace(/\s+/g, ' ').split(' ').reverse();
  return arr.join(' ');
};

/**
 * leetcode:24 两两交换链表中的节点
 */
var swapPairs = (head) => {
  if (head === null || head.next === null) {
    return head;
  }
  const nhead = head.next;
  head.next = swapPairs(nhead.next);
  nhead.next = head;
  return nhead;
}

/**
 * 组合总数：leetcode:39
 * 给你一个无重复元素数组condidates和一个目标整数target,找出condidates中可以使数字和为目标树target的所有不同组合，
 * 并以列表形式返回，你可以按任意顺序返回这些组合
 * 思路采用回溯
 */
var combinationSum = function (candidates, target) {
  const result = [];
  const path = [];
  candidates.sort();
  const len = candidates.length;
  const loop = (start, total) => {
    if (total > target) return;
    if (total === target) {
      result.push([...path])
    }
    for (let i = start; i < len; i++) {
      const curent = candidates[i];
      if (curent > target - total) continue;
      path.push(curent);
      total += curent;
      loop(i, total);
      path.pop();
      total -= curent;
    }
  }
  loop(0, 0);
  return result
};

/**
 * 
 * leetcode:14
 * 最长公共字符串
 */
var longstrCommonPrefix = (strs) => {
  if (strs.length === 0) return '';
  // 第一个字符串
  let start = strs[0];
  for (let i = 1; i < strs.length; i++) {
    let j = 0;
    for (; j < start.length && j < strs[i].length; j++) {
      if (start[j] !== strs[i][j]) {
        break;
      }
    }
    start = start.substr(0, j);
    if (start === '') {
      return start;
    }
  }
  return start;
}
var threeSum = function (nums) {
  let ans = [];
  const len = nums.length;
  if (nums == null || len < 3) return ans;
  nums.sort((a, b) => a - b); // 排序
  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) break; // 如果当前数字大于0，则三数之和一定大于0，所以结束循环
    if (i > 0 && nums[i] == nums[i - 1]) continue; // 去重
    let L = i + 1;
    let R = len - 1;
    while (L < R) {
      const sum = nums[i] + nums[L] + nums[R];
      if (sum == 0) {
        ans.push([nums[i], nums[L], nums[R]]);
        while (L < R && nums[L] == nums[L + 1]) L++; // 去重
        while (L < R && nums[R] == nums[R - 1]) R--; // 去重
        L++;
        R--;
      }
      else if (sum < 0) L++;
      else if (sum > 0) R--;
    }
  }
  return ans;
};
/**
 * 给定一个非负索引rowIndex,返回杨辉三角的第rowIndex行
 * leetcode:119 杨辉三角
 */
var getRow = (rowIndex) => {
  let pre = [], cur = [];
  for (let i = 0; i <= rowIndex; i++) {
    cur = new Array(i + 1).fill(0);
    cur[0] = cur[i] = 1;
    for (let j = 1; j < i; j++) {
      cur[j] = pre[j - 1] + pre[j]
    }
    pre = cur;
  }
}

/***
 * leetcode:  给定一个长度为n的数组nums,其中，nums所有的范围都在[1,n]
 * 
 * 数组中找到循环的重复的数字，复杂度为O(n)
 */

const findNumberRepeat = (source) => {
  const result = new Array(source.length).fill(0);
  const arr = [];
  for (let i = 0; i < result.length; i++) {
    if (!result[source[i]]) {
      result[source[i]] = 1;
      continue;
    }
    arr.push(source[i]);
  };
  return arr;
}

/**
 * 两个数组合并成一个数组
 * 请把两个数组 ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']，
 * 合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']。
 */
function hebingArr() {
  const arr1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'];
  const arr2 = ['A', 'B', 'C', 'D'];
  const narr = arr2.map(v => v + 3);
  const result = [...arr1, ...narr];
  return result.sort().map(v => {
    if (v.includes('3')) {
      v = v.split('3')[0]
    }
    return v;
  })
}
hebingArr();

/**
 * 冒泡排序 降序
 */
function bubuleSort() {
  const arr = [1, 2, 5, 3, 5, 6, 4];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] < arr[j + 1]) {
        var t = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = t;
      }
    }
  }
  return arr;
}
/** 升排序**/
function descBubleSort() {
  const arr = [1, 2, 5, 3, 5, 6, 4];
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        var t = arr[j];
        arr[j + 1] = arr[j];
        arr[j] = t;
      }
    }
  }
}
/** 冒泡3 */
function bubleSort3() {
  const arr = [1, 2, 5, 3, 5, 6, 4];
  const swap = (arr, i, j) => {
    [arr[j], arr[i]] = [arr[i], arr[j]]
  }
  for (let i = arr.length; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[j + 1]) {
        swap(arr, j, j + 1)
      }
    }
  }
  return arr;
}
/**
 * 快排排序
 */
function quickSort() {
  let arr = [1, 2, 5, 3, 5, 6, 4]
  if (arr.length <= 1) {
    return arr;
  }
  const left = [];
  const right = [];
  // 获取中间位置
  const cIndex = Math.floor(arr.length / 2);
  // 获取中间位置的值
  const cValue = arr.splice(cIndex, 1)[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < cValue) {
      left.push(arr[i])
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat(cIndex, quickSort(right))
}
/***
 * 二分查找
 */
function binarySearch(arr, target) {
  let left = 0; // 数组第一个位置
  let right = arr.length - 1; // 数组中最后一个位置
  // [left, right] 区间查找
  while (left <= right) {
    // 取数组中间位置
    let mid = left + Math.floor((right - left) / 2);
    // 目标元素在中间位置的左边
    if (target < arr[mid]) {
      right = mid - 1; // [left, mid-1]
    } else if (target > arr[mid]) {
      // 目标元素在中间元素的右边，那么左区间[mid+1,right]
      left = mid + 1;
    } else {
      return mid // 直到找到target,相等就直接返回mid中间下标位置
    }
  }
  return -1; // 没有找到就返回-1
}
binarySearch([1, 3, 4, 5, 7, 8], 3); // 1
