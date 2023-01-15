<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view @click="goToAbout">前往关于页面</view>
		<!-- <view>{{text}}</view>
		<view>查询</view>
		<view v-for="(item, index) in user" :key="index">
			<view>{{item.name}}--<text @click="handleRemove(item)">删除</text></view>
			<view>{{item.age}}</view>
		</view>
		<view>添加</view>
		<input type="text" placeholder="请输入名称" v-model="formParams.name" />
		<input type="text" placeholder="请输入年龄" v-model="formParams.age" />
		<button type="default" @click="handleSure">确定</button> -->
	</view>
</template>

<script>
	export default {
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
			this.queryList();
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
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
