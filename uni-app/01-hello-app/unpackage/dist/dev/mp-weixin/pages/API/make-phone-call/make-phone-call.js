"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "makePhoneCall",
      disabled: true
    };
  },
  methods: {
    bindInput: function(e) {
      this.inputValue = e.detail.value;
      if (this.inputValue.length > 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    makePhoneCall: function() {
      common_vendor.index.makePhoneCall({
        phoneNumber: this.inputValue,
        success: () => {
          console.log("\u6210\u529F\u62E8\u6253\u7535\u8BDD");
        }
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
  return {
    a: common_vendor.p({
      title: $data.title
    }),
    b: common_vendor.o((...args) => $options.bindInput && $options.bindInput(...args)),
    c: common_vendor.o((...args) => $options.makePhoneCall && $options.makePhoneCall(...args)),
    d: $data.disabled
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/make-phone-call/make-phone-call.vue"]]);
wx.createPage(MiniProgramPage);
