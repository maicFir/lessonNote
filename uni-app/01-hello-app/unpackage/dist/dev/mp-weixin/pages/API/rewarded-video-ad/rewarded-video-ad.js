"use strict";
var common_vendor = require("../../../common/vendor.js");
const ERROR_CODE = [-5001, -5002, -5003, -5004, -5005, -5006];
const _sfc_main = {
  data() {
    return {
      title: "\u6FC0\u52B1\u89C6\u9891\u5E7F\u544A",
      loading: false,
      loadError: false
    };
  },
  onReady() {
    this.adOption = {
      adUnitId: ""
    };
    this.createAd();
  },
  methods: {
    createAd() {
      var rewardedVideoAd = this.rewardedVideoAd = common_vendor.index.createRewardedVideoAd(this.adOption);
      rewardedVideoAd.onLoad(() => {
        this.loading = false;
        this.loadError = false;
        console.log("onLoad event");
      });
      rewardedVideoAd.onClose((res) => {
        this.loading = true;
        if (res && res.isEnded) {
          console.log("onClose " + res.isEnded);
        } else {
          console.log("onClose " + res.isEnded);
        }
        setTimeout(() => {
          common_vendor.index.showToast({
            title: "\u6FC0\u52B1\u89C6\u9891" + (res.isEnded ? "\u6210\u529F" : "\u672A") + "\u64AD\u653E\u5B8C\u6BD5",
            duration: 1e4,
            position: "bottom"
          });
        }, 500);
      });
      rewardedVideoAd.onError((err) => {
        this.loading = false;
        if (err.code && ERROR_CODE.indexOf(err.code) !== -1) {
          this.loadError = true;
        }
        console.log("onError event", err);
      });
      this.loading = true;
    },
    show() {
      const rewardedVideoAd = this.rewardedVideoAd;
      rewardedVideoAd.show().catch(() => {
        rewardedVideoAd.load().then(() => rewardedVideoAd.show()).catch((err) => {
          console.log("\u6FC0\u52B1\u89C6\u9891 \u5E7F\u544A\u663E\u793A\u5931\u8D25", err);
          common_vendor.index.showToast({
            title: err.errMsg || err.message,
            duration: 5e3,
            position: "bottom"
          });
        });
      });
    },
    reloadAd() {
      this.loading = true;
      this.rewardedVideoAd.load();
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
    b: !$data.loadError
  }, !$data.loadError ? {
    c: $data.loading,
    d: $data.loading,
    e: common_vendor.o((...args) => $options.show && $options.show(...args))
  } : {}, {
    f: $data.loadError
  }, $data.loadError ? {
    g: $data.loading,
    h: $data.loading,
    i: common_vendor.o((...args) => $options.reloadAd && $options.reloadAd(...args))
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/rewarded-video-ad/rewarded-video-ad.vue"]]);
wx.createPage(MiniProgramPage);
