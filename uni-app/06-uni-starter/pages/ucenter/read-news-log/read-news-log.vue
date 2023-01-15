<template>
	<view class="container">
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}" :where="udbWhere"
			collection="opendb-news-articles" @load="isLoading == false" @error="isLoading == false"
			field="title,_id" :page-size="10">
			<uni-list>
				<uni-list-item v-for="(item, index) in data" :key="index" :clickable="true"
					@click="handleItemClick(item)">
					<template v-slot:body>
						<view class="item">
							<text>{{item.title}}</text>
							<uni-dateformat class="article-date" :date="readNewsLog[index].last_time" format="yyyy-MM-dd hh:mm"
								:threshold="[0, 0]" />
						</view>
					</template>
				</uni-list-item>
			</uni-list>
			<uni-load-state @networkResume="refreshData" :state="{data,pagination,hasMore, loading, error}"></uni-load-state>
		</unicloud-db>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isLoading: true,
				loadMore: {
					contentdown: '',
					contentrefresh: '',
					contentnomore: '',
				},
				readNewsLog:[],
				udbWhere:''
			}
		},
		onLoad() {
			this.readNewsLog = uni.getStorageSync('readNewsLog')||[];
			let readNewsLogIds = this.readNewsLog.map(({article_id})=>article_id)
			console.log(typeof readNewsLogIds,readNewsLogIds);
			this.udbWhere = `"_id" in ${JSON.stringify(readNewsLogIds)}`
			uni.setNavigationBarTitle({
				title: this.$t('newsLog.navigationBarTitle')
			})
		},
		onPullDownRefresh() {
			this.refreshData();
		},
		onReachBottom() {
			this.$refs.udb.loadMore()
		},
		methods: {
			refreshData() {
				this.$refs.udb.loadData({
					clear: true
				}, (res) => {
					console.log(res);
					uni.stopPullDownRefresh()
				})
			},
			handleItemClick(item) {
				console.log(item);
				uni.navigateTo({
					url: '/pages/list/detail?id=' + item._id + '&title=' + item.title
				})
			}
		}
	}
</script>

<style>
	.item{
		display: flex;
		flex-direction: column;
	}
	.article-date {
		color: #C8C7CC;
	}
</style>
