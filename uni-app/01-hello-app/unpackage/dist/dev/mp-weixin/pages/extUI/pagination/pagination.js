"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      current: 3,
      total: 10,
      pageSize: 10
    };
  },
  mounted() {
    setTimeout(() => {
      this.current = 5;
    }, 3e3);
  },
  methods: {
    add() {
      this.total += 10;
    },
    reset() {
      this.total = 0;
      this.current = 1;
    },
    change(e) {
      console.log(e);
      this.current = e.current;
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_pagination2 = common_vendor.resolveComponent("uni-pagination");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_pagination2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_pagination = () => "../../../uni_modules/uni-pagination/components/uni-pagination/uni-pagination.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_pagination + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true,
      ["is-shadow"]: false
    }),
    b: common_vendor.p({
      total: 50,
      title: "\u6807\u9898\u6587\u5B57"
    }),
    c: common_vendor.p({
      title: "\u9ED8\u8BA4\u6837\u5F0F",
      type: "line",
      padding: true
    }),
    d: common_vendor.p({
      total: 50,
      title: "\u6807\u9898\u6587\u5B57",
      ["prev-text"]: "\u524D\u4E00\u9875",
      ["next-text"]: "\u540E\u4E00\u9875"
    }),
    e: common_vendor.p({
      title: "\u4FEE\u6539\u6309\u94AE\u6587\u5B57",
      subTitle: "\u4F7F\u7528 prev-text / next-text \u5C5E\u6027\u4FEE\u6539\u6309\u94AE\u6587\u5B57",
      type: "line",
      padding: true
    }),
    f: common_vendor.p({
      ["show-icon"]: true,
      total: 50,
      title: "\u6807\u9898\u6587\u5B57"
    }),
    g: common_vendor.p({
      title: "\u56FE\u6807\u6837\u5F0F",
      subTitle: "\u4F7F\u7528 show-icon \u5C5E\u6027\u663E\u793A\u56FE\u6807\u6309\u94AE",
      type: "line",
      padding: true
    }),
    h: common_vendor.o($options.change),
    i: common_vendor.p({
      current: $data.current,
      total: $data.total,
      pageSize: 20,
      title: "\u6807\u9898\u6587\u5B57",
      ["show-icon"]: true
    }),
    j: common_vendor.t($data.current),
    k: common_vendor.t($data.total),
    l: common_vendor.t($data.pageSize),
    m: common_vendor.o((...args) => $options.add && $options.add(...args)),
    n: common_vendor.o((...args) => $options.reset && $options.reset(...args)),
    o: common_vendor.p({
      title: "\u4FEE\u6539\u6570\u636E\u957F\u5EA6",
      type: "line",
      padding: true
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/pagination/pagination.vue"]]);
wx.createPage(MiniProgramPage);
