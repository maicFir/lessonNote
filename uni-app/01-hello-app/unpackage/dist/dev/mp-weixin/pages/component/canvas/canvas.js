"use strict";
var common_vendor = require("../../../common/vendor.js");
var block0 = {};
let ctx = null, interval = null;
function Ball(x, y, vx, vy, canvasWidth, canvasHeight, ctx2) {
  this.canvasWidth = canvasWidth;
  this.canvasHeight = canvasHeight;
  this.ctx = ctx2;
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.radius = 5;
}
Ball.prototype.draw = function() {
  this.ctx.setFillStyle("#007AFF");
  this.ctx.beginPath();
  this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  this.ctx.closePath();
  this.ctx.fill();
};
Ball.prototype.move = function() {
  this.x += this.vx;
  this.y += this.vy;
  if (this.x < this.radius) {
    this.vx = Math.abs(this.vx);
    return;
  }
  if (this.x > this.canvasWidth - this.radius) {
    this.vx = -Math.abs(this.vx);
  }
  if (this.y < this.radius) {
    this.vy = Math.abs(this.vy);
    return;
  }
  if (this.y > this.canvasWidth - this.radius) {
    this.vy = -Math.abs(this.vy);
  }
};
function getDistance(x, y) {
  return Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5);
}
const _sfc_main = {
  data() {
    return {
      title: "canvas",
      canvasWidth: 0,
      startStatus: false,
      ballList: []
    };
  },
  onReady: function() {
    this.$nextTick(() => {
      common_vendor.index.createSelectorQuery().select(".canvas").boundingClientRect((data) => {
        this.canvasWidth = data.width;
        ctx = common_vendor.index.createCanvasContext("canvas");
        this.drawBall();
      }).exec();
    });
  },
  onUnload: function() {
    clearInterval(interval);
  },
  methods: {
    drawBall: function() {
      let canvasWidth = this.canvasWidth, canvasHeight = this.canvasWidth, speed = 3, ballList = [], layer = 3, ballInlayer = 20;
      for (let i = 0; i < layer; i++) {
        let radius = getDistance(canvasWidth / 2, canvasHeight / 2) / layer * i;
        for (let j = 0; j < ballInlayer; j++) {
          let deg = j * 2 * Math.PI / ballInlayer, sin = Math.sin(deg), cos = Math.cos(deg), x = radius * cos + canvasWidth / 2, y = radius * sin + canvasHeight / 2, vx = speed * cos, vy = speed * sin;
          ballList.push(new Ball(x, y, vx, vy, canvasWidth, canvasHeight, ctx));
        }
      }
      function animate(ballList2) {
        ballList2.forEach(function(item) {
          item.move();
          item.draw();
        });
        ctx.draw();
      }
      interval = setInterval(function() {
        animate(ballList);
      }, 17);
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
    })
  };
}
if (typeof block0 === "function")
  block0(_sfc_main);
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/atom/mc/lessonNote/uni-app/01-hello-app/pages/component/canvas/canvas.vue"]]);
wx.createPage(MiniProgramPage);
