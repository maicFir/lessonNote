
// 生成mock数据
const mockServer = (path, { pageNum, pageSize, total }) => {
    // 生成随机长度的数组
    const createMapRandom = (len) => {
        const data = new Array(len);
        return data.fill('Maic')
    }
    const childrenData = Mock.mock({
        [`data|${Math.floor(total / pageSize)}`]: [
            {
                "name|1": createMapRandom(100).map(() => Mock.mock("@cname")),
                "age|1": createMapRandom(100).map(() => Mock.mock("@integer(0,100)")),
                "adress|1": createMapRandom(100).map(() => Mock.mock("@city")),
                "id|1": createMapRandom(100).map(() => Mock.mock("@id")),
            },
        ],
    });
    Mock.mock(path, {
        code: 0,
        message: "成功",
        [`result|${total}`]: [
            {
                "name|+1": createMapRandom(10).map(() => Mock.mock("@cname")),
                "age|1": createMapRandom(10).map(() => Mock.mock("@integer(0,100)")),
                "adress|1": createMapRandom(10).map(() => Mock.mock("@city")),
                "id|1": createMapRandom(10).map(() => Mock.mock("@id")),
                children: childrenData.data,
            },
        ],
    });
    return axios.get(path)
}