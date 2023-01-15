export default {
	data() {
		return {
			name:null,
			idcard:null,
			token:null,
			uid:null,
			isauthentication:0
		}
	},
	methods: {
		tijiao1(){
			uni.showToast({
				title: "已完成实名认证",
				icon: 'none',
			});
		},
		tijiao(){
			var self = this
			console.log('获取验证码')
			if (self.name == null || self.name == "") {
				uni.showToast({
					title: "请输入真实姓名",
					icon: 'none',
				});
				return
			}
			var id=/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
			if (self.idcard == null || self.idcard == "") {
				uni.showToast({
					title: "请输入身份证号",
					icon: 'none',
				});
				return
			}
			if(!id.test(self.idcard)){
				uni.showToast({
					title: "请输入正确的身份证号",
					icon: 'none',
				});
				return
			}
			uni.showLoading({
				title: '处理中...'
			})
			uniCloud.callFunction({
				name: 'minectrl',
				data: {
					action: "mine/authentication",
					data: {
						realname: self.name,
						idcard:self.idcard,
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
				uni.showToast({
					title: "认证成功",
					icon: 'none',
				});
				console.log(res)
				uni.$emit('changeuserinfo', {});
			}).catch((err) => {
				uni.hideLoading()
				uni.showToast({
					title: "认证失败，请稍后重试!",
					icon: 'none',
				});
				console.error(err)
			})
		},
		getuserinfo() {
			var self = this
			uni.showLoading({
				title: '处理中...'
			})
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/getuserinfo",
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
				if (res.result.errcode && res.result.errcode != 0) {
					uni.showToast({
						title: res.result.errmsg,
						icon: 'none',
					});
					return
				}
				self.idcard = res.result.data.user.idcard
				self.name = res.result.data.user.realname
				self.isauthentication = res.result.data.user.isauthentication
			}).catch((err) => {
				uni.hideLoading()
				uni.showToast({
					title: "获取用户信息失败，请稍后重试!",
					icon: 'none',
				});
			})
		}
	},
	onLoad: function(option) {
		var self = this
		self.token = uni.getStorageSync('uni_id_token');
		self.uid = uni.getStorageSync('uid');
		self.getuserinfo()
	},
}