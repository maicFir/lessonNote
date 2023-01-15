"use strict";
const config = require("../../utils/config");
const DBPOB = require("../dbpob");
const QueueHelper = require("../../utils/queuehelper");
const UserLogic = require("../../logic/userlogic");
module.exports = class fenhongcatmodel extends DBPOB {

	constructor(_db,_id) {
		super(_db,'fenhongcatinfo', _id);
		this._id = 0;	
		this.uid = 0;		// 用户id
		// 计数
		this.count = 0;		// 条数
		this.today = 0.0;	// 今日分红
		this.leiji = 0.0;	// 总收益
	}

	async save() 
	{
		//字段单独处理
		await this.preservation({
			count:1,
		});
	}
	
	async toparam()
	{
		var data = this.toarray();
		//截取数据
		return data;
	}
	
	async shangcat()
	{
		const dbCmd = this._db.command;
			
		let res = await this._db.collection(this._table).doc(this._docId).update({
			count:dbCmd.inc(1),
		})
	}
}
