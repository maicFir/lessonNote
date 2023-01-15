<template>
	<view>
		<view style="width: 100%;height: 15rpx;background-color: #F5F5F5;"></view>
		<!-- <view class="jilubox" v-for="(item,index) in list">
			<view class="avatar">
				<image :src="item.avatar" class="image"></image>
			</view>
			<view class="left">
				<view class="title">{{item.title}}</view>
				<text>{{item.time | timeStamp}}</text>
			</view>
			<view class="right">+{{item.num}}</view>
		</view> -->
		<!-- <uni-load-more iconType="auto" :status="loadStatus"></uni-load-more> -->
		<!-- <unicloud-db orderby="createtime desc" ref="udb" v-slot:default="{data, loading, error, options}" collection="user_teamprofitrecord,userinfo" :where="where" field="createtime,count,uid{nickname,avatar}" @error="error" @load="load">
			<view>
				<view v-for="(item, index) in data" :key="index" class="jilubox" v-if="data.length!=0">
					<view class="avatar">
						<image :src="item.uid[0]['avatar']" class="image"></image>
					</view>
					<view class="left">
						<view class="title">{{item.uid[0]['nickname']}}</view>
						<text>{{item.createtime | timeStamp}}</text>
					</view>
					<view class="right">+{{Math.floor(parseFloat(item.count)*100)/100}}</view>
				</view>
				<view class="wuxiaoxi" v-if="data.length==0">
					<image src="../../static/mine/zanwushuju.png" class="image"></image>
					<text class="wenzi">暂无数据</text>
				</view>
			</view>
		</unicloud-db> -->
		<view>
			<view v-for="(item, index) in list" :key="index" class="jilubox" v-if="list.length!=0">
				<view class="avatar">
					<image :src="item.uid[0]['avatar']" class="image"></image>
				</view>
				<view class="left">
					<view class="title">{{item.uid[0]['nickname']}}</view>
					<text>{{item.createtime | timeStamp}}</text>
				</view>
				<view class="right">+{{Math.floor(parseFloat(item.count)*100)/100}}</view>
			</view>
			<view class="wuxiaoxi" v-if="list.length==0">
				<image src="../../static/mine/zanwushuju.png" class="image"></image>
				<text class="wenzi">暂无数据</text>
			</view>
		</view>
	</view>
</template>

<script>
	export { default } from "./shourumingxi.js";
</script>

<style>
	@import url("./shourumingxi.css");
</style>
