function* getList() {
    yield new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
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
            })
        }, 1000)
    })
}

function* loadUI() {
    console.log('正在加载中...,开启loading...');
    yield* getList();
    console.log('加载完成,关闭loading')
}

const loadStart = loadUI();
const currentData = loadStart.next().value;
currentData.then((res) => {
    if (res) {
        console.log(res);
    }
    loadStart.next(); // 关闭加载，加载完成
});
