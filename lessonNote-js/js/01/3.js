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