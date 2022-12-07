"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      imageStyles: {
        width: 64,
        height: 64,
        border: {
          radius: "50%"
        }
      },
      listStyles: {
        border: true,
        dividline: true,
        borderStyle: {
          width: 1,
          color: "blue",
          style: "dashed",
          radius: 2
        }
      },
      fileLists: [{
        url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b7c7f970-517d-11eb-97b7-0dc4655d6e68.jpg",
        extname: "png",
        name: "shuijiao.png"
      }, {
        url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b7c7f970-517d-11eb-97b7-0dc4655d6e68.jpg",
        extname: "png",
        name: "uniapp-logo.png"
      }, {
        url: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b7c7f970-517d-11eb-97b7-0dc4655d6e68.jpg",
        extname: "png",
        name: "shuijiao.png"
      }]
    };
  },
  methods: {}
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_file_picker2 = common_vendor.resolveComponent("uni-file-picker");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_file_picker2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_file_picker = () => "../../../uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_file_picker + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.p({
      limit: "9",
      title: "\u6700\u591A\u9009\u62E99\u5F20\u56FE\u7247"
    }),
    c: common_vendor.p({
      title: "\u53EA\u9009\u62E9\u56FE\u7247",
      type: "line"
    }),
    d: common_vendor.p({
      limit: "9",
      ["file-mediatype"]: "video",
      title: "\u6700\u591A\u9009\u62E99\u4E2A\u89C6\u9891"
    }),
    e: common_vendor.p({
      title: "\u53EA\u9009\u62E9\u89C6\u9891",
      type: "line"
    }),
    f: common_vendor.p({
      limit: "5",
      ["file-mediatype"]: "all",
      title: "\u6700\u591A\u9009\u62E95\u4E2A\u6587\u4EF6"
    }),
    g: common_vendor.p({
      title: "\u9009\u62E9\u4EFB\u610F\u6587\u4EF6",
      type: "line"
    }),
    h: common_vendor.p({
      limit: "1",
      ["del-icon"]: false,
      ["disable-preview"]: true,
      imageStyles: $data.imageStyles,
      ["file-mediatype"]: "image"
    }),
    i: common_vendor.p({
      title: "\u81EA\u5B9A\u4E49\u56FE\u7247\u5927\u5C0F",
      type: "line"
    }),
    j: common_vendor.p({
      readonly: true,
      value: $data.fileLists,
      imageStyles: $data.imageStyles,
      ["file-mediatype"]: "image"
    }),
    k: common_vendor.p({
      readonly: true,
      value: $data.fileLists,
      listStyles: $data.listStyles,
      ["file-mediatype"]: "all"
    }),
    l: common_vendor.p({
      title: "\u81EA\u5B9A\u4E49\u56FE\u7247\u5927\u5C0F",
      type: "line"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/file-picker/file-picker.vue"]]);
wx.createPage(MiniProgramPage);
