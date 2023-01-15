
import updateVersion from '@/uni_modules/uni-upgrade-center-app/utils/check-update'
import callCheckVersion from '@/uni_modules/uni-upgrade-center-app/utils/call-check-version'
import Globalunit from "../../common/globalunit.js";
export default {
	data() {
		return {
			juzheng: "../../../static/mine/juzheng.png",
			height: "0",
			jindu: 10,
			money: "￥3.47",
			yaoqingma: "111111",
			token: null,
			uid: null,
			user: {
				nickname: "",
				id: "",
				avatar: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/536fbc2c-31f0-41e1-9d51-3c4fb82f27c0.png",
				fen: 0,
				inviteCode: ""
			},
			version:"1.0.0",
			"adpid":""
		}
	},
	methods: {
		gotoMarket(){
			// #ifdef APP-PLUS
			if (uni.getSystemInfoSync().platform == "ios") {
				// 这里填写appstore应用id
				let appstoreid = Globalunit.iosMarketId; // 'id1417078253';
				plus.runtime.openURL("itms-apps://" + 'itunes.apple.com/cn/app/wechat/' + appstoreid + '?mt=8');
			}
			if (uni.getSystemInfoSync().platform == "android") {
				var Uri = plus.android.importClass("android.net.Uri");
				// var uri = Uri.parse("market://details?id=" + Globalunit.androidMarketId);
				var uri = Uri.parse(Globalunit.androidMarketUrl);
				var Intent = plus.android.importClass('android.content.Intent');
				var intent = new Intent(Intent.ACTION_VIEW, uri);
				var main = plus.android.runtimeMainActivity();
				main.startActivity(intent);
			}
			// #endif
		},
		onclose(e) {
			console.log("onclose: " + e.detail);
		},
		onerror(e) {
			console.log("onerror: " + e.detail.errCode + " message:: " + e.detail.errMsg);
		},
		async checkVersion(){
			let res = await callCheckVersion()
			console.log("res: ",res);
			if (res.result.code > 0) {
				updateVersion()
			} else {
				uni.showToast({
					title: '当前已经是最新版本！',
					icon: 'none'
				});
			}
		},
		goxiaoxi() {
			uni.navigateTo({
				url: '/pages/xiaoxi/xiaoxi',
			});
		},
		goset() {
			uni.navigateTo({
				url: '/pages/set/set?userinfo=' + encodeURIComponent(JSON.stringify(this.user)),
			});
		},
		toFeedback(){
			uni.navigateTo({
				url: '/uni_modules/uni-feedback/pages/opendb-feedback/list',
				complete(e) {
					console.log("e: ",e);
				}
			});
		},
		goqudao() {
			uni.navigateTo({
				url: '/pages/qudao/qudao',
			});
		},
		goqianbao() {
			uni.navigateTo({
				url: '/pages/qianbao/qianbao?num=' + this.user.fen,
			});
		},
		goyaoqingma() {
			uni.navigateTo({
				url: '/pages/yaoqingma/yaoqingma',
			});
		},
		gobangzhu() {
			uni.navigateTo({
				url: '/pages/bangzhu/bangzhu',
			});
		},
		goshiming() {
			uni.navigateTo({
				url: '/pages/shiming/shiming',
			});
			// if(this.user.isauthentication == 0){
			// 	uni.navigateTo({
			// 		url: '/pages/shiming/shiming‘
			// 	});
			// }else{
			// 	uni.showToast({
			// 		title: "已完成实名认证!",
			// 		icon: 'none',
			// 	});
			// }
		},
		gofenhongbao() {
			uni.navigateTo({
				url: '/pages/fenhongmao/fenhongmao?jindu=' + this.jindu,
			});
		},
		getuserinfo() {
			var self = this
			uni.showLoading()
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
				console.log("getuserinfo-------",res)
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
                    if(res.result.errcode == 10005){
						uni.removeStorage({
						    key: 'uni_id_token',
						    success: function (res) {
						        
						    }
						});
						uni.removeStorage({
						    key: 'uid',
						    success: function (res) {
						        uni.navigateTo({
						            url: '/pages/login/login',
						        });
						    }
						});
                    }
					return
				}
				self.user = res.result.data.user
				var bide = Number(res.result.data.user.bide)
				if(bide>100){
					bide = 100
				}
				self.jindu = bide
			}).catch((err) => {
				uni.hideLoading()
				// uni.showToast({
				// 	title: "获取用户信息失败，请稍后重试!",
				// 	icon: 'none',
				// });
			})
		}
	},
	onLoad: function(option) {
		var self = this
		self.adpid= Globalunit.bannerAdpid
		console.log("self.adpid------------: ",self.adpid);
		// console.log("plus.runtime: ",plus.runtime.version);
		self.version = plus.runtime.version
	},
	onReady() {
		var self = this
		uni.getStorage({
		    key: 'uni_id_token',
		    success: function (res) {
		        // console.log(res.data);
				self.token = res.data
		    }
		});
		uni.getStorage({
		    key: 'uid',
		    success: function (res) {
		        // console.log(res.data);
				self.uid = res.data
				self.getuserinfo()
		    }
		});
	},
	onUnload() {
		// 移除监听事件  
		uni.$off('changeuserinfo');
	},
	onShow(){
		var self = this
		uni.getStorage({
		    key: 'uni_id_token',
		    success: function (res) {
		        // console.log(res.data);
				self.token = res.data
		    }
		});
		uni.getStorage({
		    key: 'uid',
		    success: function (res) {
		        // console.log(res.data);
				self.uid = res.data
				self.getuserinfo()
		    }
		});
	}
}
