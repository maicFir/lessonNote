"use strict";
var uni_modules_uniSwipeAction_components_uniSwipeActionItem_mpwxs = require("./mpwxs.js");
var uni_modules_uniSwipeAction_components_uniSwipeActionItem_bindingx = require("./bindingx.js");
var uni_modules_uniSwipeAction_components_uniSwipeActionItem_mpother = require("./mpother.js");
var common_vendor = require("../../../../common/vendor.js");
var block0 = (Component2) => {
  if (!Component2.wxsCallMethods) {
    Component2.wxsCallMethods = [];
  }
  Component2.wxsCallMethods.push("closeSwipe", "change");
};
var block1 = {};
const _sfc_main = {
  mixins: [uni_modules_uniSwipeAction_components_uniSwipeActionItem_mpwxs.mpwxs, uni_modules_uniSwipeAction_components_uniSwipeActionItem_bindingx.bindIngXMixins, uni_modules_uniSwipeAction_components_uniSwipeActionItem_mpother.otherMixins],
  emits: ["click", "change"],
  props: {
    show: {
      type: String,
      default: "none"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autoClose: {
      type: Boolean,
      default: true
    },
    threshold: {
      type: Number,
      default: 20
    },
    leftOptions: {
      type: Array,
      default() {
        return [];
      }
    },
    rightOptions: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  unmounted() {
    this.__isUnmounted = true;
    this.uninstall();
  },
  methods: {
    uninstall() {
      if (this.swipeaction) {
        this.swipeaction.children.forEach((item, index) => {
          if (item === this) {
            this.swipeaction.children.splice(index, 1);
          }
        });
      }
    },
    getSwipeAction(name = "uniSwipeAction") {
      let parent = this.$parent;
      let parentName = parent.$options.name;
      while (parentName !== name) {
        parent = parent.$parent;
        if (!parent)
          return false;
        parentName = parent.$options.name;
      }
      return parent;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.leftOptions, (item, index, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: item.style && item.style.color ? item.style.color : "#FFFFFF",
        c: item.style && item.style.fontSize ? item.style.fontSize : "16px",
        d: index,
        e: item.style && item.style.backgroundColor ? item.style.backgroundColor : "#C7C6CD",
        f: common_vendor.o((...args) => _ctx.appTouchStart && _ctx.appTouchStart(...args), index),
        g: common_vendor.o(($event) => _ctx.appTouchEnd($event, index, item, "left"), index),
        h: common_vendor.o(($event) => _ctx.onClickForPC(index, item, "left"), index)
      };
    }),
    b: common_vendor.f($props.rightOptions, (item, index, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: item.style && item.style.color ? item.style.color : "#FFFFFF",
        c: item.style && item.style.fontSize ? item.style.fontSize : "16px",
        d: index,
        e: item.style && item.style.backgroundColor ? item.style.backgroundColor : "#C7C6CD",
        f: common_vendor.o((...args) => _ctx.appTouchStart && _ctx.appTouchStart(...args), index),
        g: common_vendor.o(($event) => _ctx.appTouchEnd($event, index, item, "right"), index),
        h: common_vendor.o(($event) => _ctx.onClickForPC(index, item, "right"), index)
      };
    }),
    c: _ctx.is_show,
    d: $props.threshold,
    e: $props.disabled
  };
}
if (typeof block0 === "function")
  block0(_sfc_main);
if (typeof block1 === "function")
  block1(_sfc_main);
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.vue"]]);
wx.createComponent(Component);
