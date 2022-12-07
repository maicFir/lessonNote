"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "slider \u6ED1\u5757"
    };
  },
  methods: {
    sliderChange(e) {
      console.log("value \u53D1\u751F\u53D8\u5316\uFF1A" + e.detail.value);
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
    b: common_vendor.o((...args) => $options.sliderChange && $options.sliderChange(...args)),
    c: common_vendor.o((...args) => $options.sliderChange && $options.sliderChange(...args)),
    d: common_vendor.o((...args) => $options.sliderChange && $options.sliderChange(...args)),
    e: common_vendor.o((...args) => $options.sliderChange && $options.sliderChange(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/component/slider/slider.vue"]]);
wx.createPage(MiniProgramPage);
