"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "\u751F\u7269\u8BA4\u8BC1",
      result: ""
    };
  },
  onLoad() {
  },
  methods: {
    checkIsSupportSoterAuthentication() {
      common_vendor.index.checkIsSupportSoterAuthentication({
        success(res) {
          common_vendor.index.showModal({
            content: "\u652F\u6301\u7684\u8BA4\u8BC1\u65B9\u5F0F\uFF1A" + res.supportMode,
            showCancel: false
          });
          console.log(res);
        },
        fail(err) {
          console.log(err);
        }
      });
    },
    checkIsSoterEnrolledInDeviceFingerPrint() {
      common_vendor.index.checkIsSoterEnrolledInDevice({
        checkAuthMode: "fingerPrint",
        success(res) {
          if (res.isEnrolled) {
            common_vendor.index.showToast({
              icon: "none",
              title: "\u5DF2\u5F55\u5165\u6307\u7EB9"
            });
          } else {
            common_vendor.index.showModal({
              content: "\u672A\u5F55\u5165\u6307\u7EB9",
              showCancel: false
            });
          }
          console.log(res);
        },
        fail(err) {
          common_vendor.index.showModal({
            content: "\u672A\u5F55\u5165\u6307\u7EB9",
            showCancel: false
          });
          console.log(err);
        }
      });
    },
    checkIsSoterEnrolledInDeviceFaceID() {
      common_vendor.index.checkIsSoterEnrolledInDevice({
        checkAuthMode: "facial",
        success(res) {
          if (res.isEnrolled) {
            common_vendor.index.showToast({
              icon: "none",
              title: "\u5DF2\u5F55\u5165FaceID"
            });
          } else {
            common_vendor.index.showModal({
              content: "\u672A\u5F55\u5165FaceID",
              showCancel: false
            });
          }
          console.log(res);
        },
        fail(err) {
          common_vendor.index.showModal({
            content: "\u672A\u5F55\u5165FaceID",
            showCancel: false
          });
          console.log(err);
        }
      });
    },
    startSoterAuthenticationFingerPrint() {
      common_vendor.index.startSoterAuthentication({
        requestAuthModes: ["fingerPrint"],
        challenge: "123456",
        authContent: "\u8BF7\u7528\u6307\u7EB9\u89E3\u9501",
        success(res) {
          common_vendor.index.showToast({
            icon: "none",
            title: "\u6307\u7EB9\u9A8C\u8BC1\u6210\u529F"
          });
          console.log(res);
        },
        fail(err) {
          common_vendor.index.showModal({
            content: "\u6307\u7EB9\u9A8C\u8BC1\u5931\u8D25\uFF0CerrCode\uFF1A" + err.errCode,
            showCancel: false
          });
          console.log(err);
        }
      });
    },
    startSoterAuthenticationFaceID() {
      common_vendor.index.startSoterAuthentication({
        requestAuthModes: ["facial"],
        challenge: "123456",
        authContent: "\u8BF7\u7528FaceID\u89E3\u9501",
        success(res) {
          common_vendor.index.showToast({
            icon: "none",
            title: "FaceID\u9A8C\u8BC1\u6210\u529F"
          });
          console.log(res);
        },
        fail(err) {
          common_vendor.index.showModal({
            content: "FaceID\u9A8C\u8BC1\u5931\u8D25\uFF0CerrCode\uFF1A" + err.errCode,
            showCancel: false
          });
          console.log(err);
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
    b: common_vendor.o((...args) => $options.checkIsSupportSoterAuthentication && $options.checkIsSupportSoterAuthentication(...args)),
    c: common_vendor.o((...args) => $options.checkIsSoterEnrolledInDeviceFingerPrint && $options.checkIsSoterEnrolledInDeviceFingerPrint(...args)),
    d: common_vendor.o((...args) => $options.checkIsSoterEnrolledInDeviceFaceID && $options.checkIsSoterEnrolledInDeviceFaceID(...args)),
    e: common_vendor.o((...args) => $options.startSoterAuthenticationFingerPrint && $options.startSoterAuthenticationFingerPrint(...args)),
    f: common_vendor.o((...args) => $options.startSoterAuthenticationFaceID && $options.startSoterAuthenticationFaceID(...args)),
    g: common_vendor.t($data.result)
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/soter/soter.vue"]]);
wx.createPage(MiniProgramPage);
