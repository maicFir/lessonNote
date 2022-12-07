"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      value: 0,
      range: [
        {
          "value": 0,
          "text": "\u7BEE\u7403",
          "disable": true
        },
        {
          "value": 1,
          "text": "\u8DB3\u7403"
        },
        {
          "value": 2,
          "text": "\u6E38\u6CF3"
        }
      ]
    };
  },
  methods: {
    change(e) {
      console.log("e:", e);
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_data_select2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_data_select = () => "../../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_data_select + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true
    }),
    b: common_vendor.o($options.change),
    c: common_vendor.o(($event) => $data.value = $event),
    d: common_vendor.p({
      localdata: $data.range,
      modelValue: $data.value
    }),
    e: common_vendor.p({
      title: "\u672C\u5730\u6570\u636E",
      type: "line"
    }),
    f: common_vendor.o($options.change),
    g: common_vendor.o(($event) => $data.value = $event),
    h: common_vendor.p({
      localdata: $data.range,
      clear: false,
      modelValue: $data.value
    }),
    i: common_vendor.p({
      title: "\u662F\u5426\u53EF\u6E05\u9664\u5DF2\u9009\u9879",
      type: "line"
    }),
    j: common_vendor.o($options.change),
    k: common_vendor.o(($event) => $data.value = $event),
    l: common_vendor.p({
      localdata: $data.range,
      label: "\u5E94\u7528\u9009\u62E9",
      modelValue: $data.value
    }),
    m: common_vendor.p({
      title: "\u914D\u7F6E\u5DE6\u4FA7\u6807\u9898",
      type: "line"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/data-select/data-select.vue"]]);
wx.createPage(MiniProgramPage);
