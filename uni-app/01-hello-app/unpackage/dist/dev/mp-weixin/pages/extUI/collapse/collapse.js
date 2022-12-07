"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      value: ["0"],
      accordionVal: "1",
      content: "\u6298\u53E0\u5185\u5BB9\u4E3B\u4F53\uFF0C\u53EF\u81EA\u5B9A\u4E49\u5185\u5BB9\u53CA\u6837\u5F0F\uFF0C\u70B9\u51FB\u6309\u94AE\u4FEE\u6539\u5185\u5BB9\u4F7F\u9AD8\u5EA6\u53D1\u751F\u53D8\u5316\u3002",
      extraIcon: {
        color: "#4cd964",
        size: "26",
        type: "image"
      }
    };
  },
  methods: {
    add() {
      if (this.content.length > 35) {
        this.content = "\u6298\u53E0\u5185\u5BB9\u4E3B\u4F53\uFF0C\u53EF\u81EA\u5B9A\u4E49\u5185\u5BB9\u53CA\u6837\u5F0F\uFF0C\u70B9\u51FB\u6309\u94AE\u4FEE\u6539\u5185\u5BB9\u4F7F\u9AD8\u5EA6\u53D1\u751F\u53D8\u5316\u3002";
      } else {
        this.content = "\u6298\u53E0\u5185\u5BB9\u4E3B\u4F53\uFF0C\u8FD9\u662F\u4E00\u6BB5\u6BD4\u8F83\u957F\u5185\u5BB9\u3002\u901A\u8FC7\u70B9\u51FB\u6309\u94AE\u4FEE\u6539\u540E\u5185\u5BB9\u540E\uFF0C\u4F7F\u7EC4\u4EF6\u9AD8\u5EA6\u53D1\u751F\u53D8\u5316\uFF0C\u5728\u6B21\u70B9\u51FB\u6309\u94AE\u6062\u590D\u4E4B\u524D\u7684\u5185\u5BB9\u548C\u9AD8\u5EA6\u3002";
      }
      this.$nextTick(() => {
        this.$refs.collapse.resize();
      });
    },
    onClick(e) {
      common_vendor.index.showToast({
        title: "\u5217\u8868\u88AB\u70B9\u51FB"
      });
    },
    change(e) {
      console.log(e);
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_collapse_item2 = common_vendor.resolveComponent("uni-collapse-item");
  const _easycom_uni_collapse2 = common_vendor.resolveComponent("uni-collapse");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_card2 + _easycom_uni_collapse_item2 + _easycom_uni_collapse2 + _easycom_uni_section2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_collapse_item = () => "../../../uni_modules/uni-collapse/components/uni-collapse-item/uni-collapse-item.js";
const _easycom_uni_collapse = () => "../../../uni_modules/uni-collapse/components/uni-collapse/uni-collapse.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_list_item = () => "../../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_collapse_item + _easycom_uni_collapse + _easycom_uni_section + _easycom_uni_list_item + _easycom_uni_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.t($data.content),
    c: common_vendor.p({
      title: "\u9ED8\u8BA4\u5F00\u542F"
    }),
    d: common_vendor.p({
      title: "\u6298\u53E0\u5185\u5BB9"
    }),
    e: common_vendor.p({
      title: "\u7981\u7528\u72B6\u6001",
      disabled: true
    }),
    f: common_vendor.sr("collapse", "3e779262-2,3e779262-1"),
    g: common_vendor.o($options.change),
    h: common_vendor.o(($event) => $data.value = $event),
    i: common_vendor.p({
      modelValue: $data.value
    }),
    j: common_vendor.p({
      title: "\u57FA\u7840\u7528\u6CD5",
      type: "line"
    }),
    k: common_vendor.o((...args) => $options.add && $options.add(...args)),
    l: common_vendor.p({
      title: "\u4F7F\u7528\u52A8\u753B",
      ["show-animation"]: true
    }),
    m: common_vendor.p({
      title: "\u4E0D\u4F7F\u7528\u52A8\u753B",
      ["show-animation"]: false
    }),
    n: common_vendor.p({
      title: "\u4F7F\u7528\u52A8\u753B\u6548\u679C",
      type: "line"
    }),
    o: common_vendor.p({
      title: "\u624B\u98CE\u7434\u6548\u679C"
    }),
    p: common_vendor.p({
      title: "\u624B\u98CE\u7434\u6548\u679C"
    }),
    q: common_vendor.p({
      title: "\u624B\u98CE\u7434\u6548\u679C"
    }),
    r: common_vendor.o($options.change),
    s: common_vendor.o(($event) => $data.accordionVal = $event),
    t: common_vendor.p({
      accordion: true,
      modelValue: $data.accordionVal
    }),
    v: common_vendor.p({
      title: "\u624B\u98CE\u7434\u6548\u679C\uFF08\u53EA\u4F1A\u4FDD\u7559\u4E00\u4E2A\u7684\u6253\u5F00\u72B6\u6001\uFF09",
      type: "line"
    }),
    w: common_vendor.p({
      title: "\u6807\u9898\u6587\u5B57",
      thumb: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
    }),
    x: common_vendor.p({
      title: "\u6807\u9898\u6587\u5B57",
      thumb: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png"
    }),
    y: common_vendor.p({
      title: "\u914D\u7F6E\u56FE\u7247",
      type: "line"
    }),
    z: common_vendor.p({
      title: "\u6807\u9898\u4F7F\u7528\u81EA\u5B9A\u4E49\u6807\u9898\u63D2\u69FD",
      ["show-extra-icon"]: true,
      ["extra-icon"]: $data.extraIcon
    }),
    A: common_vendor.p({
      titleBorder: "none"
    }),
    B: common_vendor.p({
      title: "\u5217\u8868\u6587\u5B57"
    }),
    C: common_vendor.p({
      disabled: true,
      title: "\u5217\u8868\u6587\u5B57",
      note: "\u5217\u8868\u7981\u7528\u72B6\u6001"
    }),
    D: common_vendor.p({
      title: "\u5217\u8868\u53F3\u4FA7\u663E\u793A switch",
      ["show-switch"]: true
    }),
    E: common_vendor.p({
      ["show-extra-icon"]: true,
      ["extra-icon"]: $data.extraIcon,
      title: "\u5217\u8868\u5DE6\u4FA7\u5E26\u6269\u5C55\u56FE\u6807"
    }),
    F: common_vendor.p({
      title: "\u5217\u8868\u5DE6\u4FA7\u5E26\u7565\u7F29\u56FE",
      note: "\u5217\u8868\u63CF\u8FF0\u4FE1\u606F",
      thumb: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png",
      ["thumb-size"]: "lg",
      rightText: "\u53F3\u4FA7\u6587\u5B57",
      showArrow: true
    }),
    G: common_vendor.o($options.onClick),
    H: common_vendor.p({
      title: "\u5F00\u542F\u70B9\u51FB\u53CD\u9988",
      clickable: true,
      showArrow: true
    }),
    I: common_vendor.p({
      title: "\u6298\u53E0\u5185\u5BB9\u4F7F\u7528 uni-list \u7EC4\u4EF6"
    }),
    J: common_vendor.p({
      title: "\u4F7F\u7528\u63D2\u69FD",
      type: "line"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/collapse/collapse.vue"]]);
wx.createPage(MiniProgramPage);
