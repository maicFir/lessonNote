<template>
	<view>
		<view class="biaotibox">
			<view class="biaoti">
				<view class="title" :class="index==1?'check':''" @tap="change(1)">直推好友</view>
				<view class="title" :class="index==2?'check':''" @tap="change(2)">扩散好友</view>
				<!-- <view class="title" :class="index==3?'check':''" @tap="change(3)">待激活</view> -->
			</view>
		</view>
		<view style="width: 100%;height: 50rpx;"></view>
		<div class="list-box">
			<view class="jilubox" v-for="(item,index) in list">
				<view class="avatar">
					<image :src="item.avatar" class="image"></image>
				</view>
				<view class="left">
					<view class="title">{{item.nickname}}</view>
					<text>{{item.bindtime | timeStamp}}</text>
				</view>
				<view class="right">Lv.{{item.maxlvl}}{{item.isauthentication==0?'未实名':'已实名'}}</view>
			</view>
		</div>
		<uni-load-more iconType="auto" :status="loadStatus"></uni-load-more>
		<view class="miaoshu">
			<text>实名认证的</text>
			<text style="color: #FF6D4E;">有效用户</text>
			<text>才能为喵喵团提供收入</text>
		</view>
	</view>
</template>

<script>
	export {
		default
	}
	from "./yaoqingjilu.js";
</script>

<style>
	@import url("./yaoqingjilu.css");
</style>
