export default {
	data() {
		return {
			loadStatus:"more", //more（loading前）、loading（loading中）、noMore（没有更多了）
			page:1,
			isLoadMore:false,  //是否加载中
			uid:null,
			where:"",
			list:[
				{
					"time":1605181066,
					"num":0.30,
					"num1":0.30,
				},
				{
					"time":1605181066,
					"num":0.30,
					"num1":0.30,
				},
				{
					"time":1605181066,
					"num":0.30,
					"num1":0.30,
				},
				{
					"time":1605181066,
					"num":0.30,
					"num1":0.30,
				},
				{
					"time":1605181066,
					"num":0.30,
					"num1":0.30,
				},
				{
					"time":1605181066,
					"num":0.30,
					"num1":0.30,
				},
			],
		}
	},
	methods: {
		getlist(){
			
		},
		load(e){
			console.log("成功",e)
			uni.hideLoading()
		},
		error(e){
			console.log("成功",e)
			// uni.hideLoading()
		},
		getmsg(type){
            if(type == 0){
                return '提现审核中'
            }else if(type == 1){
                return '提现成功'
            }else if(type == 2){
                return '提现拒绝'
            }else if(type == 3){
                return '打款中'
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
		var self = this
		self.uid = uni.getStorageSync('uid');
		this.where = "uid=='"+this.uid+"'"
		uni.showLoading({
			title: '正在加载中...'
		})
	},
}