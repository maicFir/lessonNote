"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      show: false,
      isOpened: "none",
      options1: [{
        text: "\u53D6\u6D88\u7F6E\u9876"
      }],
      options2: [
        {
          text: "\u53D6\u6D88",
          style: {
            backgroundColor: "#007aff"
          }
        },
        {
          text: "\u786E\u8BA4",
          style: {
            backgroundColor: "#F56C6C"
          }
        }
      ],
      swipeList: [
        {
          options: [{
            text: "\u6DFB\u52A0",
            style: {
              backgroundColor: "#F56C6C"
            }
          }],
          id: 0,
          content: "\u5DE6\u6ED1\u70B9\u51FB\u6DFB\u52A0\u65B0\u589E\u4E00\u6761\u6570\u636E"
        },
        {
          id: 1,
          options: [
            {
              text: "\u7F6E\u9876"
            },
            {
              text: "\u5220\u9664",
              style: {
                backgroundColor: "rgb(255,58,49)"
              }
            }
          ],
          content: "item2"
        },
        {
          id: 2,
          options: [
            {
              text: "\u7F6E\u9876"
            },
            {
              text: "\u6807\u8BB0\u4E3A\u5DF2\u8BFB",
              style: {
                backgroundColor: "rgb(254,156,1)"
              }
            },
            {
              text: "\u5220\u9664",
              style: {
                backgroundColor: "rgb(255,58,49)"
              }
            }
          ],
          content: "item3"
        }
      ]
    };
  },
  onReady() {
    setTimeout(() => {
      this.isOpened = "right";
    }, 1e3);
    common_vendor.index.$on("update", (res) => {
      console.log(111);
      this.swipeClick({
        content: {
          text: "\u6DFB\u52A0"
        }
      });
    });
  },
  methods: {
    contentClick() {
      console.log("\u70B9\u51FB\u5185\u5BB9");
      common_vendor.index.showToast({
        title: "\u70B9\u51FB\u5185\u5BB9",
        icon: "none"
      });
    },
    bindClick(e) {
      console.log(e);
      common_vendor.index.showToast({
        title: `\u70B9\u51FB\u4E86${e.position === "left" ? "\u5DE6\u4FA7" : "\u53F3\u4FA7"} ${e.content.text}\u6309\u94AE`,
        icon: "none"
      });
    },
    setOpened() {
      if (this.isOpened === "none") {
        this.isOpened = "left";
        return;
      }
      if (this.isOpened === "left") {
        this.isOpened = "right";
        return;
      }
      if (this.isOpened === "right") {
        this.isOpened = "none";
        return;
      }
    },
    change(e) {
      this.isOpened = e;
      console.log("\u8FD4\u56DE\uFF1A", e);
    },
    swipeChange(e, index) {
      console.log("\u8FD4\u56DE\uFF1A", e);
      console.log("\u5F53\u524D\u7D22\u5F15\uFF1A", index);
    },
    swipeClick(e, index) {
      let {
        content
      } = e;
      if (content.text === "\u5220\u9664") {
        common_vendor.index.showModal({
          title: "\u63D0\u793A",
          content: "\u662F\u5426\u5220\u9664",
          success: (res) => {
            if (res.confirm) {
              this.swipeList.splice(index, 1);
            } else if (res.cancel) {
              console.log("\u7528\u6237\u70B9\u51FB\u53D6\u6D88");
            }
          }
        });
      } else if (content.text === "\u6DFB\u52A0") {
        if (this.swipeList.length < 10) {
          this.swipeList.push({
            id: new Date().getTime(),
            options: [
              {
                text: "\u7F6E\u9876"
              },
              {
                text: "\u6807\u8BB0\u4E3A\u5DF2\u8BFB",
                style: {
                  backgroundColor: "rgb(254,156,1)"
                }
              },
              {
                text: "\u5220\u9664",
                style: {
                  backgroundColor: "rgb(255,58,49)"
                }
              }
            ],
            content: "\u65B0\u589E" + new Date().getTime()
          });
          common_vendor.index.showToast({
            title: `\u6DFB\u52A0\u4E86\u4E00\u6761\u6570\u636E`,
            icon: "none"
          });
        } else {
          common_vendor.index.showToast({
            title: `\u6700\u591A\u6DFB\u52A0\u5341\u6761\u6570\u636E`,
            icon: "none"
          });
        }
      } else {
        common_vendor.index.showToast({
          title: `\u70B9\u51FB\u4E86${e.content.text}\u6309\u94AE`,
          icon: "none"
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_swipe_action_item2 = common_vendor.resolveComponent("uni-swipe-action-item");
  const _easycom_uni_swipe_action2 = common_vendor.resolveComponent("uni-swipe-action");
  (_easycom_uni_card2 + _easycom_uni_section2 + _easycom_uni_swipe_action_item2 + _easycom_uni_swipe_action2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_swipe_action_item = () => "../../../uni_modules/uni-swipe-action/components/uni-swipe-action-item/uni-swipe-action-item.js";
const _easycom_uni_swipe_action = () => "../../../uni_modules/uni-swipe-action/components/uni-swipe-action/uni-swipe-action.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_section + _easycom_uni_swipe_action_item + _easycom_uni_swipe_action)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true,
      ["is-shadow"]: false
    }),
    b: common_vendor.p({
      title: "\u57FA\u672C\u7528\u6CD5",
      type: "line"
    }),
    c: common_vendor.o((...args) => $options.contentClick && $options.contentClick(...args)),
    d: common_vendor.o($options.bindClick),
    e: common_vendor.p({
      ["left-options"]: $data.options2,
      threshold: 0,
      ["right-options"]: $data.options1
    }),
    f: common_vendor.o(($event) => $options.bindClick({
      position: "left",
      content: {
        text: "\u7F6E\u9876"
      }
    })),
    g: common_vendor.o((...args) => $options.contentClick && $options.contentClick(...args)),
    h: common_vendor.o(($event) => $options.bindClick({
      position: "right",
      content: {
        text: "\u5220\u9664"
      }
    })),
    i: common_vendor.o($options.bindClick),
    j: common_vendor.o(($event) => $options.bindClick({
      position: "left",
      content: {
        text: "\u7F6E\u9876"
      }
    })),
    k: common_vendor.o((...args) => $options.contentClick && $options.contentClick(...args)),
    l: common_vendor.o($options.bindClick),
    m: common_vendor.p({
      ["right-options"]: $data.options1
    }),
    n: common_vendor.p({
      title: "\u7981\u6B62\u6ED1\u52A8",
      type: "line"
    }),
    o: common_vendor.p({
      disabled: true
    }),
    p: common_vendor.p({
      title: "\u4F7F\u7528\u53D8\u91CF\u63A7\u5236\u5F00\u5173",
      type: "line"
    }),
    q: common_vendor.t($data.isOpened),
    r: common_vendor.o((...args) => $options.setOpened && $options.setOpened(...args)),
    s: common_vendor.o($options.change),
    t: common_vendor.o($options.bindClick),
    v: common_vendor.p({
      ["left-options"]: $data.options2,
      ["right-options"]: $data.options2,
      show: $data.isOpened,
      ["auto-close"]: false
    }),
    w: common_vendor.p({
      title: "swipe-action \u5217\u8868",
      type: "line"
    }),
    x: common_vendor.f($data.swipeList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.content),
        b: item.id,
        c: common_vendor.o(($event) => $options.swipeChange($event, index), item.id),
        d: common_vendor.o(($event) => $options.swipeClick($event, index), item.id),
        e: "4d5c6fe2-14-" + i0 + ",4d5c6fe2-13",
        f: common_vendor.p({
          ["right-options"]: item.options
        })
      };
    }),
    y: common_vendor.sr("swipeAction", "4d5c6fe2-13")
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/swipe-action/swipe-action.vue"]]);
wx.createPage(MiniProgramPage);
