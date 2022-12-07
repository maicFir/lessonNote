"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      cover: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/094a9dc0-50c0-11eb-b680-7980c8a877b8.jpg",
      avatar: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
      extraIcon: {
        color: "#4cd964",
        size: "22",
        type: "gear-filled"
      }
    };
  },
  methods: {
    onClick(e) {
      console.log(e);
    },
    actionsClick(text) {
      common_vendor.index.showToast({
        title: text,
        icon: "none"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_card2 + _easycom_uni_section2 + _easycom_uni_icons2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_section + _easycom_uni_icons + _easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.p({
      ["is-shadow"]: false
    }),
    c: common_vendor.p({
      title: "\u57FA\u7840\u5361\u7247",
      type: "line"
    }),
    d: common_vendor.p({
      title: "\u57FA\u7840\u5361\u7247",
      extra: "\u989D\u5916\u4FE1\u606F"
    }),
    e: common_vendor.p({
      title: "\u5361\u7247\u6807\u9898+\u989D\u5916\u4FE1\u606F",
      type: "line"
    }),
    f: common_vendor.o($options.onClick),
    g: common_vendor.p({
      title: "\u57FA\u7840\u5361\u7247",
      ["sub-title"]: "\u526F\u6807\u9898",
      extra: "\u989D\u5916\u4FE1\u606F",
      thumbnail: $data.avatar
    }),
    h: common_vendor.p({
      title: "\u53CC\u6807\u9898\u5361\u7247",
      type: "line"
    }),
    i: common_vendor.p({
      title: "\u57FA\u7840\u5361\u7247",
      isFull: true,
      ["sub-title"]: "\u526F\u6807\u9898",
      extra: "\u989D\u5916\u4FE1\u606F",
      thumbnail: $data.avatar
    }),
    j: common_vendor.p({
      title: "\u901A\u680F\u5361\u7247",
      type: "line"
    }),
    k: common_vendor.p({
      type: "redo",
      size: "18",
      color: "#999"
    }),
    l: common_vendor.o(($event) => $options.actionsClick("\u5206\u4EAB")),
    m: common_vendor.p({
      type: "heart",
      size: "18",
      color: "#999"
    }),
    n: common_vendor.o(($event) => $options.actionsClick("\u70B9\u8D5E")),
    o: common_vendor.p({
      type: "chatbubble",
      size: "18",
      color: "#999"
    }),
    p: common_vendor.o(($event) => $options.actionsClick("\u8BC4\u8BBA")),
    q: common_vendor.o($options.onClick),
    r: common_vendor.p({
      cover: $data.cover
    }),
    s: common_vendor.p({
      title: "\u5361\u7247\u5C01\u9762\u56FE+\u64CD\u4F5C\u680F",
      type: "line"
    }),
    t: common_vendor.p({
      ["show-switch"]: true,
      title: "\u81EA\u5B9A\u4E49\u6807\u9898"
    }),
    v: $data.cover,
    w: common_vendor.p({
      type: "redo",
      size: "18",
      color: "#999"
    }),
    x: common_vendor.o(($event) => $options.actionsClick("\u5206\u4EAB")),
    y: common_vendor.p({
      type: "heart",
      size: "18",
      color: "#999"
    }),
    z: common_vendor.o(($event) => $options.actionsClick("\u70B9\u8D5E")),
    A: common_vendor.p({
      type: "chatbubble",
      size: "18",
      color: "#999"
    }),
    B: common_vendor.o(($event) => $options.actionsClick("\u8BC4\u8BBA")),
    C: common_vendor.p({
      title: "\u57FA\u7840\u5361\u7247",
      ["sub-title"]: "\u526F\u6807\u9898",
      extra: "\u989D\u5916\u4FE1\u606F",
      padding: "10px 0",
      thumbnail: $data.avatar
    }),
    D: common_vendor.p({
      title: "\u81EA\u5B9A\u4E49\u5361\u7247\u5185\u5BB9",
      type: "line"
    }),
    E: $data.cover,
    F: common_vendor.p({
      title: "\u4ECA\u65E5\u65B0\u95FB",
      showArrow: true
    }),
    G: common_vendor.p({
      title: "\u4ECA\u65E5\u65B0\u95FB",
      showArrow: true
    }),
    H: common_vendor.p({
      type: "redo",
      size: "18",
      color: "#999"
    }),
    I: common_vendor.o(($event) => $options.actionsClick("\u5206\u4EAB")),
    J: common_vendor.p({
      type: "heart",
      size: "18",
      color: "#999"
    }),
    K: common_vendor.o(($event) => $options.actionsClick("\u70B9\u8D5E")),
    L: common_vendor.p({
      type: "chatbubble",
      size: "18",
      color: "#999"
    }),
    M: common_vendor.o(($event) => $options.actionsClick("\u8BC4\u8BBA")),
    N: common_vendor.p({
      padding: "0",
      spacing: "0"
    }),
    O: common_vendor.p({
      title: "\u5361\u7247+\u5217\u8868",
      type: "line"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/card/card.nvue"]]);
wx.createPage(MiniProgramPage);
