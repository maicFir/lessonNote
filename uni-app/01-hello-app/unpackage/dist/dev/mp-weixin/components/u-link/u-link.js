"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "u-link",
  props: {
    href: {
      type: String,
      default: ""
    },
    text: {
      type: String,
      default: ""
    },
    inWhiteList: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    openURL() {
      if (this.inWhiteList) {
        common_vendor.index.navigateTo({
          url: "/pages/component/web-view/web-view?url=" + this.href
        });
      } else {
        common_vendor.index.setClipboardData({
          data: this.href
        });
        common_vendor.index.showModal({
          content: "\u672C\u7F51\u5740\u65E0\u6CD5\u76F4\u63A5\u5728\u5C0F\u7A0B\u5E8F\u5185\u6253\u5F00\u3002\u5DF2\u81EA\u52A8\u590D\u5236\u7F51\u5740\uFF0C\u8BF7\u5728\u624B\u673A\u6D4F\u89C8\u5668\u91CC\u7C98\u8D34\u8BE5\u7F51\u5740",
          showCancel: false
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.text),
    b: $props.href,
    c: common_vendor.o((...args) => $options.openURL && $options.openURL(...args)),
    d: $props.inWhiteList
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/components/u-link/u-link.vue"]]);
wx.createComponent(Component);
