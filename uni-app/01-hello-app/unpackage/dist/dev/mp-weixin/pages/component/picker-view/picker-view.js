"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    const date = new Date();
    const years = [];
    const year = date.getFullYear();
    const months = [];
    const month = date.getMonth() + 1;
    const days = [];
    const day = date.getDate();
    for (let i = 1990; i <= date.getFullYear(); i++) {
      years.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      months.push(i);
    }
    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }
    return {
      title: "picker-view",
      years,
      year,
      months,
      month,
      days,
      day,
      value: [9999, month - 1, day - 1],
      visible: true,
      indicatorStyle: `height: 50px;`,
      maskStyle: ""
    };
  },
  methods: {
    bindChange(e) {
      const val = e.detail.value;
      this.year = this.years[val[0]];
      this.month = this.months[val[1]];
      this.day = this.days[val[2]];
    }
  }
};
if (!Array) {
  const _easycom_page_head2 = common_vendor.resolveComponent("page-head");
  _easycom_page_head2();
}
const _easycom_page_head = () => "../../../components/page-head/page-head.js";
if (!Math) {
  _easycom_page_head();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      title: $data.title
    }),
    b: common_vendor.t($data.year),
    c: common_vendor.t($data.month),
    d: common_vendor.t($data.day),
    e: $data.visible
  }, $data.visible ? {
    f: common_vendor.f($data.years, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    }),
    g: common_vendor.f($data.months, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    }),
    h: common_vendor.f($data.days, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    }),
    i: $data.indicatorStyle,
    j: $data.maskStyle,
    k: $data.value,
    l: common_vendor.o((...args) => $options.bindChange && $options.bindChange(...args))
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/component/picker-view/picker-view.vue"]]);
wx.createPage(MiniProgramPage);
