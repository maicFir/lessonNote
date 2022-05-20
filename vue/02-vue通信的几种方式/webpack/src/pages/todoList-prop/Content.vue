<template>
    <div class="content">
          <template v-for="(item, index) in dataList">
              <h1 :key="index">{{item.title}}</h1>
              <h2 :key="item.subTitle">{{item.subTitle}}</h2>
          </template>
      </div>
</template>

<script>
export default {
  props: {
    dataList: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>

</style>