"use strict";
const config = require("../../utils/config");
const DBPOB = require("../dbpob");
module.exports = class bidemodel extends DBPOB {

	constructor(_db,_id) {
		super(_db,'bideinfo', _id);
		this._id  = 0; // 用户id
		// 计数
		this.friendcount = 0.0;		// 好友数量累计
		this.friendfen = 0.0;		// 旅行团收益
		this.videocount = 0.0;		// 视频
		this.hechengcount = 0.0;		// 合成次数
		this.unlockcity = 0.0;		// 解锁城市

		// 累计
		this.leijifriendcount = 0.0;		// 好友数量累计
		this.leijifriendfen = 0.0;		// 旅行团收益
		this.leijivideocount = 0.0;		// 视频
		this.leijihechengcount = 0.0;		// 合成次数
		this.leijiunlockcity = 0.0;		// 解锁城市
	}

	async save() 
	{
		//字段单独处理
		await this.preservation();
	}
	
	async toparam()
	{
		var data = this.toarray();
		return data;
	}
}
