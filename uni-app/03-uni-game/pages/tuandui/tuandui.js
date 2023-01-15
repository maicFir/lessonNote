import Globalunit from "../../common/globalunit.js";
export default {
	data() {
		return {
			height:"0",
			uid:null,
			token:null,
			"friendcount": 0,
			"firendfen": 0,
			"todaytotal": 0,
			"todayzhitui": 0,
			"todaykuosan": 0,
			"shangjifriendcount": 0,
			"shangjiprofit": 0,
			"shangjiavater": "",
			"beilv": 0,
			"mubiao": 20,
			"actiovecount": 0,
			"stage": {
				"name": "第一阶段",
				"mubiao": 20,
				"beilv": 1
			},
			bili:0,
			sjuser:{
				"nickname":"",
				"weixinid":"",
				"qqid":""
			},
			shangjiid:0,
			stages:[],
			"adpid":""
		}
	},
	methods: {
		setClipboardText(sjuserweixinid,sjuserqqid){
			console.log("sjuserinfo:---11 ",sjuserweixinid,sjuserqqid);
			uni.setClipboardData({
				data: "微信号：" + sjuserweixinid + ",  " + "QQ号：" + sjuserqqid,
				success: (e)=> {
					// console.log('setClipboardText----',e);
				}
			});
		},
		onclose(e) {
			console.log("onclose: " + e.detail);
		},
		onerror(e) {
			console.log("onerror: " + e.detail.errCode + " message:: " + e.detail.errMsg);
		},
		yaoqingren(){
			var self = this
			self.$refs.popup.open()
		},
		close(){
			var self = this
			self.$refs.popup.close()
		},
		shejiao(){
			uni.navigateTo({
				url: '/pages/shejiao/shejiao',
			});
		},
		jieduanshouyi(){
			var self = this
			self.$refs.jieduanshouyi.open()
		},
		closejieduanshouyi(){
			var self = this
			self.$refs.jieduanshouyi.close()
		},
		shouyishuoming(){
			var self = this
			self.$refs.shouyishuoming.open()
		},
		closeshouyishuoming(){
			var self = this
			self.$refs.shouyishuoming.close()
		},
		yaoqingjilu(){
			uni.navigateTo({
				url: '/pages/yaoqingjilu/yaoqingjilu',
			});
		},
		shouyimingxi(){
			uni.navigateTo({
				url: '/pages/shourumingxi/shourumingxi',
			});
		},
		play(){
			uni.navigateTo({
				url: '/pages/wanfa/wanfa?stages='+ encodeURIComponent(JSON.stringify(this.stages))
			});
		},
		goyaoqingma(){
			uni.navigateTo({
				url: '/pages/yaoqingma/yaoqingma?show=1',
			});
		},
		loadteam(){
			var self = this
			uniCloud.callFunction({
				name: 'teamctrl',
				data: {
					action: "team/loadteam",
					data: {
						uid: self.uid?self.uid:uni.getStorageSync('uid'),
						uniIdToken:self.token?self.token:uni.getStorageSync('uni_id_token')
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
				// console.log(res.result.data)
				self.friendcount = res.result.data.friendcount
				self.firendfen = (Math.floor(Number(res.result.data.firendfen)*100)/100).toFixed(2)
				self.todaytotal = (Math.floor(Number(res.result.data.todaytotal)*100)/100).toFixed(2)
				self.todayzhitui = (Math.floor(Number(res.result.data.todayzhitui)*100)/100).toFixed(2)
				self.todaykuosan = (Math.floor(Number(res.result.data.todaykuosan)*100)/100).toFixed(2)
				self.shangjifriendcount = res.result.data.shangjifriendcount
				self.shangjiprofit = (Math.floor(Number(res.result.data.shangjiprofit)*100)/100).toFixed(2)
				self.shangjiavater = res.result.data.shangjiavater
				self.beilv = (Math.floor(Number(res.result.data.beilv)*100)/100).toFixed(1)
				self.mubiao = (Math.floor(Number(res.result.data.mubiao)*100)/100).toFixed(2)
				self.actiovecount = res.result.data.actiovecount
				self.stage = res.result.data.stage
				self.stages = res.result.data.stages
				var bili = Math.floor(self.firendfen/self.mubiao*100)/100
				self.bili = bili
				self.shangjiid = res.result.data.shangjiid
				if(self.shangjiid != 0){
					self.getshangji()
				}
				uni.stopPullDownRefresh()
			}).catch((err) => {
				uni.hideLoading()
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
				console.log(res)
				if (res.result.code && res.result.code != 0) {
					uni.showToast({
						title: res.result.message,
						icon: 'none',
					});
					return
				}
				self.sjuser = res.result.data.user
			}).catch((err) => {
				uni.hideLoading()
			})
		}
	},
	onLoad:function (option){
		var self = this
		self.token = uni.getStorageSync('uni_id_token');
		self.uid = uni.getStorageSync('uid');
		console.log("Globalunit.bannerAdpid------------: ",Globalunit.bannerAdpid);
		self.adpid = Globalunit.bannerAdpid
		uni.getSystemInfo({
		//成功获取的回调函数，返回值为系统信息
			success: (sysinfo) => {
				if(uni.getSystemInfoSync().platform == 'ios'){
					self.height = (sysinfo.windowHeight-140)*2+"rpx";
				}else{
					self.height = (sysinfo.windowHeight-60)*2+"px";//自行修改，自己需要的高度 此处如底部有其他内容，可以直接---(-50)这种
				}
			},
			complete: () => {
			}
		});
	},
	onReady() {
		var self = this
		self.loadteam()
	},
	onPullDownRefresh() {
		var self = this
		self.loadteam()
	},
}