"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: {
    hasLeftWin: {
      type: Boolean
    },
    leftWinActive: {
      type: String
    }
  },
  data() {
    return {
      hideList: [
        "ucharts",
        "nav-city-dropdown"
      ],
      list: [
        {
          name: "\u9876\u90E8\u9009\u9879\u5361",
          url: "tabbar"
        },
        {
          name: "\u7EC4\u4EF6\u901A\u8BAF",
          url: "component-communication"
        },
        {
          name: "\u5217\u8868\u5230\u8BE6\u60C5\u793A\u4F8B",
          url: "list2detail-list"
        },
        {
          name: "GlobalData\u548Cvuex",
          url: "global"
        }
      ]
    };
  },
  onShareAppMessage() {
    return {
      title: "\u6B22\u8FCE\u4F53\u9A8Cuni-app",
      path: "/pages/tabBar/template/template"
    };
  },
  onNavigationBarButtonTap(e) {
    common_vendor.index.navigateTo({
      url: "/pages/about/about"
    });
  },
  methods: {
    triggerCollapse(e, id) {
      if (!this.list[e].pages) {
        this.goDetailPage(this.list[e].url);
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
    goDetailPage(e) {
      let path = e.url ? e.url : e;
      let url = ~path.indexOf("platform") ? path : "/pages/template/" + path + "/" + path;
      if (this.hasLeftWin) {
        common_vendor.index.reLaunch({
          url
        });
      } else {
        common_vendor.index.navigateTo({
          url
        });
      }
      return false;
    }
  }
};
if (!Array) {
  const _easycom_u_link2 = common_vendor.resolveComponent("u-link");
  _easycom_u_link2();
}
const _easycom_u_link = () => "../../../components/u-link/u-link.js";
if (!Math) {
  _easycom_u_link();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$props.hasLeftWin
  }, !$props.hasLeftWin ? {} : {}, {
    b: !$props.hasLeftWin
  }, !$props.hasLeftWin ? {
    c: common_vendor.p({
      href: "https://ext.dcloud.net.cn",
      text: "https://ext.dcloud.net.cn",
      inWhiteList: true
    })
  } : {}, {
    d: common_vendor.f($data.list, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.pages ? "\uE581" : "\uE470"),
        c: common_vendor.n(item.open ? "uni-panel-icon-on" : ""),
        d: $props.leftWinActive === item.url && $props.hasLeftWin ? 1 : "",
        e: item.open ? 1 : "",
        f: common_vendor.o(($event) => $options.triggerCollapse(index, item.id)),
        g: item.open
      }, item.open ? {
        h: common_vendor.f(item.pages, (item2, key, i1) => {
          return {
            a: common_vendor.t(item2.name ? item2.name : item2),
            b: $props.leftWinActive === item2.url && $props.hasLeftWin ? 1 : "",
            c: $data.hideList.indexOf(item2.url) !== -1 && $props.hasLeftWin ? 1 : "",
            d: key,
            e: common_vendor.o(($event) => $options.goDetailPage(item2), key)
          };
        })
      } : {}, {
        i: $data.hideList.indexOf(item.url) !== -1 && $props.hasLeftWin ? 1 : "",
        j: item.id
      });
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/tabBar/template/template.nvue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
