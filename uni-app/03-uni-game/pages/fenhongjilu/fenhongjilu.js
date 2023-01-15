const db = uniCloud.database();
export default {
	data() {
		return {
			loadStatus: "more", //more（loading前）、loading（loading中）、noMore（没有更多了）
			page: 1,
			isLoadMore: false, //是否加载中
			where: "",
			collectionList: [
				db.collection('user_fenhongdcatrecord').getTemp(),
				db.collection('userinfo').getTemp()
			]
		}
	},
	methods: {
		getlist() {
			this.$refs.udb.loadData()
			console.log(this.$refs.udb.dataList);
			var a = this.$refs.udb.dataList
			console.log(a.length);
		},
		load(e) {
			console.log("成功", e)
			uni.hideLoading()
		},
		error(e) {
			console.log("失败", e)
		}
	},
	filters: {
		timeStamp: function(value) { //具体到时分秒
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
		},
		timeStamp1: function(value) { //具体到时分秒
			if (!value) return '';
			value = value * 1000
			var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var year = date.getFullYear();
			var month = ("0" + (date.getMonth() + 1)).slice(-2);
			var sdate = ("0" + date.getDate()).slice(-2);
			// 拼接
			var result = year + "-" + month + "-" + sdate;
			// 返回
			return result;
		},
	},
	onLoad: function(options) {
		// uni.startPullDownRefresh();
		var self = this
		self.uid = uni.getStorageSync('uid');
		self.where = "uid._id=='" + self.uid + "'"
		console.log("this.where: ", self.where);
		uni.showLoading({
			title: '正在加载中...'
		})
	},
	onPullDownRefresh() {
		this.$refs.udb.loadData({
			clear: true
		}, () => {
			uni.stopPullDownRefresh();
		})
		// var self = this
		// console.log('refresh');
		// self.page=1
		// self.getlist()
		// setTimeout(function () {
		// 	uni.stopPullDownRefresh();
		// }, 1000);
	},
	onReachBottom(e) {
		console.log('触底加载更多');
		this.$refs.udb.loadMore()
		// setTimeout(function () {
		// 	uni.stopPullDownRefresh();
		// }, 1000);
		// var self = this
		// if(!self.isLoadMore){
		// 	self.isLoadMore=true
		// 	self.page+=1
		// 	self.getlist()
		// }
	}
}
