
/**
 * 最长公共前缀
 * ["flower","flow","flight"] -> fl
 * ["dog", "racecar", "car"]-> ''
 */

const findLongStrPrex = (arr) => {
    // 默认取数组的第一个值
    let start = arr[0];
    // 从数组的第二开始遍历
    for (let i = 1; i < arr.length; i++) {
        if (start.length) {
            let j = 0;
            // 遍历第二个，第三个元素字符的长度
            for (; j < arr[i].length; j++) {
                // 前缀是否与后面的的长度相等
                if (start[j] !== arr[i][j]) {
                    break;
                }
            }
            // 截取
            start = start.substr(0, j);
        }
    }
    return start
}
/**
 * 方法2
 */
const longestCommonPrefix = function (arr) {
    let start = arr[0] || '';
    // 用正则匹配
    let regex = new RegExp('^' + start);
    // 从第二个开始比较
    for (var i = 1; i < arr.length; i++) {
        // 比较其它字符看是否符合，若不符合让正则条件的字符递减
        while (!regex.test(arr[i]) && start.length) {
            // 如果不相等就减少start的长度
            start = start.slice(0, start.length - 1);
            // 递减后重新声明正则
            regex = new RegExp('^' + start);
        };
    };
    return start;
};
console.log(findLongStrPrex(["flower", "flow", "flight"]), longestCommonPrefix(["dog", "dogt"]));