"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      type: "center",
      msgType: "success",
      messageText: "\u8FD9\u662F\u4E00\u6761\u6210\u529F\u63D0\u793A",
      value: ""
    };
  },
  onReady() {
  },
  methods: {
    change(e) {
      console.log("\u5F53\u524D\u6A21\u5F0F\uFF1A" + e.type + ",\u72B6\u6001\uFF1A" + e.show);
    },
    toggle(type) {
      this.type = type;
      this.$refs.popup.open(type);
    },
    messageToggle(type) {
      this.msgType = type;
      this.messageText = `\u8FD9\u662F\u4E00\u6761${type}\u6D88\u606F\u63D0\u793A`;
      this.$refs.message.open();
    },
    dialogToggle(type) {
      this.msgType = type;
      this.$refs.alertDialog.open();
    },
    dialogConfirm() {
      console.log("\u70B9\u51FB\u786E\u8BA4");
      this.messageText = `\u70B9\u51FB\u786E\u8BA4\u4E86 ${this.msgType} \u7A97\u53E3`;
      this.$refs.message.open();
    },
    inputDialogToggle() {
      this.$refs.inputDialog.open();
    },
    dialogClose() {
      console.log("\u70B9\u51FB\u5173\u95ED");
    },
    dialogInputConfirm(val) {
      common_vendor.index.showLoading({
        title: "3\u79D2\u540E\u4F1A\u5173\u95ED"
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        console.log(val);
        this.value = val;
        this.$refs.inputDialog.close();
      }, 3e3);
    },
    shareToggle() {
      this.$refs.share.open();
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup_share2 = common_vendor.resolveComponent("uni-popup-share");
  (_easycom_uni_card2 + _easycom_uni_section2 + _easycom_uni_popup2 + _easycom_uni_popup_message2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup_share2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_popup_message = () => "../../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup_share = () => "../../../uni_modules/uni-popup/components/uni-popup-share/uni-popup-share.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_section + _easycom_uni_popup + _easycom_uni_popup_message + _easycom_uni_popup_dialog + _easycom_uni_popup_share)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true,
      ["is-shadow"]: false
    }),
    b: common_vendor.o(($event) => $options.toggle("top")),
    c: common_vendor.o(($event) => $options.toggle("bottom")),
    d: common_vendor.o(($event) => $options.toggle("center")),
    e: common_vendor.o(($event) => $options.toggle("left")),
    f: common_vendor.o(($event) => $options.toggle("right")),
    g: common_vendor.p({
      title: "\u57FA\u672C\u793A\u4F8B",
      type: "line"
    }),
    h: common_vendor.o(($event) => $options.messageToggle("success")),
    i: common_vendor.o(($event) => $options.messageToggle("error")),
    j: common_vendor.o(($event) => $options.messageToggle("warn")),
    k: common_vendor.o(($event) => $options.messageToggle("info")),
    l: common_vendor.p({
      title: "\u63D0\u793A\u6D88\u606F",
      type: "line"
    }),
    m: common_vendor.o(($event) => $options.dialogToggle("success")),
    n: common_vendor.o(($event) => $options.dialogToggle("error")),
    o: common_vendor.o(($event) => $options.dialogToggle("warn")),
    p: common_vendor.o(($event) => $options.dialogToggle("info")),
    q: common_vendor.p({
      title: "\u5BF9\u8BDD\u6846\u793A\u4F8B",
      type: "line"
    }),
    r: common_vendor.t($data.value),
    s: common_vendor.o((...args) => $options.inputDialogToggle && $options.inputDialogToggle(...args)),
    t: common_vendor.p({
      title: "\u8F93\u5165\u6846\u793A\u4F8B",
      type: "line",
      padding: true
    }),
    v: common_vendor.o((...args) => $options.shareToggle && $options.shareToggle(...args)),
    w: common_vendor.p({
      title: "\u5E95\u90E8\u5206\u4EAB\u793A\u4F8B",
      type: "line",
      padding: true
    }),
    x: $data.type === "left" || $data.type === "right" ? 1 : "",
    y: common_vendor.sr("popup", "f8af4148-6"),
    z: common_vendor.o($options.change),
    A: common_vendor.p({
      ["background-color"]: "#fff"
    }),
    B: common_vendor.p({
      type: $data.msgType,
      message: $data.messageText,
      duration: 2e3
    }),
    C: common_vendor.sr("message", "f8af4148-7"),
    D: common_vendor.p({
      type: "message"
    }),
    E: common_vendor.o($options.dialogConfirm),
    F: common_vendor.o($options.dialogClose),
    G: common_vendor.p({
      type: $data.msgType,
      cancelText: "\u5173\u95ED",
      confirmText: "\u540C\u610F",
      title: "\u901A\u77E5",
      content: "\u6B22\u8FCE\u4F7F\u7528 uni-popup!"
    }),
    H: common_vendor.sr("alertDialog", "f8af4148-9"),
    I: common_vendor.p({
      type: "dialog"
    }),
    J: common_vendor.sr("inputClose", "f8af4148-12,f8af4148-11"),
    K: common_vendor.o($options.dialogInputConfirm),
    L: common_vendor.p({
      mode: "input",
      title: "\u8F93\u5165\u5185\u5BB9",
      value: "\u5BF9\u8BDD\u6846\u9884\u7F6E\u63D0\u793A\u5185\u5BB9!",
      placeholder: "\u8BF7\u8F93\u5165\u5185\u5BB9"
    }),
    M: common_vendor.sr("inputDialog", "f8af4148-11"),
    N: common_vendor.p({
      type: "dialog"
    }),
    O: common_vendor.sr("share", "f8af4148-13"),
    P: common_vendor.p({
      type: "share",
      safeArea: true,
      backgroundColor: "#fff"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/popup/popup.vue"]]);
wx.createPage(MiniProgramPage);
