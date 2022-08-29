<template>
  <el-select
    ref="visualSelect"
    popper-class="VisualSelects"
    @visible-change="popChange"
    @change="changeFn"
    v-model="selectValue"
    placeholder="请选择"
    :filter-method="filterMethod"
    :multiple="multiple"
    collapse-tags
    filterable
    clearable
    :disabled="disabled"
  >
    <el-checkbox-group v-if="multiple && showCheck" v-model="selectValue">
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item.label"
        :value="item.value"
      >
        <el-checkbox style="pointer-events: none" :label="item.value">{{
          item.label
        }}</el-checkbox>
      </el-option>
    </el-checkbox-group>
    <el-option
      v-for="(item, index) in options"
      :key="index"
      :label="item.label"
      :title="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>
<script>
export default {
  model: {
    prop: 'value', // 绑定的值，通过父组件传递
    event: 'update' // 自定义名
  },
  props: {
    defaultFirst: {
      type: Boolean
    },
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
    value: {
      type: [String, Number, Array],
      default: ''
    },
    showCheck: {
      type: Boolean,
      default: false
    },
    type: {
      type: [String],
      default: 'value'
    },
    disabled: Boolean,
    multiple: {
      type: [Boolean],
      default: false
    }
  },

  data () {
    return {
      newList: [],
      selectValue: this.value,
      oldValue: this.value,
      options: [],
      labels: [],
      values: [],
      selectedList: null,
      domList: null,
      slectBoxDom: null,
      startIndex: 0,
      endIndex: 0,
      maxLength: 9, // 弹出框最大支持9个条目
      itemHeight: 34, // select组件选项高度
      maxHeightDom: null
    };
  },
  watch: {
    value: {
      handler: function (newValue, oldValue) {
        this.setValueFn(this.value, this.labels, this.values, 'set');
      },
      deep: true
    },

    selectValue: {
      handler: function (newValue, oldValue) {
        this.setValueFn(this.selectValue, this.labels, this.values, 'get');
      },
      deep: true
    },

    list: {
      handler: function (newValue, oldValue) {
        this.labels = [];
        this.values = [];
        this.list.map(item => {
          this.labels.push(item.label);
          this.values.push(item.value);
        });

        this.setValueFn(this.value, this.labels, this.values, 'set');

        this.resetList();
        this.init();
      },
      deep: true
    }
  },
  mounted () {
    this.resetList();
    this.init();
  },
  beforeDestroy () {
    this.slectBoxDom &&
      this.slectBoxDom.removeEventListener('scroll', this.callback, false);
  },
  methods: {
    setValueFn (value, labels, values, status) {
      let selectValue;
      if (this.multiple) {
        selectValue = [];
        value.length &&
          value.map(val => {
            selectValue.push({
              label: labels[values.indexOf(val)],
              value: val,
              currentLabel: labels[values.indexOf(val)],
              currentValue: val
            });
          });
      } else {
        selectValue = {
          label: labels[values.indexOf(value)],
          value: value,
          currentLabel: labels[values.indexOf(value)],
          currentValue: value
        };
      }

      this.selectedList = selectValue;
      if (status === 'set') {
        this.selectValue = value;
      }
      if (status === 'get') {
        if (
          (this.multiple &&
            this.oldValue.length &&
            this.oldValue.join('') !== value.join('')) ||
          (!this.multiple && this.oldValue !== value)
        ) {
          this.oldValue = value;
          this.$emit('update', value);
        }
      }
      this.$nextTick(() => {
        this.$refs.visualSelect.selected = Object.freeze(this.selectedList);
        if (!this.multiple) {
          this.$refs.visualSelect.selectedLabel = this.selectedList.currentLabel;
        }
      });
    },
    addScrollDiv (selectDom) {
      if (!this.maxHeightDom) {
        this.maxHeightDom = document.createElement('div');
        this.maxHeightDom.className = 'el-select-height';
        selectDom.insertBefore(this.maxHeightDom, this.domList);
      }
    },
    reCacularHeight () {
      this.maxHeightDom.style.height =
        this.newList.length * this.itemHeight + 'px';
    },
    resetList (arrys) {
      this.startIndex = 0;
      this.endIndex = 0;
      if (Array.isArray(arrys)) {
        this.newList = arrys.slice();
        this.domList.style.paddingTop = 0 + 'px';
        this.slectBoxDom.scrollTop = 0;
      } else {
        this.newList = this.list.slice();
      }
      this.options = this.newList.slice(0, this.maxLength);
    },

    init () {
      if (this.defaultFirst && this.list.length > 0) {
        this.selectValue = this.list[0].value;
      }

      this.slectBoxDom = this.$refs.visualSelect.$refs.scrollbar.$refs.wrap;
      this.domList = this.$refs.visualSelect.$refs.scrollbar.$refs.resize;
      this.slectBoxDom.style.display = 'flex';
      this.slectBoxDom.style.flexDirection = 'row';
      this.addScrollDiv(this.slectBoxDom);
      this.scrollFn();
    },

    scrollFn () {
      this.slectBoxDom.addEventListener('scroll', this.callback, false);
    },

    callback () {
      const scrollTop = this.slectBoxDom.scrollTop;
      this.startIndex = parseInt(scrollTop / this.itemHeight);
      this.endIndex = this.startIndex + this.maxLength;
      this.options = this.newList.slice(this.startIndex, this.endIndex);
      this.domList.style.paddingTop =
        scrollTop - (scrollTop % this.itemHeight) + 'px';
      this.$nextTick(() => {
        this.$refs.visualSelect.selected = Object.freeze(this.selectedList);
        if (!this.multiple) {
          this.$refs.visualSelect.selectedLabel = this.selectedList.currentLabel;
        }
      });
    },
    filterMethod (val) {
      if (val) {
        const arrys = this.list.filter(elem => {
          return new RegExp(val).test(elem.label);
        });
        this.resetList(arrys);
      } else {
        this.resetList();
      }
      this.$nextTick(() => {
        if (!this.multiple) this.$refs.visualSelect.selectedLabel = val;
      });
      this.reCacularHeight();
    },
    popChange (val) {
      this.domList.style.paddingTop = 0 + 'px';
      this.slectBoxDom.scrollTop = 0;
      this.resetList();
      this.reCacularHeight();
      this.$emit('visible-change', val);
    },
    changeFn (val) {
      this.$emit('change', val);
    }
  }
};
</script>
<style>
.el-scrollbar__wrap {
  position: relative;
  height: 251px;
}
.el-select-height {
  width: 1px;
  position: absolute;
  top: 0;
  left: 0;
}
.el-select-dropdown__list {
  width: 100%;
}
</style>
