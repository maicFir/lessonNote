<template>
  <div class="detail-app">
    <div>
      <span>详情</span>
      <a href="javascript:void(0)" @click="handleBack">返回</a>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      border
      lazy
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="date" label="日期"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { sourceDataMock } from '@/mock';

export default {
  name: 'detail',
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    featchList() {
      this.tableData = sourceDataMock().list;
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve(sourceDataMock().list);
      }, 1000);
    },
  },
  created() {
    console.log('---detail page start-');
    this.featchList();
  },
};
</script>

<style scoped></style>
