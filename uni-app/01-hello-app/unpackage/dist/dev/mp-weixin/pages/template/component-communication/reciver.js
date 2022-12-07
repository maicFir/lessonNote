"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      msg: ""
    };
  },
  created() {
    common_vendor.index.$on("cc", this.recive);
  },
  beforeDestroy() {
    common_vendor.index.$off("cc", this.recive);
  },
  methods: {
    recive(e) {
      this.msg = e.msg;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.msg === "" ? "\u7B49\u5F85\u53D1\u9001" : "\u6536\u5230\u6D88\u606F\uFF1A"),
    b: common_vendor.t($data.msg)
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/template/component-communication/reciver.vue"]]);
wx.createComponent(Component);
