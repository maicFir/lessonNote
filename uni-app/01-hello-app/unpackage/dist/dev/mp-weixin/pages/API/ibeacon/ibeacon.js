"use strict";
var common_vendor = require("../../../common/vendor.js");
const DEVICE_UUID_WEICHAT = "FDA50693-A4E2-4FB1-AFCF-C6EB07647825";
const _sfc_main = {
  data() {
    return {
      title: "iBeacon",
      isOpen: false,
      isStarted: false,
      deviceList: [],
      isPageOpened: false
    };
  },
  onLoad() {
    this.onBeaconUpdate();
  },
  onShow() {
    this.isPageOpened = true;
  },
  methods: {
    maskclose() {
      this.maskShow = false;
    },
    openBluetoothAdapter() {
      common_vendor.index.openBluetoothAdapter({
        success: (res) => {
          console.log("\u521D\u59CB\u5316\u84DD\u7259\u6210\u529F:" + res.errMsg);
          console.log(res);
          this.isOpen = true;
          this.deviceList = [];
        },
        fail: (err) => {
          console.log("\u521D\u59CB\u5316\u84DD\u7259\u5931\u8D25\uFF0C\u9519\u8BEF\u7801\uFF1A" + (err.errCode || err.errMsg));
          if (err.errCode !== 0) {
            initTypes(err.errCode, err.errMsg);
          }
        }
      });
    },
    closeBluetoothAdapter(OBJECT) {
      this.stopBeaconDiscovery();
      wx.closeBluetoothAdapter({
        success: (res) => {
          this.isOpen = false;
          console.log("\u65AD\u5F00\u84DD\u7259\u6A21\u5757\u6210\u529F");
        }
      });
    },
    onBeaconUpdate() {
      common_vendor.index.onBeaconUpdate((res) => {
        if (!this.isPageOpened || !this.isOpen || !this.isStarted) {
          return;
        }
        console.log(res);
        if (res.beacons && res.beacons.length > 0) {
          this.getBeacons();
        } else if (!res.connected) {
          this.deviceList = [];
        }
      });
    },
    startBeaconDiscovery() {
      common_vendor.index.startBeaconDiscovery({
        uuids: this.getUUIDList(),
        success: (res) => {
          this.isStarted = true;
          console.log(res);
        },
        fail: (err) => {
          console.error(err);
        }
      });
    },
    stopBeaconDiscovery(types) {
      if (this.isStarted) {
        common_vendor.index.stopBeaconDiscovery({
          success: (res) => {
            this.isStarted = false;
          },
          fail: (err) => {
            console.error(err);
          }
        });
      }
    },
    getBeacons() {
      common_vendor.index.getBeacons({
        success: (res) => {
          if (res.beacons && res.beacons.length > 0) {
            console.log(res.beacons);
            this.deviceList = res.beacons;
          }
        },
        fail: (err) => {
          console.log("\u83B7\u53D6\u8BBE\u5907\u670D\u52A1\u5931\u8D25\uFF0C\u9519\u8BEF\u7801\uFF1A" + err.errCode);
          if (errCode.errCode !== 0) {
            initTypes(errCode.errCode);
          }
        }
      });
    },
    getUUIDList() {
      return [DEVICE_UUID_WEICHAT];
    }
  },
  onUnload() {
    this.isPageOpened = false;
  }
};
function initTypes(code, errMsg) {
  switch (code) {
    case 1e4:
      toast("\u672A\u521D\u59CB\u5316\u84DD\u7259\u9002\u914D\u5668");
      break;
    case 10001:
      toast("\u672A\u68C0\u6D4B\u5230\u84DD\u7259\uFF0C\u8BF7\u6253\u5F00\u84DD\u7259\u91CD\u8BD5\uFF01");
      break;
    case 10002:
      toast("\u6CA1\u6709\u627E\u5230\u6307\u5B9A\u8BBE\u5907");
      break;
    case 10003:
      toast("\u8FDE\u63A5\u5931\u8D25");
      break;
    case 10004:
      toast("\u6CA1\u6709\u627E\u5230\u6307\u5B9A\u670D\u52A1");
      break;
    case 10005:
      toast("\u6CA1\u6709\u627E\u5230\u6307\u5B9A\u7279\u5F81\u503C");
      break;
    case 10006:
      toast("\u5F53\u524D\u8FDE\u63A5\u5DF2\u65AD\u5F00");
      break;
    case 10007:
      toast("\u5F53\u524D\u7279\u5F81\u503C\u4E0D\u652F\u6301\u6B64\u64CD\u4F5C");
      break;
    case 10008:
      toast("\u5176\u4F59\u6240\u6709\u7CFB\u7EDF\u4E0A\u62A5\u7684\u5F02\u5E38");
      break;
    case 10009:
      toast("Android \u7CFB\u7EDF\u7279\u6709\uFF0C\u7CFB\u7EDF\u7248\u672C\u4F4E\u4E8E 4.3 \u4E0D\u652F\u6301 BLE");
      break;
    default:
      toast(errMsg);
  }
}
function toast(content, showCancel = false) {
  common_vendor.index.showModal({
    title: "\u63D0\u793A",
    content,
    showCancel
  });
}
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
    b: $data.isOpen,
    c: common_vendor.o((...args) => $options.openBluetoothAdapter && $options.openBluetoothAdapter(...args)),
    d: !$data.isOpen,
    e: common_vendor.o((...args) => $options.closeBluetoothAdapter && $options.closeBluetoothAdapter(...args)),
    f: !$data.isOpen || $data.isStarted,
    g: $data.isStarted,
    h: common_vendor.o((...args) => $options.startBeaconDiscovery && $options.startBeaconDiscovery(...args)),
    i: !$data.isStarted,
    j: common_vendor.o((...args) => $options.stopBeaconDiscovery && $options.stopBeaconDiscovery(...args)),
    k: $data.isStarted || $data.deviceList.length > 0
  }, $data.isStarted || $data.deviceList.length > 0 ? {
    l: common_vendor.t($data.deviceList.length)
  } : {}, {
    m: common_vendor.f($data.deviceList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.uuid),
        b: common_vendor.t(item.major),
        c: common_vendor.t(item.minor),
        d: common_vendor.t(item.rssi),
        e: common_vendor.t(item.accuracy),
        f: common_vendor.t(item.heading),
        g: item.uuid
      };
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/ibeacon/ibeacon.vue"]]);
wx.createPage(MiniProgramPage);
