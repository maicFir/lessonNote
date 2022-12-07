"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "createSelectorQuery",
      top: 0,
      left: "0px",
      info: []
    };
  },
  onReady() {
    this.getNodeInfo();
  },
  methods: {
    setPosition() {
      this.left = Math.random() * common_vendor.index.upx2px(320) + "px";
      this.top = Math.random() * common_vendor.index.upx2px(320) + "px";
      this.getNodeInfo();
    },
    getNodeInfo() {
      common_vendor.index.createSelectorQuery().select(".target").boundingClientRect().exec((ret) => {
        const rect = ret[0];
        if (rect) {
          const sort = ["left", "right", "top", "bottom", "width", "height"];
          const info = [];
          for (let i in sort) {
            let key = sort[i];
            info.push({
              "key": key,
              "val": rect[key]
            });
          }
          this.info = info;
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
    b: common_vendor.o((...args) => $options.getNodeInfo && $options.getNodeInfo(...args)),
    c: common_vendor.f($data.info, (item, index, i0) => {
      return {
        a: common_vendor.t(item.key),
        b: common_vendor.t(item.val),
        c: index
      };
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/get-node-info/get-node-info.vue"]]);
wx.createPage(MiniProgramPage);
