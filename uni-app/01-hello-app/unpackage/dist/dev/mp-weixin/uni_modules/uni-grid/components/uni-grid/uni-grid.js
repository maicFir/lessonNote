"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "UniGrid",
  emits: ["change"],
  props: {
    column: {
      type: Number,
      default: 3
    },
    showBorder: {
      type: Boolean,
      default: true
    },
    borderColor: {
      type: String,
      default: "#D2D2D2"
    },
    square: {
      type: Boolean,
      default: true
    },
    highlight: {
      type: Boolean,
      default: true
    }
  },
  provide() {
    return {
      grid: this
    };
  },
  data() {
    const elId = `Uni_${Math.ceil(Math.random() * 1e6).toString(36)}`;
    return {
      elId,
      width: 0
    };
  },
  created() {
    this.children = [];
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      setTimeout(() => {
        this._getSize((width) => {
          this.children.forEach((item, index) => {
            item.width = width;
          });
        });
      }, 50);
    },
    change(e) {
      this.$emit("change", e);
    },
    _getSize(fn) {
      common_vendor.index.createSelectorQuery().in(this).select(`#${this.elId}`).boundingClientRect().exec((ret) => {
        this.width = parseInt((ret[0].width - 1) / this.column) + "px";
        fn(this.width);
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.elId,
    b: $props.showBorder ? 1 : "",
    c: $props.borderColor
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-aaae28a6"], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-grid/components/uni-grid/uni-grid.vue"]]);
wx.createComponent(Component);
