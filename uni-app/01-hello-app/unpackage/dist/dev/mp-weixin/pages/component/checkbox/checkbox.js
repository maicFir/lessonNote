"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "checkbox \u590D\u9009\u6846",
      items: [
        {
          value: "USA",
          name: "\u7F8E\u56FD"
        },
        {
          value: "CHN",
          name: "\u4E2D\u56FD",
          checked: "true"
        },
        {
          value: "BRA",
          name: "\u5DF4\u897F"
        },
        {
          value: "JPN",
          name: "\u65E5\u672C"
        },
        {
          value: "ENG",
          name: "\u82F1\u56FD"
        },
        {
          value: "FRA",
          name: "\u6CD5\u56FD"
        }
      ]
    };
  },
  methods: {
    checkboxChange: function(e) {
      var items = this.items, values = e.detail.value;
      for (var i = 0, lenI = items.length; i < lenI; ++i) {
        const item = items[i];
        if (values.indexOf(item.value) >= 0) {
          this.$set(item, "checked", true);
        } else {
          this.$set(item, "checked", false);
        }
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
    b: common_vendor.f($data.items, (item, k0, i0) => {
      return {
        a: item.value,
        b: item.checked,
        c: common_vendor.t(item.name),
        d: item.value
      };
    }),
    c: common_vendor.o((...args) => $options.checkboxChange && $options.checkboxChange(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/component/checkbox/checkbox.vue"]]);
wx.createPage(MiniProgramPage);
