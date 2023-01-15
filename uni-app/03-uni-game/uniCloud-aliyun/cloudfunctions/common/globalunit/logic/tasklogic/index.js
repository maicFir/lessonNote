"use strict";
const config = require("../../utils/config");
const DialyTaskLogic = require("../dialytasklogic");

module.exports = class tasklogic {
	
	static async loadtask(db,uid)
	{
		var task = await DialyTaskLogic.loadtask(db,uid);
		var a={};
		var time = Math.floor(Date.now()/1000);
		a['bonustask']={
			 ok : task._id==0,
			 ttl : task.endtime-time,
		};

		return a;
	}
	
}