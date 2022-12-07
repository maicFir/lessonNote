"use strict";
var common_vendor = require("../../../common/vendor.js");
const testMarkers = [
  {
    id: 0,
    latitude: 39.989631,
    longitude: 116.481018,
    title: "\u65B9\u6052\u56FD\u9645 \u961C\u901A\u4E1C\u5927\u88576\u53F7",
    zIndex: "1",
    rotate: 0,
    width: 20,
    height: 20,
    anchor: {
      x: 0.5,
      y: 1
    },
    callout: {
      content: "\u65B9\u6052\u56FD\u9645 \u961C\u901A\u4E1C\u5927\u88576\u53F7",
      color: "#00BFFF",
      fontSize: 10,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: "#333300",
      bgColor: "#CCFF99",
      padding: "5",
      display: "ALWAYS"
    }
  },
  {
    id: 1,
    latitude: 39.908692,
    longitude: 116.397477,
    title: "\u5929\u5B89\u95E8",
    zIndex: "1",
    iconPath: "/static/location.png",
    width: 40,
    height: 40,
    anchor: {
      x: 0.5,
      y: 1
    },
    callout: {
      content: "\u9996\u90FD\u5317\u4EAC\n\u5929\u5B89\u95E8",
      color: "#00BFFF",
      fontSize: 12,
      borderRadius: 2,
      borderWidth: 0,
      borderColor: "#333300",
      bgColor: "#CCFF11",
      padding: "1",
      display: "ALWAYS"
    }
  }
];
const testPolyline = [
  {
    points: [
      {
        latitude: 39.925539,
        longitude: 116.279037
      },
      {
        latitude: 39.925539,
        longitude: 116.520285
      }
    ],
    color: "#FFCCFF",
    width: 7,
    dottedLine: true,
    arrowLine: true,
    borderColor: "#000000",
    borderWidth: 2
  },
  {
    points: [
      {
        latitude: 39.938698,
        longitude: 116.275177
      },
      {
        latitude: 39.966069,
        longitude: 116.289253
      },
      {
        latitude: 39.944226,
        longitude: 116.306076
      },
      {
        latitude: 39.966069,
        longitude: 116.322899
      },
      {
        latitude: 39.938698,
        longitude: 116.336975
      }
    ],
    color: "#CCFFFF",
    width: 5,
    dottedLine: true,
    arrowLine: true,
    borderColor: "#CC0000",
    borderWidth: 3
  }
];
const testPolygons = [
  {
    points: [
      {
        latitude: 39.781892,
        longitude: 116.293413
      },
      {
        latitude: 39.7876,
        longitude: 116.391842
      },
      {
        latitude: 39.733187,
        longitude: 116.417932
      },
      {
        latitude: 39.704653,
        longitude: 116.338255
      }
    ],
    fillColor: "#FFCCFF",
    strokeWidth: 3,
    strokeColor: "#CC99CC",
    zIndex: 11
  },
  {
    points: [
      {
        latitude: 39.8876,
        longitude: 116.518932
      },
      {
        latitude: 39.781892,
        longitude: 116.518932
      },
      {
        latitude: 39.781892,
        longitude: 116.428932
      },
      {
        latitude: 39.8876,
        longitude: 116.428932
      }
    ],
    fillColor: "#CCFFFF",
    strokeWidth: 5,
    strokeColor: "#CC0000",
    zIndex: 3
  }
];
const testCircles = [
  {
    latitude: 39.996441,
    longitude: 116.411146,
    radius: 15e3,
    strokeWidth: 5,
    color: "#CCFFFF",
    fillColor: "#CC0000"
  },
  {
    latitude: 40.096441,
    longitude: 116.511146,
    radius: 12e3,
    strokeWidth: 3,
    color: "#CCFFFF",
    fillColor: "#FFCCFF"
  },
  {
    latitude: 39.896441,
    longitude: 116.311146,
    radius: 9e3,
    strokeWidth: 1,
    color: "#CCFFFF",
    fillColor: "#CC0000"
  }
];
const testIncludePoints = [
  {
    latitude: 39.989631,
    longitude: 116.481018
  },
  {
    latitude: 39.908692,
    longitude: 116.397477
  }
];
const _sfc_main = {
  data() {
    return {
      location: {
        longitude: 116.397477,
        latitude: 39.908692
      },
      controls: [{
        id: 1,
        position: {
          left: 5,
          top: 180,
          width: 30,
          height: 30
        },
        iconPath: "/static/logo.png",
        clickable: true
      }],
      showLocation: false,
      scale: 13,
      showCompass: true,
      enable3D: true,
      enableOverlooking: true,
      enableZoom: true,
      enableScroll: true,
      enableRotate: true,
      enableSatellite: false,
      enableTraffic: false,
      polyline: [],
      markers: [],
      polygons: [],
      circles: [],
      includePoints: [],
      rotate: 0,
      skew: 0
    };
  },
  onLoad() {
  },
  onReady() {
    this.map = common_vendor.index.createMapContext("map1", this);
  },
  methods: {
    changeScale() {
      this.scale = this.scale == 9 ? 15 : 9;
    },
    changeRotate() {
      this.rotate = this.rotate == 90 ? 0 : 90;
    },
    changeSkew() {
      this.skew = this.skew == 30 ? 0 : 30;
    },
    enableThreeD(e) {
      this.enable3D = e.detail.value;
    },
    changeShowCompass(e) {
      this.showCompass = e.detail.value;
    },
    changeEnableOverlooking(e) {
      this.enableOverlooking = e.detail.value;
    },
    changeEnableZoom(e) {
      this.enableZoom = e.detail.value;
    },
    changeEnableScroll(e) {
      this.enableScroll = e.detail.value;
    },
    changeEnableRotate(e) {
      this.enableRotate = e.detail.value;
    },
    changeEnableSatellite(e) {
      this.enableSatellite = e.detail.value;
    },
    changeEnableTraffic(e) {
      this.enableTraffic = e.detail.value;
    },
    addMarkers() {
      this.markers = testMarkers;
    },
    addPolyline() {
      this.polyline = testPolyline;
    },
    addPolygons() {
      this.polygons = testPolygons;
    },
    addCircles() {
      this.circles = testCircles;
    },
    includePoint() {
      this.includePoints = testIncludePoints;
    },
    handleGetCenterLocation() {
      this.map.getCenterLocation({
        success: (ret) => {
          console.log(JSON.stringify(ret));
          common_vendor.index.showModal({
            content: JSON.stringify(ret)
          });
        }
      });
    },
    handleGetRegion() {
      this.map.getRegion({
        success: (ret) => {
          console.log(JSON.stringify(ret));
          common_vendor.index.showModal({
            content: JSON.stringify(ret)
          });
        }
      });
    },
    handleTranslateMarker() {
      this.map.translateMarker({
        markerId: 1,
        destination: {
          latitude: 39.989631,
          longitude: 116.481018
        },
        duration: 2e3
      }, (ret) => {
        console.log(JSON.stringify(ret));
        common_vendor.index.showModal({
          content: JSON.stringify(ret)
        });
      });
    },
    maptap(e) {
      common_vendor.index.showModal({
        content: JSON.stringify(e)
      });
    },
    onmarkertap(e) {
      common_vendor.index.showModal({
        content: JSON.stringify(e)
      });
    },
    oncontroltap(e) {
      common_vendor.index.showModal({
        content: JSON.stringify(e)
      });
    },
    oncallouttap(e) {
      common_vendor.index.showModal({
        content: JSON.stringify(e)
      });
    },
    onupdated(e) {
      console.log(JSON.stringify(e));
    },
    onregionchange(e) {
      console.log(JSON.stringify(e));
    },
    onpoitap(e) {
      common_vendor.index.showModal({
        content: JSON.stringify(e)
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.controls,
    b: $data.scale,
    c: $data.location.longitude,
    d: $data.location.latitude,
    e: $data.showLocation,
    f: $data.enable3D,
    g: $data.rotate,
    h: $data.skew,
    i: $data.showCompass,
    j: $data.enableOverlooking,
    k: $data.enableZoom,
    l: $data.enableScroll,
    m: $data.enableRotate,
    n: $data.enableSatellite,
    o: $data.enableTraffic,
    p: $data.markers,
    q: $data.polyline,
    r: $data.circles,
    s: $data.polygons,
    t: $data.includePoints,
    v: common_vendor.o((...args) => $options.maptap && $options.maptap(...args)),
    w: common_vendor.o((...args) => $options.oncontroltap && $options.oncontroltap(...args)),
    x: common_vendor.o((...args) => $options.onmarkertap && $options.onmarkertap(...args)),
    y: common_vendor.o((...args) => $options.oncallouttap && $options.oncallouttap(...args)),
    z: common_vendor.o((...args) => $options.onpoitap && $options.onpoitap(...args)),
    A: common_vendor.o((...args) => $options.onupdated && $options.onupdated(...args)),
    B: common_vendor.o((...args) => $options.onregionchange && $options.onregionchange(...args)),
    C: common_vendor.o((...args) => $options.changeScale && $options.changeScale(...args)),
    D: common_vendor.o((...args) => $options.changeRotate && $options.changeRotate(...args)),
    E: common_vendor.o((...args) => $options.changeSkew && $options.changeSkew(...args)),
    F: common_vendor.o((...args) => $options.addMarkers && $options.addMarkers(...args)),
    G: common_vendor.o((...args) => $options.addPolyline && $options.addPolyline(...args)),
    H: common_vendor.o((...args) => $options.addPolygons && $options.addPolygons(...args)),
    I: common_vendor.o((...args) => $options.addCircles && $options.addCircles(...args)),
    J: common_vendor.o((...args) => $options.includePoint && $options.includePoint(...args)),
    K: common_vendor.o((...args) => $options.handleGetCenterLocation && $options.handleGetCenterLocation(...args)),
    L: common_vendor.o((...args) => $options.handleGetRegion && $options.handleGetRegion(...args)),
    M: common_vendor.o((...args) => $options.handleTranslateMarker && $options.handleTranslateMarker(...args))
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/API/map/map.nvue"]]);
wx.createPage(MiniProgramPage);
