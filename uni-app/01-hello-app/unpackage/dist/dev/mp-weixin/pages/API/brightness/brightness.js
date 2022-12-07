"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "brightness",
      screen: 0,
      keepScreenOn: true
    };
  },
  onLoad() {
    common_vendor.index.getScreenBrightness({
      success: (res) => {
        this.screen = (res.value * 100).toFixed();
      },
      fail(e) {
        console.log(e);
      }
    });
  },
  methods: {
    sliderChange(e) {
      let screen = e.detail.value;
      if (this.screen !== screen) {
        console.log("\u5F53\u524D\u6570\u503C\uFF1A" + e.detail.value);
        common_vendor.index.setScreenBrightness({
          value: screen / 100,
          success: function() {
          },
          fail(e2) {
            console.log(e2);
          }
        });
        this.screen = screen;
      }
    },
    keep() {
      common_vendor.index.setKeepScreenOn({
        keepScreenOn: this.keepScreenOn
      });
      this.keepScreenOn = !this.keepScreenOn;
    }
  }
};
if (!Array) {
  const _easycom_page_head2 = common_vendor.resolveComponent("page-head");
  _easycom_page_head2();
}
const _easycom_page_head = () => "../../../components/page-head/page-head.js";
if (!Math) {
  _easycom_page_head();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: $data.title
    }),
    b: common_vendor.t($data.screen),
    c: $data.screen,
    d: common_vendor.o((...args) => $options.sliderChange && $options.sliderChange(...args)),
    e: common_vendor.t($data.keepScreenOn ? "\u4FDD\u6301\u5E38\u4EAE\u72B6\u6001" : "\u5173\u95ED\u5E38\u4EAE\u72B6\u6001"),
    f: common_vendor.o((...args) => $options.keep && $options.keep(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/brightness/brightness.vue"]]);
wx.createPage(MiniProgramPage);
