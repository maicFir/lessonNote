"use strict";
var common_vendor = require("../../../common/vendor.js");
const videoData = [
  {
    src: "https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/hellouniapp/hello-nvue-swiper-vertical-01.mp4"
  },
  {
    src: "https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/hellouniapp/hello-nvue-swiper-vertical-02.mp4"
  },
  {
    src: "https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/hellouniapp/hello-nvue-swiper-vertical-03.mp4"
  },
  {
    src: "https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/hellouniapp/hello-nvue-swiper-vertical-01.mp4"
  },
  {
    src: "https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/hellouniapp/hello-nvue-swiper-vertical-02.mp4"
  },
  {
    src: "https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/hellouniapp/hello-nvue-swiper-vertical-03.mp4"
  }
];
const _sfc_main = {
  data() {
    return {
      circular: true,
      videoList: [
        {
          id: "video0",
          src: "",
          img: ""
        },
        {
          id: "video1",
          src: "",
          img: ""
        },
        {
          id: "video2",
          src: "",
          img: ""
        }
      ],
      videoDataList: []
    };
  },
  onLoad(e) {
  },
  onReady() {
    this.init();
    this.getData();
  },
  methods: {
    init() {
      this._videoIndex = 0;
      this._videoContextList = [];
      for (var i = 0; i < this.videoList.length; i++) {
        this._videoContextList.push(common_vendor.index.createVideoContext("video" + i, this));
      }
      this._videoDataIndex = 0;
    },
    getData(e) {
      this.videoDataList = videoData;
      setTimeout(() => {
        this.updateVideo(true);
      }, 200);
    },
    onSwiperChange(e) {
      let currentIndex = e.detail.current;
      if (currentIndex === this._videoIndex) {
        return;
      }
      let isNext = false;
      if (currentIndex === 0 && this._videoIndex === this.videoList.length - 1) {
        isNext = true;
      } else if (currentIndex === this.videoList.length - 1 && this._videoIndex === 0) {
        isNext = false;
      } else if (currentIndex > this._videoIndex) {
        isNext = true;
      }
      if (isNext) {
        this._videoDataIndex++;
      } else {
        this._videoDataIndex--;
      }
      if (this._videoDataIndex < 0) {
        this._videoDataIndex = this.videoDataList.length - 1;
      } else if (this._videoDataIndex >= this.videoDataList.length) {
        this._videoDataIndex = 0;
      }
      this.circular = this._videoDataIndex != 0;
      if (this._videoIndex >= 0) {
        this._videoContextList[this._videoIndex].pause();
        this._videoContextList[this._videoIndex].seek(0);
      }
      this._videoIndex = currentIndex;
      setTimeout(() => {
        this.updateVideo(isNext);
      }, 200);
    },
    getNextIndex(isNext) {
      let index = this._videoIndex + (isNext ? 1 : -1);
      if (index < 0) {
        return this.videoList.length - 1;
      } else if (index >= this.videoList.length) {
        return 0;
      }
      return index;
    },
    getNextDataIndex(isNext) {
      let index = this._videoDataIndex + (isNext ? 1 : -1);
      if (index < 0) {
        return this.videoDataList.length - 1;
      } else if (index >= this.videoDataList.length) {
        return 0;
      }
      return index;
    },
    updateVideo(isNext) {
      this.$set(this.videoList[this._videoIndex], "src", this.videoDataList[this._videoDataIndex].src);
      this.$set(this.videoList[this.getNextIndex(isNext)], "src", this.videoDataList[this.getNextDataIndex(isNext)].src);
      setTimeout(() => {
        this._videoContextList[this._videoIndex].play();
      }, 200);
      console.log("v:" + this._videoIndex + " d:" + this._videoDataIndex + "; next v:" + this.getNextIndex(isNext) + " next d:" + this.getNextDataIndex(isNext));
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.videoList, (item, k0, i0) => {
      return {
        a: item.id,
        b: item.id,
        c: item.src,
        d: item.id
      };
    }),
    b: $data.circular,
    c: common_vendor.o((...args) => $options.onSwiperChange && $options.onSwiperChange(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/template/swiper-vertical/swiper-vertical.nvue"]]);
wx.createPage(MiniProgramPage);
