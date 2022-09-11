<template>
  <div class="hello">
    <el-form ref="form" :model="form" inline>
      <el-form-item label="虚拟列表-活动名称">
        <el-select
          v-model="form.value1"
          placeholder="请选择"
          @visible-change="handleVisibleChange"
          filterable
          v-select="{ ...selectAttrs, data: sourceData }"
        >
          <el-option
            v-for="item in optionsData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="非虚拟列表-活动名称2">
        <el-select v-model="form.value2" placeholder="请选择">
          <el-option
            v-for="item in sourceData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const selectDirectives = {
  wrap: null,
  fn: null,
  select: {
    inserted (el, binding, vnode) {
      let { data, rowHeight, startIndex, callback, filterable } = binding.value;
      const {
        componentInstance: { $children: children }
      } = vnode;
      const selectDown = children[children.length - 1];
      const [elScrollBar] = selectDown.$children;
      const [wrap] = elScrollBar.$el.childNodes;
      const scrollView = wrap.getElementsByClassName('el-scrollbar__view')[0];
      const total = data.length; // 所有数据的总条数
      // 设置el-scrollbar__view的高度
      if (filterable) {
        scrollView.style.height = 'auto';
      } else {
        scrollView.style.height = `${total * rowHeight}px`;
      }
      let timer = false;
      const fn = () => {
        if (timer) {
          return;
        }
        timer = true;
        const requestId = setTimeout(() => {
          timer = false;
          const scrollTop = wrap.scrollTop;
          // 计算当前滚动位置，获取当前开始的起始位置
          const currentIndex = Math.floor(scrollTop / rowHeight);
          // console.log(startIndex, 'startIndex222', currentIndex);
          // 根据滚动条获取当前索引与起始索引不相等时，将滚动的当前位置设置为起始位置
          if (currentIndex !== startIndex) {
            startIndex = Math.max(currentIndex, 0);
          }
          const paddingTop = `${startIndex * rowHeight}px`;
          scrollView.style.paddingTop = paddingTop;
          // eslint-disable-next-line standard/no-callback-literal
          callback({ startIndex, scrollView });
        }, 100);
        if (!requestId) {
          clearTimeout(requestId);
        }
      };
      selectDirectives.fn = fn;
      selectDirectives.wrap = wrap;
      wrap.addEventListener('scroll', fn, false);
    },
    unbind () {
      selectDirectives.wrap.removeEventListener('scroll', selectDirectives.fn);
    }
  }
};
export default {
  name: 'HelloWorld',
  components: {},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      form: {
        value1: '',
        value2: ''
      },
      sourceData: [],
      optionsData: [],
      selectAttrs: {
        viewHeight: 220, // 可视区域的高度
        rowHeight: 30, // 当前行的默认高度
        startIndex: 0,
        endIndex: 0,
        callback: this.updateOptions,
        scrollView: null, // 滚动容器
        filterable: true
      }
    };
  },
  directives: selectDirectives,
  methods: {
    updateOptions ({ startIndex, scrollView }) {
      this.selectAttrs.startIndex = startIndex;
      this.selectAttrs.scrollView = scrollView;
      this.renderOptions();
    },
    renderOptions () {
      let {
        selectAttrs: { viewHeight, rowHeight, startIndex, endIndex },
        sourceData
      } = this;
      const total = sourceData.length;
      // 可视区域的条数
      const limit = Math.ceil(viewHeight / rowHeight);
      // 设置末位索引
      endIndex = Math.min(startIndex + limit, total);
      this.selectAttrs.endIndex = endIndex;
      this.optionsData = sourceData.slice(startIndex, endIndex);
    },
    handleVisibleChange () {
      const {
        selectAttrs: { scrollView }
      } = this;
      // 当打开下拉框时，重置scrollView的paadingTop,避免白屏
      if (scrollView) {
        scrollView.style.paddingTop = '0px';
      }
      this.renderOptions();
    }
  },
  created () {
    var arr = new Array(100).fill(1);
    arr.forEach((v, index) => {
      this.sourceData.push({
        value: index,
        label: `test_${index}`
      });
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-select-dropdown {
  width: 100px;
}
</style>
