"use strict";
var common_vendor = require("../../../../common/vendor.js");
const ComponentClass = "uni-row";
const modifierSeparator = "--";
const _sfc_main = {
  name: "uniRow",
  componentName: "uniRow",
  options: {
    virtualHost: true
  },
  props: {
    type: String,
    gutter: Number,
    justify: {
      type: String,
      default: "start"
    },
    align: {
      type: String,
      default: "top"
    },
    width: {
      type: [String, Number],
      default: 750
    }
  },
  created() {
  },
  computed: {
    marginValue() {
      if (this.gutter) {
        return -(this.gutter / 2);
      }
      return 0;
    },
    typeClass() {
      return this.type === "flex" ? `${ComponentClass + modifierSeparator}flex` : "";
    },
    justifyClass() {
      return this.justify !== "start" ? `${ComponentClass + modifierSeparator}flex-justify-${this.justify}` : "";
    },
    alignClass() {
      return this.align !== "top" ? `${ComponentClass + modifierSeparator}flex-align-${this.align}` : "";
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.n($options.typeClass),
    b: common_vendor.n($options.justifyClass),
    c: common_vendor.n($options.alignClass),
    d: `${Number($options.marginValue)}rpx`,
    e: `${Number($options.marginValue)}rpx`
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-row/components/uni-row/uni-row.vue"]]);
wx.createComponent(Component);
