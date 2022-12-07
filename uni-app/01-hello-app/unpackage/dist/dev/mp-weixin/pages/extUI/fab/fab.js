"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      title: "uni-fab",
      directionStr: "\u5782\u76F4",
      horizontal: "left",
      vertical: "bottom",
      direction: "horizontal",
      pattern: {
        color: "#7A7E83",
        backgroundColor: "#fff",
        selectedColor: "#007AFF",
        buttonColor: "#007AFF",
        iconColor: "#fff"
      },
      is_color_type: false,
      content: [
        {
          iconPath: "/static/image.png",
          selectedIconPath: "/static/image-active.png",
          text: "\u76F8\u518C",
          active: false
        },
        {
          iconPath: "/static/home.png",
          selectedIconPath: "/static/home-active.png",
          text: "\u9996\u9875",
          active: false
        },
        {
          iconPath: "/static/star.png",
          selectedIconPath: "/static/star-active.png",
          text: "\u6536\u85CF",
          active: false
        }
      ]
    };
  },
  onBackPress() {
    if (this.$refs.fab.isShow) {
      this.$refs.fab.close();
      return true;
    }
    return false;
  },
  methods: {
    trigger(e) {
      console.log(e);
      this.content[e.index].active = !e.item.active;
      common_vendor.index.showModal({
        title: "\u63D0\u793A",
        content: `\u60A8${this.content[e.index].active ? "\u9009\u4E2D\u4E86" : "\u53D6\u6D88\u4E86"}${e.item.text}`,
        success: function(res) {
          if (res.confirm) {
            console.log("\u7528\u6237\u70B9\u51FB\u786E\u5B9A");
          } else if (res.cancel) {
            console.log("\u7528\u6237\u70B9\u51FB\u53D6\u6D88");
          }
        }
      });
    },
    fabClick() {
      common_vendor.index.showToast({
        title: "\u70B9\u51FB\u4E86\u60AC\u6D6E\u6309\u94AE",
        icon: "none"
      });
    },
    switchBtn(hor, ver) {
      if (hor === 0) {
        this.direction = this.direction === "horizontal" ? "vertical" : "horizontal";
        this.directionStr = this.direction === "horizontal" ? "\u5782\u76F4" : "\u6C34\u5E73";
      } else {
        this.horizontal = hor;
        this.vertical = ver;
      }
      this.$forceUpdate();
    },
    switchColor() {
      this.is_color_type = !this.is_color_type;
      if (this.is_color_type) {
        this.pattern.iconColor = "#aaa";
        this.pattern.buttonColor = "#fff";
      } else {
        this.pattern.iconColor = "#fff";
        this.pattern.buttonColor = "#007AFF";
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_fab2 = common_vendor.resolveComponent("uni-fab");
  (_easycom_uni_card2 + _easycom_uni_section2 + _easycom_uni_fab2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_fab = () => "../../../uni_modules/uni-fab/components/uni-fab/uni-fab.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_section + _easycom_uni_fab)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.t($data.directionStr),
    c: common_vendor.o(($event) => $options.switchBtn(0)),
    d: common_vendor.o(($event) => $options.switchBtn("left", "bottom")),
    e: common_vendor.o(($event) => $options.switchBtn("right", "bottom")),
    f: common_vendor.o(($event) => $options.switchBtn("left", "top")),
    g: common_vendor.o(($event) => $options.switchBtn("left", "top")),
    h: common_vendor.o(($event) => $options.switchBtn("right", "top")),
    i: common_vendor.o((...args) => $options.switchColor && $options.switchColor(...args)),
    j: common_vendor.p({
      title: "\u57FA\u672C\u529F\u80FD",
      subTitle: "\u70B9\u51FB\u6309\u94AE,\u5207\u6362 fab \u4E0D\u540C\u72B6\u6001",
      type: "line"
    }),
    k: common_vendor.sr("fab", "0efc6c52-2"),
    l: common_vendor.o($options.trigger),
    m: common_vendor.o($options.fabClick),
    n: common_vendor.p({
      pattern: $data.pattern,
      content: $data.content,
      horizontal: $data.horizontal,
      vertical: $data.vertical,
      direction: $data.direction
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/fab/fab.vue"]]);
wx.createPage(MiniProgramPage);
