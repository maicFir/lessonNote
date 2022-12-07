"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "scanCode",
      result: ""
    };
  },
  methods: {
    async scan() {
      common_vendor.index.scanCode({
        success: (res) => {
          this.result = res.result;
        },
        fail: (err) => {
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
  return common_vendor.e({
    a: common_vendor.p({
      title: $data.title
    }),
    b: $data.result
  }, $data.result ? {
    c: common_vendor.t($data.result)
  } : {}, {
    d: common_vendor.o((...args) => $options.scan && $options.scan(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/scan-code/scan-code.vue"]]);
wx.createPage(MiniProgramPage);
