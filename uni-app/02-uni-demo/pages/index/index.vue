<template>
	<view class="index-content">
		<Header></Header>
		<Content></Content>
	</view>
</template>

<script>
	import Header from "./component/Header.vue";
	import Content from "./component/Content.vue";
	
	export default {
		components: {
			Header,
			Content
		},
		data() {
			return {
				title: 'Hello',
				text: '',
				user: [],
				formParams: {
					name: '',
					age: ''
				}
			}
		},
		onLoad() {
			console.log('index load')
			console.log(window)
		},
		onShow() {
			console.log('index on show')
		},
		methods: {
			goToAbout() {
					uni.navigateTo({
						url:"/pages/about/about"
					})
					// uni.redirectTo({
					// 	url:"/pages/about/about"
					// })
			},
			// 查询
			queryList() {
				// 调用云函数
				uniCloud.callFunction({
					name:"list",
					data:{page: 1}
				}).then((res) => {
					console.log(res)
					this.text = res.result.text;
					this.user = res.result.user;
				})
			},
			handleSure() {
				const params = this.formParams;
				// 调用云函数，新增
				uniCloud.callFunction({
					name:"add",
					data: params
				}).then((res) => {
					console.log(res)
					uni.showToast({
						title:'保存成功',
					})
					this.queryList();
				})
			},
			// 删除
			handleRemove(item) {
				uniCloud.callFunction({
					name: 'remove',
					data: {
						id: item._id
					}
				}).then(() => {
					this.queryList();
				})
			}
		}
	}
</script>

<style>
	
</style>
