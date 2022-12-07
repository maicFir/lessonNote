"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      rateValue: 0
    };
  },
  onLoad() {
    setTimeout(() => {
      this.rateValue = 3;
    }, 1e3);
  },
  methods: {
    onChange(e) {
      console.log("rate\u53D1\u751F\u6539\u53D8:" + JSON.stringify(e));
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_rate2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_rate = () => "../../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_rate + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true,
      ["is-shadow"]: false
    }),
    b: common_vendor.o($options.onChange),
    c: common_vendor.o(($event) => $data.rateValue = $event),
    d: common_vendor.p({
      modelValue: $data.rateValue
    }),
    e: common_vendor.p({
      title: "\u57FA\u672C\u7528\u6CD5",
      type: "line",
      padding: true
    }),
    f: common_vendor.o($options.onChange),
    g: common_vendor.p({
      touchable: false,
      value: 5
    }),
    h: common_vendor.p({
      title: "\u4E0D\u652F\u6301\u6ED1\u52A8\u624B\u52BF\u9009\u62E9\u8BC4\u5206",
      subTitle: "\u8BBE\u7F6E touchable \u5C5E\u6027\u63A7\u5236\u662F\u5426\u5F00\u542F\u624B\u52BF\u9009\u62E9",
      type: "line",
      padding: true
    }),
    i: common_vendor.p({
      size: "18",
      value: 5
    }),
    j: common_vendor.p({
      title: "\u8BBE\u7F6E\u5C3A\u5BF8\u5927\u5C0F",
      subTitle: "\u8BBE\u7F6E size \u5C5E\u6027\u63A7\u5236\u7EC4\u4EF6\u5927\u5C0F",
      type: "line",
      padding: true
    }),
    k: common_vendor.p({
      max: 10,
      value: 5
    }),
    l: common_vendor.p({
      title: "\u8BBE\u7F6E\u8BC4\u5206\u6570",
      subTitle: "\u8BBE\u7F6E max \u5C5E\u6027\u63A7\u5236\u7EC4\u4EF6\u6700\u5927\u661F\u661F\u6570\u91CF",
      type: "line",
      padding: true
    }),
    m: common_vendor.p({
      value: 4,
      margin: "20"
    }),
    n: common_vendor.p({
      title: "\u8BBE\u7F6E\u661F\u661F\u95F4\u9694",
      subTitle: "\u8BBE\u7F6E margin \u5C5E\u6027\u63A7\u5236\u661F\u661F\u95F4\u9694",
      type: "line",
      padding: true
    }),
    o: common_vendor.p({
      value: 3,
      color: "#bbb",
      ["active-color"]: "red"
    }),
    p: common_vendor.p({
      title: "\u8BBE\u7F6E\u989C\u8272",
      subTitle: "\u4F7F\u7528 color \u5C5E\u6027\u8BBE\u7F6E\u661F\u661F\u989C\u8272",
      type: "line",
      padding: true
    }),
    q: common_vendor.p({
      ["allow-half"]: true,
      value: 3.5
    }),
    r: common_vendor.p({
      title: "\u534A\u661F",
      subTitle: "\u4F7F\u7528 allow-half \u5C5E\u6027\u8BBE\u7F6E\u662F\u5426\u663E\u793A\u534A\u661F",
      type: "line",
      padding: true
    }),
    s: common_vendor.p({
      readonly: true,
      value: 2
    }),
    t: common_vendor.p({
      title: "\u53EA\u8BFB\u72B6\u6001",
      subTitle: "\u4F7F\u7528 readonly \u5C5E\u6027\u8BBE\u7F6E\u7EC4\u4EF6\u53EA\u8BFB",
      type: "line",
      padding: true
    }),
    v: common_vendor.p({
      disabled: true,
      disabledColor: "#ccc",
      value: 3
    }),
    w: common_vendor.p({
      title: "\u7981\u7528\u72B6\u6001",
      subTitle: "\u4F7F\u7528 disabled \u5C5E\u6027\u8BBE\u7F6E\u7EC4\u4EF6\u7981\u7528",
      type: "line",
      padding: true
    }),
    x: common_vendor.p({
      value: 3,
      ["is-fill"]: false
    }),
    y: common_vendor.p({
      title: "\u672A\u9009\u4E2D\u7684\u661F\u661F\u4E3A\u9542\u7A7A\u72B6\u6001",
      subTitle: "\u4F7F\u7528 is-fill \u5C5E\u6027\u8BBE\u7F6E\u661F\u661F\u9542\u7A7A",
      type: "line",
      padding: true
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/rate/rate.nvue"]]);
wx.createPage(MiniProgramPage);
