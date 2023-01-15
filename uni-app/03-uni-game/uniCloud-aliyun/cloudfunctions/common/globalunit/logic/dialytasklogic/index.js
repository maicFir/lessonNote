"use strict";
const config = require("../../utils/config");
const dialytaskmodel = require("../../model/dialytaskmodel");
const Utils = require("../../utils/utils");
module.exports = class dialytasklogic {
	static async getkey(id)
	{
		var key = id + ':dialytask:' + Utils.today();
		return key;
	}
	static async loadtask(db,uid)
	{
		var key = await this.getkey(uid);
		var t = new dialytaskmodel(db,key);
		await t.load();
		return t;
	}
	
}