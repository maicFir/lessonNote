"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "label",
      checkboxItems: [
        {
          name: "USA",
          value: "\u7F8E\u56FD"
        },
        {
          name: "CHN",
          value: "\u4E2D\u56FD",
          checked: "true"
        }
      ],
      radioItems: [
        {
          name: "USA",
          value: "\u7F8E\u56FD"
        },
        {
          name: "CHN",
          value: "\u4E2D\u56FD",
          checked: "true"
        }
      ],
      hidden: false
    };
  },
  methods: {
    checkboxChange: function(e) {
      var checked = e.detail.value;
      console.log(checked);
    },
    radioChange: function(e) {
      var checked = e.detail.value;
      console.log(checked);
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
    b: common_vendor.f($data.checkboxItems, (item, k0, i0) => {
      return {
        a: item.name,
        b: item.checked,
        c: common_vendor.t(item.value),
        d: item.name
      };
    }),
    c: common_vendor.o((...args) => $options.checkboxChange && $options.checkboxChange(...args)),
    d: common_vendor.f($data.radioItems, (item, index, i0) => {
      return {
        a: item.name,
        b: item.name,
        c: item.checked,
        d: common_vendor.t(item.value),
        e: item.name,
        f: index
      };
    }),
    e: common_vendor.o((...args) => $options.radioChange && $options.radioChange(...args)),
    f: common_vendor.o((...args) => $options.checkboxChange && $options.checkboxChange(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/component/label/label.vue"]]);
wx.createPage(MiniProgramPage);
