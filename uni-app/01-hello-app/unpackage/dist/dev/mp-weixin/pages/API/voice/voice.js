"use strict";
var common_vendor = require("../../../common/vendor.js");
var common_util = require("../../../common/util.js");
var playTimeInterval = null;
var recordTimeInterval = null;
var recorderManager = null;
var music = null;
const _sfc_main = {
  data() {
    return {
      title: "start/stopRecord\u3001play/stopVoice",
      recording: false,
      playing: false,
      hasRecord: false,
      tempFilePath: "",
      recordTime: 0,
      playTime: 0,
      formatedRecordTime: "00:00:00",
      formatedPlayTime: "00:00:00"
    };
  },
  onUnload: function() {
    this.end();
  },
  onLoad: function() {
    music = common_vendor.index.createInnerAudioContext();
    music.onEnded(() => {
      clearInterval(playTimeInterval);
      var playTime = 0;
      console.log("play voice finished");
      this.playing = false;
      this.formatedPlayTime = common_util.formatTime(playTime);
      this.playTime = playTime;
    });
    recorderManager = common_vendor.index.getRecorderManager();
    recorderManager.onStart(() => {
      console.log("recorder start");
      this.recording = true;
      recordTimeInterval = setInterval(() => {
        this.recordTime += 1;
        this.formatedRecordTime = common_util.formatTime(this.recordTime);
      }, 1e3);
    });
    recorderManager.onStop((res) => {
      console.log("on stop");
      music.src = res.tempFilePath;
      this.hasRecord = true;
      this.recording = false;
    });
    recorderManager.onError(() => {
      console.log("recorder onError");
    });
  },
  methods: {
    async startRecord() {
      recorderManager.start({
        format: "mp3"
      });
    },
    stopRecord() {
      recorderManager.stop();
      clearInterval(recordTimeInterval);
    },
    playVoice() {
      console.log("play voice");
      this.playing = true;
      playTimeInterval = setInterval(() => {
        this.playTime += 1;
        this.formatedPlayTime = common_util.formatTime(this.playTime);
      }, 1e3);
      music.play();
    },
    stopVoice() {
      clearInterval(playTimeInterval);
      this.playing = false;
      this.formatedPlayTime = common_util.formatTime(0);
      this.playTime = 0;
      music.stop();
    },
    end() {
      music.stop();
      recorderManager.stop();
      clearInterval(recordTimeInterval);
      clearInterval(playTimeInterval);
      this.recording = false, this.playing = false, this.hasRecord = false;
      this.playTime = 0, this.recordTime = 0;
      this.formatedRecordTime = "00:00:00", this.formatedRecordTime = "00:00:00";
    },
    clear() {
      this.end();
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
    b: !$data.recording && !$data.playing && !$data.hasRecord
  }, !$data.recording && !$data.playing && !$data.hasRecord ? {
    c: common_vendor.t($data.formatedRecordTime),
    d: common_vendor.o((...args) => $options.startRecord && $options.startRecord(...args))
  } : {}, {
    e: $data.recording === true
  }, $data.recording === true ? {
    f: common_vendor.t($data.formatedRecordTime),
    g: common_vendor.o((...args) => $options.stopRecord && $options.stopRecord(...args))
  } : {}, {
    h: $data.hasRecord === true && $data.playing === false
  }, $data.hasRecord === true && $data.playing === false ? {
    i: common_vendor.t($data.formatedPlayTime),
    j: common_vendor.t($data.formatedRecordTime),
    k: common_vendor.o((...args) => $options.playVoice && $options.playVoice(...args)),
    l: common_vendor.o((...args) => $options.clear && $options.clear(...args))
  } : {}, {
    m: $data.hasRecord === true && $data.playing === true
  }, $data.hasRecord === true && $data.playing === true ? {
    n: common_vendor.t($data.formatedPlayTime),
    o: common_vendor.t($data.formatedRecordTime),
    p: common_vendor.o((...args) => $options.stopVoice && $options.stopVoice(...args)),
    q: common_vendor.o((...args) => $options.clear && $options.clear(...args))
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/voice/voice.vue"]]);
wx.createPage(MiniProgramPage);
