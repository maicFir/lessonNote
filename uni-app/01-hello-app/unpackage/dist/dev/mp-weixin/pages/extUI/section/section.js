"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  onReady() {
  },
  methods: {}
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.p({
      title: "\u57FA\u7840\u7528\u6CD5",
      ["sub-title"]: "\u526F\u6807\u9898"
    }),
    c: common_vendor.p({
      title: "\u7AD6\u7EBF\u88C5\u9970",
      ["sub-title"]: "\u526F\u6807\u9898",
      type: "line"
    }),
    d: common_vendor.p({
      title: "\u88C5\u9970\u5668\u63D2\u69FD",
      ["sub-title"]: "\u526F\u6807\u9898"
    }),
    e: common_vendor.p({
      title: "\u9ED8\u8BA4\u63D2\u69FD",
      ["sub-title"]: "\u526F\u6807\u9898",
      padding: "0 0 5px 10px"
    }),
    f: common_vendor.p({
      title: "\u4E3B\u6807\u9898"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/section/section.vue"]]);
wx.createPage(MiniProgramPage);
