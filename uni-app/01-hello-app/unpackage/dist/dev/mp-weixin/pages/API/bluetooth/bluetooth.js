"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "bluetooth",
      disabled: [false, true, true, true, true, true, true, true, true, true, true],
      newDeviceLoad: false,
      searchLoad: false,
      maskShow: false,
      equipment: [],
      adapterState: {
        discovering: false,
        available: false
      },
      connected: false,
      showMaskType: "device",
      servicesData: [],
      characteristicsData: [],
      valueChangeData: {},
      isStop: true,
      list: []
    };
  },
  onLoad() {
    this.onBLEConnectionStateChange();
  },
  methods: {
    moveHandle() {
    },
    maskclose() {
      this.maskShow = false;
    },
    queryDevices() {
      this.showMaskType = "device";
      this.maskShow = true;
    },
    tapQuery(item) {
      if (this.showMaskType === "device") {
        this.$set(this.disabled, 4, false);
        if (this.equipment.length > 0) {
          this.equipment[0] = item;
        } else {
          this.equipment.push(item);
        }
        this.newDeviceLoad = false;
      }
      if (this.showMaskType === "service") {
        this.$set(this.disabled, 6, false);
        if (this.servicesData.length > 0) {
          this.servicesData[0] = item;
        } else {
          this.servicesData.push(item);
        }
      }
      if (this.showMaskType === "characteristics") {
        this.$set(this.disabled, 7, false);
        if (this.characteristicsData.length > 0) {
          this.characteristicsData[0] = item;
        } else {
          this.characteristicsData.push(item);
        }
      }
      this.maskShow = false;
    },
    openBluetoothAdapter() {
      common_vendor.index.openBluetoothAdapter({
        success: (e) => {
          console.log("\u521D\u59CB\u5316\u84DD\u7259\u6210\u529F:" + e.errMsg);
          console.log(JSON.stringify(e));
          this.isStop = false;
          this.$set(this.disabled, 0, true);
          this.$set(this.disabled, 1, false);
          this.$set(this.disabled, 10, false);
          this.getBluetoothAdapterState();
        },
        fail: (e) => {
          console.log(e);
          console.log("\u521D\u59CB\u5316\u84DD\u7259\u5931\u8D25\uFF0C\u9519\u8BEF\u7801\uFF1A" + (e.errCode || e.errMsg));
          if (e.errCode !== 0) {
            initTypes(e.errCode, e.errMsg);
          }
        }
      });
    },
    startBluetoothDevicesDiscovery() {
      common_vendor.index.startBluetoothDevicesDiscovery({
        success: (e) => {
          console.log("\u5F00\u59CB\u641C\u7D22\u84DD\u7259\u8BBE\u5907:" + e.errMsg);
          this.searchLoad = true;
          this.$set(this.disabled, 1, true);
          this.$set(this.disabled, 2, false);
          this.$set(this.disabled, 3, false);
          this.onBluetoothDeviceFound();
        },
        fail: (e) => {
          console.log("\u641C\u7D22\u84DD\u7259\u8BBE\u5907\u5931\u8D25\uFF0C\u9519\u8BEF\u7801\uFF1A" + e.errCode);
          if (e.errCode !== 0) {
            initTypes(e.errCode);
          }
        }
      });
    },
    stopBluetoothDevicesDiscovery(types) {
      common_vendor.index.stopBluetoothDevicesDiscovery({
        success: (e) => {
          console.log("\u505C\u6B62\u641C\u7D22\u84DD\u7259\u8BBE\u5907:" + e.errMsg);
          if (types) {
            this.$set(this.disabled, 1, true);
          } else {
            this.$set(this.disabled, 1, false);
          }
          this.$set(this.disabled, 2, true);
          this.searchLoad = false;
        },
        fail: (e) => {
          console.log("\u505C\u6B62\u641C\u7D22\u84DD\u7259\u8BBE\u5907\u5931\u8D25\uFF0C\u9519\u8BEF\u7801\uFF1A" + e.errCode);
          if (e.errCode !== 0) {
            initTypes(e.errCode);
          }
        }
      });
    },
    onBluetoothDeviceFound() {
      common_vendor.index.onBluetoothDeviceFound((devices) => {
        console.log("\u5F00\u59CB\u76D1\u542C\u5BFB\u627E\u5230\u65B0\u8BBE\u5907\u7684\u4E8B\u4EF6");
        this.getBluetoothDevices();
      });
    },
    getBluetoothDevices() {
      common_vendor.index.getBluetoothDevices({
        success: (res) => {
          this.newDeviceLoad = false;
          console.log("\u83B7\u53D6\u84DD\u7259\u8BBE\u5907\u6210\u529F:" + res.errMsg);
          this.list = res.devices;
        },
        fail: (e) => {
          console.log("\u83B7\u53D6\u84DD\u7259\u8BBE\u5907\u9519\u8BEF\uFF0C\u9519\u8BEF\u7801\uFF1A" + e.errCode);
          if (e.errCode !== 0) {
            initTypes(e.errCode);
          }
        }
      });
    },
    getBluetoothAdapterState() {
      console.log("--->");
      common_vendor.index.getBluetoothAdapterState({
        success: (res) => {
          console.log(JSON.stringify(res));
          this.adapterState = res;
        },
        fail: (e) => {
          console.log("\u83B7\u53D6\u672C\u673A\u84DD\u7259\u9002\u914D\u5668\u72B6\u6001\u5931\u8D25\uFF0C\u9519\u8BEF\u7801\uFF1A" + e.errCode);
          if (e.errCode !== 0) {
            initTypes(e.errCode);
          }
        }
      });
    },
    createBLEConnection() {
      let deviceId = this.equipment[0].deviceId;
      common_vendor.index.showToast({
        title: "\u8FDE\u63A5\u84DD\u7259...",
        icon: "loading",
        duration: 99999
      });
      common_vendor.index.createBLEConnection({
        deviceId,
        success: (res) => {
          console.log(res);
          console.log("\u8FDE\u63A5\u84DD\u7259\u6210\u529F:" + res.errMsg);
          this.stopBluetoothDevicesDiscovery(true);
          common_vendor.index.hideToast();
          common_vendor.index.showToast({
            title: "\u8FDE\u63A5\u6210\u529F",
            icon: "success",
            duration: 2e3
          });
          this.$set(this.disabled, 3, true);
          this.$set(this.disabled, 4, true);
          this.$set(this.disabled, 5, false);
          this.$set(this.disabled, 9, false);
          this.connected = true;
        },
        fail: (e) => {
          console.log("\u8FDE\u63A5\u4F4E\u529F\u8017\u84DD\u7259\u5931\u8D25\uFF0C\u9519\u8BEF\u7801\uFF1A" + e.errCode);
          if (e.errCode !== 0) {
            initTypes(e.errCode);
          }
        }
      });
    },
    closeBLEConnection() {
      let deviceId = this.equipment[0].deviceId;
      common_vendor.index.closeBLEConnection({
        deviceId,
        success: (res) => {
          console.log(res);
          console.log("\u65AD\u5F00\u4F4E\u529F\u8017\u84DD\u7259\u6210\u529F:" + res.errMsg);
          this.$set(this.disabled, 1, false);
          this.$set(this.disabled, 3, true);
          this.$set(this.disabled, 4, true);
          this.$set(this.disabled, 5, true);
          this.$set(this.disabled, 6, true);
          this.$set(this.disabled, 7, true);
          this.$set(this.disabled, 8, true);
          this.$set(this.disabled, 9, true);
          this.equipment = [];
          this.servicesData = [];
          this.characteristicsData = [];
        },
        fail: (e) => {
          console.log("\u65AD\u5F00\u4F4E\u529F\u8017\u84DD\u7259\u6210\u529F\uFF0C\u9519\u8BEF\u7801\uFF1A" + e.errCode);
          if (e.errCode !== 0) {
            initTypes(e.errCode);
          }
        }
      });
    },
    getBLEDeviceServices() {
      let deviceId = this.equipment[0].deviceId;
      console.log("\u83B7\u53D6\u6240\u6709\u670D\u52A1\u7684 uuid:" + deviceId);
      common_vendor.index.getBLEDeviceServices({
        deviceId,
        success: (res) => {
          console.log(JSON.stringify(res.services));
          console.log("\u83B7\u53D6\u8BBE\u5907\u670D\u52A1\u6210\u529F:" + res.errMsg);
          this.$set(this.disabled, 7, true);
          this.$set(this.disabled, 8, true);
          this.showMaskType = "service";
          this.list = res.services;
          this.characteristicsData = [];
          if (this.list.length <= 0) {
            toast("\u83B7\u53D6\u670D\u52A1\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5!");
            return;
          }
          this.maskShow = true;
        },
        fail: (e) => {
          console.log("\u83B7\u53D6\u8BBE\u5907\u670D\u52A1\u5931\u8D25\uFF0C\u9519\u8BEF\u7801\uFF1A" + e.errCode);
          if (e.errCode !== 0) {
            initTypes(e.errCode);
          }
        }
      });
    },
    getBLEDeviceCharacteristics() {
      let deviceId = this.equipment[0].deviceId;
      let serviceId = this.servicesData[0].uuid;
      console.log(deviceId);
      console.log(serviceId);
      common_vendor.index.getBLEDeviceCharacteristics({
        deviceId,
        serviceId,
        success: (res) => {
          console.log(JSON.stringify(res));
          console.log("\u83B7\u53D6\u7279\u5F81\u503C\u6210\u529F:" + res.errMsg);
          this.$set(this.disabled, 7, true);
          this.valueChangeData = {};
          this.showMaskType = "characteristics";
          this.list = res.characteristics;
          if (this.list.length <= 0) {
            toast("\u83B7\u53D6\u7279\u5F81\u503C\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5!");
            return;
          }
          this.maskShow = true;
        },
        fail: (e) => {
          console.log("\u83B7\u53D6\u7279\u5F81\u503C\u5931\u8D25\uFF0C\u9519\u8BEF\u7801\uFF1A" + e.errCode);
          if (e.errCode !== 0) {
            initTypes(e.errCode);
          }
        }
      });
    },
    onBLEConnectionStateChange() {
      common_vendor.index.onBLEConnectionStateChange((res) => {
        console.log(`\u84DD\u7259\u8FDE\u63A5\u72B6\u6001 -------------------------->`);
        console.log(JSON.stringify(res));
        if (!res.connected) {
          if (this.isStop)
            return;
          console.log("\u65AD\u5F00\u4F4E\u529F\u8017\u84DD\u7259\u6210\u529F:");
          this.$set(this.disabled, 1, false);
          this.$set(this.disabled, 3, true);
          this.$set(this.disabled, 4, true);
          this.$set(this.disabled, 5, true);
          this.$set(this.disabled, 6, true);
          this.$set(this.disabled, 7, true);
          this.$set(this.disabled, 8, true);
          this.$set(this.disabled, 9, true);
          this.searchLoad = false;
          this.equipment = [];
          this.servicesData = [];
          this.characteristicsData = [];
          this.valueChangeData = {};
          toast("\u5DF2\u7ECF\u65AD\u5F00\u5F53\u524D\u84DD\u7259\u8FDE\u63A5");
        }
      });
    },
    readBLECharacteristicValue() {
      let deviceId = this.equipment[0].deviceId;
      let serviceId = this.servicesData[0].uuid;
      let characteristicId = this.characteristicsData[0].uuid;
      console.log(deviceId);
      console.log(serviceId);
      console.log(characteristicId);
      common_vendor.index.readBLECharacteristicValue({
        deviceId,
        serviceId,
        characteristicId,
        success: (res) => {
          console.log("\u8BFB\u53D6\u8BBE\u5907\u6570\u636E\u503C\u6210\u529F");
          console.log(JSON.stringify(res));
          this.notifyBLECharacteristicValueChange();
        },
        fail(e) {
          console.log("\u8BFB\u53D6\u8BBE\u5907\u6570\u636E\u503C\u5931\u8D25\uFF0C\u9519\u8BEF\u7801\uFF1A" + e.errCode);
          if (e.errCode !== 0) {
            initTypes(e.errCode);
          }
        }
      });
      this.onBLECharacteristicValueChange();
    },
    onBLECharacteristicValueChange() {
      common_vendor.index.onBLECharacteristicValueChange((characteristic) => {
        console.log("\u76D1\u542C\u4F4E\u529F\u8017\u84DD\u7259\u8BBE\u5907\u7684\u7279\u5F81\u503C\u53D8\u5316\u4E8B\u4EF6\u6210\u529F");
        console.log(JSON.stringify(characteristic));
        this.valueChangeData = characteristic;
      });
    },
    notifyBLECharacteristicValueChange() {
      let deviceId = this.equipment[0].deviceId;
      let serviceId = this.servicesData[0].uuid;
      let characteristicId = this.characteristicsData[0].uuid;
      let notify = this.characteristicsData[0].properties.notify;
      console.log(deviceId);
      console.log(serviceId);
      console.log(characteristicId);
      console.log(notify);
      common_vendor.index.notifyBLECharacteristicValueChange({
        state: true,
        deviceId,
        serviceId,
        characteristicId,
        success(res) {
          console.log("notifyBLECharacteristicValueChange success:" + res.errMsg);
          console.log(JSON.stringify(res));
        }
      });
    },
    closeBluetoothAdapter(OBJECT) {
      common_vendor.index.closeBluetoothAdapter({
        success: (res) => {
          console.log("\u65AD\u5F00\u84DD\u7259\u6A21\u5757\u6210\u529F");
          this.isStop = true;
          this.$set(this.disabled, 0, false);
          this.$set(this.disabled, 1, true);
          this.$set(this.disabled, 2, true);
          this.$set(this.disabled, 3, true);
          this.$set(this.disabled, 4, true);
          this.$set(this.disabled, 5, true);
          this.$set(this.disabled, 6, true);
          this.$set(this.disabled, 7, true);
          this.$set(this.disabled, 8, true);
          this.$set(this.disabled, 9, true);
          this.$set(this.disabled, 10, true);
          this.equipment = [];
          this.servicesData = [];
          this.characteristicsData = [];
          this.valueChangeData = {};
          this.adapterState = [];
          this.searchLoad = false;
          toast("\u65AD\u5F00\u84DD\u7259\u6A21\u5757");
        }
      });
    }
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
    b: $data.disabled[0],
    c: common_vendor.o((...args) => $options.openBluetoothAdapter && $options.openBluetoothAdapter(...args)),
    d: !$data.adapterState.available
  }, !$data.adapterState.available ? {
    e: common_vendor.t("\u84DD\u7259\u9002\u914D\u5668\u4E0D\u53EF\u7528,\u8BF7\u521D\u59CB\u5316\u84DD\u7259\u6A21\u5757")
  } : {}, {
    f: $data.searchLoad,
    g: $data.disabled[1],
    h: common_vendor.o((...args) => $options.startBluetoothDevicesDiscovery && $options.startBluetoothDevicesDiscovery(...args)),
    i: $data.disabled[2],
    j: common_vendor.o(($event) => $options.stopBluetoothDevicesDiscovery(false)),
    k: $data.newDeviceLoad,
    l: $data.disabled[3],
    m: common_vendor.o((...args) => $options.queryDevices && $options.queryDevices(...args)),
    n: $data.equipment.length > 0
  }, $data.equipment.length > 0 ? {
    o: common_vendor.t(($data.connected ? "\u5DF2\u8FDE\u63A5\u8BBE\u5907" : "\u5DF2\u9009\u62E9\u8BBE\u5907") + " : " + $data.equipment[0].name + " (" + $data.equipment[0].deviceId + ")")
  } : {}, {
    p: $data.disabled[4],
    q: common_vendor.o((...args) => $options.createBLEConnection && $options.createBLEConnection(...args)),
    r: $data.disabled[5],
    s: common_vendor.o((...args) => $options.getBLEDeviceServices && $options.getBLEDeviceServices(...args)),
    t: $data.servicesData.length > 0
  }, $data.servicesData.length > 0 ? {
    v: common_vendor.t($data.servicesData[0].uuid)
  } : {}, {
    w: $data.disabled[6],
    x: common_vendor.o((...args) => $options.getBLEDeviceCharacteristics && $options.getBLEDeviceCharacteristics(...args)),
    y: $data.characteristicsData.length > 0
  }, $data.characteristicsData.length > 0 ? {
    z: common_vendor.t($data.characteristicsData[0].uuid),
    A: common_vendor.t($data.characteristicsData[0].properties.read),
    B: common_vendor.t($data.characteristicsData[0].properties.write),
    C: common_vendor.t($data.characteristicsData[0].properties.notify),
    D: common_vendor.t($data.characteristicsData[0].properties.indicate)
  } : {}, {
    E: $data.disabled[9],
    F: common_vendor.o((...args) => $options.closeBLEConnection && $options.closeBLEConnection(...args)),
    G: $data.disabled[10],
    H: common_vendor.o((...args) => $options.closeBluetoothAdapter && $options.closeBluetoothAdapter(...args)),
    I: $data.maskShow
  }, $data.maskShow ? {
    J: common_vendor.t($data.list.length),
    K: common_vendor.t($data.showMaskType === "device" ? "\u53F0\u8BBE\u5907" : "\u4E2A\u670D\u52A1"),
    L: common_vendor.f($data.list, (item, index, i0) => {
      return common_vendor.e($data.showMaskType === "device" ? {
        a: common_vendor.t(item.name || item.localName),
        b: common_vendor.t(item.RSSI),
        c: common_vendor.t(item.deviceId)
      } : {}, $data.showMaskType === "service" ? common_vendor.e({
        d: common_vendor.t(item.uuid),
        e: $data.showMaskType === "service"
      }, $data.showMaskType === "service" ? {
        f: common_vendor.t(item.isPrimary ? "\uFF08\u4E3B\u670D\u52A1\uFF09" : "")
      } : {}) : {}, $data.showMaskType === "characteristics" ? {
        g: common_vendor.t(item.uuid),
        h: common_vendor.t(item.properties.read),
        i: common_vendor.t(item.properties.write),
        j: common_vendor.t(item.properties.notify),
        k: common_vendor.t(item.properties.indicate)
      } : {}, {
        l: index,
        m: common_vendor.o(($event) => $options.tapQuery(item), index)
      });
    }),
    M: $data.showMaskType === "device",
    N: $data.showMaskType === "service",
    O: $data.showMaskType === "characteristics",
    P: common_vendor.o((...args) => $options.moveHandle && $options.moveHandle(...args)),
    Q: common_vendor.o((...args) => $options.moveHandle && $options.moveHandle(...args)),
    R: common_vendor.o((...args) => $options.moveHandle && $options.moveHandle(...args)),
    S: common_vendor.o((...args) => $options.maskclose && $options.maskclose(...args))
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/bluetooth/bluetooth.vue"]]);
wx.createPage(MiniProgramPage);
