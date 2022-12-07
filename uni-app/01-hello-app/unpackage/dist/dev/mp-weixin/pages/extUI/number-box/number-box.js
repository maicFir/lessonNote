"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      numberValue: 0,
      vModelValue: 3
    };
  },
  methods: {
    change(value) {
      this.numberValue = value;
    },
    changeValue(value) {
      console.log("\u8FD4\u56DE\u6570\u503C\uFF1A", value);
    },
    blur(e) {
      console.log("-------blur:", e);
    },
    focus(e) {
      console.log("-------focus:", e);
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_number_box2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_number_box = () => "../../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_number_box + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.o($options.changeValue),
    c: common_vendor.p({
      title: "\u57FA\u672C\u7528\u6CD5",
      type: "line",
      padding: true
    }),
    d: common_vendor.o($options.blur),
    e: common_vendor.o($options.focus),
    f: common_vendor.o($options.changeValue),
    g: common_vendor.o(($event) => $data.vModelValue = $event),
    h: common_vendor.p({
      modelValue: $data.vModelValue
    }),
    i: common_vendor.p({
      title: "\u4F7F\u7528v-model : " + $data.vModelValue,
      subTitle: "\u4F7F\u7528 v-model \u663E\u793A\u9ED8\u8BA4\u503C",
      type: "line",
      padding: true
    }),
    j: common_vendor.p({
      min: 2,
      max: 9,
      value: 555
    }),
    k: common_vendor.p({
      title: "\u8BBE\u7F6E\u6700\u5C0F\u503C\u548C\u6700\u5927\u503C",
      subTitle: "\u4F7F\u7528 min \\ max \u5C5E\u6027\u8BBE\u7F6E\u6700\u5927\u6700\u5C0F\u503C",
      type: "line",
      padding: true
    }),
    l: common_vendor.p({
      value: 1.1,
      step: 0.1
    }),
    m: common_vendor.p({
      title: "\u8BBE\u7F6E\u6B65\u957F\uFF08\u6B65\u957F0.1)",
      subTitle: "\u4F7F\u7528 step \u5C5E\u6027\u8BBE\u7F6E\u6B65\u957F",
      type: "line",
      padding: true
    }),
    n: common_vendor.p({
      value: 50,
      background: "#2979FF",
      color: "#fff"
    }),
    o: common_vendor.p({
      title: "\u81EA\u5B9A\u4E49\u80CC\u666F",
      type: "line",
      subTitle: "\u4F7F\u7528 background \u5C5E\u6027\u8BBE\u7F6E\u81EA\u5B9A\u4E49\u80CC\u666F\u8272",
      padding: true
    }),
    p: common_vendor.p({
      disabled: true
    }),
    q: common_vendor.p({
      title: "\u7981\u7528\u72B6\u6001",
      subTitle: "\u4F7F\u7528 disabled \u5C5E\u6027\u8BBE\u7F6E\u7EC4\u4EF6\u7981\u7528",
      type: "line",
      padding: true
    }),
    r: common_vendor.o($options.change),
    s: common_vendor.p({
      value: $data.numberValue
    }),
    t: common_vendor.p({
      title: "\u83B7\u53D6\u8F93\u5165\u7684\u503C : " + $data.numberValue,
      type: "line",
      padding: true
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/number-box/number-box.nvue"]]);
wx.createPage(MiniProgramPage);
