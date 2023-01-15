"use strict";
const config = require("../../utils/config");
const DBPOB = require("../dbpob");
const Decimal = require("../../utils/decimal");
const QueueHelper = require("../../utils/queuehelper");
const BideLogic = require("../../logic/bidelogic");
const CityLogic = require("../../logic/citylogic");
module.exports = class usermodel extends DBPOB {

	constructor(_db,_id) {
		super(_db,'userinfo', _id);
		this._id 		         = 0;
		this.createtime          = 0;
		this.phone               = 0;
		this.sex               	 = 0;
		this.password            = '';
		this.realname            = '';    // 真实姓名
		this.nickname     	     = '';    // 昵称
		this.avatar              = 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-f184e7c3-1912-41b2-b81f-435d1b37c7b4/536fbc2c-31f0-41e1-9d51-3c4fb82f27c0.png';
		this.shangji             = 0;
		this.bindtime            = 0;
		this.level 			     = 0;
		this.coin  			     = '0';   // 金币
		this.accountstatus       = 0;     // 玩家状态 是否封号，暂留  0未封号, 1封号
		this.lastlogintime       = 0;
		this.isauthentication    = 0;     // 是否实名认证
		this.isjihuo      	     = 0;     // 是否激活
		this.idcard  		     = '';    // 身份证号
		this.city  			     = 1;     // 城市编号
		this.maxlvl		         = 1;     // 可以购买猫的最大的等级
		this.persec			     = "0";     // 每秒可以产的金币的数量
		this.caltime 		     = 0;     // 上次结算时间
		this.storeext            = 0;     // 仓库扩展次数
		this.fen                 = 0;     // 可以提现的金额
		this.friendfen           = 0;     // 好友累计赚钱
		this.exceptcat           = 2;     
		this.stage			     = 1;     // 用户旅行团阶段
		this.curcat              = 1;     // 当前溜的猫
		this.canwatchvideocount  = 0;     // 可以看视频的次数
		this.videocount          = 0;     // 看视频的次数
		this.friendcount         = 0;     // 直推+扩散
		this.onlinetime          = 0;     // 在线时间   分钟
		this.todayvideocount     = 0;     // 今天看视频的次数
		this.todayfriendcount    = 0;     // 今天直推+扩散
		this.todayonlinetime     = 0;     // 今天在线时间   分钟
		this.weixinid            = '';    // 微信号
		this.qqid  				 = '';    // QQ号
		this.bide  				 = 0.0;   // 必得分红猫进度    百分比
		this.isfirstwithdraw     = 1;     // 是否首次提现
		this.jianzhi      		 = 0;     // 是否可以领取兼职红包
		this.ip    				 = "";    // ip 地址
		this.todayzhituifen      = 0;     // 今天直推好友赚钱
		this.todaykuosanfen      = 0;     // 今天扩散好友赚钱
		this.hechengcount 		 = 0;     // 累计合成猫的次数
		this.zhifubao     	 	 = '';
		this.hongbao             = 0;     // 还没有领取的红包  fen
		this.openid			     = '';    // 微信openid
		this.reqfriendfen        = 0;     // 
		this.lastonlinetime      = 0;     // 最后一次在线时间
		this.curstage            = 1;     // 当前阶段
		this.maxmoney            = "14400"; // 购买最高价格
		this.zijinexp            = 0;     // 紫金葫芦经验
		this.superaward          = 0;     // 超级奖励劵
		this.yaoqingquan         = 0;     // 邀请券
		this.inviteCode			 = ''	  // 新增自己邀请码
		
		this.rmbrank             = 0      // 现金红包排行榜
		this.leijicoinrank       = "0"     // 累计金币排行
		this.fenhongrank         = 0      // 分红猫排行
		
		
		this.zhituifriend        = 0    //直推有效好友
		this.kuosanfriend        = 0    // 扩散有效好友
		this.isadd               = 0    // 是否已经给上级添加
		
		
		this.hasbidemao          = 0 //是否已获得必得分红猫
		
		for(var i=1;i<=12;i++){
			this['poscatlvl'+i] = 0
			this['posexpiretime'+i] = -1
			this['posfen'+i] = 0
		}
	}

	async save() 
	{
		//字段单独处理
		await this.preservation({
			fen:1,
			friendfen:1,
			reqfriendfen:1,
			bide:1,
			city:1,
			rmbrank:1,
			fenhongrank:1
		});
	}
	
	async toparam()
	{
		var data = this.toarray();
		//截取数据
		var fangda = await config.get('fangda') || 1000;
		data['fen'] = data['fen']/fangda;
		data['friendfen'] = data['friendfen']/fangda;
		data['reqfriendfen'] = data['reqfriendfen']/fangda;
		data['bide'] = data['bide']/fangda;
		data['rmbrank'] = data['rmbrank']/fangda;
		data['fenhongrank'] = data['fenhongrank']/fangda;
		data['buylvl']=Math.max(data['maxlvl']-3,1);
		if (data['city'] == 0){
			data['city'] = 1;
		}
		var cityname = await config.get('city','c'+data['city'],'name');
		data['cityname'] = cityname;
		data['id'] = this._id
		data['persec'] = Number(data['persec'])
		return data;
	}

	async shangcoin(coin,ok,desc)
	{
		var now = await Decimal.add(this.coin,coin);
		this.coin = now;
		if(!ok){
			var c = this.leijicoinrank;
			var grow = await Decimal.add(c,coin);
			var c1 = "0"
			var c2 = c1.repeat(60-grow.length)
			this.leijicoinrank = c2+grow
		}
		await this._db.collection("uni-id-scores").add({
			user_id:this._id,
			score:coin,
			type:1,
			balance:now,
			comment:desc,
			create_date:Date.now()
		})
	}

	/**
	 * 刷新金币
	 */
	async refreshcoin()
	{
		var fangda = await config.get('fangda') || 1000;
		
		//当前服务器时间
		var time = Math.floor(Date.now()/1000);
		var elapsed = time-this.caltime;
		elapsed =Math.max(0,elapsed);
		var grow = 0
		//超过5秒才计算金币，频繁操作不计算，节省DB操作
		if(elapsed>5){
			grow = await Decimal.multipliedBy(this.persec,elapsed);
			//若时间小于5分钟
			if (time - this.lastonlinetime < 300){
				// await CityLogic.addcoin(this._db, this._id, elapsed * this.persec);
				var now = await Decimal.add(this.coin,grow);
				
				//增加积分记录
				await this._db.collection("uni-id-scores").add({
					user_id:this._id,
					score:grow,
					type:1,
					balance:now,
					comment:elapsed+"秒在线收益",
					create_date:Date.now()
				})
				console.log("add uni-id-scores end");
				
				this.coin = now;
			}else{
				//TODO 大于5分钟如何处理？
				// 5分钟没有心跳，则理解为离线，暂不处理
			}
			this.caltime = time;
			
			var c = this.leijicoinrank;
			var newgrow = await Decimal.add(c,grow);
			var c1 = "0"
			var c2 = c1.repeat(60-newgrow.length)
			this.leijicoinrank = c2+newgrow
		}
		
		return grow;
	}

	async xiacoin(coin)
	{
		var fangda = await config.get('fangda') || 1000;
		var ok = await Decimal.gte(this.coin,coin);
		if(!ok){
			return {ok:'ng'};
		}
		
		var now = await Decimal.minus(this.coin,coin);
		//增加积分记录
		let score = {
			user_id:this._id,
			score:coin,
			type:2,
			balance:now,
			comment:"新购",
			create_date:Date.now()
		}
		this._db.collection("uni-id-scores").add(score)
		// console.log("add uni-id-scores end",score);

		this.coin = now;
		
		return {ok:'ok'};
	}

	async shangfen(fen,goldname='fen',ok,rmb)
	{
		var fangda = await config.get('fangda') || 1000;
		fen = fen * fangda;
		fen = Math.floor(fen);
		
		const dbCmd = this._db.command;
		var obj = {};
		obj[goldname] = dbCmd.inc(fen);
        if(rmb){
           obj['rmbrank'] = dbCmd.inc(fen); 
        }
		if(ok){
			obj['fenhongrank'] = dbCmd.inc(fen);
		}
		let res = await this._db.collection(this._table).doc(this._docId).update(obj);
	}
	
	async shangbide(bide,goldname='bide')
	{
		var fangda = await config.get('fangda') || 1000;
		bide = bide * fangda;
		bide = Math.floor(bide);
		
		const dbCmd = this._db.command;
		var obj = {};
		obj[goldname] = dbCmd.inc(bide);
		let res = await this._db.collection(this._table).doc(this._docId).update(obj);
	}

	async shangcity()
	{
		const dbCmd = this._db.command;
		let res = await this._db.collection(this._table).doc(this._docId).update({
			city:dbCmd.inc(1),
		})
	}

	async shangfriendfen(friendfen,goldname='friendfen',friend_id)
	{
		if (friendfen <= 0){
			return;
		}
		// 记录下库
		var time = Math.floor(Date.now()/1000);
		var msg = {
			_id:this._id+'_'+Date.now()+'_'+friend_id,
			uid:this._id,
			count:friendfen,
			friend_id,
			createtime:time,
		}
		await QueueHelper.putLog(this._db,"user_teamprofitrecord",msg);
		// 必得进度
		await BideLogic.addcount(this._db, this._id, 'friendfen', friendfen);
		var fangda = await config.get('fangda') || 1000;
		friendfen = friendfen * fangda;
		friendfen = Math.floor(friendfen);
		const dbCmd = this._db.command;
		var obj = {};
		obj[goldname] = dbCmd.inc(friendfen);
		obj["reqfriendfen"] = dbCmd.inc(friendfen);
		let res = await this._db.collection(this._table).doc(this._docId).update(obj);
	}

	static async calnextstage(friendfen)
	{
		var stage = await config.get("stage");
		var mubiao = 0;
		
		for (let key in stage) {
			if (friendfen - mubiao < stage[key]["mubiao"]){
				return stage[key];
			}
			mubiao += stage[key]["mubiao"];
		}
		return stage[stage.length-1];
	}

	static async calcurstage(friendfen)
	{
		var stages = await config.get("stage");
		var stage = stages[0];
		var mubiao = 0;

		for (let key in stages) {
			if (mubiao < friendfen && friendfen <= stages[key]["mubiao"]+mubiao){
				stage = stages[key];
			}
			mubiao += stages[key]["mubiao"];
		}
		return stage;
	}

	async updatestage(mubiao)
	{
		var fangda = await config.get('fangda') || 1000;
		mubiao = mubiao * fangda;
		mubiao = Math.floor(mubiao);
		
		const dbCmd = this._db.command;
		const transaction = await this._db.startTransaction();
		
		try {
			let dbdata = await transaction.collection(this._table).doc(this._docId).get();
			if (dbdata.data) {
				let has = dbdata.data.reqfriendfen;
				if(has-mubiao>=0){
					let res = await transaction.collection(this._table).doc(this._docId).update({
						fen: dbCmd.inc(mubiao),
						rmbrank: dbCmd.inc(mubiao),
						reqfriendfen: has-mubiao,
						curstage: dbCmd.inc(1),
					});
					
					await transaction.commit();
				
					return {ok:'ok'};
				}else{
					return {ok:'ng'};
				}
			} else {
				return {ok:'ng'};
			}
		} catch (e) {
			await transaction.rollback()
			return {ok:'ng'};
		}
	}

	async xiafen(fen,goldname='fen')
	{
		var fangda = await config.get('fangda') || 1000;
		fen = fen * fangda;
		fen = Math.floor(fen);
		
		const dbCmd = this._db.command;
		const transaction = await this._db.startTransaction();
		var obj = {};
		obj[goldname] = dbCmd.inc(-fen);
		try {
			let dbdata = await transaction.collection(this._table).doc(this._docId).get();
			if (dbdata.data) {
				let has = dbdata.data[goldname];
				if(has-fen>=0){
					let res = await transaction.collection(this._table).doc(this._docId).update(obj);
					
					await transaction.commit();
					return {ok:'ok'};
				}else{
					return {ok:'ng'};
				}
			} else {
				return {ok:'ng'};
			}
		} catch (e) {
			await transaction.rollback()
			return {ok:'ng'};
		}
	}
	
}
