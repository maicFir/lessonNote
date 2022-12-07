"use strict";
var common_vendor = require("../../../common/vendor.js");
var common_util = require("../../../common/util.js");
const _sfc_main = {
  data() {
    return {
      title: "backgroundAudio",
      bgAudioMannager: null,
      dataUrl: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3",
      playing: false,
      playTime: 0,
      formatedPlayTime: "00:00:00"
    };
  },
  onLoad: function() {
    this.playing = this.$backgroundAudioData.playing;
    this.playTime = this.$backgroundAudioData.playTime;
    this.formatedPlayTime = this.$backgroundAudioData.formatedPlayTime;
    let bgAudioMannager = common_vendor.index.getBackgroundAudioManager();
    if (!bgAudioMannager.title) {
      bgAudioMannager.title = "\u81F4\u7231\u4E3D\u4E1D";
    }
    if (!bgAudioMannager.singer) {
      bgAudioMannager.singer = "\u6682\u65E0";
    }
    if (!bgAudioMannager.coverImgUrl) {
      bgAudioMannager.coverImgUrl = "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/c517b410-5184-11eb-b997-9918a5dda011.jpeg";
    }
    bgAudioMannager.onPlay(() => {
      console.log("\u5F00\u59CB\u64AD\u653E");
      this.$backgroundAudioData.playing = this.playing = true;
    });
    bgAudioMannager.onPause(() => {
      console.log("\u6682\u505C\u64AD\u653E");
      this.$backgroundAudioData.playing = this.playing = false;
    });
    bgAudioMannager.onEnded(() => {
      this.playing = false;
      this.$backgroundAudioData.playing = false;
      this.$backgroundAudioData.playTime = this.playTime = 0;
      this.$backgroundAudioData.formatedPlayTime = this.formatedPlayTime = common_util.formatTime(0);
    });
    bgAudioMannager.onTimeUpdate((e) => {
      if (Math.floor(bgAudioMannager.currentTime) > Math.floor(this.playTime)) {
        this.$backgroundAudioData.formatedPlayTime = this.formatedPlayTime = common_util.formatTime(Math.floor(bgAudioMannager.currentTime));
      }
      this.$backgroundAudioData.playTime = this.playTime = bgAudioMannager.currentTime;
    });
    this.bgAudioMannager = bgAudioMannager;
  },
  methods: {
    play: function(res) {
      if (!this.bgAudioMannager.src) {
        this.bgAudioMannager.startTime = this.playTime;
        this.bgAudioMannager.src = this.dataUrl;
      } else {
        this.bgAudioMannager.seek(this.playTime);
        this.bgAudioMannager.play();
      }
    },
    seek: function(e) {
      this.bgAudioMannager.seek(e.detail.value);
    },
    pause: function() {
      this.bgAudioMannager.pause();
    },
    stop: function() {
      this.bgAudioMannager.stop();
      this.$backgroundAudioData.playing = this.playing = false;
      this.$backgroundAudioData.playTime = this.playTime = 0;
      this.$backgroundAudioData.formatedPlayTime = this.formatedPlayTime = common_util.formatTime(0);
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
    b: common_vendor.t($data.formatedPlayTime),
    c: $data.playTime,
    d: common_vendor.o((...args) => $options.seek && $options.seek(...args)),
    e: $data.playing
  }, $data.playing ? {
    f: common_vendor.o((...args) => $options.stop && $options.stop(...args)),
    g: common_vendor.o((...args) => $options.pause && $options.pause(...args))
  } : {}, {
    h: !$data.playing
  }, !$data.playing ? {
    i: common_vendor.o((...args) => $options.play && $options.play(...args))
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/background-audio/background-audio.vue"]]);
wx.createPage(MiniProgramPage);
