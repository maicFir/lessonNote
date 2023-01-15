"use strict";
const config = require("../../utils/config");
const DBPOB = require("../dbpob");
module.exports = class xscatmodel extends DBPOB {

	constructor(_db,_id) {
		super(_db,'xscatinfo', _id);
		this._id = 0;
		// 计数
		this.time = 0;		// 累计时间
		// 分红总数
		this.fen = 0.0;
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
}
