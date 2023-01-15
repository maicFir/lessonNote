"use strict";
const config = require("../../utils/config");
const QueueHelper = require("../../utils/queuehelper");
const bidemodel = require("../../model/bidemodel");
const UserLogic = require("../userlogic");
const RoomLogic = require("../roomlogic");
const FenhongCatLogic = require("../fenhongcatlogic");
const StoreLogic = require("../storelogic");

module.exports = class bidelogic {
	
	static async loadbide(db,id)
	{
		var bide = new bidemodel(db,id);
		//先装载
		await bide.load();
		return bide;
	}

	// 增加
	static async addcount(db,id,keyname,count)
	{
		console.log("addcount",{id,keyname,count});
		const UserLogic = require("../userlogic");
		var bide = await this.loadbide(db,id);
		if (bide._id == 0)
		{
			bide._id = id;
		}
		bide[keyname] += count;
		var condition = await config.get("bide");
		var v = await config.get("bideprofit",keyname);
		var user = await UserLogic.loaduser(db,id);

		// 旅行团收益
		if (bide[keyname] >= condition[keyname])
		{
			var c = Math.floor(bide[keyname] / condition[keyname]);
			var k = 'leiji'+keyname;
			var num = v * c
			var type = await config.get("bidetype","type")
			if(type == 0){
				if (bide[k]<25) {
					if(bide[k] + num >25){
						num = 25 - bide[k]
					}
					user.shangbide(num);
				}
			}else{
				user.shangbide(num);
			}
			
			bide[keyname] = bide[keyname]%condition[keyname];
			bide[k] += num;
		}

		await bide.save();
		await user.save();
		await user.load();
		var u = await user.toparam();
		if (u['bide'] >= 100 && u['hasbidemao'] == 0)
		{
			var pos = await RoomLogic.findpos(db,id,u);
			console.log('查看位置',pos)
			await user.load();
			if(!pos)
			{
				// 没有位置放仓库
				var lvl = 0
				var index = 0
				for(var i=1;i<=12;i++){
					if(u['poscatlvl']<=37){
						lvl = u['poscatlvl']
						index = i
						break
					}
				}
				await StoreLogic.add(db, id, lvl, 1);
				user['poscatlvl'+index] = 1038
				user['posexpiretime'+index] = -1
				user['posfen'+index] = 0
			}
			else
			{
				user['poscatlvl'+pos] = 1038
				user['posexpiretime'+pos] = -1
				user['posfen'+pos] = 0
				
			}
			var fenhongcat = await FenhongCatLogic.loadfenhongcat(db,id);
			console.log('fenhongcat');
			console.log(fenhongcat);
			await fenhongcat.shangcat();
			user.hasbidemao = 1
		}
		await user.save();
	}

	static async addcity(db,id,v)
	{
		var bide = await this.loadbide(db,id);
		if (bide._id == 0)
		{
			bide._id = id;
		}
		bide.leijiunlockcity += v;
		await bide.save();
	}
	
}