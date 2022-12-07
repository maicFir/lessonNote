"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "video",
      src: "",
      danmuList: [
        {
          text: "\u7B2C 1s \u51FA\u73B0\u7684\u5F39\u5E55",
          color: "#ff0000",
          time: 1
        },
        {
          text: "\u7B2C 3s \u51FA\u73B0\u7684\u5F39\u5E55",
          color: "#ff00ff",
          time: 3
        }
      ],
      danmuValue: "",
      showVideo: false
    };
  },
  onReady: function(res) {
    this.videoContext = common_vendor.index.createVideoContext("myVideo");
    this.showVideo = true;
  },
  methods: {
    sendDanmu: function() {
      this.videoContext.sendDanmu({
        text: this.danmuValue,
        color: this.getRandomColor()
      });
      this.danmuValue = "";
    },
    videoErrorCallback: function(e) {
      common_vendor.index.showModal({
        content: e.target.errMsg,
        showCancel: false
      });
    },
    getRandomColor: function() {
      const rgb = [];
      for (let i = 0; i < 3; ++i) {
        let color = Math.floor(Math.random() * 256).toString(16);
        color = color.length == 1 ? "0" + color : color;
        rgb.push(color);
      }
      return "#" + rgb.join("");
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
    b: $data.showVideo
  }, $data.showVideo ? {
    c: common_vendor.o((...args) => $options.videoErrorCallback && $options.videoErrorCallback(...args)),
    d: $data.danmuList,
    e: $data.danmuValue,
    f: common_vendor.o(($event) => $data.danmuValue = $event.detail.value),
    g: common_vendor.o((...args) => $options.sendDanmu && $options.sendDanmu(...args))
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/component/video/video.vue"]]);
wx.createPage(MiniProgramPage);
