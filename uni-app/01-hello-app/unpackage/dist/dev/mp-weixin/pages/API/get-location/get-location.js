"use strict";
var common_vendor = require("../../../common/vendor.js");
var common_util = require("../../../common/util.js");
var formatLocation = common_util.formatLocation;
const _sfc_main = {
  data() {
    return {
      title: "getLocation",
      hasLocation: false,
      location: {},
      type: ""
    };
  },
  methods: {
    togglePopup(type) {
      this.type = type;
    },
    showConfirm() {
      this.type = "showpopup";
    },
    hideConfirm() {
      this.type = "";
    },
    async getLocation() {
      let status = await this.getSetting();
      if (status === 2) {
        this.showConfirm();
        return;
      }
      this.doGetLocation();
    },
    doGetLocation() {
      common_vendor.index.getLocation({
        success: (res) => {
          this.hasLocation = true;
          this.location = formatLocation(res.longitude, res.latitude);
        },
        fail: (err) => {
          if (err.errMsg.indexOf("auth deny") >= 0) {
            common_vendor.index.showToast({
              title: "\u8BBF\u95EE\u4F4D\u7F6E\u88AB\u62D2\u7EDD"
            });
          } else {
            common_vendor.index.showToast({
              title: err.errMsg
            });
          }
        }
      });
    },
    getSetting: function() {
      return new Promise((resolve, reject) => {
        common_vendor.index.getSetting({
          success: (res) => {
            if (res.authSetting["scope.userLocation"] === void 0) {
              resolve(0);
              return;
            }
            if (res.authSetting["scope.userLocation"]) {
              resolve(1);
            } else {
              resolve(2);
            }
          }
        });
      });
    },
    openSetting: function() {
      this.hideConfirm();
      common_vendor.index.openSetting({
        success: (res) => {
          if (res.authSetting && res.authSetting["scope.userLocation"]) {
            this.doGetLocation();
          }
        },
        fail: (err) => {
        }
      });
    },
    async checkPermission() {
      let status = permision.isIOS ? await permision.requestIOS("location") : await permision.requestAndroid("android.permission.ACCESS_FINE_LOCATION");
      if (status === null || status === 1) {
        status = 1;
      } else if (status === 2) {
        common_vendor.index.showModal({
          content: "\u7CFB\u7EDF\u5B9A\u4F4D\u5DF2\u5173\u95ED",
          confirmText: "\u786E\u5B9A",
          showCancel: false,
          success: function(res) {
          }
        });
      } else if (status.code) {
        common_vendor.index.showModal({
          content: status.message
        });
      } else {
        common_vendor.index.showModal({
          content: "\u9700\u8981\u5B9A\u4F4D\u6743\u9650",
          confirmText: "\u8BBE\u7F6E",
          success: function(res) {
            if (res.confirm) {
              permision.gotoAppSetting();
            }
          }
        });
      }
      return status;
    },
    clear: function() {
      this.hasLocation = false;
    }
  }
};
if (!Array) {
  const _easycom_page_head2 = common_vendor.resolveComponent("page-head");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_page_head2 + _easycom_uni_popup2)();
}
const _easycom_page_head = () => "../../../components/page-head/page-head.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_page_head + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      title: $data.title
    }),
    b: $data.hasLocation === false
  }, $data.hasLocation === false ? {} : {}, {
    c: $data.hasLocation === true
  }, $data.hasLocation === true ? {
    d: common_vendor.t($data.location.longitude[0]),
    e: common_vendor.t($data.location.longitude[1]),
    f: common_vendor.t($data.location.latitude[0]),
    g: common_vendor.t($data.location.latitude[1])
  } : {}, {
    h: common_vendor.o((...args) => $options.getLocation && $options.getLocation(...args)),
    i: common_vendor.o((...args) => $options.clear && $options.clear(...args)),
    j: common_vendor.o((...args) => $options.openSetting && $options.openSetting(...args)),
    k: common_vendor.o(($event) => $options.togglePopup("")),
    l: common_vendor.o(($event) => $options.togglePopup("")),
    m: common_vendor.p({
      show: $data.type === "showpopup",
      mode: "fixed"
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/get-location/get-location.vue"]]);
wx.createPage(MiniProgramPage);
