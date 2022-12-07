"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      now: Date.now()
    };
  },
  methods: {}
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_dateformat2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_dateformat = () => "../../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_dateformat + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.p({
      date: $data.now - 72e5
    }),
    c: common_vendor.p({
      date: "2020/12/12"
    }),
    d: common_vendor.p({
      title: "\u57FA\u7840\u7528\u6CD5",
      type: "line",
      padding: true
    }),
    e: common_vendor.p({
      date: $data.now - 3e4,
      threshold: [0, 36e5]
    }),
    f: common_vendor.p({
      date: $data.now - 3e4,
      threshold: [0, 0]
    }),
    g: common_vendor.p({
      title: "\u8BBE\u7F6E\u9608\u503C",
      subTitle: "\u9608\u503C\u7528\u4E8E\u63A7\u5236\u4EC0\u4E48\u65F6\u5019\u663E\u793A\u521A\u521A|\u9A6C\u4E0A\uFF0C\u4EC0\u4E48\u65F6\u5019\u663E\u793Axx\u5206\u949F\u524D|xx\u5206\u949F\u540E",
      type: "line",
      padding: true
    }),
    h: common_vendor.p({
      date: $data.now - 12e5,
      threshold: [6e4, 36e5],
      locale: "en"
    }),
    i: common_vendor.p({
      date: $data.now - 3e4,
      threshold: [6e4, 36e5],
      locale: "en"
    }),
    j: common_vendor.p({
      date: $data.now - 8e4,
      threshold: [6e4, 36e5],
      locale: "en"
    }),
    k: common_vendor.p({
      title: "\u4F7F\u7528\u82F1\u6587",
      type: "line",
      padding: true
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/dateformat/dateformat.vue"]]);
wx.createPage(MiniProgramPage);
