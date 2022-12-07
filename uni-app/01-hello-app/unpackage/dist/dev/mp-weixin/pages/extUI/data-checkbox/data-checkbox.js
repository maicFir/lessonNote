"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      radio1: 0,
      radio2: 0,
      radio3: 0,
      radio4: 0,
      radio5: 0,
      radio6: 0,
      checkbox1: [0],
      checkbox2: [0],
      checkbox3: [0],
      checkbox4: [0],
      checkbox5: [0],
      checkbox6: [0],
      sex: [{
        text: "\u7537",
        value: 0
      }, {
        text: "\u5973",
        value: 1
      }, {
        text: "\u672A\u77E5",
        value: 2
      }],
      sex1: [{
        text: "\u7537",
        value: 0
      }, {
        text: "\u5973",
        value: 1,
        disable: true
      }, {
        text: "\u672A\u77E5",
        value: 2
      }],
      hobby: [{
        text: "\u8DB3\u7403",
        value: 0
      }, {
        text: "\u7BEE\u7403",
        value: 1
      }, {
        text: "\u6E38\u6CF3",
        value: 2
      }],
      hobby2: [{
        text: "\u8DB3\u7403",
        value: 0,
        disable: true
      }, {
        text: "\u7BEE\u7403",
        value: 1,
        disable: true
      }, {
        text: "\u6E38\u6CF3",
        value: 2
      }]
    };
  },
  onLoad() {
  },
  onReady() {
  },
  methods: {}
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_data_checkbox2 = common_vendor.resolveComponent("uni-data-checkbox");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_card2 + _easycom_uni_data_checkbox2 + _easycom_uni_section2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_data_checkbox = () => "../../../uni_modules/uni-data-checkbox/components/uni-data-checkbox/uni-data-checkbox.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_data_checkbox + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-full"]: true
    }),
    b: common_vendor.t(JSON.stringify($data.radio1)),
    c: common_vendor.o(($event) => $data.radio1 = $event),
    d: common_vendor.p({
      localdata: $data.sex,
      modelValue: $data.radio1
    }),
    e: common_vendor.p({
      title: "\u5355\u9009",
      type: "line"
    }),
    f: common_vendor.t(JSON.stringify($data.checkbox1)),
    g: common_vendor.o(($event) => $data.checkbox1 = $event),
    h: common_vendor.p({
      multiple: true,
      localdata: $data.hobby,
      modelValue: $data.checkbox1
    }),
    i: common_vendor.p({
      title: "\u591A\u9009",
      subTitle: "\u4F7F\u7528multiple\u5C5E\u6027\u5F00\u542F\u591A\u9009",
      type: "line"
    }),
    j: common_vendor.t(JSON.stringify($data.checkbox6)),
    k: common_vendor.o(($event) => $data.checkbox6 = $event),
    l: common_vendor.p({
      min: "1",
      max: "2",
      multiple: true,
      localdata: $data.hobby,
      modelValue: $data.checkbox6
    }),
    m: common_vendor.p({
      title: "\u6700\u5927\u6700\u5C0F\u503C",
      subTitle: "\u4F7F\u7528 min / max \u8BBE\u7F6E\u591A\u9009\u7684\u6700\u5927\u6700\u5C0F\u503C,\u5355\u9009\u65E0\u6548"
    }),
    n: common_vendor.t(JSON.stringify($data.radio2)),
    o: common_vendor.o(($event) => $data.radio2 = $event),
    p: common_vendor.p({
      mode: "button",
      localdata: $data.sex,
      modelValue: $data.radio2
    }),
    q: common_vendor.t(JSON.stringify($data.checkbox2)),
    r: common_vendor.o(($event) => $data.checkbox2 = $event),
    s: common_vendor.p({
      mode: "button",
      multiple: true,
      localdata: $data.hobby,
      modelValue: $data.checkbox2
    }),
    t: common_vendor.p({
      title: "\u66F4\u591A\u6837\u5F0F - button",
      subTitle: "\u4F7F\u7528mode=button\u5C5E\u6027\u4F7F\u7528\u6309\u94AE\u6837\u5F0F",
      type: "line"
    }),
    v: common_vendor.t(JSON.stringify($data.radio3)),
    w: common_vendor.o(($event) => $data.radio3 = $event),
    x: common_vendor.p({
      mode: "tag",
      localdata: $data.sex,
      modelValue: $data.radio3
    }),
    y: common_vendor.t(JSON.stringify($data.checkbox3)),
    z: common_vendor.o(($event) => $data.checkbox3 = $event),
    A: common_vendor.p({
      mode: "tag",
      multiple: true,
      localdata: $data.hobby,
      modelValue: $data.checkbox3
    }),
    B: common_vendor.p({
      title: "\u66F4\u591A\u6837\u5F0F - tag",
      subTitle: "\u4F7F\u7528mode=tag\u5C5E\u6027\u4F7F\u7528\u6807\u7B7E\u6837\u5F0F",
      type: "line"
    }),
    C: common_vendor.t(JSON.stringify($data.radio4)),
    D: common_vendor.o(($event) => $data.radio4 = $event),
    E: common_vendor.p({
      mode: "button",
      localdata: $data.sex1,
      modelValue: $data.radio4
    }),
    F: common_vendor.t(JSON.stringify($data.checkbox4)),
    G: common_vendor.o(($event) => $data.checkbox4 = $event),
    H: common_vendor.p({
      mode: "button",
      multiple: true,
      localdata: $data.hobby2,
      modelValue: $data.checkbox4
    }),
    I: common_vendor.p({
      title: "\u7981\u7528",
      subTitle: "\u6570\u636E\u4E2D\u4F7F\u7528 disable \u5C5E\u6027\u5B9E\u73B0\u5355\u72EC\u7981\u7528,\u7EC4\u4EF6\u4F7F\u7528 disable \u5C5E\u6027\u5B9E\u73B0\u5168\u90E8\u7981\u7528",
      type: "line"
    }),
    J: common_vendor.t(JSON.stringify($data.radio5)),
    K: common_vendor.o(($event) => $data.radio5 = $event),
    L: common_vendor.p({
      selectedColor: "red",
      localdata: $data.sex1,
      modelValue: $data.radio5
    }),
    M: common_vendor.t(JSON.stringify($data.checkbox5)),
    N: common_vendor.o(($event) => $data.checkbox5 = $event),
    O: common_vendor.p({
      selectedColor: "red",
      multiple: true,
      localdata: $data.hobby2,
      modelValue: $data.checkbox5
    }),
    P: common_vendor.p({
      title: "\u81EA\u5B9A\u4E49\u9AD8\u4EAE\u989C\u8272",
      subTitle: "\u4F7F\u7528 selectedColor \u5C5E\u6027\u4FEE\u6539\u989C\u8272",
      type: "line"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/data-checkbox/data-checkbox.vue"]]);
wx.createPage(MiniProgramPage);
