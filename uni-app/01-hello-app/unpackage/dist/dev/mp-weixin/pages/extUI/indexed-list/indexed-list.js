"use strict";
var common_airport = require("../../../common/airport.js");
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      list: common_airport.airport.list
    };
  },
  methods: {
    bindClick(e) {
      console.log("\u70B9\u51FBitem\uFF0C\u8FD4\u56DE\u6570\u636E" + JSON.stringify(e));
    }
  }
};
if (!Array) {
  const _easycom_uni_indexed_list2 = common_vendor.resolveComponent("uni-indexed-list");
  _easycom_uni_indexed_list2();
}
const _easycom_uni_indexed_list = () => "../../../uni_modules/uni-indexed-list/components/uni-indexed-list/uni-indexed-list.js";
if (!Math) {
  _easycom_uni_indexed_list();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($options.bindClick),
    b: common_vendor.p({
      options: $data.list,
      ["show-select"]: true
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/indexed-list/indexed-list.nvue"]]);
wx.createPage(MiniProgramPage);
