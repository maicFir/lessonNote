"use strict";
var uni_modules_uniCalendar_components_uniCalendar_util = require("./util.js");
var common_vendor = require("../../../../common/vendor.js");
var uni_modules_uniCalendar_components_uniCalendar_i18n_index = require("./i18n/index.js");
require("./calendar.js");
const calendarItem = () => "./uni-calendar-item.js";
const { t } = common_vendor.initVueI18n(uni_modules_uniCalendar_components_uniCalendar_i18n_index.messages);
const _sfc_main = {
  components: {
    calendarItem
  },
  emits: ["close", "confirm", "change", "monthSwitch"],
  props: {
    date: {
      type: String,
      default: ""
    },
    selected: {
      type: Array,
      default() {
        return [];
      }
    },
    lunar: {
      type: Boolean,
      default: false
    },
    startDate: {
      type: String,
      default: ""
    },
    endDate: {
      type: String,
      default: ""
    },
    range: {
      type: Boolean,
      default: false
    },
    insert: {
      type: Boolean,
      default: true
    },
    showMonth: {
      type: Boolean,
      default: true
    },
    clearDate: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      show: false,
      weeks: [],
      calendar: {},
      nowDate: "",
      aniMaskShow: false
    };
  },
  computed: {
    okText() {
      return t("uni-calender.ok");
    },
    cancelText() {
      return t("uni-calender.cancel");
    },
    todayText() {
      return t("uni-calender.today");
    },
    monText() {
      return t("uni-calender.MON");
    },
    TUEText() {
      return t("uni-calender.TUE");
    },
    WEDText() {
      return t("uni-calender.WED");
    },
    THUText() {
      return t("uni-calender.THU");
    },
    FRIText() {
      return t("uni-calender.FRI");
    },
    SATText() {
      return t("uni-calender.SAT");
    },
    SUNText() {
      return t("uni-calender.SUN");
    }
  },
  watch: {
    date(newVal) {
      this.init(newVal);
    },
    startDate(val) {
      this.cale.resetSatrtDate(val);
      this.cale.setDate(this.nowDate.fullDate);
      this.weeks = this.cale.weeks;
    },
    endDate(val) {
      this.cale.resetEndDate(val);
      this.cale.setDate(this.nowDate.fullDate);
      this.weeks = this.cale.weeks;
    },
    selected(newVal) {
      this.cale.setSelectInfo(this.nowDate.fullDate, newVal);
      this.weeks = this.cale.weeks;
    }
  },
  created() {
    this.cale = new uni_modules_uniCalendar_components_uniCalendar_util.Calendar({
      selected: this.selected,
      startDate: this.startDate,
      endDate: this.endDate,
      range: this.range
    });
    this.init(this.date);
  },
  methods: {
    clean() {
    },
    bindDateChange(e) {
      const value = e.detail.value + "-1";
      console.log(this.cale.getDate(value));
      this.init(value);
    },
    init(date) {
      this.cale.setDate(date);
      this.weeks = this.cale.weeks;
      this.nowDate = this.calendar = this.cale.getInfo(date);
    },
    open() {
      if (this.clearDate && !this.insert) {
        this.cale.cleanMultipleStatus();
        this.init(this.date);
      }
      this.show = true;
      this.$nextTick(() => {
        setTimeout(() => {
          this.aniMaskShow = true;
        }, 50);
      });
    },
    close() {
      this.aniMaskShow = false;
      this.$nextTick(() => {
        setTimeout(() => {
          this.show = false;
          this.$emit("close");
        }, 300);
      });
    },
    confirm() {
      this.setEmit("confirm");
      this.close();
    },
    change() {
      if (!this.insert)
        return;
      this.setEmit("change");
    },
    monthSwitch() {
      let {
        year,
        month
      } = this.nowDate;
      this.$emit("monthSwitch", {
        year,
        month: Number(month)
      });
    },
    setEmit(name) {
      let {
        year,
        month,
        date,
        fullDate,
        lunar,
        extraInfo
      } = this.calendar;
      this.$emit(name, {
        range: this.cale.multipleStatus,
        year,
        month,
        date,
        fulldate: fullDate,
        lunar,
        extraInfo: extraInfo || {}
      });
    },
    choiceDate(weeks) {
      if (weeks.disable)
        return;
      this.calendar = weeks;
      this.cale.setMultiple(this.calendar.fullDate);
      this.weeks = this.cale.weeks;
      this.change();
    },
    backtoday() {
      console.log(this.cale.getDate(new Date()).fullDate);
      let date = this.cale.getDate(new Date()).fullDate;
      this.init(date);
      this.change();
    },
    pre() {
      const preDate = this.cale.getDate(this.nowDate.fullDate, -1, "month").fullDate;
      this.setDate(preDate);
      this.monthSwitch();
    },
    next() {
      const nextDate = this.cale.getDate(this.nowDate.fullDate, 1, "month").fullDate;
      this.setDate(nextDate);
      this.monthSwitch();
    },
    setDate(date) {
      this.cale.setDate(date);
      this.weeks = this.cale.weeks;
      this.nowDate = this.cale.getInfo(date);
    }
  }
};
if (!Array) {
  const _component_calendar_item = common_vendor.resolveComponent("calendar-item");
  _component_calendar_item();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: !$props.insert && $data.show
  }, !$props.insert && $data.show ? {
    b: $data.aniMaskShow ? 1 : "",
    c: common_vendor.o((...args) => $options.clean && $options.clean(...args))
  } : {}, {
    d: $props.insert || $data.show
  }, $props.insert || $data.show ? common_vendor.e({
    e: !$props.insert
  }, !$props.insert ? {
    f: common_vendor.t($options.cancelText),
    g: common_vendor.o((...args) => $options.close && $options.close(...args)),
    h: common_vendor.t($options.okText),
    i: common_vendor.o((...args) => $options.confirm && $options.confirm(...args))
  } : {}, {
    j: common_vendor.o((...args) => $options.pre && $options.pre(...args)),
    k: common_vendor.t(($data.nowDate.year || "") + " / " + ($data.nowDate.month || "")),
    l: $props.date,
    m: common_vendor.o((...args) => $options.bindDateChange && $options.bindDateChange(...args)),
    n: common_vendor.o((...args) => $options.next && $options.next(...args)),
    o: common_vendor.t($options.todayText),
    p: common_vendor.o((...args) => $options.backtoday && $options.backtoday(...args)),
    q: $props.showMonth
  }, $props.showMonth ? {
    r: common_vendor.t($data.nowDate.month)
  } : {}, {
    s: common_vendor.t($options.SUNText),
    t: common_vendor.t($options.monText),
    v: common_vendor.t($options.TUEText),
    w: common_vendor.t($options.WEDText),
    x: common_vendor.t($options.THUText),
    y: common_vendor.t($options.FRIText),
    z: common_vendor.t($options.SATText),
    A: common_vendor.f($data.weeks, (item, weekIndex, i0) => {
      return {
        a: common_vendor.f(item, (weeks, weeksIndex, i1) => {
          return {
            a: "0682a296-0-" + i0 + "-" + i1,
            b: common_vendor.p({
              weeks,
              calendar: $data.calendar,
              selected: $props.selected,
              lunar: $props.lunar
            }),
            c: weeksIndex
          };
        }),
        b: weekIndex
      };
    }),
    B: common_vendor.o($options.choiceDate),
    C: !$props.insert ? 1 : "",
    D: $data.aniMaskShow ? 1 : ""
  }) : {});
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0682a296"], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-calendar/components/uni-calendar/uni-calendar.vue"]]);
wx.createComponent(Component);
