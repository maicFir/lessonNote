"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "uploadFile",
      imageSrc: ""
    };
  },
  onUnload() {
    this.imageSrc = "";
  },
  methods: {
    chooseImage: function() {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album"],
        success: (res) => {
          console.log("chooseImage success, temp path is", res.tempFilePaths[0]);
          var imageSrc = res.tempFilePaths[0];
          common_vendor.index.uploadFile({
            url: "https://unidemo.dcloud.net.cn/upload",
            filePath: imageSrc,
            fileType: "image",
            name: "data",
            success: (res2) => {
              console.log("uploadImage success, res is:", res2);
              common_vendor.index.showToast({
                title: "\u4E0A\u4F20\u6210\u529F",
                icon: "success",
                duration: 1e3
              });
              this.imageSrc = imageSrc;
            },
            fail: (err) => {
              console.log("uploadImage fail", err);
              common_vendor.index.showModal({
                content: err.errMsg,
                showCancel: false
              });
            }
          });
        },
        fail: (err) => {
          console.log("chooseImage fail", err);
          common_vendor.index.getSetting({
            success: (res) => {
              let authStatus = res.authSetting["scope.album"];
              if (!authStatus) {
                common_vendor.index.showModal({
                  title: "\u6388\u6743\u5931\u8D25",
                  content: "Hello uni-app\u9700\u8981\u4ECE\u60A8\u7684\u76F8\u518C\u83B7\u53D6\u56FE\u7247\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u754C\u9762\u6253\u5F00\u76F8\u5173\u6743\u9650",
                  success: (res2) => {
                    if (res2.confirm) {
                      common_vendor.index.openSetting();
                    }
                  }
                });
              }
            }
          });
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
    d: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/upload-file/upload-file.vue"]]);
wx.createPage(MiniProgramPage);
