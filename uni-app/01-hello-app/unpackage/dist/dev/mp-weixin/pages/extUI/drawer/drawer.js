"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      showRight: false,
      showLeft: false
    };
  },
  methods: {
    confirm() {
    },
    showDrawer(e) {
      this.$refs[e].open();
    },
    closeDrawer(e) {
      this.$refs[e].close();
    },
    change(e, type) {
      console.log((type === "showLeft" ? "\u5DE6\u7A97\u53E3" : "\u53F3\u7A97\u53E3") + (e ? "\u6253\u5F00" : "\u5173\u95ED"));
      this[type] = e;
    }
  },
  onNavigationBarButtonTap(e) {
    if (this.showLeft) {
      this.$refs.showLeft.close();
    } else {
      this.$refs.showLeft.open();
    }
  },
  onBackPress() {
    if (this.showRight || this.showLeft) {
      this.$refs.showLeft.close();
      this.$refs.showRight.close();
      return true;
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_drawer2 = common_vendor.resolveComponent("uni-drawer");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_drawer2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_drawer = () => "../../../uni_modules/uni-drawer/components/uni-drawer/uni-drawer.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_drawer + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true,
      ["is-shadow"]: false
    }),
    b: common_vendor.o(($event) => $options.showDrawer("showLeft")),
    c: common_vendor.o(($event) => $options.closeDrawer("showLeft")),
    d: common_vendor.sr("showLeft", "2ddf183c-2,2ddf183c-1"),
    e: common_vendor.o(($event) => $options.change($event, "showLeft")),
    f: common_vendor.p({
      mode: "left",
      width: 320
    }),
    g: common_vendor.p({
      title: "\u5DE6\u4FA7\u6ED1\u51FA",
      type: "line"
    }),
    h: common_vendor.o(($event) => $options.showDrawer("showRight")),
    i: common_vendor.o(($event) => $options.closeDrawer("showRight")),
    j: common_vendor.f(100, (item, k0, i0) => {
      return {
        a: common_vendor.t(item),
        b: item
      };
    }),
    k: common_vendor.o(($event) => $options.closeDrawer("showRight")),
    l: common_vendor.sr("showRight", "2ddf183c-4,2ddf183c-3"),
    m: common_vendor.o(($event) => $options.change($event, "showRight")),
    n: common_vendor.p({
      mode: "right",
      ["mask-click"]: false
    }),
    o: common_vendor.p({
      title: "\u53F3\u4FA7\u6ED1\u51FA",
      type: "line"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/drawer/drawer.vue"]]);
wx.createPage(MiniProgramPage);
