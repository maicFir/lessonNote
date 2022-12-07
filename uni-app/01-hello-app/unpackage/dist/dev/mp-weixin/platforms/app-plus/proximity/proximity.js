"use strict";
var common_vendor = require("../../../common/vendor.js");
var id = null;
var bright = null;
const _sfc_main = {
  data() {
    return {
      title: "proximity",
      value: ""
    };
  },
  methods: {
    getProximity: function() {
      var that = this;
      plus.proximity.getCurrentProximity(function(d) {
        that.value = "\u8DDD\u79BB\u4E3A\uFF1A" + d;
      }, function(e) {
        that.value = "\u83B7\u53D6\u5931\u8D25:" + e.message;
      });
    },
    watchProximity: function() {
      var that = this;
      if (id) {
        return;
      }
      bright = plus.screen.getBrightness();
      id = plus.proximity.watchProximity(function(d) {
        that.value = "\u8DDD\u79BB\u53D8\u5316\uFF1A" + d;
        plus.screen.setBrightness(d < 1 ? 0.01 : bright);
      }, function(e) {
        plus.proximity.clearWatch(id);
        id = null;
        that.value = "\u76D1\u542C\u5931\u8D25:" + e.message;
      });
    },
    watchStop: function() {
      var that = this;
      if (id) {
        that.value = "\u505C\u6B62\u76D1\u542C\u8BBE\u5907\u8DDD\u79BB\u4F20\u611F\u5668\u4FE1\u606F";
        plus.proximity.clearWatch(id);
        id = null;
      } else {
        that.value = "\u6CA1\u6709\u76D1\u542C\u8BBE\u5907\u8DDD\u79BB\u4F20\u611F\u5668";
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
    b: common_vendor.o((...args) => $options.getProximity && $options.getProximity(...args)),
    c: common_vendor.o((...args) => $options.watchProximity && $options.watchProximity(...args)),
    d: common_vendor.o((...args) => $options.watchStop && $options.watchStop(...args)),
    e: $data.value
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/platforms/app-plus/proximity/proximity.vue"]]);
wx.createPage(MiniProgramPage);
