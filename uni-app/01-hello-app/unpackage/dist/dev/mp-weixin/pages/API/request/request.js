"use strict";
var common_vendor = require("../../../common/vendor.js");
const requestUrl = "https://unidemo.dcloud.net.cn/ajax/echo/text?name=uni-app";
const duration = 2e3;
const _sfc_main = {
  data() {
    return {
      title: "request",
      loading: false,
      res: ""
    };
  },
  methods: {
    sendRequest(mode) {
      this.loading = true;
      switch (mode) {
        case "promise":
          this._requestPromise();
          break;
        case "await":
          this._requestAwait();
          break;
        default:
          this._request();
          break;
      }
    },
    _request() {
      common_vendor.index.request({
        url: requestUrl,
        dataType: "text",
        data: {
          noncestr: Date.now()
        },
        success: (res) => {
          console.log("request success", res);
          common_vendor.index.showToast({
            title: "\u8BF7\u6C42\u6210\u529F",
            icon: "success",
            mask: true,
            duration
          });
          this.res = "\u8BF7\u6C42\u7ED3\u679C : " + JSON.stringify(res);
        },
        fail: (err) => {
          console.log("request fail", err);
          common_vendor.index.showModal({
            content: err.errMsg,
            showCancel: false
          });
        },
        complete: () => {
          this.loading = false;
        }
      });
    },
    _requestPromise() {
      common_vendor.index.request({
        url: requestUrl,
        dataType: "text",
        data: {
          noncestr: Date.now()
        }
      }).then((res) => {
        console.log("request success", res);
        common_vendor.index.showToast({
          title: "\u8BF7\u6C42\u6210\u529F",
          icon: "success",
          mask: true,
          duration
        });
        this.res = "\u8BF7\u6C42\u7ED3\u679C : " + JSON.stringify(res);
        this.loading = false;
      }).catch((err) => {
        console.log("request fail", err);
        common_vendor.index.showModal({
          content: err.errMsg,
          showCancel: false
        });
        this.loading = false;
      });
    },
    async _requestAwait() {
      let res, err;
      try {
        res = await common_vendor.index.request({
          url: requestUrl,
          dataType: "text",
          data: {
            noncestr: Date.now()
          }
        });
      } catch (e) {
        err = e;
      }
      if (err) {
        console.log("request fail", err);
        common_vendor.index.showModal({
          content: err.errMsg,
          showCancel: false
        });
      } else {
        console.log("request success", res);
        common_vendor.index.showToast({
          title: "\u8BF7\u6C42\u6210\u529F",
          icon: "success",
          mask: true,
          duration
        });
        this.res = "\u8BF7\u6C42\u7ED3\u679C : " + JSON.stringify(res);
      }
      this.loading = false;
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
    b: $data.res,
    c: common_vendor.o((...args) => $options.sendRequest && $options.sendRequest(...args)),
    d: $data.loading,
    e: common_vendor.o(($event) => $options.sendRequest("promise")),
    f: $data.loading,
    g: common_vendor.o(($event) => $options.sendRequest("await")),
    h: $data.loading
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/request/request.vue"]]);
wx.createPage(MiniProgramPage);
