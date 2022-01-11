你知道 JS 中断循环有哪些吗？除了 for 循环的 break,还有哪些可以中断循环？接下来笔者以实际业务例子，分享几种能中断循环的方案，希望你在实际业务中能用得上。
### forEach
在实际业务中你可能会写以下的业务代码，举个栗子，`在一个循环表单域中，你需要内容为空，就禁止提交`
```js
// 1.js
const shopList = [{title: 'Apple', price: 10}, {title: 'banana', price: ''},{title: 'orange', price: 5}]
```
以上是一组数组源，于是你的思路可能会这样
```js
// 1.js
const hasPriceEmpty = (arr) => {
   bool = false; // 默认都不是空
  arr.forEach(v => {
      if (v.price === '') {
        bool = true;
        break;
      }
      console.log(v);
  });
  return bool;
};
const handleSubmit = () => {
    if (hasPriceEmpty(shopList)) {
      return;
    }
    // 下面的继续业务操作
    console.log('go on...');
}
handleSubmit(shopList);
```
运行测试命令`node 1.js`，发现报错了
![](https://files.mdnice.com/user/24614/ba12f4cf-334d-40a3-ace5-301f9df4f769.png)
于是你想到`return`能终止循环吗
```javascript
...
const hasPriceEmpty = (arr) => {
    let bool = false; // 默认都不是空
    arr.forEach(v => {
        if (v.price === '') {
            bool = true;
            // break;
            return;
        }
        console.log(v)

    });
    return bool;
};
```
![](https://files.mdnice.com/user/24614/da06600a-3343-4916-a703-83e1cc9e8bbc.png)
你会发现并没有打印`go on...`,确实是`hasPriceEmpty`这个方法已经达到了自己的业务要求,但是打印出了第一组和第三组数据。

于是`mdn`上关于 forEach 有这么一段话，`Note: There is no way to stop or break a forEach() loop other than by throwing an exception. If you need such behavior, the forEach() method is the wrong tool.`

大概意思就是除了抛出异常，break 无法中断循环，如果你想有中断行为，`forEach`不是一个好办法,且`forEach`循环，`return`无法中断循环。

于是你就想中断循环，你改下了下代码

```javascript
 ...
const hasPriceEmpty = (arr) => {
    bool = false; // 默认都不是空
    arr.forEach(v => {
        if (v.price === '') {
            bool = true;
            throw new Error('给我中断循环吧')
        }
         try {
            console.log(v)
        } catch(e) {
          console.log(e);
          console.log(v)
         }
    });
    return bool;
};
```
对不起，页面只打印了第一组数据，且页面抛出了异常
![](https://files.mdnice.com/user/24614/c15105f1-82be-447a-90b7-4595236a5da7.png)
我确实做到中断forEach循环的异常了，但是这个错误作为一个强迫症患者，我是不能接受的。

### for循环break中断
这是笔者认为大部分人都能想到的办法
```javascript
const shopList = [{ title: 'Apple', price: 10 }, { title: 'banana', price: '' }, { title: 'orange', price: 5 }];
const hasPriceEmpty = (arr) => {
    let bool = false; // 默认都不是空
    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i].price === '') {
            bool = true;
            break;
        }
        console.log(arr[i]);
    }
    return bool;
};
const handleSubmit = () => {
    if (hasPriceEmpty(shopList)) {
        return;
    }
    // 下面的继续业务操作
    console.log('go on...');
}
handleSubmit();
```
结果很令人欢喜，完美
![](https://files.mdnice.com/user/24614/0c800f2c-9afc-41a4-9465-eb77361cb513.png)
通常这种方式用得最多，但是作为老司机，你还需要掌握多一点其他方法。于是中断循环还有...
### while 循环中断
```javascript
...
const hasPriceEmpty = (arr) => {
    let bool = false; // 默认都不是空
    let index = 0
    while (index < arr.length) {
        index++;
        console.log(arr[index], '000');
        if (arr[index].price === '') {
            bool = true;
            break
        }
        console.log(arr[index], '111');
    }
    return bool;
};
...
```
结果喜大普奔，依然可以，测试结果如下
![](https://files.mdnice.com/user/24614/d4b2ea6b-9acd-49e6-9146-b69ff6cf12e0.png)
这已经达到我们想要的效果了。
### 利用iterable迭代器，for...of 中断循环
这里`iterable`是指具有改特性的迭代器，比如`Array`、`Map`、`Set`
#### Array
```javascript
...
const hasPriceEmpty = (arr) => {
    let bool = false; // 默认都不是空
    for (let item of arr) {
        if (item.price === '') {
            bool = true;
            break;
        }
        console.log(item, '111');
    }
    return bool;
};
...
```
于是结果依旧ok
![](https://files.mdnice.com/user/24614/ed744495-537b-4aa8-b275-90633f2baba3.png)
为什么数组可以用`for..of`循环，你可以在控制台打印注意到
![](https://files.mdnice.com/user/24614/83a16bb4-4a5e-4c39-a99c-543d92ec73e6.png)
原来默认申明的`[]`原型链上有一个这样的`iterator`的迭代器,所以你可以利用iterator的特性，用`for...of`中断循环
#### Map
```javascript
...
const hasPriceEmpty = (arr) => {
    let bool = false; // 默认都不是空
    const map = new Map();
    // 将数据设置到Map中
    arr.forEach(item => {
        map.set(item.title, item);
    })
    for (let s of map) {
        console.log(s, '000')
        if (s[1].price === '') {
            bool = true;
            break;
        }
        console.log(s, '111');
    }
    return bool;
};
...
```
结果如下
![](https://files.mdnice.com/user/24614/27b359bf-58f6-48f4-9115-043d60843b9d.png)

以上代码也等价于
```javavacript
const sourceData = [{ title: 'Apple', price: 10 }, { title: 'banana', price: '' }, { title: 'orange', price: 5 }];
const shopList = new Map([sourceData]);

const hasPriceEmpty = (arr) => {
    let bool = false; // 默认都不是空
    for (let s of arr) {
        console.log(s, '000')
        if (s[1].price === '') {
            bool = true;
            break;
        }
        console.log(s, '111');
    }
    return bool;
};

const handleSubmit = () => {
    if (hasPriceEmpty(shopList)) {
        return;
    }
    // 下面的继续业务操作
    console.log('go on...');
}
handleSubmit(shopList);
```
就是利用`Map`有`iterable`的可迭代，通过`for...of`中断循环,具体同样可以在控制台验证
![](https://files.mdnice.com/user/24614/fd26b749-300e-4095-be23-11e71573a8fc.png)
#### Set
同样是一个栗子举证
```javascript
const shopList = [{ title: 'Apple', price: 10 }, { title: 'banana', price: '' }, { title: 'orange', price: 5 }];
const hasPriceEmpty = (arr) => {
    let bool = false; // 默认都不是空
    const setArr = new Set([...shopList]);
    for (let s of setArr) {
        console.log(s, '000')
        if (s.price === '') {
            bool = true;
            break;
        }
        console.log(s, '111');
    }
    return bool;
};

const handleSubmit = () => {
    if (hasPriceEmpty(shopList)) {
        return;
    }
    // 下面的继续业务操作
    console.log('go on...');
}
handleSubmit(shopList);
```
![](https://files.mdnice.com/user/24614/20437ce4-2e1c-4048-a838-54008b335633.png)
`Set`与`Map`一样，可以在控制台验证一下`iterable`属性，我就不验证了，呜呜。
### 对象能被`for...of`遍历么
答案：不能,具体见下面
![](https://files.mdnice.com/user/24614/61ed522f-9c40-487e-bcbc-92a708f12fc8.png)
对象不具备`iterable`特性，所以不能`for..of`循环。

### 总结
- `forEach`的中断循环可以抛异常来达到目的，但是不适合此业务场景
- `for` 循环通用大法，`break`可以终止循环
- `while`循环,`break`也可以终止循环
- `iterable`特征的可迭代器，`for...of`，`break`中断循环,并且最重要的一点是在`break`后，当前索引条件不会继续执行，也就是`for..of`中，执行`break`后，后面语句都不会执行

最后，喜欢的点个赞，在看，收藏等于学会，我会以循序渐进的方式一直分享下去。
