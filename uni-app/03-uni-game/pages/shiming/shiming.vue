<template>
	<view>
		<view style="width: 100%;height: 15rpx;background-color: #F5F5F5;"></view>
		<view class="phone">
			<view class="titile">姓名</view>
			<view class="inputbox">
				<input type="text" placeholder="请输入真实姓名" class="input" v-model="name">
			</view>
		</view>
		<view style="width: 725rpx;height: 2rpx;background-color: #DDDDDD;float: right;"></view>
		
		<view class="phone">
			<view class="titile">身份证号</view>
			<view class="inputbox">
				<input type="text" placeholder="请输入身份证号码" class="input" v-model="idcard">
			</view>
		</view>
		<view style="width: 725rpx;height: 2rpx;background-color: #DDDDDD;float: right;"></view>
		<text class="tips">提现需实名制，非实名制用户无法提现，请务必填写真实姓名和身份证号码</text>
		<view class="tijiao animate__animated" hover-class="animate__pulse" @tap="tijiao">提交</view>
		<!-- <view class="tijiao animate__animated" hover-class="animate__pulse" @tap="tijiao" v-if="isauthentication==0">提交</view> -->
		<!-- <view class="tijiao1" @tap="tijiao1" v-else>提交</view> -->
	</view>
</template>

<script>
	export { default } from "./shiming.js";
</script>

<style>
	@import url("./shiming.css");
</style>
