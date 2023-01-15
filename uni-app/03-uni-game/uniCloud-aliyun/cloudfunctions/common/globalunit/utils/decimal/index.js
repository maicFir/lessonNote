"use strict";
// const BigNumber = require('bignumber.js');
var BigNumber = require('big-number')
module.exports = class decimal {
	
	static async add(num1,num2) {
		var x = new BigNumber(num1);
		var y = x.add(num2);
		return y.toString();
	}
	
	static async minus(num1,num2) {
		var x = new BigNumber(num1);
		var y = x.minus(num2);
		return y.toString();
	}
	
	static async multipliedBy(num1,num2) {
		var x = new BigNumber(num1);
		var y = x.mult(num2);
		return y.toString();
	}
	
	static async div(num1,num2) {
		var x = new BigNumber(num1);
		var y = x.div(num2);
		return y.toString();
	}
	
	static async gte(num1,num2) {
		var x = new BigNumber(num1);
		var y = x.gte(num2);
		return y;
	}
	
	static async pow(num1,num2) {
		var x = new BigNumber(num1);
		var y = x.pow(num2);
		return y.toString();
	}
	
}
