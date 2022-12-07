"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  components: {},
  data() {
    return {
      UNITS: {
        "\u5E74": 315576e5,
        "\u6708": 26298e5,
        "\u5929": 864e5,
        "\u5C0F\u65F6": 36e5,
        "\u5206\u949F": 6e4,
        "\u79D2": 1e3
      },
      listData: [],
      avatarList: [{
        url: "/static/logo.png"
      }, {
        url: "/static/logo.png"
      }, {
        url: "/static/logo.png"
      }]
    };
  },
  onLoad() {
    this.getList();
  },
  methods: {
    onClick() {
      common_vendor.index.showToast({
        title: "\u5217\u8868\u88AB\u70B9\u51FB"
      });
    },
    avatar(count) {
      let arr = [];
      this.avatarList.forEach((item, index) => {
        if (index < count) {
          arr.push(item);
        }
      });
      return arr;
    },
    getList() {
      var data = {
        column: "id,post_id,title,author_name,cover,published_at"
      };
      common_vendor.index.request({
        url: "https://unidemo.dcloud.net.cn/api/news",
        data,
        success: (data2) => {
          if (data2.statusCode == 200) {
            let list = this.setTime(data2.data);
            list = this.reload ? list : this.listData.concat(list);
            list.map((item) => {
              item.text = Math.floor(Math.random() * (1 - 20) + 20);
              return item;
            });
            this.listData = this.getRandomArrayElements(list, 3);
          }
        },
        fail: (data2, code) => {
          console.log("fail" + JSON.stringify(data2));
        }
      });
    },
    getRandomArrayElements(arr, count) {
      var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
      while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }
      return shuffled.slice(min);
    },
    setTime(items) {
      var newItems = [];
      items.forEach((e) => {
        newItems.push({
          author_name: e.author_name,
          cover: e.cover,
          id: e.id,
          post_id: e.post_id,
          published_at: this.format(e.published_at),
          title: e.title
        });
      });
      return newItems;
    },
    format(dateStr) {
      var date = this.parse(dateStr);
      var diff = Date.now() - date.getTime();
      if (diff < this.UNITS["\u5929"]) {
        return this.humanize(diff);
      }
      var _format = function(number) {
        return number < 10 ? "0" + number : number;
      };
      return date.getFullYear() + "-" + _format(date.getMonth() + 1) + "-" + _format(date.getDate()) + " " + _format(date.getHours()) + ":" + _format(date.getMinutes());
    },
    parse(str) {
      var a = str.split(/[^0-9]/);
      return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
    }
  }
};
if (!Array) {
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  const _easycom_uni_list_chat2 = common_vendor.resolveComponent("uni-list-chat");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_uni_card2 + _easycom_uni_list_chat2 + _easycom_uni_list2 + _easycom_uni_section2 + _easycom_uni_icons2)();
}
const _easycom_uni_card = () => "../../../uni_modules/uni-card/components/uni-card/uni-card.js";
const _easycom_uni_list_chat = () => "../../../uni_modules/uni-list/components/uni-list-chat/uni-list-chat.js";
const _easycom_uni_list = () => "../../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_section = () => "../../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_uni_card + _easycom_uni_list_chat + _easycom_uni_list + _easycom_uni_section + _easycom_uni_icons)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      ["is-shadow"]: false,
      ["is-full"]: true
    }),
    b: common_vendor.f($data.listData, (item, k0, i0) => {
      return {
        a: item.id,
        b: "5a6c32bc-3-" + i0 + ",5a6c32bc-2",
        c: common_vendor.p({
          ["avatar-circle"]: true,
          title: item.author_name,
          avatar: item.cover,
          note: item.title,
          time: item.published_at,
          clickable: false
        })
      };
    }),
    c: common_vendor.p({
      border: false
    }),
    d: common_vendor.p({
      title: "\u5706\u5934\u50CF\u4E14\u4E0D\u663E\u793A\u5206\u5272\u7EBF",
      type: "line"
    }),
    e: common_vendor.f($data.listData, (item, k0, i0) => {
      return {
        a: item.id,
        b: "5a6c32bc-6-" + i0 + ",5a6c32bc-5",
        c: common_vendor.p({
          title: item.author_name,
          avatar: item.cover,
          note: item.title,
          time: item.published_at,
          ["badge-text"]: item.text,
          clickable: false,
          ["badge-positon"]: "left",
          ["badge-text"]: "dot"
        })
      };
    }),
    f: common_vendor.p({
      title: "\u5E26\u5706\u70B9",
      type: "line"
    }),
    g: common_vendor.f($data.listData, (item, k0, i0) => {
      return {
        a: "5a6c32bc-10-" + i0 + "," + ("5a6c32bc-9-" + i0),
        b: item.id,
        c: "5a6c32bc-9-" + i0 + ",5a6c32bc-8",
        d: common_vendor.p({
          title: item.author_name,
          avatar: item.cover,
          note: item.title,
          ["badge-positon"]: "left",
          ["badge-text"]: item.text
        })
      };
    }),
    h: common_vendor.p({
      type: "star-filled",
      color: "#999",
      size: "18"
    }),
    i: common_vendor.p({
      title: "\u81EA\u5B9A\u4E49\u53F3\u4FA7\u5185\u5BB9",
      type: "line"
    }),
    j: common_vendor.f($data.listData, (item, k0, i0) => {
      return {
        a: item.id,
        b: common_vendor.o($options.onClick, item.id),
        c: "5a6c32bc-13-" + i0 + ",5a6c32bc-12",
        d: common_vendor.p({
          title: item.author_name,
          avatar: item.cover,
          note: item.title,
          time: item.published_at,
          clickable: true,
          ["badge-text"]: item.text
        })
      };
    }),
    k: common_vendor.p({
      title: "\u5E26\u901A\u77E5\u89D2\u6807\u7684\u5355\u5934\u50CF\u804A\u5929\u5217\u8868",
      type: "line"
    }),
    l: common_vendor.f($data.listData, (item, index, i0) => {
      return {
        a: item.id,
        b: common_vendor.o($options.onClick, item.id),
        c: "5a6c32bc-16-" + i0 + ",5a6c32bc-15",
        d: common_vendor.p({
          title: item.author_name,
          avatar: item.cover,
          note: item.title,
          time: item.published_at,
          clickable: true,
          avatarList: $options.avatar(index + 1),
          ["badge-text"]: item.text
        })
      };
    }),
    m: common_vendor.p({
      title: "\u5E26\u901A\u77E5\u89D2\u6807\u7684\u591A\u5934\u50CF\u804A\u5929\u5217\u8868",
      type: "line"
    })
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/extUI/list/chat.vue"]]);
wx.createPage(MiniProgramPage);
