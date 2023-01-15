"use strict";
const config = require("../../utils/config");
const xscatmodel = require("../../model/xscatmodel");
module.exports = class xscatlogic {

	static async loadxscat(db,uid)
	{
		var t = new xscatmodel(db,uid);
		if (t._id == 0)
		{
			t._id = uid;
			await t.save();
		}
		await t.load();
		return t;
	}

	static async setinfo(db, uid, time, fen)
	{
		var cat = await this.loadxscat(db, uid);
		cat.time += time;
		cat.fen += fen;
		await cat.save();
	}

	static async remove(db, uid)
	{
		var t = new xscatmodel(db,uid);
		await t.remove();
	}
	
}