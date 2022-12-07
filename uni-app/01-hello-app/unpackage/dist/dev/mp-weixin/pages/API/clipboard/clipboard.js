"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "get/setClipboardData",
      data: ""
    };
  },
  methods: {
    dataChange: function(e) {
      this.data = e.detail.value;
    },
    getClipboard: function() {
      common_vendor.index.getClipboardData({
        success: (res) => {
          console.log(res.data);
          const content = res.data ? "\u526A\u8D34\u677F\u5185\u5BB9\u4E3A:" + res.data : "\u526A\u8D34\u677F\u6682\u65E0\u5185\u5BB9";
          common_vendor.index.showModal({
            content,
            title: "\u8BFB\u53D6\u526A\u8D34\u677F",
            showCancel: false
          });
        },
        fail: () => {
          common_vendor.index.showModal({
            content: "\u8BFB\u53D6\u526A\u8D34\u677F\u5931\u8D25!",
            showCancel: false
          });
        }
      });
    },
    setClipboard: function() {
      var data = this.data;
      if (data.length === 0) {
        common_vendor.index.showModal({
          title: "\u8BBE\u7F6E\u526A\u8D34\u677F\u5931\u8D25",
          content: "\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A",
          showCancel: false
        });
      } else {
        common_vendor.index.setClipboardData({
          data,
          success: () => {
          },
          fail: () => {
          }
        });
      }
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
    b: $data.data,
    c: common_vendor.o((...args) => $options.dataChange && $options.dataChange(...args)),
    d: common_vendor.o((...args) => $options.setClipboard && $options.setClipboard(...args)),
    e: common_vendor.o((...args) => $options.getClipboard && $options.getClipboard(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/clipboard/clipboard.vue"]]);
wx.createPage(MiniProgramPage);
