<template>
	<view>
		<view style="width: 100%;height: 15rpx;background-color: #F5F5F5;"></view>
		<view class="weixinbox">
			<view class="icon">
				<image src="../../static/mine/ic_inviter_wx@2x.png" class="weixin"></image>
			</view>
			<view class="title">微信号</view>
			<view class="input"><input type="text" placeholder="请输入您的微信号" v-model="weixin" class="weixin"></view>
		</view>
		<view style="width: 725rpx;height: 2rpx;background-color: #DDDDDD;float: right;"></view>
		
		<view class="weixinbox">
			<view class="icon">
				<image src="../../static/mine/ic_inviter_qq@2x.png" class="weixin"></image>
			</view>
			<view class="title">QQ号</view>
			<view class="input"><input type="text" placeholder="请输入您的QQ号" v-model="qq" class="weixin"></view>
		</view>
		<view style="width: 725rpx;height: 2rpx;background-color: #DDDDDD;float: right;"></view>
		
		<view class="yaoqing animate__animated" hover-class="animate__pulse" @tap="yaoqing">确认修改</view>
	</view>
</template>

<script>
	export { default } from "./shejiao.js";
</script>

<style>
	@import url("./shejiao.css");
</style>
