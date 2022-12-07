"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  props: {
    options: {
      type: Object,
      default: function(e) {
        return {};
      }
    }
  },
  methods: {
    click() {
      this.$emit("click");
    },
    close(e) {
      this.$emit("close");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.options.title
  }, $props.options.title ? common_vendor.e({
    b: common_vendor.t($props.options.title),
    c: $props.options.article_type === 1 || $props.options.article_type === 2 ? 1 : "",
    d: $props.options.image_list || $props.options.image_url
  }, $props.options.image_list || $props.options.image_url ? common_vendor.e({
    e: $props.options.image_url
  }, $props.options.image_url ? {
    f: $props.options.article_type === 1 || $props.options.article_type === 2 ? 1 : "",
    g: $props.options.image_url
  } : {}, {
    h: $props.options.image_list
  }, $props.options.image_list ? {
    i: common_vendor.f($props.options.image_list, (source, i, i0) => {
      return {
        a: source.url,
        b: i
      };
    })
  } : {}, {
    j: $props.options.article_type === 2 ? 1 : "",
    k: $props.options.article_type === 1 ? 1 : ""
  }) : {}, {
    l: $props.options.article_type === 1 || $props.options.article_type === 2 ? $props.options.article_type === 2 ? "row" : "row-reverse" : "column",
    m: common_vendor.t($props.options.source),
    n: common_vendor.t($props.options.comment_count),
    o: common_vendor.t($props.options.datetime),
    p: common_vendor.o((...args) => $options.close && $options.close(...args)),
    q: common_vendor.o((...args) => $options.click && $options.click(...args))
  }) : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/template/tabbar/news-item.nvue"]]);
wx.createComponent(Component);
