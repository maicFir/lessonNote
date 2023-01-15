"use strict";
const config = require("../../utils/config");
const DBPOB = require("../dbpob");
module.exports = class dialytaskmodel extends DBPOB {

	constructor(_db,_id) {
		super(_db,'dialytaskinfo', _id);
		this._id 		      = 0;
		this.uid              = 0;
		this.m1               = 0;   // 签到任务
		this.m2               = 0;   // 在线时长任务
		this.m3               = 0;   // 每日邀请任务
		this.zhituitoday      = 0;   // 今天直推人数      需要每日重置
		this.onlinetime       = 0;   // 在线时长   需要每日重置
		this.createtime       = 0;
		this.islingqu         = 0;   // 是否已经领取
		this.heartbeat        = 0;   // 心跳时间
	
		this.todayvideocount  = 0;   // 视频次数
		this.todayfriendcount = 0;   // 邀请好友数量
		this.todayonlinetime  = 0;   // 在线时间
		this.todayzhituifen   = 0;   // 直推好友赚钱
		this.todaykuosanfen   = 0;   // 扩散好友赚钱
		this.todayzhituicount = 0;   // 直推好友数量
		this.todaykuosancount = 0;   // 扩散好友数量
	
		this.jianzhilingqu    = 0;   // 兼职红包是否领取
		this.jianzhistatus    = 0;   // 兼职任务状态
		this.entime		      = 0;	 // 失效时间
	}

	async save() 
	{
		//字段单独处理
		this.entime = Math.floor(Date.now()/1000);
		await this.preservation({
			todayvideocount:1,
			todayfriendcount:1,
			todayonlinetime:1,
			todayzhituifen:1,
			todaykuosanfen:1,
			todayzhituicount:1,
			todaykuosancount:1
		});
	}
	
	async shangtodaydata(keyname,count=1)
	{
		const dbCmd = this._db.command;
		var obj = {};
		obj[keyname] = dbCmd.inc(count);
		let res = await this._db.collection(this._table).doc(this._docId).update(obj);
	}

	async shangtodayfen(fen,goldname='todayzhituifen')
	{
		var fangda = await config.get('fangda') || 1000;
		fen = fen * fangda;
		fen = Math.floor(fen);
		const dbCmd = this._db.command;
		var obj = {};
		obj[goldname] = dbCmd.inc(fen);
		let res = await this._db.collection(this._table).doc(this._docId).update(obj);
	}
	
	async toparam()
	{
		var data = this.toarray();
		//截取数据
		if (data['m1'] == 1 && data['m2'] == 1 && data['m3'] == 1 && this.islingqu == 0){ // 可以领取奖励
			data["lingqu"] = 1;
		}
		else{
			data["lingqu"] = 0;
		}

		var fangda = await config.get("fangda");
		data['todayzhituifen'] = data['todayzhituifen']/fangda;
		data['todaykuosanfen'] = data['todaykuosanfen']/fangda;
		
		return data;
	}
}
