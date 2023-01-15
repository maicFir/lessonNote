export default {
	data() {
		return {
			loadStatus:"more", //more（loading前）、loading（loading中）、noMore（没有更多了）
			page:1,
			index:1,
			isLoadMore:false,  //是否加载中
			list:[
				
			],
			offset1:0,
			offset2:0,
			list1:[],
			list2:[],
			total1:100,
			total2:100
		}
	},
	methods: {
		getlist(){
			var self = this
			if(self.index == 1 || self.index == 2){
				uni.showLoading({
					title: '处理中...'
				})
				uniCloud.callFunction({
					name: 'teamctrl',
					data: {
						action: "team/getxiaji",
						data: {
							uid: self.uid?self.uid:uni.getStorageSync('uid'),
							uniIdToken:self.token?self.token:uni.getStorageSync('uni_id_token'),
							level:self.index,
							offset:self.index==1?self.offset1:self.offset2
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
					var list = res.result.data.list
					var total = res.result.data.total
					if(self.index==1){
						self.list1 = self.list1.concat(list)
						self.total1 = total
						self.list = self.list1
						self.offset1 = res.result.data.offset + 1
					}else if(self.index==2){
						self.list2 = self.list2.concat(list)
						self.total2 = total
						self.list = self.list2
						self.offset2 = res.result.data.offset + 1
					}
					uni.stopPullDownRefresh()
					this.isLoadMore = false
				}).catch((err) => {
					uni.hideLoading()
					uni.showToast({
						title: "获取失败，请稍后重试!",
						icon: 'none',
					});
				})
			}
		},
		change(index){
			var self = this
			self.index = index
			if(self.index == 1 && self.list1.length<=0){
				self.getlist()
			}else if(self.index == 2 && self.list2.length<=0){
				self.getlist()
			}
			if(self.index == 1 && self.list1.length>0){
				self.list = self.list1
			}else if(self.index == 2 && self.list2.length>0){
				self.list = self.list2
			}
		}
	},
	filters: {
		timeStamp: function(value) {//具体到时分秒
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
			var result = year + "-" + month + "-" + sdate + " " + hour + ":" + minute + ":" + second;
			// 返回
			return result;
		}
	},
	onLoad: function (options) {
		setTimeout(function () {
			console.log('start pulldown');
		}, 1000);
		uni.startPullDownRefresh();
	},
	onPullDownRefresh() {
		var self = this
		if(self.index==1){
			self.list1 = []
			self.offset1 = 0
		}else if(self.index==2){
			self.list2 = []
			self.offset2 = 0
		}
		self.getlist()
		
	},
	onReachBottom(e){
		//console.log('触底加载更多');
		var self = this
		if(!self.isLoadMore){
			self.isLoadMore=true
			self.getlist()
		}
	}
}