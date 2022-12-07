"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var store_index = require("./store/index.js");
if (!Math) {
  "./pages/tabBar/component/component.js";
  "./pages/tabBar/API/API.js";
  "./pages/tabBar/template/template.js";
  "./pages/tabBar/extUI/extUI.js";
  "./pages/component/view/view.js";
  "./pages/component/scroll-view/scroll-view.js";
  "./pages/component/swiper/swiper.js";
  "./pages/component/cover-view/cover-view.js";
  "./pages/component/movable-view/movable-view.js";
  "./pages/component/text/text.js";
  "./pages/component/rich-text/rich-text.js";
  "./pages/component/progress/progress.js";
  "./pages/component/button/button.js";
  "./pages/component/checkbox/checkbox.js";
  "./pages/component/form/form.js";
  "./pages/component/input/input.js";
  "./pages/component/label/label.js";
  "./pages/component/picker/picker.js";
  "./pages/component/picker-view/picker-view.js";
  "./pages/component/radio/radio.js";
  "./pages/component/slider/slider.js";
  "./pages/component/switch/switch.js";
  "./pages/component/textarea/textarea.js";
  "./pages/component/editor/editor.js";
  "./pages/component/navigator/navigator.js";
  "./pages/component/navigator/navigate/navigate.js";
  "./pages/component/navigator/redirect/redirect.js";
  "./pages/component/image/image.js";
  "./pages/component/video/video.js";
  "./pages/component/map/map.js";
  "./pages/component/canvas/canvas.js";
  "./pages/component/web-view/web-view.js";
  "./platforms/app-plus/speech/speech.js";
  "./platforms/app-plus/orientation/orientation.js";
  "./platforms/app-plus/proximity/proximity.js";
  "./platforms/app-plus/push/push.js";
  "./platforms/app-plus/shake/shake.js";
  "./platforms/app-plus/feedback/feedback.js";
  "./uni_modules/uni-upgrade-center-app/pages/upgrade-popup.js";
  "./pages/API/login/login.js";
  "./pages/API/get-user-info/get-user-info.js";
  "./pages/API/request-payment/request-payment.js";
  "./pages/API/share/share.js";
  "./pages/API/set-navigation-bar-title/set-navigation-bar-title.js";
  "./pages/API/show-loading/show-loading.js";
  "./pages/API/navigator/navigator.js";
  "./pages/API/navigator/new-page/new-vue-page-1.js";
  "./pages/API/navigator/new-page/new-vue-page-2.js";
  "./pages/API/pull-down-refresh/pull-down-refresh.js";
  "./pages/API/animation/animation.js";
  "./pages/API/get-node-info/get-node-info.js";
  "./pages/API/intersection-observer/intersection-observer.js";
  "./pages/API/canvas/canvas.js";
  "./pages/API/action-sheet/action-sheet.js";
  "./pages/API/modal/modal.js";
  "./pages/API/toast/toast.js";
  "./pages/API/get-network-type/get-network-type.js";
  "./pages/API/get-system-info/get-system-info.js";
  "./pages/API/add-phone-contact/add-phone-contact.js";
  "./pages/API/on-accelerometer-change/on-accelerometer-change.js";
  "./pages/API/on-compass-change/on-compass-change.js";
  "./pages/API/make-phone-call/make-phone-call.js";
  "./pages/API/scan-code/scan-code.js";
  "./pages/API/clipboard/clipboard.js";
  "./pages/API/request/request.js";
  "./pages/API/upload-file/upload-file.js";
  "./pages/API/download-file/download-file.js";
  "./pages/API/image/image.js";
  "./pages/API/voice/voice.js";
  "./pages/API/inner-audio/inner-audio.js";
  "./pages/API/background-audio/background-audio.js";
  "./pages/API/video/video.js";
  "./pages/API/file/file.js";
  "./pages/API/map/map.js";
  "./pages/API/get-location/get-location.js";
  "./pages/API/open-location/open-location.js";
  "./pages/API/choose-location/choose-location.js";
  "./pages/API/storage/storage.js";
  "./pages/API/sqlite/sqlite.js";
  "./pages/API/rewarded-video-ad/rewarded-video-ad.js";
  "./pages/API/brightness/brightness.js";
  "./pages/API/save-media/save-media.js";
  "./pages/API/bluetooth/bluetooth.js";
  "./pages/API/soter/soter.js";
  "./pages/API/ibeacon/ibeacon.js";
  "./pages/API/vibrate/vibrate.js";
  "./pages/API/websocket-socketTask/websocket-socketTask.js";
  "./pages/API/websocket-global/websocket-global.js";
  "./pages/extUI/forms/forms.js";
  "./pages/extUI/group/group.js";
  "./pages/extUI/badge/badge.js";
  "./pages/extUI/breadcrumb/breadcrumb.js";
  "./pages/extUI/countdown/countdown.js";
  "./pages/extUI/drawer/drawer.js";
  "./pages/extUI/icons/icons.js";
  "./pages/extUI/load-more/load-more.js";
  "./pages/extUI/nav-bar/nav-bar.js";
  "./pages/extUI/number-box/number-box.js";
  "./pages/extUI/popup/popup.js";
  "./pages/extUI/segmented-control/segmented-control.js";
  "./pages/extUI/tag/tag.js";
  "./pages/extUI/list/list.js";
  "./pages/extUI/card/card.js";
  "./pages/extUI/collapse/collapse.js";
  "./pages/extUI/pagination/pagination.js";
  "./pages/extUI/swiper-dot/swiper-dot.js";
  "./pages/extUI/grid/grid.js";
  "./pages/extUI/rate/rate.js";
  "./pages/extUI/steps/steps.js";
  "./pages/extUI/notice-bar/notice-bar.js";
  "./pages/extUI/swipe-action/swipe-action.js";
  "./pages/extUI/search-bar/search-bar.js";
  "./pages/extUI/calendar/calendar.js";
  "./pages/extUI/indexed-list/indexed-list.js";
  "./pages/extUI/fab/fab.js";
  "./pages/extUI/fav/fav.js";
  "./pages/extUI/goods-nav/goods-nav.js";
  "./pages/extUI/section/section.js";
  "./pages/extUI/transition/transition.js";
  "./pages/extUI/title/title.js";
  "./pages/extUI/tooltip/tooltip.js";
  "./pages/extUI/link/link.js";
  "./pages/extUI/combox/combox.js";
  "./pages/extUI/list/chat.js";
  "./pages/extUI/table/table.js";
  "./pages/extUI/dateformat/dateformat.js";
  "./pages/extUI/data-checkbox/data-checkbox.js";
  "./pages/extUI/easyinput/easyinput.js";
  "./pages/extUI/data-picker/data-picker.js";
  "./pages/extUI/data-select/data-select.js";
  "./pages/extUI/datetime-picker/datetime-picker.js";
  "./pages/extUI/row/row.js";
  "./pages/extUI/file-picker/file-picker.js";
  "./pages/extUI/space/space.js";
  "./pages/extUI/font/font.js";
  "./pages/extUI/color/color.js";
  "./pages/extUI/radius/radius.js";
  "./pages/extUI/button/button.js";
  "./pages/template/nav-default/nav-default.js";
  "./pages/template/component-communication/component-communication.js";
  "./pages/template/list2detail-list/list2detail-list.js";
  "./pages/template/list2detail-detail/list2detail-detail.js";
  "./pages/template/tabbar/tabbar.js";
  "./pages/template/tabbar/detail/detail.js";
  "./pages/template/swiper-vertical/swiper-vertical.js";
  "./pages/template/swiper-list/swiper-list.js";
  "./pages/template/scheme/scheme.js";
  "./pages/template/global/global.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
  globalData: {
    test: ""
  },
  methods: __spreadValues({}, common_vendor.mapMutations(["setUniverifyErrorMsg", "setUniverifyLogin"]))
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(store_index.store);
  app.config.globalProperties.$adpid = "1111111111";
  app.config.globalProperties.$backgroundAudioData = {
    playing: false,
    playTime: 0,
    formatedPlayTime: "00:00:00"
  };
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
