const { createApp, reactive, toRefs, computed, onMounted, ref } = Vue;
const vm = createApp({
  setup() {
      const listWrap = ref(null);
      const viewData = reactive({
        list: [],
        total: 1000, // 数据总条数
        height: 600, // 可视区域的高度
        rowHeight: 60, // 每条item的高度
        startIndex: 0, // 初始位置
        endIndex: 0, // 结束位置
        timer: false,
        bufferSize: 5 // 做一个缓冲
        
      });
      const contentStyle = computed(() => {
        return {
          height: `${viewData.total * viewData.rowHeight}px`,
          position: 'relative',
        }
      });
      // todo 设置数据
      const renderData = () => {
        viewData.list = [];
        const {rowHeight, height, startIndex, total, bufferSize} = viewData;
        // 当前可视区域的row条数
        const limit = Math.ceil(height/rowHeight);
        console.log(limit, '=limit');
        // 可视区域的最后一个位置
        viewData.endIndex = Math.min(startIndex + limit + bufferSize, total -1);
          for (let i=startIndex; i<viewData.endIndex; i++) {
            viewData.list.push({
            content: i,
            style: {
              top: `${i * rowHeight}px`
            }
          })
        }
      }
      // todo 监听滚动，设置statIndex与endIndex
      const handleScroll = (callback) => {
        // console.log(listWrap.value)
        listWrap.value && listWrap.value.addEventListener('scroll', (e) => {
          if (this.timer) {
            return;
          }
          const { rowHeight, startIndex, bufferSize } = viewData;
          const { scrollTop } = e.target;
          // 计算当前滚动的位置，获取当前开始的起始位置
          const currentIndex = Math.floor(scrollTop / rowHeight); 
          viewData.timer = true;
          // console.log(startIndex, currentIndex);
          // 做一个简单的节流处理
          setTimeout(() => {
            viewData.timer = false;
               // 如果滑动的位置不是当前位置
               if (currentIndex !== startIndex) {
                viewData.startIndex = Math.max(currentIndex - bufferSize, 0);
                callback();
               }
            }, 500)
        })
      }
      onMounted(() => {
        renderData();
        handleScroll(renderData);
      })
      return {
        ...toRefs(viewData),
        contentStyle,
        renderData,
        listWrap
      }
  },
})
vm.mount('#app')