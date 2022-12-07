"use strict";
var common_vendor = require("../../../common/vendor.js");
var common_htmlParser = require("../../../common/html-parser.js");
const DETAIL_PAGE_PATH = "/pages/template/list2detail-detail/list2detail-detail";
function _handleShareChannels(provider) {
  let channels = [];
  for (let i = 0, len = provider.length; i < len; i++) {
    switch (provider[i]) {
      case "weixin":
        channels.push({
          text: "\u5206\u4EAB\u5230\u5FAE\u4FE1\u597D\u53CB",
          id: "weixin",
          sort: 0
        });
        channels.push({
          text: "\u5206\u4EAB\u5230\u5FAE\u4FE1\u670B\u53CB\u5708",
          id: "weixin",
          sort: 1
        });
        break;
    }
  }
  channels.sort(function(x, y) {
    return x.sort - y.sort;
  });
  return channels;
}
const _sfc_main = {
  data() {
    return {
      title: "",
      banner: {},
      htmlNodes: []
    };
  },
  onLoad(event) {
    const payload = event.detailDate || event.payload;
    try {
      this.banner = JSON.parse(decodeURIComponent(payload));
    } catch (error) {
      this.banner = JSON.parse(payload);
    }
    common_vendor.index.setNavigationBarTitle({
      title: this.banner.title
    });
    this.getDetail();
  },
  onShareAppMessage() {
    return {
      title: this.banner.title,
      path: DETAIL_PAGE_PATH + "?detailDate=" + JSON.stringify(this.banner)
    };
  },
  onNavigationBarButtonTap(event) {
    const buttonIndex = event.index;
    if (buttonIndex === 0) {
      common_vendor.index.getProvider({
        service: "share",
        success: (result) => {
          if (result.provider && result.provider.length && ~result.provider.indexOf("weixin")) {
            const channels = _handleShareChannels(result.provider);
            common_vendor.index.showActionSheet({
              itemList: channels.map((channel) => {
                return channel.text;
              }),
              success: (result2) => {
                const tapIndex = result2.tapIndex;
                common_vendor.index.share({
                  provider: "weixin",
                  type: 0,
                  title: this.banner.title,
                  scene: tapIndex === 0 ? "WXSceneSession" : "WXSenceTimeline",
                  href: "https://uniapp.dcloud.io/h5" + DETAIL_PAGE_PATH + "?detailDate=" + JSON.stringify(this.banner),
                  imageUrl: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b6304f00-5168-11eb-bd01-97bc1429a9ff.png"
                });
              }
            });
          } else {
            common_vendor.index.showToast({
              title: "\u672A\u68C0\u6D4B\u5230\u53EF\u7528\u7684\u5FAE\u4FE1\u5206\u4EAB\u670D\u52A1"
            });
          }
        },
        fail: (error) => {
          common_vendor.index.showToast({
            title: "\u83B7\u53D6\u5206\u4EAB\u670D\u52A1\u5931\u8D25"
          });
        }
      });
    }
  },
  methods: {
    getDetail() {
      common_vendor.index.request({
        url: "https://unidemo.dcloud.net.cn/api/news/36kr/" + this.banner.post_id,
        success: (data) => {
          if (data.statusCode == 200) {
            var htmlString = data.data.content.replace(/\\/g, "").replace(/<img/g, '<img style="display:none;"');
            this.htmlNodes = common_htmlParser.parseHtml(htmlString);
          }
        },
        fail: () => {
          console.log("fail");
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.banner.cover,
    b: common_vendor.t($data.banner.title),
    c: common_vendor.t($data.banner.author_name),
    d: common_vendor.t($data.banner.published_at),
    e: $data.htmlNodes,
    f: $data.htmlNodes.length > 0
  }, $data.htmlNodes.length > 0 ? {} : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/template/list2detail-detail/list2detail-detail.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
