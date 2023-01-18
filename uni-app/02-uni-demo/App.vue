<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	
page{
	background-color: #f4f4f4;
}
/* #ifdef H5 */
uni-page-head {
	display: none ;
}
/* #endif */

.pages-index-index {
	uni-tabbar {
		.uni-tabbar {
			.uni-tabbar__item {
				&:nth-of-type(2) {
					.uni-tabbar__bd {
						background-color: #FF8D0E;
						border-radius: 50%;
						width: 100rpx;
						height: 100rpx !important;
						img {
							width: 100%;
							height: auto;
							transform: scale(1.5);
						}
					}
				}
			}
		}
	}
}
</style>
