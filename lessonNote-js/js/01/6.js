const shopList = [{ title: 'Apple', price: 10 }, { title: 'banana', price: '' }, { title: 'orange', price: 5 }];
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
const handleSubmit = () => {
    if (hasPriceEmpty(shopList)) {
        return;
    }
    // 下面的继续业务操作
    console.log('go on...');
}
handleSubmit();