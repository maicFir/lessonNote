export default {
	data() {
		return {
			loadStatus:"more", //more（loading前）、loading（loading中）、noMore（没有更多了）
			page:0,
			uid:null,
			isLoadMore:false,  //是否加载中
			list:[
				/*{
					title:'限时猫分享收益',
					time:1605346613,
					num:"0.99",
					avatar:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/536fbc2c-31f0-41e1-9d51-3c4fb82f27c0.png",
				},
				
				 {
					title:'限时猫分享收益',
					time:1605346613,
					num:"0.99",
					avatar:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/536fbc2c-31f0-41e1-9d51-3c4fb82f27c0.png",
				},
				{
					title:'限时猫分享收益',
					time:1605346613,
					num:"0.99",
					avatar:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/536fbc2c-31f0-41e1-9d51-3c4fb82f27c0.png",
				},
				{
					title:'限时猫分享收益',
					time:1605346613,
					num:"0.99",
					avatar:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/536fbc2c-31f0-41e1-9d51-3c4fb82f27c0.png",
				},
				{
					title:'限时猫分享收益',
					time:1605346613,
					num:"0.99",
					avatar:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/536fbc2c-31f0-41e1-9d51-3c4fb82f27c0.png",
				}, */
			],
			where:""
		}
	},
	methods: {
		getlist(){
			var self = this
			uniCloud.callFunction({
				name: 'teamctrl',
				data: {
					action: "team/income",
					data: {
						page:this.page,
						uid: self.uid?self.uid:uni.getStorageSync('uid'),
						uniIdToken:self.token?self.token:uni.getStorageSync('uni_id_token'),
					}
				}
			}).then((res) => {
				console.log("income--------- ",res);
				res.result.data = res.result.data.map(item=>{
					if(item.uid.length==0){
						item.uid = [{
							avatar:"../../static/tuandui/avatar0.png",
							nickname:"未知"
						}]
					}
					return item
				})
				this.list.push(...res.result.data) 
				this.page ++
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
				uni.stopPullDownRefresh() 
				
			}).catch((err) => {
				console.log("err: ",err);
				uni.hideLoading()
				uni.showToast({
					title: "获取失败，请稍后重试!",
					icon: 'none',
				});
			})
		},
		error(e){
			console.log(e,"err-----------------")
		},
		load(){
			uni.hideLoading()
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
		this.uid = uni.getStorageSync('uid');
		console.log(this.uid)
		//this.where = "uid._id=='"+this.uid+"'"
		this.getlist()
		uni.showLoading({
			title: '正在加载中...'
		})
	},
	onPullDownRefresh() {
		this.page = 0
		this.list = []
		this.getlist()
	},
	onReachBottom(){
		this.getlist()
	}
}