"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      classes: "1-2",
      dataTree: [
        {
          text: "\u4E00\u5E74\u7EA7",
          value: "1-0",
          children: [
            {
              text: "1.1\u73ED",
              value: "1-1"
            },
            {
              text: "1.2\u73ED",
              value: "1-2"
            }
          ]
        },
        {
          text: "\u4E8C\u5E74\u7EA7",
          value: "2-0",
          children: [
            {
              text: "2.1\u73ED",
              value: "2-1"
            },
            {
              text: "2.2\u73ED",
              value: "2-2"
            }
          ]
        },
        {
          text: "\u4E09\u5E74\u7EA7",
          value: "3-0",
          disable: true
        }
      ]
    };
  },
  methods: {
    onnodeclick(e) {
      console.log(e);
    },
    onpopupopened(e) {
      console.log("popupopened");
    },
    onpopupclosed(e) {
      console.log("popupclosed");
    },
    onchange(e) {
      console.log("---------onchange:", e);
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_data_picker2 = common_vendor.resolveComponent("uni-data-picker");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_data_picker2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_data_picker = () => "../../../uni_modules/uni-data-picker/components/uni-data-picker/uni-data-picker.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_data_picker + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true,
      ["is-shadow"]: false
    }),
    b: common_vendor.o($options.onchange),
    c: common_vendor.o($options.onnodeclick),
    d: common_vendor.o($options.onpopupopened),
    e: common_vendor.o($options.onpopupclosed),
    f: common_vendor.o(($event) => $data.classes = $event),
    g: common_vendor.p({
      placeholder: "\u8BF7\u9009\u62E9\u73ED\u7EA7",
      ["popup-title"]: "\u8BF7\u9009\u62E9\u6240\u5728\u5730\u533A",
      localdata: $data.dataTree,
      modelValue: $data.classes
    }),
    h: common_vendor.p({
      title: "\u672C\u5730\u6570\u636E",
      type: "line",
      padding: true
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/data-picker/data-picker.nvue"]]);
wx.createPage(MiniProgramPage);
