"use strict";
var common_vendor = require("../../../common/vendor.js");
let platform = common_vendor.index.getSystemInfoSync().platform;
const _sfc_main = {
  data() {
    return {
      connected: false,
      connecting: false,
      socketTask: false,
      msg: false
    };
  },
  computed: {
    showMsg() {
      if (this.connected) {
        if (this.msg) {
          return "\u6536\u5230\u6D88\u606F\uFF1A" + this.msg;
        } else {
          return "\u7B49\u5F85\u63A5\u6536\u6D88\u606F";
        }
      } else {
        return "\u5C1A\u672A\u8FDE\u63A5";
      }
    }
  },
  onUnload() {
    common_vendor.index.hideLoading();
    if (this.socketTask && this.socketTask.close) {
      this.socketTask.close();
    }
  },
  methods: {
    connect() {
      if (this.connected || this.connecting) {
        common_vendor.index.showModal({
          content: "\u6B63\u5728\u8FDE\u63A5\u6216\u8005\u5DF2\u7ECF\u8FDE\u63A5\uFF0C\u8BF7\u52FF\u91CD\u590D\u8FDE\u63A5",
          showCancel: false
        });
        return false;
      }
      this.connecting = true;
      common_vendor.index.showLoading({
        title: "\u8FDE\u63A5\u4E2D..."
      });
      this.socketTask = common_vendor.index.connectSocket({
        url: "wss://echo.websocket.org",
        data() {
          return {
            msg: "Hello"
          };
        },
        header: {
          "content-type": "application/json"
        },
        method: "GET",
        success(res) {
        },
        fail(err) {
        }
      });
      console.log(this.socketTask);
      this.socketTask.onOpen((res) => {
        this.connecting = false;
        this.connected = true;
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          icon: "none",
          title: "\u8FDE\u63A5\u6210\u529F"
        });
        console.log("onOpen", res);
      });
      this.socketTask.onError((err) => {
        this.connecting = false;
        this.connected = false;
        common_vendor.index.hideLoading();
        common_vendor.index.showModal({
          content: "\u8FDE\u63A5\u5931\u8D25\uFF0C\u53EF\u80FD\u662Fwebsocket\u670D\u52A1\u4E0D\u53EF\u7528\uFF0C\u8BF7\u7A0D\u540E\u518D\u8BD5",
          showCancel: false
        });
        console.log("onError", err);
      });
      this.socketTask.onMessage((res) => {
        this.msg = res.data;
        console.log("onMessage", res);
      });
      this.socketTask.onClose((res) => {
        this.connected = false;
        this.startRecive = false;
        this.socketTask = false;
        this.msg = false;
        console.log("onClose", res);
      });
      console.log("task", this.socketTask);
    },
    send() {
      this.socketTask.send({
        data: "from " + platform + " : " + parseInt(Math.random() * 1e4).toString(),
        success(res) {
          console.log(res);
        },
        fail(err) {
          console.log(err);
        }
      });
    },
    close() {
      if (this.socketTask && this.socketTask.close) {
        this.socketTask.close();
      }
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
      title: "websocket\u901A\u8BAF\u793A\u4F8B"
    }),
    b: common_vendor.t($options.showMsg),
    c: common_vendor.o((...args) => $options.connect && $options.connect(...args)),
    d: $data.connected,
    e: common_vendor.o((...args) => $options.send && $options.send(...args)),
    f: common_vendor.o((...args) => $options.close && $options.close(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/websocket-socketTask/websocket-socketTask.vue"]]);
wx.createPage(MiniProgramPage);
