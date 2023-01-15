<template>
	<view>
		<view class="qrimg" style="position: fixed;z-index: -100;left: 0;top: 0;">
			<canvas canvas-id="myCanvas" id='myCanvas' style="width: 450rpx;height: 800rpx;"></canvas>
			<tki-qrcode cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit" :background="background" :foreground="foreground"
			 :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv" :onval="onval" :loadMake="loadMake"
			 :usingComponents="true" @result="qrR" :showLoading="false" />
		</view>
		<view style="position: fixed;width: 100%;height: 100%;left: 0;top: 0;z-index: -1;background-color: #FFFFFF;"></view>
		<view style="width: 100%;height: 80rpx;"></view>
		<view class="yaoqingma">
			<text>{{inviteCode}}</text>
			<image src="../../static/mine/qianbao/ic_fuzhi@2x.png" class="icon animate__animated" hover-class="animate__pulse"
			 @tap="setClipboardText(inviteCode)"></image>
		</view>
		<view class="yaoqingnum">
			<view class="zhitui">
				<view class="num">{{zhitui}}</view>
				<text class="miaoshu">直邀好友</text>
			</view>
			<view class="xian"></view>
			<view class="zhitui">
				<view class="num">{{kuosan}}</view>
				<text class="miaoshu">扩散好友</text>
			</view>
		</view>
		<view class="guize">邀请奖励规则</view>
		<view class="guize" style="color: #666666;font-size: 25rpx;line-height: 2em;">1、有效用户定义需符合以下两点：</view>
		<view class="guize" style="color: #666666;font-size: 25rpx;line-height: 2em;">2、完成实名认证的直邀好友/扩散好友；</view>
		<view class="guize" style="color: #666666;font-size: 25rpx;line-height: 2em;">3、直邀好友/扩散好友猫等级达到8级；</view>
		<button class="tixinbutton" @tap="yaoqing">邀请好友</button>
		<button class="tixinbutton" @tap="shejiao">设置社交信息</button>
		<uni-popup ref="popup" type="center">
			<view class="dialog">
				<view style="width: 100%;height: 75rpx;box-sizing: border-box;line-height: 75rpx;">
					<uni-icons type="closeempty" size="30" color="#999999" class="closeicon" @tap="close"></uni-icons>
				</view>
				<view class="title">我的邀请人</view>
				<view v-if="sjuid!=0">
					<view class="avatarbox">
						<image :src="sjuser.avatar" class="avatar"></image>
					</view>
					<view class="namebox">
						<text class="name">Lv.{{sjuser.maxlvl}} {{sjuser.nickname.length>20?sjuser.nickname.substring(0,20)+'...':sjuser.nickname}} </text>
						<image src="../../static/mine/ic_contact@2x.png" class="icon"></image>
					</view>
					<view class="set" @tap="shejiao">
						<text>我也要设置社交信息</text>
						<uni-icons type="arrowright" size="18" color="#333333" class="righticon"></uni-icons>
					</view>
				</view>
				<view v-else>
					<view style="width: 100%;height: 50rpx;"></view>
					<view class="bindsj">
						<input type="text" maxlength="6" v-model="shangjiuid">
					</view>
					<view class="bindbutton" @tap="bingshangji">立即绑定</view>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="share" type="center">
			<view class="sharepopup" :style="{height:height+'px'}">
				<image :src="base64" class="img"></image>
				<view class="sharebutton">
					<uni-icons type="closeempty" size="30" color="#999999" class="closeicon" @tap="closeshare"></uni-icons>
					<view class="iconbox">
						<view class="friend">
							<image src="../../static/share/ic_wx@2x.png" class="icon" @tap="shareweixin(1)"></image>
							<view style="font-size: 28rpx;" @tap="shareweixin(1)">微信朋友</view>
						</view>
						<view class="friendquan">
							<image src="../../static/share/ic_wx_circle@2x.png" class="icon" @tap="shareweixin(2)"></image>
							<view style="font-size: 28rpx;margin-left: 10rpx;" @tap="shareweixin(2)">朋友圈</view>
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	export {
		default
	}
	from "./yaoqingma.js";
</script>

<style>
	@import url("./yaoqingma.css");
</style>
