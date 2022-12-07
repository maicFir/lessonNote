"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "UniNoticeBar",
  emits: ["click", "getmore", "close"],
  props: {
    text: {
      type: String,
      default: ""
    },
    moreText: {
      type: String,
      default: ""
    },
    backgroundColor: {
      type: String,
      default: "#FFF9EA"
    },
    speed: {
      type: Number,
      default: 100
    },
    color: {
      type: String,
      default: "#FF9A43"
    },
    moreColor: {
      type: String,
      default: "#FF9A43"
    },
    single: {
      type: [Boolean, String],
      default: false
    },
    scrollable: {
      type: [Boolean, String],
      default: false
    },
    showIcon: {
      type: [Boolean, String],
      default: false
    },
    showGetMore: {
      type: [Boolean, String],
      default: false
    },
    showClose: {
      type: [Boolean, String],
      default: false
    }
  },
  data() {
    const elId = `Uni_${Math.ceil(Math.random() * 1e6).toString(36)}`;
    const elIdBox = `Uni_${Math.ceil(Math.random() * 1e6).toString(36)}`;
    return {
      textWidth: 0,
      boxWidth: 0,
      wrapWidth: "",
      webviewHide: false,
      elId,
      elIdBox,
      show: true,
      animationDuration: "none",
      animationPlayState: "paused",
      animationDelay: "0s"
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initSize();
    });
  },
  methods: {
    initSize() {
      if (this.scrollable) {
        let query = [];
        let textQuery = new Promise((resolve, reject) => {
          common_vendor.index.createSelectorQuery().in(this).select(`#${this.elId}`).boundingClientRect().exec((ret) => {
            this.textWidth = ret[0].width;
            resolve();
          });
        });
        let boxQuery = new Promise((resolve, reject) => {
          common_vendor.index.createSelectorQuery().in(this).select(`#${this.elIdBox}`).boundingClientRect().exec((ret) => {
            this.boxWidth = ret[0].width;
            resolve();
          });
        });
        query.push(textQuery);
        query.push(boxQuery);
        Promise.all(query).then(() => {
          this.animationDuration = `${this.textWidth / this.speed}s`;
          this.animationDelay = `-${this.boxWidth / this.speed}s`;
          setTimeout(() => {
            this.animationPlayState = "running";
          }, 1e3);
        });
      }
    },
    loopAnimation() {
    },
    clickMore() {
      this.$emit("getmore");
    },
    close() {
      this.show = false;
      this.$emit("close");
    },
    onClick() {
      this.$emit("click");
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.show
  }, $data.show ? common_vendor.e({
    b: $props.showIcon === true || $props.showIcon === "true"
  }, $props.showIcon === true || $props.showIcon === "true" ? {
    c: common_vendor.p({
      type: "sound",
      color: $props.color,
      size: "22"
    })
  } : {}, {
    d: common_vendor.t($props.text),
    e: $data.elId,
    f: $props.scrollable ? 1 : "",
    g: !$props.scrollable && ($props.single || $props.showGetMore) ? 1 : "",
    h: $props.color,
    i: $data.wrapWidth + "px",
    j: $data.animationDuration,
    k: $data.animationDuration,
    l: $data.webviewHide ? "paused" : $data.animationPlayState,
    m: $data.webviewHide ? "paused" : $data.animationPlayState,
    n: $data.animationDelay,
    o: $data.animationDelay,
    p: $data.elIdBox,
    q: $props.scrollable ? 1 : "",
    r: !$props.scrollable && ($props.single || $props.moreText) ? 1 : "",
    s: $props.scrollable ? 1 : "",
    t: !$props.scrollable && ($props.single || $props.moreText) ? 1 : "",
    v: $props.showGetMore === true || $props.showGetMore === "true"
  }, $props.showGetMore === true || $props.showGetMore === "true" ? common_vendor.e({
    w: $props.moreText.length > 0
  }, $props.moreText.length > 0 ? {
    x: common_vendor.t($props.moreText),
    y: $props.moreColor
  } : {
    z: common_vendor.p({
      type: "right",
      color: $props.moreColor,
      size: "16"
    })
  }, {
    A: common_vendor.o((...args) => $options.clickMore && $options.clickMore(...args))
  }) : {}, {
    B: ($props.showClose === true || $props.showClose === "true") && ($props.showGetMore === false || $props.showGetMore === "false")
  }, ($props.showClose === true || $props.showClose === "true") && ($props.showGetMore === false || $props.showGetMore === "false") ? {
    C: common_vendor.o($options.close),
    D: common_vendor.p({
      type: "closeempty",
      color: $props.color,
      size: "16"
    })
  } : {}, {
    E: $props.backgroundColor,
    F: common_vendor.o((...args) => $options.onClick && $options.onClick(...args))
  }) : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a1596656"], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.vue"]]);
wx.createComponent(Component);
