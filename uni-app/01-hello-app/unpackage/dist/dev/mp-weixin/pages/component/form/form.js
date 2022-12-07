"use strict";
var common_vendor = require("../../../common/vendor.js");
var common_graceChecker = require("../../../common/graceChecker.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    formSubmit: function(e) {
      console.log("form\u53D1\u751F\u4E86submit\u4E8B\u4EF6\uFF0C\u643A\u5E26\u6570\u636E\u4E3A\uFF1A" + JSON.stringify(e.detail.value));
      var rule = [
        { name: "nickname", checkType: "string", checkRule: "1,3", errorMsg: "\u59D3\u540D\u5E94\u4E3A1-3\u4E2A\u5B57\u7B26" },
        { name: "gender", checkType: "in", checkRule: "\u7537,\u5973", errorMsg: "\u8BF7\u9009\u62E9\u6027\u522B" },
        { name: "loves", checkType: "notnull", checkRule: "", errorMsg: "\u8BF7\u9009\u62E9\u7231\u597D" }
      ];
      var formData = e.detail.value;
      var checkRes = common_graceChecker.graceChecker.check(formData, rule);
      if (checkRes) {
        common_vendor.index.showToast({ title: "\u9A8C\u8BC1\u901A\u8FC7!", icon: "none" });
      } else {
        common_vendor.index.showToast({ title: common_graceChecker.graceChecker.error, icon: "none" });
      }
    },
    formReset: function(e) {
      console.log("\u6E05\u7A7A\u6570\u636E");
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
      title: "form"
    }),
    b: common_vendor.o((...args) => $options.formSubmit && $options.formSubmit(...args)),
    c: common_vendor.o((...args) => $options.formReset && $options.formReset(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/component/form/form.vue"]]);
wx.createPage(MiniProgramPage);
