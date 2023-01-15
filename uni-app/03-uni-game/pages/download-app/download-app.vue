<template>
	<view class="about">
		<view class="box">
			<image class="logoImg" :src="about.logo"></image>
			<text class="tip appName">{{about.appName}}</text>
			<text class="tip">{{about.slogan}}</text>
			<view @click="download" type="default" id="download">
				<image v-if="isIos" class="icon" src="@/static/h5/download-app/ios.png" mode="widthFix"></image>
				<image v-else class="icon" src="@/static/h5/download-app/android.png" mode="widthFix"></image>
				<text class="download-text">下载</text>
			</view>
			<text class="tip">version {{version}}</text>
		</view>
		<view class="copyright">
			<text class="hint">{{about.company}}</text>
		</view>
		<view class="mask" v-if="showMask">
			<image src="@/static/h5/download-app/openImg.png" mode="widthFix"></image>
		</view>
	</view>
</template>
<script>
	import Globalunit from "../../common/globalunit.js";
	export default {
		computed: {},
		data() {
			return {
				about: Globalunit.about,
				code: "",
				isIos: "",
				showMask: false,
				downloadUrl: false,
				version: "1.0.0"
			};
		},
		created() {
			this.year = (new Date).getFullYear()

			//判断是否在微信中打开
			var userAgent = navigator.userAgent;

			var ua = userAgent.toLowerCase();
			this.isWeixin = ua.indexOf('micromessenger') != -1;
			if (this.isWeixin) {
				//执行逻辑
			} else {
				//执行逻辑
			}
			//判断是否在ios或者安卓打开
			this.isIos = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

			uni.showLoading();
			const db = uniCloud.database();
			// console.log(`"${this.isIos?'iOS':'Android'}" in platform && type == "native_app"`);

			db.collection('opendb-app-versions')
				.where(`"${this.isIos?'iOS':'Android'}" in platform && type == "native_app"`)
				.orderBy('create_date desc')
				.get({
					getOne: true
				})
				.then(res => {
					uni.hideLoading()
					console.log(res, "downloadUrl---------");

					if (res.result.code === 0) {
						uniCloud.getTempFileURL({
							fileList: [res.result.data.url]
						}).then(res => {
							console.log("res: ",res);
							this.downloadUrl = res.fileList[0].tempFileURL
						});
						this.version = res.result.data.version
					}

					// this.downloadUrl = res.result.data.url
					
				}).catch(err => {
					console.error(err)
				})

		},
		onLoad({
			code
		}) {
			this.code = code || '123456'
		},
		methods: {
			download() {
				if (this.code) {
					uni.setClipboardData({
						data: this.code,
						complete: (e) => {
							console.log(e);
							// uni.showToast({
							// 	title: JSON.stringify(e),
							// 	icon: 'none'
							// });
							uni.hideToast()
							/* 以下临时解决setClipboardData h5端样式和键盘弹出端错误解决方案，后续会直接内置*/
							document.getElementById("#clipboard").style.top = '-999px';
							uni.hideKeyboard()
						}
					})
				}

				if (this.isIos) {
					window.location.href = this.downloadUrl
				} else {
					if (this.isWeixin) {
						//显示浮层
						this.showMask = true
					} else {
						window.location.href = this.downloadUrl
					}
				}
			}
		}
	}
</script>
<style lang="scss">
	view,
	scroll-view,
	text,
	image,
	switch,
	navigator,
	icons {
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
	}

	scroll-view {
		-webkit-overflow-scrolling: touch;
	}

	.about {
		width: 750rpx;
		flex-direction: column;
	}

	.box {
		margin-top: 100px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.logoImg {
		margin-bottom: 10upx;
		width: 160upx;
		height: 160upx;
		border-radius: 15px;
	}

	.tip {
		font-size: 24rpx;
		margin-top: 10px;
	}

	.appName {
		margin-top: 20px;
		font-size: 42rpx;
		font-weight: 500;
	}

	.copyright {
		width: 750upx;
		font-size: 32rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		bottom: 20px;
		left: 0;
		position: fixed;
	}

	.hint {
		color: #999999;
		font-size: 26rpx;
	}

	.icon {
		width: 34rpx;
	}

	#download {
		background-color: #2A9839;
		color: #FFFFFF;
		margin: 55rpx;
		padding: 5px;
		width: 200rpx;
		border-radius: 100px;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}

	.download-text {
		font-size: 32rpx;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 750rpx;
		height: 100vh;
		flex-direction: row;
		justify-content: flex-end;
		background-color: rgba(0, 0, 0, 0.6);
	}

	.mask image {
		width: 600rpx;
	}
</style>
