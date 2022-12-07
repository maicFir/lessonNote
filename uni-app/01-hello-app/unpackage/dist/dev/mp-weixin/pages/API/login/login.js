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
const univerifyInfoKey = "univerifyInfo";
const _sfc_main = {
  data() {
    return {
      title: "login",
      providerList: [],
      phoneNumber: "",
      univerifyBtnLoading: false
    };
  },
  computed: __spreadValues({}, common_vendor.mapState(["hasLogin", "isUniverifyLogin", "univerifyErrorMsg"])),
  onLoad() {
    common_vendor.index.getProvider({
      service: "oauth",
      success: (result) => {
        this.providerList = result.provider.map((value) => {
          let providerName = "";
          switch (value) {
            case "weixin":
              providerName = "\u5FAE\u4FE1\u767B\u5F55";
              break;
            case "qq":
              providerName = "QQ\u767B\u5F55";
              break;
            case "sinaweibo":
              providerName = "\u65B0\u6D6A\u5FAE\u535A\u767B\u5F55";
              break;
            case "xiaomi":
              providerName = "\u5C0F\u7C73\u767B\u5F55";
              break;
            case "alipay":
              providerName = "\u652F\u4ED8\u5B9D\u767B\u5F55";
              break;
            case "baidu":
              providerName = "\u767E\u5EA6\u767B\u5F55";
              break;
            case "jd":
              providerName = "\u4EAC\u4E1C\u767B\u5F55";
              break;
            case "toutiao":
              providerName = "\u5934\u6761\u767B\u5F55";
              break;
            case "apple":
              providerName = "\u82F9\u679C\u767B\u5F55";
              break;
            case "univerify":
              providerName = "\u4E00\u952E\u767B\u5F55";
              break;
          }
          return {
            name: providerName,
            id: value
          };
        });
      },
      fail: (error) => {
        console.log("\u83B7\u53D6\u767B\u5F55\u901A\u9053\u5931\u8D25", error);
      }
    });
    if (this.hasLogin && this.isUniverifyLogin) {
      this.getPhoneNumber(common_vendor.index.getStorageSync(univerifyInfoKey)).then((phoneNumber) => {
        this.phoneNumber = phoneNumber;
      });
    }
  },
  methods: __spreadProps(__spreadValues(__spreadValues({}, common_vendor.mapMutations(["login", "setUniverifyLogin"])), common_vendor.mapActions(["getPhoneNumber"])), {
    Toast(data, duration = 1e3) {
      common_vendor.index.showToast(Object.assign({}, data, {
        duration
      }));
    },
    tologin(provider) {
      if (provider.id === "univerify") {
        this.univerifyBtnLoading = true;
      }
      common_vendor.index.login({
        provider: provider.id,
        success: async (res) => {
          console.log("login success:", res);
          this.Toast({
            title: "\u767B\u5F55\u6210\u529F"
          });
          this.login(provider.id);
          console.warn("\u5982\u9700\u83B7\u53D6openid\u8BF7\u53C2\u8003uni-id: https://uniapp.dcloud.net.cn/uniCloud/uni-id");
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
              console.log(res2);
              if (res2.data.code !== 0) {
                console.log("\u83B7\u53D6openid\u5931\u8D25\uFF1A", res2.data.errMsg);
                return;
              }
              common_vendor.index.setStorageSync("openid", res2.data.openid);
            },
            fail(err) {
              console.log("\u83B7\u53D6openid\u5931\u8D25\uFF1A", err);
            }
          });
        },
        fail: (err) => {
          console.log("login fail:", err);
          if (err.code == "30002") {
            common_vendor.index.closeAuthView();
            this.Toast({
              title: "\u5176\u4ED6\u767B\u5F55\u65B9\u5F0F"
            });
            return;
          }
          if (err.code == 1e3) {
            common_vendor.index.showModal({
              title: "\u767B\u5F55\u5931\u8D25",
              content: `${err.errMsg}
\uFF0C\u9519\u8BEF\u7801\uFF1A${err.code}`,
              confirmText: "\u5F00\u901A\u6307\u5357",
              cancelText: "\u786E\u5B9A",
              success: (res) => {
                if (res.confirm) {
                  setTimeout(() => {
                    plus.runtime.openWeb("https://ask.dcloud.net.cn/article/37965");
                  }, 500);
                }
              }
            });
            return;
          }
          if (err.code == "30005") {
            common_vendor.index.showModal({
              showCancel: false,
              title: "\u9884\u767B\u5F55\u5931\u8D25",
              content: this.univerifyErrorMsg || err.errMsg
            });
            return;
          }
          if (err.code != "30003") {
            common_vendor.index.showModal({
              showCancel: false,
              title: "\u767B\u5F55\u5931\u8D25",
              content: JSON.stringify(err)
            });
          }
        },
        complete: () => {
          this.univerifyBtnLoading = false;
        }
      });
    },
    loginByUniverify(provider, res) {
      this.setUniverifyLogin(true);
      common_vendor.index.closeAuthView();
      const univerifyInfo = __spreadValues({
        provider
      }, res.authResult);
      this.getPhoneNumber(univerifyInfo).then((phoneNumber) => {
        this.phoneNumber = phoneNumber;
        common_vendor.index.setStorageSync(univerifyInfoKey, univerifyInfo);
      }).catch((err) => {
        common_vendor.index.showModal({
          showCancel: false,
          title: "\u624B\u673A\u53F7\u83B7\u53D6\u5931\u8D25",
          content: `${err.errMsg}
\uFF0C\u9519\u8BEF\u7801\uFF1A${err.code}`
        });
        console.error(res);
      });
    },
    async loginByApple(provider, res) {
      let getUserInfoErr, result;
      try {
        result = await common_vendor.index.getUserInfo({
          provider
        });
      } catch (e) {
        getUserInfoErr = e;
      }
      if (getUserInfoErr) {
        let content = getUserInfoErr.errMsg;
        if (~content.indexOf("uni.login")) {
          content = "\u8BF7\u5728\u767B\u5F55\u9875\u9762\u5B8C\u6210\u767B\u5F55\u64CD\u4F5C";
        }
        common_vendor.index.showModal({
          title: "\u83B7\u53D6\u7528\u6237\u4FE1\u606F\u5931\u8D25",
          content: "\u9519\u8BEF\u539F\u56E0" + content,
          showCancel: false
        });
      }
      console.warn("\u6B64\u5904\u4F7F\u7528uni-id\u5904\u7406\u82F9\u679C\u767B\u5F55\uFF0C\u8BE6\u60C5\u53C2\u8003: https://uniapp.dcloud.net.cn/uniCloud/uni-id");
      common_vendor.index.request({
        url: "https://97fca9f2-41f6-449f-a35e-3f135d4c3875.bspapp.com/http/user-center",
        method: "POST",
        data: {
          action: "loginByApple",
          params: result.userInfo
        },
        success: (res2) => {
          console.log("uniId login success", res2);
          if (res2.data.code !== 0) {
            common_vendor.index.showModal({
              showCancel: false,
              content: `\u82F9\u679C\u767B\u5F55\u5931\u8D25: ${JSON.stringify(res2.data.msg)}`
            });
          } else {
            common_vendor.index.setStorageSync("openid", res2.data.openid);
            common_vendor.index.setStorageSync("apple_nickname", res2.data.userInfo.nickname);
          }
        },
        fail: (e) => {
          common_vendor.index.showModal({
            content: `\u82F9\u679C\u767B\u5F55\u5931\u8D25: ${JSON.stringify(e)}`,
            showCancel: false
          });
        }
      });
    }
  })
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
    b: _ctx.hasLogin === true
  }, _ctx.hasLogin === true ? common_vendor.e({
    c: _ctx.isUniverifyLogin
  }, _ctx.isUniverifyLogin ? common_vendor.e({
    d: !$data.phoneNumber.length
  }, !$data.phoneNumber.length ? {} : {
    e: common_vendor.t($data.phoneNumber)
  }) : {}) : {}, {
    f: _ctx.hasLogin === false
  }, _ctx.hasLogin === false ? {} : {}, {
    g: common_vendor.f($data.providerList, (value, key, i0) => {
      return {
        a: common_vendor.t(value.name),
        b: common_vendor.o(($event) => $options.tologin(value), key),
        c: value.id === "univerify" ? $data.univerifyBtnLoading : false,
        d: key
      };
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/login/login.vue"]]);
wx.createPage(MiniProgramPage);
