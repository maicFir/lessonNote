<template>
	<view>
		<image class="bg-set" src="../../static/login/bg.png"></image>
		<image src="../../static/login/logo.png" class="logoimg" mode="widthFix"></image>
		<image src="../../static/login/mao.png" class="maoimg" mode="widthFix"></image>
		<view class="loginbutton">
			<view class="buttonbox">
				<!-- <view class="phonelogin  animate__animated"  hover-class="animate__pulse" @tap="phonelogin"></view> -->
				<view v-if="providerList.includes('apple')" @tap="loginByApple" class="applelogin animate__animated"
					hover-class="animate__pulse"></view>
				<view v-if="providerList.includes('univerify')" @tap="loginByUniverify" class="phonelogin animate__animated" 
					hover-class="animate__pulse" :class="platform == 'android'? 'phonelogin-android':'phonelogin'"></view>
				<view  v-if="providerList.includes('weixin')" class="wchatlogin animate__animated" hover-class="animate__pulse" 
					:class="platform == 'android'? 'wchatlogin-android':'wchatlogin'"
					@tap="loginByWeixin"></view>
				
			</view>
			<view class="yinsi">
				<image :src="ischeck?checkimg:uncheckimg" mode="widthFix" class="checkbox" @tap="check"></image>
				<span style="color: #5E310C;" @tap="check">同意网赚游戏</span>
				<span style="color: #C24E09;" @tap="xieyi">《用户协议》</span>
				<span style="color: #C24E09;" @tap="yinsi">《隐私政策》</span>
			</view>
		</view>
		
		<view class="phonepopup" v-if="showphonelogin" >
			<view class="bgbox animate__animated animate__bounceInUp">
				<view class="bgimg">
					<view class="title"><image src="../../static/login/sjdl.png" mode="widthFix" style="width: 200rpx;"></image></view>
					<view><image src="../../static/login/srsjh.png" mode="widthFix" style="width: 200rpx;margin-left: 76rpx;margin-top: 70rpx;"></image></view>
					<view class="phonenum"><input type="number" class="uni-input" v-model="phonenum"></view>
					
					<view><image src="../../static/login/sryzm.png" mode="widthFix" style="width: 170rpx;margin-left: 76rpx;margin-top: 30rpx;"></image></view>
					<view class="phonenum">
						<input type="number" class="uni-input" v-model="code">
						<view class="code animate__animated" hover-class="animate__pulse" @tap="getcode">
							<view v-if="!sendok" style="margin-top: 8rpx;">
								<image style="width: 138rpx;" src="../../static/login/hqyzm.png" mode="widthFix"></image>
							</view>
							<view v-else class="codenum">{{time}}</view>
						</view>
					</view>
					
					<view class="login animate__animated"  hover-class="animate__pulse" @tap="loginbyphone"></view>
				</view>
				<view class="close animate__animated" hover-class="animate__pulse" @tap="showphonelogin=false"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export { default } from "./login.js";
</script>

<style>
	@import url("./login.css");
</style>
