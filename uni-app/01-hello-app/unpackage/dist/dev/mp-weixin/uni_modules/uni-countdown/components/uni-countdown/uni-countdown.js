"use strict";
var common_vendor = require("../../../../common/vendor.js");
var uni_modules_uniCountdown_components_uniCountdown_i18n_index = require("./i18n/index.js");
const {
  t
} = common_vendor.initVueI18n(uni_modules_uniCountdown_components_uniCountdown_i18n_index.messages);
const _sfc_main = {
  name: "UniCountdown",
  emits: ["timeup"],
  props: {
    showDay: {
      type: Boolean,
      default: true
    },
    showColon: {
      type: Boolean,
      default: true
    },
    start: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: "#333"
    },
    fontSize: {
      type: Number,
      default: 14
    },
    splitorColor: {
      type: String,
      default: "#333"
    },
    day: {
      type: Number,
      default: 0
    },
    hour: {
      type: Number,
      default: 0
    },
    minute: {
      type: Number,
      default: 0
    },
    second: {
      type: Number,
      default: 0
    },
    timestamp: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      timer: null,
      syncFlag: false,
      d: "00",
      h: "00",
      i: "00",
      s: "00",
      leftTime: 0,
      seconds: 0
    };
  },
  computed: {
    dayText() {
      return t("uni-countdown.day");
    },
    hourText(val) {
      return t("uni-countdown.h");
    },
    minuteText(val) {
      return t("uni-countdown.m");
    },
    secondText(val) {
      return t("uni-countdown.s");
    },
    timeStyle() {
      const {
        color,
        backgroundColor,
        fontSize
      } = this;
      return {
        color,
        backgroundColor,
        fontSize: `${fontSize}px`,
        width: `${fontSize * 22 / 14}px`,
        lineHeight: `${fontSize * 20 / 14}px`,
        borderRadius: `${fontSize * 3 / 14}px`
      };
    },
    splitorStyle() {
      const { splitorColor, fontSize, backgroundColor } = this;
      return {
        color: splitorColor,
        fontSize: `${fontSize * 12 / 14}px`,
        margin: backgroundColor ? `${fontSize * 4 / 14}px` : ""
      };
    }
  },
  watch: {
    day(val) {
      this.changeFlag();
    },
    hour(val) {
      this.changeFlag();
    },
    minute(val) {
      this.changeFlag();
    },
    second(val) {
      this.changeFlag();
    },
    start: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal) {
          this.startData();
        } else {
          if (!oldVal)
            return;
          clearInterval(this.timer);
        }
      }
    }
  },
  created: function(e) {
    this.seconds = this.toSeconds(this.timestamp, this.day, this.hour, this.minute, this.second);
    this.countDown();
  },
  unmounted() {
    clearInterval(this.timer);
  },
  methods: {
    toSeconds(timestamp, day, hours, minutes, seconds) {
      if (timestamp) {
        return timestamp - parseInt(new Date().getTime() / 1e3, 10);
      }
      return day * 60 * 60 * 24 + hours * 60 * 60 + minutes * 60 + seconds;
    },
    timeUp() {
      clearInterval(this.timer);
      this.$emit("timeup");
    },
    countDown() {
      let seconds = this.seconds;
      let [day, hour, minute, second] = [0, 0, 0, 0];
      if (seconds > 0) {
        day = Math.floor(seconds / (60 * 60 * 24));
        hour = Math.floor(seconds / (60 * 60)) - day * 24;
        minute = Math.floor(seconds / 60) - day * 24 * 60 - hour * 60;
        second = Math.floor(seconds) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60;
      } else {
        this.timeUp();
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (hour < 10) {
        hour = "0" + hour;
      }
      if (minute < 10) {
        minute = "0" + minute;
      }
      if (second < 10) {
        second = "0" + second;
      }
      this.d = day;
      this.h = hour;
      this.i = minute;
      this.s = second;
    },
    startData() {
      this.seconds = this.toSeconds(this.timestamp, this.day, this.hour, this.minute, this.second);
      if (this.seconds <= 0) {
        this.seconds = this.toSeconds(0, 0, 0, 0, 0);
        this.countDown();
        return;
      }
      clearInterval(this.timer);
      this.countDown();
      this.timer = setInterval(() => {
        this.seconds--;
        if (this.seconds < 0) {
          this.timeUp();
          return;
        }
        this.countDown();
      }, 1e3);
    },
    update() {
      this.startData();
    },
    changeFlag() {
      if (!this.syncFlag) {
        this.seconds = this.toSeconds(this.timestamp, this.day, this.hour, this.minute, this.second);
        this.startData();
        this.syncFlag = true;
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.showDay
  }, $props.showDay ? {
    b: common_vendor.t($data.d),
    c: common_vendor.s($options.timeStyle)
  } : {}, {
    d: $props.showDay
  }, $props.showDay ? {
    e: common_vendor.t($options.dayText),
    f: common_vendor.s($options.splitorStyle)
  } : {}, {
    g: common_vendor.t($data.h),
    h: common_vendor.s($options.timeStyle),
    i: common_vendor.t($props.showColon ? ":" : $options.hourText),
    j: common_vendor.s($options.splitorStyle),
    k: common_vendor.t($data.i),
    l: common_vendor.s($options.timeStyle),
    m: common_vendor.t($props.showColon ? ":" : $options.minuteText),
    n: common_vendor.s($options.splitorStyle),
    o: common_vendor.t($data.s),
    p: common_vendor.s($options.timeStyle),
    q: !$props.showColon
  }, !$props.showColon ? {
    r: common_vendor.t($options.secondText),
    s: common_vendor.s($options.splitorStyle)
  } : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6b44ea80"], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-countdown/components/uni-countdown/uni-countdown.vue"]]);
wx.createComponent(Component);
