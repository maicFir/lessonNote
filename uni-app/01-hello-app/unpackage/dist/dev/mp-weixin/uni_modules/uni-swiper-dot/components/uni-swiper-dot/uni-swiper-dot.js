"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "UniSwiperDot",
  emits: ["clickItem"],
  props: {
    info: {
      type: Array,
      default() {
        return [];
      }
    },
    current: {
      type: Number,
      default: 0
    },
    dotsStyles: {
      type: Object,
      default() {
        return {};
      }
    },
    mode: {
      type: String,
      default: "default"
    },
    field: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      dots: {
        width: 6,
        height: 6,
        bottom: 10,
        color: "#fff",
        backgroundColor: "rgba(0, 0, 0, .3)",
        border: "1px rgba(0, 0, 0, .3) solid",
        selectedBackgroundColor: "#333",
        selectedBorder: "1px rgba(0, 0, 0, .9) solid"
      }
    };
  },
  watch: {
    dotsStyles(newVal) {
      this.dots = Object.assign(this.dots, this.dotsStyles);
    },
    mode(newVal) {
      if (newVal === "indexes") {
        this.dots.width = 14;
        this.dots.height = 14;
      } else {
        this.dots.width = 6;
        this.dots.height = 6;
      }
    }
  },
  created() {
    if (this.mode === "indexes") {
      this.dots.width = 12;
      this.dots.height = 12;
    }
    this.dots = Object.assign(this.dots, this.dotsStyles);
  },
  methods: {
    clickItem(index) {
      this.$emit("clickItem", index);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.mode === "default"
  }, $props.mode === "default" ? {
    b: common_vendor.f($props.info, (item, index, i0) => {
      return {
        a: common_vendor.o(($event) => $options.clickItem(index), index),
        b: (index === $props.current ? $data.dots.width * 2 : $data.dots.width) + "px",
        c: index !== $props.current ? $data.dots.backgroundColor : $data.dots.selectedBackgroundColor,
        d: index
      };
    }),
    c: $data.dots.width / 2 + "px",
    d: $data.dots.bottom + "px"
  } : {}, {
    e: $props.mode === "dot"
  }, $props.mode === "dot" ? {
    f: common_vendor.f($props.info, (item, index, i0) => {
      return {
        a: common_vendor.o(($event) => $options.clickItem(index), index),
        b: index !== $props.current ? $data.dots.backgroundColor : $data.dots.selectedBackgroundColor,
        c: index !== $props.current ? $data.dots.border : $data.dots.selectedBorder,
        d: index
      };
    }),
    g: $data.dots.width + "px",
    h: $data.dots.height + "px",
    i: $data.dots.bottom + "px"
  } : {}, {
    j: $props.mode === "round"
  }, $props.mode === "round" ? {
    k: common_vendor.f($props.info, (item, index, i0) => {
      return {
        a: common_vendor.o(($event) => $options.clickItem(index), index),
        b: common_vendor.n(index === $props.current && "uni-swiper__dots-long"),
        c: (index === $props.current ? $data.dots.width * 3 : $data.dots.width) + "px",
        d: index !== $props.current ? $data.dots.backgroundColor : $data.dots.selectedBackgroundColor,
        e: index !== $props.current ? $data.dots.border : $data.dots.selectedBorder,
        f: index
      };
    }),
    l: $data.dots.height + "px",
    m: $data.dots.bottom + "px"
  } : {}, {
    n: $props.mode === "nav"
  }, $props.mode === "nav" ? {
    o: common_vendor.t($props.current + 1 + "/" + $props.info.length + " " + $props.info[$props.current][$props.field]),
    p: $props.dotsStyles.color,
    q: $props.dotsStyles.backgroundColor
  } : {}, {
    r: $props.mode === "indexes"
  }, $props.mode === "indexes" ? {
    s: common_vendor.f($props.info, (item, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: common_vendor.o(($event) => $options.clickItem(index), index),
        c: index === $props.current ? $data.dots.selectedColor : $data.dots.color,
        d: index !== $props.current ? $data.dots.backgroundColor : $data.dots.selectedBackgroundColor,
        e: index !== $props.current ? $data.dots.border : $data.dots.selectedBorder,
        f: index
      };
    }),
    t: $data.dots.width + "px",
    v: $data.dots.height + "px",
    w: $data.dots.bottom + "px"
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-77b53eff"], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-swiper-dot/components/uni-swiper-dot/uni-swiper-dot.vue"]]);
wx.createComponent(Component);
