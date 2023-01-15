<template>
	<view>
		<view class="tixianbox">
			<uni-icons type="checkbox-filled" size="120" color="rgb(232,153,113)"></uni-icons>
			<view><text class="msg">提现申请已提交</text></view>
			<text class="msg1">预计三个工作日到账</text>
		</view>
		<view style="width: 100%;height: 15rpx;background-color: #F5F5F5;"></view>
		<view class="itembox">
			<text>提现金额</text>
			<text style="float: right;">{{num}}</text>
		</view>
		<view style="width: 690rpx;height: 1px;background-color: #DDDDDD;margin: 0 auto;"></view>
		<view class="itembox">
			<text>手续费</text>
			<text style="float: right;">{{shouxu}}</text>
		</view>
		<!-- <view style="width: 690rpx;height: 1px;background-color: #DDDDDD;margin: 0 auto;"></view>
		<view class="itembox">
			<text>提现至账户</text>
			<text style="float: right;">微信</text>
			<uni-icons type="weixin" size="30" color="rgb(115,191,76)" style="float: right;margin-right: 20rpx;"></uni-icons>
		</view> -->
		<view style="width: 690rpx;height: 1px;background-color: #DDDDDD;margin: 0 auto;"></view>
		<button class="loginout" @tap="navigateback">完成</button>
	</view>
</template>

<script>
	export { default } from "./tixian.js";
</script>

<style>
	@import url("./tixian.css");
</style>
