"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "UniListItem",
  emits: ["click", "switchChange"],
  props: {
    direction: {
      type: String,
      default: "row"
    },
    title: {
      type: String,
      default: ""
    },
    note: {
      type: String,
      default: ""
    },
    ellipsis: {
      type: [Number, String],
      default: 0
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    clickable: {
      type: Boolean,
      default: false
    },
    showArrow: {
      type: [Boolean, String],
      default: false
    },
    link: {
      type: [Boolean, String],
      default: false
    },
    to: {
      type: String,
      default: ""
    },
    showBadge: {
      type: [Boolean, String],
      default: false
    },
    showSwitch: {
      type: [Boolean, String],
      default: false
    },
    switchChecked: {
      type: [Boolean, String],
      default: false
    },
    badgeText: {
      type: String,
      default: ""
    },
    badgeType: {
      type: String,
      default: "success"
    },
    badgeStyle: {
      type: Object,
      default() {
        return {};
      }
    },
    rightText: {
      type: String,
      default: ""
    },
    thumb: {
      type: String,
      default: ""
    },
    thumbSize: {
      type: String,
      default: "base"
    },
    showExtraIcon: {
      type: [Boolean, String],
      default: false
    },
    extraIcon: {
      type: Object,
      default() {
        return {
          type: "",
          color: "#000000",
          size: 20
        };
      }
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isFirstChild: false
    };
  },
  mounted() {
    this.list = this.getForm();
    if (this.list) {
      if (!this.list.firstChildAppend) {
        this.list.firstChildAppend = true;
        this.isFirstChild = true;
      }
    }
  },
  methods: {
    getForm(name = "uniList") {
      let parent = this.$parent;
      let parentName = parent.$options.name;
      while (parentName !== name) {
        parent = parent.$parent;
        if (!parent)
          return false;
        parentName = parent.$options.name;
      }
      return parent;
    },
    onClick() {
      if (this.to !== "") {
        this.openPage();
        return;
      }
      if (this.clickable || this.link) {
        this.$emit("click", {
          data: {}
        });
      }
    },
    onSwitchChange(e) {
      this.$emit("switchChange", e.detail);
    },
    openPage() {
      if (["navigateTo", "redirectTo", "reLaunch", "switchTab"].indexOf(this.link) !== -1) {
        this.pageApi(this.link);
      } else {
        this.pageApi("navigateTo");
      }
    },
    pageApi(api) {
      let callback = {
        url: this.to,
        success: (res) => {
          this.$emit("click", {
            data: res
          });
        },
        fail: (err) => {
          this.$emit("click", {
            data: err
          });
        }
      };
      switch (api) {
        case "navigateTo":
          common_vendor.index.navigateTo(callback);
          break;
        case "redirectTo":
          common_vendor.index.redirectTo(callback);
          break;
        case "reLaunch":
          common_vendor.index.reLaunch(callback);
          break;
        case "switchTab":
          common_vendor.index.switchTab(callback);
          break;
        default:
          common_vendor.index.navigateTo(callback);
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  (_easycom_uni_icons2 + _easycom_uni_badge2)();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_badge = () => "../../../uni-badge/components/uni-badge/uni-badge.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_badge)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.isFirstChild
  }, !$data.isFirstChild ? {
    b: $props.border ? 1 : ""
  } : {}, {
    c: $props.thumb
  }, $props.thumb ? {
    d: $props.thumb,
    e: common_vendor.n("uni-list--" + $props.thumbSize)
  } : $props.showExtraIcon ? {
    g: common_vendor.p({
      color: $props.extraIcon.color,
      size: $props.extraIcon.size,
      type: $props.extraIcon.type
    })
  } : {}, {
    f: $props.showExtraIcon,
    h: $props.title
  }, $props.title ? {
    i: common_vendor.t($props.title),
    j: common_vendor.n($props.ellipsis !== 0 && $props.ellipsis <= 2 ? "uni-ellipsis-" + $props.ellipsis : "")
  } : {}, {
    k: $props.note
  }, $props.note ? {
    l: common_vendor.t($props.note)
  } : {}, {
    m: $props.thumb || $props.showExtraIcon || $props.showBadge || $props.showSwitch ? 1 : "",
    n: $props.rightText || $props.showBadge || $props.showSwitch
  }, $props.rightText || $props.showBadge || $props.showSwitch ? common_vendor.e({
    o: $props.rightText
  }, $props.rightText ? {
    p: common_vendor.t($props.rightText)
  } : {}, {
    q: $props.showBadge
  }, $props.showBadge ? {
    r: common_vendor.p({
      type: $props.badgeType,
      text: $props.badgeText,
      ["custom-style"]: $props.badgeStyle
    })
  } : {}, {
    s: $props.showSwitch
  }, $props.showSwitch ? {
    t: $props.disabled,
    v: $props.switchChecked,
    w: common_vendor.o((...args) => $options.onSwitchChange && $options.onSwitchChange(...args))
  } : {}, {
    x: $props.direction === "column" ? 1 : ""
  }) : {}, {
    y: $props.showArrow || $props.link ? 1 : "",
    z: $props.direction === "column" ? 1 : "",
    A: $props.showArrow || $props.link
  }, $props.showArrow || $props.link ? {
    B: common_vendor.p({
      size: 16,
      color: "#bbb",
      type: "arrowright"
    })
  } : {}, {
    C: $props.disabled ? 1 : "",
    D: !$props.clickable && !$props.link || $props.disabled || $props.showSwitch ? "" : "uni-list-item--hover",
    E: common_vendor.o((...args) => $options.onClick && $options.onClick(...args))
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-list/components/uni-list-item/uni-list-item.vue"]]);
wx.createComponent(Component);
