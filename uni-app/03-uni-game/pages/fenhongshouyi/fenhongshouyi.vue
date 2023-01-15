<template>
	<view>
		<view class="banner">
			<view class="morebutton">
				<uni-icons type="arrowleft" size="20" color="#FFFFFF" @tap="navigateback" style="float: left;"></uni-icons>
			</view>
			<view class="morebutton" style="text-align: right;">
				<!-- <text>了解更多</text> -->
			</view>
		</view>
		<view class="noticebar">
			<uni-notice-bar color="#F17215" background-color="#f5f5f5" scrollable="true" single="true" showIcon="true" 
				:text="notice" :speed="50" ></uni-notice-bar>
		</view>
		<view class="fenhongbox" @tap="fenhongjilu">
			<image src="../../static/mine/qqfhmtb_img@2x.png" class="image"></image>
			<text class="wenzi">今日每只分红</text>
			<text class="wenzi" style="margin-left: 10rpx;color: #F17215;">{{money}}元</text>
			<uni-icons type="arrowright" size="20" color="#999999" class="righticon" style="float: right;"></uni-icons>
		</view>
		<view class="fenhongbox1">
			<view class="top">
				<text style="font-size: 35rpx;font-weight: 700;color: #333333;">我的金色招财猫</text>
				<text style="float: right;color: #F17215;font-size: 30rpx;">{{fenhongmao}}只</text>
			</view>
			<view class="top">
				<text style="font-size: 30rpx;color: #999999;">今日分红</text>
				<text style="float: right;color: #F17215;font-size: 30rpx;">{{jinrifenhong}}</text>
			</view>
			<view style="height: 2rpx;width: 100%;background-color: #F5F5F5;"></view>
			<view class="top">
				<text style="font-size: 30rpx;color: #999999;">累计分红</text>
				<text style="float: right;color: #F17215;font-size: 30rpx;">{{leijifenhong}}</text>
			</view>
		</view>
		<view class="fenhongjianjie">
			<view class="title">分红招财喵是什么</view>
			<view class="content">招财喵每天均分平台20%的广告收入，限量10万只，先到先得。招财喵可由两只37级喵喵合成，也可通过五只特殊喵合成获得，还可通过个人努力，持续玩游戏获得。</view>
		</view>
		<view class="geren">
			<view class="top">
				<text class="wenzi">个人努力必得分红招财喵</text>
				<view style="float: right;">
					<image src="../../static/mine/ic_increase_xiao@2x.png" class="huojian"></image>
					<text style="color: #333333;font-size: 26rpx;margin-left: 15rpx;">去加速</text>
				</view>
			</view>
			<view class="progress-box">
				<view class="progress" :style="{width: jindu*6.28+'rpx'}"></view>
			</view>
			<view class="jindu">
				<text>已完成</text>
				<text style="color: #F17215;margin-right: 10rpx;">{{jindu}}%  </text>
				<text>由个人活跃和好友活跃两个维度综合计算</text>
			</view>
		</view>
	</view>
</template>

<script>
	export { default } from "./fenhongshouyi.js";
</script>

<style>
	@import url("./fenhongshouyi.css");
</style>
