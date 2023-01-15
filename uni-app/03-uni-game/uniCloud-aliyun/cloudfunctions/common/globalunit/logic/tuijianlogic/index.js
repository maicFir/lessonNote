"use strict";
const config = require("../../utils/config");
const usermodel = require("../../model/usermodel");
module.exports = class tuijianlogic {
	
	static async loaduser(id) {
		var user = new usermodel(id);
		//先装载
		await user.load();
		return user;
	}
	
}