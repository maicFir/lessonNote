"use strict";
var QueueHelper = require("../queuehelper");
module.exports = class utils {

	static getOffsetDate(offset) {
		return new Date(
			Date.now() + (new Date().getTimezoneOffset() + (offset || 0) * 60) * 60000
		)
	}

	static today() {
		var begin = new Date().setHours(0, 0, 0, 0)
		console.log('今日开始时间begin',begin)
		var now = new Date();
		var hour = now.getHours();
		console.log('现在是几点',hour)
		if(hour>=16){
			return begin + 16*3600000
		}
		return begin - 8*3600000;
	}

	static tomorrow() {
		var today = this.today();
		var tomorrow = today + 24 * 60 * 60 * 1000;
		return tomorrow;
	}

	static getRandom(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	static random(lower, upper) {
		return Math.floor(Math.random() * (upper - lower)) + lower;
	}

	static sprintf() {
		var arg = arguments,
			str = arg[0] || '',
			i, n;
		for (i = 1, n = arg.length; i < n; i++) {
			str = str.replace(/%s/, arg[i]);
		}
		return str;
	}
}
