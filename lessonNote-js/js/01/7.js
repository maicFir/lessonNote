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
handleSubmit();