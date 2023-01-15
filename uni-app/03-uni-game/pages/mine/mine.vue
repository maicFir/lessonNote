<template>
	<view>
		<!-- <scroll-view scroll-y="true" :style="{height: height,'background-color':'#F0F0F0','align-items':'flex-start'}"> -->
			<!-- <view class="column-div"> -->
				<view class="mine_top">
					<view class="mine_top_bgimg"></view>
					<view class="mine_top_avatar">
						<view class="nicknamebox">
							<text class="nickname">{{user.nickname}}</text>
							<text class="userid">ID:{{user.id}}</text>
						</view>
						<view class="avatar" @tap="goset">
							<!-- <cover-image :src="user.avatar" class="avatarimg"></cover-image> -->
							<image :src="user.avatar" class="avatarimg"></image>
						</view>
					</view>
					<view class="zhaocaimaobox" @tap="gofenhongbao">
						<image src="../../static/mine/juzheng.png" class="juzhengimg" mode="widthFix"></image>
						<image src="../../static/mine/zcmxx_img.png" class="zcmxx_img" mode="widthFix"></image>
						<view class="jindubox">
							<text class="zhaocaimaotext">个人努力必得招财猫</text>
							<view class="progress-box">
								<view class="progress" :style="{width: jindu*3.7+'rpx'}"></view>
							</view>
							<text class="jinduyiwancheng">已完成{{jindu}}%</text>
						</view>
					</view>
				</view>
				<view style="width: 750rpx;overflow-x: hidden;">
					<view class="listviewitem">
						<view class="listviewitem1" @tap="goxiaoxi">
							<view class="listviewitemleft">
								<image src="../../static/mine/gryxx_icon@2x.png" class="icon"></image>
							</view>
							<view class="listviewitemleft">
								<text class="message">消息</text>
							</view>
							<view class="listviewitemleft listviewitemright">
								<text class="shuzhi"></text>
								<uni-icons type="arrowright" size="20" color="#999999" class="righticon"></uni-icons>
							</view>
						</view>
					</view>
					<view style="height: 30rpx;"></view>
					<view class="listviewitem" style="height: 360rpx;">
						<view class="listviewitem1 borderbottom" style="background-color: transparent;" @tap="goqianbao">
							<view class="listviewitemleft">
								<image src="../../static/mine/gryqb_icon@2x.png" class="icon"></image>
							</view>
							<view class="listviewitemleft">
								<text class="message">我的钱包</text>
							</view>
							<view class="listviewitemleft listviewitemright"  style="align-items: center;display: flex;">
								<text class="shuzhi">{{(user.fen).toFixed(2)}}</text>
					            <!-- <text class="shuzhi">{{Math.floor(parseFloat(user.fen)*100)/100}}</text> -->
								<uni-icons type="arrowright" size="20" color="#999999" class="righticon"></uni-icons>
							</view>
						</view>
						<view class="listviewitem1 borderbottom" style="background-color: transparent;" @tap="goqudao">
							<view class="listviewitemleft">
								<image src="../../static/mine/gryqdhh_icon@2x.png" class="icon"></image>
							</view>
							<view class="listviewitemleft">
								<text class="message">渠道合伙人</text>
							</view>
							<view class="listviewitemleft listviewitemright">
								<text class="shuzhi"></text>
								<uni-icons type="arrowright" size="20" color="#999999" class="righticon"></uni-icons>
							</view>
						</view>
						<view class="listviewitem1" style="background-color: transparent;" @tap="goyaoqingma">
							<view class="listviewitemleft">
								<image src="../../static/mine/grywdyqm_icon@2x.png" class="icon"></image>
							</view>
							<view class="listviewitemleft">
								<text class="message">我的邀请码</text>
							</view>
							<view class="listviewitemleft listviewitemright">
								<text class="shuzhi">{{user.inviteCode}}</text>
								<uni-icons type="arrowright" size="20" color="#999999" class="righticon"></uni-icons>
							</view>
						</view>
					</view>
					
					<view style="height: 30rpx;"></view>
					<view class="listviewitem" style="height:360rpx;margin-bottom:20rpx;">
						<view class="listviewitem1 borderbottom" style="background-color: transparent;" @tap="goshiming"> 
							<view class="listviewitemleft">
								<image src="../../static/mine/grysm_icon@2x.png" class="icon"></image>
							</view>
							<view class="listviewitemleft">
								<text class="message">实名认证</text>
							</view>
							<view class="listviewitemleft listviewitemright">
								<text class="shuzhi"></text>
								<uni-icons type="arrowright" size="20" color="#999999" class="righticon"></uni-icons>
							</view>
						</view>
						<view class="listviewitem1 borderbottom" style="background-color: transparent;" @tap="gobangzhu">
							<view class="listviewitemleft">
								<image src="../../static/mine/grybzzx_icon@2x.png" class="icon"></image>
							</view>
							<view class="listviewitemleft">
								<text class="message">帮助中心</text>
							</view>
							<view class="listviewitemleft listviewitemright">
								<text class="shuzhi"></text>
								<uni-icons type="arrowright" size="20" color="#999999" class="righticon"></uni-icons>
							</view>
						</view>
						<view class="listviewitem1 borderbottom" style="background-color:#FFFFFF;" @tap="checkVersion">
							<view class="listviewitemleft">
								<image src="../../static/mine/updateApp.png" class="updateicon"></image>
							</view>
							<view class="listviewitemleft">
								<text class="message">检查更新</text>
							</view>
							<view class="listviewitemleft listviewitemright">
								<text class="shuzhi">{{version}}</text>
								<uni-icons type="arrowright" size="20" color="#999999" class="righticon"></uni-icons>
							</view>
						</view>
						
						<view class="listviewitem1 borderbottom" style="background-color:#FFFFFF;" @tap="gotoMarket">
							<view class="listviewitemleft">
								<image src="../../static/mine/goMarket.png" class="updateicon"></image>
							</view>
							<view class="listviewitemleft">
								<text class="message">去评价</text>
							</view>
							<view class="listviewitemleft listviewitemright">
								<uni-icons type="arrowright" size="20" color="#999999" class="righticon"></uni-icons>
							</view>
						</view>
						<view class="listviewitem1 borderbottom" style="background-color:#FFFFFF;" @tap="goset">
							<view class="listviewitemleft">
								<image src="../../static/mine/setup.png" class="updateicon"></image>
							</view>
							<view class="listviewitemleft">
								<text class="message">设置</text>
							</view>
							<view class="listviewitemleft listviewitemright">
								<uni-icons type="arrowright" size="20" color="#999999" class="righticon"></uni-icons>
							</view>
						</view>
						<view class="listviewitem1" style="background-color:#FFFFFF;" @tap="toFeedback">
							<view class="listviewitemleft">
								<image src="../../static/mine/feedBack.png" class="updateicon"></image>
							</view>
							<view class="listviewitemleft">
								<text class="message">意见反馈</text>
							</view>
							<view class="listviewitemleft listviewitemright">
								<uni-icons type="arrowright" size="20" color="#999999" class="righticon"></uni-icons>
							</view>
						</view>
					</view>
				</view>
				
				<view style="width: 750rpx;margin:25rpx 0;">
					<ad :adpid="adpid" @close="onclose" @error="onerror"></ad>
				</view>
				<!-- adpid="1111111111" 此广告位标识仅在HBuilderX标准基座中有效，仅用于测试 -->
				<!-- 广告后台申请的广告位(adpid)需要自定义基座/云打包/本地打包后生效 -->
				
			<!-- </view> -->
		<!-- </scroll-view> -->
	</view>
</template>

<script>
	export { default } from "./mine.js";
</script>

<style>
	@import url("./mine.css");
</style>
