"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      appear: false,
      name: "",
      mobile: "139 9999 9999",
      weixin: "sskd",
      message: "",
      errorMessage: ""
    };
  },
  onReady() {
  },
  methods: {}
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_group2 = common_vendor.resolveComponent("uni-group");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_group2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_group = () => "../../../uni_modules/uni-group/components/uni-group/uni-group.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_group + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.p({
      title: "\u57FA\u672C\u6A21\u5F0F",
      ["margin-top"]: "20"
    }),
    c: common_vendor.p({
      title: "\u57FA\u7840\u5206\u7EC4",
      type: "line"
    }),
    d: common_vendor.p({
      mode: "card"
    }),
    e: common_vendor.p({
      title: "card \u6A21\u5F0F",
      mode: "card"
    }),
    f: common_vendor.p({
      title: "\u5361\u7247\u5206\u7EC4",
      type: "line"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/group/group.vue"]]);
wx.createPage(MiniProgramPage);
