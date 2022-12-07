"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      searchValue: "123123"
    };
  },
  methods: {
    search(res) {
      common_vendor.index.showToast({
        title: "\u641C\u7D22\uFF1A" + res.value,
        icon: "none"
      });
    },
    input(res) {
      console.log("----input:", res);
    },
    clear(res) {
      common_vendor.index.showToast({
        title: "clear\u4E8B\u4EF6\uFF0C\u6E05\u9664\u503C\u4E3A\uFF1A" + res.value,
        icon: "none"
      });
    },
    blur(res) {
      common_vendor.index.showToast({
        title: "blur\u4E8B\u4EF6\uFF0C\u8F93\u5165\u503C\u4E3A\uFF1A" + res.value,
        icon: "none"
      });
    },
    focus(e) {
      common_vendor.index.showToast({
        title: "focus\u4E8B\u4EF6\uFF0C\u8F93\u51FA\u503C\u4E3A\uFF1A" + e.value,
        icon: "none"
      });
    },
    cancel(res) {
      common_vendor.index.showToast({
        title: "\u70B9\u51FB\u53D6\u6D88\uFF0C\u8F93\u5165\u503C\u4E3A\uFF1A" + res.value,
        icon: "none"
      });
    }
  },
  onBackPress() {
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_card2 + _easycom_uni_search_bar2 + _easycom_uni_section2 + _easycom_uni_icons2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_search_bar = () => "../../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_search_bar + _easycom_uni_section + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.o($options.search),
    c: common_vendor.o($options.blur),
    d: common_vendor.o($options.focus),
    e: common_vendor.o($options.input),
    f: common_vendor.o($options.cancel),
    g: common_vendor.o($options.clear),
    h: common_vendor.o(($event) => $data.searchValue = $event),
    i: common_vendor.p({
      focus: true,
      modelValue: $data.searchValue
    }),
    j: common_vendor.t($data.searchValue),
    k: common_vendor.p({
      title: "\u57FA\u672C\u7528\u6CD5",
      type: "line"
    }),
    l: common_vendor.o($options.search),
    m: common_vendor.p({
      placeholder: "\u81EA\u5B9A\u4E49\u80CC\u666F\u8272",
      bgColor: "#EEEEEE"
    }),
    n: common_vendor.p({
      title: "\u81EA\u5B9A\u4E49\u6837\u5F0F",
      subTitle: "\u4F7F\u7528 bgColor \u5C5E\u6027\u81EA\u5B9A\u4E49\u80CC\u666F\u8272",
      type: "line"
    }),
    o: common_vendor.o($options.search),
    p: common_vendor.p({
      readonly: true,
      placeholder: "\u81EA\u5B9A\u4E49\u80CC\u666F\u8272"
    }),
    q: common_vendor.p({
      title: "\u53EA\u8BFB\u6837\u5F0F",
      subTitle: "\u4F7F\u7528 readonly \u4F7F\u641C\u7D22\u6846\u53EA\u8BFB",
      type: "line"
    }),
    r: common_vendor.p({
      color: "#999999",
      size: "18",
      type: "home"
    }),
    s: common_vendor.o($options.search),
    t: common_vendor.o($options.cancel),
    v: common_vendor.p({
      placeholder: "\u81EA\u5B9A\u4E49searchIcon",
      ["cancel-text"]: "cancel"
    }),
    w: common_vendor.p({
      title: "\u81EA\u5B9A\u4E49icon",
      type: "line"
    }),
    x: common_vendor.o($options.search),
    y: common_vendor.o($options.cancel),
    z: common_vendor.p({
      radius: "5",
      placeholder: "\u4E00\u76F4\u663E\u793A",
      clearButton: "always",
      cancelButton: "always"
    }),
    A: common_vendor.o($options.search),
    B: common_vendor.p({
      radius: "5",
      placeholder: "\u81EA\u52A8\u663E\u793A\u9690\u85CF",
      clearButton: "auto",
      cancelButton: "none"
    }),
    C: common_vendor.o($options.search),
    D: common_vendor.p({
      radius: "100",
      placeholder: "\u4E00\u76F4\u4E0D\u663E\u793A",
      clearButton: "none",
      cancelButton: "none"
    }),
    E: common_vendor.p({
      title: "\u63A7\u5236\u6E05\u9664/\u53D6\u6D88\u6309\u94AE",
      subTitle: "\u4F7F\u7528 clearButton \u5C5E\u6027\u8BBE\u7F6E\u6E05\u9664\u6309\u94AE",
      type: "line"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/search-bar/search-bar.vue"]]);
wx.createPage(MiniProgramPage);
