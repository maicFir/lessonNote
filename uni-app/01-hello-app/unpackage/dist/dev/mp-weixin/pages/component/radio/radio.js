"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "radio \u5355\u9009\u6846",
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
      ],
      current: 0
    };
  },
  methods: {
    radioChange(evt) {
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].value === evt.detail.value) {
          this.current = i;
          break;
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
    b: common_vendor.f($data.items, (item, index, i0) => {
      return {
        a: item.value,
        b: index === $data.current,
        c: common_vendor.t(item.name),
        d: item.value
      };
    }),
    c: common_vendor.o((...args) => $options.radioChange && $options.radioChange(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/component/radio/radio.vue"]]);
wx.createPage(MiniProgramPage);
