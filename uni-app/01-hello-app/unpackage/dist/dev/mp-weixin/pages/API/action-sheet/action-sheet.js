"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "action-sheet",
      buttonRect: {}
    };
  },
  methods: {
    actionSheetTap() {
      const that = this;
      common_vendor.index.showActionSheet({
        title: "\u6807\u9898",
        itemList: ["item1", "item2", "item3", "item4"],
        popover: {
          top: that.buttonRect.top + 104 + that.buttonRect.height,
          left: that.buttonRect.left + that.buttonRect.width / 2
        },
        success: (e) => {
          console.log(e.tapIndex);
          common_vendor.index.showToast({
            title: "\u70B9\u51FB\u4E86\u7B2C" + e.tapIndex + "\u4E2A\u9009\u9879",
            icon: "none"
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
    b: common_vendor.o((...args) => $options.actionSheetTap && $options.actionSheetTap(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/action-sheet/action-sheet.vue"]]);
wx.createPage(MiniProgramPage);
