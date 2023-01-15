<template>
	<view>
		<view style="width: 100%;height: 15rpx;background-color: #F5F5F5;"></view>
		<view class="phone">
			<view class="titile">支付宝号</view>
			<view class="inputbox">
				<input type="text" placeholder="请输入支付宝号" class="input" v-model="zhifubao">
			</view>
		</view>
		<view style="width: 725rpx;height: 2rpx;background-color: #DDDDDD;float: right;"></view>
		<text class="tips">请填写正确的支付宝账号，以免账号信息不正确导致提现失败。</text>
		<view class="tijiao animate__animated" hover-class="animate__pulse" @tap="tijiao">提交</view>
	</view>
</template>

<script>
	export { default } from "./alipay.js";
</script>

<style>
	@import url("./alipay.css");
</style>
