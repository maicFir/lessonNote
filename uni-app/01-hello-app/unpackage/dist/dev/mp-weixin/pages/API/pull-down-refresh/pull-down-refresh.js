"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "\u4E0B\u62C9\u5237\u65B0 + \u52A0\u8F7D\u66F4\u591A",
      data: [],
      loadMoreText: "\u52A0\u8F7D\u4E2D...",
      showLoadMore: false,
      max: 0
    };
  },
  onLoad() {
    this.initData();
  },
  onUnload() {
    this.max = 0, this.data = [], this.loadMoreText = "\u52A0\u8F7D\u66F4\u591A", this.showLoadMore = false;
  },
  onReachBottom() {
    console.log("onReachBottom");
    if (this.max > 40) {
      this.loadMoreText = "\u6CA1\u6709\u66F4\u591A\u6570\u636E\u4E86!";
      return;
    }
    this.showLoadMore = true;
    setTimeout(() => {
      this.setListData();
    }, 300);
  },
  onPullDownRefresh() {
    console.log("onPullDownRefresh");
    this.initData();
  },
  methods: {
    initData() {
      setTimeout(() => {
        this.max = 0;
        this.data = [];
        let data = [];
        this.max += 20;
        for (var i = this.max - 19; i < this.max + 1; i++) {
          data.push(i);
        }
        this.data = this.data.concat(data);
        common_vendor.index.stopPullDownRefresh();
      }, 300);
    },
    setListData() {
      let data = [];
      this.max += 10;
      for (var i = this.max - 9; i < this.max + 1; i++) {
        data.push(i);
      }
      this.data = this.data.concat(data);
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
  return common_vendor.e({
    a: common_vendor.p({
      title: $data.title
    }),
    b: common_vendor.f($data.data, (num, index, i0) => {
      return {
        a: common_vendor.t(num),
        b: index
      };
    }),
    c: $data.showLoadMore
  }, $data.showLoadMore ? {
    d: common_vendor.t($data.loadMoreText)
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/pull-down-refresh/pull-down-refresh.vue"]]);
wx.createPage(MiniProgramPage);
