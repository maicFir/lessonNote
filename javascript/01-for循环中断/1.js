const shopList = [{ title: 'Apple', price: 10 }, { title: 'banana', price: '' }, { title: 'orange', price: 5 }]
const hasPriceEmpty = (arr) => {
    bool = false; // 默认都不是空
    arr.forEach(v => {
        if (v.price === '') {
            bool = true;
            // break;
            return;
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
handleSubmit();