"use strict";
var common_vendor = require("../../../../common/vendor.js");
const indexedListItem = () => "./uni-indexed-list-item.js";
const _sfc_main = {
  name: "UniIndexedList",
  components: {
    indexedListItem
  },
  emits: ["click"],
  props: {
    options: {
      type: Array,
      default() {
        return [];
      }
    },
    showSelect: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      lists: [],
      winHeight: 0,
      itemHeight: 0,
      winOffsetY: 0,
      touchmove: false,
      touchmoveIndex: -1,
      scrollViewId: "",
      touchmovable: true,
      loaded: false,
      isPC: false
    };
  },
  watch: {
    options: {
      handler: function() {
        this.setList();
      },
      deep: true
    }
  },
  mounted() {
    setTimeout(() => {
      this.setList();
    }, 50);
    setTimeout(() => {
      this.loaded = true;
    }, 300);
  },
  methods: {
    setList() {
      this.lists = [];
      this.options.forEach((value, index) => {
        if (value.data.length === 0) {
          return;
        }
        let indexBefore = index;
        let items = value.data.map((item) => {
          let obj = {};
          obj["key"] = value.letter;
          obj["name"] = item;
          obj["itemIndex"] = index;
          index++;
          obj.checked = item.checked ? item.checked : false;
          return obj;
        });
        this.lists.push({
          title: value.letter,
          key: value.letter,
          items,
          itemIndex: indexBefore
        });
      });
      common_vendor.index.createSelectorQuery().in(this).select("#list").boundingClientRect().exec((ret) => {
        this.winOffsetY = ret[0].top;
        this.winHeight = ret[0].height;
        this.itemHeight = this.winHeight / this.lists.length;
      });
    },
    touchStart(e) {
      this.touchmove = true;
      let pageY = this.isPC ? e.pageY : e.touches[0].pageY;
      let index = Math.floor((pageY - this.winOffsetY) / this.itemHeight);
      let item = this.lists[index];
      if (item) {
        this.scrollViewId = "uni-indexed-list-" + index;
        this.touchmoveIndex = index;
      }
    },
    touchMove(e) {
      let pageY = this.isPC ? e.pageY : e.touches[0].pageY;
      let index = Math.floor((pageY - this.winOffsetY) / this.itemHeight);
      if (this.touchmoveIndex === index) {
        return false;
      }
      let item = this.lists[index];
      if (item) {
        this.scrollViewId = "uni-indexed-list-" + index;
        this.touchmoveIndex = index;
      }
    },
    touchEnd() {
      this.touchmove = false;
    },
    mousedown(e) {
      if (!this.isPC)
        return;
      this.touchStart(e);
    },
    mousemove(e) {
      if (!this.isPC)
        return;
      this.touchMove(e);
    },
    mouseleave(e) {
      if (!this.isPC)
        return;
      this.touchEnd(e);
    },
    onClick(e) {
      let {
        idx,
        index
      } = e;
      let obj = {};
      for (let key in this.lists[idx].items[index]) {
        obj[key] = this.lists[idx].items[index][key];
      }
      let select = [];
      if (this.showSelect) {
        this.lists[idx].items[index].checked = !this.lists[idx].items[index].checked;
        this.lists.forEach((value, idx2) => {
          value.items.forEach((item, index2) => {
            if (item.checked) {
              let obj2 = {};
              for (let key in this.lists[idx2].items[index2]) {
                obj2[key] = this.lists[idx2].items[index2][key];
              }
              select.push(obj2);
            }
          });
        });
      }
      this.$emit("click", {
        item: obj,
        select
      });
    }
  }
};
if (!Array) {
  const _component_indexed_list_item = common_vendor.resolveComponent("indexed-list-item");
  _component_indexed_list_item();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.lists, (list, idx, i0) => {
      return {
        a: "0f58ddf9-0-" + i0,
        b: common_vendor.p({
          list,
          loaded: $data.loaded,
          idx,
          showSelect: $props.showSelect
        }),
        c: idx,
        d: "uni-indexed-list-" + idx
      };
    }),
    b: common_vendor.o($options.onClick),
    c: $data.scrollViewId,
    d: common_vendor.f($data.lists, (list, key, i0) => {
      return {
        a: common_vendor.t(list.key),
        b: common_vendor.n($data.touchmoveIndex == key ? "uni-indexed-list__menu-text--active" : ""),
        c: key,
        d: common_vendor.n($data.touchmoveIndex == key ? "uni-indexed-list__menu--active" : "")
      };
    }),
    e: common_vendor.o((...args) => $options.touchStart && $options.touchStart(...args)),
    f: common_vendor.o((...args) => $options.touchMove && $options.touchMove(...args)),
    g: common_vendor.o((...args) => $options.touchEnd && $options.touchEnd(...args)),
    h: common_vendor.o((...args) => $options.mousedown && $options.mousedown(...args)),
    i: common_vendor.o((...args) => $options.mousemove && $options.mousemove(...args)),
    j: common_vendor.o((...args) => $options.mouseleave && $options.mouseleave(...args)),
    k: $data.touchmove
  }, $data.touchmove ? {
    l: common_vendor.t($data.lists[$data.touchmoveIndex].key)
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0f58ddf9"], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-indexed-list/components/uni-indexed-list/uni-indexed-list.vue"]]);
wx.createComponent(Component);
