"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {};
  },
  created() {
  },
  methods: {
    getMore() {
      common_vendor.index.showToast({
        title: "\u70B9\u51FB\u67E5\u770B\u66F4\u591A",
        icon: "none"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_notice_bar2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_notice_bar = () => "../../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_notice_bar + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true,
      ["is-shadow"]: false
    }),
    b: common_vendor.p({
      text: "uni-app \u7248\u6B63\u5F0F\u53D1\u5E03\uFF0C\u5F00\u53D1\u4E00\u6B21\uFF0C\u540C\u65F6\u53D1\u5E03iOS\u3001Android\u3001H5\u3001\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u3001\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u3001\u767E\u5EA6\u5C0F\u7A0B\u5E8F\u3001\u5934\u6761\u5C0F\u7A0B\u5E8F\u7B497\u5927\u5E73\u53F0\u3002"
    }),
    c: common_vendor.p({
      title: "\u591A\u884C\u663E\u793A",
      type: "line"
    }),
    d: common_vendor.p({
      single: true,
      text: "uni-app \u7248\u6B63\u5F0F\u53D1\u5E03\uFF0C\u5F00\u53D1\u4E00\u6B21\uFF0C\u540C\u65F6\u53D1\u5E03iOS\u3001Android\u3001H5\u3001\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u3001\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u3001\u767E\u5EA6\u5C0F\u7A0B\u5E8F\u3001\u5934\u6761\u5C0F\u7A0B\u5E8F\u7B497\u5927\u5E73\u53F0\u3002"
    }),
    e: common_vendor.p({
      title: "\u5355\u884C\u663E\u793A",
      subTitle: "\u4F7F\u7528 single \u5C5E\u6027\u5355\u884C\u663E\u793A\u901A\u77E5",
      type: "line"
    }),
    f: common_vendor.p({
      ["show-icon"]: true,
      text: "uni-app\u53D1\u5E03\uFF0C\u5F00\u53D1\u4E00\u6B21\u30017\u7AEF\u8986\u76D6\uFF01"
    }),
    g: common_vendor.p({
      title: "\u663E\u793A\u56FE\u6807",
      subTitle: "\u4F7F\u7528 show-icon \u5C5E\u6027\u663E\u793A\u5DE6\u4FA7\u5C0F\u5587\u53ED\u56FE\u6807",
      type: "line"
    }),
    h: common_vendor.p({
      ["show-icon"]: true,
      scrollable: true,
      text: "uni-app \u7248\u6B63\u5F0F\u53D1\u5E03\uFF0C\u5F00\u53D1\u4E00\u6B21\uFF0C\u540C\u65F6\u53D1\u5E03iOS\u3001Android\u3001H5\u3001\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u3001\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u3001\u767E\u5EA6\u5C0F\u7A0B\u5E8F\u3001\u5934\u6761\u5C0F\u7A0B\u5E8F\u7B497\u5927\u5E73\u53F0\u3002"
    }),
    i: common_vendor.p({
      title: "\u6587\u5B57\u6EDA\u52A8",
      subTitle: "\u4F7F\u7528 scrollable \u5C5E\u6027\u4F7F\u901A\u544A\u6EDA\u52A8,\u6B64\u65F6 single \u5C5E\u6027\u5C06\u5931\u6548,\u59CB\u7EC8\u5355\u884C\u663E\u793A",
      type: "line"
    }),
    j: common_vendor.o($options.getMore),
    k: common_vendor.p({
      ["show-get-more"]: true,
      ["show-icon"]: true,
      text: "\u5E74\u672B\u5927\u793C\uFF1Auni-app1.4 \u65B0\u589E\u767E\u5EA6\u3001\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u3002\u63D2\u4EF6\u5E02\u573A\u91CD\u78C5\u4E0A\u7EBF\uFF01"
    }),
    l: common_vendor.o($options.getMore),
    m: common_vendor.p({
      ["show-get-more"]: true,
      ["show-icon"]: true,
      ["more-text"]: "\u67E5\u770B\u66F4\u591A",
      text: "\u5E74\u672B\u5927\u793C\uFF1Auni-app1.4 \u65B0\u589E\u767E\u5EA6\u3001\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u3002\u63D2\u4EF6\u5E02\u573A\u91CD\u78C5\u4E0A\u7EBF\uFF01"
    }),
    n: common_vendor.p({
      title: "\u67E5\u770B\u66F4\u591A",
      subTitle: "\u4F7F\u7528 show-get-more \u663E\u793A\u66F4\u591A,\u6B64\u65F6 single \u5C5E\u6027\u5C06\u5931\u6548,\u59CB\u7EC8\u5355\u884C\u663E\u793A,\u5982\u4E0D\u914D\u7F6E more-text \u5C5E\u6027 ,\u5C06\u663E\u793A\u7BAD\u5934\u56FE\u6807",
      type: "line"
    }),
    o: common_vendor.p({
      single: true,
      color: "#2979FF",
      ["background-color"]: "#EAF2FF",
      text: "uni-app 1.6\u7248\u6B63\u5F0F\u53D1\u5E03\uFF0C\u5F00\u53D1\u4E00\u6B21\uFF0C\u540C\u65F6\u53D1\u5E03iOS\u3001Android\u3001H5\u3001\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u3001\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u3001\u767E\u5EA6\u5C0F\u7A0B\u5E8F\u3001\u5934\u6761\u5C0F\u7A0B\u5E8F\u7B497\u5927\u5E73\u53F0\u3002"
    }),
    p: common_vendor.p({
      title: "\u4FEE\u6539\u989C\u8272",
      type: "line"
    }),
    q: common_vendor.p({
      ["show-close"]: true,
      single: true,
      text: "HBuilderX 1.0\u6B63\u5F0F\u53D1\u5E03\uFF01uni-app\u5B9E\u73B0\u91CC\u7A0B\u7891\u7A81\u7834\u5B9E\u73B0\u91CC\u7A0B\u7891\u7A81\u7834\uFF01"
    }),
    r: common_vendor.p({
      title: "\u5173\u95ED\u6309\u94AE",
      subTitle: "\u4F7F\u7528 show-close \u5C5E\u6027,\u53EF\u5173\u95ED\u901A\u77E5",
      type: "line"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/notice-bar/notice-bar.vue"]]);
wx.createPage(MiniProgramPage);
