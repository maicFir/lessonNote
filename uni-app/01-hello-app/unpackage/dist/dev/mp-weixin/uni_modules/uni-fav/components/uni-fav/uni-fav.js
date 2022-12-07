"use strict";
var common_vendor = require("../../../../common/vendor.js");
var uni_modules_uniFav_components_uniFav_i18n_index = require("./i18n/index.js");
const { t } = common_vendor.initVueI18n(uni_modules_uniFav_components_uniFav_i18n_index.messages);
const _sfc_main = {
  name: "UniFav",
  emits: ["click"],
  props: {
    star: {
      type: [Boolean, String],
      default: true
    },
    bgColor: {
      type: String,
      default: "#eeeeee"
    },
    fgColor: {
      type: String,
      default: "#666666"
    },
    bgColorChecked: {
      type: String,
      default: "#007aff"
    },
    fgColorChecked: {
      type: String,
      default: "#FFFFFF"
    },
    circle: {
      type: [Boolean, String],
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    contentText: {
      type: Object,
      default() {
        return {
          contentDefault: "",
          contentFav: ""
        };
      }
    },
    stat: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    contentDefault() {
      return this.contentText.contentDefault || t("uni-fav.collect");
    },
    contentFav() {
      return this.contentText.contentFav || t("uni-fav.collected");
    }
  },
  watch: {
    checked() {
      if (common_vendor.index.report && this.stat) {
        if (this.checked) {
          common_vendor.index.report("\u6536\u85CF", "\u6536\u85CF");
        } else {
          common_vendor.index.report("\u53D6\u6D88\u6536\u85CF", "\u53D6\u6D88\u6536\u85CF");
        }
      }
    }
  },
  methods: {
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
    a: !$props.checked && ($props.star === true || $props.star === "true")
  }, !$props.checked && ($props.star === true || $props.star === "true") ? {
    b: $props.checked ? $props.fgColorChecked : $props.fgColor,
    c: common_vendor.p({
      color: $props.fgColor,
      size: "14",
      type: "star-filled"
    })
  } : {}, {
    d: common_vendor.t($props.checked ? $options.contentFav : $options.contentDefault),
    e: $props.checked ? $props.fgColorChecked : $props.fgColor,
    f: common_vendor.n($props.circle === true || $props.circle === "true" ? "uni-fav--circle" : ""),
    g: common_vendor.s({
      backgroundColor: $props.checked ? $props.bgColorChecked : $props.bgColor
    }),
    h: common_vendor.o((...args) => $options.onClick && $options.onClick(...args))
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-fav/components/uni-fav/uni-fav.vue"]]);
wx.createComponent(Component);
