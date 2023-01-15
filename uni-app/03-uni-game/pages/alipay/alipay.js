export default {
	data() {
		return {
			zhifubao: '',
			token: null,
			uid: null,
		}
	},
	methods: {
		tijiao() {
			var self = this
			console.log('获取验证码')
			if (self.zhifubao == null || self.zhifubao == "") {
				uni.showToast({
					title: "请输入支付宝号",
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
					action: "hall/setuserinfo",
					data: {
						zhifubao: self.zhifubao,
						uid:self.uid,
						uniIdToken:self.token,
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
				uni.$emit('changeuserinfo', {
					zhifubao:self.zhifubao
				});
				uni.showToast({
					title: "设置成功!",
					icon: 'none',
				});
			}).catch((err) => {
				uni.hideLoading()
				uni.showToast({
					title: "设置失败!",
					icon: 'none',
				});
				console.error(err)
			})
		}
	},
	onLoad: function(option) {
		var self = this
		self.token = uni.getStorageSync('uni_id_token');
		self.uid = uni.getStorageSync('uid');
		console.log(option)
		self.zhifubao = option.zhifubao
	},
}
