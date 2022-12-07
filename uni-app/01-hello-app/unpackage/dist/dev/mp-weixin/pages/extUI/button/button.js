"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  },
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
      title: "\u6309\u94AE\u5F62\u72B6",
      ["sub-title"]: "\u6DFB\u52A0\u7C7B\u540D .uni-btn-radius \u53EF\u4EE5\u4F7F\u7528\u5706\u89D2\u6309\u94AE",
      type: "line"
    }),
    c: common_vendor.p({
      title: "\u6309\u94AE\u5F62\u72B6(size=mini)",
      ["sub-title"]: "\u6DFB\u52A0\u7C7B\u540D .uni-btn-radius \u53EF\u4EE5\u4F7F\u7528\u5706\u89D2\u6309\u94AE",
      type: "line"
    }),
    d: common_vendor.p({
      title: "\u666E\u901A\u6309\u94AE",
      ["sub-title"]: "\u6307\u5B9A\u4E0D\u540C\u7684 type \u5C5E\u6027 ,\u5C55\u793A\u4E0D\u540C\u7C7B\u578B\u6309\u94AE",
      type: "line"
    }),
    e: common_vendor.p({
      title: "\u666E\u901A\u6309\u94AE(size=mini)",
      ["sub-title"]: "\u6307\u5B9A\u4E0D\u540C\u7684 type \u5C5E\u6027 ,\u5C55\u793A\u4E0D\u540C\u7C7B\u578B\u6309\u94AE",
      type: "line"
    }),
    f: common_vendor.p({
      title: "\u9542\u7A7A\u6309\u94AE",
      ["sub-title"]: "\u6DFB\u52A0\u7C7B\u540D .uni-btn-plain \u4F7F\u7528\u9542\u7A7A\u6309\u94AE",
      type: "line"
    }),
    g: common_vendor.p({
      title: "\u9542\u7A7A\u6309\u94AE(size=mini)",
      ["sub-title"]: "\u6DFB\u52A0\u7C7B\u540D .uni-btn-plain \u4F7F\u7528\u9542\u7A7A\u6309\u94AE",
      type: "line"
    }),
    h: common_vendor.p({
      title: "\u7981\u7528",
      ["sub-title"]: "\u4F7F\u7528 disabled \u5C5E\u6027 ,\u5C55\u793A\u7981\u7528\u6309\u94AE",
      type: "line"
    }),
    i: common_vendor.p({
      title: "\u7981\u7528(size=mini)",
      ["sub-title"]: "\u4F7F\u7528 disabled \u5C5E\u6027 ,\u5C55\u793A\u7981\u7528\u6309\u94AE",
      type: "line"
    }),
    j: common_vendor.p({
      title: "\u5927\u5C0F",
      ["sub-title"]: "\u6DFB\u52A0\u7C7B\u540D .uni-btn-small .uni-btn-mini \u5C55\u793A\u6309\u94AE\u7684\u4E0D\u540C\u5927\u5C0F",
      type: "line"
    }),
    k: common_vendor.p({
      title: "\u5927\u5C0F(sizi=mini)",
      ["sub-title"]: "\u6DFB\u52A0\u7C7B\u540D .uni-btn-small .uni-btn-mini \u5C55\u793A\u6309\u94AE\u7684\u4E0D\u540C\u5927\u5C0F",
      type: "line"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/button/button.vue"]]);
wx.createPage(MiniProgramPage);
