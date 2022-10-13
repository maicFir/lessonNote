/* eslint-disable func-names */
<template>
  <div class="list-app">
    <div><a href="javascript:void(0)" @click="handleToHello">to hello</a></div>
    <el-form ref="form" :model="condition" label-width="80px" inline>
      <el-form-item label="姓名">
        <el-input
          v-model="condition.name"
          clearable
          placeholder="请输入搜索姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-select
          v-model="condition.address"
          clearable
          placeholder="请选择地址"
        >
          <el-option
            v-for="item in tableData"
            :key="item.name"
            :label="item.address"
            :value="item.address"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="featchList">刷新</el-button>
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
        <template slot-scope="scope">
          <a href="javascript:void(0);" @click="handleView">查看详情</a>
          <a href="javascript:void(0);" @click="handleEdit(scope.row)">编辑</a>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleChangePage"
      background
      layout="prev, pager, next"
      :total="100"
    >
    </el-pagination>
    <list-modal
      title="编辑"
      width="50%"
      v-model="formParams"
      :visible.sync="dialogVisible"
      @refresh="featchList"
    ></list-modal>
  </div>
</template>

<script>
import { sourceDataMock } from '@/mock';
import ListModal from './ListModal';

export default {
  name: 'list',
  components: {
    ListModal,
  },
  data() {
    return {
      tableData: [],
      cacheData: [], // 缓存数据
      condition: {
        name: '',
        address: '',
        page: 1,
      },
      dialogVisible: false,
      formParams: {
        date: '',
        name: '',
        address: '',
      },
    };
  },
  watch: {
    // eslint-disable-next-line func-names
    'condition.name': function (val) {
      if (val === '') {
        this.tableData = this.cacheData;
      } else {
        this.tableData = this.cacheData.filter(v => v.name.indexOf(val) > -1);
      }
    },
    // eslint-disable-next-line func-names
    'condition.address': function (val) {
      if (val === '') {
        this.tableData = this.cacheData;
      } else {
        this.tableData = this.cacheData.filter(
          v => v.address.indexOf(val) > -1,
        );
      }
    },
  },
  created() {
    this.featchList();
  },
  methods: {
    handleToHello() {
      this.$router.push('/hello-world');
    },
    handleChangePage(val) {
      this.condition.page = val;
      this.featchList();
    },
    handleSure() {
      this.dialogVisible = false;
    },
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve(sourceDataMock().list);
      }, 1000);
    },
    handleView() {
      this.$router.push('/detail');
    },
    handleEdit(row) {
      this.formParams = { ...row };
      this.dialogVisible = true;
      console.log(row);
    },
    featchList() {
      console.log('----start load data----', this.condition);
      const list = sourceDataMock().list;
      // 深拷贝一份数据
      this.cacheData = JSON.parse(JSON.stringify(list));
      this.tableData = list;
    },
  },
  activated() {
    console.log('激活了');
  },
  deactivated() {
    console.log('被销毁了');
  },
};
</script>

<style scoped>
.list-app .el-form {
  text-align: left;
}
</style>
