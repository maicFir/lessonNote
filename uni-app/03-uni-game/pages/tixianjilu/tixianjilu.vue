<template>
	<view>
		<view style="width: 100%;height: 15rpx;background-color: #F5F5F5;"></view>
		<!-- <view class="jilubox" v-for="(item,index) in list">
			<view class="left">
				<view class="title">{{item.title}}</view>
				<text>{{item.time | timeStamp}}</text>
			</view>
			<view class="right">+{{item.num}}</view>
		</view> -->
		<!-- <uni-load-more iconType="auto" :status="loadStatus"></uni-load-more> -->
		<unicloud-db v-if="uid" ref="udb" v-slot:default="{data, loading, error, options}" orderby="createtime desc" collection="user_profitrecord" :where="`uid=='${uid}'`" field="" @error="error" @load="load">
			<view>
				<view v-for="(item, index) in data" :key="index" class="jilubox" v-if="data.length!=0">
					<view class="left">
						<view class="title">{{item.explane}}</view>
						<text>{{item.createtime | timeStamp}}</text>
					</view>
					<view class="right">{{item.explane=='提现成功'?'':'+'}}{{Math.floor(parseFloat(item.count)*100)/100}}</view>
				</view>
				<view class="wuxiaoxi" v-if="data.length==0">
					<image src="../../static/mine/zanwushuju.png" class="image"></image>
					<text class="wenzi">暂无数据</text>
				</view>
			</view>
		</unicloud-db>
	</view>
</template>

<script>
	export { default } from "./tixianjilu.js";
</script>

<style>
	@import url("./tixianjilu.css");
</style>
