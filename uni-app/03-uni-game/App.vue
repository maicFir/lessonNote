<script>
	import updateVersion from '@/uni_modules/uni-upgrade-center-app/utils/check-update'
	export default {
		data() {
			return {
				timer: null,
				token: null,
				uid: null,
				show:true
			}
		},
		onLaunch: function() {
			console.log('App Launch')
			// #ifdef APP-PLUS
			// 一键登录预登陆，可以显著提高登录速度
			uni.preLogin({
				provider: 'univerify',
				success: (res) => {
					console.log("preLogin success: ", res);
				},
				fail: (err) => {
					console.log(err.metadata.msg ||err.metadata.error_data);
					/* uni.showModal({
						content: err.metadata.msg ||err.metadata.error_data ,
						showCancel: false
					}); */
				}
			})
			plus.screen.lockOrientation('portrait-primary');
			console.log("plus.runtime.appid=========================: ",plus.runtime.appid);
			// #endif
			this.onlinetime()
			updateVersion()
		},
		onShow: function() {
			console.log('App Show')
			this.show = true
		},
		onHide: function() {
			console.log('App Hide')
			this.show = false
		},
		methods:{
			onlinetime() {
				var self = this
				if (this.timer == null) {
					this.timer = setInterval(function() {
						if(self.show){
							self.token = uni.getStorageSync('token');
							self.uid = uni.getStorageSync('uid');
							console.log(self.token)
							uniCloud.callFunction({
								name: 'hallctrl',
								data: {
									action: "hall/onlinetime",
									data: {
										uid: self.uid,
										uniIdToken: self.token
									}
								}
							}).then((res) => {
								console.log("在线时间", res)
							}).catch((err) => {
										
							})
						}
					}, 60000)
				}
			},
		}
	}
</script>

<style>
	/*每个页面公共css */
	
	/* #ifndef APP-NVUE */
	@import './common/animate.css';
	/* #endif */
	
	.row-div,.row-between,.column-div,.column-start{
		align-items: center;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
	}
	
	.row-div{
		flex-direction: row;
		justify-content: center;
	}
	
	.row-between{
		flex-direction: row;
		justify-content: space-between;
	}
	
	.column-div{
		flex-direction: column;
		justify-content: center;
	}
	
	.column-start{
		flex-direction: column;
		justify-content: flex-start;
	}
</style>
