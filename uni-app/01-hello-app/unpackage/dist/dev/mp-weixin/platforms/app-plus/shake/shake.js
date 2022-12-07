"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      img: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/aff47ed0-517d-11eb-8ff1-d5dcf8779628.jpg",
      show: false,
      isOpened: false,
      index: 1
    };
  },
  computed: {
    pageIndex() {
      if (this.index === 1) {
        return "aff47ed0-517d-11eb-8ff1-d5dcf8779628";
      } else if (this.index === 2) {
        return "1fc36f80-5199-11eb-a16f-5b3e54966275";
      } else if (this.index === 3) {
        return "20a3bd60-5199-11eb-97b7-0dc4655d6e68";
      } else if (this.index === 4) {
        return "8b872410-51a7-11eb-8a36-ebb87efcf8c0";
      } else {
        return "aff47ed0-517d-11eb-8ff1-d5dcf8779628";
      }
    }
  },
  onLoad: function() {
    this.music = common_vendor.index.createInnerAudioContext();
    this.music.src = "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b5897b20-517d-11eb-a16f-5b3e54966275.wav";
    let t = null;
    common_vendor.index.onAccelerometerChange((res) => {
      if (Math.abs(res.x) + Math.abs(res.y) + Math.abs(res.z) > 20 && !this.show && this.isOpened) {
        this.music.play();
        setTimeout(() => {
          this.index++;
          if (this.index > 4) {
            this.index = 1;
          }
          this.img = "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/" + this.pageIndex + ".jpg";
        }, 2e3);
        this.show = true;
        if (t) {
          clearTimeout(t);
        }
        t = setTimeout(() => {
          t = null;
          this.show = false;
        }, 600);
      }
    });
  },
  onShow() {
    this.isOpened = true;
  },
  onUnload() {
    this.show = false;
    this.isOpened = false;
    common_vendor.index.stopAccelerometer();
    this.music.destroy();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.n($data.show ? "up" : ""),
    b: common_vendor.n($data.show ? "down" : ""),
    c: "url(" + $data.img + ")"
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/platforms/app-plus/shake/shake.vue"]]);
wx.createPage(MiniProgramPage);
