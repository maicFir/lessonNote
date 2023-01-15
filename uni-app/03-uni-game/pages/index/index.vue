<template>
	<view>
		<web-view v-if="platform=='android'" :src="'/hybrid/html/index.html?url='+url+'&uid='+uid" class="webview"
			@message="message" ref="iframe"></web-view>
		<web-view v-if="platform=='ios'"
			:src="'http://localhost:13131/_www/hybrid/html/index.html?url='+url+'&uid='+uid" class="webview"
			@message="message"></web-view>
		<view class="qrimg" style="position: fixed;z-index: -100;left: 0;top: 0;">
			<canvas canvas-id="myCanvas" id='myCanvas' style="width: 450rpx;height: 800rpx;"></canvas>
			<tki-qrcode cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit" :background="background"
				:foreground="foreground" :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval"
				:loadMake="loadMake" :usingComponents="true" @result="qrR" :showLoading="false" />
		</view>
	</view>
</template>

<script>
	import Globalunit from "../../common/globalunit.js";
	export default {
		data() {
			return {
				currentTabIndex: 0,
				tuandui: null,
				mine: null,
				token: null,
				uid: null,
				timer: null,
				avatar: "",
				nickname: '',
				share: false,
				wid: 0,
				val: Globalunit.domainName, // 要生成的二维码值
				inviteCode: '',
				size: 200, // 二维码大小
				unit: 'upx', // 单位
				background: '#000000', // 背景色
				foreground: '#ffffff', // 前景色
				pdground: '#ffffff', // 角标色
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				src: '', // 二维码生成后的图片地址或base64,
				base64: '',
				url: '',
				toBase64Url: "",
				platform: ''
			}
		},
		methods: {
			urlBase64(url) {
				var self = this
				uni.request({
					url: url,
					method: 'GET',
					responseType: 'arraybuffer',
					success: async res => {
						let base64 = wx.arrayBufferToBase64(res.data); //把arraybuffer转成base64
						self.toBase64Url = 'data:image/jpeg;base64,' + base64; //不加上这串字符，在页面无法显示
					}
				});
			},
			geturl() {
				var self = this
				uniCloud.callFunction({
					name: 'hallctrl',
					data: {
						action: "hall/geturl",
						data: {
							uid: self.uid,
							uniIdToken: self.token
						}
					}
				}).then((res) => {
					console.log("geturl----------",res);
					self.url = res.result.url
					this.startInterstitialTimer();
				}).catch((err) => {
					console.log("err: ",err);
				})
			},

			message(event) {
				var self = this
				console.log(event.detail);
				console.log("===================" + event.detail.data[0].type);
				if (event.detail.data[0].type == 'wanfa') {
					uni.navigateTo({
						url: '/pages/play/play',
					});
				} else if (event.detail.data[0].type == 'shouyi') {
					uni.navigateTo({
						url: '/pages/fenhongshouyi/fenhongshouyi',
					});
				} else if (event.detail.data[0].type == 'qiandao') {
					console.log(event.detail.data)
					self.shareweixin(parseInt(event.detail.data[0].share))
				} else if (event.detail.data[0].type == 'share') {
					self.shareweixin(parseInt(event.detail.data[0].share), true)
				} 
			},

			qrR(res) {
				this.src = res
				this.initcanvas()
			},
			initcanvas() {
				var self = this
				var context = uni.createCanvasContext('myCanvas', this)
				context.drawImage("../../static/share/bg_share_green@2x.png", 0, 0, self.wid * 450, self.wid * 800)
				context.drawImage("../../static/share/text_beijing@2x.png", self.wid * 13, self.wid * 570, self.wid * 426,
					self.wid *
					216)
				context.setFillStyle('#000000')
				context.setFontSize(12);
				context.fillText("我的邀请码:" + self.inviteCode, self.wid * 30, self.wid * 610)
				context.setFontSize(10);
				context.fillText("Hi,我是" + self.nickname, self.wid * 133, self.wid * 684)
				context.fillText("送你一只可爱猫,快", self.wid * 133, self.wid * 714)
				context.fillText("速当上喵国国王", self.wid * 133, self.wid * 744)
				context.drawImage(self.src, self.wid * 320, self.wid * 650, self.wid * 103, self.wid * 103)
				context.drawImage(self.toBase64Url, self.wid * 29, self.wid * 664, self.wid * 84, self.wid * 84)
				context.stroke()
				context.draw()
				setTimeout(() => { //不加延迟的话，base64有时候会赋予undefined
					uni.canvasToTempFilePath({
						canvasId: 'myCanvas',
						success: (res) => {
							self.base64 = res.tempFilePath
							console.log(self.base64, "tupian")
						}
					})
					uni.hideLoading();
				}, 1000)
			},
			getuserinfo() {
				var self = this
				uniCloud.callFunction({
					name: 'hallctrl',
					data: {
						action: "hall/getuserinfo",
						data: {
							uid: self.uid ? self.uid : uni.getStorageSync('uid'),
							uniIdToken: self.token ? self.token : uni.getStorageSync('uni_id_token')
						}
					}
				}).then((res) => {
					uni.hideLoading()
					console.log("getuserinfo---------",res)
					if (res.result.code && res.result.code != 0) {
						uni.showToast({
							title: res.result.message,
							icon: 'none',
						});
						return
					}
					if (res.result.errcode && res.result.errcode != 0) {
						uni.showToast({
							title: res.result.errmsg,
							icon: 'none',
						});
						if (res.result.errcode == 10005) {
							uni.removeStorage({
								key: 'uni_id_token',
								success: function(res) {

								}
							});
							uni.removeStorage({
								key: 'uid',
								success: function(res) {
									uni.navigateTo({
										url: '/pages/login/login',
									});
								}
							});
						}
						return
					}
					console.log("获取下载地址",Globalunit.domainName)
					console.log("inviteCode: ",res.result.data.user.inviteCode);
					self.nickname = res.result.data.user.nickname
					// self.val = Globalunit.downloadurl + '?initcode=' + res.result.data.user.inviteCode
					self.val = Globalunit.domainName + '/#/?code=' + "uniInvitationCode:" + res.result.data.user.inviteCode
					self.inviteCode = res.result.data.user.inviteCode
					self.avatar = res.result.data.user.avatar
					self.urlBase64(self.avatar)
					self.$refs.qrcode._makeCode()
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: "获取用户信息失败，请稍后重试!",
						icon: 'none',
					});
				})
			},
			shareweixin(type, ok) {
				var self = this
				uni.share({
					provider: "weixin",
					scene: type == 1 ? "WXSceneSession" : "WXSceneTimeline",
					type: 2,
					imageUrl: self.base64,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
						if (!ok) {
							var currentWebview = self.$scope.$getAppWebview();
							var wv = currentWebview.children()[0];
							wv.evalJS("closeqiandao()")
							uniCloud.callFunction({
								name: 'hallctrl',
								data: {
									action: "hall/signin",
									data: {
										uid: self.uid ? self.uid : uni.getStorageSync('uid'),
										uniIdToken: self.token ? self.token : uni.getStorageSync(
											'uni_id_token')
									}
								}
							}).then((res) => {
								uni.hideLoading()
								console.log(res)
								if (res.result.code && res.result.code != 0) {
									uni.showToast({
										title: res.result.message,
										icon: 'none',
									});
									return
								}
								if (res.result.errcode && res.result.errcode != 0) {
									uni.showToast({
										title: res.result.errmsg,
										icon: 'none',
									});
									return
								}
								uni.showToast({
									title: "签到成功!",
									icon: 'none',
								});
							}).catch((err) => {
								uni.hideLoading()
								uni.showToast({
									title: "签到失败，请稍后重试!",
									icon: 'none',
								});
							})
						}
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			startInterstitialTimer() {
				this.stopInterstitialTimer();
				this._interstitialTimer = setInterval(() => {
					this.showInterstitialAd();
				}, 1000 * 60 * 2);
			},
			stopInterstitialTimer() {
				if (this._interstitialTimer) {
					clearInterval(this._interstitialTimer);
				}
			},
			showInterstitialAd() {
				console.log("Globalunit.interstitialAdpid-------------------: ",Globalunit.interstitialAdpid);
				if (!this._interstitialAd) {
					this._interstitialAd = uni.createInterstitialAd({
						adpid: Globalunit.interstitialAdpid // HBuilder基座的测试广告位
					});
				}
				if (this._adLoading == true) {
					return
				}
				this._adLoading = true;
				this._interstitialAd.show().then(() => {
					this._adLoading = false;
				}).catch((err) => {
					console.log(err.message);
					this.stopInterstitialTimer();
				});
			}
		},
		onLoad(option) {
			this._interstitialTimer = null;
			this._interstitialAd = null;
			this._adLoading = false;
			var self = this
			if (option.index) {
				this.currentTabIndex = parseInt(option.index)
			}
			self.token = uni.getStorageSync('uni_id_token');
			self.uid = uni.getStorageSync('uid');
			uni.getStorage({
				key: 'uni_id_token',
				success: function(res) {
					console.log(res.data);
					self.token = res.data
				}
			});
			uni.getStorage({
				key: 'uid',
				success: function(res) {
					console.log(res.data);
					self.uid = res.data
					self.geturl();
					self.getuserinfo()
					var height = 0; //定义动态的高度变量，如高度为定值，可以直接写
					uni.getSystemInfo({
						//成功获取的回调函数，返回值为系统信息
						success: (sysinfo) => {
							self.wid = sysinfo.windowWidth / 750;
							height = sysinfo.windowHeight; //自行修改，自己需要的高度 此处如底部有其他内容，可以直接---(-50)这种
							self.platform = sysinfo.platform.toLowerCase();
						},
						complete: () => {}
					});

					// var currentWebview = this.$scope.$getAppWebview(); //获取当前web-view
					// setTimeout(function() {
					// 	var length = currentWebview.children().length
					// 	var wv = currentWebview.children()[length - 1];
					// 	wv.setStyle({ //设置web-view距离顶部的距离以及自己的高度，单位为px
					// 		top: 0, //此处是距离顶部的高度，应该是你页面的头部
					// 		height: height, //webview的高度
					// 		scalable: true, //webview的页面是否可以缩放，双指放大缩小
					// 	})
					// }, 200); //如页面初始化调用需要写延迟
				}
			});
		},
		onShow() {
			if (this.url) {
				this.startInterstitialTimer();
			}
		},
		onHide() {
			this.stopInterstitialTimer();
		},
		onUnload() {
			// 移除监听事件
		}
	}
</script>

<style>
	.home {
		position: fixed;
		width: 100%;
		height: 50%;
		box-sizing: border-box;
		left: 0;
		top: 0;
		padding-bottom: 55px;
		z-index: -1;
	}
</style>
