"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "UniTag",
  emits: ["click"],
  props: {
    type: {
      type: String,
      default: "default"
    },
    size: {
      type: String,
      default: "normal"
    },
    text: {
      type: String,
      default: ""
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    inverted: {
      type: [Boolean, String],
      default: false
    },
    circle: {
      type: [Boolean, String],
      default: false
    },
    mark: {
      type: [Boolean, String],
      default: false
    },
    customStyle: {
      type: String,
      default: ""
    }
  },
  computed: {
    classes() {
      const {
        type,
        disabled,
        inverted,
        circle,
        mark,
        size,
        isTrue
      } = this;
      const classArr = [
        "uni-tag--" + type,
        "uni-tag--" + size,
        isTrue(disabled) ? "uni-tag--disabled" : "",
        isTrue(inverted) ? "uni-tag--" + type + "--inverted" : "",
        isTrue(circle) ? "uni-tag--circle" : "",
        isTrue(mark) ? "uni-tag--mark" : "",
        isTrue(inverted) ? "uni-tag--inverted uni-tag-text--" + type : "",
        size === "small" ? "uni-tag-text--small" : ""
      ];
      return classArr.join(" ");
    }
  },
  methods: {
    isTrue(value) {
      return value === true || value === "true";
    },
    onClick() {
      if (this.isTrue(this.disabled))
        return;
      this.$emit("click");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.text
  }, $props.text ? {
    b: common_vendor.t($props.text),
    c: common_vendor.n($options.classes),
    d: common_vendor.s($props.customStyle),
    e: common_vendor.o((...args) => $options.onClick && $options.onClick(...args))
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1516016e"], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-tag/components/uni-tag/uni-tag.vue"]]);
wx.createComponent(Component);
