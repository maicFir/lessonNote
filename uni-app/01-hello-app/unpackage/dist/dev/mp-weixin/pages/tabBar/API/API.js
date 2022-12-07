"use strict";
var common_vendor = require("../../../common/vendor.js");
const setTabBar = () => "../../../components/api-set-tabbar.js";
const _sfc_main = {
  components: {
    setTabBar
  },
  props: {
    hasLeftWin: {
      type: Boolean
    },
    leftWinActive: {
      type: String
    }
  },
  data() {
    let mediaPages = [
      {
        name: "\u56FE\u7247",
        url: "image"
      },
      {
        name: "\u97F3\u9891",
        url: "inner-audio"
      },
      {
        name: "\u5F55\u97F3",
        url: "voice"
      },
      {
        name: "\u80CC\u666F\u97F3\u9891",
        url: "background-audio"
      },
      {
        name: "\u89C6\u9891",
        url: "video"
      },
      {
        name: "\u6587\u4EF6",
        url: "file"
      },
      {
        name: "\u4FDD\u5B58\u5A92\u4F53\u5230\u672C\u5730",
        url: "save-media"
      }
    ];
    const list = [
      {
        id: "page",
        name: "\u754C\u9762",
        open: false,
        pages: [
          {
            name: "\u8BBE\u7F6E\u5BFC\u822A\u6761",
            url: "set-navigation-bar-title"
          },
          {
            name: "\u9875\u9762\u8DF3\u8F6C",
            url: "navigator"
          },
          {
            name: "\u8BBE\u7F6ETabBar",
            url: "set-tabbar"
          },
          {
            name: "\u4E0B\u62C9\u5237\u65B0",
            url: "pull-down-refresh"
          },
          {
            name: "\u521B\u5EFA\u52A8\u753B",
            url: "animation"
          },
          {
            name: "\u521B\u5EFA\u7ED8\u753B",
            url: "canvas"
          },
          {
            name: "\u8282\u70B9\u4FE1\u606F",
            url: "get-node-info"
          },
          {
            name: "\u8282\u70B9\u5E03\u5C40\u4EA4\u4E92\u72B6\u6001",
            url: "intersection-observer"
          },
          {
            name: "\u663E\u793A\u64CD\u4F5C\u83DC\u5355",
            url: "action-sheet"
          },
          {
            name: "\u663E\u793A\u6A21\u6001\u5F39\u7A97",
            url: "modal"
          },
          {
            name: "\u663E\u793A\u52A0\u8F7D\u63D0\u793A\u6846",
            url: "show-loading"
          },
          {
            name: "\u663E\u793A\u6D88\u606F\u63D0\u793A\u6846",
            url: "toast"
          }
        ]
      },
      {
        id: "device",
        name: "\u8BBE\u5907",
        open: false,
        pages: [
          {
            name: "\u83B7\u53D6\u8BBE\u5907\u7F51\u7EDC\u72B6\u6001",
            url: "get-network-type"
          },
          {
            name: "\u83B7\u53D6\u8BBE\u5907\u7CFB\u7EDF\u4FE1\u606F",
            url: "get-system-info"
          },
          {
            name: "\u6253\u7535\u8BDD",
            url: "make-phone-call"
          },
          {
            name: "\u9707\u52A8",
            url: "vibrate"
          },
          {
            name: "\u6DFB\u52A0\u624B\u673A\u8054\u7CFB\u4EBA",
            url: "add-phone-contact"
          },
          {
            name: "\u626B\u7801",
            url: "scan-code"
          },
          {
            name: "\u526A\u8D34\u677F",
            url: "clipboard"
          },
          {
            name: "\u5C4F\u5E55\u4EAE\u5EA6",
            url: "brightness"
          },
          {
            name: "\u84DD\u7259",
            url: "bluetooth"
          },
          {
            name: "\u751F\u7269\u8BA4\u8BC1",
            url: "soter"
          },
          {
            name: "iBeacon",
            url: "ibeacon"
          },
          {
            name: "\u76D1\u542C\u52A0\u901F\u5EA6\u4F20\u611F\u5668",
            url: "on-accelerometer-change"
          },
          {
            name: "\u76D1\u542C\u7F57\u76D8\u6570\u636E",
            url: "on-compass-change"
          }
        ]
      },
      {
        id: "network",
        name: "\u7F51\u7EDC",
        open: false,
        pages: [
          {
            name: "\u53D1\u8D77\u4E00\u4E2A\u8BF7\u6C42",
            url: "request"
          },
          {
            name: "\u4E0A\u4F20\u6587\u4EF6",
            url: "upload-file"
          },
          {
            name: "\u4E0B\u8F7D\u6587\u4EF6",
            url: "download-file"
          }
        ]
      },
      {
        id: "websocket",
        name: "websocket",
        open: false,
        pages: [
          {
            name: "socketTask",
            url: "websocket-socketTask"
          },
          {
            name: "\u5168\u5C40websocket",
            url: "websocket-global"
          }
        ]
      },
      {
        id: "media",
        name: "\u5A92\u4F53",
        open: false,
        pages: mediaPages
      },
      {
        id: "location",
        name: "\u4F4D\u7F6E",
        open: false,
        pages: [
          {
            name: "\u83B7\u53D6\u5F53\u524D\u4F4D\u7F6E",
            url: "get-location"
          },
          {
            name: "\u4F7F\u7528\u5730\u56FE\u67E5\u770B\u4F4D\u7F6E",
            url: "open-location"
          },
          {
            name: "\u4F7F\u7528\u5730\u56FE\u9009\u62E9\u4F4D\u7F6E",
            url: "choose-location"
          },
          {
            name: "\u5730\u56FE\u63A7\u5236",
            url: "map"
          }
        ]
      },
      {
        id: "storage",
        name: "\u6570\u636E",
        open: false,
        pages: [
          {
            name: "\u6570\u636E\u5B58\u50A8\uFF08key-value\uFF09",
            url: "storage"
          }
        ]
      },
      {
        url: "rewarded-video-ad",
        name: "\u6FC0\u52B1\u89C6\u9891\u5E7F\u544A",
        open: false
      },
      {
        id: "login",
        name: "\u767B\u5F55",
        open: false,
        pages: [
          {
            name: "\u767B\u5F55",
            url: "login"
          },
          {
            name: "\u83B7\u53D6\u7528\u6237\u4FE1\u606F",
            url: "get-user-info"
          }
        ]
      },
      {
        id: "share",
        name: "\u5206\u4EAB",
        open: false,
        pages: [{
          name: "\u5206\u4EAB",
          url: "share"
        }]
      },
      {
        id: "payment",
        name: "\u652F\u4ED8",
        open: false,
        pages: [{
          name: "\u53D1\u8D77\u652F\u4ED8",
          url: "request-payment"
        }]
      }
    ];
    return {
      showSetTabBarPage: false,
      list,
      notForPc: [{
        name: "\u8BBE\u7F6ETabBar",
        url: "set-tabbar"
      }]
    };
  },
  onShareAppMessage() {
    return {
      title: "\u6B22\u8FCE\u4F53\u9A8Cuni-app",
      path: "/pages/tabBar/API/API"
    };
  },
  onNavigationBarButtonTap(e) {
    common_vendor.index.navigateTo({
      url: "/pages/about/about"
    });
  },
  onLoad() {
  },
  onReady() {
  },
  onShow() {
    this.navigateFlag = false;
    this.leaveSetTabBarPage();
  },
  onHide() {
    this.leaveSetTabBarPage();
  },
  methods: {
    triggerCollapse(e, id) {
      if (!this.list[e].pages) {
        this.goDetailPage("", this.list[e].url);
        return;
      }
      for (var i = 0; i < this.list.length; ++i) {
        if (e === i) {
          this.list[i].open = !this.list[i].open;
        } else {
          this.list[i].open = false;
        }
      }
    },
    goDetailPage(panel, e) {
      if (e === "set-tabbar") {
        this.showSetTabBarPage = true;
        return;
      }
      let url = ~e.indexOf("platform") ? e : "/pages/API/" + e + "/" + e;
      if (this.hasLeftWin) {
        common_vendor.index.reLaunch({
          url
        });
      } else {
        common_vendor.index.navigateTo({
          url
        });
      }
    },
    leaveSetTabBarPage() {
      this.showSetTabBarPage = false;
    }
  }
};
if (!Array) {
  const _component_set_tab_bar = common_vendor.resolveComponent("set-tab-bar");
  const _easycom_u_link2 = common_vendor.resolveComponent("u-link");
  (_component_set_tab_bar + _easycom_u_link2)();
}
const _easycom_u_link = () => "../../../components/u-link/u-link.js";
if (!Math) {
  _easycom_u_link();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.showSetTabBarPage
  }, $data.showSetTabBarPage ? {
    b: common_vendor.o($options.leaveSetTabBarPage)
  } : common_vendor.e({
    c: !$props.hasLeftWin
  }, !$props.hasLeftWin ? {} : {}, {
    d: !$props.hasLeftWin
  }, !$props.hasLeftWin ? {
    e: common_vendor.p({
      href: "https://uniapp.dcloud.io/api/",
      text: "https://uniapp.dcloud.io/api/",
      inWhiteList: true
    })
  } : {}, {
    f: common_vendor.f($data.list, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.pages ? "\uE581" : "\uE470"),
        c: common_vendor.n(item.open ? "uni-panel-icon-on" : ""),
        d: common_vendor.n(item.open ? "uni-panel-h-on" : ""),
        e: common_vendor.o(($event) => $options.triggerCollapse(index, item.id)),
        f: item.open
      }, item.open ? {
        g: common_vendor.f(item.pages, (item2, key, i1) => {
          return {
            a: common_vendor.t(item2.name ? item2.name : item2),
            b: $props.leftWinActive === item2.url && $props.hasLeftWin ? 1 : "",
            c: item2.name === "\u8BBE\u7F6ETabBar" && $props.hasLeftWin ? 1 : "",
            d: key,
            e: common_vendor.o(($event) => $options.goDetailPage(item.id, item2.url), key)
          };
        }),
        h: item.url
      } : {}, {
        i: item.id
      });
    })
  }));
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/tabBar/API/API.nvue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
