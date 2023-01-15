<template>
	<view>
		<view style="width: 100%;height: 15rpx;background-color: #F5F5F5;"></view>
		<view class="phone">
			<view class="titile">昵称</view>
			<view class="inputbox">
				<input type="text" placeholder="请输入昵称" class="input" v-model="nickname">
			</view>
		</view>
		<view style="width: 725rpx;height: 2rpx;background-color: #DDDDDD;float: right;"></view>
		<view class="tijiao animate__animated" hover-class="animate__pulse" @tap="tijiao">提交</view>
	</view>
</template>

<script>
	export { default } from "./changename.js";
</script>

<style>
	@import url("./changename.css");
</style>
