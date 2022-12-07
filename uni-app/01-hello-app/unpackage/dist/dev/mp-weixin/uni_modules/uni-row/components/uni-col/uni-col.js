"use strict";
var common_vendor = require("../../../../common/vendor.js");
const ComponentClass = "uni-col";
const _sfc_main = {
  name: "uniCol",
  options: {
    virtualHost: true
  },
  props: {
    span: {
      type: Number,
      default: 24
    },
    offset: {
      type: Number,
      default: -1
    },
    pull: {
      type: Number,
      default: -1
    },
    push: {
      type: Number,
      default: -1
    },
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object]
  },
  data() {
    return {
      gutter: 0,
      sizeClass: "",
      parentWidth: 0,
      nvueWidth: 0,
      marginLeft: 0,
      right: 0,
      left: 0
    };
  },
  created() {
    let parent = this.$parent;
    while (parent && parent.$options.componentName !== "uniRow") {
      parent = parent.$parent;
    }
    this.updateGutter(parent.gutter);
    parent.$watch("gutter", (gutter) => {
      this.updateGutter(gutter);
    });
  },
  computed: {
    sizeList() {
      let {
        span,
        offset,
        pull,
        push
      } = this;
      return {
        span,
        offset,
        pull,
        push
      };
    },
    pointClassList() {
      let classList = [];
      ["xs", "sm", "md", "lg", "xl"].forEach((point) => {
        const props = this[point];
        if (typeof props === "number") {
          classList.push(`${ComponentClass}-${point}-${props}`);
        } else if (typeof props === "object" && props) {
          Object.keys(props).forEach((pointProp) => {
            classList.push(pointProp === "span" ? `${ComponentClass}-${point}-${props[pointProp]}` : `${ComponentClass}-${point}-${pointProp}-${props[pointProp]}`);
          });
        }
      });
      return classList.join(" ");
    }
  },
  methods: {
    updateGutter(parentGutter) {
      parentGutter = Number(parentGutter);
      if (!isNaN(parentGutter)) {
        this.gutter = parentGutter / 2;
      }
    }
  },
  watch: {
    sizeList: {
      immediate: true,
      handler(newVal) {
        let classList = [];
        for (let size in newVal) {
          const curSize = newVal[size];
          if ((curSize || curSize === 0) && curSize !== -1) {
            classList.push(size === "span" ? `${ComponentClass}-${curSize}` : `${ComponentClass}-${size}-${curSize}`);
          }
        }
        this.sizeClass = classList.join(" ");
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.n($data.sizeClass),
    b: common_vendor.n($options.pointClassList),
    c: `${Number($data.gutter)}rpx`,
    d: `${Number($data.gutter)}rpx`
  };
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-fff79656"], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-row/components/uni-col/uni-col.vue"]]);
wx.createComponent(Component);
