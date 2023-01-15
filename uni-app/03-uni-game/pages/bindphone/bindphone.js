export default {
	data() {
		return {
			phonenum: null,
			time: 60,
			sendok: false,
			timer: null,
			code: '',
			token: null,
			uid: null,
		}
	},
	methods: {
		getcode() {
			var self = this
			console.log('获取验证码')
			if (self.phonenum == null || self.phonenum == "") {
				uni.showToast({
					title: "请输入手机号",
					icon: 'none',
				});
				return
			}
			var istrue = RegExp(/^1[34578]\d{9}$/).test(self.phonenum)
			if (!istrue) {
				uni.showToast({
					title: "请输入正确的手机号",
					icon: 'none',
				});
				return
			}
			if (self.sendok) {
				uni.showToast({
					title: "请勿重复发送验证码",
					icon: 'none',
				});
			} else {
				uni.showLoading({
					title: '处理中...'
				})
				uniCloud.callFunction({
					name: 'hallctrl',
					data: {
						action: "hall/sendSmsCode",
						data: {
							phone: self.phonenum,
							type: "bind"
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
					self.sendok = true
					if (self.timer != null) {
						clearInterval(self.timer)
					}
					self.timer = setInterval(function() {
						self.time--
						if (self.time <= 0) {
							clearInterval(self.timer)
							self.time = 60
							self.sendok = false
						}
					}, 1000)
					uni.showToast({
						title: "验证码已发送",
						icon: 'none',
					});
					console.log(res)
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: "获取验证码失败，请稍后重试!",
						icon: 'none',
					});
					console.error(err)
				})

			}
		},
		tijiao() {
			var self = this
			console.log('获取验证码')
			if (self.phonenum == null || self.phonenum == "") {
				uni.showToast({
					title: "请输入手机号",
					icon: 'none',
				});
				return
			}
			var istrue = RegExp(/^1[34578]\d{9}$/).test(self.phonenum)
			if (!istrue) {
				uni.showToast({
					title: "请输入正确的手机号",
					icon: 'none',
				});
				return
			}
			if (self.code == null || self.code == "") {
				uni.showToast({
					title: "请输入验证码",
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
					action: "hall/bindMobile",
					data: {
						phone: self.phonenum,
						code: self.code,
						uid: self.uid ? self.uid : uni.getStorageSync('uid'),
						uniIdToken: self.token ? self.token : uni.getStorageSync('uni_id_token')
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
				uni.showToast({
					title: "绑定成功",
					icon: 'none',
				});
				uni.$emit('changeuserinfo', {
					phone:self.phonenum
				});
				console.log(res)
			}).catch((err) => {
				uni.hideLoading()
				uni.showToast({
					title: "绑定失败，请稍后重试!",
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
	},
}
