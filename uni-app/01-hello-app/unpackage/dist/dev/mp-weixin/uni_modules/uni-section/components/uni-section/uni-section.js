"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "UniSection",
  emits: ["click"],
  props: {
    type: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      required: true,
      default: ""
    },
    titleFontSize: {
      type: String,
      default: "14px"
    },
    titleColor: {
      type: String,
      default: "#333"
    },
    subTitle: {
      type: String,
      default: ""
    },
    subTitleFontSize: {
      type: String,
      default: "12px"
    },
    subTitleColor: {
      type: String,
      default: "#999"
    },
    padding: {
      type: [Boolean, String],
      default: false
    }
  },
  computed: {
    _padding() {
      if (typeof this.padding === "string") {
        return this.padding;
      }
      return this.padding ? "10px" : "";
    }
  },
  watch: {
    title(newVal) {
      if (common_vendor.index.report && newVal !== "") {
        common_vendor.index.report("title", newVal);
      }
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.type
  }, $props.type ? {
    b: common_vendor.n($props.type)
  } : {}, {
    c: common_vendor.t($props.title),
    d: $props.titleFontSize,
    e: $props.titleColor,
    f: !$props.subTitle ? 1 : "",
    g: $props.subTitle
  }, $props.subTitle ? {
    h: common_vendor.t($props.subTitle),
    i: $props.subTitleFontSize,
    j: $props.subTitleColor
  } : {}, {
    k: common_vendor.o((...args) => $options.onClick && $options.onClick(...args)),
    l: $options._padding
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-section/components/uni-section/uni-section.vue"]]);
wx.createComponent(Component);
