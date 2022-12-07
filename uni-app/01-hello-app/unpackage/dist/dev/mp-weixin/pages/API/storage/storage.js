"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "get/set/clearStorage",
      key: "",
      data: ""
    };
  },
  methods: {
    keyChange: function(e) {
      this.key = e.detail.value;
    },
    dataChange: function(e) {
      this.data = e.detail.value;
    },
    getStorage: function() {
      var key = this.key;
      this.data;
      if (key.length === 0) {
        common_vendor.index.showModal({
          title: "\u8BFB\u53D6\u6570\u636E\u5931\u8D25",
          content: "key \u4E0D\u80FD\u4E3A\u7A7A",
          showCancel: false
        });
      } else {
        common_vendor.index.getStorage({
          key,
          success: (res) => {
            common_vendor.index.showModal({
              title: "\u8BFB\u53D6\u6570\u636E\u6210\u529F",
              content: "data: '" + res.data + "'",
              showCancel: false
            });
          },
          fail: () => {
            common_vendor.index.showModal({
              title: "\u8BFB\u53D6\u6570\u636E\u5931\u8D25",
              content: "\u627E\u4E0D\u5230 key \u5BF9\u5E94\u7684\u6570\u636E",
              showCancel: false
            });
          }
        });
      }
    },
    setStorage: function() {
      var key = this.key;
      var data = this.data;
      if (key.length === 0) {
        common_vendor.index.showModal({
          title: "\u4FDD\u5B58\u6570\u636E\u5931\u8D25",
          content: "key \u4E0D\u80FD\u4E3A\u7A7A",
          showCancel: false
        });
      } else {
        common_vendor.index.setStorage({
          key,
          data,
          success: (res) => {
            common_vendor.index.showModal({
              title: "\u5B58\u50A8\u6570\u636E\u6210\u529F",
              content: JSON.stringify(res.errMsg),
              showCancel: false
            });
          },
          fail: () => {
            common_vendor.index.showModal({
              title: "\u50A8\u5B58\u6570\u636E\u5931\u8D25!",
              showCancel: false
            });
          }
        });
      }
    },
    clearStorage: function() {
      common_vendor.index.clearStorageSync();
      this.key = "", this.data = "";
      common_vendor.index.showModal({
        title: "\u6E05\u9664\u6570\u636E\u6210\u529F",
        content: " ",
        showCancel: false
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
    b: $data.key,
    c: common_vendor.o((...args) => $options.keyChange && $options.keyChange(...args)),
    d: $data.data,
    e: common_vendor.o((...args) => $options.dataChange && $options.dataChange(...args)),
    f: common_vendor.o((...args) => $options.setStorage && $options.setStorage(...args)),
    g: common_vendor.o((...args) => $options.getStorage && $options.getStorage(...args)),
    h: common_vendor.o((...args) => $options.clearStorage && $options.clearStorage(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/storage/storage.vue"]]);
wx.createPage(MiniProgramPage);
