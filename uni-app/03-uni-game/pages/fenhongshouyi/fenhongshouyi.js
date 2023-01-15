export default {
	data() {
		return {
			notice:"",
			money:"",
			fenhongmao:0,
			jinrifenhong:"",
			leijifenhong:"",
			jindu:0,
			token:null,
			uid:null,
		}
	},
	methods: {
		navigateback(){
			uni.navigateBack()
		},
		fenhongjilu(){
			uni.navigateTo({
				url: '/pages/fenhongjilu/fenhongjilu',
			});
		},
		getinfo() {
			var self = this
			
			uni.showLoading({
				title: '处理中...'
			})
			uniCloud.callFunction({
				name: 'hallctrl',
				data: {
					action: "hall/getfenhongcatrecord",
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
				console.log(res)
				self.jinrifenhong = res.result.data.fenhongcat.today.toFixed(2)
				self.leijifenhong = res.result.data.fenhongcat.leiji.toFixed(2)
				self.fenhongmao = res.result.data.fenhongcat.count
				self.money = res.result.data.todayGet.toFixed(2)
				var bide = Number(res.result.data.user.bide)
				if(bide>100){
					bide = 100
				}
				self.jindu = bide
				var arr = res.result.data.gonggao
				if(arr.length>0){
					self.notice = "恭喜 "+arr[0]['nickname']+"玩家于 "+self.timeStamp(arr[0]['createtime'])+" 获得一只全球分红招财喵"
				}else{
					self.notice = ""
				}
			}).catch((err) => {
				uni.hideLoading()
				uni.showToast({
					title: "获取信息失败，请稍后重试!",
					icon: 'none',
				});
				console.error(err)
			})
		},
		timeStamp(value) {//具体到时分秒
			if (!value) return '';
			value = value * 1000
			var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var year = date.getFullYear();
			var month = ("0" + (date.getMonth() + 1)).slice(-2);
			var sdate = ("0" + date.getDate()).slice(-2);
			var hour = ("0" + date.getHours()).slice(-2);
			var minute = ("0" + date.getMinutes()).slice(-2);
			var second = ("0" + date.getSeconds()).slice(-2);
			// 拼接
			var result = month + "月" + sdate + "日 " + hour + ":" + minute + ":" + second;
			// 返回
			return result;
		}
	},
	onLoad: function(option) {
		var self = this
		self.token = uni.getStorageSync('uni_id_token');
		self.uid = uni.getStorageSync('uid');
	},
	onReady() {
		var self = this
		self.getinfo()
	}
}