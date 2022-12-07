"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var common_vendor = require("../../../common/vendor.js");
const preloadPageUrl = "/pages/extUI/calendar/calendar";
const _sfc_main = {
  data() {
    return {
      title: "navigate"
    };
  },
  computed: __spreadValues({}, common_vendor.mapState({
    hasLeftWin: (state) => !state.noMatchLeftWindow
  })),
  methods: {
    navigateTo() {
      common_vendor.index.navigateTo({
        url: "new-page/new-vue-page-1?data=Hello"
      });
    },
    navigateBack() {
      common_vendor.index.navigateBack();
    },
    redirectTo() {
      common_vendor.index.redirectTo({
        url: "new-page/new-vue-page-1"
      });
    },
    switchTab() {
      common_vendor.index.switchTab({
        url: "/pages/tabBar/template/template"
      });
    },
    reLaunch() {
      if (this.hasLeftWin) {
        common_vendor.index.reLaunch({
          url: "/pages/component/view/view"
        });
        return;
      }
      common_vendor.index.reLaunch({
        url: "/pages/tabBar/component/component"
      });
    },
    customAnimation() {
      common_vendor.index.navigateTo({
        url: "new-page/new-vue-page-1?data=\u4F7F\u7528\u81EA\u5B9A\u4E49\u52A8\u753B\u6253\u5F00\u9875\u9762",
        animationType: "slide-in-bottom",
        animationDuration: 200
      });
    },
    preloadPage() {
      common_vendor.index.preloadPage({
        url: preloadPageUrl,
        success() {
          common_vendor.index.showToast({
            title: "\u9875\u9762\u9884\u8F7D\u6210\u529F"
          });
        },
        fail() {
          common_vendor.index.showToast({
            title: "\u9875\u9762\u9884\u8F7D\u5931\u8D25"
          });
        }
      });
    },
    unPreloadPage() {
      common_vendor.index.unPreloadPage({
        url: preloadPageUrl
      });
    },
    navigateToPreloadPage() {
      common_vendor.index.navigateTo({
        url: preloadPageUrl
      });
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
  return common_vendor.e({
    a: common_vendor.p({
      title: $data.title
    }),
    b: common_vendor.o((...args) => $options.navigateTo && $options.navigateTo(...args)),
    c: common_vendor.o((...args) => $options.navigateBack && $options.navigateBack(...args)),
    d: common_vendor.o((...args) => $options.redirectTo && $options.redirectTo(...args)),
    e: common_vendor.o((...args) => $options.switchTab && $options.switchTab(...args)),
    f: !_ctx.hasLeftWin
  }, !_ctx.hasLeftWin ? {
    g: common_vendor.o((...args) => $options.reLaunch && $options.reLaunch(...args))
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/navigator/navigator.vue"]]);
wx.createPage(MiniProgramPage);
