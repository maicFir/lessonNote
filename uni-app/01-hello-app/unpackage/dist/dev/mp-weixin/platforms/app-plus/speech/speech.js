"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "speech",
      value: ""
    };
  },
  onUnload() {
    this.value = "";
  },
  methods: {
    async startRecognize() {
      var options = {};
      var that = this;
      options.engine = "baidu";
      that.value = "";
      plus.speech.startRecognize(options, function(s) {
        console.log(s);
        that.value += s;
      }, function(e) {
        console.log("\u8BED\u97F3\u8BC6\u522B\u5931\u8D25\uFF1A" + e.message);
      });
    },
    async startRecognizeEnglish() {
      var options = {};
      var that = this;
      options.engine = "baidu";
      options.lang = "en-us";
      that.value = "";
      plus.speech.startRecognize(options, function(s) {
        console.log(s);
        that.value += s;
      }, function(e) {
        console.log("\u8BED\u97F3\u8BC6\u522B\u5931\u8D25\uFF1A" + e.message);
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
    b: $data.value,
    c: common_vendor.o((...args) => $options.startRecognize && $options.startRecognize(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/platforms/app-plus/speech/speech.vue"]]);
wx.createPage(MiniProgramPage);
