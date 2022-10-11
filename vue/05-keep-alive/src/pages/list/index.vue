<template>
  <div class="list-app">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
    </el-form>
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
      <el-table-column prop="options" label="操作">
        <a href="javascript:void(0);" @click="handleView">查看</a>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Mock from 'mockjs';

const randomData = (len) => {
  const result = new Array(len).fill(1);
  return result.map((item, index) => ({
    id: Mock.mock('@id'),
    name: Mock.mock('@cname'),
    date: Mock.mock('@date'),
    address: Mock.mock('@city'),
    hasChildren: index % 2 === 0,
  }));
};
const sourceData = Mock.mock({
  list: randomData(10),
});
export default {
  name: 'list',
  data() {
    return {
      tableData: [],
      form: {
        name: '',
      },
    };
  },
  created() {
    console.log(111);
    this.featchList();
  },
  methods: {
    load(tree, treeNode, resolve) {
      const sourceData2 = Mock.mock({
        list: randomData(5),
      });
      setTimeout(() => {
        resolve(sourceData2.list);
      }, 1000);
    },
    handleView() {
      this.$router.push('/detail');
    },
    featchList() {
      this.tableData = sourceData.list;
    },
  },
};
</script>

<style scoped></style>
