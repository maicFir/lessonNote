export default {
	data() {
		return {
			num:"0.30",
			shouxu:"0"
		}
	},
	methods: {
		navigateback(){
			uni.navigateBack()
		},
	},
	onLoad(option) {
		var self = this
	    const num = option.amount;
		this.num = Number(num).toFixed(2)
		this.shouxu = Number(option.commission).toFixed(2)
	},
}