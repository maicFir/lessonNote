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
    return {};
  },
  computed: __spreadValues(__spreadValues({}, common_vendor.mapState(["colorIndex", "colorList"])), common_vendor.mapGetters(["currentColor"])),
  methods: __spreadProps(__spreadValues({}, common_vendor.mapMutations(["setColorIndex"])), {
    emitMsg() {
      common_vendor.index.$emit("postMsg", {
        msg: "From: Vue Page"
      });
    }
  })
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => _ctx.setColorIndex(_ctx.colorIndex > 1 ? 0 : _ctx.colorIndex + 1)),
    b: _ctx.currentColor,
    c: common_vendor.o((...args) => $options.emitMsg && $options.emitMsg(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/navigator/new-page/new-vue-page-2.vue"]]);
wx.createPage(MiniProgramPage);
