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
export default {
  name: 'search',
  data() {
    return {
      value: '',
      odd: 0
    }
  },
  methods: {
    handleAdd() {
      const {value: title } = this;
      if (title === '') {
        return;
      }
      this.odd = !this.odd;
      const item = {
        title,
        subTitle: `${title} is ${this.odd ? 'crazy' : 'beautify'}`
      }
      this.$store.commit('handAdd', item);
    }
  }
}
</script>

<style>

</style>