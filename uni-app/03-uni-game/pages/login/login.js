let weixinAuthService;
export default {
	data() {
		return {
			ischeck: false,
			checkimg: require("../../static/login/check.png"),
			uncheckimg: require("../../static/login/uncheck.png"),
			phonenum: null,
			code: null,
			showphonelogin: false,
			time: 60,
			sendok: false,
			timer: null,
			hasWeixinAuth: false,
			providerList: [],
			platform: "",
			univerifyStyle: {
				"icon": {
					"path": "static/icon.png" // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo
				},
				"authButton": {
					"normalColor": "#C24E09", // 授权按钮正常状态背景颜色 默认值：#3479f5
					"highlightColor": "#bc4a08", // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）
					"disabledColor": "#d05209", // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）
					"textColor": "#ffffff", // 授权按钮文字颜色 默认值：#ffffff
					"title": "本机号码一键登录" // 授权按钮文案 默认值：“本机号码一键登录”
				},
				"privacyTerms": {
					"defaultCheckBoxState": false, // 条款勾选框初始状态
					"checkBoxSize":18
				}
			},
			inviteCode: false
		}
	},
	async onLoad() {
		// #ifdef APP-PLUS
		uni.getProvider({
			service: 'oauth',
			success: res => {
				console.log(res.provider) // ['qq', 'univerify']
				this.providerList = res.provider
			}
		});
		plus.oauth.getServices((services) => {
			weixinAuthService = services.find((service) => {
				return service.id === 'weixin'
			})
			if (weixinAuthService) {
				this.hasWeixinAuth = true
			}
		});
		// #endif
		var token = uni.getStorageSync('uni_id_token');
		var uid = uni.getStorageSync('uid');
		if (token) {
			uni.reLaunch({
				url: '/pages/index/index?token=' + token + "&uid=" + uid,
			});
		} else {
			this.inviteCode = await new Promise((callBack) => {
				uni.getClipboardData({
					success: function(res) {
						if (res.data.slice(0, 18) == 'uniInvitationCode:') {
							let uniInvitationCode = res.data.slice(18, 38)
							console.log('当前用户是其他用户推荐下载的,推荐者的code是：' + uniInvitationCode);
							// uni.showModal({
							// 	content: '当前用户是其他用户推荐下载的,推荐者的code是：'+uniInvitationCode,
							// 	showCancel: false
							// });
							callBack(uniInvitationCode)
							//当前用户是其他用户推荐下载的。这里登记他的推荐者id 为当前用户的myInviteCode。判断如果是注册
						} else {
							callBack(false)
						}
					},
					fail() {
						callBack(false)
					}
				});
			})
		}
	},
	onReady() {
		uni.getSystemInfo({
			success: (systemInfo) => {
				this.platform = systemInfo.platform.toLowerCase();
			}
		})
	},
	methods: {
		bindshangji(callback) {
			var self = this
			// uni.showLoading({
			// 	title: '开始绑定邀请关系',
			// 	mask: false
			// });
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/bindshangji",
					data: {
						uid: self.uid ? self.uid : uni.getStorageSync('uid'),
						uniIdToken: self.token ? self.token : uni.getStorageSync('uni_id_token'),
						inviteCode: this.inviteCode
					}
				},
				success: res => {
					console.log('bindshangji', res);
				},
				complete(res) {
					// uni.hideLoading()
					console.log('complete', res);
					uni.setClipboardData({
						data: ""
					})
					uni.hideToast()
					callback()
				}
			})
		},
		async loginByApple() {
			console.log('苹果登录')
			if (!this.ischeck) {
				uni.showToast({
					title: "请先同意用户协议与隐私政策",
					icon: 'none',
				});
				return
			}

			const [loginErr, loginData] = await uni.login({
				provider: 'apple'
			});
			if (loginErr) {
				uni.showModal({
					showCancel: false,
					content: '苹果登录失败，请稍后再试' + loginErr
				})
				return;
			}
			// 获取用户信息
			const [getUserInfoErr, result] = await uni.getUserInfo({
				provider: 'apple'
			});
			console.log("getUserInfo result: ", result);

			if (getUserInfoErr) {
				let content = getUserInfoErr.errMsg;
				if (~content.indexOf('uni.login')) {
					content = '请先完成登录操作';
				}
				uni.showModal({
					title: '获取用户信息失败',
					content: '错误原因' + content,
					showCancel: false
				});
				return;
			}
			uni.showLoading({
				title: '处理中...'
			})
			// uni-id 苹果登录
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/loginByApple",
					data: result.userInfo
				}
			}).then((res) => {
				uni.hideLoading()
				console.log('res----------', res)
				if (res.result.errcode && res.result.errcode != 0) {
					uni.showToast({
						title: res.result.errmsg,
						icon: 'none',
					});
					return
				}
				try {
					uni.setStorageSync('uni_id_token', res.result.data.token);
					plus.storage.setItem('jwt_token', res.result.data.token);
				} catch (e) {
					// error
				}
				try {
					uni.setStorageSync('uid', res.result.data.user.id);
					plus.storage.setItem('uid', res.result.data.user.id);
				} catch (e) {
					// error
				}
				console.log("token", uni.getStorageSync('uni_id_token'))
				console.log("uid", uni.getStorageSync('uid'))
				this.bindshangji(() => {
					uni.reLaunch({
						url: '/pages/index/index?token=' + res.result.data.token + "&uid=" +
							res.result.data.user.id,
					});
				})
			}).catch((err) => {
				console.log("err:苹果登录失败 ", err);
				uni.hideLoading()
				uni.showToast({
					title: "苹果登录失败，请稍后重试!" + err,
					icon: 'none',
				});
			})

		},
		loginByUniverify() {
			if (!this.ischeck) {
				uni.showToast({
					title: "请先同意用户协议与隐私政策",
					icon: 'none',
				});
				return
			}
			uni.login({
				provider: 'univerify',
				univerifyStyle: this.univerifyStyle,
				success: (res) => { // 登录成功// {openid:'登录授权唯一标识',access_token:'接口返回的 token'}
					console.log("res----univerifyStyle: ", res);
					uniCloud.callFunction({
						name: 'hallctrl',
						data: {
							action: "hall/loginByUniverify",
							data: res.authResult
						}
					}).then((res) => {
						console.log(res, '一键登录');

						uni.closeAuthView()
						if (res.result.errcode != 0) {
							uni.showToast({
								title: res.result.errmsg,
								icon: 'none',
								duration:10000
							});
							return
						}
						// uni.hideLoading()
						try {
							uni.setStorageSync('uni_id_token', res.result.data.token);
							plus.storage.setItem('jwt_token', res.result.data.token);
						} catch (e) {
							// error
						}
						try {
							uni.setStorageSync('uid', res.result.data.user.id);
							plus.storage.setItem('uid', res.result.data.user.id);
						} catch (e) {
							// error
						}
						console.log("token", uni.getStorageSync('uni_id_token'))
						console.log("uid", uni.getStorageSync('uid'))
						this.bindshangji(() => {
							uni.reLaunch({
								url: '/pages/index/index?token=' + res.result.data
									.token + "&uid=" + res.result.data.user.id,
							});
						})
					}).catch((err) => {
						console.error(err, '登录失败');
						uni.hideLoading()
						uni.closeAuthView()
						uni.showToast({
							title: "登录失败，请稍后重试",
							icon: 'none',
						});
					})
				},
				fail(res) { // 登录失败
					console.log("fail-----", res)
					if (res.errCode == '30005') {
						uni.showModal({
							content: '请开启手机数据流量',
							showCancel: false
						});
					}
					uni.closeAuthView()
				}
			})
		},
		getWeixinCode() {
			return new Promise((resolve, reject) => {
				// #ifdef MP-WEIXIN
				uni.login({
					provider: 'weixin',
					success(res) {
						resolve(res.code)
					},
					fail(err) {
						reject(new Error('微信登录失败'))
					}
				})
				// #endif
				// #ifdef APP-PLUS
				weixinAuthService.authorize(function(res) {
					resolve(res.code)
				}, function(err) {
					console.log(err)
					reject(new Error('微信登录失败'))
				});
				// weixinAuthService.authorize(function(res) {
				// 	resolve(res.code)
				// }, function(err) {
				// 	console.log(err)
				// 	reject(new Error('微信登录失败'))
				// },{
				// 	"scope":"scope_userinfo"
				// });
				// #endif
			})
		},
		loginByWeixin() {
			var self = this
			console.log('微信登录')
			if (!self.ischeck) {
				uni.showToast({
					title: "请先同意用户协议与隐私政策",
					icon: 'none',
				});
				return
			}
			uni.showLoading({
				title: '处理中...'
			})
			this.getWeixinCode().then((code) => {
				return uniCloud.callFunction({
					name: 'hallctrl',
					data: {
						action: "hall/loginByWeixin",
						data: {
							code: code
						}
					}
				})
			}).then((res) => {
				console.log('res------------', res)

				if (res.result.errcode && res.result.errcode!= 0) {
					uni.showToast({
						title: res.result.errmsg,
						icon: 'none',
					});
					return
				}
				uni.hideLoading()
				try {
					uni.setStorageSync('uni_id_token', res.result.data.token);
					plus.storage.setItem('jwt_token', res.result.data.token);
				} catch (e) {
					// error
				}
				try {
					uni.setStorageSync('uid', res.result.data.user.id);
					plus.storage.setItem('uid', res.result.data.user.id);
				} catch (e) {
					// error
				}
				console.log("token", uni.getStorageSync('uni_id_token'))
				console.log("uid", uni.getStorageSync('uid'))
				if (res.result.data.user.nickname == "") {
					self.getuserinfo(res.result.data.token, res.result.data.user.id)
				} else {
					this.bindshangji(() => {
						uni.reLaunch({
							url: '/pages/index/index?token=' + res.result.data.token + "&uid=" +
								res.result.data.user.id,
						});
					})
				}
			}).catch((err) => {
				console.log("err:-------- ", err);
				uni.showModal({
					showCancel: false,
					content: '微信登录失败，请稍后再试'
				})
				uni.hideLoading()
			})
		},
		phonelogin() {
			console.log('手机登录')
			var self = this
			if (!self.ischeck) {
				uni.showToast({
					title: "请先同意用户协议与隐私政策",
					icon: 'none',
				});
				return
			}
			self.showphonelogin = true
		},
		xieyi() {
			console.log('用户协议')
			uni.navigateTo({
				url: '/pages/xieyi/xieyi?type=xieyi'
			});
		},
		yinsi() {
			console.log('隐私政策')
			uni.navigateTo({
				url: '/pages/xieyi/xieyi?type=yinsi'
			});
		},
		check() {
			var self = this
			self.ischeck = !self.ischeck
		},
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
							type: "login"
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
		loginbyphone() {
			console.log('手机登录')
			var self = this
			if (self.phonenum == null || self.phonenum == "") {
				uni.showToast({
					title: "请输入手机号",
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
			var istrue = RegExp(/^1[34578]\d{9}$/).test(self.phonenum)
			if (!istrue) {
				uni.showToast({
					title: "请输入正确的手机号",
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
					action: "hall/loginBySms",
					data: {
						phone: self.phonenum,
						code: self.code,
						inviteCode: this.inviteCode
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
				try {
					uni.setStorageSync('uni_id_token', res.result.data.token);
					plus.storage.setItem('jwt_token', res.result.data.token);
				} catch (e) {
					// error
				}
				try {
					uni.setStorageSync('uid', res.result.data.user.id);
					plus.storage.setItem('uid', res.result.data.user.id);
				} catch (e) {
					// error
				}
				uni.reLaunch({
					url: '/pages/index/index?index=0',
				});
				console.log(res)
			}).catch((err) => {
				uni.hideLoading()
				uni.showToast({
					title: "登录失败",
					icon: 'none',
				});
				console.error(err)
			})
		},
		getuserinfo(token, uid) {
			var self = this
			uni.showLoading({
				title: '处理中...'
			})
			uni.login({
				provider: 'weixin',
				success: (res) => {
					uni.getUserInfo({
						success(info) {
							console.log(info)
							var nickname = info['userInfo']['nickName']
							var avatar = info['userInfo']['avatarUrl']
							var sex = info['userInfo']['gender']
							uniCloud.callFunction({
								name: 'hallctrl',
								data: {
									action: "hall/setuserinfo",
									data: {
										nickname: nickname,
										avatar: avatar,
										sex: sex,
										uid: uid,
										uniIdToken: token
									}
								}
							}).then((res) => {
								uni.hideLoading()
								console.log('设置信息')
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
								self.bindshangji(() => {
									uni.reLaunch({
										url: '/pages/index/index?token=' +
											token + "&uid=" +
											uid,
									});
								})
							}).catch((err) => {
								uni.hideLoading()
								uni.showToast({
									title: "设置失败!",
									icon: 'none',
								});
								console.error(err)
							})

						},
						fail: () => {
							uni.hideLoading()
							uni.showToast({
								title: "微信登录授权失败",
								icon: 'none'
							});
						}
					})
				},
				fail(err) {
					uni.hideLoading()
					uni.showToast({
						title: "微信登录授权失败",
						icon: 'none'
					});
				}
			})
		}
	}
}
