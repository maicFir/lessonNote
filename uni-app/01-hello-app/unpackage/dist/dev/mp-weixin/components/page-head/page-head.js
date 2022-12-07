"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "page-head",
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.title)
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/components/page-head/page-head.vue"]]);
wx.createComponent(Component);
