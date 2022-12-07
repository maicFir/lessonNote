"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
  computed: {},
  onLoad() {
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
      title: "\u4E3B\u8272",
      type: "line"
    }),
    c: common_vendor.p({
      title: "\u8F85\u52A9\u8272",
      ["sub-title"]: "\u9664\u4E86\u4E3B\u8272\u5916\u7684\u573A\u666F\u8272\uFF0C\u9700\u8981\u5728\u4E0D\u540C\u7684\u573A\u666F\u4E2D\u4F7F\u7528\uFF08\u4F8B\u5982\u5371\u9669\u8272\u8868\u793A\u5371\u9669\u7684\u64CD\u4F5C\uFF09\u3002",
      type: "line"
    }),
    d: common_vendor.p({
      title: "\u4E2D\u6027\u8272",
      ["sub-title"]: "\u4E2D\u6027\u8272\u7528\u4E8E\u6587\u672C\u3001\u80CC\u666F\u548C\u8FB9\u6846\u989C\u8272\u3002\u901A\u8FC7\u8FD0\u7528\u4E0D\u540C\u7684\u4E2D\u6027\u8272\uFF0C\u6765\u8868\u73B0\u5C42\u6B21\u7ED3\u6784\u3002",
      type: "line"
    }),
    e: common_vendor.p({
      title: "\u5206\u9694\u7EBF",
      ["sub-title"]: "\u4E3B\u8981\u7528\u4E8E\u8FB9\u6846\u989C\u8272",
      type: "line"
    }),
    f: common_vendor.p({
      title: "\u5E38\u89C4\u8272",
      ["sub-title"]: "\u901A\u7528\u989C\u8272,\u5982\u9ED1\u8272\u767D\u8272",
      type: "line"
    }),
    g: common_vendor.p({
      title: "\u9634\u5F71",
      type: "line"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/color/color.nvue"]]);
wx.createPage(MiniProgramPage);
