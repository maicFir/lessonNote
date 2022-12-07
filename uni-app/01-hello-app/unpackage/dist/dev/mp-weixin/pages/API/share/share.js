"use strict";
var common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "share",
      shareText: "uni-app\u53EF\u4EE5\u540C\u65F6\u53D1\u5E03\u6210\u539F\u751FApp\u3001\u5C0F\u7A0B\u5E8F\u3001H5\uFF0C\u9080\u8BF7\u4F60\u4E00\u8D77\u4F53\u9A8C\uFF01",
      href: "https://uniapp.dcloud.io",
      image: "",
      shareType: 1,
      providerList: []
    };
  },
  computed: {
    isDisableButton() {
      return function(item) {
        if (this.shareType === 0 && item.id === "qq") {
          return true;
        }
        if (this.shareType === 5 && item.name !== "\u5206\u4EAB\u5230\u5FAE\u4FE1\u597D\u53CB") {
          return true;
        }
        return false;
      };
    }
  },
  onShareAppMessage() {
    return {
      title: this.shareText ? this.shareText : "\u6B22\u8FCE\u4F53\u9A8Cuni-app",
      path: "/pages/tabBar/component/component",
      imageUrl: this.image ? this.image : "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b6304f00-5168-11eb-bd01-97bc1429a9ff.png"
    };
  },
  onUnload: function() {
    this.shareText = "uni-app\u53EF\u4EE5\u540C\u65F6\u53D1\u5E03\u6210\u539F\u751FApp\u3001\u5C0F\u7A0B\u5E8F\u3001H5\uFF0C\u9080\u8BF7\u4F60\u4E00\u8D77\u4F53\u9A8C\uFF01", this.href = "https://uniapp.dcloud.io", this.image = "";
  },
  onLoad: function() {
    common_vendor.index.getProvider({
      service: "share",
      success: (e) => {
        console.log("success", e);
        let data = [];
        for (let i = 0; i < e.provider.length; i++) {
          switch (e.provider[i]) {
            case "weixin":
              data.push({
                name: "\u5206\u4EAB\u5230\u5FAE\u4FE1\u597D\u53CB",
                id: "weixin",
                sort: 0
              });
              data.push({
                name: "\u5206\u4EAB\u5230\u5FAE\u4FE1\u670B\u53CB\u5708",
                id: "weixin",
                type: "WXSenceTimeline",
                sort: 1
              });
              break;
            case "sinaweibo":
              data.push({
                name: "\u5206\u4EAB\u5230\u65B0\u6D6A\u5FAE\u535A",
                id: "sinaweibo",
                sort: 2
              });
              break;
            case "qq":
              data.push({
                name: "\u5206\u4EAB\u5230QQ",
                id: "qq",
                sort: 3
              });
              break;
          }
        }
        this.providerList = data.sort((x, y) => {
          return x.sort - y.sort;
        });
      },
      fail: (e) => {
        console.log("\u83B7\u53D6\u5206\u4EAB\u901A\u9053\u5931\u8D25", e);
        common_vendor.index.showModal({
          content: "\u83B7\u53D6\u5206\u4EAB\u901A\u9053\u5931\u8D25",
          showCancel: false
        });
      }
    });
  },
  methods: {
    async share(e) {
      console.log("\u5206\u4EAB\u901A\u9053:" + e.id + "\uFF1B \u5206\u4EAB\u7C7B\u578B:" + this.shareType);
      if (!this.shareText && (this.shareType === 1 || this.shareType === 0)) {
        common_vendor.index.showModal({
          content: "\u5206\u4EAB\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A",
          showCancel: false
        });
        return;
      }
      if (!this.image && (this.shareType === 2 || this.shareType === 0)) {
        common_vendor.index.showModal({
          content: "\u5206\u4EAB\u56FE\u7247\u4E0D\u80FD\u4E3A\u7A7A",
          showCancel: false
        });
        return;
      }
      let shareOPtions = {
        provider: e.id,
        scene: e.type && e.type === "WXSenceTimeline" ? "WXSenceTimeline" : "WXSceneSession",
        type: this.shareType,
        success: (e2) => {
          console.log("success", e2);
          common_vendor.index.showModal({
            content: "\u5DF2\u5206\u4EAB",
            showCancel: false
          });
        },
        fail: (e2) => {
          console.log("fail", e2);
          common_vendor.index.showModal({
            content: e2.errMsg,
            showCancel: false
          });
        },
        complete: function() {
          console.log("\u5206\u4EAB\u64CD\u4F5C\u7ED3\u675F!");
        }
      };
      switch (this.shareType) {
        case 0:
          shareOPtions.summary = this.shareText;
          shareOPtions.imageUrl = this.image;
          shareOPtions.title = "\u6B22\u8FCE\u4F53\u9A8Cuniapp";
          shareOPtions.href = "https://uniapp.dcloud.io";
          break;
        case 1:
          shareOPtions.summary = this.shareText;
          break;
        case 2:
          shareOPtions.imageUrl = this.image;
          break;
        case 5:
          shareOPtions.imageUrl = this.image ? this.image : "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/b6304f00-5168-11eb-bd01-97bc1429a9ff.png";
          shareOPtions.title = "\u6B22\u8FCE\u4F53\u9A8Cuniapp";
          shareOPtions.miniProgram = {
            id: "gh_33446d7f7a26",
            path: "/pages/tabBar/component/component",
            webUrl: "https://uniapp.dcloud.io",
            type: 0
          };
          break;
      }
      if (shareOPtions.type === 0 && plus.os.name === "iOS") {
        shareOPtions.imageUrl = await this.compress();
      }
      if (shareOPtions.type === 1 && shareOPtions.provider === "qq") {
        shareOPtions.href = "https://uniapp.dcloud.io";
        shareOPtions.title = "\u6B22\u8FCE\u4F53\u9A8Cuniapp";
      }
      common_vendor.index.share(shareOPtions);
    },
    radioChange(e) {
      console.log("type:" + e.detail.value);
      this.shareType = parseInt(e.detail.value);
    },
    chooseImage() {
      common_vendor.index.chooseImage({
        count: 1,
        sourceType: ["album", "camera"],
        sizeType: ["compressed", "original"],
        success: (res) => {
          this.image = res.tempFilePaths[0];
        },
        fail: (err) => {
          common_vendor.index.getSetting({
            success: (res) => {
              let authStatus = res.authSetting["scope.album"] && res.authSetting["scope.camera"];
              if (!authStatus) {
                common_vendor.index.showModal({
                  title: "\u6388\u6743\u5931\u8D25",
                  content: "Hello uni-app\u9700\u8981\u4ECE\u60A8\u7684\u76F8\u673A\u6216\u76F8\u518C\u83B7\u53D6\u56FE\u7247\uFF0C\u8BF7\u5728\u8BBE\u7F6E\u754C\u9762\u6253\u5F00\u76F8\u5173\u6743\u9650",
                  success: (res2) => {
                    if (res2.confirm) {
                      common_vendor.index.openSetting();
                    }
                  }
                });
              }
            }
          });
        }
      });
    },
    compress() {
      console.log("\u5F00\u59CB\u538B\u7F29");
      let img = this.image;
      return new Promise((res) => {
        var localPath = plus.io.convertAbsoluteFileSystem(img.replace("file://", ""));
        console.log("after" + localPath);
        plus.io.resolveLocalFileSystemURL(localPath, (entry) => {
          entry.file((file) => {
            console.log("getFile:" + JSON.stringify(file));
            if (file.size > 20480) {
              plus.zip.compressImage({
                src: img,
                dst: img.replace(".jpg", "2222.jpg").replace(".JPG", "2222.JPG"),
                width: "10%",
                height: "10%",
                quality: 1,
                overwrite: true
              }, (event) => {
                console.log("success zip****" + event.size);
                let newImg = img.replace(".jpg", "2222.jpg").replace(".JPG", "2222.JPG");
                res(newImg);
              }, function(error) {
                common_vendor.index.showModal({
                  content: "\u5206\u4EAB\u56FE\u7247\u592A\u5927,\u9700\u8981\u8BF7\u91CD\u65B0\u9009\u62E9\u56FE\u7247!",
                  showCancel: false
                });
              });
            }
          });
        }, (e) => {
          console.log("Resolve file URL failed: " + e.message);
          common_vendor.index.showModal({
            content: "\u5206\u4EAB\u56FE\u7247\u592A\u5927,\u9700\u8981\u8BF7\u91CD\u65B0\u9009\u62E9\u56FE\u7247!",
            showCancel: false
          });
        });
      });
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
  return common_vendor.e({
    a: common_vendor.p({
      title: $data.title
    }),
    b: $data.shareText,
    c: common_vendor.o(($event) => $data.shareText = $event.detail.value),
    d: !$data.image
  }, !$data.image ? {
    e: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args))
  } : {}, {
    f: $data.image
  }, $data.image ? {
    g: $data.image
  } : {});
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/share/share.vue"]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
