"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: ""
    };
  },
  onLoad(e) {
    this.title = e.title || "";
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.title)
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/template/tabbar/detail/detail.vue"]]);
wx.createPage(MiniProgramPage);
