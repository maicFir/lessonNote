<template>
	<view>
		<view style="width: 100%;height: 15rpx;"></view>
		<view class="minbox">
			<view class="box" @tap="changeavatar">
				<view class="xinxi">头像</view>
				<view class="rightbox">
					<uni-icons type="arrowright" size="20" color="#999999" class="righticon"></uni-icons>
					<image :src="user.avatar" class="avatar"></image>
				</view>
			</view>
		</view>
		<view class="minbox">
			<view class="box" @tap="changename">
				<view class="xinxi">昵称</view>
				<view class="rightbox">
					<uni-icons type="arrowright" size="20" color="#999999" class="righticon"></uni-icons>
					<text class="nickname">{{user.nickname}}</text>
				</view>
			</view>
		</view>
		<view class="minbox">
			<view class="box" @tap="bindPhoneByUniverify">
				<view class="xinxi">手机号</view>
				<view class="rightbox">
					<uni-icons type="arrowright" size="20" color="#999999" class="righticon"></uni-icons>
					<text class="nickname" v-if="user.phone!=0">{{(user.phone+'').substr(0, 3)}}{{user.phone!=0?'****':''}}{{(user.phone+'').substr((user.phone+'').length - 4)}}</text>
				</view>
			</view>
		</view>
		<!-- <view class="minbox">
			<view class="box" @tap="gobindphone">
				<view class="xinxi">手机号</view>
				<view class="rightbox">
					<uni-icons type="arrowright" size="20" color="#999999" class="righticon"></uni-icons>
					<text class="nickname" v-if="user.phone!=0">{{(user.phone+'').substr(0, 3)}}{{user.phone!=0?'****':''}}{{(user.phone+'').substr((user.phone+'').length - 4)}}</text>
				</view>
			</view>
		</view> -->
		 <view class="minbox" @tap="alipay">
			<view class="box">
				<view class="xinxi">支付宝账号</view>
				<view class="rightbox">
					<uni-icons type="arrowright" size="20" color="#999999" class="righticon"></uni-icons>
					<text class="nickname">{{user.zhifubao!=''?user.zhifubao:'未绑定'}}</text>
				</view>
			</view>
		</view>
		<view class="minbox">
			<view class="box" @tap="yinsi">
				<view class="xinxi">隐私政策</view>
				<view class="rightbox">
					<uni-icons type="arrowright" size="20" color="#999999" class="righticon"></uni-icons>
					<text class="nickname"></text>
				</view>
			</view>
		</view>
		<view class="minbox">
			<view class="box" @tap="xieyi">
				<view class="xinxi">用户协议</view>
				<view class="rightbox">
					<uni-icons type="arrowright" size="20" color="#999999" class="righticon"></uni-icons>
					<text class="nickname"></text>
				</view>
			</view>
		</view>
		<view class="minbox">
			<view class="box" @tap="closeUser" style="border-bottom: none;">
				<view class="xinxi">注销账号</view>
				<view class="rightbox">
					<uni-icons type="arrowright" size="20" color="#999999" class="righticon"></uni-icons>
					<text class="nickname"></text>
				</view>
			</view>
		</view>
		<!-- <view class="minbox">
			<view class="box" style="border-bottom: none;">
				<view class="xinxi">开启音效</view>
				<view class="rightbox">
					<switch :checked="ischeck" @change="switchChange" color="#FF7D63" class="switch"/>
				</view>
			</view>
		</view> -->
		<button class="loginout" @tap="loginout">退出登录</button>
		<!-- <uni-popup ref="popup" type="center">
			<view class="dialog">
				<view style="width: 100%;height: 75rpx;box-sizing: border-box;line-height: 90rpx;">
					<uni-icons type="closeempty" size="30" color="#999999" class="closeicon" @tap="close"></uni-icons>
				</view>
				<view class="title">绑定手机号</view>
				<view class="content">为了保障账号安全，请先绑定手机号码？</view>
				<view class="bottonbox">
					<view class="quxiao" @tap="close">取消</view>
					<view class="queding" @tap="gobindphone">确定</view>
				</view>
			</view>
		</uni-popup> -->
	</view>
</template>

<script>
	export { default } from "./set.js";
</script>

<style>
	@import url("./set.css");
</style>
