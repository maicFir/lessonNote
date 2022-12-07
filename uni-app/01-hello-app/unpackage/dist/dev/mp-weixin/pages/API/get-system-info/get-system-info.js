"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "getSystemInfo",
      systemInfo: {}
    };
  },
  onUnload: function() {
    this.systemInfo = {};
  },
  methods: {
    getSystemInfo: function() {
      common_vendor.index.getSystemInfo({
        success: (res) => {
          this.systemInfo = res;
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
    b: $data.systemInfo.model,
    c: $data.systemInfo.platform,
    d: $data.systemInfo.system,
    e: $data.systemInfo.language,
    f: $data.systemInfo.version,
    g: $data.systemInfo.screenWidth,
    h: $data.systemInfo.screenHeight,
    i: $data.systemInfo.windowHeight,
    j: $data.systemInfo.windowTop,
    k: $data.systemInfo.windowBottom,
    l: $data.systemInfo.statusBarHeight,
    m: $data.systemInfo.pixelRatio,
    n: $data.systemInfo.SDKVersion,
    o: common_vendor.o((...args) => $options.getSystemInfo && $options.getSystemInfo(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/get-system-info/get-system-info.vue"]]);
wx.createPage(MiniProgramPage);
