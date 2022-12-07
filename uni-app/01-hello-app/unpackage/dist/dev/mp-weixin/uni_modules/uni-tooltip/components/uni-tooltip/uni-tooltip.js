"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "uni-tooltip",
  data() {
    return {};
  },
  props: {
    content: {
      type: String,
      default: ""
    },
    placement: {
      type: String,
      default: "bottom"
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.content || _ctx.$slots.content
  }, $props.content || _ctx.$slots.content ? {
    b: common_vendor.t($props.content)
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-tooltip/components/uni-tooltip/uni-tooltip.vue"]]);
wx.createComponent(Component);
