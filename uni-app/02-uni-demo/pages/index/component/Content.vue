<template>
	<view class="content-wrap">
		<!--分类_start-->
		<scroll-view  class="classify" :scroll-x="true">
			<view class="classify-item" v-for="(item, index) in classifyData" :key="index">
				<view class="classify-item-sub" v-for="(sub, sindex) in item" :key="sindex">
					<view>
						<image :src="sub.url" mode="aspectFill"></image>
					</view>
					<view><text>{{sub.text}}</text></view>
				</view>
			</view>
		</scroll-view>
		<!--分类_end-->
		<!--货物分类_start-->
		<view class="goods">
			<view class="item" v-for="(item, index) in goodsList" :key="index">
				<view class="item-wrap" v-for="(subItem, sindex) in item" :key="sindex">
					<view class="item-header">
						<text class="title">{{subItem.text}}</text>
						<text :class="['tag', subItem.tagClass]">{{subItem.tag}}</text>
					</view>
					<view class="item-content">
						<view class="item-lf">
							<image :src="subItem.lf" mode="aspectFill"></image>
						</view>
						<view class="item-rt">
							<image :src="subItem.rl" mode="aspectFill"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!--货物分类_end-->
		<!--商品列表_start-->
		<uni-list class="shop-list" :border="false">
			<uni-list-item v-for="(item, index) in shopData" :key="index">
				<template slot="body">
					<view class="card-item-body">
						<image class="img" :src="item.url" mode="aspectFill"></image>
						<view class="card-item-body-desc">
							<text>{{item.desc}}</text>
						</view>
						<view>
							<text class="prise">￥{{item.prices}}</text>
							<text class="buys">{{item.buys}}+人已购买</text>
						</view>
					</view>
				</template>
			</uni-list-item>
		</uni-list>
		<!--商品列表_end-->
		<!--底部_start-->
		<view class="footer">
			<view class="footer-wrap">
				<view v-for="(item, index) in footerData" :key="index" class="btn">
					{{item.text}}
				</view>
			</view>
			<view class="footer-timer">
				@2023-Web技术学苑
			</view>
		</view>
		<!--底部_end-->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				classifyData: [
					[
						{
							text: "天猫新品",
							url: "//gw.alicdn.com/imgextra/i4/O1CN01XCiY1B1px9ivHkDGm_!!6000000005426-2-tps-183-144.png_q90.jpg_.webp"
						},
						{
							text: "今日爆款",
							url: "//gw.alicdn.com/imgextra/i3/O1CN01FgQFp81spmBXqQMtA_!!6000000005816-2-tps-183-144.png_q90.jpg_.webp"
						},
						{
							text: "天猫国际",
							url: "//gw.alicdn.com/imgextra/i1/O1CN01tsk5OY1q0MUo5PJga_!!6000000005433-2-tps-183-144.png_q90.jpg_.webp"
						},
						{
							text: "飞猪旅行",
							url: "//gw.alicdn.com/imgextra/i2/O1CN01yK3Cxn1sTnAx1fOjq_!!6000000005768-2-tps-183-144.png_q90.jpg_.webp"
						},
						{
							text: "天猫超市",
							url: "//gw.alicdn.com/imgextra/i1/O1CN01iZIGkz1URSOUdRHqS_!!6000000002514-2-tps-183-144.png_q90.jpg_.webp"
						},
						{
							text: "冬奥公益",
							url: "//gw.alicdn.com/imgextra/i4/O1CN01VuRfwH1muSbsJFxoM_!!6000000005014-2-tps-183-144.png_q90.jpg_.webp"
						},{
							text: "淘宝票",
							url: "//gw.alicdn.com/imgextra/i2/O1CN01qrrUAN1wRjrhtfk6Q_!!6000000006305-2-tps-183-144.png_q90.jpg_.webp"
						},
						{
							text: "天猫好房",
							url: "//gw.alicdn.com/imgextra/i3/O1CN01MiunNU1oU0uEKRvja_!!6000000005227-2-tps-183-144.png_q90.jpg_.webp"
						},
					],
					[
						{
							text: "淘宝吃货",
							url: "//gw.alicdn.com/imgextra/i1/O1CN018Ilnep1Qt9ryh1Vue_!!6000000002033-2-tps-183-144.png_q90.jpg_.webp"
						},
						{
							text: "省钱卡",
							url: "//gw.alicdn.com/imgextra/i2/O1CN01gUIFrA1OuPj70aTIW_!!6000000001765-2-tps-183-144.png_q90.jpg_.webp"
						},
						{
							text: "领淘金币",
							url: "//gw.alicdn.com/imgextra/i3/O1CN013WcsZW1jfr4AXnmVl_!!6000000004576-2-tps-183-144.png_q90.jpg_.webp"
						},
						{
							text: "阿里拍卖",
							url: "//gw.alicdn.com/imgextra/i2/O1CN01ZOR1cv1yjGFORGh1V_!!6000000006614-2-tps-183-144.png_q90.jpg_.webp"
						},
						{
							text: "分类",
							url: "//gw.alicdn.com/tfs/TB1WgOmesieb18jSZFvXXaI3FXa-183-144.png_q90.jpg_.webp?getAvatar=1"
						},
						{
							text: "咸鱼",
							url: "//gw.alicdn.com/imgextra/i1/O1CN01rIm4u11F81KogrKz4_!!6000000000441-2-tps-183-144.png_q90.jpg_.webp"
						},
						{
							text: "土货鲜食",
							url: "//gw.alicdn.com/imgextra/i1/O1CN019LbO921EcsOuQqWTM_!!6000000000373-2-tps-183-144.png_q90.jpg_.webp"
						},
						{
							text: "天猫汽车",
							url: "//gw.alicdn.com/imgextra/i4/O1CN01cxU47W1RnUaWavX3f_!!6000000002156-2-tps-183-144.png_q90.jpg_.webp"
						}
					]
				],
				goodsList: [
					[
						{
							text: '聚划算',
							tag: "品牌折扣",
							lf: '//gw.alicdn.com/tps/O1CN01y2pvJj1QCZ62MzJpO_!!6000000001940-0-yinhe.jpg_140x140q90.jpg_.webp',
							rl: '//gw.alicdn.com/tps/O1CN01YYixvu1hlgwUB7cJE_!!6000000004318-0-yinhe.jpg_180x180q90.jpg_.webp',
							tagClass: "jhs"
						},
						{
							text: '有好货',
							tag: "好口碑",
							lf: '//gw.alicdn.com/tps/O1CN01t8hkxx1l7AOFWyMym_!!6000000004771-0-yinhe.jpg_140x140q90.jpg_.webp',
							rl: '//gw.alicdn.com/tps/O1CN01IhbCD928CsXHRBzOP_!!6000000007897-0-yinhe.jpg_180x180q90.jpg_.webp',
							tagClass: "hkb"
						},
					],
					[
						{
							text: "天天特卖",
							tag: "1元秒杀",
							lf: "//gw.alicdn.com/tps/O1CN01sXaXqO1l5KpDBiueI_!!6000000004767-0-yinhe.jpg_140x140q90.jpg_.webp",
							rl: "//gw.alicdn.com/tps/TB1hevqDYj1gK0jSZFOSuw7GpXa.jpg_180x180q90.jpg_.webp",
							tagClass: "tttm"
						},
						{
							text: "每日好店",
							tag: "头条",
							lf: "//gw.alicdn.com/tps/O1CN01UDLq5p1OdTBxWkrJk_!!6000000001728-0-yinhe.jpg_140x140q90.jpg_.webp",
							rl: "//gw.alicdn.com/tps/O1CN018R31ZP1CbNjUG4pee_!!99-0-lubanu.jpg_180x180q90.jpg_.webp",
							tagClass: "mehd"
						},
					]
				],
				shopData: [
					{
						url: "//gw.alicdn.com/bao/uploaded/i1/1902469458/O1CN01tKftX62JjomKrKNl7_!!0-item_pic.jpg_320x320q90.jpg_.webp",
						desc: "欧式纸巾盒客厅轻奢桌面抽纸盒家用创意卫生间茶几收纳盒遥控器",
						prices: 200,
						buys: 100
					},
					{
						url: "//gw.alicdn.com/bao/uploaded/i2/89937985/O1CN01P1rSSX28rBORmKtU5_!!89937985.jpg_320x320q90.jpg_.webp",
						desc: "日本进口陶瓷九谷志野日式清酒杯小酒杯酒具小茶杯白酒盅套装礼盒",
						prices: 200,
						buys: 100
					},
					{
						url: "//gw.alicdn.com/bao/uploaded/i4/TB1G78QIFXXXXaiXXXXXXXXXXXX_!!2-item_pic.png_320x320q90.jpg_.webp",
						desc: "包邮枣木实木鱼肚擀面杖老潼关肉夹馍白吉馍烧饼擀面杖饺子皮厨具",
						prices: 200,
						buys: 100
					}
				],
				footerData: [
					{
						text: "登陆",
						url: ""
					},
					{
						text: "注册",
						url: ""
					},
					{
						text: "手淘App",
						url: ""
					},
					{
						text: "用户反馈",
						url: ""
					}
				]
			}
		}
	}	
