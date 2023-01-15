<template>
	<view>
		<view class="biaotibox">
			<view class="biaoti">
				<view class="title">昵称</view>
				<view class="title" style="width: 20%;text-align: center;">招财猫数</view>
				<view class="title" style="text-align: right;">今日分红</view>
			</view>
		</view>
		<view style="width: 100%;height: 50rpx;"></view>
		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" orderby="createtime desc" 
			:collection="collectionList" :where="where" field="createtime,fen,count,uid{nickname,avatar,id}" @load="load" @error="error">
			<view>
				<view v-for="(item, index) in data" :key="index" class="jilubox" v-if="data.length!=0">
					<view class="name">
						<image :src="item.uid[0]['avatar']" class="avatar"></image>
						<view class="nickname">
							<text class="time" style="padding-top: 10rpx;">{{item.uid[0]['nickname']}}</text>
							<text class="time" style="font-size:26rpx;color: #999999;">{{(item.createtime)/1000 |timeStamp1}}</text>
						</view>
					</view>
					<view class="left">
						<view class="title">{{item.count}}</view>
					</view>
					<view class="right">{{item.fen}}</view>
				</view>
				<view class="wuxiaoxi" v-if="data.length==0">
					<image src="../../static/mine/zanwushuju.png" class="image"></image>
					<text class="wenzi">暂无数据</text>
				</view>
			</view>
		</unicloud-db>
		<!-- <uni-load-more iconType="auto" :status="loadStatus"></uni-load-more> -->
	</view>
</template>

<script>
	export {
		default
	}
	from "./fenhongjilu.js";
</script>

<style>
	@import url("./fenhongjilu.css");
</style>
