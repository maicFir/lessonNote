"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      value: "",
      password: "",
      placeholderStyle: "color:#2979FF;font-size:14px",
      styles: {
        color: "#2979FF",
        borderColor: "#2979FF"
      }
    };
  },
  onLoad() {
  },
  onReady() {
  },
  methods: {
    input(e) {
      console.log("\u8F93\u5165\u5185\u5BB9\uFF1A", e);
    },
    iconClick(type) {
      common_vendor.index.showToast({
        title: `\u70B9\u51FB\u4E86${type === "prefix" ? "\u5DE6\u4FA7" : "\u53F3\u4FA7"}\u7684\u56FE\u6807`,
        icon: "none"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_easyinput2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_easyinput = () => "../../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_easyinput + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.o($options.input),
    c: common_vendor.o(($event) => $data.value = $event),
    d: common_vendor.p({
      errorMessage: true,
      focus: true,
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
      modelValue: $data.value
    }),
    e: common_vendor.p({
      title: "\u9ED8\u8BA4",
      subTitle: "\u4F7F\u7528 focus \u5C5E\u6027\u81EA\u52A8\u83B7\u53D6\u8F93\u5165\u6846\u7126\u70B9",
      type: "line",
      padding: true
    }),
    f: common_vendor.t('"' + $data.value + '"'),
    g: common_vendor.o($options.input),
    h: common_vendor.o(($event) => $data.value = $event),
    i: common_vendor.p({
      trim: "all",
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
      modelValue: $data.value
    }),
    j: common_vendor.p({
      title: "\u53BB\u9664\u7A7A\u683C",
      subTitle: "\u4F7F\u7528 trim \u5C5E\u6027 ,\u53EF\u4EE5\u63A7\u5236\u8FD4\u56DE\u5185\u5BB9\u7684\u7A7A\u683C ",
      type: "line",
      padding: true
    }),
    k: common_vendor.o($options.input),
    l: common_vendor.o(($event) => $data.value = $event),
    m: common_vendor.p({
      styles: $data.styles,
      placeholderStyle: $data.placeholderStyle,
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
      modelValue: $data.value
    }),
    n: common_vendor.p({
      title: "\u81EA\u5B9A\u4E49\u6837\u5F0F",
      subTitle: "\u4F7F\u7528 styles \u5C5E\u6027 ,\u53EF\u4EE5\u81EA\u5B9A\u4E49\u8F93\u5165\u6846\u6837\u5F0F",
      type: "line",
      padding: true
    }),
    o: common_vendor.o($options.iconClick),
    p: common_vendor.o(($event) => $data.value = $event),
    q: common_vendor.p({
      prefixIcon: "search",
      placeholder: "\u5DE6\u4FA7\u56FE\u6807",
      modelValue: $data.value
    }),
    r: common_vendor.o($options.iconClick),
    s: common_vendor.o(($event) => $data.value = $event),
    t: common_vendor.p({
      suffixIcon: "search",
      placeholder: "\u53F3\u4FA7\u56FE\u6807",
      modelValue: $data.value
    }),
    v: common_vendor.p({
      title: "\u56FE\u6807",
      subTitle: "\u4F7F\u7528 prefixIcon / suffixIcon \u5C5E\u6027 ,\u53EF\u4EE5\u81EA\u5B9A\u4E49\u8F93\u5165\u6846\u5DE6\u53F3\u4FA7\u56FE\u6807",
      type: "line",
      padding: true
    }),
    w: common_vendor.p({
      disabled: true,
      value: "\u5DF2\u7981\u7528",
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9"
    }),
    x: common_vendor.p({
      title: "\u7981\u7528",
      subTitle: "\u4F7F\u7528 disabled \u5C5E\u6027\u7981\u7528\u8F93\u5165\u6846",
      type: "line",
      padding: true
    }),
    y: common_vendor.o(($event) => $data.password = $event),
    z: common_vendor.p({
      type: "password",
      placeholder: "\u8BF7\u8F93\u5165\u5BC6\u7801",
      modelValue: $data.password
    }),
    A: common_vendor.p({
      title: "\u5BC6\u7801\u6846",
      subTitle: "\u6307\u5B9A\u5C5E\u6027 type=password \u4F7F\u7528\u5BC6\u7801\u6846,\u53F3\u4FA7\u4F1A\u663E\u793A\u773C\u775B\u56FE\u6807",
      type: "line",
      padding: true
    }),
    B: common_vendor.o(($event) => $data.value = $event),
    C: common_vendor.p({
      type: "textarea",
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
      modelValue: $data.value
    }),
    D: common_vendor.p({
      title: "\u591A\u884C\u6587\u672C",
      subTitle: "\u6307\u5B9A\u5C5E\u6027 type=textarea \u4F7F\u7528\u591A\u884C\u6587\u672C\u6846",
      type: "line",
      padding: true
    }),
    E: common_vendor.o(($event) => $data.value = $event),
    F: common_vendor.p({
      type: "textarea",
      autoHeight: true,
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9",
      modelValue: $data.value
    }),
    G: common_vendor.p({
      title: "\u591A\u884C\u6587\u672C\u81EA\u52A8\u9AD8\u5EA6",
      subTitle: "\u4F7F\u7528\u5C5E\u6027 autoHeight \u4F7F\u591A\u884C\u6587\u672C\u6846\u81EA\u52A8\u589E\u9AD8",
      type: "line",
      padding: true
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/easyinput/easyinput.vue"]]);
wx.createPage(MiniProgramPage);
