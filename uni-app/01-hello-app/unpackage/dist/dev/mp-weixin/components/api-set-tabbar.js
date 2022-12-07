"use strict";
var common_vendor = require("../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "tababr",
      hasSetTabBarBadge: false,
      hasShownTabBarRedDot: false,
      hasCustomedStyle: false,
      hasCustomedItem: false,
      hasHiddenTabBar: false
    };
  },
  destroyed() {
    if (this.hasSetTabBarBadge) {
      common_vendor.index.removeTabBarBadge({
        index: 1
      });
    }
    if (this.hasShownTabBarRedDot) {
      common_vendor.index.hideTabBarRedDot({
        index: 1
      });
    }
    if (this.hasHiddenTabBar) {
      common_vendor.index.showTabBar();
    }
    if (this.hasCustomedStyle) {
      common_vendor.index.setTabBarStyle({
        color: "#7A7E83",
        selectedColor: "#007AFF",
        backgroundColor: "#F8F8F8",
        borderStyle: "black"
      });
    }
    if (this.hasCustomedItem) {
      let tabBarOptions = {
        index: 1,
        text: "\u63A5\u53E3",
        iconPath: "/static/api.png",
        selectedIconPath: "/static/apiHL.png"
      };
      common_vendor.index.setTabBarItem(tabBarOptions);
    }
  },
  methods: {
    navigateBack() {
      this.$emit("unmount");
    },
    setTabBarBadge() {
      if (this.hasShownTabBarRedDot) {
        common_vendor.index.hideTabBarRedDot({
          index: 1
        });
        this.hasShownTabBarRedDot = !this.hasShownTabBarRedDot;
      }
      if (!this.hasSetTabBarBadge) {
        common_vendor.index.setTabBarBadge({
          index: 1,
          text: "1"
        });
      } else {
        common_vendor.index.removeTabBarBadge({
          index: 1
        });
      }
      this.hasSetTabBarBadge = !this.hasSetTabBarBadge;
    },
    showTabBarRedDot() {
      if (this.hasSetTabBarBadge) {
        common_vendor.index.removeTabBarBadge({
          index: 1
        });
        this.hasSetTabBarBadge = !this.hasSetTabBarBadge;
      }
      if (!this.hasShownTabBarRedDot) {
        common_vendor.index.showTabBarRedDot({
          index: 1
        });
      } else {
        common_vendor.index.hideTabBarRedDot({
          index: 1
        });
      }
      this.hasShownTabBarRedDot = !this.hasShownTabBarRedDot;
    },
    hideTabBar() {
      if (!this.hasHiddenTabBar) {
        common_vendor.index.hideTabBar();
      } else {
        common_vendor.index.showTabBar();
      }
      this.hasHiddenTabBar = !this.hasHiddenTabBar;
    },
    customStyle() {
      if (this.hasCustomedStyle) {
        common_vendor.index.setTabBarStyle({
          color: "#7A7E83",
          selectedColor: "#007AFF",
          backgroundColor: "#F8F8F8",
          borderStyle: "black"
        });
      } else {
        common_vendor.index.setTabBarStyle({
          color: "#FFF",
          selectedColor: "#007AFF",
          backgroundColor: "#000000",
          borderStyle: "black"
        });
      }
      this.hasCustomedStyle = !this.hasCustomedStyle;
    },
    customItem() {
      let tabBarOptions = {
        index: 1,
        text: "\u63A5\u53E3",
        iconPath: "/static/api.png",
        selectedIconPath: "/static/apiHL.png"
      };
      if (this.hasCustomedItem) {
        common_vendor.index.setTabBarItem(tabBarOptions);
      } else {
        tabBarOptions.text = "API";
        common_vendor.index.setTabBarItem(tabBarOptions);
      }
      this.hasCustomedItem = !this.hasCustomedItem;
    }
  }
};
if (!Array) {
  const _easycom_page_head2 = common_vendor.resolveComponent("page-head");
  _easycom_page_head2();
}
const _easycom_page_head = () => "./page-head/page-head.js";
if (!Math) {
  _easycom_page_head();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: $data.title
    }),
    b: common_vendor.t(!$data.hasSetTabBarBadge ? "\u8BBE\u7F6Etab\u5FBD\u6807" : "\u79FB\u9664tab\u5FBD\u6807"),
    c: common_vendor.o((...args) => $options.setTabBarBadge && $options.setTabBarBadge(...args)),
    d: common_vendor.t(!$data.hasShownTabBarRedDot ? "\u663E\u793A\u7EA2\u70B9" : "\u79FB\u9664\u7EA2\u70B9"),
    e: common_vendor.o((...args) => $options.showTabBarRedDot && $options.showTabBarRedDot(...args)),
    f: common_vendor.t(!$data.hasCustomedStyle ? "\u81EA\u5B9A\u4E49Tab\u6837\u5F0F" : "\u79FB\u9664\u81EA\u5B9A\u4E49\u6837\u5F0F"),
    g: common_vendor.o((...args) => $options.customStyle && $options.customStyle(...args)),
    h: common_vendor.t(!$data.hasCustomedItem ? "\u81EA\u5B9A\u4E49Tab\u4FE1\u606F" : "\u79FB\u9664\u81EA\u5B9A\u4E49\u4FE1\u606F"),
    i: common_vendor.o((...args) => $options.customItem && $options.customItem(...args)),
    j: common_vendor.t(!$data.hasHiddenTabBar ? "\u9690\u85CFTabBar" : "\u663E\u793ATabBar"),
    k: common_vendor.o((...args) => $options.hideTabBar && $options.hideTabBar(...args)),
    l: common_vendor.o((...args) => $options.navigateBack && $options.navigateBack(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/components/api-set-tabbar.nvue"]]);
wx.createComponent(Component);
