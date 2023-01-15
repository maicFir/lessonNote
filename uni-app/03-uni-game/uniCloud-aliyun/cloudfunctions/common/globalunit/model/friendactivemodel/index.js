"use strict";
const config = require("../../utils/config");
const DBPOB = require("../dbpob");
module.exports = class friendactivemodel extends DBPOB {

	constructor(_db,_id) {
		super(_db,'friendactiveinfo', _id);
		this._id		 = 0;		// 用户id
		this.friendcount = 0;		// 好友数量累计
		this.onlinetime  = 0;		// 在线时间
		this.videocount  = 0;		// 视频
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
