"use strict";
var common_vendor = require("../../../common/vendor.js");
var id = null;
const _sfc_main = {
  data() {
    return {
      title: "orientation",
      value: ""
    };
  },
  onUnload() {
    this.watchStop();
  },
  methods: {
    getOrient: function() {
      var that = this;
      plus.orientation.getCurrentOrientation(function(o) {
        that.value = "alpha\uFF1A" + o.alpha + "\nbeta\uFF1A" + o.beta + "\ngamma\uFF1A" + o.gamma;
      }, function(e) {
        console.log("\u83B7\u53D6\u5931\u8D25:" + e.message);
      });
    },
    watchOrient: function() {
      var that = this;
      if (id) {
        return;
      }
      id = plus.orientation.watchOrientation(function(o) {
        that.value = "\u76D1\u542C\u8BBE\u5907\u65B9\u5411\u53D8\u5316\u4FE1\u606F\nalpha\uFF1A" + o.alpha + "\nbeta\uFF1A" + o.beta + "\ngamma\uFF1A" + o.gamma;
      }, function(e) {
        plus.orientation.clearWatch(id);
        id = null;
        console.log("\u76D1\u542C\u5931\u8D25:" + e.message);
      });
    },
    watchStop: function() {
      if (id) {
        plus.orientation.clearWatch(id);
        id = null;
      } else {
        console.log("\u6CA1\u6709\u76D1\u542C\u8BBE\u5907\u65B9\u5411\u53D8\u5316");
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
    b: common_vendor.o((...args) => $options.getOrient && $options.getOrient(...args)),
    c: common_vendor.o((...args) => $options.watchOrient && $options.watchOrient(...args)),
    d: common_vendor.o((...args) => $options.watchStop && $options.watchStop(...args)),
    e: $data.value
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/platforms/app-plus/orientation/orientation.vue"]]);
wx.createPage(MiniProgramPage);
