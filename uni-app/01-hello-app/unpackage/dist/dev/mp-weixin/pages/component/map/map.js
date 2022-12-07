"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "map",
      latitude: 39.909,
      longitude: 116.39742,
      covers: [{
        latitude: 39.9085,
        longitude: 116.39747,
        iconPath: "../../../static/location.png"
      }, {
        latitude: 39.9,
        longitude: 116.39,
        iconPath: "../../../static/location.png"
      }]
    };
  },
  methods: {}
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
    b: $data.latitude,
    c: $data.longitude,
    d: $data.covers
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/component/map/map.vue"]]);
wx.createPage(MiniProgramPage);
