"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      checkList: [false, false, false, false, false, false],
      contentText: {
        contentDefault: "\u8FFD\u756A",
        contentFav: "\u5DF2\u8FFD\u756A"
      }
    };
  },
  methods: {
    favClick(index) {
      this.checkList[index] = !this.checkList[index];
      console.log(this.checkList[index]);
      this.$forceUpdate();
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_fav2 = common_vendor.resolveComponent("uni-fav");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_nav_bar2 = common_vendor.resolveComponent("uni-nav-bar");
  (_easycom_uni_card2 + _easycom_uni_fav2 + _easycom_uni_section2 + _easycom_uni_nav_bar2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_fav = () => "../../../uni_modules/uni-fav/components/uni-fav/uni-fav.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_nav_bar = () => "../../../uni_modules/uni-nav-bar/components/uni-nav-bar/uni-nav-bar.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_fav + _easycom_uni_section + _easycom_uni_nav_bar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true,
      ["is-shadow"]: false
    }),
    b: common_vendor.o(($event) => $options.favClick(0)),
    c: common_vendor.p({
      checked: $data.checkList[0]
    }),
    d: common_vendor.o(($event) => $options.favClick(1)),
    e: common_vendor.p({
      checked: $data.checkList[1],
      star: false
    }),
    f: common_vendor.o(($event) => $options.favClick(2)),
    g: common_vendor.p({
      checked: $data.checkList[2],
      circle: true,
      ["bg-color"]: "#dd524d",
      ["bg-color-checked"]: "#007aff",
      ["fg-color"]: "#ffffff",
      ["fg-color-checked"]: "#ffffff"
    }),
    h: common_vendor.o(($event) => $options.favClick(3)),
    i: common_vendor.p({
      checked: $data.checkList[3],
      ["bg-color"]: "#f8f8f8",
      ["bg-color-checked"]: "#eeeeee",
      ["fg-color"]: "#333333",
      ["fg-color-checked"]: "#333333"
    }),
    j: common_vendor.p({
      title: "\u57FA\u672C\u7528\u6CD5",
      type: "line"
    }),
    k: common_vendor.o(($event) => $options.favClick(4)),
    l: common_vendor.p({
      checked: $data.checkList[4],
      ["content-text"]: $data.contentText
    }),
    m: common_vendor.p({
      title: "\u81EA\u5B9A\u4E49\u6587\u5B57",
      type: "line"
    }),
    n: common_vendor.o(($event) => $options.favClick(5)),
    o: common_vendor.p({
      checked: $data.checkList[5],
      circle: true
    }),
    p: common_vendor.p({
      fixed: false,
      ["left-icon"]: "arrowleft",
      title: "\u6807\u9898",
      color: "#333333",
      ["background-color"]: "#FFFFFF"
    }),
    q: common_vendor.p({
      title: "\u5728\u81EA\u5B9A\u4E49\u5BFC\u822A\u680F\u4F7F\u7528",
      type: "line"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/fav/fav.vue"]]);
wx.createPage(MiniProgramPage);
