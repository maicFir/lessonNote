<template>
  <div class="todo-list">
      <h1>todo list-props</h1>
      <Search @handleAdd="handleAdd"/>
      <Content :dataList="dataList"/>
  </div>
</template>

<script>
import Search from './Search.vue';
import Content from './Content.vue';
export default {
  name: 'todo-list',
  components: {Search, Content},
  data() {
    return {
      dataList: [
        {
          title: 'vuejs',
          subTitle: 'vuejs is crazy'
        },
        {
          title: 'reactjs',
          subTitle: 'reactjs is beautify'
        }
      ]
    }
  },
  methods: {
    handleAdd(params) {
      this.dataList.push(params)
    }
  }
}
</script>

<style>

</style>