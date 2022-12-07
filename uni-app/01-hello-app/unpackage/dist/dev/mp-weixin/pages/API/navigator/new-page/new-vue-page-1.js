"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "\u65B0\u9875\u9762",
      data: ""
    };
  },
  computed: __spreadValues(__spreadValues({}, common_vendor.mapState(["colorIndex", "colorList"])), common_vendor.mapGetters(["currentColor"])),
  onLoad(e) {
    if (e.data) {
      this.data = e.data;
    }
    common_vendor.index.$on("postMsg", (res) => {
      common_vendor.index.showModal({
        content: `\u6536\u5230uni.$emit\u6D88\u606F:${res.msg}`,
        showCancel: false
      });
    });
  },
  onUnload() {
    common_vendor.index.$off("postMsg");
  },
  methods: __spreadProps(__spreadValues({}, common_vendor.mapMutations(["setColorIndex"])), {
    navToNvue() {
      common_vendor.index.navigateTo({
        url: "new-nvue-page-1"
      });
    },
    navToVue() {
      common_vendor.index.navigateTo({
        url: "new-vue-page-2"
      });
    }
  })
};
if (!Array) {
  const _easycom_page_head2 = common_vendor.resolveComponent("page-head");
  _easycom_page_head2();
}
const _easycom_page_head = () => "../../../../components/page-head/page-head.js";
if (!Math) {
  _easycom_page_head();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: $data.title
    }),
    b: common_vendor.t($data.data),
    c: common_vendor.o(($event) => _ctx.setColorIndex(_ctx.colorIndex > 1 ? 0 : _ctx.colorIndex + 1)),
    d: _ctx.currentColor,
    e: common_vendor.o((...args) => $options.navToVue && $options.navToVue(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/navigator/new-page/new-vue-page-1.vue"]]);
wx.createPage(MiniProgramPage);
