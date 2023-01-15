"use strict";
const config = require("../../utils/config");
const Decimal = require("../../utils/decimal");
const citymodel = require("../../model/citymodel");
const UserLogic = require("../userlogic");
const BideLogic = require("../bidelogic");

module.exports = class citylogic {
	
	static async loadcity(db,id){
		var city = new citymodel(db,id);
		await city.load();
		return city;
	}

	// 计算进度
	static async addcoin(db, uid, coin)
	{
		var user = await UserLogic.loaduser(db, uid);
		var city = await this.loadcity(db, uid);
		if (city.uid == 0)
		{
			city.id = user.city;
			var cityinfo = await config.get("city", "c"+user.city);
			city.uid = user._id;
			city.p001coin = parseInt(cityinfo["p001"]);
			city.bide = cityinfo["bide"];
			await city.save();
			await city.load();
		}

		await city.shangcoin(coin);
		await city.save();

		// 进度
		var count = Decimal.div(city.coin.toString(),city.p001coin.toString());
		count = Math.floor(parseFloat(count));
		city.process = 0.01 * count;
		
		// 判断可否领取进度奖励
		for (var i = 1; i <= 6; i++)
		{
			var k = 's'+i;
			if (city[k] == 0 && city.process >= (15.0 * i))
			{
				city[k] = 1;
			}
		}

		// 判断新城市
		if (city.process >= 100 && city.id < 20)
		{
			city.id = city.id + 1;
			city.process = 0.0;
			city.coin = '0';
			var cityinfo = await config.get("city", "c".city.id);
			city.p001coin = parseInt(cityinfo["p001"]);
			city.bide = cityinfo["bide"];
			city.isnewcity = 1;
			city.createtime = Math.floor(Date.now()/1000);
			await city.save();
			await city.load();

			for (var i = 1; i <= 6; i++)
			{
				var k = 's'+i;
				city[k] = 0;
			}

			await user.shangcity();
		}

		await city.save();
		await city.load();

		return await city.toparam();
	}

	// 领取进度奖励  stage  第几个奖励
	static async lingqu(db, uid, stage)
	{
		var city = await this.loadcity(db, uid);
		var user = await UserLogic.loaduser(db, uid);

		var k = "s"+stage;
		city[k] = 2;
		await city.save();

		await user.shangbide(city.bide);
		await user.save();

		await BideLogic.addcity(db, user._id, city.bide);
	}
	
}