/**
 * class Cash {
  constructor(num) {}
}

const cash1 = new Cash(105);

const cash2 = new Cash(66);

const cash3 = cash1.add(cash2);

const cash4 = Cash.add(cash1, cash2);

const cash5 = new Cash(cash1 + cash2);

console.log(`${cash3}`, `${cash4}`, `${cash5}`);

// 预期输出 1元7角1分，1元7角1分，1元7角1分
 * 
 */

class Cash {
    constructor(num) {
        // if (typeof num !== "number" || num < 0 || !Number.isInteger(num)) {
        //     throw new Error("Invalid input: must be a non-negative integer.");
        // }
        this.amount = num;
    }
    add(other) {
        if (!(other instanceof Cash)) {
            throw new Error("Parameter must be an instance of Cash.");
        }
        return this.amount + other.amount;
    }
    // 静态方法
    static add(cash1, cash2) {
        if (!(cash1 instanceof Cash) || !(cash2 instanceof Cash)) {
            throw new Error("Parameters must be instances of Cash.");
        }
        return new Cash(cash1.amount + cash2.amount);
    }
    toString() {
        const yuan = Math.floor(this.amount / 100);
        const jiao = Math.floor((this.amount % 100) / 10);
        const fen = this.amount % 10;
        return `${yuan}元${jiao}角${fen}分`;
    }
    [Symbol.toPrimitive](hint) {
        if (hint === "number") {
            return this.amount; // 以数字形式参与计算
        }
        return this.toString(); // 默认返回字符串形式
    }
}

const cash1 = new Cash(105); // 1元5角
const cash2 = new Cash(66);  // 6角6分
const cash3 = cash1.add(cash2); // 1元5角 + 6角6分 = 1元7角1分
const cash4 = Cash.add(cash1, cash2); // 同样是 1元7角1分
const cash5 = new Cash(cash1 + cash2); // 使用重载行为，直接相加

console.log(`${cash3}`, `${cash4}`, `${cash5}`);