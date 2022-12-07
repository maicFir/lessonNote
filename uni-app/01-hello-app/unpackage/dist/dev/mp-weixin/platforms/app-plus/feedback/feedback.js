"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      msgContents: ["\u754C\u9762\u663E\u793A\u9519\u4E71", "\u542F\u52A8\u7F13\u6162\uFF0C\u5361\u51FA\u7FD4\u4E86", "UI\u65E0\u6CD5\u76F4\u89C6\uFF0C\u4E11\u54ED\u4E86", "\u5076\u53D1\u6027\u5D29\u6E83"],
      stars: [1, 2, 3, 4, 5],
      imageList: [],
      sendDate: {
        score: 0,
        content: "",
        contact: ""
      }
    };
  },
  onLoad() {
    this.deviceInfo = {
      appid: "__UNI__5D0B0CA",
      imei: plus.device.imei,
      p: plus.os.name === "Android" ? "a" : "i",
      md: plus.device.model,
      app_version: plus.runtime.version,
      plus_version: plus.runtime.innerVersion,
      os: plus.os.version,
      net: "" + plus.networkinfo.getCurrentType()
    };
    this.sendDate = Object.assign(this.deviceInfo, this.sendDate);
  },
  methods: {
    close(e) {
      this.imageList.splice(e, 1);
    },
    chooseMsg() {
      common_vendor.index.showActionSheet({
        itemList: this.msgContents,
        success: (res) => {
          this.sendDate.content = this.msgContents[res.tapIndex];
        }
      });
    },
    chooseImg() {
      common_vendor.index.chooseImage({
        sourceType: ["camera", "album"],
        sizeType: "compressed",
        count: 5 - this.imageList.length,
        success: (res) => {
          this.imageList = this.imageList.concat(res.tempFilePaths);
        }
      });
    },
    chooseStar(e) {
      this.sendDate.score = e;
    },
    previewImage(index) {
      common_vendor.index.previewImage({
        urls: this.imageList,
        current: this.imageList[index]
      });
    },
    send() {
      if (this.sendDate.content.length === 0) {
        common_vendor.index.showModal({
          content: "\u8BF7\u8F93\u5165\u95EE\u9898\u548C\u610F\u89C1",
          showCancel: false
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "\u4E0A\u4F20\u4E2D..."
      });
      let imgs = this.imageList.map((value, index) => {
        return {
          name: "images" + index,
          uri: value
        };
      });
      this.request(this.sendDate, imgs).then((res) => {
        if (typeof res.data === "string") {
          res.data = JSON.parse(res.data);
        }
        if (res.statusCode === 200 && res.data && res.data.ret === 0) {
          common_vendor.index.showModal({
            content: "\u53CD\u9988\u6210\u529F",
            showCancel: false
          });
          this.imageList = [];
          this.sendDate = Object.assign(this.deviceInfo, {
            score: 0,
            content: "",
            contact: ""
          });
        } else if (res.statusCode !== 200) {
          common_vendor.index.showModal({
            content: "\u53CD\u9988\u5931\u8D25\uFF0C\u9519\u8BEF\u7801\u4E3A\uFF1A" + res.statusCode,
            showCancel: false
          });
        } else {
          common_vendor.index.showModal({
            content: "\u53CD\u9988\u5931\u8D25",
            showCancel: false
          });
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    request(sendDate, imgs) {
      return new Promise((resolve, reject) => {
        let fromData = {
          url: "https://service.dcloud.net.cn/feedback",
          success: (res) => {
            resolve(res);
          },
          fail: (res) => {
            reject(res);
          },
          complete() {
            common_vendor.index.hideLoading();
          }
        };
        if (imgs.length > 0) {
          fromData.files = imgs;
          fromData.formData = sendDate;
          common_vendor.index.uploadFile(fromData);
        } else {
          fromData.data = sendDate;
          fromData.method = "POST";
          common_vendor.index.request(fromData);
        }
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_rate2 = common_vendor.resolveComponent("uni-rate");
  _easycom_uni_rate2();
}
const _easycom_uni_rate = () => "../../../uni_modules/uni-rate/components/uni-rate/uni-rate.js";
if (!Math) {
  _easycom_uni_rate();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.chooseMsg && $options.chooseMsg(...args)),
    b: $data.sendDate.content,
    c: common_vendor.o(($event) => $data.sendDate.content = $event.detail.value),
    d: common_vendor.t($data.imageList.length),
    e: common_vendor.f($data.imageList, (image, index, i0) => {
      return {
        a: image,
        b: common_vendor.o(($event) => $options.previewImage(index)),
        c: common_vendor.o(($event) => $options.close(index)),
        d: index
      };
    }),
    f: common_vendor.o((...args) => $options.chooseImg && $options.chooseImg(...args)),
    g: $data.imageList.length < 5,
    h: $data.sendDate.contact,
    i: common_vendor.o(($event) => $data.sendDate.contact = $event.detail.value),
    j: common_vendor.o(($event) => $data.sendDate.score = $event),
    k: common_vendor.p({
      color: "#bbb",
      modelValue: $data.sendDate.score
    }),
    l: common_vendor.o((...args) => $options.send && $options.send(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/platforms/app-plus/feedback/feedback.vue"]]);
wx.createPage(MiniProgramPage);
