"use strict";
var common_vendor = require("../../../../common/vendor.js");
var uni_modules_uniPagination_components_uniPagination_i18n_index = require("./i18n/index.js");
const {
  t
} = common_vendor.initVueI18n(uni_modules_uniPagination_components_uniPagination_i18n_index.messages);
const _sfc_main = {
  name: "UniPagination",
  emits: ["update:modelValue", "input", "change", "pageSizeChange"],
  props: {
    value: {
      type: [Number, String],
      default: 1
    },
    modelValue: {
      type: [Number, String],
      default: 1
    },
    prevText: {
      type: String
    },
    nextText: {
      type: String
    },
    piecePerPageText: {
      type: String
    },
    current: {
      type: [Number, String],
      default: 1
    },
    total: {
      type: [Number, String],
      default: 0
    },
    pageSize: {
      type: [Number, String],
      default: 10
    },
    showIcon: {
      type: [Boolean, String],
      default: false
    },
    showPageSize: {
      type: [Boolean, String],
      default: false
    },
    pagerCount: {
      type: Number,
      default: 7
    },
    pageSizeRange: {
      type: Array,
      default: () => [20, 50, 100, 500]
    }
  },
  data() {
    return {
      pageSizeIndex: 0,
      currentIndex: 1,
      paperData: [],
      pickerShow: false
    };
  },
  computed: {
    piecePerPage() {
      return this.piecePerPageText || t("uni-pagination.piecePerPage");
    },
    prevPageText() {
      return this.prevText || t("uni-pagination.prevText");
    },
    nextPageText() {
      return this.nextText || t("uni-pagination.nextText");
    },
    maxPage() {
      let maxPage = 1;
      let total = Number(this.total);
      let pageSize = Number(this.pageSize);
      if (total && pageSize) {
        maxPage = Math.ceil(total / pageSize);
      }
      return maxPage;
    },
    paper() {
      const num = this.currentIndex;
      const pagerCount = this.pagerCount;
      const total = this.total;
      const pageSize = this.pageSize;
      let totalArr = [];
      let showPagerArr = [];
      let pagerNum = Math.ceil(total / pageSize);
      for (let i = 0; i < pagerNum; i++) {
        totalArr.push(i + 1);
      }
      showPagerArr.push(1);
      const totalNum = totalArr[totalArr.length - (pagerCount + 1) / 2];
      totalArr.forEach((item, index) => {
        if ((pagerCount + 1) / 2 >= num) {
          if (item < pagerCount + 1 && item > 1) {
            showPagerArr.push(item);
          }
        } else if (num + 2 <= totalNum) {
          if (item > num - (pagerCount + 1) / 2 && item < num + (pagerCount + 1) / 2) {
            showPagerArr.push(item);
          }
        } else {
          if ((item > num - (pagerCount + 1) / 2 || pagerNum - pagerCount < item) && item < totalArr[totalArr.length - 1]) {
            showPagerArr.push(item);
          }
        }
      });
      if (pagerNum > pagerCount) {
        if ((pagerCount + 1) / 2 >= num) {
          showPagerArr[showPagerArr.length - 1] = "...";
        } else if (num + 2 <= totalNum) {
          showPagerArr[1] = "...";
          showPagerArr[showPagerArr.length - 1] = "...";
        } else {
          showPagerArr[1] = "...";
        }
        showPagerArr.push(totalArr[totalArr.length - 1]);
      } else {
        if ((pagerCount + 1) / 2 >= num)
          ;
        else if (num + 2 <= totalNum)
          ;
        else {
          showPagerArr.shift();
          showPagerArr.push(totalArr[totalArr.length - 1]);
        }
      }
      return showPagerArr;
    }
  },
  watch: {
    current: {
      immediate: true,
      handler(val, old) {
        if (val < 1) {
          this.currentIndex = 1;
        } else {
          this.currentIndex = val;
        }
      }
    },
    value: {
      immediate: true,
      handler(val) {
        if (Number(this.current) !== 1)
          return;
        if (val < 1) {
          this.currentIndex = 1;
        } else {
          this.currentIndex = val;
        }
      }
    },
    pageSizeIndex(val) {
      this.$emit("pageSizeChange", this.pageSizeRange[val]);
    }
  },
  methods: {
    pickerChange(e) {
      this.pageSizeIndex = e.detail.value;
      this.pickerClick();
    },
    pickerClick() {
    },
    selectPage(e, index) {
      if (parseInt(e)) {
        this.currentIndex = e;
        this.change("current");
      } else {
        let pagerNum = Math.ceil(this.total / this.pageSize);
        if (index <= 1) {
          if (this.currentIndex - 5 > 1) {
            this.currentIndex -= 5;
          } else {
            this.currentIndex = 1;
          }
          return;
        }
        if (index >= 6) {
          if (this.currentIndex + 5 > pagerNum) {
            this.currentIndex = pagerNum;
          } else {
            this.currentIndex += 5;
          }
          return;
        }
      }
    },
    clickLeft() {
      if (Number(this.currentIndex) === 1) {
        return;
      }
      this.currentIndex -= 1;
      this.change("prev");
    },
    clickRight() {
      if (Number(this.currentIndex) >= this.maxPage) {
        return;
      }
      this.currentIndex += 1;
      this.change("next");
    },
    change(e) {
      this.$emit("input", this.currentIndex);
      this.$emit("update:modelValue", this.currentIndex);
      this.$emit("change", {
        type: e,
        current: this.currentIndex
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($props.total),
    b: $props.showIcon === true || $props.showIcon === "true"
  }, $props.showIcon === true || $props.showIcon === "true" ? {
    c: common_vendor.p({
      color: "#666",
      size: "16",
      type: "left"
    })
  } : {
    d: common_vendor.t($options.prevPageText)
  }, {
    e: common_vendor.n($data.currentIndex === 1 ? "uni-pagination--disabled" : "uni-pagination--enabled"),
    f: $data.currentIndex === 1 ? "" : "uni-pagination--hover",
    g: common_vendor.o((...args) => $options.clickLeft && $options.clickLeft(...args)),
    h: common_vendor.t($data.currentIndex),
    i: common_vendor.t($options.maxPage || 0),
    j: common_vendor.f($options.paper, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index,
        c: item === $data.currentIndex ? 1 : "",
        d: common_vendor.o(($event) => $options.selectPage(item, index), index)
      };
    }),
    k: $props.showIcon === true || $props.showIcon === "true"
  }, $props.showIcon === true || $props.showIcon === "true" ? {
    l: common_vendor.p({
      color: "#666",
      size: "16",
      type: "right"
    })
  } : {
    m: common_vendor.t($options.nextPageText)
  }, {
    n: common_vendor.n($data.currentIndex >= $options.maxPage ? "uni-pagination--disabled" : "uni-pagination--enabled"),
    o: $data.currentIndex === $options.maxPage ? "" : "uni-pagination--hover",
    p: common_vendor.o((...args) => $options.clickRight && $options.clickRight(...args))
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-a276fa4e"], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-pagination/components/uni-pagination/uni-pagination.vue"]]);
wx.createComponent(Component);
