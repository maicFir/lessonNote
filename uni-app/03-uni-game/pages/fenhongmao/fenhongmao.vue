<template>
	<view>
		<view class="bgbox">
			<view @click="echarts.onClick" :prop="option" :change:prop="echarts.updateEcharts" id="echarts" class="echarts"></view>
			<view class="yuanjiao"></view>
		</view>
		<view class="jinbubox">
			<image src="../../static/mine/qqfhm_img@2x.png" class="image"></image>
			<view class="jindu">
				<view class="wenzi">
					<text style="color: #333333;font-size: 30rpx;margin-right: 10rpx;">我的金色招财猫</text>
					<uni-icons type="help" size="18" color="#999999" class="righticon" @tap="fenhongmao"></uni-icons>
					<text style="float: right;color: #FF714D;font-size: 30rpx;">{{jindu}}%</text>
				</view>
				<view class="progress-box">
					<view class="progress" :style="{width: jindu*4.9+'rpx'}"></view>
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 50rpx;"></view>
		<view style="padding-left: 50rpx;box-sizing: border-box;color: #333333;font-size: 35rpx;font-weight: 700;">提升进度早分红</view>
		<view class="yaoqing" @tap="share">
			<image src="../../static/mine/yqhb_img@2x.png" class="image"></image>
		</view>
		<view class="tisheng" @tap="back">
			<image src="../../static/mine/tshyd_icon@2x.png" class="image"></image>
		</view>
		
		<uni-popup ref="popup" type="center">
			<view class="dialog">
				<view style="width: 100%;height: 75rpx;box-sizing: border-box;line-height: 75rpx;">
					<uni-icons type="closeempty" size="30" color="#999999" class="closeicon" @tap="close"></uni-icons>
				</view>
				<view class="title">我的金色招财猫</view>
				<view class="biaoti">一、金色招财猫获取途径</view>
				<view class="content">1. 必得招财猫进度达到100%</view>
				<view class="content">2. 五只猫合成必定获得</view>
				<view class="content">3. 通过两只37级猫合成随机产出</view>
				<view class="biaoti">二、必得金色招财猫</view>
				<view class="content">1. 必得招财猫进度达到100%</view>
				<view class="content">2. 五只猫合成必定获得</view>
				<view class="content">3. 通过两只37级猫合成随机产出</view>
				<view class="queding animate__animated"  hover-class="animate__pulse" @tap="close">确定</view>
			</view>
		</uni-popup>
	</view>
</template>


<script>
	export { default } from "./fenhongmao.js";
</script>

<script module="echarts" lang="renderjs">
	let myChart
	export default {
		mounted() {
			if (typeof window.echarts === 'function') {
				this.initEcharts()
			} else {
				// 动态引入较大类库避免影响页面展示
				const script = document.createElement('script')
				// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
				script.src = 'static/echarts.js'
				script.onload = this.initEcharts.bind(this)
				document.head.appendChild(script)
			}
		},
		methods: {
			initEcharts() {
				myChart = echarts.init(document.getElementById('echarts'))
				// 观测更新的数据在 view 层可以直接访问到
				myChart.setOption(this.option)
			},
			updateEcharts(newValue, oldValue, ownerInstance, instance) {
				// 监听 service 层数据变更
				myChart.setOption(newValue)
			},
			onClick(event, ownerInstance) {
				// 调用 service 层的方法
				ownerInstance.callMethod('onViewClick', {
					test: 'test'
				})
			}
		}
	}
</script>


<style>
	@import url("./fenhongmao.css");
</style>
