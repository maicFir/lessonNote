export default {
	data() {
		return {
			nickname: '',
			token: null,
			uid: null,
			phone:''
		}
	},
	methods: {
		tijiao() {
			var self = this
			console.log('获取验证码')
			if (self.nickname == null || self.nickname == "") {
				uni.showToast({
					title: "请输入昵称",
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
						nickname: self.nickname,
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
					phone:self.phone,
					nickname:self.nickname
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
		self.phone = option.phone
		self.nickname = option.nickname
	},
}
