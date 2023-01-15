export default {
	data() {
		return {
			weixin:"",
			qq:''
		}
	},
	methods: {
		getinfo(){
			var self = this
			uni.showLoading({
				title: '处理中...'
			})
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
				self.weixin = res.result.data.user.weixinid
				self.qq = res.result.data.user.qqid
			}).catch((err) => {
				uni.hideLoading()
				uni.showToast({
					title: "获取用户信息失败，请稍后重试!",
					icon: 'none',
				});
			})
		},
		yaoqing(){
			var self = this
			if(self.weixin == ""){
				uni.showToast({
					title: "请输入微信号!",
					icon: 'none',
				});
				return
			}
			if(self.qq == ""){
				uni.showToast({
					title: "请输入QQ号!",
					icon: 'none',
				});
				return
			}
			
			uni.showLoading({
				title: '处理中...'
			})
			uniCloud.callFunction({
				name: 'teamctrl',
				data: {
					action: "team/shejiao",
					data: {
						uid: self.uid?self.uid:uni.getStorageSync('uid'),
						uniIdToken:self.token?self.token:uni.getStorageSync('uni_id_token'),
						weixin:self.weixin,
						qq:self.qq
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
					title: "设置成功！",
					icon: 'none',
				});
				uni.navigateBack()
			}).catch((err) => {
				uni.hideLoading()
				uni.showToast({
					title: "获取信息失败，请稍后重试!",
					icon: 'none',
				});
			})
		}
	},
	onLoad:function (option){
		var self = this
		self.token = uni.getStorageSync('uni_id_token');
		self.uid = uni.getStorageSync('uid');
		self.getinfo()
	},
}