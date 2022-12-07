"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "downloadFile",
      imageSrc: ""
    };
  },
  onUnload() {
    this.imageSrc = "";
  },
  methods: {
    downloadImage: function() {
      common_vendor.index.showLoading({
        title: "\u4E0B\u8F7D\u4E2D"
      });
      var self = this;
      common_vendor.index.downloadFile({
        url: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png",
        success: (res) => {
          console.log("downloadFile success, res is", res);
          self.imageSrc = res.tempFilePath;
          common_vendor.index.hideLoading();
        },
        fail: (err) => {
          console.log("downloadFile fail, err is:", err);
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
    b: $data.imageSrc
  }, $data.imageSrc ? {
    c: $data.imageSrc
  } : {
    d: common_vendor.o((...args) => $options.downloadImage && $options.downloadImage(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/download-file/download-file.vue"]]);
wx.createPage(MiniProgramPage);
