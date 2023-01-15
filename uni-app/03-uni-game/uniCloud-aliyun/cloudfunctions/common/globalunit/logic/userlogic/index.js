"use strict";
const config = require("../../utils/config");
const usermodel = require("../../model/usermodel");
module.exports = class userlogic {
	static async loaduser(db,uid) {
		var user = new usermodel(db,uid);
		//先装载
		await user.load();
		return user;
	}
	
	static async calnextstage(db,id,friendfen)
	{
		var user = new usermodel(db,id);
		return await user.calnextstage(friendfen);
	}

	static async calcurstage(db,id,friendfen)
	{
		var user = new usermodel(db,id);
		return await user.calnextstage(friendfen);
	}
	
	static async cansendsms(db,ip)
	{
		// 简单限制一下客户端调用频率
		const dbCmd = db.command;
		const ipLimit = await db.collection('uni-verify').where({
			ip: ip,
			created_at: dbCmd.gt(Date.now() - 60000)
		}).get()
		if (ipLimit.data.length > 0) {
			return false;
		}
		return true;
	}
	
}