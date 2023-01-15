export default {
	data() {
		return {
			list:[
				// {
				// 	title:"注册邀请",
				// 	icon:"../../static/mine/bzzcyq_icon@2x.png",
				// 	child:[
				// 		{title:"注册的时候没有填写邀请码，可以补填...",content:"注册的时候没有填写邀请码，可以补填...注册的时候没有填写邀请码，可以补填..."},
				// 		{title:"注册的时候没有填写邀请码，可以补填...",content:"注册的时候没有填写邀请码，可以补填...注册的时候没有填写邀请码，可以补填..."},
				// 	]
				// },
				// {
				// 	title:"游戏",
				// 	icon:"../../static/mine/bzyxan_icon@2x.png",
				// 	child:[
				// 		{title:"注册的时候没有填写邀请码，可以补填...",content:"注册的时候没有填写邀请码，可以补填...注册的时候没有填写邀请码，可以补填..."},
				// 		{title:"注册的时候没有填写邀请码，可以补填...",content:"注册的时候没有填写邀请码，可以补填...注册的时候没有填写邀请码，可以补填..."},
				// 	]
				// },
				// {
				// 	title:"提现",
				// 	icon:"../../static/mine/bztxan_icon@2x.png",
				// 	child:[
				// 		{title:"注册的时候没有填写邀请码，可以补填...",content:"注册的时候没有填写邀请码，可以补填...注册的时候没有填写邀请码，可以补填..."},
				// 		{title:"注册的时候没有填写邀请码，可以补填...",content:"注册的时候没有填写邀请码，可以补填...注册的时候没有填写邀请码，可以补填..."},
				// 		{title:"注册的时候没有填写邀请码，可以补填...",content:"注册的时候没有填写邀请码，可以补填...注册的时候没有填写邀请码，可以补填..."}
				// 	]
				// }
			]
		}
	},
	methods: {
		xiangqing(item){
			var self = this
			console.log(item)
			uni.navigateTo({
				url: '/pages/bangzhuitem/bangzhuitem?title='+item.title+'&content='+item.content,
			});
		},
		loadinfo(data){
			var self = this
			var newlist = []
			newlist.push(
				{
					title:"注册邀请",
					icon:"../../static/mine/bzzcyq_icon@2x.png",
					child:[]
				}
			)
			newlist.push(
				{
					title:"游戏",
					icon:"../../static/mine/bzyxan_icon@2x.png",
					child:[]
				}
			)
			newlist.push(
				{
					title:"游戏",
					icon:"../../static/mine/bzyxan_icon@2x.png",
					child:[]
				}
			)
			for(var i=0;i<data.length;i++){
				if(data[i]['type'] == "zhuce"){
					newlist[0]['child'].push(data[i])
				}else if(data[i]['type'] == "youxi"){
					newlist[1]['child'].push(data[i])
				}else if(data[i]['type'] == "tixian"){
					newlist[2]['child'].push(data[i])
				}
			}
			console.log(newlist)
			self.list = newlist
			uni.hideLoading()
		}
	},
	onLoad: function(option) {
		var self = this
		uni.showLoading({
			title: '正在加载中...'
		})
	},
}