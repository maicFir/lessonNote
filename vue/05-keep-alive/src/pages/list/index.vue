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
            v-for="(item, index) in tableData"
            :key="index"
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
          <a
            href="javascript:void(0);"
            @click="handleEdit(scope.row, 'dialogVisible2')"
            >编辑form-modal</a
          >
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
      class="list-modal"
      style="border: 1px solid transparent"
      v-model="formParams"
      :visible.sync="dialogVisible"
      @refresh="featchList"
      @close="handleClose"
    >
      <div slot="footer">确定</div>
    </list-modal>
    <form-modal
      title="编辑"
      width="50%"
      class="list-modal"
      style="border: 1px solid transparent"
      v-model="formParams"
      :formConfig="formConfig"
      :visible.sync="dialogVisible2"
      @refresh="featchList"
      @close="handleClose"
    >
      <template slot-scope="{ row }" slot="number">
        <el-input
          :type="row.type"
          v-bind="row.attrs || {}"
          v-model="row.formParams[row.slot]"
        ></el-input>
      </template>
    </form-modal>
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
      dialogVisible2: false,
      formParams: {
        date: '',
        name: '',
        address: '',
        number: '1',
        scholl: '公众号:Web技术学苑',
      },
    };
  },
  computed: {
    formConfig() {
      return {
        formAttrs: {
          labelWidth: '80px',
          labelPosition: 'left',
        },
        fields: [
          {
            type: 'text',
            key: 'date',
            label: '日期',
            attrs: {
              placeholder: '请填写日期',
            },
          },
          {
            type: 'text',
            key: 'name',
            label: '名称',
            attrs: {
              placeholder: '请填写名称',
            },
          },
          {
            type: 'select',
            key: 'address',
            label: '地址',
            attrs: {
              placeholder: '请选择地址',
              style: {
                width: '100%',
              },
            },
            options: {
              data: this.tableData,
              extraProps: {
                value: 'address',
                label: 'address',
              },
            },
          },
          {
            type: 'text',
            slot: 'number',
            label: '编号',
            attrs: {
              placeholder: '请输入编号',
            },
          },
          {
            type: 'text',
            key: 'scholl',
            label: '毕业学校',
            attrs: {
              placeholder: '请输入毕业学校',
            },
            formater: (h, props) =>
              h('el-input', {
                ...props,
              }),
          },
        ],
      };
    },
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
    handleClose() {
      console.log('关闭了');
    },
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
    handleEdit(row, visibleType = 'dialogVisible') {
      this.formParams = { ...row };
      this[visibleType] = true;
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
