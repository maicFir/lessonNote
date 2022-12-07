"use strict";
var common_vendor = require("../../../common/vendor.js");
var common_assets = require("../../../common/assets.js");
const localFilePathKey = "UNI_ADMIN_UPGRADE_CENTER_LOCAL_FILE_PATH";
const platform_iOS = "iOS";
let downloadTask = null;
let openSchemePromise;
function compare(v1 = "0", v2 = "0") {
  v1 = String(v1).split(".");
  v2 = String(v2).split(".");
  const minVersionLens = Math.min(v1.length, v2.length);
  let result = 0;
  for (let i = 0; i < minVersionLens; i++) {
    const curV1 = Number(v1[i]);
    const curV2 = Number(v2[i]);
    if (curV1 > curV2) {
      result = 1;
      break;
    } else if (curV1 < curV2) {
      result = -1;
      break;
    }
  }
  if (result === 0 && v1.length !== v2.length) {
    const v1BiggerThenv2 = v1.length > v2.length;
    const maxLensVersion = v1BiggerThenv2 ? v1 : v2;
    for (let i = minVersionLens; i < maxLensVersion.length; i++) {
      const curVersion = Number(maxLensVersion[i]);
      if (curVersion > 0) {
        v1BiggerThenv2 ? result = 1 : result = -1;
        break;
      }
    }
  }
  return result;
}
const _sfc_main = {
  data() {
    return {
      installForBeforeFilePath: "",
      installed: false,
      installing: false,
      downloadSuccess: false,
      downloading: false,
      downLoadPercent: 0,
      downloadedSize: 0,
      packageFileSize: 0,
      tempFilePath: "",
      title: "\u66F4\u65B0\u65E5\u5FD7",
      contents: "",
      is_mandatory: false,
      subTitle: "\u53D1\u73B0\u65B0\u7248\u672C",
      downLoadBtnTextiOS: "\u7ACB\u5373\u8DF3\u8F6C\u66F4\u65B0",
      downLoadBtnText: "\u7ACB\u5373\u4E0B\u8F7D\u66F4\u65B0",
      downLoadingText: "\u5B89\u88C5\u5305\u4E0B\u8F7D\u4E2D\uFF0C\u8BF7\u7A0D\u540E"
    };
  },
  onLoad({
    local_storage_key
  }) {
    if (!local_storage_key) {
      console.error("local_storage_key\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u540E\u91CD\u8BD5");
      common_vendor.index.navigateBack();
      return;
    }
    const localPackageInfo = common_vendor.index.getStorageSync(local_storage_key);
    if (!localPackageInfo) {
      console.error("\u5B89\u88C5\u5305\u4FE1\u606F\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u540E\u91CD\u8BD5");
      common_vendor.index.navigateBack();
      return;
    }
    const requiredKey = ["version", "url", "type"];
    for (let key in localPackageInfo) {
      if (requiredKey.indexOf(key) !== -1 && !localPackageInfo[key]) {
        console.error(`\u53C2\u6570 ${key} \u5FC5\u586B\uFF0C\u8BF7\u68C0\u67E5\u540E\u91CD\u8BD5`);
        common_vendor.index.navigateBack();
        return;
      }
    }
    Object.assign(this, localPackageInfo);
    this.checkLocalStoragePackage();
  },
  onBackPress() {
    if (this.is_mandatory) {
      return true;
    }
    downloadTask && downloadTask.abort();
  },
  onHide() {
    openSchemePromise = null;
  },
  computed: {
    isWGT() {
      return this.type === "wgt";
    },
    isiOS() {
      return !this.isWGT ? this.platform.includes(platform_iOS) : false;
    },
    isAppStore() {
      return this.isiOS || !this.isiOS && !this.isWGT && this.url.indexOf(".apk") === -1;
    }
  },
  methods: {
    checkLocalStoragePackage() {
      const localFilePathRecord = common_vendor.index.getStorageSync(localFilePathKey);
      if (localFilePathRecord) {
        const {
          version,
          savedFilePath,
          installed
        } = localFilePathRecord;
        if (!installed && compare(version, this.version) === 0) {
          this.downloadSuccess = true;
          this.installForBeforeFilePath = savedFilePath;
          this.tempFilePath = savedFilePath;
        } else {
          this.deleteSavedFile(savedFilePath);
        }
      }
    },
    async closeUpdate() {
      if (this.downloading) {
        if (this.is_mandatory) {
          return common_vendor.index.showToast({
            title: "\u4E0B\u8F7D\u4E2D\uFF0C\u8BF7\u7A0D\u540E\u2026\u2026",
            icon: "none",
            duration: 500
          });
        }
        common_vendor.index.showModal({
          title: "\u662F\u5426\u53D6\u6D88\u4E0B\u8F7D\uFF1F",
          cancelText: "\u5426",
          confirmText: "\u662F",
          success: (res) => {
            if (res.confirm) {
              downloadTask && downloadTask.abort();
              common_vendor.index.navigateBack();
            }
          }
        });
        return;
      }
      if (this.downloadSuccess && this.tempFilePath) {
        await this.saveFile(this.tempFilePath, this.version);
        common_vendor.index.navigateBack();
        return;
      }
      common_vendor.index.navigateBack();
    },
    updateApp() {
      this.checkStoreScheme().catch(() => {
        this.downloadPackage();
      });
    },
    checkStoreScheme() {
      if (this.store_list && this.store_list.length) {
        this.store_list.filter((item) => item.enable).sort((cur, next) => next.priority - cur.priority).map((item) => item.scheme).reduce((promise, cur, curIndex) => {
          openSchemePromise = (promise || (promise = Promise.reject())).catch(() => {
            return new Promise((resolve, reject) => {
              plus.runtime.openURL(cur, (err) => {
                reject(err);
              });
            });
          });
          return openSchemePromise;
        }, openSchemePromise);
        return openSchemePromise;
      }
      return Promise.reject();
    },
    downloadPackage() {
      this.downloading = true;
      downloadTask = common_vendor.index.downloadFile({
        url: this.url,
        success: (res) => {
          if (res.statusCode == 200) {
            this.downloadSuccess = true;
            this.tempFilePath = res.tempFilePath;
            if (this.is_mandatory) {
              this.installPackage();
            }
          }
        },
        complete: () => {
          this.downloading = false;
          this.downLoadPercent = 0;
          this.downloadedSize = 0;
          this.packageFileSize = 0;
          downloadTask = null;
        }
      });
      downloadTask.onProgressUpdate((res) => {
        this.downLoadPercent = res.progress;
        this.downloadedSize = (res.totalBytesWritten / Math.pow(1024, 2)).toFixed(2);
        this.packageFileSize = (res.totalBytesExpectedToWrite / Math.pow(1024, 2)).toFixed(2);
      });
    },
    installPackage() {
    },
    restart() {
      this.installed = false;
    },
    saveFile(tempFilePath, version) {
      return new Promise((resolve, reject) => {
        common_vendor.index.saveFile({
          tempFilePath,
          success({
            savedFilePath
          }) {
            common_vendor.index.setStorageSync(localFilePathKey, {
              version,
              savedFilePath
            });
          },
          complete() {
            resolve();
          }
        });
      });
    },
    deleteSavedFile(filePath) {
      common_vendor.index.removeStorageSync(localFilePathKey);
      return common_vendor.index.removeSavedFile({
        filePath
      });
    },
    jumpToAppStore() {
      plus.runtime.openURL(this.url);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.title),
    b: common_assets._imports_0,
    c: common_vendor.t($data.subTitle),
    d: common_vendor.t($data.contents),
    e: $options.isAppStore
  }, $options.isAppStore ? {
    f: common_vendor.t($data.downLoadBtnTextiOS),
    g: common_vendor.o((...args) => $options.jumpToAppStore && $options.jumpToAppStore(...args))
  } : common_vendor.e({
    h: !$data.downloadSuccess
  }, !$data.downloadSuccess ? common_vendor.e({
    i: $data.downloading
  }, $data.downloading ? {
    j: $data.downLoadPercent,
    k: common_vendor.t($data.downLoadingText),
    l: common_vendor.t($data.downloadedSize),
    m: common_vendor.t($data.packageFileSize)
  } : {
    n: common_vendor.t($data.downLoadBtnText),
    o: common_vendor.o((...args) => $options.updateApp && $options.updateApp(...args))
  }) : $data.downloadSuccess && !$data.installed ? {
    q: common_vendor.t($data.installing ? "\u6B63\u5728\u5B89\u88C5\u2026\u2026" : "\u4E0B\u8F7D\u5B8C\u6210\uFF0C\u7ACB\u5373\u5B89\u88C5"),
    r: $data.installing,
    s: $data.installing,
    t: common_vendor.o((...args) => $options.installPackage && $options.installPackage(...args))
  } : {}, {
    p: $data.downloadSuccess && !$data.installed,
    v: $data.installed && $options.isWGT
  }, $data.installed && $options.isWGT ? {
    w: common_vendor.o((...args) => $options.restart && $options.restart(...args))
  } : {}), {
    x: !$data.is_mandatory
  }, !$data.is_mandatory ? {
    y: common_assets._imports_1,
    z: common_vendor.o((...args) => $options.closeUpdate && $options.closeUpdate(...args))
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-upgrade-center-app/pages/upgrade-popup.vue"]]);
wx.createPage(MiniProgramPage);
