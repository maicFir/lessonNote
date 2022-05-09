const { createApp } = Vue;
createApp({
  data() {
    return {
        list: [],
        total: 1000, // 数据总条数
        height: 600, // 可视区域的高度
        rowHeight: 60, // 每条item的高度
        startIndex: 0, // 初始位置
        endIndex: 0, // 结束位置
        timer: false,
        bufferSize: 5 // 做一个缓存

    }
  },
  computed: {
    contentStyle() {
      const {total, rowHeight } = this;
      return {
        height: `${total * rowHeight}px`,
        position: 'relative'
      }
    }
  },
  methods: {
    renderData() {
    this.list = [];
    const { rowHeight, height, startIndex, total, bufferSize } = this;
    // 当前可视区域的row条数
    const limit = Math.ceil(height/rowHeight);
    console.log(limit, '=limit');
    // 可视区域的最后一个位置
    this.endIndex = Math.min(startIndex + limit + bufferSize, total -1);
      for (let i=startIndex; i<this.endIndex; i++) {
      this.list.push({
        content: i,
        style: {
          top: `${i * rowHeight}px`
        }
      })
    }
    }
  },
  mounted() {
    this.renderData();
    const listWrap = this.$refs['list-wrap'];
    listWrap && listWrap.addEventListener('scroll', (e) => {
      if (this.timer) {
        return;
      }
      const { rowHeight, startIndex, bufferSize } = this;
      const { scrollTop } = e.target;
      // 计算当前滚动的位置，获取当前开始的起始位置
      const currentIndex = Math.floor(scrollTop / rowHeight); 
      this.timer = true;
      // console.log(startIndex, currentIndex);
      // 做一个简单的节流处理
      setTimeout(() => {
           this.timer = false;
           // 如果滑动的位置不是当前位置
           if (currentIndex !== startIndex) {
             this.startIndex = Math.max(currentIndex - bufferSize, 0);
             this.renderData();
           }
        }, 500)
    })
  }
}).mount('#app')