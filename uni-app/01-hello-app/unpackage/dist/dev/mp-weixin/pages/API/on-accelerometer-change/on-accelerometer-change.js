"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "onAccelerometerChange",
      value: ""
    };
  },
  onUnload() {
    common_vendor.index.stopAccelerometer();
  },
  methods: {
    watchAcce() {
      common_vendor.index.onAccelerometerChange((res) => {
        this.value = "\u76D1\u542C\u8BBE\u5907\u7684\u52A0\u901F\u5EA6\u53D8\u5316:\nX\u8F74\uFF1A" + res.x.toFixed(2) + "\nY\u8F74\uFF1A" + res.y.toFixed(2) + "\nZ\u8F74\uFF1A" + res.z.toFixed(2);
      });
    },
    stopAcce() {
      common_vendor.index.stopAccelerometer();
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
    b: common_vendor.o((...args) => $options.watchAcce && $options.watchAcce(...args)),
    c: common_vendor.o((...args) => $options.stopAcce && $options.stopAcce(...args)),
    d: $data.value
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/on-accelerometer-change/on-accelerometer-change.vue"]]);
wx.createPage(MiniProgramPage);
