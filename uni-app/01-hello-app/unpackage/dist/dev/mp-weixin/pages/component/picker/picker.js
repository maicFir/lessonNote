"use strict";
var common_vendor = require("../../../common/vendor.js");
function getDate(type) {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (type === "start") {
    year = year - 10;
  } else if (type === "end") {
    year = year + 10;
  }
  month = month > 9 ? month : "0" + month;
  day = day > 9 ? day : "0" + day;
  return `${year}-${month}-${day}`;
}
const _sfc_main = {
  data() {
    return {
      title: "picker",
      array: [{ name: "\u4E2D\u56FD" }, { name: "\u7F8E\u56FD" }, { name: "\u5DF4\u897F" }, { name: "\u65E5\u672C" }],
      index: 0,
      multiArray: [
        ["\u4E9A\u6D32", "\u6B27\u6D32"],
        ["\u4E2D\u56FD", "\u65E5\u672C"],
        ["\u5317\u4EAC", "\u4E0A\u6D77", "\u5E7F\u5DDE"]
      ],
      multiIndex: [0, 0, 0],
      date: getDate({
        format: true
      }),
      startDate: getDate("start"),
      endDate: getDate("end"),
      time: "12:01"
    };
  },
  methods: {
    bindPickerChange: function(e) {
      console.log("picker\u53D1\u9001\u9009\u62E9\u6539\u53D8\uFF0C\u643A\u5E26\u503C\u4E3A\uFF1A" + e.detail.value);
      this.index = e.detail.value;
    },
    bindMultiPickerColumnChange: function(e) {
      console.log("\u4FEE\u6539\u7684\u5217\u4E3A\uFF1A" + e.detail.column + "\uFF0C\u503C\u4E3A\uFF1A" + e.detail.value);
      this.multiIndex[e.detail.column] = e.detail.value;
      switch (e.detail.column) {
        case 0:
          switch (this.multiIndex[0]) {
            case 0:
              this.multiArray[1] = ["\u4E2D\u56FD", "\u65E5\u672C"];
              this.multiArray[2] = ["\u5317\u4EAC", "\u4E0A\u6D77", "\u5E7F\u5DDE"];
              break;
            case 1:
              this.multiArray[1] = ["\u82F1\u56FD", "\u6CD5\u56FD"];
              this.multiArray[2] = ["\u4F26\u6566", "\u66FC\u5F7B\u65AF\u7279"];
              break;
          }
          this.multiIndex.splice(1, 1, 0);
          this.multiIndex.splice(2, 1, 0);
          break;
        case 1:
          switch (this.multiIndex[0]) {
            case 0:
              switch (this.multiIndex[1]) {
                case 0:
                  this.multiArray[2] = ["\u5317\u4EAC", "\u4E0A\u6D77", "\u5E7F\u5DDE"];
                  break;
                case 1:
                  this.multiArray[2] = ["\u4E1C\u4EAC", "\u5317\u6D77\u9053"];
                  break;
              }
              break;
            case 1:
              switch (this.multiIndex[1]) {
                case 0:
                  this.multiArray[2] = ["\u4F26\u6566", "\u66FC\u5F7B\u65AF\u7279"];
                  break;
                case 1:
                  this.multiArray[2] = ["\u5DF4\u9ECE", "\u9A6C\u8D5B"];
                  break;
              }
              break;
          }
          this.multiIndex.splice(2, 1, 0);
          break;
      }
      this.$forceUpdate();
    },
    bindDateChange: function(e) {
      this.date = e.detail.value;
    },
    bindTimeChange: function(e) {
      this.time = e.detail.value;
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
  return {
    a: common_vendor.p({
      title: $data.title
    }),
    b: common_vendor.t($data.array[$data.index].name),
    c: common_vendor.o((...args) => $options.bindPickerChange && $options.bindPickerChange(...args)),
    d: $data.index,
    e: $data.array,
    f: common_vendor.t($data.multiArray[0][$data.multiIndex[0]]),
    g: common_vendor.t($data.multiArray[1][$data.multiIndex[1]]),
    h: common_vendor.t($data.multiArray[2][$data.multiIndex[2]]),
    i: common_vendor.o((...args) => $options.bindMultiPickerColumnChange && $options.bindMultiPickerColumnChange(...args)),
    j: $data.multiIndex,
    k: $data.multiArray,
    l: common_vendor.t($data.time),
    m: $data.time,
    n: common_vendor.o((...args) => $options.bindTimeChange && $options.bindTimeChange(...args)),
    o: common_vendor.t($data.date),
    p: $data.date,
    q: $data.startDate,
    r: $data.endDate,
    s: common_vendor.o((...args) => $options.bindDateChange && $options.bindDateChange(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/component/picker/picker.vue"]]);
wx.createPage(MiniProgramPage);
