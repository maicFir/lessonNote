<template>
  <div class="content">
    <template v-for="(item, index) in dataList">
      <div :key="index" class="list">
        <h1 :key="index">{{ item.title }}</h1>
        <h2 :key="item.subTitle">{{ item.subTitle }}</h2>
        <a-button
          type="danger"
          class="del"
          :key="`${index}-${item.title}`"
          @click="handleDelete(index)"
          >删除</a-button
        >
      </div>
    </template>
  </div>
</template>

<script>
import store from "./store/index";

export default {
  computed: {
    dataList() {
      return store.state.dataList;
    }
  },
  methods: {
    handleDelete(index) {
      store.commit("handleDelete", index);
    }
  }
};
</script>

<style lang="scss">
.list {
  .del {
    position: relative;
    top:-70px;
    left: 160px;
  }
}
</style>
