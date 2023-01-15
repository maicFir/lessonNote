## 正式商用部署流程


前端基于uni-app开发，后端基于[uniCloud](https://uniapp.dcloud.net.cn/uniCloud/README)开发

整个网赚合成游戏，有2个项目，复用同一个uniCloud空间。一个项目是App端，另一个项目是管理端。

管理端面向开发商的运营人员使用，设置游戏参数，查看玩家日志，审批提现等，**admin管理后台是另外插件**，另见：[https://ext.dcloud.net.cn/plugin?id=4102](https://ext.dcloud.net.cn/plugin?id=4102)。




### 准备工作

网赚游戏投入运营前，需完成如下准备工作：

首先确定App的应用名称、包名、证书，后续在各个三方服务申请时，都需要包名和证书摘要。并且注意在HBuilderX中打包时，必须使用相同的包名和证书。

应用名称在`manifest`里设置，注意不要包含“游戏”字样，否则上架应用商店时可能会被要求提供游戏版号。请以应用的名义上架。

- 申请软件著作权：开通广告必须要求软著。加入DCloud软著优惠加急申请QQ专用群：893532138
- 申请uniAD：开通增强广告，申请激励视频的广告位，详见[uniAD官网](https://uniad.dcloud.net.cn)
- 申请一键登录：在 `manifest.json` -> `App模块配置` -> `OAuth（登录鉴权）`-> `一键登录`，点击后面的`开通配置`，在打开的web页面，同意协议，并点击充值按钮充值。添加应用（需要配置Android 包名和IOS BundleId ），充值。如果你已经确定包名，则可以在web界面点击“添加应用”，提交审核。这个是正式打包必须的。[一键登录开通指南](https://ask.dcloud.net.cn/article/37965)
- 申请微信登录：在微信开放平台申请，用于微信登录、微信分享。[微信开放平台](https://open.weixin.qq.com/)
- 提现方式有两种选择：微信企业付款到零钱和个人支付宝批量转账方式。**暂时无法开通微信商户支付的用户可选择个人支付宝方式转账**。选择微信提现方式，需要申请微信提现：用于将网赚激励直接打款到手机用户的微信零钱中。在微信商户平台申请，需要完成企业资质认证，在产品中心，开通企业付款到零钱功能：微信官方要求需要有90天注册时长，近30天连续业务流水，并状态良好的账号方可开通。[微信支付商户平台](https://pay.weixin.qq.com/)。

微信 appid 申请步骤：[https://ask.dcloud.net.cn/article/208](https://ask.dcloud.net.cn/article/208)。

iOS平台微信SDK配置通用链接：[https://ask.dcloud.net.cn/article/36445](https://ask.dcloud.net.cn/article/36445)。



以上业务都有审核周期，请提前处理。


### 开通广告所需条件

1. 开通快手广告：无上架要求，但要提供软著、合作授权书（授权书在uniAD申请后台获取，需要签字盖章上传）
2. 开通优量汇广告：需要上架应用商店和软著（谷歌上架成功后，只可申请开通优量汇广告）
3. 开通穿山甲广告：需要具备公司资质，需要上架和软著（开通优量汇并获取收益7个自然日后，可以开通穿山甲）
4. 互动游戏：已开通优量汇、穿山甲、快手其中一个，即可去uni—AD后台申请开通，需要3-5个工作日才有反馈结果。[互动游戏详见](https://uniapp.dcloud.net.cn/api/a-d/interactive)
5. 开通sigmob：无上架要求，无需软著，仅支持激励视频。在uni-AD后台点击申请，[sigmob打包配置详见](https://uniapp.dcloud.net.cn/api/a-d/rewarded-video?id=manifest)

> 注： Sigmob属于小型广告联盟，收益偏低。如有条件，还需开通优量汇，快手等广告渠道以便提高收益


- 如果没有软著也没有上架，可去uni-ad后台申请开通sigmob广告。
- 如果你已经拿到软著，还未上架应用市场，可去uni-ad后台申请开通快手广告。
- 如果你已上架成功某一家应用市场，去uni-ad官网，先开通优量汇广告，再开通穿山甲广告。
- 已开通优量汇、穿山甲、快手其中一个，即可去uni-AD后台申请开通互动游戏广告位。

网赚游戏开发完成后，需要开通广告，推荐流程为：申请软著 -> 开通快手广告 ->上架应用市场 -> 开通优量汇广告 ->若有公司资质可开通穿山甲广告。






### 配置参数


#### 1. 开通uniCloud

- 开通uniCloud：本项目是云端一体的，它的云端代码需要部署在uniCloud云服务空间里，需要开通uniCloud。在[https://unicloud.dcloud.net.cn/](https://unicloud.dcloud.net.cn/)登录，按云厂商要求进行实名认证。
- 在uniCloud认证通过后，创建一个服务空间给本项目使用。选择阿里云或腾讯云均可。[参考](https://uniapp.dcloud.net.cn/uniCloud/price)
- 使用HBuilderX 3.1以上版本（最好是最新版），把本项目导入到HBuilderX中，在项目根目录uniCloud上点右键菜单，关联服务空间 -> 选择之前创建的服务空间



#### 2. 配置manifest.json


完成如下配置：

- 获取`appid`：基础配置 --》uni-app应用标识（AppID）点击获取
- App图标配置 --》点击浏览，选择此项目根目录下icon.png图标，或选择一张你自己的应用图标，[应用图标配置注意事项](https://ask.dcloud.net.cn/article/35979)
- App模块配置 --> OAuth（登录鉴权）勾选`一键登录`。
- App模块配置 --> OAuth（登录鉴权）--> 勾选`微信登录` --> 填写`appid`、`appsecret`、`ios平台通用链接`。
- App模块配置 --> Share（分享）--> 勾选`微信分享` --> 填写`appid`、如需在iOS平台使用还需要配置通用链接，填写`ios平台通用链接`。
- App模块配置 --> OAuth（登录鉴权）勾选`苹果登录`，[IOS苹果授权登录参考文档](https://ask.dcloud.net.cn/article/36651)。如不发布到Appstore，不需要配置此项
- App常用其他设置  --> 填写关联域Associated Domains  [参考教程](https://ask.dcloud.net.cn/article/36393)。如不发布到Appstore，不需要配置此项
- 如果你已开通互动游戏，打包时需在 `App模块配置` --》 `uni-AD` --》 勾选`互动游戏（变现猫）`。
- 源码视图中 --》 `app-plus` --》 `privacy` 设置`服务协议和隐私政策`弹框，将协议链接替换成你自己的。


#### 3. uni-id配置

在项目目录`uniCloud`--> `cloudfunctions`--> `common`--> `uni-config-center` --> `uni-id`--> `config.json`文件里：

- 一键登录填写`service` --> `univerify`，填写`appid`、`apiKey`和 `apiSecret`。在[DCloud开发者中心](https://dev.dcloud.net.cn/)一键登录基础配置下可查看。
- 微信登录填写`appid` 、`appsecret`, 在微信开放平台查看，[微信开放平台](https://open.weixin.qq.com/)
- 苹果登录需要配置，`app-plus`-->  `oauth`-->  `apple`，填写包名`bundleId`




#### 4. 上传云函数

在`uniCloud` -> `cloudfunctions`目录右键，选择 “上传所有云函数、公共模块及actions”。


#### 5. 配置云函数url化

打开uniCloud控制台 [https://unicloud.dcloud.net.cn/](https://unicloud.dcloud.net.cn/)，找到关联该项目的服务空间进入，点击左侧找到云函数下的云函数列表，点击云函数域名绑定。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/f6269550-614a-11eb-b680-7980c8a877b8.png)

腾讯云，复制默认域名（不含https://）部分。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/f6e3a3c0-614a-11eb-b997-9918a5dda011.jpg)

阿里云，启用域名，复制域名。

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/fa21ded0-614a-11eb-b997-9918a5dda011.jpg)


##### 复制的域名配置在以下两处：

- 在`uniCloud`--> `cloudfunctions`--> `common`--> `globalunit`--> `utils`--> `config`--> `index.js` 里面进行修改，在`data`--> `globalinfo`--> `url` 填写复制的域名，注意不能加http或https，(**阿里云需添加PATH部分的/http，配置格式例如：url："346xxxxxxxxxxxxxxxxxx9ab.bspapp.com/http"**) ，在`globalunit`右键上传公共模块。

- 在`uniCloud`--> `database`--> `db_init.json`文件内，`gameconfig` --> `data` --> `url`填写复制的域名。(**阿里云需添加PATH部分的/http，配置格式例如：url："346xxxxxxxxxxxxxxxxxx9ab.bspapp.com/http"**)


![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/293c10a7-0597-4d7a-83cb-3b7ffe260be9.jpg)


##### 云函数url化配置：
	
本项目需对`hallctrl`、`minectrl`、`teamctrl` 三个云函数url化。

- 阿里云服务空间，配置格式例如：`/http/teamctrl`，目前已默认配置好了，你无需再配置。
- 腾讯云服务空间，则需要分别在以上三个云函数目录下的`package.json`里，更改`cloudfunction-config`下的`path`路径为：/函数名，配置格式例如：`/teamctrl`
- 配置完成后，需要分别上传下云函数。




#### 6. 跨域配置

如运行在iOS上，需解决本地页面跨域问题。

在uniCloud web 控制台跨域配置里添加：localhost:13131

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/a60dd5c0-614e-11eb-8d54-21c4ca4ce5d7.jpg)





#### 7. 提现方式配置


提现方式有两种方式：支付宝个人批量转账和微信企业付款到零钱，可自行按需选择。**暂时无法开通微信商户支付的用户可选择个人支付宝方式转账**



**支付宝方式**


- 提现要求：用户需要在app端，在我的页面完成实名认证，在设置页面完成支付宝账号绑定
- 在网赚游戏前端项目
	- `uniCloud`--》`cloudfunctions`--》`common`--》`globalunit`--》`utils`--》`config`--》`index.js`里搜索一下tixiantype，修改配置`tixiantype`下的 `type：zhifubao`（表示支付宝提现方式），修改完成后，上传云函数。
	- 在`uniCloud`--》`database`--》`db_init.json`里搜索一下`tixiantype`，修改配置`type：zhifubao`（表示支付宝提现方式），修改完成后，重新初始化gameconfig云数据库。
	- 若出现索引提示无法初始化，可在[uniCloud web控制台](https://unicloud.dcloud.net.cn/)云数据库下的`gameconfig`，新增记录。若已存在`"_id": "tixiantype"`记录，修改`"type": "zhifubao"`即可。
```js
{
	"_id": "tixiantype",
	"type": "zhifubao"
}
```
- 提现操作，详见[网赚游戏管理后台](https://ext.dcloud.net.cn/plugin?id=4102)




**微信方式**


- 提现要求：用户需要在app端，在我的页面完成实名认证，在提现页面绑定微信
- 在网赚游戏前端项目
	- `uniCloud`--》`cloudfunctions`--》`common`--》`globalunit`--》`utils`--》`config`--》`index.js`里搜索一下`tixiantype`，修改配置`tixiantype`下的 `type：weixin`（表示微信提现方式），修改完成后，上传云函数。
	- 在`uniCloud`--》`database`--》`db_init.json`里搜索一下`tixiantype`，修改配置`type：weixin`（表示微信提现方式），修改完成后，重新初始化gameconfig云数据库。
	- 若出现索引提示无法初始化，可在[uniCloud web控制台](https://unicloud.dcloud.net.cn/)云数据库下的`gameconfig`，新增记录。若已存在`"_id": "tixiantype"`记录，修改`"type": "weixin"`即可。
```js
{
	"_id": "tixiantype",
	"type": "weixin"
}
```



确保已开通微信支付商户，企业付款到零钱功能。
在项目目录`uniCloud`--》 `cloudfunctions`--》 `common`--》`uni-config-center` --》 `uni-pay` --》`config.json`文件内，配置如下：

```js
	{
		"notify_url":"your notify_url",//notify_url
		"app":{
			"weixin" : {
				"appid" : "wxxxxxxxxxxxxxxx",//公众号id
				"mchid" : "00000000000",//商户id
				"partnerKey" : "xxxxxxxxxxxxxxxxxxxxx"//安全密钥
			}
		}
	}
```



**替换apiclient_cert.p12证书**

微信支付接口中，涉及资金回滚的接口会使用到API证书，包括退款、撤销接口。商家在申请微信支付成功后，收到的相应邮件后，可以按照指引下载API证书，也可以按照以下路径下载：微信商户平台(pay.weixin.qq.com)-->账户中心-->账户设置-->API安全。[更多内容详见](https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=4_3)

将 `minectrl`--> `controller`目录下的`apiclient_cert.p12`和 `uni-admin`--> `controller` 目录下的`apiclient_cert.p12`替换成从你自己微信商户平台下载的API证书。


教程参考，[微信App支付功能申请](https://uniapp.dcloud.net.cn/api/plugins/payment?id=app%e5%b9%b3%e5%8f%b0%e6%94%af%e4%bb%98%e6%b5%81%e7%a8%8b)



对 `uniCloud`--> `cloudfunctions`目录点右键，上传所有云函数及公共模块。




#### 8. 初始化数据库
 
方式一：
- 在项目`uniCloud`目录-->`database`-->`db_init.json`文件，右键选择 “初始化云数据库”。
- 在`database`目录，右键选择 “上传所有数据集合Schema及扩展校验函数”。

方式二：
- 在项目`uniCloud`目录右键，选择“运行云服务空间初始化向导”，点击“下一步”，点击“开始部署”。



#### 9. 广告位配置

**激励视频广告位配置**

现在是默认的激励视频测试广告位，广告位标识（adpid）为：1507000689，仅用于测试，不会产生真实收益。

你需要在[uni-ad系统](https://uniad.dcloud.net.cn/)里申请激励视频广告位，获得广告位ID（即：adpid）。

在项目目录`hybrid`--> `html`--> `index.html`--> `_adpid`， `adpid`：配置激励视频广告位id。

广告后台申请的广告位(adpid)需要自定义基座/云打包/本地打包后生效




**插屏广告位和信息流广告配置**


在项目目录`common`--》 `globalunit.js`，配置如下：

 
 ```html
 
	this.interstitialAdpid = "1111111113";// 插屏广告测试广告位 ：1111111113，仅用于HBuilderX标准基座真机运行测试，不会产生真实收益。
	this.bannerAdpid = "1111111111"; // 我的页面、喵喵团页面，信息流测试广告位：1111111111，仅用于HBuilderX标准基座真机运行测试，不会产生真实收益。
	
```


测试广告位，仅在HBuilderX标准基座中有效，仅用于测试，不会产生收益。

正式商用需要替换成你自己广告后台申请的广告位(adpid)，再自定义基座/云打包/本地打包后生效 


> 注意：未上架的应用，申请开通快手广告后，可申请插屏广告；广点通和穿山甲需要上架后才可开通插屏广告

[详见插屏广告文档](https://uniapp.dcloud.io/api/a-d/interstitial)

教程参考：[uni-AD广告联盟使用指南](https://ask.dcloud.net.cn/article/36769)


#### 10. 激励视频回调配置

激励视频广告可以支持广告服务器到业务服务器的回调，用于业务系统判断是否提供奖励给观看广告的用户。配置服务器回调后，当用户成功看完广告时，广告服务器会访问配置的云函数，通知用户完成观看激励视频。

相对来讲服务器回调将更加安全，可以依赖**广告平台的反作弊机制**来避免用户模拟观看广告完成的事件。[详见](https://uniapp.dcloud.io/api/a-d/rewarded-video?id=callback)


你需要在[uni-ad系统](https://uniad.dcloud.net.cn/)的激励视频广告位，点击**配置激励视频**，出现以下界面，选择服务空间，选择激励视频回调云函数`videocallvack`，保存。


![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-76586474-6a55-40d8-acf3-2f62ed4ec503/4766f8a1-bcaf-43d3-8b6d-282bbe1aa681.jpg)


选择已配置好的广告位，展开可查看到`Security key`，如下：


![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-76586474-6a55-40d8-acf3-2f62ed4ec503/c5cbc783-99cc-4936-924a-c91976c7af87.jpg)


在`uniCloud`--》`cloudfunctions`--》`common` --》`uni-config-center` --》`uni-pay` --》`config.json`文件配置`Security key`如下：

```js

{
	"app": {
		"AD":{
			"securitykey":"XXXXXXXXXXXXXXXXXXXX"//uniad 后台开通激励视频回调后生成的 secret
		}
	}
}
```


在`uni-config-center`目录，右键‘上传公共模块’

#### 11. 互动游戏配置

互动游戏是DCloud联合三方服务商为开发者提供新的广告场景增值服务。

活动场景类型：共抽奖类、游戏类、养成类3种场景类型，开发者可根据自身情况选择。


互动游戏在HBuilder 3.1.16 alpha标准基座支持测试广告位 adpid:` 1042956255 (游戏)`; `1620839118 (抽奖)`; `1064042976 (养成)`，仅用于测试，不会产生收益。
已开通优量汇、穿山甲、快手其中一个，即可去uni—AD后台申请开通互动游戏广告位。


在项目目录`pages`--》 `interactive-ad`--》 `interactive-ad.vue`页面，在`adStatus`--》 `adpid`填写互动广告位。


正式商用需要替换成你自己广告后台申请的广告位(adpid)，再自定义基座/云打包/本地打包后生效 



开通广告步骤：

- 开通广告需在uni-AD广告平台，后台操作：[https://uniad.dcloud.net.cn/](https://uniad.dcloud.net.cn/)
- 申请广告位adpid：在各位后台申请广告位adpid。
- App端打包后生效，打包时必须选择要集成的广告SDK互动游戏(变现猫)，优量汇、穿山甲、快手至少选择其中一个。在`manifest.json`--》 `App配置模块`--》 `uni-AD`--》 勾选`互动游戏（变现猫）`。

说明：
> 申请互动游戏时，可广告位投放入口应用截图，标明入口位置，合作方会针对入口位置设计对应icon图片，格式：仅限jpg/jpeg/png ，大小：1MB以内。
> 
> 如需用合作方提供的图片，删除此项目中的`pages`--》 `interactive-ad`--》 `interactive-ad.vue`页面`adStatus`--》 `imgUrl`图片。
> 
> 此项目中的互动游戏展示图，为游戏界面截图，需要自定义可直接替换。


[更多内容详见互动游戏文档](https://uniapp.dcloud.io/api/a-d/interactive)





#### 12. 配置打开应用市场评价


在项目目录`common`--》 `globalunit.js`里配置`iosMarketId`和`androidMarketId`，如下：


 ```html
	this.iosMarketId = "id123456789";//appStore下载地址最后id
	this.androidMarketId = "xxxxxxxxx";//Android上架应用市场的应用包名
```




#### 13. 隐私政策弹框


根据工业和信息化部关于开展APP侵害用户权益专项整治要求，App提交到应用市场必须满足以下条件：

- 应用启动运行时需弹出隐私政策协议，说明应用采集用户数据
- 应用不能强制要求用户授予权限，即不能“不给权限不让用”
- 如不希望应用启动时申请“读写手机存储”和“访问设备信息”权限，请参考：[https://ask.dcloud.net.cn/article/36549](https://ask.dcloud.net.cn/article/36549)


配置弹出“隐私协议和政策”：在项目的`manifest.json`--》 `源码视图`--》 `app-plus`--》 `privacy` 节点，添加以下代码片段，修改文字内容，替换服务协议和隐私政策链接。保存后**提交云端打包生效**。

```js
	"privacy" : {
		"prompt" : "template",
		"template" : {
			"title" : "服务协议和隐私政策",
			"message" : "  请你务必审慎阅读、充分理解“服务协议”和“隐私政策”各条款，包括但不限于：为了更好的向你提供服务，我们需要收集你的设备标识、操作日志等信息用于分析、优化应用性能。<br/>  你可阅读<a href=\"https://ask.dcloud.net.cn/protocol.html\">《服务协议》</a>和<a href=\"https://ask.dcloud.net.cn/protocol.html\">《隐私政策》</a>了解详细信息。如果你同意，请点击下面按钮开始接受我们的服务。",
			"buttonAccept" : "同意",
			"buttonRefuse" : "暂不同意"
		}
	}
```


[Android平台隐私与政策提示框配置方法](https://ask.dcloud.net.cn/article/36937)

[Android平台 uni-app(5+ app) 应用上架应用市场合规指南](https://ask.dcloud.net.cn/article/39073)

**隐私权政策协议模板**，可参考[Android平台隐私与政策提示框配置方法](https://ask.dcloud.net.cn/article/36937)文章附件。

**不同细分领域的App隐私政策模板**，可参考使用，[APP隐私政策模板](https://docs.getui.com/templet/)



#### 14. 配置分享下载链接

裂变拉新是必要的传播手段，使用直接`uni-portal`统一发布页，一键式生成统一发布页静态页面，更快，更高效的访问。

- 多版本灵活展示，多平台适配，实时线上更新
- 实时生成当前页面二维码，方便手机扫码访问、下载
- 自动判断浏览器环境进行提示，如：在微信浏览器中会引导用户使用相应的浏览器打开

- 插件地址：uni-portal 统一发布页 [https://ext.dcloud.net.cn/plugin?id=7100](https://ext.dcloud.net.cn/plugin?id=7100)
	
1. 在admin管理端--》升级中心--》制作统一发布页--》填写信息，保存后下载index.html，将此文件上传至前端网页托管（为了不与其他冲突，可新建个目录存放），部署完毕后获得链接
2. 在项目目录`common`--》 `globalunit.js`里面修改`downloadurl`下载地址为上一步得到的网址，配置如下：

 ```html
	this.downloadurl = "xxxxxxxx";//分享地址
```



#### 15. 自动绑定上下级关系


通过发送携带专属邀请码的下载页给同伴或用户安装App，能够自动发展下级好友、以及绑定新用户从属关系。


1. 在`common`--》`globalunit.js`文件配置：

```html
	//裂变分享功能需配置以下几项
		this.domainName = ""; //分销裂变下载页的域名
		this.appName = "萌猫成长"//app名称
		this.share = {
			title:"萌猫成长",//分享标题
			summary:"萌猫成长是一款趣味合成类网赚游戏。",//分享描述
			imageUrl:""//缩略图
		}
	//下载页面信息
		this.about = {
			logo:"",//app-logo
			appName:"萌猫成长",//app名称
			slogan:"趣味合成类网赚游戏",//app-slogan
			version:"1.0.0",//app版本号
			company:""//公司名称
		}
```



2. 下载页前端网页托管方式
	- 分开部署到不同服务空间：新建一个服务空间，开通前端网页托管，用于托管邀请好友下载页。不要和admin后台管理部署到同一个前端网页托管，否则会导致覆盖问题。
	- 部署到同一个服务空间：可以使用不同的基础路径来区分，[详见](https://uniapp.dcloud.io/uniCloud/hosting?id=host-uni-app)

3. 在`uniCloud`--》`database`--》`opendb-app-versions.schema.json`，开启读取权限，将read：false改为 **read：true** ，右键'上传此DB schema'

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-3469aac7-a663-4c5d-8ee8-94275f8c09ab/afeff62c-e852-418d-bc06-2ddc7c5a0da6.jpg)

4. 增加应用版本名称和应用版本号信息，打包app成功后，在admin管理后台--》升级中心--》发布新版。

5. 因浏览器跨域问题，发行H5站点时需[uniCloud web控制台](https://unicloud.dcloud.net.cn/)，`跨域配置`配置安全域名，允许该域名跨域访问云函数服务器。

6. 发行分销裂变下载页：点击`发行`--》`上传网站到服务器`--》点`上传`（未开通前端网页托管需要点击`开通托管`，去[uniCloud web控制台](https://unicloud.dcloud.net.cn/)，`前端网页托管`--》`点击开通`）


**注意事项**

- 本项目需要HBuilderX 3.1.22+ 以上版本
- 配置分销裂变下载页的域名：在[uniCloud web控制台](https://unicloud.dcloud.net.cn/)，`前端网页托管`--》`参数配置`，找到默认域名或者配置网站域名，用默认域名（访问次数有限制），上线**一定要配置自己购买的域名**。



#### 16. 更换素材 

如果你需要把猫素材替换成其他内容（例如：兔子、猪等），在项目根目录下`hybrid` --》 `html` --》 `res`  --》 `raw-assets`下修改图片可更换素材。


**登录页替换‘网赚游戏’图片替换**：

- `static` --》`login` --》`logo.png` ，替换此图片，注意此处只替换了登录页的‘网赚游戏’这几个字
- 如果需要替换整张背景图，`static` --》`login` --》`bg.png` ，替换此背景图片，并在 `pages` --》`login` --》`login.vue` 页面删除第4行和第5行的代码。


**首页进度条加载背景图替换**


在项目根目录下`hybrid` --》 `html` --》 `res` --》`raw-assets`--》`07` 内替换首页进度条加载背景图。


**注意：图片名称、格式、尺寸必须和原图片一致**





#### 17. APP云打包

IOS和Android云打包，配置正确的包名，勾选广告，打包。

到此为止就部署完成啦！如果您在部署过程中遇到什么问题，可加入网赚游戏技术交流群，QQ群号：645630288 ，给我们反馈！






## 二次开发

本项目已包含cocos模块，无需申请cocos游戏源码也可部署成功。

如果你需要二开，改动cocos游戏源码，或者获取本项目的图片的psd原图，则需按照以下步骤申请：

-  在[DCloud开发者中心](https://dev.dcloud.net.cn/)，完成账号的企业实名认证。
-  使用在HBuilderX中注册的邮箱，发邮件到uniad@dcloud.io，说明企业是否有此类网赚游戏的成功案例经验做出简单介绍说明，以及公司的具体信息（包含：企业名、法人、联系方式），
-  审核需要3-5个工作日，请耐心等待，会有专人回复邮件，谢谢！




## 上架必看


- 应用名称不要包含“游戏”、“网赚”字样，否则上架应用商店时可能会被要求提供游戏版号，请以应用的名义上架。
- 大部分应用市场，上架需要提供计算机软件著作权证书，软著中应用名称，与提交的应用名称需要一致。
- 各应用市场上架应用资质未达到的，可先上架谷歌Googlplay商店。谷歌上架注意：不要包含广告相关SDK ，否则很容易被驳回或封禁账号
- 谷歌上架成功后，可申请开通优量汇广告，无需提供软著。



**IOS上架注意：**

- 不要提到网赚游戏，看广告有收益等内容，第一版上架建议先**关闭和广告、红包、赚钱、奖励相关内容**，否则审核会因引导用户看广告，大概率被驳回。
- 上架前，若有第三方微信登录，同时也要求提供苹果登录，可自行替换符合苹果登录的规范按钮， [详见Buttons](https://appleid.apple.com/signinwithapple/button)。



开通广告，可选上架应用渠道包括：应用宝、豌豆荚、小米应用商店、魅族应用市场、安智市场、酷安市场、乐商店、4399、Googleplay、华为、9游、vivo、360、oppo、百度应用市场（只能进行优量汇审核）。

> 建议优先上架：360应用市场、应用宝、百度应用市场、豌豆荚、Googleplay

[Android应用市场上架uni-app(5+App)应用合规指南](https://ask.dcloud.net.cn/article/39073)

[苹果App上架App Store注意事项，避免被拒！](https://ask.dcloud.net.cn/article/36312)






## 项目构成



```html

├──uniCloud───────────# 云函数目录
├──── cloudfunctions───────────# 云函数目录
│       └── hallctrl──────────────────# 业务主逻辑函数
│             └── controller──────────────────# 控制层
│                   └── hall.js────────────────────────# 业务主逻辑函数
              └── middleware──────────────────# 中间件层
│                   └── auth.js────────────────────────# 验证token等
│                   └── body.js────────────────────────# 过滤数据等
│             └── node_modules──────────────────# 函数依赖公共模块
│             └── index.js──────────────────────# 函数入口文件
│       └── uni-admin──────────────────# 管理后台主逻辑函数
│             └── controller──────────────────# 控制层
│                   └── admin.js────────────────────────# 业务主逻辑函数
              └── middleware──────────────────# 中间件层
│                   └── auth.js────────────────────────# 验证token等
│                   └── body.js────────────────────────# 过滤数据等
│             └── service────────────────────────# 具体业务层
│             └── node_modules──────────────────# 函数依赖公共模块
│             └── index.js──────────────────────# 函数入口文件
        └── minectrl──────────────────# 我的主逻辑函数
│             └── controller──────────────────# 控制层
│                   └── mine.js────────────────────────# 业务主逻辑函数
              └── middleware──────────────────# 中间件层
│                   └── auth.js────────────────────────# 验证token等
│                   └── body.js────────────────────────# 过滤数据等
│             └── service────────────────────────# 具体业务层
│             └── node_modules──────────────────# 函数依赖公共模块
│             └── index.js──────────────────────# 函数入口文件
        └── teamctrl──────────────────# 团队主逻辑函数
│             └── controller──────────────────# 控制层
│                   └── team.js────────────────────────# 业务主逻辑函数
              └── middleware──────────────────# 中间件层
│                   └── auth.js────────────────────────# 验证token等
│                   └── body.js────────────────────────# 过滤数据等
│             └── node_modules──────────────────# 函数依赖公共模块
│             └── index.js──────────────────────# 函数入口文件
        └── trigger──────────────────# 定时脚本（云函数）
│             └── index.js──────────────────────# 函数入口文件
│       └── common─────────────────# 公共模块
│               └── globalunit──────────────────# 业务操作公共模块
│                       └── logic──────────────────# 业务logic层
│                               └── bidelogic─────────────────# 必得分红
│                               └── bounslogic.js──────────────────# 每小时金币
│                               └── catlogic.js──────────────────# 合成动物逻辑
│                               └── citylogic.js──────────────────# 城市相关
│                               └── dialytasklogic.js──────────────────# 每日任务相关
│                               └── fenhongcatlogic.js──────────────────# 永久分红计算
│                               └── friendacticelogic.js──────────────────# 团队活跃返利
│                               └── roomlogic.js──────────────────# 合成格子逻辑
│                               └── roulettelogic.js──────────────────# 视频次数逻辑
│                               └── storelogic.js──────────────────# 仓库逻辑
│                               └── tasklogic.js──────────────────# 
│                               └── tuijianlogic.js──────────────────# 推荐人逻辑
│                               └── userlogic.js──────────────────# 用户信息相关
│                               └── xscatlogic.js──────────────────# 限时分红相关
│                       └── model──────────────────# 数据模型       
│                       └── utils──────────────────────# 云函数公共类库
├──── database───────────# 数据库集合Schema目录
│       └── db_init.json───────────# 数据库初始化文件，包含数据表和初始化数据
├──common───────────# 前端公共类库
├──compontents───────────# 云函数目录
├──hybrid───────────#  cocos编译后页面
├──pages───────────# 前端页面
│    └── alipay────────────────# 绑定支付宝
│    └── bangzhu───────────────# 帮助
│    └── bangzhuitem───────────# 帮助
│    └── bindphone─────────────# 绑定手机号
│    └── changename────────────# 改昵称
│    └── fenhongjilu───────────# 分红记录
│    └── fenhongmao────────────# 分红猫
│    └── fenhongshouyi─────────# 分红收益
│    └── index─────────────────# 首页
│    └── interactive-ad────────# 数据库初始化文件，包含数据表和初始化数据
│    └── login─────────────────# 登录
│    └── mine──────────────────# 我的
│    └── play──────────────────# xxxx
│    └── qiandao───────────────# 签到
│    └── rewarded-video────────# xxxx
│    └── set───────────────────# 设置
│    └── shejiao───────────────# 社交信息
│    └── shiming───────────────# 实名认证
│    └── shourumingxi──────────# 收入明细
│    └── tixian────────────────# 提现
│    └── tixianjilu────────────# 提现记录
│    └── tuandui───────────────# 团队
│    └── wanfa─────────────────# 玩法
│    └── xiaoxi────────────────# 消息
│    └── xieyi─────────────────# 协议
│    └── yaoqinjilu────────────# 邀请记录
│    └── yaoqingma─────────────# 邀请码

```



## 其他说明

本项目由DCloud委托大连一家外包公司开发，该公司同时承接二开定制工作。如有二开需求，请加QQ群：645630288。

DCloud正在寻找更多行业服务商，开发各种基于uniCloud的项目，如论坛、阅读、短视频.... 由DCloud出资，开发完毕后上架插件市场，然后行业合作伙伴可持续接二开的项目。有意成为uniCloud行业服务商的公司或个人可以联系bd@dcloud.io。[详见](https://ask.dcloud.net.cn/article/38878)

除了网赚游戏外，DCloud还有猜歌游戏[https://ext.dcloud.net.cn/plugin?id=4826](https://ext.dcloud.net.cn/plugin?id=4826)。



## FAQ：常见问题

1. 登录失败问题，请根据以上文档仔细检查各项登录配置。前端的 `login.js `中，打印登录错误回调信息，看具体原因。
2. 首页加载不了，检查云数据库 `gameconfig` 配置中url是否填写正确。查看hallctrl函数运行日志，将日志信息打包发给我们。
3. 新增`uni-config-center`，注意事项：如果你是在`cloudfunctions`右键‘上传所有云函数、公共模块及actions’，需要单独在`cloudfunctions`--》`common`--》`uni-config-center` 目录单独上传一次，右键‘上传公共模块’。
4. 本项目代码可以商用，无需为DCloud付费。但不能把本项目的代码改造用于非uni-app和uniCloud的技术体系。即，不能将后台改成php、java等其他后台，这将违反使用许可协议。
5. 欢迎加入网赚游戏交流群，QQ群号：645630288


