<template>
	<view class="box">
		<text class="text">喵喵团是网赚游戏的收益分成系统，开放给所有用户，目的是让用户在玩游戏的同时收益最大化，娱乐和赚钱两不误：</text>
		<text class="text">1、你的喵喵团成员包括：直邀好友、扩散好友（好友邀请的好友）。</text>
		<text class="text">2、好友活跃收益：根据直邀好友、扩散好友的[活跃时长]、[看视频贡献比例]、[邀请好友数]等因素综合计算，直邀好友，扩散好友越多，每天坐享活跃收益越多：1个直邀好友=2个扩散好友</text>
		<text class="text">3、关于目标金额和倍率说明</text>
		<text class="text">（1）完成目标金额，用户确认后收益自动划转到你的钱包，可立即提现；并且自动晋级下一个阶段；</text>
		<text class="text">（2）晋级下一阶段后，有额外加速倍率哦，完成目 标越多，加速倍率越高；加速倍率的作用是协助您更快达到目标，例如A的活跃收益是10元，倍率是 1.2，实际收益=10*1.2=12元。</text>
		<view class="container">
			<view class="title">阶段</view>
			<view class="title">目标</view>
			<view class="title">倍率</view>
		</view>
		<view class="container" v-for="item in stages">
			<view class="title">{{item.name}}</view>
			<view class="title">{{item.mubiao}}</view>
			<view class="title">{{item.beilv}}</view>
		</view>
		<text class="text">4、若发现用户有恶意作弊行为，一律封禁账号并扣 除账户所有余额。</text>
		<text class="text">5、收益下降的原因：一台手机开多个小号，使用多个手机开多个小号，使用按键精灵、外挂等作弊工具。</text>
		<text class="text">6、官方保留最终解释权，有疑问请联系客服。</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				stages:[]
			}
		},
		methods: {
			
		},
		onLoad(option) {
			var self = this
			
		    const stages = JSON.parse(decodeURIComponent(option.stages));
			this.stages = stages
			
		},
	}
</script>

<style>
.text{
	font-size: 25rpx;
	line-height: 2em;
	display: block;
}
.box{
	padding: 20rpx;
}
.container{
	width: 100%;
	height: 70rpx;
	border-top: 1px solid #ccc;
	box-sizing: border-box;
	border-right: 1px solid #ccc;
}
.container .title{
	width: 33.3333%;
	height: 100%;
	text-align: center;
	line-height: 70rpx;
	float: left;
	font-size: 27rpx;
	border-left: 1px solid #ccc;
	border-bottom: 1px solid #ccc;
	box-sizing: border-box;
}
</style>
