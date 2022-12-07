"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  options: {
    virtualHost: true
  },
  props: {
    separator: {
      type: String,
      default: "/"
    },
    separatorClass: {
      type: String,
      default: ""
    }
  },
  provide() {
    return {
      uniBreadcrumb: this
    };
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-breadcrumb/components/uni-breadcrumb/uni-breadcrumb.vue"]]);
wx.createComponent(Component);
