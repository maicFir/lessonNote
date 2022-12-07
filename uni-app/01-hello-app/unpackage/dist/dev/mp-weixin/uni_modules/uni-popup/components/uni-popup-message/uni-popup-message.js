"use strict";
var uni_modules_uniPopup_components_uniPopup_popup = require("../uni-popup/popup.js");
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "uniPopupMessage",
  mixins: [uni_modules_uniPopup_components_uniPopup_popup.popup],
  props: {
    type: {
      type: String,
      default: "success"
    },
    message: {
      type: String,
      default: ""
    },
    duration: {
      type: Number,
      default: 3e3
    },
    maskShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  created() {
    this.popup.maskShow = this.maskShow;
    this.popup.messageChild = this;
  },
  methods: {
    timerClose() {
      if (this.duration === 0)
        return;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.popup.close();
      }, this.duration);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.message),
    b: common_vendor.n("uni-popup__" + $props.type + "-text"),
    c: common_vendor.n("uni-popup__" + $props.type)
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.vue"]]);
wx.createComponent(Component);
