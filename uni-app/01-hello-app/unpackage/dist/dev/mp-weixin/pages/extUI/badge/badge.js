"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      value: 0,
      customStyle: {
        backgroundColor: "#62ed0d",
        color: "#fff"
      }
    };
  },
  mounted() {
    const timer = setInterval(() => {
      if (this.value >= 199) {
        clearInterval(timer);
        return;
      }
      this.value++;
    }, 100);
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_badge2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_badge = () => "../../../uni_modules/uni-badge/components/uni-badge/uni-badge.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_badge + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true,
      ["is-shadow"]: false
    }),
    b: common_vendor.p({
      text: "1"
    }),
    c: common_vendor.p({
      text: "2",
      type: "primary"
    }),
    d: common_vendor.p({
      text: "34",
      type: "success"
    }),
    e: common_vendor.p({
      text: "45",
      type: "warning"
    }),
    f: common_vendor.p({
      text: "123",
      type: "info"
    }),
    g: common_vendor.p({
      title: "\u57FA\u7840\u7528\u6CD5",
      type: "line",
      padding: true
    }),
    h: common_vendor.p({
      inverted: true,
      text: "1"
    }),
    i: common_vendor.p({
      inverted: true,
      text: "2",
      type: "primary"
    }),
    j: common_vendor.p({
      inverted: true,
      text: "34",
      type: "success"
    }),
    k: common_vendor.p({
      inverted: true,
      text: "45",
      type: "warning"
    }),
    l: common_vendor.p({
      inverted: true,
      text: "123",
      type: "info"
    }),
    m: common_vendor.p({
      title: "\u65E0\u5E95\u8272",
      type: "line",
      padding: true
    }),
    n: common_vendor.p({
      text: "2",
      type: "primary",
      customStyle: {
        background: "#4335d6"
      }
    }),
    o: common_vendor.p({
      text: "2",
      type: "primary",
      customStyle: $data.customStyle
    }),
    p: common_vendor.p({
      title: "\u81EA\u5B9A\u4E49\u6837\u5F0F",
      type: "line",
      padding: true
    }),
    q: common_vendor.p({
      text: $data.value,
      absolute: "rightTop",
      size: "small"
    }),
    r: common_vendor.p({
      title: "\u5B9A\u4F4D: aboslute \u5C5E\u6027",
      subTitle: "\u6CE8\uFF1A\u5728\u5B89\u5353\u7AEF\u4E0D\u652F\u6301 nvue",
      type: "line",
      padding: true
    }),
    s: common_vendor.p({
      text: 8,
      absolute: "rightTop",
      offset: [-3, -3],
      size: "small"
    }),
    t: common_vendor.p({
      title: "\u504F\u79FB: offset \u5C5E\u6027(\u5B58\u5728 aboslute)",
      type: "line",
      padding: true
    }),
    v: common_vendor.p({
      ["is-dot"]: true,
      text: $data.value,
      absolute: "rightTop",
      size: "small"
    }),
    w: common_vendor.p({
      title: "\u4EC5\u663E\u793A\u70B9: is-dot \u5C5E\u6027",
      type: "line",
      padding: true
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/badge/badge.vue"]]);
wx.createPage(MiniProgramPage);
