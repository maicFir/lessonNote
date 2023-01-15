export default {
	data() {
		return {
			title:"",
			content:""
		}
	},
	methods: {
		
	},
	onLoad: function (option) { 
		console.log(option);
		var self = this
		self.title = option.title
		self.content = option.content
	}
}