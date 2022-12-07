"use strict";
var common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      currentPage: ""
    };
  },
  options: {
    virtualHost: true
  },
  props: {
    to: {
      type: String,
      default: ""
    },
    replace: {
      type: Boolean,
      default: false
    }
  },
  inject: {
    uniBreadcrumb: {
      from: "uniBreadcrumb",
      default: null
    }
  },
  created() {
    const pages = getCurrentPages();
    const page = pages[pages.length - 1];
    if (page) {
      this.currentPage = `/${page.route}`;
    }
  },
  computed: {
    separator() {
      return this.uniBreadcrumb.separator;
    },
    separatorClass() {
      return this.uniBreadcrumb.separatorClass;
    }
  },
  methods: {
    navTo() {
      const { to } = this;
      if (!to || this.currentPage === to) {
        return;
      }
      if (this.replace) {
        common_vendor.index.redirectTo({
          url: to
        });
      } else {
        common_vendor.index.navigateTo({
          url: to
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.to && $data.currentPage !== $props.to ? 1 : "",
    b: common_vendor.o((...args) => $options.navTo && $options.navTo(...args)),
    c: $options.separatorClass
  }, $options.separatorClass ? {
    d: common_vendor.n($options.separatorClass)
  } : {
    e: common_vendor.t($options.separator)
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-breadcrumb/components/uni-breadcrumb-item/uni-breadcrumb-item.vue"]]);
wx.createComponent(Component);
