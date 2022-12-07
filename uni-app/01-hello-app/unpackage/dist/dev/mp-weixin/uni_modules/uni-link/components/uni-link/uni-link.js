"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "uniLink",
  props: {
    href: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    download: {
      type: String,
      default: ""
    },
    showUnderLine: {
      type: [Boolean, String],
      default: true
    },
    copyTips: {
      type: String,
      default: "\u5DF2\u81EA\u52A8\u590D\u5236\u7F51\u5740\uFF0C\u8BF7\u5728\u624B\u673A\u6D4F\u89C8\u5668\u91CC\u7C98\u8D34\u8BE5\u7F51\u5740"
    },
    color: {
      type: String,
      default: "#999999"
    },
    fontSize: {
      type: [Number, String],
      default: 14
    }
  },
  computed: {
    isShowA() {
      if ((this.isMail() || this.isTel()) && this._isH5 === true) {
        return true;
      }
      return false;
    }
  },
  created() {
    this._isH5 = null;
  },
  methods: {
    isMail() {
      return this.href.startsWith("mailto:");
    },
    isTel() {
      return this.href.startsWith("tel:");
    },
    openURL() {
      common_vendor.index.setClipboardData({
        data: this.href
      });
      common_vendor.index.showModal({
        content: this.copyTips,
        showCancel: false
      });
    },
    makePhoneCall(phoneNumber) {
      common_vendor.index.makePhoneCall({
        phoneNumber
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.isShowA
  }, $options.isShowA ? {
    b: common_vendor.t($props.text),
    c: $props.href,
    d: $props.showUnderLine === true || $props.showUnderLine === "true" ? 1 : "",
    e: $props.color,
    f: $props.fontSize + "px",
    g: $props.download
  } : {
    h: common_vendor.t($props.text),
    i: $props.showUnderLine === true || $props.showUnderLine === "true" ? 1 : "",
    j: $props.color,
    k: $props.fontSize + "px",
    l: common_vendor.o((...args) => $options.openURL && $options.openURL(...args))
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-link/components/uni-link/uni-link.vue"]]);
wx.createComponent(Component);
