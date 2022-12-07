"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "modal",
      modalHidden: true,
      modalHidden2: true
    };
  },
  methods: {
    modalTap: function(e) {
      common_vendor.index.showModal({
        title: "\u5F39\u7A97\u6807\u9898",
        content: "\u5F39\u7A97\u5185\u5BB9\uFF0C\u544A\u77E5\u5F53\u524D\u72B6\u6001\u3001\u4FE1\u606F\u548C\u89E3\u51B3\u65B9\u6CD5\uFF0C\u63CF\u8FF0\u6587\u5B57\u5C3D\u91CF\u63A7\u5236\u5728\u4E09\u884C\u5185",
        showCancel: false,
        confirmText: "\u786E\u5B9A"
      });
    },
    noTitlemodalTap: function(e) {
      common_vendor.index.showModal({
        content: "\u5F39\u7A97\u5185\u5BB9\uFF0C\u544A\u77E5\u5F53\u524D\u72B6\u6001\u3001\u4FE1\u606F\u548C\u89E3\u51B3\u65B9\u6CD5\uFF0C\u63CF\u8FF0\u6587\u5B57\u5C3D\u91CF\u63A7\u5236\u5728\u4E09\u884C\u5185",
        confirmText: "\u786E\u5B9A",
        cancelText: "\u53D6\u6D88"
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
    b: common_vendor.o((...args) => $options.modalTap && $options.modalTap(...args)),
    c: common_vendor.o((...args) => $options.noTitlemodalTap && $options.noTitlemodalTap(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/modal/modal.vue"]]);
wx.createPage(MiniProgramPage);
