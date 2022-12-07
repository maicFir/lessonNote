"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "UniGridItem",
  inject: ["grid"],
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      column: 0,
      showBorder: true,
      square: true,
      highlight: true,
      left: 0,
      top: 0,
      openNum: 2,
      width: 0,
      borderColor: "#e5e5e5"
    };
  },
  created() {
    this.column = this.grid.column;
    this.showBorder = this.grid.showBorder;
    this.square = this.grid.square;
    this.highlight = this.grid.highlight;
    this.top = this.hor === 0 ? this.grid.hor : this.hor;
    this.left = this.ver === 0 ? this.grid.ver : this.ver;
    this.borderColor = this.grid.borderColor;
    this.grid.children.push(this);
    this.width = this.grid.width;
  },
  beforeDestroy() {
    this.grid.children.forEach((item, index) => {
      if (item === this) {
        this.grid.children.splice(index, 1);
      }
    });
  },
  methods: {
    _onClick() {
      this.grid.change({
        detail: {
          index: this.index
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.width
  }, $data.width ? {
    b: $data.showBorder ? 1 : "",
    c: $data.showBorder && $props.index < $data.column ? 1 : "",
    d: $data.highlight ? 1 : "",
    e: $data.borderColor,
    f: $data.borderColor,
    g: $data.borderColor,
    h: common_vendor.o((...args) => $options._onClick && $options._onClick(...args)),
    i: common_vendor.s("width:" + $data.width + ";" + ($data.square ? "height:" + $data.width : ""))
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7b4a3849"], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.vue"]]);
wx.createComponent(Component);
