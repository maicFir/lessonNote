<template>
	<view class="top-bar-header">
		<view class="top-bar-header-logo"></view>
		<view class="top-bar-header-search">
			<text class="text">寻找宝贝店铺</text>
			<button class="btn">搜索</button>
		</view>
		<view class="top-bar-header-sigin"></view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	$logo: "https://gw.alicdn.com/imgextra/i4/O1CN019XWXNq1aAPOVMYSiu_!!6000000003289-2-tps-167-63.png";
	$singPic: "https://gw.alicdn.com/imgextra/i4/O1CN01ftum4629SHP6bCqTm_!!6000000008066-2-tps-99-99.png";
	.top-bar-header {
		display: flex;
		align-items: center;
		padding: 10rpx 30rpx;
		position: sticky;
		z-index: 1;
		top:0;
		background-color: #f4f4f4;
		&-logo {
			&::before {
				content: "";
				display: block;
				width: 94rpx;
				height: 36rpx;
				background-image: url($logo);
				background-size: cover;
				background-repeat: no-repeat;
			}
		}
		&-search {
			display: flex;
			align-items: center;
			flex:1;
			border: 1px solid #ff5000;
			background-color: #fff;
			height: 60rpx;
			border-radius: 60rpx;
			justify-content: space-between;
			margin: 0 25rpx;
			.text {
				text-indent: 20rpx;
				font-size:20rpx;
				color:#666;
			}
			.btn {
				width:120rpx;
				height: 54rpx;
				line-height: 54rpx;
				border-radius: 27px;
				font-size: 20rpx;
				color: #fff;
				background-color: #FF8D0E;
				margin: 0 2rpx;
			}
		}
		&-sigin {
			&::before {
				content: "";
				display: block;
				width: 56rpx;
				height: 56rpx;
				background: url($singPic) no-repeat;
				background-size: 56rpx 56rpx;
			}
		}
	}
</style>