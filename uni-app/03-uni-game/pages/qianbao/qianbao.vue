<template>
	<view>
		<view class="tixiantop">
			<view style="height: 44px;width: 100%;"></view>
			<view class="banner">
				<view class="box" style="float: left;"><uni-icons type="arrowleft" size="20" color="#FFFFFF" @tap="navigateback" style="float: left;"></uni-icons></view>
				<view class="box">提现</view>
				<view class="box" style="float: left;text-align: right;" @tap="gojilu">记录</view>
			</view>
			<view style="height: 30rpx;width: 100%;"></view>
			<view style="width: 100%;text-align: center;font-size: 30rpx;color: #FFFFFF;">我的余额</view>
			<view style="" class="moneynum">
				<text>￥</text>
				<text class="num">{{money}}</text>
			</view>
			<view class="bottom"></view>
		</view>
		<!-- <view class="weixinicon">
			<text style="float: left;">微信提现</text>
			<image src="../../static/mine/qianbao/txwx_icon@2x.png" class="img"></image>
		</view> -->
		<view style="height: 60rpx;width: 100%;"></view>
		<view class="weixinicon">
			<view class="wenzi">提现金额</view>
			<!-- <view class="icon" @tap="shoucimianfei">
				<image src="../../static/mine/qianbao/ic_question_grey@2x.png" class="iconimg"></image>
				<text style="float: right;">首次免费</text>
			</view> -->
		</view>
		<view class="numbigbox">
			<view :class="index==checkindex?'numbox active':'numbox'" v-for="(item,index) in list" @tap="check(index)">{{item.num}} 元</view>
		</view>
		<view style="height: 60rpx;width: 100%;"></view>
		<view class="weixinicon">注意事项</view>
		<view class="weixinicon" style="color: #666666;font-size: 25rpx;">1、提现需实名制，非实名制用户无法提现，请务必完成实名认证</view><br />
		<view class="weixinicon" style="color: #666666;font-size: 25rpx;">2、单笔提现金额最低0.3元，为新人专享福利，每个账号可享受一次</view><br />
		<view class="weixinicon" style="color: #666666;font-size: 25rpx;">3、微信提现手续费为首次免费，最低0.3元</view>
		<view class="weixinicon" style="color: #666666;font-size: 25rpx;">4、提现将在1-3个工作日内审核到账，请您耐心等待</view>
		<view class="weixinicon" style="color: #666666;font-size: 25rpx;">5、如发现作弊，外挂等违规手段获取奖励，平台有权判定获得奖励无效</view>
		<button class="tixinbutton" @tap="tixian" :disabled="isable">提现</button>
		<uni-popup ref="popup" type="center">
			<view class="dialog">
				<view style="width: 100%;height: 75rpx;box-sizing: border-box;line-height: 90rpx;">
					<uni-icons type="closeempty" size="30" color="#999999" class="closeicon" @tap="close"></uni-icons>
				</view>
				<view class="title">绑定微信</view>
				<view class="content">提现需要绑定微信，是否立即绑定？</view>
				<view class="bottonbox">
					<view class="quxiao" @tap="close">取消</view>
					<view class="queding" @tap="loginByWeixin">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export { default } from "./qianbao.js";
</script>

<style>
	@import url("./qianbao.css");
</style>
