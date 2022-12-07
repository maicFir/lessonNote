"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "UniTitle",
  props: {
    type: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    align: {
      type: String,
      default: "left"
    },
    color: {
      type: String,
      default: "#333333"
    },
    stat: {
      type: [Boolean, String],
      default: ""
    }
  },
  data() {
    return {};
  },
  computed: {
    textAlign() {
      let align = "center";
      switch (this.align) {
        case "left":
          align = "flex-start";
          break;
        case "center":
          align = "center";
          break;
        case "right":
          align = "flex-end";
          break;
      }
      return align;
    }
  },
  watch: {
    title(newVal) {
      if (this.isOpenStat()) {
        if (common_vendor.index.report) {
          common_vendor.index.report("title", this.title);
        }
      }
    }
  },
  mounted() {
    if (this.isOpenStat()) {
      if (common_vendor.index.report) {
        common_vendor.index.report("title", this.title);
      }
    }
  },
  methods: {
    isOpenStat() {
      if (this.stat === "") {
        this.isStat = false;
      }
      let stat_type = typeof this.stat === "boolean" && this.stat || typeof this.stat === "string" && this.stat !== "";
      if (this.type === "") {
        this.isStat = true;
        if (this.stat.toString() === "false") {
          this.isStat = false;
        }
      }
      if (this.type !== "") {
        this.isStat = true;
        if (stat_type) {
          this.isStat = true;
        } else {
          this.isStat = false;
        }
      }
      return this.isStat;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.title),
    b: common_vendor.n("uni-" + $props.type),
    c: $props.color,
    d: $options.textAlign
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-title/components/uni-title/uni-title.vue"]]);
wx.createComponent(Component);
