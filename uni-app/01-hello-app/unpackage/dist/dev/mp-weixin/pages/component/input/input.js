"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "input",
      focus: false,
      inputValue: "",
      showClearIcon: false,
      inputClearValue: "",
      changeValue: "",
      showPassword: true,
      src: "../../../static/eye-1.png",
      platform: "",
      isNvue: false
    };
  },
  methods: {
    onKeyInput: function(event) {
      this.inputValue = event.detail.value;
    },
    replaceInput: function(event) {
      var value = event.detail.value;
      if (value === "11") {
        this.changeValue = "2";
      }
    },
    hideKeyboard: function(event) {
      if (event.detail.value === "123") {
        common_vendor.index.hideKeyboard();
      }
    },
    clearInput: function(event) {
      this.inputClearValue = event.detail.value;
      if (event.detail.value.length > 0) {
        this.showClearIcon = true;
      } else {
        this.showClearIcon = false;
      }
    },
    clearIcon: function() {
      this.inputClearValue = "";
      this.showClearIcon = false;
    },
    changePassword: function() {
      this.showPassword = !this.showPassword;
    },
    onFocus() {
      this.$mp.page.$getAppWebview().setStyle({
        softinputNavBar: "none"
      });
    },
    onBlur() {
      this.$mp.page.$getAppWebview().setStyle({
        softinputNavBar: "auto"
      });
    }
  },
  onLoad() {
    this.platform = common_vendor.index.getSystemInfoSync().platform;
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.title),
    b: common_vendor.t($data.inputValue),
    c: common_vendor.o((...args) => $options.onKeyInput && $options.onKeyInput(...args)),
    d: common_vendor.o([($event) => $data.changeValue = $event.detail.value, (...args) => $options.replaceInput && $options.replaceInput(...args)]),
    e: $data.changeValue,
    f: common_vendor.o((...args) => $options.hideKeyboard && $options.hideKeyboard(...args)),
    g: $data.inputClearValue,
    h: common_vendor.o((...args) => $options.clearInput && $options.clearInput(...args)),
    i: $data.showClearIcon
  }, $data.showClearIcon ? {
    j: common_vendor.o((...args) => $options.clearIcon && $options.clearIcon(...args))
  } : {}, {
    k: $data.showPassword,
    l: common_vendor.n(!$data.showPassword ? "uni-eye-active" : ""),
    m: common_vendor.o((...args) => $options.changePassword && $options.changePassword(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-86086558"], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/component/input/input.nvue"]]);
wx.createPage(MiniProgramPage);