</script>

<style lang="scss">
	@mixin tagStyle($bgColor) {
		color: #fff;
		border-radius: 5rpx;
		padding: 0 5rpx;
		background-color: $bgColor;
	}
	@mixin set_width_height($w, $h) {
		width: $w;
		height: $h
	}
	.content-wrap {
		width: 100%;
		.classify {
			margin: 30rpx 0 10rpx;
			padding: 10rpx 0;
			width: 94%;
			height: 320rpx;
			overflow: hidden;
			background-color: #fff;
			border-radius: 30rpx;
			transform: translate(3%,0);
		
			/deep/ .uni-scroll-view {
				-webkit-overflow-scrolling: touch;
				&::-webkit-scrollbar {
					display: none;
				}
			}
			&-item {
					display: flex;
					width:100%;
				&-sub {
					display: flex;
					align-items: center;
					flex-direction: column;
					width: 150rpx;
					font-size:26rpx;
					margin-left: 7rpx;
					image {
						width:134rpx;
						height:104rpx;
					}
				}
			}
		}
		.goods {
			display: flex;
			overflow: hidden;
			background-color: #fff;
			border-radius: 30rpx;
			margin: 20rpx;
			.item {
				flex:1;
				display: flex;
				flex-direction: column;
				padding: 10rpx 0;
				&:first-child, &:last-child {
					.item-wrap {
						&:last-child {
							border-bottom: none;
						}
					}
				}
				&:last-child {
					.item-wrap {
						&:first-child {
							border-right: none;
						}
						&:last-child {
							border-right: none;
						}
					}
				}
				.item-wrap {
					display: flex;
					flex-direction: column;
					border-right: 1px solid #e5e5e5;
					border-bottom: 1px solid #e5e5e5;
					
					.item-header {
						.title {
							font-size: 35rpx;
							color: #111;
							font-weight: bold;
							padding: 25rpx 15rpx;
						}
						.tag {
							font-size: 20rpx;
							&.jhs, &.tttm {
								@include tagStyle(#ff4200);
							}
							&.hkb {
								@include tagStyle(#0090ea);
							}
							&.mehd {
								@include tagStyle(#ff9711);
							}
						}
					}
					.item-content {
						display: flex;
						align-items: center;
						justify-content: space-between;
						.item-lf {
							image {
								@include set_width_height(126rpx, 126rpx);
								margin-left: 20rpx;
							}
						}
						.item-rt {
							align-self: flex-end;
							image {
								@include set_width_height(160rpx, 160rpx);
							}
						}
					}
				}
				
			}
		}
		.shop-list {
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			flex-direction: row;
			flex-wrap: wrap;
			box-sizing: border-box;
			padding: 0 20rpx;
			/deep/ {
				.uni-list-item__container {
					padding: 0;
					
				}
			}
			.card-item-body {
				width:340rpx;
				border-radius: 20rpx;
				padding-bottom: 10rpx;
				&-desc {
					overflow: hidden;
					height: 75rpx;
					padding: 20rpx 10rpx;
				}
				.prise {
					color: #ff5500;
					font-size: 28rpx;
				}
				.buys {
					color: #999;
					padding-left: 10rpx;
					font-size:22rpx;
					
				}
				.img {
					width:100%;
					height: 342rpx;
				}
			}
		}
		.footer {
			background-color: #4e525e;
			.footer-wrap {
				display: flex;
				justify-content: space-around;
				padding: 20rpx 0;
				color: #c3c6ca;
				.btn {
					border: 1px solid #42454d;
					background-color: #555965;
					border-radius: 12rpx;
					padding: 10rpx 34rpx;
					font-size: 20rpx;
				}
			}
			&-timer {
				font-size: 20rpx;
				text-align: center;
				color:#c3c6ca;
				padding-bottom: 20rpx;
			}
		}
	}
	
</style>