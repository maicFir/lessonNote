<template>
  <div class="shopList">
    <h3>intersectionObserver交叉器实现上拉加载</h3>
    <el-table
      :data="tableData"
      border
      stripe
      style="width: 100%"
      v-loading="loading"
    >
      <el-table-column type="index" width="50" />
      <el-table-column property="id" label="id" width="180" />
      <el-table-column property="name" label="Name" width="180" />
      <el-table-column property="adress" label="Address" />
      <el-table-column property="age" label="Age" />
    </el-table>
    <div
      class="load-more-btn"
      @click="handleMore"
      v-if="hasMore"
      v-scroll-table="{ cb: handleMore, infiniteScrollDisable: hasMore }"
    >
      点击加载更多<el-icon :class="[loading ? 'is-loading' : '']">
        <component :is="Loading"></component> </el-icon
      >({{ tableData.length }}/{{ total }})
    </div>
    <div v-else>没有数据啦</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { ElTable, ElTableColumn, ElIcon } from "element-plus";
import { Loading } from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
const hasMore = ref(false);
const tableData = ref([]);
const loading = ref(false);
const condation = reactive({
  pageParams: {
    page: 1,
    pageSize: 10,
  },
});
const total = ref(100);
// TODO 请求数据
const featchList = async () => {
  const res = await fetch("/shoplist/list.json", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(condation.pageParams),
  });
  const json = await res.json();
  tableData.value = tableData.value.concat(json.data.list);
  hasMore.value = true; // 默认还有更多
  if (total.value === tableData.value.length) {
    hasMore.value = false; // 当数据加载完全时，已经没有更多了
  }
  loading.value = false;
};
onMounted(() => {
  featchList();
});
// TODO 加载更多
const handleMore = () => {
  loading.value = true;
  // 加一个延时1s显示loading效果
  setTimeout(() => {
    featchList();
  }, 1000);
};
const handleScrollTable = (el, binding) => {
  const { infiniteScrollDisable, cb } = binding.value;
  // 如果el不存在，则禁止后面IntersectionObserver的实例化
  if (!el && !cb) {
    return;
  }
  const intersectionObserver = new IntersectionObserver((enteris, observer) => {
    // console.log(enteris, observer);
    const [curentEnteris] = enteris;
    const { intersectionRatio } = curentEnteris;
    console.log(intersectionRatio, "intersectionRatio");
    // 不可见的时候，禁止加载
    if (intersectionRatio <= 0) return;
    // 设置一个可以加载更多的开关
    if (infiniteScrollDisable) {
      console.log("加载更多");
      cb();
    }
  });
  // 开始监听
  intersectionObserver.observe(el);
};
// 自定义一个上拉加载的指令
const vScrollTable = {
  created: (el, binding, vnode, prevVnod) => {
    handleScrollTable(el, binding);
  },
};
</script>

<style>
.load-more-btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
