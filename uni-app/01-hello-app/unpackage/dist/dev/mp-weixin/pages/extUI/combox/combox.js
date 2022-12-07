"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      candidates: ["\u5317\u4EAC", "\u5357\u4EAC", "\u4E1C\u4EAC", "\u6B66\u6C49", "\u5929\u6D25", "\u4E0A\u6D77", "\u6D77\u53E3"],
      city: ""
    };
  },
  methods: {}
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_combox2 = common_vendor.resolveComponent("uni-combox");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_combox2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_combox = () => "../../../uni_modules/uni-combox/components/uni-combox/uni-combox.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_combox + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.o(($event) => $data.city = $event),
    c: common_vendor.p({
      candidates: $data.candidates,
      placeholder: "\u8BF7\u9009\u62E9\u6240\u5728\u57CE\u5E02",
      modelValue: $data.city
    }),
    d: common_vendor.t($data.city),
    e: common_vendor.p({
      title: "\u57FA\u672C\u7528\u6CD5",
      type: "line"
    }),
    f: common_vendor.p({
      border: false,
      candidates: $data.candidates,
      placeholder: "\u8BF7\u9009\u62E9\u6240\u5728\u57CE\u5E02"
    }),
    g: common_vendor.p({
      title: "\u65E0\u8FB9\u6846",
      subTitle: "\u4F7F\u7528 border = false \u53D6\u6D88\u8FB9\u6846",
      type: "line"
    }),
    h: common_vendor.p({
      emptyTips: "\u8FD9\u91CC\u5565\u90FD\u6CA1\u6709",
      placeholder: "\u8BF7\u9009\u62E9\u6240\u5728\u57CE\u5E02"
    }),
    i: common_vendor.p({
      title: "\u8BBE\u7F6E\u65E0\u5339\u914D\u9879\u65F6\u7684\u63D0\u793A\u8BED",
      subTitle: "\u4F7F\u7528 emptyTips \u5C5E\u6027\u8BBE\u7F6E\u65E0\u5339\u914D\u9879\u65F6\u7684\u63D0\u793A\u8BED",
      type: "line"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/combox/combox.vue"]]);
wx.createPage(MiniProgramPage);
