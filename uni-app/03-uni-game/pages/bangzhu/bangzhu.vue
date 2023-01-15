<template>
	<view>
		<view style="width: 100%;height: 15rpx;background-color: #F5F5F5;"></view>
		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" collection="helpinfo" where="" field="" @load="loadinfo">
			<view class="bangzhubox">
				<view class="bangzhuminbox" v-for="(item,index) in list" v-if="list.length!=0">
					<view class="left">
						<view><image :src="item.icon" class="icon"></image></view>
						<view class="title"><text class="wenzi">{{item.title}}</text></view>
					</view>
					<view class="right">
						<view class="box" v-for="data in item.child"  @tap="xiangqing(data)">
							<image src="../../static/mine/ic_yuandian@2x.png" class="yuandian"></image>
							<text>{{data.title}}</text>
						</view>
					</view>
				</view>
			</view>
			<view class="wuxiaoxi" v-if="list.length==0">
				<image src="../../static/mine/zanwushuju.png" class="image"></image>
				<text class="wenzi">暂无数据</text>
			</view>
		</unicloud-db>
	</view>
</template>

<script>
	export { default } from "./bangzhu.js";
</script>

<style>
	@import url("./bangzhu.css");
</style>
