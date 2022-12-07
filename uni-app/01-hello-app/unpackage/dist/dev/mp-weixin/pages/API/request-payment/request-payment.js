"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "request-payment",
      loading: false,
      price: 1,
      providerList: []
    };
  },
  onLoad: function() {
  },
  methods: {
    loginMpWeixin() {
      return new Promise((resolve, reject) => {
        common_vendor.index.login({
          provider: "weixin",
          success(res) {
            console.warn("\u6B64\u5904\u4F7F\u7528uni-id\u5904\u7406\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F\u767B\u5F55\uFF0C\u8BE6\u60C5\u53C2\u8003: https://uniapp.dcloud.net.cn/uniCloud/uni-id");
            common_vendor.index.request({
              url: "https://97fca9f2-41f6-449f-a35e-3f135d4c3875.bspapp.com/http/user-center",
              method: "POST",
              data: {
                action: "loginByWeixin",
                params: {
                  code: res.code,
                  platform: "mp-weixin"
                }
              },
              success(res2) {
                if (res2.data.code !== 0) {
                  reject(new Error("\u83B7\u53D6openid\u5931\u8D25\uFF1A", res2.result.msg));
                  return;
                }
                common_vendor.index.setStorageSync("openid", res2.data.openid);
                resolve(res2.data.openid);
              },
              fail(err) {
                reject(new Error("\u83B7\u53D6openid\u5931\u8D25\uFF1A" + err));
              }
            });
          },
          fail(err) {
            reject(err);
          }
        });
      });
    },
    async weixinPay() {
      let openid = common_vendor.index.getStorageSync("openid");
      console.log("\u53D1\u8D77\u652F\u4ED8");
      this.loading = true;
      if (!openid) {
        try {
          openid = await this.loginMpWeixin();
        } catch (e) {
          console.error(e);
        }
        if (!openid) {
          common_vendor.index.showModal({
            content: "\u83B7\u53D6openid\u5931\u8D25",
            showCancel: false
          });
          this.loading = false;
          return;
        }
      }
      this.openid = openid;
      let orderInfo = await this.getOrderInfo("wxpay");
      if (!orderInfo) {
        common_vendor.index.showModal({
          content: "\u83B7\u53D6\u652F\u4ED8\u4FE1\u606F\u5931\u8D25",
          showCancel: false
        });
        return;
      }
      common_vendor.index.requestPayment(__spreadProps(__spreadValues({}, orderInfo), {
        success: (res) => {
          common_vendor.index.showToast({
            title: "\u611F\u8C22\u60A8\u7684\u8D5E\u52A9!"
          });
        },
        fail: (res) => {
          common_vendor.index.showModal({
            content: "\u652F\u4ED8\u5931\u8D25,\u539F\u56E0\u4E3A: " + res.errMsg,
            showCancel: false
          });
        },
        complete: () => {
          this.loading = false;
        }
      }));
    },
    async requestPayment(e, index) {
      this.providerList[index].loading = true;
      const provider = e.id;
      let orderInfo = await this.getOrderInfo(provider);
      if (!orderInfo) {
        common_vendor.index.showModal({
          content: "\u83B7\u53D6\u652F\u4ED8\u4FE1\u606F\u5931\u8D25",
          showCancel: false
        });
        return;
      }
      console.log("--------orderInfo--------");
      console.log(orderInfo);
      common_vendor.index.requestPayment({
        provider,
        orderInfo,
        success: (e2) => {
          console.log("success", e2);
          common_vendor.index.showToast({
            title: "\u611F\u8C22\u60A8\u7684\u8D5E\u52A9!"
          });
        },
        fail: (e2) => {
          console.log("fail", e2);
          common_vendor.index.showModal({
            content: "\u652F\u4ED8\u5931\u8D25,\u539F\u56E0\u4E3A: " + e2.errMsg,
            showCancel: false
          });
        },
        complete: () => {
          this.providerList[index].loading = false;
        }
      });
    },
    getOrderInfo(provider) {
      return new Promise((resolve, reject) => {
        if (!this.price) {
          reject(new Error("\u8BF7\u8F93\u5165\u91D1\u989D"));
        }
        console.warn("\u6B64\u5904\u4F7F\u7528uni-pay\u5904\u7406\u652F\u4ED8\uFF0C\u8BE6\u60C5\u53C2\u8003: https://uniapp.dcloud.io/uniCloud/unipay");
        common_vendor.index.request({
          method: "POST",
          url: "https://97fca9f2-41f6-449f-a35e-3f135d4c3875.bspapp.com/http/pay",
          data: {
            provider,
            openid: this.openid,
            totalFee: Number(this.price) * 100,
            platform: "mp-weixin"
          },
          success(res) {
            if (res.data.code === 0) {
              resolve(res.data.orderInfo);
            } else {
              reject(new Error("\u83B7\u53D6\u652F\u4ED8\u4FE1\u606F\u5931\u8D25" + res.data.msg));
            }
          },
          fail(err) {
            reject(new Error("\u8BF7\u6C42\u652F\u4ED8\u63A5\u53E3\u5931\u8D25" + err));
          }
        });
      });
    },
    priceChange(e) {
      console.log(e.detail.value);
      this.price = e.detail.value;
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
    b: $data.price,
    c: common_vendor.o((...args) => $options.priceChange && $options.priceChange(...args)),
    d: common_vendor.o((...args) => $options.weixinPay && $options.weixinPay(...args)),
    e: $data.loading
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/request-payment/request-payment.vue"]]);
wx.createPage(MiniProgramPage);
