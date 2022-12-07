"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      radiusClass: "uni-radius-lg",
      formData: {
        direction: ["t", "b"],
        size: "lg"
      },
      directionData: [{
        value: "t",
        text: "\u5DE6\u4E0A+\u53F3\u4E0A"
      }, {
        value: "r",
        text: "\u53F3\u4E0A+\u53F3\u4E0B"
      }, {
        value: "b",
        text: "\u5DE6\u4E0B+\u53F3\u4E0B"
      }, {
        value: "l",
        text: "\u53F3\u4E0A+\u5DE6\u4E0B"
      }, {
        value: "tl",
        text: "\u5DE6\u4E0A"
      }, {
        value: "tr",
        text: "\u53F3\u4E0A"
      }, {
        value: "bl",
        text: "\u5DE6\u4E0B"
      }, {
        value: "br",
        text: "\u53F3\u4E0B"
      }],
      sizeData: [{
        value: "0",
        text: "\u65E0"
      }, {
        value: "sm",
        text: "\u5C0F"
      }, {
        value: "lg",
        text: "\u5E38\u89C4"
      }, {
        value: "xl",
        text: "\u5927"
      }, {
        value: "circle",
        text: "\u5706"
      }, {
        value: "pill",
        text: "\u6700\u5927\u5316"
      }]
    };
  },
  onLoad() {
  },
  methods: {
    change(e, type) {
      let {
        direction,
        size
      } = this.formData;
      this.radiusClass = "";
      direction.forEach((v) => {
        this.radiusClass += `uni-radius-${v}-${size} `;
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_data_checkbox2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_data_checkbox = () => "../../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_data_checkbox + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.n($data.radiusClass),
    c: common_vendor.o(($event) => $options.change($event, 1)),
    d: common_vendor.o(($event) => $data.formData.direction = $event),
    e: common_vendor.p({
      multiple: true,
      localdata: $data.directionData,
      modelValue: $data.formData.direction
    }),
    f: common_vendor.o(($event) => $options.change($event, 2)),
    g: common_vendor.o(($event) => $data.formData.size = $event),
    h: common_vendor.p({
      localdata: $data.sizeData,
      modelValue: $data.formData.size
    }),
    i: common_vendor.p({
      title: "\u6548\u679C\u5C55\u793A",
      type: "line"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/radius/radius.nvue"]]);
wx.createPage(MiniProgramPage);
