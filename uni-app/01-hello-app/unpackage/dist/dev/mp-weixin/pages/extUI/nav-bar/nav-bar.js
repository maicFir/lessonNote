"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      city: "\u5317\u4EAC"
    };
  },
  methods: {
    back() {
      common_vendor.index.navigateBack({
        delta: 1
      });
    },
    showMenu() {
      common_vendor.index.showToast({
        title: "\u83DC\u5355"
      });
    },
    clickLeft() {
      common_vendor.index.showToast({
        title: "\u5DE6\u4FA7\u6309\u94AE"
      });
    },
    search() {
      common_vendor.index.showToast({
        title: "\u641C\u7D22"
      });
    },
    showCity() {
      common_vendor.index.showToast({
        title: "\u9009\u62E9\u57CE\u5E02"
      });
    },
    scan() {
      common_vendor.index.showToast({
        title: "\u626B\u7801"
      });
    },
    confirm() {
      common_vendor.index.showToast({
        title: "\u641C\u7D22"
      });
    }
  },
  onPullDownRefresh() {
    console.log("onPullDownRefresh");
    setTimeout(function() {
      common_vendor.index.stopPullDownRefresh();
      console.log("stopPullDownRefresh");
    }, 1e3);
  }
};
if (!Array) {
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_nav_bar2 + _easycom_uni_card2 + _easycom_uni_section2 + _easycom_uni_icons2)();
}
const _easycom_uni_nav_bar = () => "../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_nav_bar + _easycom_uni_card + _easycom_uni_section + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.back),
    b: common_vendor.p({
      dark: true,
      fixed: true,
      shadow: true,
      ["background-color"]: "#007AFF",
      ["status-bar"]: true,
      ["left-icon"]: "left",
      ["left-text"]: "\u8FD4\u56DE",
      title: "\u81EA\u5B9A\u4E49\u5BFC\u822A\u680F"
    }),
    c: common_vendor.p({
      ["is-full"]: true,
      isShadow: false
    }),
    d: common_vendor.p({
      title: "\u6807\u9898"
    }),
    e: common_vendor.p({
      title: "\u57FA\u672C\u7528\u6CD5",
      subTitle: "\u4F7F\u7528 title \u5C5E\u6027\u8BBE\u7F6E\u5BFC\u822A\u680F\u6807\u9898",
      type: "line"
    }),
    f: common_vendor.o($options.back),
    g: common_vendor.p({
      shadow: true,
      ["left-icon"]: "left",
      title: "\u5F00\u542F\u9634\u5F71"
    }),
    h: common_vendor.p({
      title: "\u5F00\u542F\u9634\u5F71",
      subTitle: "\u4F7F\u7528 shadow \u5C5E\u6027\u542F\u7528\u9634\u5F71",
      type: "line"
    }),
    i: common_vendor.o($options.back),
    j: common_vendor.p({
      shadow: true,
      ["left-icon"]: "left",
      dark: true,
      title: "\u6697\u9ED1\u6A21\u5F0F"
    }),
    k: common_vendor.p({
      title: "\u5F00\u542F\u6697\u9ED1\u6A21\u5F0F",
      subTitle: "\u4F7F\u7528 dark \u5C5E\u6027\u8BBE\u7F6E\u6697\u9ED1\u6A21\u5F0F",
      type: "line"
    }),
    l: common_vendor.p({
      shadow: true,
      ["left-icon"]: "left",
      ["right-icon"]: "cart",
      title: "\u6807\u9898"
    }),
    m: common_vendor.p({
      title: "\u5E26\u8FD4\u56DE\u7BAD\u5934+\u53F3\u4FA7\u56FE\u6807",
      subTitle: "\u4F7F\u7528 left-icon/right-icon \u8BBE\u7F6E\u5DE6\u53F3\u56FE\u6807",
      type: "line"
    }),
    n: common_vendor.p({
      shadow: true,
      ["left-icon"]: "left",
      leftText: "\u8FD4\u56DE",
      rightText: "\u8BBE\u7F6E",
      title: "\u6807\u9898"
    }),
    o: common_vendor.p({
      title: "\u5DE6\u4FA7\u6587\u5B57+\u53F3\u4FA7\u6587\u5B57",
      subTitle: "\u4F7F\u7528 left-text/right-text \u8BBE\u7F6E\u5DE6\u53F3\u6587\u5B57",
      type: "line"
    }),
    p: common_vendor.p({
      dark: true,
      color: "#999",
      backgroundColor: "#f5f5f5",
      shadow: true,
      ["left-icon"]: "left",
      leftText: "\u8FD4\u56DE",
      rightText: "\u8BBE\u7F6E",
      title: "\u81EA\u5B9A\u4E49\u989C\u8272"
    }),
    q: common_vendor.p({
      title: "\u81EA\u5B9A\u4E49\u989C\u8272",
      subTitle: "\u4F7F\u7528 color/background-color \u5C5E\u6027\u8BBE\u7F6E\u524D\u666F\u80CC\u666F\u8272",
      type: "line"
    }),
    r: common_vendor.p({
      height: "65px",
      dark: true,
      shadow: true,
      ["left-icon"]: "left",
      leftText: "\u8FD4\u56DE",
      rightText: "\u8BBE\u7F6E",
      title: "\u81EA\u5B9A\u4E49\u9AD8\u5EA6"
    }),
    s: common_vendor.p({
      title: "\u81EA\u5B9A\u4E49\u9AD8\u5EA6",
      subTitle: "\u4F7F\u7528 height \u4FEE\u6539\u7EC4\u4EF6\u9AD8\u5EA6",
      type: "line"
    }),
    t: common_vendor.t($data.city),
    v: common_vendor.p({
      type: "arrowdown",
      color: "#666",
      size: "18"
    }),
    w: common_vendor.p({
      type: "search",
      size: "18",
      color: "#999"
    }),
    x: common_vendor.o((...args) => $options.confirm && $options.confirm(...args)),
    y: common_vendor.p({
      title: "\u81EA\u5B9A\u4E49\u5185\u5BB9",
      subTitle: "\u4F7F\u7528 left/right/default \u63D2\u69FD\u81EA\u5B9A\u4E49\u5185\u5BB9",
      type: "line"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/nav-bar/nav-bar.nvue"]]);
wx.createPage(MiniProgramPage);
