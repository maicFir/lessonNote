"use strict";
const config = require("../../utils/config");
const Utils = require("../../utils/utils");
const UserLogic = require("../userlogic");
const Decimal = require("../../utils/decimal");
module.exports = class bonuslogic {
	
	static async getkey(id)
	{
		var key = id + ':bonustask:' + Utils.today();
		return key;
	}

	static async loadtask(MongoDB,id)
	{
		var key = await this.getkey(id);
		var cmd = await MongoDB.collection('taskinfo').doc(key).get();
		console.log("cmd",cmd)
		// 查询ttl 在这只能查到期时间了。  
		var a = {}
		a['bonustask']={
			"ttl":0,
			"ok":cmd['data'].length==0
		};
		var time = Math.floor(Date.now()/1000);
		if(cmd['data'].length>0){
			a['bonustask']["ttl"] = cmd['data'][0].expiretime-time
			if(cmd['data'][0].expiretime-time<=0){
				a['bonustask']["ok"] = true
			}
		}
		// if(cmd['data']==null){
		// 	a["bonustask"]={
		// 		"ttl":0,
		// 		"ok":true
		// 	};
		// }else{
		// 	if(cmd['data'].length>0){
		// 		a['bonustask']={
		// 			ok:false,
		// 			ttl:cmd['data'][0].expiretime-time,
		// 		};
		// 	}else{
		// 		a["bonustask"]={
		// 			"ttl":0,
		// 			"ok":true
		// 		};
		// 	}
		// }

		return a;
	}

	static async reqbonus(MongoDB,id)
	{
		var key = await this.getkey(id);
		var time = Math.floor(Date.now()/1000)+3600;
		var cmd = await MongoDB.collection('taskinfo').doc(key).set({
			expiretime:time,
		});
		return cmd
	}

	static async calbonus(db,uid)
	{
		var user = await UserLogic.loaduser(db,uid);
		//TODO 整点金币需要一个更合理的计算方法，暂定5分钟
		// 相当于5分钟的在线收益
		var time = await config.get("xianshilingqu","time")
		var grow = await Decimal.multipliedBy(user.persec,parseInt(time)*60);
		return grow;
	}
	
}