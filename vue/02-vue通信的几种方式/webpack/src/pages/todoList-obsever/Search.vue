<template>
  <div class="search">
    <a-row type="flex" justify="center" >
        <a-col :span="4">
           <a-input placeholder="Basic usage" v-model="value" @pressEnter="handleAdd"></a-input> 
        </a-col>
        <a-col :span="2">
             <a-button type="dashed" @click="handleAdd">添加</a-button>
        </a-col>
    </a-row>
  </div>
</template>

<script>
import store from './store/index';
export default {
  name: 'search',
  data() {
    return {
      value: '',
      odd: 0,
      Cache: {},
    }
  },
  methods: {
    handleAdd() {
      const {value: title, Cache} = this;
      if (title === '') {
        this.$message.error('输入值不能为空')
        return;
      }
      if (Cache[title] === title) {
         this.$message.error('输入值不能重复，请重新输入');
         return;
      }
      this.odd = !this.odd;
      const item = {
        title,
        subTitle: `${title} is ${this.odd ? 'crazy' : 'beautify'}`
      }
      Cache[title] = title;
      store.commit('handAdd', item);
    }
  }
}
</script>

<style>

</style>