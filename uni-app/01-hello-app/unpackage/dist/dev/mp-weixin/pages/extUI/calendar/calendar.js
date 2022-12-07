"use strict";
var common_vendor = require("../../../common/vendor.js");
function getDate(date, AddDayCount = 0) {
  if (!date) {
    date = new Date();
  }
  if (typeof date !== "object") {
    date = date.replace(/-/g, "/");
  }
  const dd = new Date(date);
  dd.setDate(dd.getDate() + AddDayCount);
  const y = dd.getFullYear();
  const m = dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1;
  const d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
  return {
    fullDate: y + "-" + m + "-" + d,
    year: y,
    month: m,
    date: d,
    day: dd.getDay()
  };
}
const _sfc_main = {
  components: {},
  data() {
    return {
      showCalendar: false,
      info: {
        lunar: true,
        range: true,
        insert: false,
        selected: []
      }
    };
  },
  onReady() {
    this.$nextTick(() => {
      this.showCalendar = true;
    });
    setTimeout(() => {
      this.info.date = getDate(new Date(), -30).fullDate;
      this.info.startDate = getDate(new Date(), -60).fullDate;
      this.info.endDate = getDate(new Date(), 30).fullDate;
      this.info.selected = [
        {
          date: getDate(new Date(), -3).fullDate,
          info: "\u6253\u5361"
        },
        {
          date: getDate(new Date(), -2).fullDate,
          info: "\u7B7E\u5230",
          data: {
            custom: "\u81EA\u5B9A\u4E49\u4FE1\u606F",
            name: "\u81EA\u5B9A\u4E49\u6D88\u606F\u5934"
          }
        },
        {
          date: getDate(new Date(), -1).fullDate,
          info: "\u5DF2\u6253\u5361"
        }
      ];
    }, 2e3);
  },
  methods: {
    open() {
      this.$refs.calendar.open();
    },
    close() {
      console.log("\u5F39\u7A97\u5173\u95ED");
    },
    change(e) {
      console.log("change \u8FD4\u56DE:", e);
      if (this.info.selected.length > 5)
        return;
      this.info.selected.push({
        date: e.fulldate,
        info: "\u6253\u5361"
      });
    },
    confirm(e) {
      console.log("confirm \u8FD4\u56DE:", e);
    },
    monthSwitch(e) {
      console.log("monthSwitchs \u8FD4\u56DE:", e);
    }
  }
};
if (!Array) {
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_calendar2 = common_vendor.resolveComponent("uni-calendar");
  (_easycom_uni_section2 + _easycom_uni_calendar2)();
}
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_calendar = () => "../../../uni_modules/uni-calendar/components/uni-calendar/uni-calendar.js";
if (!Math) {
  (_easycom_uni_section + _easycom_uni_calendar)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.showCalendar
  }, $data.showCalendar ? {
    b: common_vendor.p({
      title: "\u63D2\u5165\u6A21\u5F0F",
      type: "line"
    }),
    c: common_vendor.o($options.change),
    d: common_vendor.o($options.monthSwitch),
    e: common_vendor.p({
      selected: $data.info.selected,
      showMonth: false
    }),
    f: common_vendor.p({
      title: "\u5F39\u51FA\u6A21\u5F0F",
      type: "line"
    }),
    g: common_vendor.o((...args) => $options.open && $options.open(...args)),
    h: common_vendor.sr("calendar", "5b83f582-3"),
    i: common_vendor.o($options.confirm),
    j: common_vendor.o($options.close),
    k: common_vendor.p({
      ["clear-date"]: true,
      date: $data.info.date,
      insert: $data.info.insert,
      lunar: $data.info.lunar,
      startDate: $data.info.startDate,
      endDate: $data.info.endDate,
      range: $data.info.range
    })
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/calendar/calendar.vue"]]);
wx.createPage(MiniProgramPage);
