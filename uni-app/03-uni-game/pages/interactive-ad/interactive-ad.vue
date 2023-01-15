<template>
	<view class="content">
		<view class="ad-list flex">
			<view class="flex-06" v-for="(item, index) in adStatus" :key="index">
				<view class="ad-item" @click="showInteractiveAd(index)">
					<image class="ad-icon" v-if="item.imgUrl" :src="item.imgUrl" mode="aspectFill"></image>
					<view class="ad-text">
						<view class="title">{{item.title}}</view>
						<view class="loading" v-if="item.loading">加载中...</view>
						<view class="error" v-if="item.errorMessage">{{item.errorMessage}}</view>
					</view>
				</view>
			</view>
			<view class="flex-06" >
				<view class="ad-item">
					<image class="ad-icon" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3469aac7-a663-4c5d-8ee8-94275f8c09ab/c07eba25-9d4d-42d0-a9f9-8fa65bbf7d38.png" mode="aspectFill"></image>
					<view class="ad-text">
						<view class="title">敬请期待</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '互动广告',
				loading: false,
				adStatus: [{
					provider: "BXM-AD",
					adpid: "1042956255",
					loading: false,
					imgUrl: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3469aac7-a663-4c5d-8ee8-94275f8c09ab/e800e933-a2b4-41bd-bbf3-0d4a3da8fddd.png",
					title: "抽奖小游戏",
					description: "通过合成游戏、成语答题、捕鱼等游戏玩法获得金币或红包奖励",
					errorMessage: ""
				}, {
					provider: "BXM-AD",
					adpid: "1620839118",
					loading: false,
					imgUrl: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3469aac7-a663-4c5d-8ee8-94275f8c09ab/aad6ab1c-5ed8-4b84-8e18-926bf6716246.png",
					title: "答题赢大奖",
					description: "通过转盘、扭蛋、摇骰子等抽奖玩法获得奖品碎片或红包奖励",
					errorMessage: ""
				}, {
					provider: "BXM-AD",
					adpid: "1064042976",
					loading: false,
					imgUrl: "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3469aac7-a663-4c5d-8ee8-94275f8c09ab/1bfecb14-0641-4095-a1b0-4dd1dabd8901.png",
					title: "种水果领奖品",
					description: "果园、农场、养牛等长期活动，用户通过连续签到、道具收集、任务体系等玩法提升养成对象的等级，升级后可获得红包奖励或兑换奖品",
					errorMessage: ""
				}
				]
			}
		},
		onLoad() {
			//  HBuilder adpid: 1042956255 (游戏); 1620839118 (抽奖); 1064042976 (养成)
			this._adInstance = {};
		},
		onReady() {
			this.createInteractiveAd();
		},
		methods: {
			createInteractiveAd() {
				for (let i = 0; i < this.adStatus.length; i++) {
					let {
						provider,
						adpid
					} = this.adStatus[i];
					this._adInstance[i] = uni.createInteractiveAd({
						provider,
						adpid
					});

					this._adInstance[i].onLoad((res) => {
						this.adStatus[i].loading = false;
						// if (res.code === 1) {
						// 	this.adStatus[i].imgUrl = res.imgUrl;
						// }
						console.log(res);
					});
					this._adInstance[i].onError((err) => {
						console.log(err);
						this.adStatus[i].loading = false;
						this.adStatus[i].errorMessage = JSON.stringify(err);
					});
					this.adStatus[i].loading = true
				}
			},
			showInteractiveAd(index) {
				if (this.adStatus[index].loading == true) {
					return;
				}
				this.adStatus[index].loading = true;
				this._adInstance[index].show().then(() => {
					this.adStatus[index].loading = false;
				}).catch((err) => {
					this.adStatus[index].errorMessage = err.message;
					console.log(err.message);
				});
			}
		},
		onUnload() {
			// 页面关闭后销毁实例
			for (let var1 in this._adInstance) {
				let ad = this._adInstance[var1];
				if (ad && ad.destroy) {
					ad.destroy()
				}
			}
		}
	}
</script>

<style>
	page {
		height: 100%;
	}

	.content {
		background-color: #F8F8F8;
		padding-top:20px;
		padding-left: 10px;
		padding-right: 10px;
		height: 100%;
	}

	.flex {
		display: flex;
		flex-wrap: wrap;
	}

	.flex-06 {
		flex: 0 0 50%;
		max-width: 50%;
		/* border: red 1px solid; */
		
	}

	.ad-list {
		display: flex;
		flex-wrap: wrap;
	}

	.ad-item {
		width:318rpx;
		margin-left: 10px;
		margin-right: 10px;
		margin-bottom: 20px;
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0 0 8px #dddddd;
		align-items: center;
		/* border: red 1px solid; */
		background-color:#f97453;
	}

	.ad-icon {
		/* display: block; */
		display: flex;
		width:318rpx;
		height:250px;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		/* margin: 10px; */
		/* border: red 1px solid; */
	}
	.ad-icon-more{
		/* display: block; */
		display: flex;
		width:318rpx;
		height:250px;
		border-radius: 20rpx;
		border: red 1px solid;
	}

	.ad-text {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 5px;
		color:#FFFFFF;
		position: relative;
	}

	.loading {
		/* display: block; */
		display: flex;
		text-align: center;
		position: absolute;
	}

	.title {
		font-size: 14px;
		font-weight: bold;
	}

	.description {
		font-size: 12px;
		margin-top: 4px;
	}

	.error {
		color: red;
		font-size: 12px;
		margin-top: 10px;
	}
</style>
