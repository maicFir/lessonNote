export default {
	data() {
		return {
			type:'xieyi'
		}
	},
	methods: {

	},
	onLoad(option) {
		var self = this
		self.type = option.type
		if(self.type == 'xieyi'){
			uni.setNavigationBarTitle({
			　　title:'用户协议'
			})
		}else{
			uni.setNavigationBarTitle({
			　　title:'隐私政策'
			})
		}
	    console.log(option)
	},
}
