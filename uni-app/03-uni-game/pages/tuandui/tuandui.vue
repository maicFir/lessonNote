<template>
	<view>
		<view class="top-view"></view>
		<view class="topbox">
			<view class="con_box">
				<view class="messagebox">
					<text class="bann_left_txt1">好友合成喵越多</text>
					<text class="bann_left_txt2">我的收入越高</text>
				</view>
				<view>
					<image class="bann_right_img" src="../../static/tuandui/ttzssr_img.png"></image>
				</view>
			</view>
			<view class="friend_box ">
				<view class="friend_box_top" @tap="yaoqingjilu">
					<view style="float: left;">好友人数：<text class="friend_Num">{{friendcount}}</text> </view>
					<uni-icons type="arrowright" size="18" color="#999999" class="righticon" style="float: right;"></uni-icons>
				</view>
				<view class="friend_box_bot" @tap="goyaoqingma"> <text class="friend_box_bot_txt">邀请好友</text> </view>
			</view>
		</view>
		
		<view class="conbox1">
			<view class="conbox1_top">
				<text class="conbox1_top_left">好友累计给我赚钱</text>
				<view @tap="play" style="float: right;">
					<text class="conbox1_top_right">玩法规则</text>
					<uni-icons type="arrowright" size="12" color="#999999" class="righticon"></uni-icons>
				</view>
			</view>
			<view class="conbox1_cen">
				<view class="conbox1_cen_item">
					<view class="conbox1_cen_item_t"  @tap="shouyimingxi">
						<text class="conbox1_cen_item_t1">{{firendfen}}</text>
						<text class="conbox1_cen_item_t2">元</text>
					</view>
					<view class="conbox1_cen_item_b">
						<text class="conbox1_cen_item_b1"  @tap="shouyimingxi">当前阶段总收入</text>
						<uni-icons type="help" size="16" color="#999999" class="righticon" @tap="jieduanshouyi" style="margin-top: 9rpx;"></uni-icons>
					</view>
				</view>
				<view class="conbox1_cen_Line"></view>
				<view class="conbox1_cen_item">
					<view class="conbox1_cen_item_t"  @tap="shouyimingxi">
						<text class="conbox1_cen_item_t1 font_333">{{mubiao}}</text>
						<text class="conbox1_cen_item_t2 font_333">元</text>
					</view>
					<view class="conbox1_cen_item_b">
						<text class="conbox1_cen_item_b1"  @tap="shouyimingxi">{{stage.name}}x{{beilv}}倍加速</text>
						<uni-icons type="help" size="16" color="#999999" class="righticon" @tap="shouyishuoming" style="margin-top: 9rpx;"></uni-icons>
					</view>
				</view>
			</view>
			<view class="conbox1_bot">
				<view class="conbox1_bot_t">
					<view class="conbox1_bot_t_over" :style="{width: bili*580+'rpx'}"></view>
				</view>
				<view class="conbox1_bot_b">
					<text class="col999Font">已解锁</text>
					<text class="orangeFont" style="margin-right: 5rpx;">{{Math.floor(bili*10000)/100}}%</text>
					<text class="col999Font">解锁后</text>
					<text class="orangeFont">{{mubiao}}</text>
					<text class="col999Font">现金将自动存入钱包</text>
					<text class="orangeFont">×{{beilv}}倍加速</text>
				</view>
			</view>
		</view>
		<view class="conBox2" @tap="shouyimingxi">
			<view style="">
				<text class="conBox2_tit_t1">今日好友给我赚钱</text>
				<text class="conBox2_tit_t2">({{actiovecount}}人活跃)</text>
			</view>
			<view style="position: relative;">
				<view class="conBox2_item_jiasu">
					<image class="conBox2_item_jiasuImg" src="../../static/tuandui/jiasu_img.png"></image>
					<text class="conBox2_item_jiasuImgBeishu">{{beilv}}倍加速</text>
				</view>
				<view class="conBox2_item">
					<view class="row-div conBox2_item_price">
						<text class="conBox2_item_price_t">{{todaytotal}}</text>
						<text class="conBox2_item_price_b">元</text>
					</view>
					<text class="conBox2_item_btxt">合计</text>
				</view>

				<view class="conBox2_item">
					<view class="row-div conBox2_item_price">
						<text class="conBox2_item_price_t col333Font60">{{todayzhitui}}</text>
						<text class="conBox2_item_price_b col333Font24">元</text>
					</view>
					<text class="conBox2_item_btxt">直邀好友贡献</text>
				</view>

				<view class="conBox2_item">
					<view class="row-div conBox2_item_price">
						<text class="conBox2_item_price_t col333Font60">{{todaykuosan}}</text>
						<text class="conBox2_item_price_b col333Font24">元</text>
					</view>
					<text class="conBox2_item_btxt">扩散好友贡献</text>
				</view>
			</view>
		</view>
		<view class="my_yaoqingren_box" v-if="shangjiid!=0">
			<view class="row-between yaoqing_t">
				<text class="yaoqing_tl">我的邀请人</text>
				<view @tap="yaoqingren">
					<text class="yaoqing_tr">联系Ta</text>
					<uni-icons type="arrowright" size="14" color="#999999" class="righticon"></uni-icons>
				</view>

			</view>
			<view class="yaoqing_b">
				<view class="yaoqing_bl">
					<image class="yaoqing_blimg" :src="shangjiavater"></image>
				</view>
				<view class="yaoqing_bt">
					<text class="col999Font1">{{sjuser.nickname.length>20?sjuser.nickname.substring(0,20)+'...':sjuser.nickname}} 邀请了{{shangjifriendcount}}人 累计收益</text>
					<text class="colorangeFont">{{shangjiprofit}}元</text>
				</view>
			</view>
		</view>
		
		<view style="margin: 20rpx 0;width: 750rpx;">
			<ad :adpid="adpid" @close="onclose" @error="onerror"></ad>
		</view>
		<!-- adpid="1111111111" 此广告位标识仅在HBuilderX标准基座中有效，仅用于测试 -->
		<!-- 广告后台申请的广告位(adpid)需要自定义基座/云打包/本地打包后生效 -->
		
		
		
		<!-- </view> -->
		</scroll-view>
		<uni-popup ref="popup" type="center">
			<view class="dialog column-div">
				<view style="width: 550rpx;height:40rpx;box-sizing: border-box;line-height:40rpx;text-align: right;float: right;">
					<uni-icons type="closeempty" size="30" color="#999999" class="closeicon" @tap="close"></uni-icons>
				</view>
				<view class="dialogtitle">我的邀请人</view>
				<view class="dialogavatarbox">
					<image :src="sjuser.avatar" class="dialogavatar"></image>
				</view>
				<view class="dialognamebox">
					<text class="dialognameboxname">Lv.{{sjuser.maxlvl}} {{sjuser.nickname.length>20?sjuser.nickname.substring(0,20)+'...':sjuser.nickname}} </text>
					<image src="../../static/mine/ic_contact@2x.png" class="dialognameboxicon"></image>
				</view>
				<view @click="setClipboardText(sjuser.weixinid,sjuser.qqid)" class="clipboardTextBox">
					<view>
						<view class="dialogText">微信：{{sjuser.weixinid}}</view>
						<view class="dialogText">QQ：{{sjuser.qqid}}</view>
					</view>
					<image src="../../static/mine/qianbao/ic_fuzhi@2x.png" class="fuzhiIcon"></image>
				</view>
				<view class="dialogset" @tap="shejiao">
					<text class="dialogsettitle">我也要设置社交信息</text>
					<uni-icons type="arrowright" size="17" color="#333333" class="righticon"></uni-icons>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="shouyishuoming" type="center">
			<view class="jieduanshouyibox column-div">
				<view style="width: 500rpx;height: 75rpx;box-sizing: border-box;line-height: 75rpx;text-align: right;float: right;">
					<uni-icons type="closeempty" size="30" color="#999999" class="closeicon" @tap="closeshouyishuoming"></uni-icons>
				</view>
				<view class="dialogtitle">阶段目标说明</view>
				<text class="dialogwenzi">1. 阶段目标达成后，资金将划入钱包，可提现；</text>
				<text class="dialogwenzi">2. 所处的阶段越高，额外获得收益越多，当前受益=好友活跃收益*阶段倍率 </text>
				<view class="dialogbutton" @tap="closeshouyishuoming"><text style="color: #FFFFFF;font-size: 30rpx;">确定</text></view>
				<view style="width: 100rpx;height: 40rpx;"></view>
			</view>
		</uni-popup>

		<uni-popup ref="jieduanshouyi" type="center">
			<view class="jieduanshouyibox column-div" style="height: 660rpx;">
				<view style="width: 500rpx;height: 75rpx;box-sizing: border-box;line-height: 75rpx;float: right;text-align: right;">
					<uni-icons type="closeempty" size="30" color="#999999" class="closeicon" @tap="closejieduanshouyi"></uni-icons>
				</view>
				<view class="dialogtitle">当前总收益说明</view>
				<text class="dialogwenzi" style="line-height: 40rpx;">喵喵团收入来源于好友活跃收益。好友活跃收益根据直邀好友，扩散好友的活跃时长、看视频贡献比例、邀请好友数等因素综合计算，直邀好友、扩散好友越多，每天坐享活跃收益越多；1个直邀好友=2个扩散好友</text>
				<view class="dialogbutton" @tap="closejieduanshouyi"><text style="color: #FFFFFF;font-size: 30rpx;">确定</text></view>
				<view style="width: 100rpx;height: 40rpx;"></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export {
		default
	}
	from "./tuandui.js";
</script>

<style>
	@import url("./tuandui.css");
</style>
