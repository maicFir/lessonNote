<template>
  <div class="todo-list">
      <h1>todo list-sync</h1>
      <Search :dataList.sync="dataList"/>
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
}
</script>

<style>

</style>