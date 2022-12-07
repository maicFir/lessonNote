"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "progress",
      pgList: [0, 0, 0, 0]
    };
  },
  methods: {
    setProgress() {
      this.pgList = [20, 40, 60, 80];
    },
    clearProgress() {
      this.pgList = [0, 0, 0, 0];
    }
  }
};
if (!Array) {
  const _easycom_page_head2 = common_vendor.resolveComponent("page-head");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_page_head2 + _easycom_uni_icons2)();
}
const _easycom_page_head = () => "../../../components/page-head/page-head.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_page_head + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: $data.title
    }),
    b: $data.pgList[0],
    c: $data.pgList[1],
    d: common_vendor.p({
      type: "close",
      color: "#dd524d"
    }),
    e: $data.pgList[2],
    f: $data.pgList[3],
    g: common_vendor.o((...args) => $options.setProgress && $options.setProgress(...args)),
    h: common_vendor.o((...args) => $options.clearProgress && $options.clearProgress(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/component/progress/progress.vue"]]);
wx.createPage(MiniProgramPage);
