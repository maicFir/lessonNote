"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "UniSegmentedControl",
  emits: ["clickItem"],
  props: {
    current: {
      type: Number,
      default: 0
    },
    values: {
      type: Array,
      default() {
        return [];
      }
    },
    activeColor: {
      type: String,
      default: "#2979FF"
    },
    styleType: {
      type: String,
      default: "button"
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  watch: {
    current(val) {
      if (val !== this.currentIndex) {
        this.currentIndex = val;
      }
    }
  },
  created() {
    this.currentIndex = this.current;
  },
  methods: {
    _onClick(index) {
      if (this.currentIndex !== index) {
        this.currentIndex = index;
        this.$emit("clickItem", {
          currentIndex: index
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.values, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index === $data.currentIndex ? $props.styleType === "text" ? $props.activeColor : "#fff" : $props.styleType === "text" ? "#000" : $props.activeColor,
        c: common_vendor.n($props.styleType === "text" && index === $data.currentIndex ? "segmented-control__item--text" : ""),
        d: common_vendor.n(index === $data.currentIndex && $props.styleType === "button" ? "segmented-control__item--button--active" : ""),
        e: common_vendor.n(index === 0 && $props.styleType === "button" ? "segmented-control__item--button--first" : ""),
        f: common_vendor.n(index === $props.values.length - 1 && $props.styleType === "button" ? "segmented-control__item--button--last" : ""),
        g: index,
        h: index === $data.currentIndex && $props.styleType === "button" ? $props.activeColor : "",
        i: index === $data.currentIndex && $props.styleType === "text" || $props.styleType === "button" ? $props.activeColor : "transparent",
        j: common_vendor.o(($event) => $options._onClick(index), index)
      };
    }),
    b: common_vendor.n($props.styleType === "text" ? "" : "segmented-control__item--button"),
    c: common_vendor.n($props.styleType === "text" ? "segmented-control--text" : "segmented-control--button"),
    d: $props.styleType === "text" ? "" : $props.activeColor
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-064e9cd1"], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.vue"]]);
wx.createComponent(Component);
