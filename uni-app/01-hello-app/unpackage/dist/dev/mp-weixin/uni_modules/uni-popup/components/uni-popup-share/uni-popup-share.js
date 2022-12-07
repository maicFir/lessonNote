"use strict";
var uni_modules_uniPopup_components_uniPopup_popup = require("../uni-popup/popup.js");
var common_vendor = require("../../../../common/vendor.js");
var uni_modules_uniPopup_components_uniPopup_i18n_index = require("../uni-popup/i18n/index.js");
const { t } = common_vendor.initVueI18n(uni_modules_uniPopup_components_uniPopup_i18n_index.messages);
const _sfc_main = {
  name: "UniPopupShare",
  mixins: [uni_modules_uniPopup_components_uniPopup_popup.popup],
  emits: ["select"],
  props: {
    title: {
      type: String,
      default: ""
    },
    beforeClose: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bottomData: [
        {
          text: "\u5FAE\u4FE1",
          icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/c2b17470-50be-11eb-b680-7980c8a877b8.png",
          name: "wx"
        },
        {
          text: "\u652F\u4ED8\u5B9D",
          icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/d684ae40-50be-11eb-8ff1-d5dcf8779628.png",
          name: "wx"
        },
        {
          text: "QQ",
          icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/e7a79520-50be-11eb-b997-9918a5dda011.png",
          name: "qq"
        },
        {
          text: "\u65B0\u6D6A",
          icon: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/0dacdbe0-50bf-11eb-8ff1-d5dcf8779628.png",
          name: "sina"
        }
      ]
    };
  },
  created() {
  },
  computed: {
    cancelText() {
      return t("uni-popup.cancel");
    },
    shareTitleText() {
      return this.title || t("uni-popup.shareTitle");
    }
  },
  methods: {
    select(item, index) {
      this.$emit("select", {
        item,
        index
      });
      this.close();
    },
    close() {
      if (this.beforeClose)
        return;
      this.popup.close();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($options.shareTitleText),
    b: common_vendor.f($data.bottomData, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.text),
        c: index,
        d: common_vendor.o(($event) => $options.select(item, index), index)
      };
    }),
    c: common_vendor.t($options.cancelText),
    d: common_vendor.o((...args) => $options.close && $options.close(...args))
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-popup/components/uni-popup-share/uni-popup-share.vue"]]);
wx.createComponent(Component);
