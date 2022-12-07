"use strict";
var common_vendor = require("../../../common/vendor.js");
var common_permission = require("../../../common/permission.js");
var sourceType = [
  ["camera"],
  ["album"],
  ["camera", "album"]
];
var sizeType = [
  ["compressed"],
  ["original"],
  ["compressed", "original"]
];
const _sfc_main = {
  data() {
    return {
      title: "choose/previewImage",
      imageList: [],
      sourceTypeIndex: 2,
      sourceType: ["\u62CD\u7167", "\u76F8\u518C", "\u62CD\u7167\u6216\u76F8\u518C"],
      sizeTypeIndex: 2,
      sizeType: ["\u538B\u7F29", "\u539F\u56FE", "\u538B\u7F29\u6216\u539F\u56FE"],
      countIndex: 8,
      count: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  },
  onUnload() {
    this.imageList = [], this.sourceTypeIndex = 2, this.sourceType = ["\u62CD\u7167", "\u76F8\u518C", "\u62CD\u7167\u6216\u76F8\u518C"], this.sizeTypeIndex = 2, this.sizeType = ["\u538B\u7F29", "\u539F\u56FE", "\u538B\u7F29\u6216\u539F\u56FE"], this.countIndex = 8;
  },
  methods: {
    sourceTypeChange: function(e) {
      this.sourceTypeIndex = parseInt(e.detail.value);
    },
    sizeTypeChange: function(e) {
      this.sizeTypeIndex = parseInt(e.detail.value);
    },
    countChange: function(e) {
      this.countIndex = e.detail.value;
    },
    chooseImage: async function() {
      if (this.imageList.length === 9) {
        let isContinue = await this.isFullImg();
        console.log("\u662F\u5426\u7EE7\u7EED?", isContinue);
        if (!isContinue) {
          return;
        }
      }
      common_vendor.index.chooseImage({
        sourceType: sourceType[this.sourceTypeIndex],
        sizeType: sizeType[this.sizeTypeIndex],
        count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
        success: (res) => {
          this.imageList = this.imageList.concat(res.tempFilePaths);
        },
        fail: (err) => {
          console.log("err: ", err);
          if (err.errMsg.indexOf("cancel") !== "-1") {
            return;
          }
          common_vendor.index.getSetting({
            success: (res) => {
              let authStatus = false;
              switch (this.sourceTypeIndex) {
                case 0:
                  authStatus = res.authSetting["scope.camera"];
                  break;
                case 1:
                  authStatus = res.authSetting["scope.album"];
                  break;
                case 2:
                  authStatus = res.authSetting["scope.album"] && res.authSetting["scope.camera"];
                  break;
              }
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
    isFullImg: function() {
      return new Promise((res) => {
        common_vendor.index.showModal({
          content: "\u5DF2\u7ECF\u67099\u5F20\u56FE\u7247\u4E86,\u662F\u5426\u6E05\u7A7A\u73B0\u6709\u56FE\u7247\uFF1F",
          success: (e) => {
            if (e.confirm) {
              this.imageList = [];
              res(true);
            } else {
              res(false);
            }
          },
          fail: () => {
            res(false);
          }
        });
      });
    },
    previewImage: function(e) {
      var current = e.target.dataset.src;
      common_vendor.index.previewImage({
        current,
        urls: this.imageList
      });
    },
    async checkPermission(code) {
      let type = code ? code - 1 : this.sourceTypeIndex;
      let status = common_permission.permission.isIOS ? await common_permission.permission.requestIOS(sourceType[type][0]) : await common_permission.permission.requestAndroid(type === 0 ? "android.permission.CAMERA" : "android.permission.READ_EXTERNAL_STORAGE");
      if (status === null || status === 1) {
        status = 1;
      } else {
        common_vendor.index.showModal({
          content: "\u6CA1\u6709\u5F00\u542F\u6743\u9650",
          confirmText: "\u8BBE\u7F6E",
          success: function(res) {
            if (res.confirm) {
              common_permission.permission.gotoAppSetting();
            }
          }
        });
      }
      return status;
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
    b: common_vendor.t($data.sourceType[$data.sourceTypeIndex]),
    c: $data.sourceType,
    d: common_vendor.o((...args) => $options.sourceTypeChange && $options.sourceTypeChange(...args)),
    e: $data.sourceTypeIndex,
    f: common_vendor.t($data.sizeType[$data.sizeTypeIndex]),
    g: $data.sizeType,
    h: common_vendor.o((...args) => $options.sizeTypeChange && $options.sizeTypeChange(...args)),
    i: $data.sizeTypeIndex,
    j: common_vendor.t($data.count[$data.countIndex]),
    k: $data.count,
    l: common_vendor.o((...args) => $options.countChange && $options.countChange(...args)),
    m: common_vendor.t($data.imageList.length),
    n: common_vendor.f($data.imageList, (image, index, i0) => {
      return {
        a: image,
        b: image,
        c: index
      };
    }),
    o: common_vendor.o((...args) => $options.previewImage && $options.previewImage(...args)),
    p: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/image/image.vue"]]);
wx.createPage(MiniProgramPage);
