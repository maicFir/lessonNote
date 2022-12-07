"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "UniIndexedList",
  emits: ["itemClick"],
  props: {
    loaded: {
      type: Boolean,
      default: false
    },
    idx: {
      type: Number,
      default: 0
    },
    list: {
      type: Object,
      default() {
        return {};
      }
    },
    showSelect: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick(idx, index) {
      this.$emit("itemClick", {
        idx,
        index
      });
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
    a: $props.loaded || $props.list.itemIndex < 15
  }, $props.loaded || $props.list.itemIndex < 15 ? common_vendor.e({
    b: $props.list.items && $props.list.items.length > 0
  }, $props.list.items && $props.list.items.length > 0 ? {
    c: common_vendor.t($props.list.key)
  } : {}) : {}, {
    d: ($props.loaded || $props.list.itemIndex < 15) && $props.list.items && $props.list.items.length > 0
  }, ($props.loaded || $props.list.itemIndex < 15) && $props.list.items && $props.list.items.length > 0 ? {
    e: common_vendor.f($props.list.items, (item, index, i0) => {
      return common_vendor.e($props.showSelect ? {
        a: "f3e68ed2-0-" + i0,
        b: common_vendor.p({
          type: item.checked ? "checkbox-filled" : "circle",
          color: item.checked ? "#007aff" : "#C0C0C0",
          size: "24"
        })
      } : {}, {
        c: common_vendor.t(item.name),
        d: index === $props.list.items.length - 1 ? 1 : "",
        e: common_vendor.o(($event) => $options.onClick($props.idx, index)),
        f: index
      });
    }),
    f: $props.showSelect
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f3e68ed2"], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-indexed-list/components/uni-indexed-list/uni-indexed-list-item.vue"]]);
wx.createComponent(Component);
