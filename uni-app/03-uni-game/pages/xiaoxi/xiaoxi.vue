<template>
	<view>
		<!-- https://uniapp.dcloud.net.cn/uniCloud/uni-clientdb-component -->
		<!-- <uni-clientdb v-slot:default="{data, loading, error, options}" collection="table1" field="field1" :getone="true" where="id=='1'">
		  <view>
		    {{ data.name}}
		  </view>
		</uni-clientdb> -->
		<view class="bgimagebox">
			<image src="../../static/mine/txcgymzs_img@2x.png" mode="widthFix" class="bgimage"></image>
		</view>
		
		
		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" orderby="createtime desc" collection="withdrawrecord_log" :where="where" field="" @load="load" @error="error">
			<!-- :where="'status==1&&uid=='+uid" -->
			<view>
				<view class="messagebox" v-for="(item,index) in data" v-if="data.length!=0" :key="index">
					<view class="timebox">{{item.createtime |timeStamp}}</view>
					<view class="xinxi">
						<image src="../../static/mine/zhuangshisx_img.png" mode="widthFix" class="image"></image>
						<view class="tishi">{{getmsg(item.status)}}</view>
						<view class="miaoshu" v-if="item.status==1">您提现的￥{{item.count}}元提现成功，扣除手续费实际到账￥{{item.count-item.commission}}元。请在{{item.type == 'weixin'?'微信零钱中':'支付宝账单中'}}查看。</view>
						<view class="miaoshu" v-if="item.status==0">您提现的￥{{item.count}}元正在审核中</view>
                        <view class="miaoshu" v-if="item.status==2">您提现的￥{{item.count}}元<span v-if="item.msg!=''">因{{item.msg}}而</span>被拒绝</view>
                        <view class="miaoshu" v-if="item.status==3">您提现的￥{{item.count}}元正在打款中</view>
					</view>
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
	export { default } from "./xiaoxi.js";
</script>

<style>
	@import url("./xiaoxi.css");
</style>
