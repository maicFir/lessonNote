"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "push",
      provider: [],
      pushServer: "http://demo.dcloud.net.cn/push/?",
      tranMsg: ""
    };
  },
  onLoad: function() {
    common_vendor.index.getProvider({
      service: "push",
      success: (e) => {
        console.log("success", e);
        this.provider = e.provider;
      },
      fail: (e) => {
        console.log("\u83B7\u53D6\u63A8\u9001\u901A\u9053\u5931\u8D25", e);
      }
    });
  },
  onUnload: function() {
    this.tranMsg = "";
  },
  methods: {
    listenTranMsg() {
      plus.push.addEventListener("click", (msg) => {
        this.tranMsg = JSON.stringify(msg);
      });
      plus.push.addEventListener("receive", (msg) => {
        this.tranMsg = JSON.stringify(msg);
      });
      common_vendor.index.showToast({
        title: "\u5F00\u59CB\u76D1\u542C\u900F\u4F20\u6570\u636E",
        icon: "success"
      });
    },
    requireTranMsg() {
      var inf = plus.push.getClientInfo();
      var url = this.pushServer + "type=tran&appid=" + encodeURIComponent(plus.runtime.appid);
      inf.id && (url += "&id=" + inf.id);
      url += "&cid=" + encodeURIComponent(inf.clientid);
      if (plus.os.name == "iOS") {
        url += "&token=" + encodeURIComponent(inf.token);
      }
      url += "&title=" + encodeURIComponent("Hello uniapp");
      url += "&content=" + encodeURIComponent("\u5E26\u900F\u4F20\u6570\u636E\u63A8\u9001\u901A\u77E5\uFF01");
      if (plus.os.name === "iOS") {
        url += "&payload=" + encodeURIComponent('{"title":"Hello uniapp Test","content":"test content"}');
      } else {
        url += "&payload=" + encodeURIComponent(`'{"title":"Hello uniapp Test","content":"test content"}'`);
      }
      url += "&version=" + encodeURIComponent(plus.runtime.version);
      plus.runtime.openURL(url);
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
  return common_vendor.e({
    a: common_vendor.p({
      title: $data.title
    }),
    b: $data.provider[0]
  }, $data.provider[0] ? {
    c: common_vendor.o((...args) => $options.listenTranMsg && $options.listenTranMsg(...args)),
    d: common_vendor.o((...args) => $options.requireTranMsg && $options.requireTranMsg(...args)),
    e: $data.tranMsg,
    f: common_vendor.o(($event) => $data.tranMsg = $event.detail.value)
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/platforms/app-plus/push/push.vue"]]);
wx.createPage(MiniProgramPage);
