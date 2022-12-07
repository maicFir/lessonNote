"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "uploadFile",
  emits: ["uploadFiles", "choose", "delFile"],
  props: {
    filesList: {
      type: Array,
      default() {
        return [];
      }
    },
    delIcon: {
      type: Boolean,
      default: true
    },
    limit: {
      type: [Number, String],
      default: 9
    },
    showType: {
      type: String,
      default: ""
    },
    listStyles: {
      type: Object,
      default() {
        return {
          border: true,
          dividline: true,
          borderStyle: {}
        };
      }
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    list() {
      let files = [];
      this.filesList.forEach((v) => {
        files.push(v);
      });
      return files;
    },
    styles() {
      let styles = {
        border: true,
        dividline: true,
        "border-style": {}
      };
      return Object.assign(styles, this.listStyles);
    },
    borderStyle() {
      let {
        borderStyle,
        border
      } = this.styles;
      let obj = {};
      if (!border) {
        obj.border = "none";
      } else {
        let width = borderStyle && borderStyle.width || 1;
        width = this.value2px(width);
        let radius = borderStyle && borderStyle.radius || 5;
        radius = this.value2px(radius);
        obj = {
          "border-width": width,
          "border-style": borderStyle && borderStyle.style || "solid",
          "border-color": borderStyle && borderStyle.color || "#eee",
          "border-radius": radius
        };
      }
      let classles = "";
      for (let i in obj) {
        classles += `${i}:${obj[i]};`;
      }
      return classles;
    },
    borderLineStyle() {
      let obj = {};
      let {
        borderStyle
      } = this.styles;
      if (borderStyle && borderStyle.color) {
        obj["border-color"] = borderStyle.color;
      }
      if (borderStyle && borderStyle.width) {
        let width = borderStyle && borderStyle.width || 1;
        let style = borderStyle && borderStyle.style || 0;
        if (typeof width === "number") {
          width += "px";
        } else {
          width = width.indexOf("px") ? width : width + "px";
        }
        obj["border-width"] = width;
        if (typeof style === "number") {
          style += "px";
        } else {
          style = style.indexOf("px") ? style : style + "px";
        }
        obj["border-top-style"] = style;
      }
      let classles = "";
      for (let i in obj) {
        classles += `${i}:${obj[i]};`;
      }
      return classles;
    }
  },
  methods: {
    uploadFiles(item, index) {
      this.$emit("uploadFiles", {
        item,
        index
      });
    },
    choose() {
      this.$emit("choose");
    },
    delFile(index) {
      this.$emit("delFile", index);
    },
    value2px(value) {
      if (typeof value === "number") {
        value += "px";
      } else {
        value = value.indexOf("px") !== -1 ? value : value + "px";
      }
      return value;
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$props.readonly
  }, !$props.readonly ? {
    b: common_vendor.o((...args) => $options.choose && $options.choose(...args))
  } : {}, {
    c: $options.list.length > 0
  }, $options.list.length > 0 ? {
    d: common_vendor.f($options.list, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.name)
      }, $props.delIcon && !$props.readonly ? {
        b: common_vendor.o(($event) => $options.delFile(index))
      } : {}, {
        c: item.progress && item.progress !== 100 || item.progress === 0
      }, item.progress && item.progress !== 100 || item.progress === 0 ? {
        d: item.progress === -1 ? 0 : item.progress,
        e: item.errMsg ? "#ff5a5f" : "#EBEBEB"
      } : {}, {
        f: item.status === "error"
      }, item.status === "error" ? {
        g: common_vendor.o(($event) => $options.uploadFiles(item, index))
      } : {}, {
        h: index,
        i: index !== 0 && $options.styles.dividline ? 1 : "",
        j: common_vendor.s(index !== 0 && $options.styles.dividline && $options.borderLineStyle)
      });
    }),
    e: $props.delIcon && !$props.readonly,
    f: common_vendor.s($options.borderStyle)
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-file-picker/components/uni-file-picker/upload-file.vue"]]);
wx.createComponent(Component);
