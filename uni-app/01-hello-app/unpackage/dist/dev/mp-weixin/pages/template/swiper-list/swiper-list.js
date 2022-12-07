"use strict";
var common_vendor = require("../../../common/vendor.js");
const MAX_CACHE_DATA = 100;
const MAX_CACHE_PAGE = 3;
const TAB_PRELOAD_OFFSET = 1;
const swiperPage = () => "./swiper-page.js";
const _sfc_main = {
  components: {
    swiperPage
  },
  data() {
    return {
      tabList: [],
      tabIndex: 0,
      cacheTab: [],
      scrollInto: "",
      indicatorLineLeft: 0,
      indicatorLineWidth: 0,
      isTap: false
    };
  },
  onLoad() {
    for (var i = 0; i < 6; i++) {
      this.tabList.push({
        id: "tab" + i,
        name: "Tab " + (i + 1),
        pageid: i + 1
      });
    }
  },
  onReady() {
    this._lastTabIndex = 0;
    this.swiperWidth = 0;
    this.tabbarWidth = 0;
    this.tabListSize = {};
    this._touchTabIndex = 0;
    this.pageList = this.$refs.page;
    this.switchTab(this.tabIndex);
    this.getTabbarItemsSize();
  },
  methods: {
    ontabtap(e) {
      let index = e.target.dataset.current || e.currentTarget.dataset.current;
      this.isTap = true;
      var currentSize = this.tabListSize[index];
      this.updateIndicator(currentSize.left, currentSize.width);
      this._touchTabIndex = index;
      this.switchTab(index);
    },
    onswiperchange(e) {
    },
    onswiperscroll(e) {
      if (this.isTap) {
        return;
      }
      var offsetX = e.detail.dx;
      var preloadIndex = this._lastTabIndex;
      if (offsetX > TAB_PRELOAD_OFFSET) {
        preloadIndex++;
      } else if (offsetX < -TAB_PRELOAD_OFFSET) {
        preloadIndex--;
      }
      if (preloadIndex === this._lastTabIndex || preloadIndex < 0 || preloadIndex > this.pageList.length - 1) {
        return;
      }
      if (this.pageList[preloadIndex].dataList.length === 0) {
        this.loadTabData(preloadIndex);
      }
      var percentage = Math.abs(this.swiperWidth / offsetX);
      var currentSize = this.tabListSize[this._lastTabIndex];
      var preloadSize = this.tabListSize[preloadIndex];
      var lineL = currentSize.left + (preloadSize.left - currentSize.left) / percentage;
      var lineW = currentSize.width + (preloadSize.width - currentSize.width) / percentage;
      this.updateIndicator(lineL, lineW);
    },
    animationfinish(e) {
      let index = e.detail.current;
      if (this._touchTabIndex === index) {
        this.isTap = false;
      }
      this._lastTabIndex = index;
      this.switchTab(index);
      this.updateIndicator(this.tabListSize[index].left, this.tabListSize[index].width);
    },
    getTabbarItemsSize() {
      common_vendor.index.createSelectorQuery().in(this).select(".tab-view").fields({
        dataset: true,
        size: true
      }, (res) => {
        this.swiperWidth = res.width;
      }).exec();
      common_vendor.index.createSelectorQuery().in(this).selectAll(".uni-tab-item").boundingClientRect((rects) => {
        rects.forEach((rect) => {
          this.tabListSize[rect.dataset.id] = rect;
        });
      }).exec();
      setTimeout(() => {
        this.updateIndicator(this.tabListSize[this.tabIndex].left, this.tabListSize[this.tabIndex].width);
      }, 100);
    },
    updateIndicator(left, width) {
      this.indicatorLineLeft = left;
      this.indicatorLineWidth = width;
    },
    switchTab(index) {
      if (this.pageList[index].dataList.length === 0) {
        this.loadTabData(index);
      }
      if (this.tabIndex === index) {
        return;
      }
      if (this.pageList[this.tabIndex].dataList.length > MAX_CACHE_DATA) {
        let isExist = this.cacheTab.indexOf(this.tabIndex);
        if (isExist < 0) {
          this.cacheTab.push(this.tabIndex);
        }
      }
      this.tabIndex = index;
      this.scrollInto = this.tabList[index].id;
      if (this.cacheTab.length > MAX_CACHE_PAGE) {
        let cacheIndex = this.cacheTab[0];
        this.clearTabData(cacheIndex);
        this.cacheTab.splice(0, 1);
      }
    },
    scrollTabTo(index) {
      const el = this.$refs["tabitem" + index][0];
      let offset = 0;
      if (index > 0) {
        offset = this.tabbarWidth / 2 - this.tabListSize[index].width / 2;
        if (this.tabListSize[index].right < this.tabbarWidth / 2) {
          offset = this.tabListSize[0].width;
        }
      }
      dom.scrollToElement(el, {
        offset: -offset
      });
    },
    loadTabData(index) {
      this.pageList[index].loadData();
    },
    clearTabData(index) {
      this.pageList[index].clear();
    }
  }
};
if (!Array) {
  const _component_swiperPage = common_vendor.resolveComponent("swiperPage");
  _component_swiperPage();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.tabList, (tab, index, i0) => {
      return {
        a: common_vendor.t(tab.name),
        b: common_vendor.n($data.tabIndex == index ? "uni-tab-item-title-active" : ""),
        c: tab.id,
        d: tab.id,
        e: "tabitem" + index,
        f: index,
        g: index,
        h: common_vendor.o((...args) => $options.ontabtap && $options.ontabtap(...args), tab.id)
      };
    }),
    b: common_vendor.n($data.isTap ? "scroll-view-animation" : ""),
    c: $data.indicatorLineLeft + "px",
    d: $data.indicatorLineWidth + "px",
    e: $data.scrollInto,
    f: common_vendor.f($data.tabList, (page, index, i0) => {
      return {
        a: common_vendor.sr("page", "1334d119-0-" + i0, {
          "f": 1
        }),
        b: "1334d119-0-" + i0,
        c: common_vendor.p({
          pid: page.pageid
        }),
        d: index
      };
    }),
    g: $data.tabIndex,
    h: common_vendor.o((...args) => $options.onswiperchange && $options.onswiperchange(...args)),
    i: common_vendor.o((...args) => $options.onswiperscroll && $options.onswiperscroll(...args)),
    j: common_vendor.o((...args) => $options.animationfinish && $options.animationfinish(...args)),
    k: common_vendor.o((...args) => $options.animationfinish && $options.animationfinish(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/template/swiper-list/swiper-list.nvue"]]);
wx.createPage(MiniProgramPage);
