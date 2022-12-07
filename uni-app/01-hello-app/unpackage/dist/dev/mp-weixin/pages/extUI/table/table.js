"use strict";
var pages_extUI_table_tableData = require("./tableData.js");
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      searchVal: "",
      tableData: [],
      pageSize: 10,
      pageCurrent: 1,
      total: 0,
      loading: false
    };
  },
  onLoad() {
    this.selectedIndexs = [];
    this.getData(1);
  },
  methods: {
    selectedItems() {
      return this.selectedIndexs.map((i) => this.tableData[i]);
    },
    selectionChange(e) {
      console.log(e.detail.index);
      this.selectedIndexs = e.detail.index;
    },
    delTable() {
      console.log(this.selectedItems());
    },
    change(e) {
      this.$refs.table.clearSelection();
      this.selectedIndexs.length = 0;
      this.getData(e.current);
    },
    search() {
      this.getData(1, this.searchVal);
    },
    getData(pageCurrent, value = "") {
      this.loading = true;
      this.pageCurrent = pageCurrent;
      this.request({
        pageSize: this.pageSize,
        pageCurrent,
        value,
        success: (res) => {
          this.tableData = res.data;
          this.total = res.total;
          this.loading = false;
        }
      });
    },
    request(options) {
      const { pageSize, pageCurrent, success, value } = options;
      let total = pages_extUI_table_tableData.tableData.length;
      let data = pages_extUI_table_tableData.tableData.filter((item, index) => {
        const idx = index - (pageCurrent - 1) * pageSize;
        return idx < pageSize && idx >= 0;
      });
      if (value) {
        data = [];
        pages_extUI_table_tableData.tableData.forEach((item) => {
          if (item.name.indexOf(value) !== -1) {
            data.push(item);
          }
        });
        total = data.length;
      }
      setTimeout(() => {
        typeof success === "function" && success({
          data,
          total
        });
      }, 500);
    }
  }
};
if (!Array) {
  const _easycom_uni_th2 = common_vendor.resolveComponent("uni-th");
  const _easycom_uni_tr2 = common_vendor.resolveComponent("uni-tr");
  const _easycom_uni_td2 = common_vendor.resolveComponent("uni-td");
  const _easycom_uni_table2 = common_vendor.resolveComponent("uni-table");
  const _easycom_uni_pagination2 = common_vendor.resolveComponent("uni-pagination");
  (_easycom_uni_th2 + _easycom_uni_tr2 + _easycom_uni_td2 + _easycom_uni_table2 + _easycom_uni_pagination2)();
}
const _easycom_uni_th = () => "../../../uni_modules/uni-table/components/uni-th/uni-th.js";
const _easycom_uni_tr = () => "../../../uni_modules/uni-table/components/uni-tr/uni-tr.js";
const _easycom_uni_td = () => "../../../uni_modules/uni-table/components/uni-td/uni-td.js";
const _easycom_uni_table = () => "../../../uni_modules/uni-table/components/uni-table/uni-table.js";
const _easycom_uni_pagination = () => "../../../uni_modules/uni-pagination/components/uni-pagination/uni-pagination.js";
if (!Math) {
  (_easycom_uni_th + _easycom_uni_tr + _easycom_uni_td + _easycom_uni_table + _easycom_uni_pagination)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      width: "150",
      align: "center"
    }),
    b: common_vendor.p({
      width: "150",
      align: "center"
    }),
    c: common_vendor.p({
      align: "center"
    }),
    d: common_vendor.p({
      width: "204",
      align: "center"
    }),
    e: common_vendor.f($data.tableData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.date),
        b: "ee28dbc0-7-" + i0 + "," + ("ee28dbc0-6-" + i0),
        c: common_vendor.t(item.name),
        d: "ee28dbc0-8-" + i0 + "," + ("ee28dbc0-6-" + i0),
        e: common_vendor.t(item.address),
        f: "ee28dbc0-9-" + i0 + "," + ("ee28dbc0-6-" + i0),
        g: "ee28dbc0-10-" + i0 + "," + ("ee28dbc0-6-" + i0),
        h: index,
        i: "ee28dbc0-6-" + i0 + ",ee28dbc0-0"
      };
    }),
    f: common_vendor.p({
      align: "center"
    }),
    g: common_vendor.sr("table", "ee28dbc0-0"),
    h: common_vendor.o($options.selectionChange),
    i: common_vendor.p({
      loading: $data.loading,
      border: true,
      stripe: true,
      type: "selection",
      emptyText: "\u6682\u65E0\u66F4\u591A\u6570\u636E"
    }),
    j: common_vendor.o($options.change),
    k: common_vendor.p({
      ["show-icon"]: true,
      ["page-size"]: $data.pageSize,
      current: $data.pageCurrent,
      total: $data.total
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/table/table.vue"]]);
wx.createPage(MiniProgramPage);
