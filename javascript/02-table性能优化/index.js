var vm = new Vue({
    el: "#app",
    data: {
        loading: false,
        tableData: [],
        pageParams: {
            pageNum: 1,
            pageSize: 10,
            total: 10,
        },
        columns: [
            {
                title: "序号",
                type: "index",
            },
            {
                title: "Name",
                key: "name",
                tree: true,
            },
            {
                title: "age",
                key: "age",
            },
            {
                title: "address",
                key: "adress",
            },
        ],
    },
    methods: {
        // todo 请求数据
        featchData() {
            const { pageParams } = this;
            this.loading = true;
            this.tableData = [];
            let timer;
            mockServer("http://test.com", pageParams).then((res) => {
                const {
                    data: { result },
                } = res;
                console.log(res, "=res");
                this.tableData = result;
                if (timer) {
                    clearTimeout(timer);
                }
                // todo 模拟数据延时loading
                timer = setTimeout(() => {
                    this.loading = false;
                }, 2000);
            });
        },
        // todo 点击按钮刷新操作
        handleReflush() {
            this.featchData();
        },
         // 分页参数请求
        handleChangePage(pageNum) {
            this.pageParams = {
                ...this.pageParams,
                pageNum,
            };
            this.featchData();
        },
    },
    mounted() {
        this.featchData();
    },
});