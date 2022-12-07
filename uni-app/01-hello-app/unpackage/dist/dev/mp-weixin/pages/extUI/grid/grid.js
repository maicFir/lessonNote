"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      dynamicList: [],
      list: [
        {
          url: "/static/c1.png",
          text: "Grid 1",
          badge: "0",
          type: "primary"
        },
        {
          url: "/static/c2.png",
          text: "Grid 2",
          badge: "1",
          type: "success"
        },
        {
          url: "/static/c3.png",
          text: "Grid 3",
          badge: "99",
          type: "warning"
        },
        {
          url: "/static/c4.png",
          text: "Grid 4",
          badge: "2",
          type: "error"
        },
        {
          url: "/static/c5.png",
          text: "Grid 5"
        },
        {
          url: "/static/c6.png",
          text: "Grid 6"
        },
        {
          url: "/static/c7.png",
          text: "Grid 7"
        },
        {
          url: "/static/c8.png",
          text: "Grid 8"
        },
        {
          url: "/static/c9.png",
          text: "Grid 9"
        }
      ]
    };
  },
  methods: {
    change(e) {
      let {
        index
      } = e.detail;
      this.list[index].badge && this.list[index].badge++;
      common_vendor.index.showToast({
        title: `\u70B9\u51FB\u7B2C${index + 1}\u4E2A\u5BAB\u683C`,
        icon: "none"
      });
    },
    add() {
      if (this.dynamicList.length < 9) {
        this.dynamicList.push({
          url: `/static/c${this.dynamicList.length + 1}.png`,
          text: `Grid ${this.dynamicList.length + 1}`,
          color: this.dynamicList.length % 2 === 0 ? "#f5f5f5" : "#fff"
        });
      } else {
        common_vendor.index.showToast({
          title: "\u6700\u591A\u6DFB\u52A09\u4E2A",
          icon: "none"
        });
      }
    },
    del() {
      this.dynamicList.splice(this.dynamicList.length - 1, 1);
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  (_easycom_uni_card2 + _easycom_uni_icons2 + _easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_section2 + _easycom_uni_badge2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_grid_item = () => "../../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_badge = () => "../../../uni_modules/uni-badge/components/uni-badge/uni-badge.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_icons + _easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_section + _easycom_uni_badge)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      ["is-full"]: true,
      ["is-shadow"]: false
    }),
    b: common_vendor.f(4, (item, index, i0) => {
      return {
        a: "3ce2fd5c-4-" + i0 + "," + ("3ce2fd5c-3-" + i0),
        b: index,
        c: "3ce2fd5c-3-" + i0 + ",3ce2fd5c-2",
        d: common_vendor.p({
          index
        })
      };
    }),
    c: common_vendor.p({
      type: "image",
      size: 30,
      color: "#777"
    }),
    d: common_vendor.o($options.change),
    e: common_vendor.p({
      column: 4,
      highlight: true
    }),
    f: common_vendor.p({
      title: "\u57FA\u7840\u6837\u5F0F",
      type: "line",
      padding: true
    }),
    g: common_vendor.f(8, (item, index, i0) => {
      return {
        a: "3ce2fd5c-8-" + i0 + "," + ("3ce2fd5c-7-" + i0),
        b: index,
        c: "3ce2fd5c-7-" + i0 + ",3ce2fd5c-6",
        d: common_vendor.p({
          index
        })
      };
    }),
    h: common_vendor.p({
      type: "image",
      size: 30,
      color: "#777"
    }),
    i: common_vendor.o($options.change),
    j: common_vendor.p({
      column: 4,
      highlight: true
    }),
    k: common_vendor.p({
      title: "\u81EA\u5B9A\u4E49\u5217\u6570",
      type: "line",
      padding: true
    }),
    l: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: item.url,
        b: common_vendor.t(item.text),
        c: index,
        d: "3ce2fd5c-11-" + i0 + ",3ce2fd5c-10",
        e: common_vendor.p({
          index
        })
      };
    }),
    m: common_vendor.o($options.change),
    n: common_vendor.p({
      column: 3,
      highlight: true
    }),
    o: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: item.url,
        b: common_vendor.t(item.text),
        c: index,
        d: "3ce2fd5c-13-" + i0 + ",3ce2fd5c-12",
        e: common_vendor.p({
          index
        })
      };
    }),
    p: common_vendor.o($options.change),
    q: common_vendor.p({
      column: 3,
      highlight: true
    }),
    r: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: item.url,
        b: common_vendor.t(item.text),
        c: index,
        d: "3ce2fd5c-15-" + i0 + ",3ce2fd5c-14",
        e: common_vendor.p({
          index
        })
      };
    }),
    s: common_vendor.o($options.change),
    t: common_vendor.p({
      column: 3,
      highlight: true
    }),
    v: common_vendor.p({
      title: "\u6ED1\u52A8\u89C6\u56FE",
      type: "line",
      padding: true
    }),
    w: common_vendor.f($data.dynamicList, (item, index, i0) => {
      return {
        a: item.url,
        b: common_vendor.t(item.text),
        c: item.color,
        d: index,
        e: "3ce2fd5c-18-" + i0 + ",3ce2fd5c-17",
        f: common_vendor.p({
          index
        })
      };
    }),
    x: common_vendor.o($options.change),
    y: common_vendor.p({
      column: 3,
      highlight: true
    }),
    z: common_vendor.o((...args) => $options.add && $options.add(...args)),
    A: $data.dynamicList.length !== 0
  }, $data.dynamicList.length !== 0 ? {
    B: common_vendor.o((...args) => $options.del && $options.del(...args))
  } : {}, {
    C: common_vendor.p({
      title: "\u52A8\u6001\u52A0\u8F7D",
      type: "line",
      padding: true
    }),
    D: common_vendor.f($data.list, (item, index, i0) => {
      return common_vendor.e({
        a: item.url,
        b: common_vendor.t(item.text),
        c: item.badge
      }, item.badge ? {
        d: "3ce2fd5c-22-" + i0 + "," + ("3ce2fd5c-21-" + i0),
        e: common_vendor.p({
          text: item.badge,
          type: item.type
        })
      } : {}, {
        f: index,
        g: "3ce2fd5c-21-" + i0 + ",3ce2fd5c-20",
        h: common_vendor.p({
          index
        })
      });
    }),
    E: common_vendor.o($options.change),
    F: common_vendor.p({
      column: 3,
      ["show-border"]: false,
      square: false
    }),
    G: common_vendor.p({
      title: "\u65E0\u8FB9\u6846\u5E26\u89D2\u6807\uFF083\u5217\uFF09",
      type: "line",
      padding: true
    }),
    H: common_vendor.f($data.list, (item, index, i0) => {
      return {
        a: item.url,
        b: common_vendor.t(item.text),
        c: index,
        d: "3ce2fd5c-25-" + i0 + ",3ce2fd5c-24",
        e: common_vendor.p({
          index
        })
      };
    }),
    I: common_vendor.o($options.change),
    J: common_vendor.p({
      column: 3,
      square: false,
      highlight: false
    }),
    K: common_vendor.p({
      title: "\u77E9\u5F62\u5BAB\u683C\uFF083\u5217\uFF09",
      type: "line",
      padding: true
    }),
    L: common_vendor.p({
      index: 0
    }),
    M: common_vendor.p({
      index: 1
    }),
    N: common_vendor.p({
      index: 2
    }),
    O: common_vendor.p({
      index: 3
    }),
    P: common_vendor.o($options.change),
    Q: common_vendor.p({
      column: 4,
      ["border-color"]: "#03a9f4"
    }),
    R: common_vendor.p({
      title: "\u8FB9\u6846\u989C\u8272\uFF084\u5217 \u65E0\u6587\u5B57\uFF09",
      type: "line",
      padding: true
    })
  });
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/grid/grid.nvue"]]);
wx.createPage(MiniProgramPage);
