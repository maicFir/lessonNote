const shopList = [{ title: 'Apple', price: 10 }, { title: 'banana', price: '' }, { title: 'orange', price: 5 }];
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
const handleSubmit = () => {
    if (hasPriceEmpty(shopList)) {
        return;
    }
    // 下面的继续业务操作
    console.log('go on...');
}
handleSubmit();