<template>
  <div class="todo-list">
      <h1>todo list-observer</h1>
      <Search />
      <Content/>
  </div>
</template>

<script>
import Search from './Search.vue';
import Content from './Content.vue';
export default {
  name: 'todo-list',
  components: {Search, Content}
}
</script>

<style>

</style>