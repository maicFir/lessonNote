"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      status: "more",
      statusTypes: [{
        value: "more",
        text: "\u52A0\u8F7D\u524D",
        checked: true
      }, {
        value: "loading",
        text: "\u52A0\u8F7D\u4E2D",
        checked: false
      }, {
        value: "noMore",
        text: "\u6CA1\u6709\u66F4\u591A",
        checked: false
      }],
      contentText: {
        contentdown: "\u67E5\u770B\u66F4\u591A",
        contentrefresh: "\u52A0\u8F7D\u4E2D",
        contentnomore: "\u6CA1\u6709\u66F4\u591A"
      }
    };
  },
  methods: {
    onChange(e) {
      this.status = e.detail.value;
    },
    clickLoadMore(e) {
      common_vendor.index.showToast({
        icon: "none",
        title: "\u5F53\u524D\u72B6\u6001\uFF1A" + e.detail.status
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_load_more2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_load_more = () => "../../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_load_more + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true,
      ["is-shadow"]: false
    }),
    b: common_vendor.p({
      status: $data.status
    }),
    c: common_vendor.p({
      title: "\u57FA\u672C\u7528\u6CD5",
      type: "line"
    }),
    d: common_vendor.p({
      status: $data.status,
      ["content-text"]: $data.contentText
    }),
    e: common_vendor.p({
      title: "\u4FEE\u6539\u9ED8\u8BA4\u6587\u5B57",
      type: "line"
    }),
    f: common_vendor.p({
      color: "#007AFF",
      status: $data.status
    }),
    g: common_vendor.p({
      title: "\u6539\u53D8\u989C\u8272",
      type: "line"
    }),
    h: common_vendor.p({
      iconType: "auto",
      status: $data.status
    }),
    i: common_vendor.p({
      title: "\u6307\u5B9A\u52A0\u8F7D\u56FE\u6807\u6837\u5F0F - \u6309\u5E73\u53F0\u81EA\u52A8\u9009\u62E9\u6837\u5F0F",
      type: "line"
    }),
    j: common_vendor.p({
      iconType: "circle",
      status: $data.status
    }),
    k: common_vendor.p({
      title: "\u6307\u5B9A\u52A0\u8F7D\u56FE\u6807\u6837\u5F0F - \u73AF\u5F62",
      type: "line"
    }),
    l: common_vendor.f($data.statusTypes, (item, index, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: item.value,
        c: item.checked,
        d: index
      };
    }),
    m: common_vendor.o((...args) => $options.onChange && $options.onChange(...args)),
    n: common_vendor.p({
      title: "\u6539\u53D8\u7EC4\u4EF6\u72B6\u6001",
      type: "line"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/load-more/load-more.nvue"]]);
wx.createPage(MiniProgramPage);
