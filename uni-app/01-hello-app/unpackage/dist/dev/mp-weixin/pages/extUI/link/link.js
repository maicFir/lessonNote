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
  const _easycom_uni_link2 = common_vendor.resolveComponent("uni-link");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_link2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_link = () => "../../../uni_modules/uni-link/components/uni-link/uni-link.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_link + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true,
      ["is-shadow"]: false
    }),
    b: common_vendor.p({
      href: "https://uniapp.dcloud.io/",
      text: "https://uniapp.dcloud.io/"
    }),
    c: common_vendor.p({
      title: "\u57FA\u672C\u793A\u4F8B",
      subTitle: "\u6253\u5F00\u5916\u90E8\u8FDE\u63A5",
      type: "line",
      padding: true
    }),
    d: common_vendor.p({
      href: "https://uniapp.dcloud.io/",
      text: "https://uniapp.dcloud.io/",
      color: "#007BFF"
    }),
    e: common_vendor.p({
      title: "\u81EA\u5B9A\u4E49\u989C\u8272",
      type: "line",
      padding: true
    }),
    f: common_vendor.p({
      href: "https://uniapp.dcloud.io/",
      text: "https://uniapp.dcloud.io/",
      showUnderLine: "false"
    }),
    g: common_vendor.p({
      title: "\u81EA\u5B9A\u4E49\u4E0B\u5212\u7EBF",
      type: "line",
      padding: true
    }),
    h: common_vendor.p({
      href: "https://uniapp.dcloud.io/",
      text: "https://uniapp.dcloud.io/",
      showUnderLine: "false",
      ["font-size"]: "20"
    }),
    i: common_vendor.p({
      title: "\u81EA\u5B9A\u4E49\u5B57\u4F53\u5927\u5C0F",
      type: "line",
      padding: true
    }),
    j: common_vendor.p({
      href: "https://uniapp.dcloud.io/",
      text: "https://uniapp.dcloud.io/",
      showUnderLine: "false",
      color: "red"
    }),
    k: common_vendor.p({
      title: "\u81EA\u5B9A\u4E49\u63D2\u69FD",
      type: "line",
      padding: true
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/link/link.vue"]]);
wx.createPage(MiniProgramPage);
