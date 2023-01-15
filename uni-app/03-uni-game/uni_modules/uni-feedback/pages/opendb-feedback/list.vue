<template>
	<view class="container">
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}" collection="opendb-feedback"
			field="imgs,contact,mobile,content,create_date,is_reply,reply_content,user_id"
			where='user_id==$cloudEnv_uid' orderby="create_date desc" >
			<view v-if="error">{{error.message}}</view>
			<view v-else-if="data" :class="data.length != 0?'dataBox':''">
				<view class="infobox" v-for="(item, index) in data" :key="index" v-if="data.length != 0">
					<view class="userInfobox">
						<view class="userInfo">
							<view class="title">留言内容：{{item.content}}</view>
							<view class="imgBox">
								<image v-for="(img,imgIndex) in item.imgs" :key="imgIndex" :src="img.url"
									mode="aspectFill" class="img" @click="toPreviewImage(item.imgs,imgIndex)">
								</image>
							</view>
							<view v-if="item.reply_content" class="titleReply">回复内容：{{item.reply_content}}</view>
						</view>
						<view v-if="item.is_reply" class="auth">已回复</view>
						<view v-else class="auth" style="color: #222;">未回复</view>
					</view>
					<view class="time">
						<uni-dateformat :date="item.create_date" :threshold="[0, 0]" />
					</view>
				</view>
			</view>
			<uni-load-more :status="loading?'loading':(hasMore ? 'more' : 'noMore')"></uni-load-more>
		</unicloud-db>
		<uni-fab ref="fab" :pattern="pattern" horizontal="right" vertical="bottom" :pop-menu="false" @fabClick="fabClick" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadMore: {
					contentdown: '',
					contentrefresh: '',
					contentnomore: ''
				},
				dataList:[],
				pattern: {
					backgroundColor: '#ed7855',
					selectedColor: '#ed7855',
					buttonColor: '#ed7855',
					iconColor: '#fff'
				},
			}
		},
		onPullDownRefresh() {
			this.$refs.udb.loadData({
				clear: true
			}, () => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			this.$refs.udb.loadMore()
		},
		filters: {
			timeStamp: function(value) {
				//具体到时分秒
				if (!value) return '';
				// value = value * 1000;
				var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var year = date.getFullYear();
				var month = ('0' + (date.getMonth() + 1)).slice(-2);
				var sdate = ('0' + date.getDate()).slice(-2);
				var hour = ('0' + date.getHours()).slice(-2);
				var minute = ('0' + date.getMinutes()).slice(-2);
				var second = ('0' + date.getSeconds()).slice(-2);
				// 拼接
				var result = year + '-' + month + '-' + sdate + ' ' + hour + ':' + minute + ':' + second;
				// 返回
				return result;
			}
		},
		methods: {
			toPreviewImage(imgs,index) {
				let imgList = []
				imgs.forEach(i => {
					imgList.push(i.url)
				})
				// 预览图片
				uni.previewImage({
					current: index,
					urls: imgList
				});
			},
			handleItemClick(id) {
				uni.navigateTo({
					url: './detail?id=' + id
				})
			},
			fabClick() {
				console.log('add-');
				// 打开新增页面
				uni.navigateTo({
					url: './opendb-feedback',
					events: {
						// 监听新增数据成功后, 刷新当前页面数据
						refreshData: () => {
							this.$refs.udb.loadData({
								clear: true
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #F5F5F5;
	}
	.container{
		width:750rpx;
		height: 100vh;
		background-color: #F5F5F5;
	}
	.dataBox {
		padding-top: 20rpx;
	}

	.infobox {
		display: flex;
		flex-direction: column;
		width:660rpx;
		height: auto;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		padding: 20rpx;
		margin: 0 auto;
		margin-bottom: 20rpx;
	}

	.userInfo {
		display: flex;
		flex-direction: column;
		flex: 1;
		margin-right: 20rpx;
	}

	.userInfobox {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.avatar {
		width: 60px;
		height: 60px;
		border-radius: 100px;
	}

	.imgBox {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		align-items: center;
	}
	.img{
		width:60px;
		height: 60px;
		margin-right:10px;
		margin-top: 10px;
	}

	.title {
		font-size: 32rpx;
		flex: 1;
		color: #222;
	}

	.titleReply {
		font-size: 32rpx;
		color: #ad7322;
		margin-top: 20rpx;
	}

	.auth {
		text-align: right;
		color: #ed7855;
		font-weight: bold;
	}

	.time {
		color: #999999;
		font-size: 14px;
		margin-top: 20rpx;
	}

	.wuxiaoxi {
		display: flex;
		justify-content: center;
	}

	.wenzi {
		font-size: 30rpx;
		line-height: 60px;
		color: #666666;
	}
</style>
