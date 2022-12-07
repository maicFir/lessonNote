"use strict";
var common_vendor = require("../../../../common/vendor.js");
var uni_modules_uniCalendar_components_uniCalendar_i18n_index = require("./i18n/index.js");
const { t } = common_vendor.initVueI18n(uni_modules_uniCalendar_components_uniCalendar_i18n_index.messages);
const _sfc_main = {
  emits: ["change"],
  props: {
    weeks: {
      type: Object,
      default() {
        return {};
      }
    },
    calendar: {
      type: Object,
      default: () => {
        return {};
      }
    },
    selected: {
      type: Array,
      default: () => {
        return [];
      }
    },
    lunar: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    todayText() {
      return t("uni-calender.today");
    }
  },
  methods: {
    choiceDate(weeks) {
      this.$emit("change", weeks);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.selected && $props.weeks.extraInfo
  }, $props.selected && $props.weeks.extraInfo ? {} : {}, {
    b: common_vendor.t($props.weeks.date),
    c: $props.weeks.isDay ? 1 : "",
    d: $props.calendar.fullDate === $props.weeks.fullDate && $props.weeks.isDay ? 1 : "",
    e: $props.calendar.fullDate === $props.weeks.fullDate && !$props.weeks.isDay ? 1 : "",
    f: $props.weeks.beforeMultiple ? 1 : "",
    g: $props.weeks.multiple ? 1 : "",
    h: $props.weeks.afterMultiple ? 1 : "",
    i: $props.weeks.disable ? 1 : "",
    j: !$props.lunar && !$props.weeks.extraInfo && $props.weeks.isDay
  }, !$props.lunar && !$props.weeks.extraInfo && $props.weeks.isDay ? {
    k: common_vendor.t($options.todayText),
    l: $props.weeks.isDay ? 1 : "",
    m: $props.calendar.fullDate === $props.weeks.fullDate && $props.weeks.isDay ? 1 : "",
    n: $props.calendar.fullDate === $props.weeks.fullDate && !$props.weeks.isDay ? 1 : "",
    o: $props.weeks.beforeMultiple ? 1 : "",
    p: $props.weeks.multiple ? 1 : "",
    q: $props.weeks.afterMultiple ? 1 : ""
  } : {}, {
    r: $props.lunar && !$props.weeks.extraInfo
  }, $props.lunar && !$props.weeks.extraInfo ? {
    s: common_vendor.t($props.weeks.isDay ? $options.todayText : $props.weeks.lunar.IDayCn === "\u521D\u4E00" ? $props.weeks.lunar.IMonthCn : $props.weeks.lunar.IDayCn),
    t: $props.weeks.isDay ? 1 : "",
    v: $props.calendar.fullDate === $props.weeks.fullDate && $props.weeks.isDay ? 1 : "",
    w: $props.calendar.fullDate === $props.weeks.fullDate && !$props.weeks.isDay ? 1 : "",
    x: $props.weeks.beforeMultiple ? 1 : "",
    y: $props.weeks.multiple ? 1 : "",
    z: $props.weeks.afterMultiple ? 1 : "",
    A: $props.weeks.disable ? 1 : ""
  } : {}, {
    B: $props.weeks.extraInfo && $props.weeks.extraInfo.info
  }, $props.weeks.extraInfo && $props.weeks.extraInfo.info ? {
    C: common_vendor.t($props.weeks.extraInfo.info),
    D: $props.weeks.extraInfo.info ? 1 : "",
    E: $props.weeks.isDay ? 1 : "",
    F: $props.calendar.fullDate === $props.weeks.fullDate && $props.weeks.isDay ? 1 : "",
    G: $props.calendar.fullDate === $props.weeks.fullDate && !$props.weeks.isDay ? 1 : "",
    H: $props.weeks.beforeMultiple ? 1 : "",
    I: $props.weeks.multiple ? 1 : "",
    J: $props.weeks.afterMultiple ? 1 : "",
    K: $props.weeks.disable ? 1 : ""
  } : {}, {
    L: $props.weeks.disable ? 1 : "",
    M: $props.calendar.fullDate === $props.weeks.fullDate && $props.weeks.isDay ? 1 : "",
    N: $props.calendar.fullDate === $props.weeks.fullDate && !$props.weeks.isDay ? 1 : "",
    O: $props.weeks.beforeMultiple ? 1 : "",
    P: $props.weeks.multiple ? 1 : "",
    Q: $props.weeks.afterMultiple ? 1 : "",
    R: common_vendor.o(($event) => $options.choiceDate($props.weeks))
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-6097fd5b"], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-calendar/components/uni-calendar/uni-calendar-item.vue"]]);
wx.createComponent(Component);
