import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
import Globalunit from "../../common/globalunit.js";
import UniShare from 'uni_modules/uni-share/js_sdk/uni-share.js';
const uniShare = new UniShare();
export default {
	components: {
		tkiQrcode
	},
	data() {
		return {
			zhitui: 0,
			kuosan: 0,
			avatar: "",
			lv: 15,
			nickname: '',
			share: false,
			wid: 0,
			val: Globalunit.downloadurl, // 要生成的二维码值
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
			height: 0,
			token:null,
			uid:null,
			sjuser:{"nickname":""},
			sjuid:0,
			shangjiuid:null,
			toBase64Url:""
		}
	},
	onBackPress({from}) {
		console.log(from);
		if(from=='backbutton'){
			this.$nextTick(function(){
				uniShare.hide()
			})
			return uniShare.isShow;
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
		setClipboardText(text) {
			try {
				console.log('复制剪贴板')
				var os = plus.os.name;
				text = text || '';
				if ('iOS' == os) {
					// var UIPasteboard  = plus.ios.importClass('UIPasteboard');  
					// var pasteboard = UIPasteboard.generalPasteboard();  
					// pasteboard.setValueforPasteboardType(text, 'public.utf8-plain-text');
					var pasteboard = plus.ios.invoke('UIPasteboard', 'generalPasteboard');
					plus.ios.invoke(pasteboard, 'setValue:forPasteboardType:', text, 'public.utf8-plain-text');
				} else {
					var main = plus.android.runtimeMainActivity();
					// var Context = plus.android.importClass('android.content.Context');
					// var clip = main.getSystemService(Context.CLIPBOARD_SERVICE);
					var clip = main.getSystemService('clipboard');
					plus.android.invoke(clip, 'setText', text);
				}
				uni.showToast({
					title: "复制成功",
					icon: 'none',
				});
			} catch (e) {
				uni.showToast({
					title: "复制失败",
					icon: 'none',
				});
				console.error('error @setClipboardText!!');
			}
		},
		getClipboardText() {
			try {
				var os = plus.os.name;
				if ('iOS' == os) {
					var pasteboard = plus.ios.invoke('UIPasteboard', 'generalPasteboard');
					return plus.ios.invoke(pasteboard, 'valueForPasteboardType:', 'public.utf8-plain-text')
				} else {
					var main = plus.android.runtimeMainActivity();
					var clip = main.getSystemService('clipboard');
					return plus.android.invoke(clip, 'getText');
				}
			} catch (e) {
				console.error('error @getClipboardText!!');
			}
		},
		close() {
			var self = this
			self.$refs.popup.close()
		},
		shejiao() {
			uni.navigateTo({
				url: '/pages/shejiao/shejiao',
			});
		},
		qrR(res) {
			console.log(res, "生成二维码")
			this.src = res
			this.initcanvas()
		},
		initcanvas() {
			var self = this
			var context = uni.createCanvasContext('myCanvas', this)
			context.drawImage("../../static/share/bg_share_green@2x.png", 0, 0, self.wid * 450, self.wid * 800)
			context.drawImage("../../static/share/text_beijing@2x.png", self.wid * 13, self.wid * 570, self.wid * 426, self.wid *
				216)
			context.setFillStyle('#000000')
			context.setFontSize(12);
			context.fillText("我的邀请码:" + self.inviteCode, self.wid * 30, self.wid * 610)
			context.setFontSize(10);
			context.fillText("Hi,我是"+self.nickname, self.wid * 133, self.wid * 684)
			context.fillText("送你一只可爱猫,快", self.wid * 133, self.wid * 714)
			context.fillText("速当上喵国国王", self.wid * 133, self.wid * 744)
			context.drawImage(self.src, self.wid * 320, self.wid * 650, self.wid * 103, self.wid * 103)
			context.drawImage(self.toBase64Url,self.wid * 29, self.wid * 664, self.wid * 84, self.wid * 84)
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
		closeshare() {
			var self = this
			self.$refs.share.close()
		},
		shareweixin(type) {
			var self = this
			uni.share({
				provider: "weixin",
				scene: type == 1 ? "WXSceneSession" : "WXSceneTimeline",
				type: 2,
				imageUrl: self.base64,
				success: function(res) {
					console.log("success:" + JSON.stringify(res));
				},
				fail: function(err) {
					console.log("fail:" + JSON.stringify(err));
				}
			});
		},
		yaoqing() {
			uniShare.show({
				content: { //公共的分享参数配置  类型（type）、链接（herf）、标题（title）、summary（描述）、imageUrl（缩略图）
					type: 0,
					href: Globalunit.domainName+'/#/?code='+"uniInvitationCode:"+this.inviteCode,
					...Globalunit.share
				},
				menus: [{
						"img": "/static/app-plus/sharemenu/wechatfriend.png",
						"text": "微信好友",
						"share": { //当前项的分享参数配置。可覆盖公共的配置如下：分享到微信小程序，配置了type=5
							"provider": "weixin",
							"scene": "WXSceneSession"
						}
					},
					{
						"img": "/static/app-plus/sharemenu/wechatmoments.png",
						"text": "微信朋友圈",
						"share": {
							"provider": "weixin",
							"scene": "WXSceneTimeline"
						}
					},
					{
						"img": "/static/app-plus/sharemenu/copyurl.png",
						"text": "复制",
						"share": "copyurl"
					},
					{
						"img": "/static/app-plus/sharemenu/more.png",
						"text": "更多",
						"share": "shareSystem"
					}
				],
				cancelText: "取消分享",
			}, e => { //callback
				console.log(e);
			})
			// var self = this
			// self.$refs.share.open()
		},
		getinfo(ok) {
			var self = this
			uni.showLoading({
				title: '处理中...'
			})
			uniCloud.callFunction({
				name: 'minectrl',
				data: {
					action: "mine/getyaoqing",
					data: {
						uid: self.uid ? self.uid : uni.getStorageSync('uid'),
						uniIdToken: self.token ? self.token : uni.getStorageSync('uni_id_token'),
					}
				}
			}).then((res) => {
				uni.hideLoading()
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
				console.log('getyaoqing----------',res)
				self.zhitui = res.result.data.total1
				self.kuosan = res.result.data.total2
				self.avatar = res.result.data.user.avatar
				self.urlBase64(self.avatar)
				self.lv = res.result.data.user.maxlvl
				self.nickname = res.result.data.user.nickname
				// self.val = Globalunit.downloadurl + '?initcode='+res.result.data.user.inviteCode
				self.inviteCode = res.result.data.user.inviteCode
				self.$refs.qrcode._makeCode()
				if(ok){
					// self.$refs.share.open()
				}
				self.sjuid = res.result.data.user.shangji
				if(self.sjuid != 0){
					self.getshangji()
				}
			}).catch((err) => {
				uni.hideLoading()
				uni.showToast({
					title: "获取信息失败，请稍后重试!",
					icon: 'none',
				});
			})
		},
		getshangji(){
			var self = this
			uni.showLoading({
				title: '处理中...'
			})
			uniCloud.callFunction({
				name: 'teamctrl',
				data: {
					action: "team/getshangji",
					data: {
						uid: self.uid?self.uid:uni.getStorageSync('uid'),
						uniIdToken:self.token?self.token:uni.getStorageSync('uni_id_token')
					}
				}
			}).then((res) => {
				uni.hideLoading()
				console.log("getshangji-----------",res)
				if (res.result.code && res.result.code != 0) {
					uni.showToast({
						title: res.result.message,
						icon: 'none',
					});
					return
				}
				self.sjuser = res.result.data.user
			}).catch((err) => {
				console.log("getshangji------err: ",err);
				uni.hideLoading()
				uni.showToast({
					title: "获取信息失败，请稍后重试!",
					icon: 'none',
				});
			})
		},
		bingshangji(){
			var self = this
			if(self.shangjiuid == null){
				uni.showToast({
					title: "请输入上级邀请码!",
					icon: 'none',
				});
				return
			}
			uni.showLoading({
				title: '处理中...'
			})
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/bindshangji",
					data: {
						uid: self.uid?self.uid:uni.getStorageSync('uid'),
						uniIdToken:self.token?self.token:uni.getStorageSync('uni_id_token'),
						inviteCode:self.shangjiuid
					}
				}
			}).then((res) => {
				uni.hideLoading()
				console.log("bindshangji---------",res)
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
					title: "绑定成功!",
					icon: 'none',
				});
				self.sjuid = res.result.data.user.shangji
				self.getshangji()
			}).catch((err) => {
				console.log("bindshangji----err-----",res)
				uni.hideLoading()
				uni.showToast({
					title: "获取信息失败，请稍后重试!",
					icon: 'none',
				});
			})
		}
	},
	onNavigationBarButtonTap(e) {
		var self = this
		self.$refs.popup.open()
	},
	onLoad: function(option) {
		console.log(option);
		var self = this
		if (option.show) {
			self.share = true
		}
		self.token = uni.getStorageSync('uni_id_token');
		self.uid = uni.getStorageSync('uid');
		uni.getSystemInfo({
			success: (sysinfo) => {
				console.log(sysinfo)
				self.wid = sysinfo.windowWidth / 750;
				self.height = sysinfo.windowHeight
			},
			complete: () => {}
		});
	},
	onReady() {
		var self = this
		console.log("onReady--------",self.share);
		if (self.share) {
			self.getinfo(true)
			// self.$refs.qrcode._makeCode()
		}else{
			self.getinfo(false)
		}
	}
}
