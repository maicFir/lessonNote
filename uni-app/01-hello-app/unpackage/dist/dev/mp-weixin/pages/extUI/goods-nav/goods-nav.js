"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      options: [{
        icon: "chat",
        text: "\u5BA2\u670D"
      }, {
        icon: "shop",
        text: "\u5E97\u94FA",
        info: 2,
        infoBackgroundColor: "#007aff",
        infoColor: "#f5f5f5"
      }, {
        icon: "cart",
        text: "\u8D2D\u7269\u8F66",
        info: 2
      }],
      buttonGroup: [
        {
          text: "\u52A0\u5165\u8D2D\u7269\u8F66",
          backgroundColor: "linear-gradient(90deg, #FFCD1E, #FF8A18)",
          color: "#fff"
        },
        {
          text: "\u7ACB\u5373\u8D2D\u4E70",
          backgroundColor: "linear-gradient(90deg, #FE6035, #EF1224)",
          color: "#fff"
        }
      ],
      customButtonGroup: [
        {
          text: "\u52A0\u5165\u8D2D\u7269\u8F66",
          backgroundColor: "linear-gradient(90deg, #1E83FF, #0053B8)",
          color: "#fff"
        },
        {
          text: "\u7ACB\u5373\u8D2D\u4E70",
          backgroundColor: "linear-gradient(90deg, #60F3FF, #088FEB)",
          color: "#fff"
        }
      ],
      customButtonGroup1: [{
        text: "\u7ACB\u5373\u8D2D\u4E70",
        backgroundColor: "linear-gradient(90deg, #FE6035, #EF1224)",
        color: "#fff"
      }]
    };
  },
  onLoad() {
  },
  methods: {
    onClick(e) {
      common_vendor.index.showToast({
        title: `\u70B9\u51FB${e.content.text}`,
        icon: "none"
      });
    },
    buttonClick(e) {
      console.log(e);
      this.options[2].info++;
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_goods_nav2 = common_vendor.resolveComponent("uni-goods-nav");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_goods_nav2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_goods_nav = () => "../../../uni_modules/uni-goods-nav/components/uni-goods-nav/uni-goods-nav.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_goods_nav + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true
    }),
    b: common_vendor.o($options.onClick),
    c: common_vendor.p({
      title: "\u57FA\u7840\u7528\u6CD5",
      type: "line"
    }),
    d: common_vendor.o($options.onClick),
    e: common_vendor.o($options.buttonClick),
    f: common_vendor.p({
      fill: true,
      options: $data.options,
      ["button-group"]: $data.customButtonGroup
    }),
    g: common_vendor.o($options.onClick),
    h: common_vendor.o($options.buttonClick),
    i: common_vendor.p({
      fill: true,
      options: $data.options,
      ["button-group"]: $data.customButtonGroup1
    }),
    j: common_vendor.p({
      title: "\u81EA\u5B9A\u4E49\u7528\u6CD5",
      type: "line"
    }),
    k: common_vendor.o($options.onClick),
    l: common_vendor.o($options.buttonClick),
    m: common_vendor.p({
      options: $data.options,
      fill: true,
      ["button-group"]: $data.buttonGroup
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/goods-nav/goods-nav.nvue"]]);
wx.createPage(MiniProgramPage);
