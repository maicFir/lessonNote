const R = require('ramda');
const eazyUtils = require('eazyutils');
const cityMap = [
    {
        city: '北京',
    },
    {
        city: '上海'
    },
    {
        city: '深圳'
    }
];
// 找到上海
const shanghaiCity = R.find(R.propEq('city', '上海'))(cityMap);
console.log(shanghaiCity);
console.log(eazyUtils.fillterConfigArr(cityMap, { city: '北京' }, 'city'))