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
        "load-more"
      ],
      lists: [
        {
          name: "uni-badge \u6570\u5B57\u89D2\u6807",
          url: "badge"
        },
        {
          name: "uni-breadcrumb \u9762\u5305\u5C51",
          url: "breadcrumb"
        },
        {
          name: "uni-card \u5361\u7247",
          url: "card"
        },
        {
          name: "uni-collapse \u6298\u53E0\u9762\u677F",
          url: "collapse"
        },
        {
          name: "uni-combox \u7EC4\u5408\u6846",
          url: "combox"
        },
        {
          name: "uni-countdown \u5012\u8BA1\u65F6",
          url: "countdown"
        },
        {
          name: "uni-data-checkbox \u6570\u636E\u9009\u62E9\u5668",
          url: "data-checkbox"
        },
        {
          name: "uni-data-picker \u6570\u636E\u9A71\u52A8\u7684picker\u9009\u62E9\u5668",
          url: "data-picker"
        },
        {
          name: "uni-data-select \u6570\u636E\u9A71\u52A8\u7684\u4E0B\u62C9\u6846",
          url: "data-select"
        },
        {
          name: "uni-dateformat \u65E5\u671F\u683C\u5F0F\u5316",
          url: "dateformat"
        },
        {
          name: "uni-datetime-picker \u65E5\u671F\u9009\u62E9\u5668",
          url: "datetime-picker"
        },
        {
          name: "uni-drawer \u62BD\u5C49",
          url: "drawer"
        },
        {
          name: "uni-easyinput \u589E\u5F3A\u8F93\u5165\u6846",
          url: "easyinput"
        },
        {
          name: "uni-fab \u60AC\u6D6E\u6309\u94AE",
          url: "fab"
        },
        {
          name: "uni-fav \u6536\u85CF\u6309\u94AE",
          url: "fav"
        },
        {
          name: "uni-file-picker \u6587\u4EF6\u9009\u62E9\u4E0A\u4F20",
          url: "file-picker"
        },
        {
          name: "uni-forms \u8868\u5355",
          url: "forms"
        },
        {
          name: "uni-goods-nav \u5546\u54C1\u5BFC\u822A",
          url: "goods-nav"
        },
        {
          name: "uni-grid \u5BAB\u683C",
          url: "grid"
        },
        {
          name: "uni-group \u5206\u7EC4",
          url: "group"
        },
        {
          name: "uni-icons \u56FE\u6807",
          url: "icons"
        },
        {
          name: "uni-indexed-list \u7D22\u5F15\u5217\u8868",
          url: "indexed-list"
        },
        {
          name: "uni-link \u8D85\u94FE\u63A5",
          url: "link"
        },
        {
          name: "uni-list \u5217\u8868",
          url: "list"
        },
        {
          name: "uni-load-more \u52A0\u8F7D\u66F4\u591A",
          url: "load-more"
        },
        {
          name: "uni-nav-bar \u81EA\u5B9A\u4E49\u5BFC\u822A\u680F",
          url: "nav-bar"
        },
        {
          name: "uni-notice-bar \u901A\u544A\u680F",
          url: "notice-bar"
        },
        {
          name: "uni-number-box \u6570\u5B57\u8F93\u5165\u6846",
          url: "number-box"
        },
        {
          name: "uni-pagination \u5206\u9875\u5668",
          url: "pagination"
        },
        {
          name: "uni-popup \u5F39\u51FA\u5C42",
          url: "popup"
        },
        {
          name: "uni-rate \u8BC4\u5206",
          url: "rate"
        },
        {
          name: "uni-row \u5E03\u5C40-\u884C",
          url: "row"
        },
        {
          name: "uni-search-bar \u641C\u7D22\u680F",
          url: "search-bar"
        },
        {
          name: "uni-section \u6807\u9898\u680F",
          url: "section"
        },
        {
          name: "uni-segmented-control \u5206\u6BB5\u5668",
          url: "segmented-control"
        },
        {
          name: "uni-steps \u6B65\u9AA4\u6761",
          url: "steps"
        },
        {
          name: "uni-swipe-action \u6ED1\u52A8\u64CD\u4F5C",
          url: "swipe-action"
        },
        {
          name: "uni-swiper-dot \u8F6E\u64AD\u56FE\u6307\u793A\u70B9",
          url: "swiper-dot"
        },
        {
          name: "uni-table \u8868\u683C",
          url: "table"
        },
        {
          name: "uni-tag \u6807\u7B7E",
          url: "tag"
        },
        {
          name: "uni-title \u7AE0\u8282\u6807\u9898",
          url: "title"
        },
        {
          name: "uni-tooltip \u6587\u5B57\u63D0\u793A",
          url: "tooltip"
        },
        {
          name: "uni-transition \u8FC7\u6E21\u52A8\u753B",
          url: "transition"
        }
      ]
    };
  },
  onLoad() {
  },
  onReady() {
  },
  onShareAppMessage() {
    return {
      title: "\u6B22\u8FCE\u4F53\u9A8Cuni-app",
      path: "/pages/tabBar/extUI/extUI"
    };
  },
  onNavigationBarButtonTap(e) {
    common_vendor.index.navigateTo({
      url: "/pages/about/about"
    });
  },
  methods: {
    goDetailPage(path) {
      const url = "/pages/extUI/" + path + "/" + path;
      if (this.hasLeftWin) {
        common_vendor.index.reLaunch({
          url
        });
      } else {
        common_vendor.index.navigateTo({
          url
        });
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
      href: "https://ext.dcloud.net.cn/",
      text: "https://ext.dcloud.net.cn",
      inWhiteList: true
    })
  } : {}, {
    d: common_vendor.f($data.lists, (item, k0, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: $props.leftWinActive === item.url && $props.hasLeftWin ? 1 : "",
        c: common_vendor.o(($event) => $options.goDetailPage(item.url)),
        d: $data.hideList.indexOf(item.url) !== -1 && $props.hasLeftWin ? 1 : "",
        e: item.url
      };
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/tabBar/extUI/extUI.nvue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
