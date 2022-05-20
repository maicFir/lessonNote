<template>
  <div class="todo-list">
      <h1>todo list-event-bus</h1>
      <Search />
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
  created() {
    this.$my_event.on('handleAdd', (payload) => {
        this.dataList.push(payload);
    })
  }
}
</script>

<style>

</style>