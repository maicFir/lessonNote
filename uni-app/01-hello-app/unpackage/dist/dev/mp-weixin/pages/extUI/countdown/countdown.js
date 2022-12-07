"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      testHour: 1,
      testMinute: 0,
      testSecond: 0,
      start: false,
      timeupSecond: 10
    };
  },
  mounted() {
    setTimeout(() => {
      this.testHour = 1;
      this.testMinute = 1;
      this.testSecond = 0;
      this.start = true;
    }, 3e3);
    setTimeout(() => {
      this.start = false;
    }, 1e4);
  },
  methods: {
    timeup() {
      common_vendor.index.showToast({
        title: "\u65F6\u95F4\u5230"
      });
      this.timeupSecond = 29;
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_countdown2 = common_vendor.resolveComponent("uni-countdown");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_countdown2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_countdown = () => "../../../uni_modules/uni-countdown/components/uni-countdown/uni-countdown.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_countdown + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true
    }),
    b: common_vendor.p({
      day: 1,
      hour: 1,
      minute: 12,
      second: 40
    }),
    c: common_vendor.p({
      title: "\u4E00\u822C\u7528\u6CD5",
      type: "line",
      padding: true
    }),
    d: common_vendor.p({
      ["show-day"]: false,
      hour: 12,
      minute: 12,
      second: 12
    }),
    e: common_vendor.p({
      title: "\u4E0D\u663E\u793A\u5929\u6570",
      subTitle: "\u8BBE\u7F6E show-day = false \u4E0D\u663E\u793A\u5929",
      type: "line",
      padding: true
    }),
    f: common_vendor.p({
      minute: 30,
      second: 0,
      ["show-colon"]: false
    }),
    g: common_vendor.p({
      title: "\u6587\u5B57\u5206\u9694\u7B26",
      subTitle: "\u8BBE\u7F6E show-colon \u5C5E\u6027\u8BBE\u7F6E\u5206\u9694\u7B26\u6837\u5F0F",
      type: "line",
      padding: true
    }),
    h: common_vendor.p({
      day: 1,
      hour: 2,
      minute: 30,
      second: 0,
      color: "#FFFFFF",
      ["background-color"]: "#007AFF"
    }),
    i: common_vendor.p({
      title: "\u4FEE\u6539\u989C\u8272",
      subTitle: "\u8BBE\u7F6E color \\ background \u5C5E\u6027\u8BBE\u7F6E\u7EC4\u4EF6\u989C\u8272",
      type: "line",
      padding: true
    }),
    j: common_vendor.p({
      ["font-size"]: 30,
      day: 1,
      hour: 2,
      minute: 30,
      second: 0
    }),
    k: common_vendor.p({
      title: "\u4FEE\u6539\u5B57\u4F53\u5927\u5C0F",
      subTitle: "\u8BBE\u7F6E font-size \u5C5E\u6027\u8BBE\u7F6E\u7EC4\u4EF6\u5927\u5C0F",
      type: "line",
      padding: true
    }),
    l: common_vendor.p({
      ["font-size"]: 30,
      day: 1,
      hour: 2,
      minute: 30,
      second: 0,
      color: "#FFFFFF",
      ["background-color"]: "#007AFF"
    }),
    m: common_vendor.p({
      title: "\u4FEE\u6539\u989C\u8272 + \u5B57\u4F53\u5927\u5C0F",
      type: "line",
      padding: true
    }),
    n: common_vendor.p({
      start: $data.start,
      day: 1,
      hour: 1,
      minute: 12,
      second: 40
    }),
    o: common_vendor.p({
      title: "\u81EA\u7531\u63A7\u5236\u5F00\u59CB/\u6682\u505C",
      subTitle: "\u8BBE\u7F6E start \u5C5E\u6027\u63A7\u5236\u662F\u5426\u81EA\u52A8\u5F00\u542F",
      type: "line",
      padding: true
    }),
    p: common_vendor.o($options.timeup),
    q: common_vendor.p({
      ["show-day"]: false,
      second: $data.timeupSecond
    }),
    r: common_vendor.p({
      title: "\u5012\u8BA1\u65F6\u56DE\u8C03\u4E8B\u4EF6",
      type: "line",
      padding: true
    }),
    s: common_vendor.p({
      ["show-day"]: false,
      hour: $data.testHour,
      minute: $data.testMinute,
      second: $data.testSecond
    }),
    t: common_vendor.p({
      title: "\u52A8\u6001\u8D4B\u503C",
      type: "line",
      padding: true
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/countdown/countdown.nvue"]]);
wx.createPage(MiniProgramPage);
