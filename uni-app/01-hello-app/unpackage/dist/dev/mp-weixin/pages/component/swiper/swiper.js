"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      background: ["color1", "color2", "color3"],
      indicatorDots: true,
      autoplay: true,
      interval: 2e3,
      duration: 500
    };
  },
  methods: {
    changeIndicatorDots(e) {
      this.indicatorDots = !this.indicatorDots;
    },
    changeAutoplay(e) {
      this.autoplay = !this.autoplay;
    },
    intervalChange(e) {
      this.interval = e.detail.value;
    },
    durationChange(e) {
      this.duration = e.detail.value;
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
      title: "swiper,\u53EF\u6ED1\u52A8\u89C6\u56FE"
    }),
    b: $data.indicatorDots,
    c: $data.autoplay,
    d: $data.interval,
    e: $data.duration,
    f: $data.indicatorDots,
    g: common_vendor.o((...args) => $options.changeIndicatorDots && $options.changeIndicatorDots(...args)),
    h: $data.autoplay,
    i: common_vendor.o((...args) => $options.changeAutoplay && $options.changeAutoplay(...args)),
    j: common_vendor.t($data.duration),
    k: common_vendor.o((...args) => $options.durationChange && $options.durationChange(...args)),
    l: $data.duration,
    m: common_vendor.t($data.interval),
    n: common_vendor.o((...args) => $options.intervalChange && $options.intervalChange(...args)),
    o: $data.interval
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/component/swiper/swiper.vue"]]);
wx.createPage(MiniProgramPage);
