"use strict";
var common_vendor = require("../../../common/vendor.js");
var sourceType = [
  ["camera"],
  ["album"],
  ["camera", "album"]
];
const _sfc_main = {
  data() {
    return {
      title: "chooseVideo",
      sourceTypeIndex: 2,
      sourceType: ["\u62CD\u6444", "\u76F8\u518C", "\u62CD\u6444\u6216\u76F8\u518C"],
      src: "",
      cameraList: [
        {
          value: "back",
          name: "\u540E\u7F6E\u6444\u50CF\u5934",
          checked: "true"
        },
        {
          value: "front",
          name: "\u524D\u7F6E\u6444\u50CF\u5934"
        }
      ],
      cameraIndex: 0
    };
  },
  onUnload() {
    this.src = "", this.sourceTypeIndex = 2, this.sourceType = ["\u62CD\u6444", "\u76F8\u518C", "\u62CD\u6444\u6216\u76F8\u518C"];
  },
  methods: {
    radioChange(evt) {
      for (let i = 0; i < this.cameraList.length; i++) {
        if (this.cameraList[i].value === evt.detail.value) {
          this.cameraIndex = i;
          break;
        }
      }
    },
    sourceTypeChange: function(e) {
      this.sourceTypeIndex = parseInt(e.detail.value);
    },
    chooseVideo: function() {
      common_vendor.index.chooseVideo({
        camera: this.cameraList[this.cameraIndex].value,
        sourceType: sourceType[this.sourceTypeIndex],
        success: (res) => {
          this.src = res.tempFilePath;
        },
        fail: (err) => {
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
                  content: "Hello uni-app\u9700\u8981\u4ECE\u60A8\u7684\u76F8\u673A\u6216\u76F8\u518C\u83B7\u53D6\u89C6\u9891\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u754C\u9762\u6253\u5F00\u76F8\u5173\u6743\u9650",
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
    b: common_vendor.t($data.sourceType[$data.sourceTypeIndex]),
    c: $data.sourceType,
    d: common_vendor.o((...args) => $options.sourceTypeChange && $options.sourceTypeChange(...args)),
    e: $data.sourceTypeIndex,
    f: common_vendor.f($data.cameraList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: item.value,
        c: index === $data.cameraIndex,
        d: item.value
      };
    }),
    g: common_vendor.o((...args) => $options.radioChange && $options.radioChange(...args)),
    h: !$data.src
  }, !$data.src ? {
    i: common_vendor.o((...args) => $options.chooseVideo && $options.chooseVideo(...args))
  } : {
    j: $data.src
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/video/video.vue"]]);
wx.createPage(MiniProgramPage);
