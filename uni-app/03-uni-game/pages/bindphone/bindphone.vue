<template>
	<view>
		<view style="width: 100%;height: 15rpx;background-color: #F5F5F5;"></view>
		<view class="phone">
			<view class="titile">手机号</view>
			<view class="inputbox">
				<input type="number" maxlength="11" placeholder="请输入手机号" class="input" v-model="phonenum">
			</view>
			<view class="code animate__animated" hover-class="animate__pulse" @tap="getcode">{{sendok?time:'获取验证码'}}</view>
		</view>
		<view style="width: 725rpx;height: 2rpx;background-color: #DDDDDD;float: right;"></view>
		<view class="phone">
			<view class="titile">验证码</view>
			<view class="inputbox">
				<input type="text" placeholder="请输入验证码" class="input" v-model="code">
			</view>
		</view>
		<view style="width: 725rpx;height: 2rpx;background-color: #DDDDDD;float: right;"></view>
		<view class="tijiao animate__animated" hover-class="animate__pulse" @tap="tijiao">提交</view>
	</view>
</template>

<script>
	export { default } from "./bindphone.js";
</script>

<style>
	@import url("./bindphone.css");
</style>
