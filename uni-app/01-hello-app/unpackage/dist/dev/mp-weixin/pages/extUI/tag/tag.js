"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      type: "default",
      inverted: false
    };
  },
  methods: {
    setType() {
      let types = ["default", "primary", "success", "warning", "error"];
      let index = types.indexOf(this.type);
      types.splice(index, 1);
      let randomIndex = Math.floor(Math.random() * 4);
      this.type = types[randomIndex];
    },
    setInverted() {
      this.inverted = !this.inverted;
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_tag2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_tag = () => "../../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_tag + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true
    }),
    b: common_vendor.p({
      text: "\u6807\u7B7E",
      type: "primary"
    }),
    c: common_vendor.p({
      text: "\u6807\u7B7E",
      type: "success"
    }),
    d: common_vendor.p({
      text: "\u6807\u7B7E",
      type: "warning"
    }),
    e: common_vendor.p({
      text: "\u6807\u7B7E",
      type: "error"
    }),
    f: common_vendor.p({
      text: "\u6807\u7B7E"
    }),
    g: common_vendor.p({
      title: "\u5B9E\u5FC3\u6807\u7B7E",
      type: "line",
      padding: true
    }),
    h: common_vendor.p({
      inverted: true,
      text: "\u6807\u7B7E",
      type: "primary"
    }),
    i: common_vendor.p({
      inverted: true,
      text: "\u6807\u7B7E",
      type: "success"
    }),
    j: common_vendor.p({
      inverted: true,
      text: "\u6807\u7B7E",
      type: "warning"
    }),
    k: common_vendor.p({
      inverted: true,
      text: "\u6807\u7B7E",
      type: "error"
    }),
    l: common_vendor.p({
      inverted: true,
      text: "\u6807\u7B7E"
    }),
    m: common_vendor.p({
      title: "\u7A7A\u5FC3\u6807\u7B7E",
      subTitle: "\u4F7F\u7528 inverted \u5C5E\u6027\u663E\u793A\u7A7A\u5FC3\u8868\u7B7E",
      type: "line",
      padding: true
    }),
    n: common_vendor.p({
      text: "\u6807\u7B7E",
      type: "primary",
      size: "normal"
    }),
    o: common_vendor.p({
      text: "\u6807\u7B7E",
      type: "primary",
      size: "small"
    }),
    p: common_vendor.p({
      text: "\u6807\u7B7E",
      type: "primary",
      size: "mini"
    }),
    q: common_vendor.p({
      title: "\u6807\u7B7E\u5C3A\u5BF8",
      subTitle: "\u4F7F\u7528 size \u5C5E\u6027\u63A7\u5236\u6807\u7B7E\u5927\u5C0F",
      type: "line",
      padding: true
    }),
    r: common_vendor.p({
      circle: true,
      text: "\u6807\u7B7E",
      type: "primary"
    }),
    s: common_vendor.p({
      circle: true,
      text: "\u6807\u7B7E",
      type: "primary",
      size: "small"
    }),
    t: common_vendor.p({
      circle: true,
      text: "\u6807\u7B7E",
      type: "primary",
      size: "mini"
    }),
    v: common_vendor.p({
      title: "\u5706\u89D2\u6837\u5F0F",
      subTitle: "\u4F7F\u7528 circle \u5C5E\u6027\u63A7\u5236\u6807\u7B7E\u5706\u89D2",
      type: "line",
      padding: true
    }),
    w: common_vendor.p({
      mark: true,
      text: "\u6807\u7B7E",
      type: "primary",
      size: "default"
    }),
    x: common_vendor.p({
      mark: true,
      text: "\u6807\u7B7E",
      type: "primary",
      size: "small"
    }),
    y: common_vendor.p({
      mark: true,
      text: "\u6807\u7B7E",
      type: "primary",
      size: "mini"
    }),
    z: common_vendor.p({
      title: "\u6807\u8BB0\u6837\u5F0F",
      subTitle: "\u4F7F\u7528 mark \u5C5E\u6027\u663E\u793A\u6807\u8BB0\u6837\u5F0F",
      type: "line",
      padding: true
    }),
    A: common_vendor.p({
      disabled: true,
      text: "\u6807\u7B7E",
      type: "primary"
    }),
    B: common_vendor.p({
      title: "\u4E0D\u53EF\u70B9\u51FB\u72B6\u6001",
      subTitle: "\u4F7F\u7528 disabled \u5C5E\u6027 \u663E\u793A\u7981\u7528\u6837\u5F0F",
      type: "line",
      padding: true
    }),
    C: common_vendor.p({
      text: "\u81EA\u5B9A\u4E49\u6807\u7B7E\u6837\u5F0F",
      ["custom-style"]: "background-color: #4335d6; border-color: #4335d6; color: #fff;"
    }),
    D: common_vendor.p({
      title: "\u81EA\u5B9A\u4E49\u6837\u5F0F",
      subTitle: "\u4F7F\u7528 custom-style \u5C5E\u6027\u81EA\u5B9A\u4E49\u6837\u5F0F",
      type: "line",
      padding: true
    }),
    E: common_vendor.o($options.setType),
    F: common_vendor.p({
      type: $data.type,
      text: "\u6807\u7B7E"
    }),
    G: common_vendor.o($options.setInverted),
    H: common_vendor.p({
      circle: true,
      inverted: $data.inverted,
      text: "\u6807\u7B7E",
      type: "primary"
    }),
    I: common_vendor.p({
      title: "\u70B9\u51FB\u4E8B\u4EF6",
      type: "line",
      padding: true
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/tag/tag.nvue"]]);
wx.createPage(MiniProgramPage);
