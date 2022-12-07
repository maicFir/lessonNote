"use strict";
var common_vendor = require("../../../../common/vendor.js");
const statusBar = () => "./uni-status-bar.js";
const getVal = (val) => typeof val === "number" ? val + "px" : val;
const _sfc_main = {
  name: "UniNavBar",
  components: {
    statusBar
  },
  emits: ["clickLeft", "clickRight", "clickTitle"],
  props: {
    dark: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    leftText: {
      type: String,
      default: ""
    },
    rightText: {
      type: String,
      default: ""
    },
    leftIcon: {
      type: String,
      default: ""
    },
    rightIcon: {
      type: String,
      default: ""
    },
    fixed: {
      type: [Boolean, String],
      default: false
    },
    color: {
      type: String,
      default: ""
    },
    backgroundColor: {
      type: String,
      default: ""
    },
    statusBar: {
      type: [Boolean, String],
      default: false
    },
    shadow: {
      type: [Boolean, String],
      default: false
    },
    border: {
      type: [Boolean, String],
      default: true
    },
    height: {
      type: [Number, String],
      default: 44
    },
    leftWidth: {
      type: [Number, String],
      default: 60
    },
    rightWidth: {
      type: [Number, String],
      default: 60
    },
    stat: {
      type: [Boolean, String],
      default: ""
    }
  },
  computed: {
    themeBgColor() {
      if (this.dark) {
        if (this.backgroundColor) {
          return this.backgroundColor;
        } else {
          return this.dark ? "#333" : "#FFF";
        }
      }
      return this.backgroundColor || "#FFF";
    },
    themeColor() {
      if (this.dark) {
        if (this.color) {
          return this.color;
        } else {
          return this.dark ? "#fff" : "#333";
        }
      }
      return this.color || "#333";
    },
    navbarHeight() {
      return getVal(this.height);
    },
    leftIconWidth() {
      return getVal(this.leftWidth);
    },
    rightIconWidth() {
      return getVal(this.rightWidth);
    }
  },
  mounted() {
    if (common_vendor.index.report && this.stat && this.title !== "") {
      common_vendor.index.report("title", this.title);
    }
  },
  methods: {
    onClickLeft() {
      this.$emit("clickLeft");
    },
    onClickRight() {
      this.$emit("clickRight");
    },
    onClickTitle() {
      this.$emit("clickTitle");
    }
  }
};
if (!Array) {
  const _component_status_bar = common_vendor.resolveComponent("status-bar");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_component_status_bar + _easycom_uni_icons2)();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.statusBar
  }, $props.statusBar ? {} : {}, {
    b: $props.leftIcon.length > 0
  }, $props.leftIcon.length > 0 ? {
    c: common_vendor.p({
      color: $options.themeColor,
      type: $props.leftIcon,
      size: "20"
    })
  } : {}, {
    d: $props.leftText.length
  }, $props.leftText.length ? {
    e: common_vendor.t($props.leftText),
    f: $options.themeColor,
    g: !$props.leftIcon.length > 0 ? 1 : ""
  } : {}, {
    h: common_vendor.o((...args) => $options.onClickLeft && $options.onClickLeft(...args)),
    i: $options.leftIconWidth,
    j: $props.title.length > 0
  }, $props.title.length > 0 ? {
    k: common_vendor.t($props.title),
    l: $options.themeColor
  } : {}, {
    m: common_vendor.o((...args) => $options.onClickTitle && $options.onClickTitle(...args)),
    n: $props.rightIcon.length
  }, $props.rightIcon.length ? {
    o: common_vendor.p({
      color: $options.themeColor,
      type: $props.rightIcon,
      size: "22"
    })
  } : {}, {
    p: $props.rightText.length && !$props.rightIcon.length
  }, $props.rightText.length && !$props.rightIcon.length ? {
    q: common_vendor.t($props.rightText),
    r: $options.themeColor
  } : {}, {
    s: common_vendor.o((...args) => $options.onClickRight && $options.onClickRight(...args)),
    t: $options.rightIconWidth,
    v: $options.themeColor,
    w: $options.themeBgColor,
    x: $options.navbarHeight,
    y: $props.fixed ? 1 : "",
    z: $props.shadow ? 1 : "",
    A: $props.border ? 1 : "",
    B: $options.themeBgColor,
    C: $props.fixed
  }, $props.fixed ? common_vendor.e({
    D: $props.statusBar
  }, $props.statusBar ? {} : {}, {
    E: $options.navbarHeight
  }) : {}, {
    F: $props.dark ? 1 : ""
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6bda1a90"], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.vue"]]);
wx.createComponent(Component);
