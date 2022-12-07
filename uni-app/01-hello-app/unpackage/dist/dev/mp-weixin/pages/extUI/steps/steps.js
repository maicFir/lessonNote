"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      active: 1,
      list1: [{
        title: "\u4E8B\u4EF6\u4E00"
      }, {
        title: "\u4E8B\u4EF6\u4E8C"
      }, {
        title: "\u4E8B\u4EF6\u4E09"
      }, {
        title: "\u4E8B\u4EF6\u56DB"
      }],
      list2: [{
        title: "\u4E70\u5BB6\u4E0B\u5355",
        desc: "2018-11-11"
      }, {
        title: "\u5356\u5BB6\u53D1\u8D27",
        desc: "2018-11-12"
      }, {
        title: "\u4E70\u5BB6\u7B7E\u6536",
        desc: "2018-11-13"
      }, {
        title: "\u4EA4\u6613\u5B8C\u6210",
        desc: "2018-11-14"
      }]
    };
  },
  methods: {
    change() {
      if (this.active < this.list1.length - 1) {
        this.active += 1;
      } else {
        this.active = 0;
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_steps2 = common_vendor.resolveComponent("uni-steps");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_steps2 + _easycom_uni_section2)();
}
const _easycom_uni_steps = () => "../../../uni_modules/uni-steps/components/uni-steps/uni-steps.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_steps + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      options: $data.list1,
      active: $data.active
    }),
    b: common_vendor.p({
      title: "\u57FA\u672C\u7528\u6CD5",
      type: "line",
      padding: true
    }),
    c: common_vendor.p({
      options: $data.list1,
      ["active-icon"]: "checkbox",
      active: $data.active
    }),
    d: common_vendor.p({
      title: "\u81EA\u5B9A\u4E49\u56FE\u6807",
      type: "line",
      padding: true
    }),
    e: common_vendor.p({
      options: $data.list1,
      ["active-icon"]: "medal",
      active: $data.active
    }),
    f: common_vendor.p({
      title: "\u81EA\u5B9A\u4E49\u56FE\u6807",
      type: "line",
      padding: true
    }),
    g: common_vendor.p({
      options: $data.list2,
      ["active-color"]: "#007AFF",
      active: $data.active,
      direction: "column"
    }),
    h: common_vendor.p({
      title: "\u7EB5\u5411\u6392\u5217",
      type: "line",
      padding: true
    }),
    i: common_vendor.o((...args) => $options.change && $options.change(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/steps/steps.vue"]]);
wx.createPage(MiniProgramPage);
