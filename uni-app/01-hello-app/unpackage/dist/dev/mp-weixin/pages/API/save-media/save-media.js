"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "saveImage/saveVideo",
      imagePath: "",
      videoPath: ""
    };
  },
  onLoad() {
  },
  methods: {
    videoErrorCallback: function() {
      common_vendor.index.showModal({
        content: "\u89C6\u9891\u52A0\u8F7D\u5931\u8D25",
        showCancel: false
      });
    },
    saveImage() {
      common_vendor.index.chooseImage({
        count: 1,
        sourceType: ["camera"],
        success: (res) => {
          this.imagePath = res.tempFilePaths[0];
          this.getTempFilePath(res.tempFilePaths[0], "imageTempPath");
        },
        fail: (err) => {
          common_vendor.index.getSetting({
            success: (res) => {
              let authStatus = res.authSetting["scope.camera"];
              if (!authStatus) {
                common_vendor.index.showModal({
                  title: "\u6388\u6743\u5931\u8D25",
                  content: "Hello uni-app\u9700\u8981\u4ECE\u60A8\u7684\u76F8\u673A\u83B7\u53D6\u56FE\u7247\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u754C\u9762\u6253\u5F00\u76F8\u5173\u6743\u9650",
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
    },
    saveVideo() {
      common_vendor.index.chooseVideo({
        count: 1,
        sourceType: ["camera"],
        success: (res) => {
          console.log(res.tempFilePath);
          this.videoPath = res.tempFilePath;
          this.getTempFilePath(res.tempFilePath, "videoTempPath");
        },
        fail: (err) => {
          common_vendor.index.getSetting({
            success: (res) => {
              let authStatus = res.authSetting["scope.camera"];
              if (!authStatus) {
                common_vendor.index.showModal({
                  title: "\u6388\u6743\u5931\u8D25",
                  content: "Hello uni-app\u9700\u8981\u4ECE\u60A8\u7684\u76F8\u673A\u83B7\u53D6\u89C6\u9891\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u754C\u9762\u6253\u5F00\u76F8\u5173\u6743\u9650",
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
    },
    getTempFilePath(url, types) {
      let obj = {
        filePath: url,
        success: () => {
          console.log("save success");
          common_vendor.index.showModal({
            content: "\u4FDD\u5B58\u6210\u529F",
            showCancel: false
          });
          common_vendor.index.hideLoading();
        },
        fail: (e) => {
          common_vendor.index.hideLoading();
          common_vendor.index.showModal({
            content: "\u4FDD\u5B58\u5931\u8D25",
            showCancel: false
          });
        }
      };
      common_vendor.index.showLoading({
        title: "\u4FDD\u5B58\u4E2D..."
      });
      if (types === "videoTempPath") {
        common_vendor.index.saveVideoToPhotosAlbum(obj);
      } else {
        common_vendor.index.saveImageToPhotosAlbum(obj);
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
  return common_vendor.e({
    a: common_vendor.p({
      title: $data.title
    }),
    b: $data.imagePath !== ""
  }, $data.imagePath !== "" ? {
    c: $data.imagePath
  } : {}, {
    d: common_vendor.o((...args) => $options.saveImage && $options.saveImage(...args)),
    e: $data.videoPath !== ""
  }, $data.videoPath !== "" ? {
    f: $data.videoPath,
    g: common_vendor.o((...args) => $options.videoErrorCallback && $options.videoErrorCallback(...args))
  } : {}, {
    h: common_vendor.o((...args) => $options.saveVideo && $options.saveVideo(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/save-media/save-media.vue"]]);
wx.createPage(MiniProgramPage);
