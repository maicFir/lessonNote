"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "uniDataChecklist",
  mixins: [common_vendor.yn.mixinDatacom || {}],
  emits: ["input", "update:modelValue", "change"],
  props: {
    mode: {
      type: String,
      default: "default"
    },
    multiple: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Array, String, Number],
      default() {
        return "";
      }
    },
    modelValue: {
      type: [Array, String, Number],
      default() {
        return "";
      }
    },
    localdata: {
      type: Array,
      default() {
        return [];
      }
    },
    min: {
      type: [Number, String],
      default: ""
    },
    max: {
      type: [Number, String],
      default: ""
    },
    wrap: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: "left"
    },
    selectedColor: {
      type: String,
      default: ""
    },
    selectedTextColor: {
      type: String,
      default: ""
    },
    emptyText: {
      type: String,
      default: "\u6682\u65E0\u6570\u636E"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    map: {
      type: Object,
      default() {
        return {
          text: "text",
          value: "value"
        };
      }
    }
  },
  watch: {
    localdata: {
      handler(newVal) {
        this.range = newVal;
        this.dataList = this.getDataList(this.getSelectedValue(newVal));
      },
      deep: true
    },
    mixinDatacomResData(newVal) {
      this.range = newVal;
      this.dataList = this.getDataList(this.getSelectedValue(newVal));
    },
    value(newVal) {
      this.dataList = this.getDataList(newVal);
    },
    modelValue(newVal) {
      this.dataList = this.getDataList(newVal);
    }
  },
  data() {
    return {
      dataList: [],
      range: [],
      contentText: {
        contentdown: "\u67E5\u770B\u66F4\u591A",
        contentrefresh: "\u52A0\u8F7D\u4E2D",
        contentnomore: "\u6CA1\u6709\u66F4\u591A"
      },
      isLocal: true,
      styles: {
        selectedColor: "#2979ff",
        selectedTextColor: "#666"
      },
      isTop: 0
    };
  },
  computed: {
    dataValue() {
      if (this.value === "")
        return this.modelValue;
      if (this.modelValue === "")
        return this.value;
      return this.value;
    }
  },
  created() {
    if (this.localdata && this.localdata.length !== 0) {
      this.isLocal = true;
      this.range = this.localdata;
      this.dataList = this.getDataList(this.getSelectedValue(this.range));
    } else {
      if (this.collection) {
        this.isLocal = false;
        this.loadData();
      }
    }
  },
  methods: {
    loadData() {
      this.mixinDatacomGet().then((res) => {
        this.mixinDatacomResData = res.result.data;
        if (this.mixinDatacomResData.length === 0) {
          this.isLocal = false;
          this.mixinDatacomErrorMessage = this.emptyText;
        } else {
          this.isLocal = true;
        }
      }).catch((err) => {
        this.mixinDatacomErrorMessage = err.message;
      });
    },
    getForm(name = "uniForms") {
      let parent = this.$parent;
      let parentName = parent.$options.name;
      while (parentName !== name) {
        parent = parent.$parent;
        if (!parent)
          return false;
        parentName = parent.$options.name;
      }
      return parent;
    },
    chagne(e) {
      const values = e.detail.value;
      let detail = {
        value: [],
        data: []
      };
      if (this.multiple) {
        this.range.forEach((item) => {
          if (values.includes(item[this.map.value] + "")) {
            detail.value.push(item[this.map.value]);
            detail.data.push(item);
          }
        });
      } else {
        const range = this.range.find((item) => item[this.map.value] + "" === values);
        if (range) {
          detail = {
            value: range[this.map.value],
            data: range
          };
        }
      }
      this.$emit("input", detail.value);
      this.$emit("update:modelValue", detail.value);
      this.$emit("change", {
        detail
      });
      if (this.multiple) {
        this.dataList = this.getDataList(detail.value, true);
      } else {
        this.dataList = this.getDataList(detail.value);
      }
    },
    getDataList(value) {
      let dataList = JSON.parse(JSON.stringify(this.range));
      let list = [];
      if (this.multiple) {
        if (!Array.isArray(value)) {
          value = [];
        }
      }
      dataList.forEach((item, index) => {
        item.disabled = item.disable || item.disabled || false;
        if (this.multiple) {
          if (value.length > 0) {
            let have = value.find((val) => val === item[this.map.value]);
            item.selected = have !== void 0;
          } else {
            item.selected = false;
          }
        } else {
          item.selected = value === item[this.map.value];
        }
        list.push(item);
      });
      return this.setRange(list);
    },
    setRange(list) {
      let selectList = list.filter((item) => item.selected);
      let min = Number(this.min) || 0;
      let max = Number(this.max) || "";
      list.forEach((item, index) => {
        if (this.multiple) {
          if (selectList.length <= min) {
            let have = selectList.find((val) => val[this.map.value] === item[this.map.value]);
            if (have !== void 0) {
              item.disabled = true;
            }
          }
          if (selectList.length >= max && max !== "") {
            let have = selectList.find((val) => val[this.map.value] === item[this.map.value]);
            if (have === void 0) {
              item.disabled = true;
            }
          }
        }
        this.setStyles(item, index);
        list[index] = item;
      });
      return list;
    },
    setStyles(item, index) {
      item.styleBackgroud = this.setStyleBackgroud(item);
      item.styleIcon = this.setStyleIcon(item);
      item.styleIconText = this.setStyleIconText(item);
      item.styleRightIcon = this.setStyleRightIcon(item);
    },
    getSelectedValue(range) {
      if (!this.multiple)
        return this.dataValue;
      let selectedArr = [];
      range.forEach((item) => {
        if (item.selected) {
          selectedArr.push(item[this.map.value]);
        }
      });
      return this.dataValue.length > 0 ? this.dataValue : selectedArr;
    },
    setStyleBackgroud(item) {
      let styles = {};
      let selectedColor = this.selectedColor ? this.selectedColor : "#2979ff";
      if (this.mode !== "list") {
        styles["border-color"] = item.selected ? selectedColor : "#DCDFE6";
      }
      if (this.mode === "tag") {
        styles["background-color"] = item.selected ? selectedColor : "#f5f5f5";
      }
      let classles = "";
      for (let i in styles) {
        classles += `${i}:${styles[i]};`;
      }
      return classles;
    },
    setStyleIcon(item) {
      let styles = {};
      let classles = "";
      let selectedColor = this.selectedColor ? this.selectedColor : "#2979ff";
      styles["background-color"] = item.selected ? selectedColor : "#fff";
      styles["border-color"] = item.selected ? selectedColor : "#DCDFE6";
      if (!item.selected && item.disabled) {
        styles["background-color"] = "#F2F6FC";
        styles["border-color"] = item.selected ? selectedColor : "#DCDFE6";
      }
      for (let i in styles) {
        classles += `${i}:${styles[i]};`;
      }
      return classles;
    },
    setStyleIconText(item) {
      let styles = {};
      let classles = "";
      let selectedColor = this.selectedColor ? this.selectedColor : "#2979ff";
      if (this.mode === "tag") {
        styles.color = item.selected ? this.selectedTextColor ? this.selectedTextColor : "#fff" : "#666";
      } else {
        styles.color = item.selected ? this.selectedTextColor ? this.selectedTextColor : selectedColor : "#666";
      }
      if (!item.selected && item.disabled) {
        styles.color = "#999";
      }
      for (let i in styles) {
        classles += `${i}:${styles[i]};`;
      }
      return classles;
    },
    setStyleRightIcon(item) {
      let styles = {};
      let classles = "";
      if (this.mode === "list") {
        styles["border-color"] = item.selected ? this.styles.selectedColor : "#DCDFE6";
      }
      for (let i in styles) {
        classles += `${i}:${styles[i]};`;
      }
      return classles;
    }
  }
};
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  _easycom_uni_load_more2();
}
const _easycom_uni_load_more = () => "../../../uni-load-more/components/uni-load-more/uni-load-more.js";
if (!Math) {
  _easycom_uni_load_more();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$data.isLocal
  }, !$data.isLocal ? common_vendor.e({
    b: !_ctx.mixinDatacomErrorMessage
  }, !_ctx.mixinDatacomErrorMessage ? {
    c: common_vendor.p({
      status: "loading",
      iconType: "snow",
      iconSize: 18,
      ["content-text"]: $data.contentText
    })
  } : {
    d: common_vendor.t(_ctx.mixinDatacomErrorMessage)
  }) : common_vendor.e({
    e: $props.multiple
  }, $props.multiple ? {
    f: common_vendor.f($data.dataList, (item, index, i0) => {
      return common_vendor.e({
        a: $props.disabled || !!item.disabled,
        b: item[$props.map.value] + "",
        c: item.selected
      }, $props.mode !== "tag" && $props.mode !== "list" || $props.mode === "list" && $props.icon === "left" ? {
        d: common_vendor.s(item.styleIcon)
      } : {}, {
        e: common_vendor.t(item[$props.map.text]),
        f: common_vendor.s(item.styleIconText)
      }, $props.mode === "list" && $props.icon === "right" ? {
        g: common_vendor.s(item.styleBackgroud)
      } : {}, {
        h: common_vendor.n(item.selected ? "is-checked" : ""),
        i: common_vendor.n($props.disabled || !!item.disabled ? "is-disable" : ""),
        j: common_vendor.n(index !== 0 && $props.mode === "list" ? "is-list-border" : ""),
        k: common_vendor.s(item.styleBackgroud),
        l: index
      });
    }),
    g: $props.mode !== "tag" && $props.mode !== "list" || $props.mode === "list" && $props.icon === "left",
    h: $props.mode === "list" && $props.icon === "right",
    i: $props.mode === "list" && $props.icon === "left" ? 1 : "",
    j: common_vendor.n("is--" + $props.mode),
    k: $props.mode === "list" || $props.wrap ? 1 : "",
    l: common_vendor.o((...args) => $options.chagne && $options.chagne(...args))
  } : {
    m: common_vendor.f($data.dataList, (item, index, i0) => {
      return common_vendor.e({
        a: $props.disabled || item.disabled,
        b: item[$props.map.value] + "",
        c: item.selected
      }, $props.mode !== "tag" && $props.mode !== "list" || $props.mode === "list" && $props.icon === "left" ? {
        d: common_vendor.s(item.styleIcon),
        e: common_vendor.s(item.styleBackgroud)
      } : {}, {
        f: common_vendor.t(item[$props.map.text]),
        g: common_vendor.s(item.styleIconText)
      }, $props.mode === "list" && $props.icon === "right" ? {
        h: common_vendor.s(item.styleRightIcon)
      } : {}, {
        i: common_vendor.n(item.selected ? "is-checked" : ""),
        j: common_vendor.n($props.disabled || !!item.disabled ? "is-disable" : ""),
        k: common_vendor.n(index !== 0 && $props.mode === "list" ? "is-list-border" : ""),
        l: common_vendor.s(item.styleBackgroud),
        m: index
      });
    }),
    n: $props.mode !== "tag" && $props.mode !== "list" || $props.mode === "list" && $props.icon === "left",
    o: $props.mode === "list" && $props.icon === "right",
    p: $props.mode === "list" && $props.icon === "left" ? 1 : "",
    q: common_vendor.n("is--" + $props.mode),
    r: $props.mode === "list" ? 1 : "",
    s: $props.wrap ? 1 : "",
    t: common_vendor.o((...args) => $options.chagne && $options.chagne(...args))
  }), {
    v: $data.isTop + "px"
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.vue"]]);
wx.createComponent(Component);
