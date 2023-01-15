<template>
  <view>
    <button @click="showAd">显示激励视频</button>
  </view>
</template>

<script>
  import AD from "../../common/ad.js"
  export default {
    data() {
      return {
        title: '激励视频广告'
      }
    },
    onLoad() {
      // HBuilderX标准基座真机运行测试激励视频广告位标识（adpid）为：1507000689
      // adpid: 1507000689 仅用于测试，发布时需要改为广告后台（https://uniad.dcloud.net.cn/）申请的 adpid
      // 广告后台申请的广告位(adpid)需要自定义基座/云打包/本地打包后生效
      this._adpid = 1507000689

      // 可选预加载数据
      AD.load(this._adpid)
    },
    methods: {
      showAd() {
        AD.show(this._adpid, (res) => {
          console.log("onclose")

          // 用户点击了【关闭广告】按钮
          if (res && res.isEnded) {
            // 正常播放结束
            console.log("onClose " + res.isEnded);
          } else {
            // 播放中途退出
            console.log("onClose " + res.isEnded);
          }

          // 可选预加载下一条广告数据，减少加载等待时间，调用此 API 不会显示loading，不影响业务
          AD.load(this._adpid)
        }, (err) => {
          // 广告无法显示，输出错误信息
          console.log(err) // {code: code, errMsg: message}
        })
      }
    }
  }
</script>

<style>

</style>
