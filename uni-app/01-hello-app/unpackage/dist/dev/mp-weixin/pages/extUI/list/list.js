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
      console.log("\u6267\u884Cclick\u4E8B\u4EF6", e.data);
      common_vendor.index.showToast({
        title: "\u70B9\u51FB\u53CD\u9988"
      });
    },
    switchChange(e) {
      common_vendor.index.showToast({
        title: "change:" + e.value,
        icon: "none"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.p({
      title: "\u5217\u8868\u6587\u5B57"
    }),
    c: common_vendor.p({
      title: "\u5217\u8868\u6587\u5B57",
      rightText: "\u53F3\u4FA7\u6587\u5B57"
    }),
    d: common_vendor.p({
      title: "\u5217\u8868\u6587\u5B57",
      note: "\u5217\u8868\u63CF\u8FF0\u4FE1\u606F",
      rightText: "\u53F3\u4FA7\u6587\u5B57"
    }),
    e: common_vendor.p({
      title: "\u57FA\u7840\u7528\u6CD5",
      type: "line"
    }),
    f: common_vendor.p({
      disabled: true,
      title: "\u5217\u8868\u7981\u7528\u72B6\u6001",
      rightText: "\u53F3\u4FA7\u6587\u5B57"
    }),
    g: common_vendor.p({
      disabled: true,
      title: "\u5217\u8868\u7981\u7528\u72B6\u6001",
      rightText: "\u53F3\u4FA7\u6587\u5B57"
    }),
    h: common_vendor.p({
      title: "\u7981\u7528\u5217\u8868",
      type: "line"
    }),
    i: common_vendor.p({
      showArrow: true,
      title: "\u5217\u8868\u6587\u5B57"
    }),
    j: common_vendor.p({
      showArrow: true,
      title: "\u5217\u8868\u6587\u5B57",
      rightText: "\u53F3\u4FA7\u6587\u5B57"
    }),
    k: common_vendor.p({
      title: "\u663E\u793A\u53F3\u4FA7\u7BAD\u5934",
      type: "line"
    }),
    l: common_vendor.o($options.onClick),
    m: common_vendor.p({
      title: "\u5F39\u7A97\u63D0\u793A",
      clickable: true
    }),
    n: common_vendor.o($options.onClick),
    o: common_vendor.p({
      title: "\u9875\u9762\u8DF3\u8F6C",
      to: `./chat`
    }),
    p: common_vendor.o($options.onClick),
    q: common_vendor.p({
      title: "\u5173\u95ED\u5F53\u524D\u9875\u9762\u6253\u5F00\u65B0\u9875\u9762",
      showArrow: true,
      link: "redirectTo",
      to: "./chat"
    }),
    r: common_vendor.o($options.onClick),
    s: common_vendor.p({
      title: "\u6253\u5F00\u9519\u8BEF\u9875\u9762(\u67E5\u770B\u63A7\u5236\u53F0)",
      showArrow: true,
      link: "redirectTo",
      to: "./chats"
    }),
    t: common_vendor.p({
      title: "\u5F00\u542F\u70B9\u51FB\u53CD\u9988",
      type: "line"
    }),
    v: common_vendor.p({
      title: "\u5217\u8868\u6587\u5B57"
    }),
    w: common_vendor.p({
      border: false,
      title: "\u5217\u8868\u6587\u5B57",
      note: "\u5217\u8868\u63CF\u8FF0\u4FE1\u606F",
      rightText: "\u53F3\u4FA7\u6587\u5B57"
    }),
    x: common_vendor.p({
      border: false,
      title: "\u5217\u8868\u6587\u5B57",
      note: "\u5217\u8868\u63CF\u8FF0\u4FE1\u606F",
      rightText: "\u53F3\u4FA7\u6587\u5B57"
    }),
    y: common_vendor.p({
      border: false
    }),
    z: common_vendor.p({
      title: "\u4E0D\u663E\u793A\u5206\u9694\u7EBF",
      type: "line"
    }),
    A: common_vendor.p({
      title: "\u5217\u8868\u6587\u5B57"
    }),
    B: common_vendor.p({
      title: "\u5217\u8868\u6587\u5B57",
      note: "\u5217\u8868\u63CF\u8FF0\u4FE1\u606F",
      rightText: "\u53F3\u4FA7\u6587\u5B57"
    }),
    C: common_vendor.p({
      title: "\u5217\u8868\u6587\u5B57",
      note: "\u5217\u8868\u63CF\u8FF0\u4FE1\u606F",
      rightText: "\u53F3\u4FA7\u6587\u5B57"
    }),
    D: common_vendor.p({
      ["border-full"]: true
    }),
    E: common_vendor.p({
      title: "\u5206\u9694\u7EBF\u901A\u680F",
      type: "line"
    }),
    F: common_vendor.p({
      ellipsis: "1",
      title: "\u8D85\u957F\u6587\u5B57\u663E\u793A\u4E00\u884C,\u4EE5\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57\u4EE5\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57\u4EE5\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57\u4EE5\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57\u4EE5\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57\u4EE5\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57"
    }),
    G: common_vendor.p({
      ellipsis: "2",
      title: "\u8D85\u957F\u6587\u5B57\u663E\u793A\u4E8C\u884C,\u4EE5\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57\u4EE5\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57\u4EE5\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57\u4EE5\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57\u4EE5\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57\u4EE5\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57",
      rightText: "\u4E8C\u884C\u663E\u793A"
    }),
    H: common_vendor.p({
      ellipsis: "1",
      title: "\u5168\u90E8\u663E\u793A,\u4EE5\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57\u4EE5\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57\u4EE5\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57\u4EE5\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57\u4EE5\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57\u4EE5\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57",
      note: "\u5217\u8868\u63CF\u8FF0\u4FE1\u606F,\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57,\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57,\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57,\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57,\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57,\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57,\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57",
      showArrow: true,
      rightText: "\u4E00\u884C\u663E\u793A"
    }),
    I: common_vendor.p({
      title: "\u5168\u90E8\u663E\u793A,\u4EE5\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57\u4EE5\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57\u4EE5\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57\u4EE5\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57\u4EE5\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57\u4EE5\u4E0B\u662F\u6D4B\u8BD5\u6587\u5B57",
      showArrow: true,
      rightText: "\u5168\u90E8"
    }),
    J: common_vendor.p({
      title: "\u6587\u5B57\u6EA2\u51FA\u9690\u85CF",
      type: "line"
    }),
    K: common_vendor.p({
      ["show-extra-icon"]: true,
      showArrow: true,
      ["extra-icon"]: $data.extraIcon,
      title: "\u5217\u8868\u5DE6\u4FA7\u5E26\u6269\u5C55\u56FE\u6807"
    }),
    L: common_vendor.p({
      title: "\u5217\u8868\u5DE6\u4FA7\u5E26\u7565\u7F29\u56FE",
      note: "\u5217\u8868\u63CF\u8FF0\u4FE1\u606F",
      showArrow: true,
      thumb: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
      ["thumb-size"]: "sm",
      rightText: "\u5C0F\u56FE"
    }),
    M: common_vendor.p({
      title: "\u5217\u8868\u5DE6\u4FA7\u5E26\u7565\u7F29\u56FE",
      note: "\u5217\u8868\u63CF\u8FF0\u4FE1\u606F",
      showArrow: true,
      thumb: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
      ["thumb-size"]: "base",
      rightText: "\u9ED8\u8BA4"
    }),
    N: common_vendor.p({
      title: "\u5217\u8868\u5DE6\u4FA7\u5E26\u7565\u7F29\u56FE",
      note: "\u5217\u8868\u63CF\u8FF0\u4FE1\u606F",
      showArrow: true,
      thumb: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
      ["thumb-size"]: "lg",
      rightText: "\u5927\u56FE"
    }),
    O: common_vendor.p({
      title: "\u663E\u793A\u56FE\u6807\u6216\u56FE\u7247",
      type: "line"
    }),
    P: common_vendor.p({
      title: "\u81EA\u5B9A\u4E49\u53F3\u4FA7\u63D2\u69FD",
      note: "\u5217\u8868\u63CF\u8FF0\u4FE1\u606F",
      link: true
    }),
    Q: common_vendor.p({
      title: "\u4F7F\u7528\u63D2\u69FD",
      type: "line"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/list/list.nvue"]]);
wx.createPage(MiniProgramPage);
