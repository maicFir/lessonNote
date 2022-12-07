"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {};
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_tooltip2 = common_vendor.resolveComponent("uni-tooltip");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_tooltip2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_tooltip = () => "../../../uni_modules/uni-tooltip/components/uni-tooltip/uni-tooltip.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_tooltip + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true,
      ["is-shadow"]: false
    }),
    b: common_vendor.p({
      content: "\u63D0\u793A\u6587\u5B57"
    }),
    c: common_vendor.p({
      title: "\u57FA\u7840\u7528\u6CD5",
      type: "line",
      padding: true
    }),
    d: common_vendor.p({
      title: "\u5F39\u51FA\u5C42\u63D2\u69FD",
      type: "line",
      padding: true
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/tooltip/tooltip.vue"]]);
wx.createPage(MiniProgramPage);
