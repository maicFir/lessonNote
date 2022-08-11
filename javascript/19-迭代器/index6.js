

function* loadUI() {
    console.log('正在加载中...,开启loading...');
    const { data } = yield getList();
    console.log(data);
    console.log('加载完成,关闭loading')
}

const loadStart = loadUI();
function getList() {
    const mockData = {
        code: 0,
        data: [
            {
                name: 'Maic',
                age: 18
            },
            {
                name: 'Web技术学苑',
                age: 20
            }
        ]
    };
    setTimeout(() => {
        loadStart.next(mockData);// next传入数据当成yield状态机的返回值
    }, 1000)

}
// 继续执行yield后面的代码
loadStart.next();
