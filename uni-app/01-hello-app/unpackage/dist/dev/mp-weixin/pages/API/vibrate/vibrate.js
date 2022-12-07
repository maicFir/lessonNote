"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "vibrateLong/vibrateShort"
    };
  },
  onLoad() {
  },
  methods: {
    longshock() {
      common_vendor.index.vibrateLong({
        success: function() {
          console.log("success");
        }
      });
    },
    shortshock() {
      common_vendor.index.vibrateShort({
        success: function() {
          console.log("success");
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_page_head2 = common_vendor.resolveComponent("page-head");
  _easycom_page_head2();
}
const _easycom_page_head = () => "../../../components/page-head/page-head.js";
if (!Math) {
  _easycom_page_head();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: $data.title
    }),
    b: common_vendor.o((...args) => $options.longshock && $options.longshock(...args)),
    c: common_vendor.o((...args) => $options.shortshock && $options.shortshock(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/vibrate/vibrate.vue"]]);
wx.createPage(MiniProgramPage);
