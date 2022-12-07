"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      items: ["\u9009\u9879\u53611", "\u9009\u9879\u53612", "\u9009\u9879\u53613"],
      styles: [
        {
          value: "button",
          text: "\u6309\u94AE",
          checked: true
        },
        {
          value: "text",
          text: "\u6587\u5B57"
        }
      ],
      colors: ["#007aff", "#4cd964", "#dd524d"],
      current: 0,
      colorIndex: 0,
      activeColor: "#007aff",
      styleType: "button"
    };
  },
  methods: {
    onClickItem(e) {
      if (this.current !== e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
    styleChange(e) {
      if (this.styleType !== e.detail.value) {
        this.styleType = e.detail.value;
      }
    },
    colorChange(e) {
      if (this.styleType !== e.detail.value) {
        console.log(e.detail.value);
        this.activeColor = e.detail.value;
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_segmented_control2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_segmented_control = () => "../../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_segmented_control + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      ["is-full"]: true
    }),
    b: common_vendor.o($options.onClickItem),
    c: common_vendor.p({
      current: $data.current,
      values: $data.items,
      ["style-type"]: $data.styleType,
      ["active-color"]: $data.activeColor
    }),
    d: $data.current === 0
  }, $data.current === 0 ? {} : {}, {
    e: $data.current === 1
  }, $data.current === 1 ? {} : {}, {
    f: $data.current === 2
  }, $data.current === 2 ? {} : {}, {
    g: common_vendor.p({
      title: "\u5B9E\u5FC3\u6807\u7B7E",
      type: "line"
    }),
    h: common_vendor.p({
      title: "Style",
      type: "line"
    }),
    i: common_vendor.f($data.styles, (item, index, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: item.value,
        c: item.checked,
        d: index
      };
    }),
    j: common_vendor.o((...args) => $options.styleChange && $options.styleChange(...args)),
    k: common_vendor.p({
      title: "Color",
      type: "line"
    }),
    l: common_vendor.f($data.colors, (item, index, i0) => {
      return {
        a: item,
        b: item,
        c: index === $data.colorIndex,
        d: index
      };
    }),
    m: common_vendor.o((...args) => $options.colorChange && $options.colorChange(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/segmented-control/segmented-control.vue"]]);
wx.createPage(MiniProgramPage);
