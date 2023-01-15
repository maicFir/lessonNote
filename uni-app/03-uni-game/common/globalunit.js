class Globalunit{
	constructor() {
		this.downloadurl = "https://static-76586474-6a55-40d8-acf3-2f62ed4ec503.bspapp.com/publish/index.html";
		//分享地址来自于admin管理后台--》升级中心--》制作统一发布页--》填写信息，保存后下载index.html，将此文件上传至前端网页托管，获得链接填在此处
		//http://m3w.cn/mmcz
		//https://static-76586474-6a55-40d8-acf3-2f62ed4ec503.bspapp.com/publish/index.html

		
		//裂变分享功能需配置以下几项
		//分销裂变下载页的域名，格式为：https://xxxxxx.com/appdownload 或 https://xxxxxx.com，appdownload为在manifes.json--》H5配置--》运行的基础路径
		this.domainName = "https://static-05532797-e22b-48c2-a58f-f4790d235bbe.bspapp.com/appdownload"; //分销裂变下载页的域名
		this.appName = "萌猫成长"
		this.share = {
			title:"萌猫成长",
			summary:"萌猫成长是一款趣味合成类网赚游戏。",
			imageUrl:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3469aac7-a663-4c5d-8ee8-94275f8c09ab/dd2dbbe8-a716-4aaa-a7c4-07aabf62504f.png"
		}
		//下载页面信息
		this.about = {
			logo:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3469aac7-a663-4c5d-8ee8-94275f8c09ab/dd2dbbe8-a716-4aaa-a7c4-07aabf62504f.png",
			appName:"萌猫成长",
			slogan:"趣味合成类网赚游戏",
			company:"数字天堂（北京）网络技术有限公司"
		}
		//裂变分享功能需配置以上几项
		
		
		this.iosMarketId = "id1566509933";//appStore下载地址最后id
		// this.androidMarketId = "io.dcloud.hellouniapp";//Android上架应用市场应用的包名
		this.androidMarketUrl = "http://zhushou.360.cn/detail/index/soft_id/4593867";//Android上架应用市场详情页链接
		
		this.interstitialAdpid = "1111111113";// 插屏广告测试广告位 ：1111111113，仅用于HBuilderX标准基座真机运行测试，不会产生真实收益。
		this.bannerAdpid = "1111111111"; // 我的页面、喵喵团页面，信息流测试广告位：1111111111，仅用于HBuilderX标准基座真机运行测试，不会产生真实收益。
	}
}
export default new Globalunit()