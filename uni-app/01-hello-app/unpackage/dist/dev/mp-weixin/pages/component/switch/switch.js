"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "switch \u5F00\u5173"
    };
  },
  methods: {
    switch1Change: function(e) {
      console.log("switch1 \u53D1\u751F change \u4E8B\u4EF6\uFF0C\u643A\u5E26\u503C\u4E3A", e.detail.value);
    },
    switch2Change: function(e) {
      console.log("switch2 \u53D1\u751F change \u4E8B\u4EF6\uFF0C\u643A\u5E26\u503C\u4E3A", e.detail.value);
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
  return {
    a: common_vendor.p({
      title: $data.title
    }),
    b: common_vendor.o((...args) => $options.switch1Change && $options.switch1Change(...args)),
    c: common_vendor.o((...args) => $options.switch2Change && $options.switch2Change(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/component/switch/switch.vue"]]);
wx.createPage(MiniProgramPage);
