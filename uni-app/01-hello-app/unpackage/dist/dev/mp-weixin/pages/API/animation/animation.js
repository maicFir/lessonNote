"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "createAnimation",
      animationData: ""
    };
  },
  onUnload() {
    this.animationData = "";
  },
  onLoad() {
    this.animation = common_vendor.index.createAnimation();
  },
  methods: {
    rotate: function() {
      this.animation.rotate(Math.random() * 720 - 360).step();
      this.animationData = this.animation.export();
    },
    scale: function() {
      this.animation.scale(Math.random() * 2).step();
      this.animationData = this.animation.export();
    },
    translate: function() {
      this.animation.translate(Math.random() * 100 - 50, Math.random() * 100 - 50).step();
      this.animationData = this.animation.export();
    },
    skew: function() {
      this.animation.skew(Math.random() * 90, Math.random() * 90).step();
      this.animationData = this.animation.export();
    },
    rotateAndScale: function() {
      this.animation.rotate(Math.random() * 720 - 360).scale(Math.random() * 2).step();
      this.animationData = this.animation.export();
    },
    rotateThenScale: function() {
      this.animation.rotate(Math.random() * 720 - 360).step().scale(Math.random() * 2).step();
      this.animationData = this.animation.export();
    },
    all: function() {
      this.animation.rotate(Math.random() * 720 - 360).scale(Math.random() * 2).translate(Math.random() * 100 - 50, Math.random() * 100 - 50).skew(Math.random() * 90, Math.random() * 90).step();
      this.animationData = this.animation.export();
    },
    allInQueue: function() {
      this.animation.rotate(Math.random() * 720 - 360).step().scale(Math.random() * 2).step().translate(Math.random() * 100 - 50, Math.random() * 100 - 50).step().skew(Math.random() * 90, Math.random() * 90).step();
      this.animationData = this.animation.export();
    },
    reset: function() {
      this.animation.rotate(0, 0).scale(1).translate(0, 0).skew(0, 0).step({
        duration: 0
      });
      this.animationData = this.animation.export();
    }
  }
};
if (!Array) {
  const _easycom_page_head2 = common_vendor.resolveComponent("page-head");
  _easycom_page_head2();
}
const _easycom_page_head = () => "../../../components/page-head/page-head.js";
if (!Math) {
  _easycom_page_head();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      title: $data.title
    }),
    b: $data.animationData,
    c: common_vendor.o((...args) => $options.rotate && $options.rotate(...args)),
    d: common_vendor.o((...args) => $options.scale && $options.scale(...args)),
    e: common_vendor.o((...args) => $options.translate && $options.translate(...args)),
    f: common_vendor.o((...args) => $options.skew && $options.skew(...args)),
    g: common_vendor.o((...args) => $options.rotateAndScale && $options.rotateAndScale(...args)),
    h: common_vendor.o((...args) => $options.rotateThenScale && $options.rotateThenScale(...args)),
    i: common_vendor.o((...args) => $options.all && $options.all(...args)),
    j: common_vendor.o((...args) => $options.allInQueue && $options.allInQueue(...args)),
    k: common_vendor.o((...args) => $options.reset && $options.reset(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/animation/animation.vue"]]);
wx.createPage(MiniProgramPage);
