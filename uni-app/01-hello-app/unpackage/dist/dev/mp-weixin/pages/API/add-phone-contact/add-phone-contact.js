"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "addPhoneContact",
      name: "",
      phone: ""
    };
  },
  methods: {
    nameChange: function(e) {
      this.name = e.detail.value;
    },
    phoneChange: function(e) {
      this.phone = e.detail.value;
    },
    async add() {
      common_vendor.index.addPhoneContact({
        firstName: this.name,
        mobilePhoneNumber: this.phone,
        success: function() {
          common_vendor.index.showModal({
            content: "\u5DF2\u6210\u529F\u6DFB\u52A0\u8054\u7CFB\u4EBA\uFF01",
            showCancel: false
          });
        },
        fail: function() {
          common_vendor.index.showModal({
            content: "\u6DFB\u52A0\u8054\u7CFB\u4EBA\u5931\u8D25\uFF01",
            showCancel: false
          });
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
    b: $data.name,
    c: common_vendor.o((...args) => $options.nameChange && $options.nameChange(...args)),
    d: $data.phone,
    e: common_vendor.o((...args) => $options.phoneChange && $options.phoneChange(...args)),
    f: common_vendor.o((...args) => $options.add && $options.add(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/add-phone-contact/add-phone-contact.vue"]]);
wx.createPage(MiniProgramPage);
