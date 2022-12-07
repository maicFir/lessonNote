"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "saveFile",
      tempFilePath: "",
      savedFilePath: ""
    };
  },
  onLoad() {
    this.savedFilePath = common_vendor.index.getStorageSync("savedFilePath");
  },
  methods: {
    chooseImage() {
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          this.tempFilePath = res.tempFilePaths[0];
        },
        fail: (err) => {
          common_vendor.index.getSetting({
            success: (res) => {
              let authStatus = res.authSetting["scope.album"] && res.authSetting["scope.camera"];
              if (!authStatus) {
                common_vendor.index.showModal({
                  title: "\u6388\u6743\u5931\u8D25",
                  content: "Hello uni-app\u9700\u8981\u4ECE\u60A8\u7684\u76F8\u673A\u6216\u76F8\u518C\u83B7\u53D6\u56FE\u7247\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u754C\u9762\u6253\u5F00\u76F8\u5173\u6743\u9650",
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
    saveFile() {
      if (this.tempFilePath.length > 0) {
        common_vendor.index.saveFile({
          tempFilePath: this.tempFilePath,
          success: (res) => {
            this.savedFilePath = res.savedFilePath;
            common_vendor.index.setStorageSync("savedFilePath", res.savedFilePath);
            common_vendor.index.showModal({
              title: "\u4FDD\u5B58\u6210\u529F",
              content: "\u4E0B\u6B21\u8FDB\u5165\u9875\u9762\u65F6\uFF0C\u6B64\u6587\u4EF6\u4ECD\u53EF\u7528",
              showCancel: false
            });
          },
          fail: (res) => {
            common_vendor.index.showModal({
              title: "\u4FDD\u5B58\u5931\u8D25",
              content: "\u5931\u8D25\u539F\u56E0: " + JSON.stringify(res),
              showCancel: false
            });
          }
        });
      } else {
        common_vendor.index.showModal({
          content: "\u8BF7\u9009\u62E9\u6587\u4EF6",
          showCancel: false
        });
      }
    },
    clear() {
      common_vendor.index.setStorageSync("savedFilePath", "");
      this.tempFilePath = "";
      this.savedFilePath = "";
    },
    openDocument() {
      common_vendor.index.downloadFile({
        url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b3f1d0b0-5168-11eb-bd01-97bc1429a9ff.pdf",
        success: (res) => {
          common_vendor.index.openDocument({
            filePath: res.tempFilePath,
            success: () => {
              console.log("\u6253\u5F00\u6587\u6863\u6210\u529F");
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
    b: $data.tempFilePath
  }, $data.tempFilePath ? {
    c: $data.tempFilePath
  } : {}, {
    d: !$data.tempFilePath && $data.savedFilePath
  }, !$data.tempFilePath && $data.savedFilePath ? {
    e: $data.savedFilePath
  } : {}, {
    f: !$data.tempFilePath && !$data.savedFilePath
  }, !$data.tempFilePath && !$data.savedFilePath ? {
    g: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args))
  } : {}, {
    h: common_vendor.o((...args) => $options.saveFile && $options.saveFile(...args)),
    i: common_vendor.o((...args) => $options.clear && $options.clear(...args)),
    j: common_vendor.o((...args) => $options.openDocument && $options.openDocument(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/file/file.vue"]]);
wx.createPage(MiniProgramPage);
