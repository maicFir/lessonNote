export default {
	data() {
		return {
			loadStatus: "more", //more（loading前）、loading（loading中）、noMore（没有更多了）
			page: 1,
			isLoadMore: false, //是否加载中
			uid: null,
			list: [{
					title: '限时猫分享收益',
					time: 1605346613,
					num: "0.99"
				},
				{
					title: '限时猫分享收益',
					time: 1605346613,
					num: "0.99"
				},
				{
					title: '限时猫分享收益',
					time: 1605346613,
					num: "0.99"
				},
				{
					title: '限时猫分享收益',
					time: 1605346613,
					num: "0.99"
				},
				{
					title: '限时猫分享收益',
					time: 1605346613,
					num: "0.99"
				},
			],
		}
	},
	methods: {
		getlist() {

		},
		error(e) {
			console.log(e)
		},
		load(){
			uni.hideLoading()
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
		}
	},
	onReady: function() {
		this.uid = uni.getStorageSync('uid');
	},
	onLoad: function (options) {
		uni.showLoading({
			title: '正在加载中...'
		})
	},
	onPullDownRefresh() {
		this.$refs.udb.loadData({clear: true},() => {
			uni.stopPullDownRefresh()
		})
	},
	onReachBottom() {
		this.$refs.udb.loadMore()
	}
}
