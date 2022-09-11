<template>
  <div class="hello">
    <el-form ref="form" :model="form" inline>
      <el-form-item label="vue-virtual-scroll-list:活动名称">
        <el-select
          v-model="form.value"
          placeholder="请选择"
          @visible-change="handleVisibleChange"
          ref="select"
        >
          <virtual-list
            :data-key="'id'"
            :data-sources="sourceData"
            :data-component="optionComponent"
            :keeps="10"
            :extra-props="extraProps"
            style="max-height: 245px; overflow-y: auto;"
          >
          </virtual-list>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import virtualList from 'vue-virtual-scroll-list';
const optionComponent = {
  props: {
    source: {
      type: Object,
      default () {
        return {};
      }
    },
    label: String,
    value: String
  },
  template:
    '<el-option :label="source[label]" :value="source[value]"></el-option>'
};
export default {
  name: 'HelloWorld',
  components: {
    virtualList
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      form: {
        value: ''
      },
      optionComponent,
      sourceData: [],
      extraProps: {
        label: 'label',
        value: 'value'
      }
    };
  },
  methods: {
    handleVisibleChange () {
      const select = this.$refs.select;
      const child = select.$children;
      const [, selectDrop] = child;
      const [cchild] = selectDrop.$children;
      const [a] = cchild.$children;
      const [group] = a.$el.children;
      group.style.paddingTop = '0px';
      console.log(group);
    }
  },
  created () {
    var arr = new Array(100).fill(1);
    arr.forEach((v, index) => {
      this.sourceData.push({
        value: index,
        label: `test_${index}`,
        id: Math.random()
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
