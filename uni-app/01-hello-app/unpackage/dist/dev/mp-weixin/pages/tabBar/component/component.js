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
      list: [
        {
          id: "view",
          name: "\u89C6\u56FE\u5BB9\u5668",
          open: false,
          pages: [
            "view",
            "scroll-view",
            "swiper",
            "movable-view",
            "cover-view"
          ]
        },
        {
          id: "content",
          name: "\u57FA\u7840\u5185\u5BB9",
          open: false,
          pages: ["text", "rich-text", "progress"]
        },
        {
          id: "form",
          name: "\u8868\u5355\u7EC4\u4EF6",
          open: false,
          pages: [
            "button",
            "checkbox",
            "form",
            "input",
            "label",
            "picker",
            "picker-view",
            "radio",
            "slider",
            "switch",
            "textarea",
            "editor"
          ]
        },
        {
          id: "nav",
          name: "\u5BFC\u822A",
          open: false,
          pages: ["navigator"]
        },
        {
          id: "media",
          name: "\u5A92\u4F53\u7EC4\u4EF6",
          open: false,
          pages: [
            "image",
            "video"
          ]
        },
        {
          id: "map",
          name: "\u5730\u56FE",
          open: false,
          pages: ["map"]
        },
        {
          id: "canvas",
          name: "\u753B\u5E03",
          open: false,
          pages: ["canvas"]
        },
        {
          id: "web-view",
          name: "\u7F51\u9875",
          open: false,
          pages: ["web-view"]
        },
        {
          id: "ad",
          url: "ad",
          name: "AD\u7EC4\u4EF6",
          open: false
        }
      ]
    };
  },
  onShareAppMessage() {
    return {
      title: "\u6B22\u8FCE\u4F53\u9A8Cuni-app",
      path: "/pages/tabBar/component/component"
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
      if (typeof e === "string") {
        const url = "/pages/component/" + e + "/" + e;
        if (this.hasLeftWin) {
          common_vendor.index.reLaunch({
            url
          });
        } else {
          common_vendor.index.navigateTo({
            url
          });
        }
      } else {
        if (this.hasLeftWin) {
          common_vendor.index.reLaunch({
            url: e.url
          });
        } else {
          common_vendor.index.navigateTo({
            url: e.url
          });
        }
      }
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
      href: "https://uniapp.dcloud.io/component/",
      text: "https://uniapp.dcloud.io/component/",
      inWhiteList: true
    })
  } : {}, {
    d: common_vendor.f($data.list, (item, index, i0) => {
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
            b: $props.leftWinActive === (item2.url ? item2.url.split("/")[3] : item2) && $props.hasLeftWin ? 1 : "",
            c: key,
            d: common_vendor.o(($event) => $options.goDetailPage(item.id, item2), key)
          };
        })
      } : {}, {
        h: item.id
      });
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/tabBar/component/component.nvue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
