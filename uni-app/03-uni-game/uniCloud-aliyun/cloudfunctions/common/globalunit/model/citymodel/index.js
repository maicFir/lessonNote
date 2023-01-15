"use strict";
const config = require("../../utils/config");
const DBPOB = require("../dbpob");
const Decimal = require("../../utils/decimal")
module.exports = class citymodel extends DBPOB {

	constructor(_db,_id) {
		super(_db,'cityinfo', _id);
		this._id  = 0;		// 城市编号
		this.id  = 1;		// 城市编号
		this.uid = 0;		// 用户id
		this.process = 0.0;		// 进程百分比
		this.coin = "0";		// 到达这个城市之后得到的金币
		this.p001coin= "0";		// 进度0.01 需要的金币
		this.bide = 0.0;		// 可以领取的必得进度奖励
		this.createtime = 0;
		this.isnewcity = 0;		// 是否是一个新城市   判断给不给解锁城市的红包    领取红包后置  0
	
		this.s1 = 0; 		// 旅程中  可以领取6次必得进度
		this.s2 = 0;
		this.s3 = 0;
		this.s4	= 0;
		this.s5 = 0;
		this.s6 = 0;  

	}

	async save() 
	{
		//字段单独处理
		await this.preservation();
	}
	
	async toparam()
	{
		var data = this.toarray();
		//截取数据
		return data;
	}

	async shangcoin(coin)
	{
		var now = await Decimal.add(this.coin,coin);
		this.coin = now;
	}
}
