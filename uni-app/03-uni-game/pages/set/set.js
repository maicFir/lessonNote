export default {
	data() {
		return {
			bangding: true,
			ischeck: false,
			user: {},
			token: null,
			uid: null,
			univerifyStyle: {
				"icon": {
					"path": "static/icon.png" // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo
				},
				"authButton": {
					"normalColor": "#C24E09", // 授权按钮正常状态背景颜色 默认值：#3479f5
					"highlightColor": "#bc4a08", // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）
					"disabledColor": "#d05209", // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）
					"textColor": "#ffffff", // 授权按钮文字颜色 默认值：#ffffff
					"title": "本机号码一键绑定" // 授权按钮文案 默认值：“本机号码一键绑定”
				},
				"privacyTerms": {
					"defaultCheckBoxState": false, // 条款勾选框初始状态
					"checkBoxSize": 20, // 可选 条款勾选框大小，仅android支持
				}
			}
		}
	},
	onLoad(option) {
		var self = this
		self.token = uni.getStorageSync('uni_id_token');
		self.uid = uni.getStorageSync('uid');
		const userinfo = JSON.parse(decodeURIComponent(option.userinfo));
		this.user = userinfo
		// console.log(userinfo)
		uni.$on('changeuserinfo', (usnerinfo) => {
			if (usnerinfo.phone) {
				self.user.phone = usnerinfo.phone
			}
			if (usnerinfo.nickname) {
				self.user.nickname = usnerinfo.nickname
			}
			if (usnerinfo.zhifubao) {
				self.user.zhifubao = usnerinfo.zhifubao
			}
		})
	},
	onReady() {
		var self = this
		// if(self.user.phone==0){
		// 	self.$refs.popup.open()
		// }
	},
	methods: {
		bindPhoneByUniverify() {
			var self = this
			if (this.user.phone) {
				uni.showToast({
					title: '已绑定手机号，无需再绑定',
					icon: "none"
				});
				return false
			}

			uni.login({
				provider: 'univerify',
				univerifyStyle: this.univerifyStyle,
				success(res) { // 登录成功// {openid:'登录授权唯一标识',access_token:'接口返回的 token'}
					console.log("res----univerifyStyle: ", res);
					uni.showLoading({
						title: '处理中...'
					})
					uniCloud.callFunction({
						name: 'hallctrl',
						data: {
							action: "hall/bindMobile",
							data: {
								params: res.authResult,
								uid: self.uid ? self.uid : uni.getStorageSync('uid'),
								uniIdToken: self.token ? self.token : uni.getStorageSync('uni_id_token')
							},
						}
					}).then((res) => {
						// console.log(res, 'bindMobile-----');
						// try {
						// 	uni.setStorageSync('uni_id_token', res.result.data.token);
						// 	plus.storage.setItem('jwt_token', res.result.data.token);
						// } catch (e) {
						// 	// error
						// }
						// try {
						// 	uni.setStorageSync('uid', res.result.data.user.id);
						// 	plus.storage.setItem('uid', res.result.data.user.id);
						// } catch (e) {
						// 	// error
						// }
						// console.log("token", uni.getStorageSync('uni_id_token'))
						// console.log("uid", uni.getStorageSync('uid'))
						uni.hideLoading()
						uni.closeAuthView()
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
							phone: res.result.phone
						});
						self.user.phone = res.result.phone
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
		switchChange(e) {
			console.log('switch1 发生 change 事件，携带值为', e.target.value)
		},
		alipay() {
			uni.navigateTo({
				url: '/pages/alipay/alipay?zhifubao=' + this.user.zhifubao,
			});
		},
		loginout() {
			uni.removeStorageSync('uni_id_token');
			uni.removeStorageSync('uid');
			uni.navigateTo({
				url: '/pages/login/login',
			});
		},
		close() {
			var self = this
			self.$refs.popup.close()
		},
		gobindphone() {
			uni.navigateTo({
				url: '/pages/bindphone/bindphone',
			});
		},
		changeavatar() {
			var self = this
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'],
				sourceType: ['camera', 'album'], //这要注意，camera掉拍照，album是打开手机相册
				success: (res) => {
					// console.log(res.tempFilePaths[0]);
					var index = res.tempFilePaths[0].lastIndexOf(".");
					var obj = res.tempFilePaths[0].substring(index + 1, res.tempFilePaths[0].length);
					// console.log(obj)
					uniCloud.uploadFile({
						filePath: res.tempFilePaths[0],
						cloudPath: String(Math.random() * 5).split('.')[1] + '.' + obj,
						success: (res1) => {
							// console.log(res1,"res1------")
							self.geturl(res1.fileID)
						}
					})
				}
			});
		},
		async geturl(fileID) {
			var self = this
			uni.showLoading({
				title: '处理中...'
			})
			var result = await uniCloud.getTempFileURL({
				// fileList:[{fileID:fileID,maxAge: "60"}],
				fileList: [fileID]
			})
			// var url = result['fileList'][0]['tempFileURL']['fileID']
			var url = result.fileList[0].tempFileURL
			console.log("url:----- ",url);
			self.user['avatar'] = url
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/setuserinfo",
					data: {
						nickname: self.user['nickname'],
						avatar: url,
						uid: self.uid,
						uniIdToken: self.token
					}
				}
			}).then((res) => {
				// console.log("res:-----setuserinfo ",res);
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
					avatar: url
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
		},
		closeUser() {
			var self = this
			uni.showModal({
				title: '提示',
				content: '确定注销此账号吗？一旦注销将无法使用，请慎重！',
				showCancel: true,
				cancelText: '取消',
				confirmText: '确定',
				success: res => {
					console.log("res: ", res);
					if (res.confirm) {
						uni.showLoading({
							title: '处理中...',
							mask: true
						});
						uniCloud.callFunction({
							name: 'hallctrl',
							data: {
								action: "hall/closeUser",
								data: {
									uid: self.uid,
									uniIdToken: self.token
								}
							}
						}).then((res) => {
							console.log("res: ------------", res);
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
								title: "账号注销成功!",
								icon: 'none',
							});
							this.loginout()
						}).catch((err) => {
							uni.hideLoading()
							uni.showToast({
								title: "账号注销失败!",
								icon: 'none',
							});
							console.error(err)
						})
					}
				},
				fail: () => {},
				complete: () => {}
			});
		},
		changename() {
			uni.navigateTo({
				url: '/pages/changename/changename?phone=' + this.user.phone + '&nickname=' + this.user
					.nickname,
			});
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
	},
	onUnload() {
		// 移除监听事件  
		uni.$off('changeuserinfo');
	}
}
