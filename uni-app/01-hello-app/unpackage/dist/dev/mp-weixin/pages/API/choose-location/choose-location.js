"use strict";
var common_vendor = require("../../../common/vendor.js");
var common_util = require("../../../common/util.js");
var formatLocation = common_util.formatLocation;
const _sfc_main = {
  data() {
    return {
      title: "chooseLocation",
      hasLocation: false,
      location: {},
      locationAddress: ""
    };
  },
  methods: {
    chooseLocation: function() {
      common_vendor.index.chooseLocation({
        success: (res) => {
          this.hasLocation = true, this.location = formatLocation(res.longitude, res.latitude), this.locationAddress = res.address;
        }
      });
    },
    clear: function() {
      this.hasLocation = false;
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
    b: $data.hasLocation === false
  }, $data.hasLocation === false ? {} : {}, {
    c: $data.hasLocation === true
  }, $data.hasLocation === true ? {
    d: common_vendor.t($data.locationAddress),
    e: common_vendor.t($data.location.longitude[0]),
    f: common_vendor.t($data.location.longitude[1]),
    g: common_vendor.t($data.location.latitude[0]),
    h: common_vendor.t($data.location.latitude[1])
  } : {}, {
    i: common_vendor.o((...args) => $options.chooseLocation && $options.chooseLocation(...args)),
    j: common_vendor.o((...args) => $options.clear && $options.clear(...args))
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/choose-location/choose-location.vue"]]);
wx.createPage(MiniProgramPage);
