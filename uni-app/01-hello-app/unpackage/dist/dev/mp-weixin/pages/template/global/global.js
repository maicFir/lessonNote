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
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      gd: {}
    };
  },
  computed: __spreadValues({}, common_vendor.mapState(["testvuex"])),
  methods: __spreadProps(__spreadValues(__spreadValues({}, common_vendor.mapMutations(["setTestTrue"])), common_vendor.mapMutations(["setTestFalse"])), {
    setGD: function() {
      this.gd.test = "123";
    },
    setVUEX: function(isTrue) {
      if (isTrue) {
        this.setTestTrue(this.$store.state);
      } else {
        this.setTestFalse(this.$store.state);
      }
    }
  }),
  onShow() {
    this.gd = getApp().globalData;
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.gd.test),
    b: common_vendor.o(($event) => $options.setGD()),
    c: common_vendor.t(_ctx.testvuex),
    d: common_vendor.o(($event) => $options.setVUEX(true)),
    e: common_vendor.o(($event) => $options.setVUEX(false))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/template/global/global.vue"]]);
wx.createPage(MiniProgramPage);
