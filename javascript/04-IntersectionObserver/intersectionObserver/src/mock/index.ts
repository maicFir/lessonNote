import Mockjs from 'mockjs';
import mockFetch from 'mockjs-fetch';
mockFetch(Mockjs);

 // 生成随机长度的数组
 const createMapRandom = (len: number) => {
    const data = new Array(len);
    return data.fill('Maic')
}
Mockjs.mock('\/shoplist\/list.json', () => {
    return {
        code: 0,
        data: Mockjs.mock({
            'list|10': [{
                'id|+1': createMapRandom(10).map(() => Mockjs.mock('@id')),
                'adress|1': createMapRandom(10).map(() => Mockjs.mock('@city')),
                "age|1": createMapRandom(10).map(() => Mockjs.mock('@integer(0,100)')),
                'name|1': createMapRandom(10).map(() => Mockjs.mock("@cname")),
               }
            ]
        })
    }
});
