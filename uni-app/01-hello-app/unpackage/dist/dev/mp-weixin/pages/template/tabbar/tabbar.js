"use strict";
var common_vendor = require("../../../common/vendor.js");
const mediaItem = () => "./news-item.js";
const MAX_CACHE_DATA = 100;
const MAX_CACHE_PAGE = 3;
const newsData = {
  data0: {
    "datetime": "40\u5206\u949F\u524D",
    "article_type": 0,
    "title": "uni-app\u884C\u4E1A\u5CF0\u4F1A\u9891\u9891\u4EAE\u76F8\uFF0C\u5F00\u53D1\u8005\u53CD\u54CD\u70ED\u70C8!",
    "source": "DCloud",
    "comment_count": 639
  },
  data1: {
    "datetime": "\u4E00\u5929\u524D",
    "article_type": 1,
    "title": "DCloud\u5B8C\u6210B2\u8F6E\u878D\u8D44\uFF0Cuni-app\u9707\u64BC\u53D1\u5E03!",
    "image_url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b7c7f970-517d-11eb-97b7-0dc4655d6e68.jpg",
    "source": "DCloud",
    "comment_count": 11395
  },
  data2: {
    "datetime": "\u4E00\u5929\u524D",
    "article_type": 2,
    "title": "\u4E2D\u56FD\u6280\u672F\u754C\u5C0F\u5947\u8FF9\uFF1AHBuilder\u5F00\u53D1\u8005\u7A81\u7834200\u4E07",
    "image_url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b4cd3000-517d-11eb-a16f-5b3e54966275.jpg",
    "source": "DCloud",
    "comment_count": 11395
  },
  data3: {
    "article_type": 3,
    "image_list": [{
      "url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b2e201d0-517d-11eb-8a36-ebb87efcf8c0.jpg",
      "width": 563,
      "height": 316
    }, {
      "url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b4cd3000-517d-11eb-a16f-5b3e54966275.jpg",
      "width": 641,
      "height": 360
    }, {
      "url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b7c7f970-517d-11eb-97b7-0dc4655d6e68.jpg",
      "width": 640,
      "height": 360
    }],
    "datetime": "5\u5206\u949F\u524D",
    "title": "uni-app \u652F\u6301\u4F7F\u7528 npm \u5B89\u88C5\u7B2C\u4E09\u65B9\u5305\uFF0C\u751F\u6001\u66F4\u8D8B\u4E30\u5BCC",
    "source": "DCloud",
    "comment_count": 11
  },
  data4: {
    "datetime": "2\u5C0F\u65F6\u524D",
    "article_type": 4,
    "title": "uni-app \u652F\u6301\u539F\u751F\u5C0F\u7A0B\u5E8F\u81EA\u5B9A\u4E49\u7EC4\u4EF6\uFF0C\u66F4\u5F00\u653E\u3001\u66F4\u81EA\u7531",
    "image_url": "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b2e201d0-517d-11eb-8a36-ebb87efcf8c0.jpg",
    "source": "DCloud",
    "comment_count": 69
  }
};
const _sfc_main = {
  components: {
    mediaItem
  },
  data() {
    return {
      newsList: [],
      cacheTab: [],
      tabIndex: 0,
      tabBars: [{
        name: "\u5173\u6CE8",
        id: "guanzhu"
      }, {
        name: "\u63A8\u8350",
        id: "tuijian"
      }, {
        name: "\u4F53\u80B2",
        id: "tiyu"
      }, {
        name: "\u70ED\u70B9",
        id: "redian"
      }, {
        name: "\u8D22\u7ECF",
        id: "caijing"
      }, {
        name: "\u5A31\u4E50",
        id: "yule"
      }, {
        name: "\u519B\u4E8B",
        id: "junshi"
      }, {
        name: "\u5386\u53F2",
        id: "lishi"
      }, {
        name: "\u672C\u5730",
        id: "bendi"
      }],
      scrollInto: "",
      showTips: false,
      navigateFlag: false,
      pulling: false,
      refreshIcon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAB5QTFRFcHBw3Nzct7e39vb2ycnJioqK7e3tpqam29vb////D8oK7wAAAAp0Uk5T////////////ALLMLM8AAABxSURBVHja7JVBDoAgDASrjqj//7CJBi90iyYeOHTPMwmFZrHjYyyFYYUy1bwUZqtJIYVxhf1a6u0R7iUvWsCcrEtwJHp8MwMdvh2amHduiZD3rpWId9+BgPd7Cc2LIkPyqvlQvKxKBJ//Qwq/CacAAwDUv0a0YuKhzgAAAABJRU5ErkJggg=="
    };
  },
  onLoad() {
    setTimeout(() => {
      this.tabBars.forEach((tabBar) => {
        this.newsList.push({
          data: [],
          isLoading: false,
          refreshText: "",
          loadingText: "\u52A0\u8F7D\u66F4\u591A..."
        });
      });
      this.getList(0);
    }, 350);
  },
  methods: {
    getList(index) {
      let activeTab = this.newsList[index];
      let list = [];
      for (let i = 1; i <= 10; i++) {
        let item = Object.assign({}, newsData["data" + Math.floor(Math.random() * 5)]);
        item.id = this.newGuid();
        list.push(item);
      }
      activeTab.data = activeTab.data.concat(list);
    },
    goDetail(e) {
      if (this.navigateFlag) {
        return;
      }
      this.navigateFlag = true;
      common_vendor.index.navigateTo({
        url: "./detail/detail?title=" + e.title
      });
      setTimeout(() => {
        this.navigateFlag = false;
      }, 200);
    },
    close(index1, index2) {
      common_vendor.index.showModal({
        content: "\u662F\u5426\u5220\u9664\u672C\u6761\u4FE1\u606F\uFF1F",
        success: (res) => {
          if (res.confirm) {
            this.newsList[index1].data.splice(index2, 1);
          }
        }
      });
    },
    loadMore(e) {
      setTimeout(() => {
        this.getList(this.tabIndex);
      }, 500);
    },
    ontabtap(e) {
      let index = e.target.dataset.current || e.currentTarget.dataset.current;
      this.switchTab(index);
    },
    ontabchange(e) {
      let index = e.target.current || e.detail.current;
      this.switchTab(index);
    },
    switchTab(index) {
      if (this.newsList[index].data.length === 0) {
        this.getList(index);
      }
      if (this.tabIndex === index) {
        return;
      }
      if (this.newsList[this.tabIndex].data.length > MAX_CACHE_DATA) {
        let isExist = this.cacheTab.indexOf(this.tabIndex);
        if (isExist < 0) {
          this.cacheTab.push(this.tabIndex);
        }
      }
      this.tabIndex = index;
      this.scrollInto = this.tabBars[index].id;
      if (this.cacheTab.length > MAX_CACHE_PAGE) {
        let cacheIndex = this.cacheTab[0];
        this.clearTabData(cacheIndex);
        this.cacheTab.splice(0, 1);
      }
    },
    clearTabData(e) {
      this.newsList[e].data.length = 0;
      this.newsList[e].loadingText = "\u52A0\u8F7D\u66F4\u591A...";
    },
    refreshData() {
    },
    onrefresh(e) {
      var tab = this.newsList[this.tabIndex];
      if (!tab.refreshFlag) {
        return;
      }
      tab.refreshing = true;
      tab.refreshText = "\u6B63\u5728\u5237\u65B0...";
      setTimeout(() => {
        this.refreshData();
        this.pulling = true;
        tab.refreshing = false;
        tab.refreshFlag = false;
        tab.refreshText = "\u5DF2\u5237\u65B0";
        setTimeout(() => {
          this.pulling = false;
        }, 500);
      }, 2e3);
    },
    onpullingdown(e) {
      var tab = this.newsList[this.tabIndex];
      if (tab.refreshing || this.pulling) {
        return;
      }
      if (Math.abs(e.pullingDistance) > Math.abs(e.viewHeight)) {
        tab.refreshFlag = true;
        tab.refreshText = "\u91CA\u653E\u7ACB\u5373\u5237\u65B0";
      } else {
        tab.refreshFlag = false;
        tab.refreshText = "\u4E0B\u62C9\u53EF\u4EE5\u5237\u65B0";
      }
    },
    newGuid() {
      let s4 = function() {
        return (65536 * (1 + Math.random()) | 0).toString(16).substring(1);
      };
      return (s4() + s4() + "-" + s4() + "-4" + s4().substr(0, 3) + "-" + s4() + "-" + s4() + s4() + s4()).toUpperCase();
    }
  }
};
if (!Array) {
  const _component_media_item = common_vendor.resolveComponent("media-item");
  _component_media_item();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.tabBars, (tab, index, i0) => {
      return {
        a: common_vendor.t(tab.name),
        b: common_vendor.n($data.tabIndex == index ? "uni-tab-item-title-active" : ""),
        c: tab.id,
        d: tab.id,
        e: index,
        f: common_vendor.o((...args) => $options.ontabtap && $options.ontabtap(...args), tab.id)
      };
    }),
    b: $data.scrollInto,
    c: common_vendor.f($data.newsList, (tab, index1, i0) => {
      return common_vendor.e({
        a: common_vendor.f(tab.data, (newsitem, index2, i1) => {
          return {
            a: common_vendor.o(($event) => $options.close(index1, index2)),
            b: common_vendor.o(($event) => $options.goDetail(newsitem)),
            c: "958b29fe-0-" + i0 + "-" + i1,
            d: common_vendor.p({
              options: newsitem
            }),
            e: newsitem.id
          };
        }),
        b: tab.isLoading || tab.data.length > 4
      }, tab.isLoading || tab.data.length > 4 ? {
        c: common_vendor.t(tab.loadingText)
      } : {}, {
        d: common_vendor.o(($event) => $options.loadMore(index1)),
        e: index1
      });
    }),
    d: $data.tabIndex,
    e: common_vendor.o((...args) => $options.ontabchange && $options.ontabchange(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/template/tabbar/tabbar.nvue"]]);
wx.createPage(MiniProgramPage);
