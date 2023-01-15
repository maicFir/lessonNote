"use strict";

function merge(dest, src) {
	if (typeof(dest) == "undefined") {
		src = {};
	}
}

function array_merge_recursive_distinct(array1, array2) {
	let merged = array1;

	for (let key in array2) {
		console.log(key, array2[key]);
		if (typeof(array2[key]) == 'object' && typeof(merged[key]) != "undefined" && typeof(merged[key]) == 'object') {
			merged[key] = array_merge_recursive_distinct(merged[key], array2[key]);
		} else {
			if (typeof(array2[key]) == 'object') {
				let obj = $.extend({}, merged[key], array2[key]);
				merged[key] = obj;
			} else {
				merged[key] = array2[key];
			}
		}
	}

	return merged;
}

let GAMECONFIG = {
	config: {},
	loadTime: 1611986779252
}

module.exports = class Config {
	constructor() {
		// ...
	}

	static data() {
		return {
			"GAMENAME": 'gameconfig',
			"fangda": 1000,
			"errmsg": {
				"e10001": '参数错误',
				"e10002": '注册验证码过期',
				"e10003": '手机号已经注册过',
				"e10004": '当前手机号未注册',
				"e10005": '玩家信息不匹配',
				"e10006": '密码错误',
				"e10007": '上级不存在，参数错误',
				"e10008": '账号已冻结',
				"e10009": '不能绑定自己',
				"e10010": '当前手机号已被绑定',
				"e10011": '已经申请,请勿重复申请',
				"e10012": '提现金额不足,请确认',
				"e10013": '验证码错误',
				"e10014": '任务未完成,不能领取奖励',
				"e10015": '未提交申请或申请审核未通过',
				"e10016": '兼职红包已经领取',
				"e10017": '无法领取',
				"e10018": '暂未实名，请在【我的】--【实名认证】中进行认证',
				"e10019": '身份证号码有误',
				"e10020": '取经券不足',
				"e10021": '红包错误',
				"e10022": '邀请券不足',
				"e10023": '支付宝回调错误',
				"e10024": '该已经实名了其他账号',
				"e10025": '金色招财猫不可以存入仓库',
				"e10026": '紫金葫芦经验未满',
				"e10027": '微信授权失败',
				"e10028": '提现金额错误',
				"e10029": '不能设置0和负数',
				"e10030": '领取达到上限',
				"e10031": '不可回收',
				"e10032": '每天只能使用5次邀请券',
				"e10033": '心跳错误',
				"e10034": '提现记录已经审核,请勿重复审核',
				"e10035": '已经签到,请勿重复签到',
				"e10036": '最后一只猫不能回收',
				"e10037": '不符合合成条件',
				"e10038": '视频次数不足',
				"e10039": '不符合领取条件',
				"e10040": '视频次数未用尽,不可以使用邀请券',
				"e10041": '推荐总人数达到100人才可以提交申请',
				"e10042": '微信提现失败',
				"e10043": '不能绑定这个推荐码',
				"e10044": '请重新扫码下载升级App',
				"e10047": '当前人数过多，请稍后再看',
				"e10048": '请求频繁，请稍后重试',
				"e10049": '邀请码设置失败',
				"e10050": '苹果登录校验不通过',
				"e10051": '登录失败',
				"e10052": '请先绑定支付宝，在【我的】--【设置】中进行绑定',
				"e10053": '请先绑定微信',
				"e20001": '位置已满，请合成或者拖入回收箱',
				"e20002": '金币不足',
				"e20003": '不同的猫不能合成',
				"e20004": '猫不存在',
				"e20005": '仓库中的猫的数量不足',
				"e20006": '限时奖励不能领取',
				"e20007": '抽奖次数不够',
				"e20008": '无法补充次数',
				"e20009": '无法购买此等级的猫',
				"e20010": '仓库已满',
				"e30001": '已完成实名认证',
				"e30010": '此账号已注销',
				"e60302": "微信绑定失败，此微信账号已被绑定",
			},
			"globalinfo": {
				"debuginitcoin": 10000000,
				"releaseinitcoin": 10000000,
				"videocoin": "3600", //看视频得多长时间收益  秒
				"storeext": "200", //扩展仓库
				//"storeext":"2",//扩展仓库
				"url": "
fc-mp-041e5b20-8a6d-4b3a-a5bb-f6cddcb881bf.next.bspapp.com/http",
				"initstorecap": 15, //初始化的时候，仓库的容量
				"fenhongcat": 1.5, //分红猫一秒的分红单位为分
				"todayprofit": 100, //每个永久分红的金额
				"templateId": "", //短信模板id
				"videocount": 15//每天看视频次数
			},
			"catinfo": {
				'catmaxid': 38, //猫的最大的ID序号,从1开始
			},
			"cats": {
				"cat1": {
					"huishou": "1",
					"name": "毛球",
					"cal1": "1",
					"cal2": "3",
					"cal3": "4",
					"cal4": "5",
					"fengding": 100,
					"price": "100"
				},
				"cat2": {
					"huishou": "15",
					"name": "球球",
					"cal1": "3",
					"cal2": "6",
					"cal3": "8",
					"cal4": "11",
					"fengding": 95,
					"price": "1500"
				},
				"cat3": {
					"huishou": "67",
					"name": "跑跑",
					"cal1": "7",
					"cal2": "12",
					"cal3": "17",
					"cal4": "24",
					"fengding": 90,
					"price": "6750"
				},
				"cat4": {
					"huishou": "179",
					"name": "水栖",
					"cal1": "15",
					"cal2": "25",
					"cal3": "35",
					"cal4": "48",
					"fengding": 85,
					"price": "17900"
				},
				"cat5": {
					"huishou": "478",
					"name": "掘洞",
					"cal1": "30",
					"cal2": "51",
					"cal3": "71",
					"cal4": "97",
					"fengding": 80,
					"price": "47800"
				},
				"cat6": {
					"huishou": "1262",
					"name": "知羞",
					"cal1": "61",
					"cal2": "103",
					"cal3": "144",
					"cal4": "196",
					"fengding": 75,
					"price": "126200"
				},
				"cat7": {
					"huishou": "3388",
					"name": "沙漠",
					"cal1": "124",
					"cal2": "207",
					"cal3": "290",
					"cal4": "394",
					"fengding": 70,
					"price": "338800"
				},
				"cat8": {
					"huishou": "9013",
					"name": "石窟",
					"cal1": "250",
					"cal2": "417",
					"cal3": "548",
					"cal4": "793",
					"fengding": 65,
					"price": "901300"
				},
				"cat9": {
					"huishou": "24000",
					"name": "草原",
					"cal1": "504",
					"cal2": "840",
					"cal3": "1177",
					"cal4": "1597",
					"fengding": 60,
					"price": "2400000"
				},
				"cat10": {
					"huishou": "63900",
					"name": "沼泽",
					"cal1": "1015",
					"cal2": "1692",
					"cal3": "2369",
					"cal4": "3215",
					"fengding": 55,
					"price": "6390000"
				},
				"cat11": {
					"huishou": "170000",
					"name": "森林",
					"cal1": "2043",
					"cal2": "3405",
					"cal3": "4768",
					"cal4": "6471",
					"fengding": 50,
					"price": "17000000"
				},
				"cat12": {
					"huishou": "453000",
					"name": "山脚",
					"cal1": "4112",
					"cal2": "6854",
					"cal3": "9596",
					"cal4": "13023",
					"fengding": 45,
					"price": "45300000"
				},
				"cat13": {
					"huishou": "1205000",
					"name": "渔夫",
					"cal1": "8276",
					"cal2": "13794",
					"cal3": "19312",
					"cal4": "26210",
					"fengding": 40,
					"price": "120500000"
				},
				"cat14": {
					"huishou": "3200000",
					"name": "猎户",
					"cal1": "16657",
					"cal2": "27762",
					"cal3": "38867",
					"cal4": "52748",
					"fengding": 35,
					"price": "320000000"
				},
				"cat15": {
					"huishou": "8538000",
					"name": "农民",
					"cal1": "33523",
					"cal2": "55872",
					"cal3": "78221",
					"cal4": "106158",
					"fengding": 30,
					"price": "853800000"
				},
				"cat16": {
					"huishou": "23000000",
					"name": "药农",
					"cal1": "67466",
					"cal2": "112444",
					"cal3": "157422",
					"cal4": "213644",
					"fengding": 25,
					"price": "2300000000"
				},
				"cat17": {
					"huishou": "60500000",
					"name": "果农",
					"cal1": "135778",
					"cal2": "226296",
					"cal3": "316815",
					"cal4": "429963",
					"fengding": 20,
					"price": "6050000000"
				},
				"cat18": {
					"huishou": "160000000",
					"name": "驯兽师",
					"cal1": "273255",
					"cal2": "455425",
					"cal3": "637595",
					"cal4": "865308",
					"fengding": 19,
					"price": "16000000000"
				},
				"cat19": {
					"huishou": "430000000",
					"name": "游民",
					"cal1": "549930",
					"cal2": "916551",
					"cal3": "1283200",
					"cal4": "1741400",
					"fengding": 18,
					"price": "43000000000"
				},
				"cat20": {
					"huishou": "1141000000",
					"name": "邮差",
					"cal1": "1106700",
					"cal2": "1884600",
					"cal3": "2582400",
					"cal4": "3504700",
					"fengding": 17,
					"price": "114100000000"
				},
				"cat21": {
					"huishou": "3038000000",
					"name": "店员",
					"cal1": "2227300",
					"cal2": "3712200",
					"cal3": "5197100",
					"cal4": "7053200",
					"fengding": 16,
					"price": "303800000000"
				},
				"cat22": {
					"huishou": "8808000000",
					"name": "领班",
					"cal1": "4482600",
					"cal2": "7470900",
					"cal3": "10459000",
					"cal4": "14195000",
					"fengding": 15,
					"price": "808800000000"
				},
				"cat23": {
					"huishou": "21500000000",
					"name": "漆匠",
					"cal1": "9021200",
					"cal2": "15035000",
					"cal3": "21050000",
					"cal4": "28567000",
					"fengding": 14,
					"price": "2150000000000"
				},
				"cat24": {
					"huishou": "57300000000",
					"name": "商贩",
					"cal1": "18155000",
					"cal2": "30259000",
					"cal3": "42362000",
					"cal4": "57492000",
					"fengding": 13,
					"price": "5730000000000"
				},
				"cat25": {
					"huishou": "153000000000",
					"name": "铁匠",
					"cal1": "36538000",
					"cal2": "60897000",
					"cal3": "85255000",
					"cal4": "115700000",
					"fengding": 12,
					"price": "15300000000000"
				},
				"cat26": {
					"huishou": "406000000000",
					"name": "厨师",
					"cal1": "73533000",
					"cal2": "122560000",
					"cal3": "171580000",
					"cal4": "232850000",
					"fengding": 11,
					"price": "40600000000000"
				},
				"cat27": {
					"huishou": "1080000000000",
					"name": "酿酒师",
					"cal1": "147990000",
					"cal2": "246640000",
					"cal3": "345300000",
					"cal4": "468620000",
					"fengding": 10,
					"price": "108000000000000"
				},
				"cat28": {
					"huishou": "4500000000000",
					"name": "鞋匠",
					"cal1": "297830000",
					"cal2": "496380000",
					"cal3": "694930000",
					"cal4": "943110000",
					"fengding": 10,
					"price": "450000000000000"
				},
				"cat29": {
					"huishou": "13500000000000",
					"name": "管家",
					"cal1": "599380000",
					"cal2": "998960000",
					"cal3": "1398500000",
					"cal4": "1898000000",
					"fengding": 10,
					"price": "1350000000000000"
				},
				"cat30": {
					"huishou": "42000000000000",
					"name": "会计",
					"cal1": "1206300000",
					"cal2": "2010400000",
					"cal3": "2814600000",
					"cal4": "3819800000",
					"fengding": 10,
					"price": "4200000000000000"
				},
				"cat31": {
					"huishou": "130000000000000",
					"name": "医生",
					"cal1": "2427600000",
					"cal2": "4046000000",
					"cal3": "5664400000",
					"cal4": "7687400000",
					"fengding": 10,
					"price": "13000000000000000"
				},
				"cat32": {
					"huishou": "400000000000000",
					"name": "画家",
					"cal1": "4885600000",
					"cal2": "8142700000",
					"cal3": "11400000000",
					"cal4": "15471000000",
					"fengding": 10,
					"price": "40000000000000000"
				},
				"cat33": {
					"huishou": "1200000000000000",
					"name": "工程师",
					"cal1": "9832400000",
					"cal2": "16387000000",
					"cal3": "22942000000",
					"cal4": "31136000000",
					"fengding": 10,
					"price": "120000000000000000"
				},
				"cat34": {
					"huishou": "1760000000000000",
					"name": "老板",
					"cal1": "19788000000",
					"cal2": "32980000000",
					"cal3": "46171000000",
					"cal4": "62661000000",
					"fengding": 10,
					"price": "360000000000000000"
				},
				"cat35": {
					"huishou": "1760000000000000",
					"name": "名媛",
					"cal1": "39823000000",
					"cal2": "66372000000",
					"cal3": "92921000000",
					"cal4": "126110000000",
					"fengding": 10,
					"price": "1080000000000000000"
				},
				"cat36": {
					"huishou": "1760000000000000",
					"name": "守卫",
					"cal1": "80145000000",
					"cal2": "133570000000",
					"cal3": "187000000000",
					"cal4": "253790000000",
					"fengding": 10,
					"price": "3240000000000000000"
				},
				"cat37": {
					"huishou": "1760000000000000",
					"name": "骑士",
					"cal1": "161290000000",
					"cal2": "268820000000",
					"cal3": "376350000000",
					"cal4": "510760000000",
					"fengding": 10,
					"price": "9720000000000000000"
				},
				"cat138": {
					"huishou": "1760000000000000",
					"name": "限时金色招财猫",
					"cal1": "0",
					"cal2": 0,
					"cal3": 0,
					"cal4": 0,
					"fengding": 10,
					"price": "150"
				},
				"cat238": {
					"huishou": "1760000000000000",
					"name": "金义",
					"cal1": "324000000000",
					"cal2": "541010000000",
					"cal3": "757410000000",
					"cal4": "1027900000000",
					"fengding": 10,
					"price": "150"
				},
				"cat338": {
					"huishou": "1760000000000000",
					"name": "木仁",
					"cal1": "324000000000",
					"cal2": "541010000000",
					"cal3": "757410000000",
					"cal4": "1027900000000",
					"fengding": 10,
					"price": "150"
				},
				"cat438": {
					"huishou": "1760000000000000",
					"name": "水智",
					"cal1": "324000000000",
					"cal2": "541010000000",
					"cal3": "757410000000",
					"cal4": "1027900000000",
					"fengding": 10,
					"price": "150"
				},
				"cat538": {
					"huishou": "1760000000000000",
					"name": "火礼",
					"cal1": "324000000000",
					"cal2": "541010000000",
					"cal3": "757410000000",
					"cal4": "1027900000000",
					"fengding": 10,
					"price": "150"
				},
				"cat638": {
					"huishou": "1760000000000000",
					"name": "土信",
					"cal1": "324000000000",
					"cal2": "541010000000",
					"cal3": "757410000000",
					"cal4": "1027900000000",
					"fengding": 10,
					"price": "150"
				},
				"cat738": {
					"huishou": "1760000000000000",
					"name": "风伯",
					"cal1": "324000000000",
					"cal2": "541010000000",
					"cal3": "757410000000",
					"cal4": "1027900000000",
					"fengding": 10,
					"price": "150"
				},
				"cat838": {
					"huishou": "1760000000000000",
					"name": "雷公",
					"cal1": "324000000000",
					"cal2": "541010000000",
					"cal3": "757410000000",
					"cal4": "1027900000000",
					"fengding": 10,
					"price": "150"
				},
				"cat938": {
					"huishou": "1760000000000000",
					"name": "电母",
					"cal1": "324000000000",
					"cal2": "541010000000",
					"cal3": "757410000000",
					"cal4": "1027900000000",
					"fengding": 10,
					"price": "150"
				},
				"cat1038": {
					"huishou": 1,
					"name": "金色招财猫",
					"cal1": 0,
					"cal2": 0,
					"cal3": 0,
					"cal4": 0,
					"fengding": 10,
					"price": "150"
				}
			},
			"city": { // 城市相关 bide -> 到达此城市,必得分红猫提高  p0.01 -> 每满足一次,行程进度提高0.01   Royalty  金币加成   
				"c1": {
					"name": "六扇门",
					"bide": 0.3,
					"p001": "600000",
					"Royalty": 1,
					"distance": 4478
				},
				"c2": {
					"name": "绿竹巷",
					"bide": 0.31,
					"p001": "4500000000",
					"Royalty": 1,
					"distance": 6525
				},
				"c3": {
					"name": "桃花岛",
					"bide": 0.33,
					"p001": "190000000000",
					"Royalty": 1,
					"distance": 7566
				},
				"c4": {
					"name": "玄幽阁",
					"bide": 0.34,
					"p001": "900000000000",
					"Royalty": 1,
					"distance": 7566
				},
				"c5": {
					"name": "见性峰",
					"bide": 0.34,
					"p001": "10000000000000",
					"Royalty": 1,
					"distance": 12532
				},
				"c6": {
					"name": "星宿海",
					"bide": 0.34,
					"p001": "200000000000000",
					"Royalty": 1,
					"distance": 50000
				},
				"c7": {
					"name": "燕子坞",
					"bide": 0.34,
					"p001": "300000000000000",
					"Royalty": 1,
					"distance": 90000
				},
				"c8": {
					"name": "血魔洞",
					"bide": 0.34,
					"p001": "400000000000000",
					"Royalty": 1,
					"distance": 100000
				},
				"c9": {
					"name": "地灵潭",
					"bide": 0.34,
					"p001": "500000000000000",
					"Royalty": 1,
					"distance": 130000
				},
				"c10": {
					"name": "神武门",
					"bide": 0.34,
					"p001": "6000000000000000",
					"Royalty": 1,
					"distance": 160000
				},
				"c11": {
					"name": "柳善府",
					"bide": 0.34,
					"p001": "70000000000000000",
					"Royalty": 1,
					"distance": 190000
				},
				"c12": {
					"name": "风陵渡",
					"bide": 0.34,
					"p001": "800000000000000000",
					"Royalty": 1,
					"distance": 210000
				},
				"c13": {
					"name": "翡翠池",
					"bide": 0.34,
					"p001": "9000000000000000000",
					"Royalty": 1,
					"distance": 230000
				},
				"c14": {
					"name": "绝情谷",
					"bide": 0.34,
					"p001": "1000000000000000000",
					"Royalty": 1,
					"distance": 250000
				},
				"c15": {
					"name": "灵鹫宫",
					"bide": 0.34,
					"p001": "2000000000000000000",
					"Royalty": 1,
					"distance": 270000
				},
				"c16": {
					"name": "神龙岛",
					"bide": 0.34,
					"p001": "3000000000000000000",
					"Royalty": 1,
					"distance": 290000
				},
				"c17": {
					"name": "南林关",
					"bide": 0.34,
					"p001": "4000000000000000000",
					"Royalty": 1,
					"distance": 310000
				},
				"c18": {
					"name": "断肠崖",
					"bide": 0.34,
					"p001": "5000000000000000000",
					"Royalty": 1,
					"distance": 230000
				},
				"c19": {
					"name": "龙霄殿",
					"bide": 0.34,
					"p001": "6000000000000000000",
					"Royalty": 1,
					"distance": 250000
				},
				"c20": {
					"name": "光明顶",
					"bide": 0.34,
					"p001": "7000000000000000000",
					"Royalty": 1,
					"distance": 270000
				}
			},

			// 旅行团阶段
			"stage": [{
					"name": "第一阶段",
					"mubiao": 20,
					"beilv": 1.0
				},
				{
					"name": "第二阶段",
					"mubiao": 50,
					"beilv": 1.1
				},
				{
					"name": "第三阶段",
					"mubiao": 100,
					"beilv": 1.2
				},
				{
					"name": "第四阶段",
					"mubiao": 200,
					"beilv": 1.3
				},
				{
					"name": "第五阶段",
					"mubiao": 500,
					"beilv": 1.4
				},
				{
					"name": "第六阶段",
					"mubiao": 1000,
					"beilv": 1.5
				},
				{
					"name": "第七阶段",
					"mubiao": 2000,
					"beilv": 1.6
				},
				{
					"name": "第八阶段",
					"mubiao": 3000,
					"beilv": 1.7
				},
				{
					"name": "第九阶段",
					"mubiao": 4000,
					"beilv": 1.8
				},
				{
					"name": "第十阶段",
					"mubiao": 5000,
					"beilv": 2.0
				},
				{
					"name": "最终阶段",
					"mubiao": 999999999999999,
					"beilv": 2.0
				},
			],

			// 好友收益相关设置   百分比
			"profitfromfriend": {
				"online": 1,
				"videocount": 1,
				"friendcount": 1,
			},

			// 打工  兼职红包  奖励
			"dailytask": {
				"dagong1": 0.03, // 分
				"dagong2": 0.30, // 分
				"jianzhi": 0.03, // 分
			},

			// 分享 链接
			"share": {
				"url": "",
			},

			// 提现手续费
			"withdraw": {
				"commission": 3, // 提现手续费比例
			},

			// 旅行团收益  好友活跃 每满足一次  给直推上级赚钱 2分   上上级 1分
			"friendactiveteam": {
				"onlinetime": 60, // 在线分钟
				"videocount": 1, // 看视频次数
				"friendcount": 1, // 邀请人数
			},
			// 合成红包设置
			"hechenghongbao": {
				"hongbao1": 0.01,
				"hongbao2": 0.05,
			},
			// 单身卖出
			"sale": {
				"hongbao1": 5, // 元
				"hongbao2": 50, // 元
			},
			"friendprofit": {
				"onlinetimeprofit": 0.01, // fen
				"videocountprofit": 0.01, // fen
				"friendcountprofit": 0.01, // fen
			},

			// 必得分红猫进度   每满足一次  进度加百分比
			"bide": {
				"videocount": 1, // 看视频次数
				"friendcount": 1, // 邀请人数
				"hechengcount": 1, // 合成狗次数
				"friendfen": 0.01, // 旅行团收益   分
			},

			// 满足一次   给多少必得收益
			"bideprofit": {
				"videocount": 0.01, // 百分比
				"friendcount": 0.01, // 百分比
				"hechengcount": 0.01, // 百分比
				"friendfen": 0.01, // 百分比
			},

			// 限时分红猫设置
			"xianshicat": {
				"persec": 0.01, // fen
				"gailv": 1, // 百分比
				"time1": 5, // 分钟
				"time2": 15, // 分钟
			},

			// 5级的现金红包
			"lvl5": {
				"hongbao": 0.03, // 分
			},

			// 转盘奖励设置
			"roulette": {
				"shaoliang": 1,
				"zhongliang": 2,
				"daliang": 4,
				"hailiang": 6,
			},

			// 紫金葫芦设置
			"zijinhulu": {
				"a1": {
					"time": 3,
					"count": 10,
					"gailv": 30
				},
				"a2": {
					"time": 5,
					"count": 10,
					"gailv": 25
				},
				"a3": {
					"time": 10 * 24,
					"count": 10,
					"gailv": 20
				},
				"a4": {
					"time": 30 * 24,
					"count": 10,
					"gailv": 15
				},
				"a5": {
					"time": 60 * 24,
					"count": 10,
					"gailv": 10
				},
			},

			// 俩37合成38  获得永久的概率
			"lvl37to1038": {
				"gailv": 10,
			},
			 // 广告间隔时间
			"setadtime": {
				"time": 20,
			},
			// 转盘红包设置
			"zphongbao": {
				"hongbao1": 0.01,
				"hongbao2": 0.05,
			},
			// 签到金币
			"qiandao": {
				"coin": 30
			},
			//限时领取，领取金币分钟数
			"xianshilingqu": {
				"time": 5 
			},
			//配置支付类型  zhifubao：支付宝提现方式   weixin：微信提现方式
			"tixiantype": { 
				"type": 'weixin'
			},
			// 必得进度分红规则配置 0表示等比分4份  1 表示满足单一条件就行
			"bidetype": {
				"type": 0 
			}
		}
	}

	static async loadconfig() {
		var dbconfig = {};
		var db = uniCloud.database();
		var gamename = this.data().GAMENAME;
		var data = this.data();

		//点评：这要循环查询20多次库，会导致云函数执行超时
		for (let key in data) {
			var cursor = await db.collection('gameconfig').doc(key).get();
			if (JSON.stringify(cursor) != '{}' && cursor.data && cursor.data[0]) {
				var tmp = {};
				for (let key1 in cursor.data[0]) {
					if (key1 != "_id") {
						tmp[key1] = cursor.data[0][key1];
					}
				}
				dbconfig[key] = tmp;
			}
		}
		return dbconfig;
	}
	/**
	 * 一次性加载所有游戏配置信息
	 */
	static async loadAllConfig() {
		let now = new Date().getTime()
		//全局加载，每隔5分钟刷新一次，适用于云函数单实例、多并发的情况
		if (now - GAMECONFIG.loadTime > 1000 * 60 * 5) {
			console.log("config expired,load again");
			var dbconfig = {};
			var db = uniCloud.database();

			let dataInDb = await db.collection('gameconfig').get();

			if (dataInDb && dataInDb.data && dataInDb.data.length > 0) {
				for (var i = 0; i < dataInDb.data.length; i++) {
					let tmp = {};
					for (let key in dataInDb.data[i]) {
						if (key != "_id") {
							tmp[key] = dataInDb.data[i][key];
						}
					}
					// console.log("装载：",dataInDb.data[i]['_id']);
					dbconfig[dataInDb.data[i]['_id']] = tmp;
				}
			}

			GAMECONFIG.config = dbconfig
			GAMECONFIG.loadTime = now

			return dbconfig;
		} else {
			// console.log("loadAllConfig,use config in cache");
		}
		return GAMECONFIG.config
	}

	static async get() {
		// 考虑性能 暂时注释
		// var d = await this.loadconfig();
		//换个写法 - by chb
		// console.log("config get arguments",arguments);
		var d = await this.loadAllConfig();
		// console.log("loadAllConfig success");
		for (let key in arguments) {
			let k = arguments[key];
			if (typeof(d[k]) == "undefined") {
				d = null;
				break;
			}
			d = d[k];
		}
		if (typeof(d) != "undefined" && JSON.stringify(d) != '{}' && d != null) {
			return d;
		}

		var d = this.data();
		for (let key in arguments) {
			let k = arguments[key];
			if (typeof(d[k]) == "undefined") {
				d = null;
				break;
			}
			d = d[k];
		}
		console.assert(typeof(d) != "undefined", "没有找到相关的配置" + arguments[0]);
		return d;
	}

}
