"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "text",
      texts: [
        "HBuilder\uFF0C400\u4E07\u5F00\u53D1\u8005\u9009\u62E9\u7684IDE",
        "MUI\uFF0C\u8F7B\u5DE7\u3001\u6F02\u4EAE\u7684\u524D\u7AEF\u5F00\u6E90\u6846\u67B6",
        "wap2app\uFF0CM\u7AD9\u5FEB\u901F\u8F6C\u6362\u539F\u751F\u4F53\u9A8C\u7684App",
        "5+Runtime\uFF0C\u4E3AHTML5\u63D2\u4E0A\u539F\u751F\u7684\u7FC5\u8180",
        "HBuilderX\uFF0C\u8F7B\u5DE7\u3001\u6781\u901F\uFF0C\u6781\u5BA2\u7F16\u8F91\u5668",
        "uni-app\uFF0C\u7EC8\u6781\u8DE8\u5E73\u53F0\u65B9\u6848",
        "HBuilder\uFF0C400\u4E07\u5F00\u53D1\u8005\u9009\u62E9\u7684IDE",
        "MUI\uFF0C\u8F7B\u5DE7\u3001\u6F02\u4EAE\u7684\u524D\u7AEF\u5F00\u6E90\u6846\u67B6",
        "wap2app\uFF0CM\u7AD9\u5FEB\u901F\u8F6C\u6362\u539F\u751F\u4F53\u9A8C\u7684App",
        "5+Runtime\uFF0C\u4E3AHTML5\u63D2\u4E0A\u539F\u751F\u7684\u7FC5\u8180",
        "HBuilderX\uFF0C\u8F7B\u5DE7\u3001\u6781\u901F\uFF0C\u6781\u5BA2\u7F16\u8F91\u5668",
        "uni-app\uFF0C\u7EC8\u6781\u8DE8\u5E73\u53F0\u65B9\u6848",
        "......"
      ],
      text: "",
      canAdd: true,
      canRemove: false,
      extraLine: []
    };
  },
  methods: {
    add: function(e) {
      this.extraLine.push(this.texts[this.extraLine.length % 12]);
      this.text = this.extraLine.join("\n");
      this.canAdd = this.extraLine.length < 12;
      this.canRemove = this.extraLine.length > 0;
    },
    remove: function(e) {
      if (this.extraLine.length > 0) {
        this.extraLine.pop();
        this.text = this.extraLine.join("\n");
        this.canAdd = this.extraLine.length < 12;
        this.canRemove = this.extraLine.length > 0;
      }
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
    b: common_vendor.t($data.text),
    c: !$data.canAdd,
    d: common_vendor.o((...args) => $options.add && $options.add(...args)),
    e: !$data.canRemove,
    f: common_vendor.o((...args) => $options.remove && $options.remove(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/component/text/text.vue"]]);
wx.createPage(MiniProgramPage);
