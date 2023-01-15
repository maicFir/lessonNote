let weixinAuthService;
let auths = null;
let aweixin = null;
export default {
	data() {
		return {
			money: "3.47",
			list: [{
					num: 0.3
				},
				{
					num: 20
				},
				{
					num: 50
				},
				{
					num: 100
				},
				{
					num: 500
				},
				{
					num: 1000
				},
			],
			checkindex: 0,
			token: null,
			uid: null,
			hasWeixinAuth: false,
			providerList: [],
			tixiantype:'',
			isable:false
		}
	},
	methods: {
		getCashoutType(){
			uni.showLoading()
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/gettixiantype",
					data: {}
				}
			}).then((res) => {
				uni.hideLoading()
				console.log(res.result.tixiantype,"res.result.tixiantype")
				this.tixiantype = res.result.tixiantype
			}).catch((err) => {
				uni.hideLoading()
				console.log("err: ",err);
			})
		},
		navigateback() {
			uni.navigateBack()
		},
		gojilu() {
			uni.navigateTo({
				url: '/pages/tixianjilu/tixianjilu',
			});
		},
		check(index) {
			var self = this
			self.checkindex = index
		},
		tixian() {
			var self = this
			this.isable = true
			uni.showLoading({
				title: '处理中...'
			})
			uniCloud.callFunction({
				name: 'minectrl',
				data: {
					action: "mine/withdraw",
					data: {
						amount: self.list[self.checkindex]['num'],
						uid: self.uid ? self.uid : uni.getStorageSync('uid'),
						uniIdToken: self.token ? self.token : uni.getStorageSync('uni_id_token')
					}
				}
			}).then((res) => {
				console.log("tixian---- ",res);
				uni.hideLoading()
				this.isable = false
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
				// uni.showToast({
				// 	title: "认证成功",
				// 	icon: 'none',
				// });
				
				var amount = res.result.data.amount
				var commission = res.result.data.commission
				this.money = res.result.data.user.fen
				uni.navigateTo({
					url: '/pages/tixian/tixian?commission=' + commission + '&amount=' + amount,
				});
			}).catch((err) => {
				console.log("err-- ",err);
				uni.hideLoading()
				this.isable = false
				uni.showToast({
					title: "提现失败，请稍后重试!",
					icon: 'none',
				});
				console.error(err)
			})
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
				var user = res.result.data.user
				self.money = Number(user.fen).toFixed(2)
				if (user.isfirstwithdraw == 0) {
					self.list = [{
							num: 20
						},
						{
							num: 50
						},
						{
							num: 100
						},
						{
							num: 500
						},
						{
							num: 1000
						},
					]
				}
				this.getCashoutType()
				if (user.openid == "" && this.tixiantype == 'weixin') {
					self.$refs.popup.open()
				}
			}).catch((err) => {
				uni.hideLoading()
				uni.showToast({
					title: "获取用户信息失败，请稍后重试!",
					icon: 'none',
				});
			})
		},
		close() {
			var self = this
			self.$refs.popup.close()
			uni.navigateBack()
		},
		bindweixin() {
			var self = this
			for (let i = 0; i < auths.length; i++) {
				if (auths[i].id == 'weixin') {
					aweixin = auths[i];
					break;
				}
			}
			if (!aweixin) {
				uni.showModal({
					showCancel: false,
					content: '当前环境不支持微信登录'
				})
				return;
			}
			if (!aweixin.authResult) {
				aweixin.authorize(function(e) {
					console.log(e)
					uni.showLoading({
						title: '处理中...'
					})
					uniCloud.callFunction({
						name: 'hallctrl',
						data: {
							action: "hall/bindWeixin",
							data: {
								code: e.code,
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
						self.$refs.popup.close()
						uni.showToast({
							title: '绑定成功',
							icon: 'none',
						});
					}).catch((err) => {
						console.log(err)
						uni.hideLoading()
						uni.showToast({
							title: "绑定失败，请稍后重试",
							icon: 'none',
						});
					})
				}, function(e) {
					console.log(e)
					uni.showModal({
						showCancel: false,
						content: '绑定微信失败，请稍后再试'
					})
				});
			} else {
				authUserInfo()
				console.log("已经登录认证!");
			}
		},
		loginByWeixin() {
			var self = this
			console.log('微信登录')
			plus.oauth.getServices(function(services) {
				auths = services;
				self.bindweixin()
			}, function() {
				uni.showModal({
					showCancel: false,
					content: '绑定微信失败，请稍后再试'
				})
			});
		},
	},
	onLoad(option) {
		var self = this
		const num = option.num;
		this.money = Number(num).toFixed(2)
		self.token = uni.getStorageSync('uni_id_token');
		self.uid = uni.getStorageSync('uid');
		self.getuserinfo()
	},
	onShow() {
		var self = this
		self.getCashoutType()
		self.getuserinfo()
	}
}
