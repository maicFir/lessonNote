"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "UniRate",
  props: {
    isFill: {
      type: [Boolean, String],
      default: true
    },
    color: {
      type: String,
      default: "#ececec"
    },
    activeColor: {
      type: String,
      default: "#ffca3e"
    },
    disabledColor: {
      type: String,
      default: "#c0c0c0"
    },
    size: {
      type: [Number, String],
      default: 24
    },
    value: {
      type: [Number, String],
      default: 0
    },
    modelValue: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 5
    },
    margin: {
      type: [Number, String],
      default: 0
    },
    disabled: {
      type: [Boolean, String],
      default: false
    },
    readonly: {
      type: [Boolean, String],
      default: false
    },
    allowHalf: {
      type: [Boolean, String],
      default: false
    },
    touchable: {
      type: [Boolean, String],
      default: true
    }
  },
  data() {
    return {
      valueSync: "",
      userMouseFristMove: true,
      userRated: false,
      userLastRate: 1
    };
  },
  watch: {
    value(newVal) {
      this.valueSync = Number(newVal);
    },
    modelValue(newVal) {
      this.valueSync = Number(newVal);
    }
  },
  computed: {
    stars() {
      const value = this.valueSync ? this.valueSync : 0;
      const starList = [];
      const floorValue = Math.floor(value);
      const ceilValue = Math.ceil(value);
      for (let i = 0; i < this.max; i++) {
        if (floorValue > i) {
          starList.push({
            activeWitch: "100%"
          });
        } else if (ceilValue - 1 === i) {
          starList.push({
            activeWitch: (value - floorValue) * 100 + "%"
          });
        } else {
          starList.push({
            activeWitch: "0"
          });
        }
      }
      return starList;
    },
    marginNumber() {
      return Number(this.margin);
    }
  },
  created() {
    this.valueSync = Number(this.value || this.modelValue);
    this._rateBoxLeft = 0;
    this._oldValue = null;
  },
  mounted() {
    setTimeout(() => {
      this._getSize();
    }, 100);
  },
  methods: {
    touchstart(e) {
      if (this.readonly || this.disabled)
        return;
      const {
        clientX,
        screenX
      } = e.changedTouches[0];
      this._getRateCount(clientX || screenX);
    },
    touchmove(e) {
      if (this.readonly || this.disabled || !this.touchable)
        return;
      const {
        clientX,
        screenX
      } = e.changedTouches[0];
      this._getRateCount(clientX || screenX);
    },
    mousedown(e) {
    },
    mousemove(e) {
    },
    mouseleave(e) {
    },
    _getRateCount(clientX) {
      this._getSize();
      const size = Number(this.size);
      if (isNaN(size)) {
        return new Error("size \u5C5E\u6027\u53EA\u80FD\u8BBE\u7F6E\u4E3A\u6570\u5B57");
      }
      const rateMoveRange = clientX - this._rateBoxLeft;
      let index = parseInt(rateMoveRange / (size + this.marginNumber));
      index = index < 0 ? 0 : index;
      index = index > this.max ? this.max : index;
      const range = parseInt(rateMoveRange - (size + this.marginNumber) * index);
      let value = 0;
      if (this._oldValue === index && !this.PC)
        return;
      this._oldValue = index;
      if (this.allowHalf) {
        if (range > size / 2) {
          value = index + 1;
        } else {
          value = index + 0.5;
        }
      } else {
        value = index + 1;
      }
      value = Math.max(0.5, Math.min(value, this.max));
      this.valueSync = value;
      this._onChange();
    },
    _onChange() {
      this.$emit("input", this.valueSync);
      this.$emit("update:modelValue", this.valueSync);
      this.$emit("change", {
        value: this.valueSync
      });
    },
    _getSize() {
      common_vendor.index.createSelectorQuery().in(this).select(".uni-rate").boundingClientRect().exec((ret) => {
        if (ret) {
          this._rateBoxLeft = ret[0].left;
        }
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
  return {
    a: common_vendor.f($options.stars, (star, index, i0) => {
      return {
        a: "e6101bae-0-" + i0,
        b: "e6101bae-1-" + i0,
        c: star.activeWitch,
        d: index,
        e: common_vendor.o((...args) => $options.touchstart && $options.touchstart(...args), index),
        f: common_vendor.o((...args) => $options.touchmove && $options.touchmove(...args), index),
        g: common_vendor.o((...args) => $options.mousedown && $options.mousedown(...args), index),
        h: common_vendor.o((...args) => $options.mousemove && $options.mousemove(...args), index),
        i: common_vendor.o((...args) => $options.mouseleave && $options.mouseleave(...args), index)
      };
    }),
    b: common_vendor.p({
      color: $props.color,
      size: $props.size,
      type: $props.isFill ? "star-filled" : "star"
    }),
    c: common_vendor.p({
      color: $props.disabled ? $props.disabledColor : $props.activeColor,
      size: $props.size,
      type: "star-filled"
    }),
    d: $props.disabled ? 1 : "",
    e: $options.marginNumber + "px"
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-rate/components/uni-rate/uni-rate.vue"]]);
wx.createComponent(Component);
