"use strict";
var common_vendor = require("../../../../common/vendor.js");
const avatarWidth = 45;
const _sfc_main = {
  name: "UniListChat",
  emits: ["click"],
  props: {
    title: {
      type: String,
      default: ""
    },
    note: {
      type: String,
      default: ""
    },
    clickable: {
      type: Boolean,
      default: false
    },
    link: {
      type: [Boolean, String],
      default: false
    },
    to: {
      type: String,
      default: ""
    },
    badgeText: {
      type: [String, Number],
      default: ""
    },
    badgePositon: {
      type: String,
      default: "right"
    },
    time: {
      type: String,
      default: ""
    },
    avatarCircle: {
      type: Boolean,
      default: false
    },
    avatar: {
      type: String,
      default: ""
    },
    avatarList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    isSingle() {
      if (this.badgeText === "dot") {
        return "uni-badge--dot";
      } else {
        const badgeText = this.badgeText.toString();
        if (badgeText.length > 1) {
          return "uni-badge--complex";
        } else {
          return "uni-badge--single";
        }
      }
    },
    computedAvatar() {
      if (this.avatarList.length > 4) {
        this.imageWidth = avatarWidth * 0.31;
        return "avatarItem--3";
      } else if (this.avatarList.length > 1) {
        this.imageWidth = avatarWidth * 0.47;
        return "avatarItem--2";
      } else {
        this.imageWidth = avatarWidth;
        return "avatarItem--1";
      }
    }
  },
  data() {
    return {
      isFirstChild: false,
      border: true,
      imageWidth: 50
    };
  },
  mounted() {
    this.list = this.getForm();
    if (this.list) {
      if (!this.list.firstChildAppend) {
        this.list.firstChildAppend = true;
        this.isFirstChild = true;
      }
      this.border = this.list.border;
    }
  },
  methods: {
    getForm(name = "uniList") {
      let parent = this.$parent;
      let parentName = parent.$options.name;
      while (parentName !== name) {
        parent = parent.$parent;
        if (!parent)
          return false;
        parentName = parent.$options.name;
      }
      return parent;
    },
    onClick() {
      if (this.to !== "") {
        this.openPage();
        return;
      }
      if (this.clickable || this.link) {
        this.$emit("click", {
          data: {}
        });
      }
    },
    openPage() {
      if (["navigateTo", "redirectTo", "reLaunch", "switchTab"].indexOf(this.link) !== -1) {
        this.pageApi(this.link);
      } else {
        this.pageApi("navigateTo");
      }
    },
    pageApi(api) {
      common_vendor.index[api]({
        url: this.to,
        success: (res) => {
          this.$emit("click", {
            data: res
          });
        },
        fail: (err) => {
          this.$emit("click", {
            data: err
          });
          console.error(err.errMsg);
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.border ? 1 : "",
    b: $data.isFirstChild ? 1 : "",
    c: $props.avatarCircle || $props.avatarList.length === 0
  }, $props.avatarCircle || $props.avatarList.length === 0 ? {
    d: $props.avatarCircle ? 1 : "",
    e: $props.avatar,
    f: $props.avatarCircle ? 1 : ""
  } : {
    g: common_vendor.f($props.avatarList, (item, index, i0) => {
      return {
        a: item.url,
        b: index
      };
    }),
    h: $data.imageWidth + "px",
    i: $data.imageWidth + "px",
    j: common_vendor.n($options.computedAvatar),
    k: $data.imageWidth + "px",
    l: $data.imageWidth + "px"
  }, {
    m: $props.badgeText && $props.badgePositon === "left"
  }, $props.badgeText && $props.badgePositon === "left" ? {
    n: common_vendor.t($props.badgeText === "dot" ? "" : $props.badgeText),
    o: common_vendor.n($options.isSingle)
  } : {}, {
    p: common_vendor.t($props.title),
    q: common_vendor.t($props.note),
    r: common_vendor.t($props.time),
    s: $props.badgeText && $props.badgePositon === "right"
  }, $props.badgeText && $props.badgePositon === "right" ? {
    t: common_vendor.t($props.badgeText === "dot" ? "" : $props.badgeText),
    v: common_vendor.n($options.isSingle),
    w: common_vendor.n($props.badgePositon === "right" ? "uni-list-chat--right" : "")
  } : {}, {
    x: !$props.clickable && !$props.link ? "" : "uni-list-chat--hover",
    y: common_vendor.o((...args) => $options.onClick && $options.onClick(...args))
  });
}
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/uni_modules/uni-list/components/uni-list-chat/uni-list-chat.vue"]]);
wx.createComponent(Component);
