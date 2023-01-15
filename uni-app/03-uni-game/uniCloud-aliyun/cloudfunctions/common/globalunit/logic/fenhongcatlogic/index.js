"use strict";
const config = require("../../utils/config");
const utils = require("../../utils/utils");
const fenhongcatmodel = require("../../model/fenhongcatmodel");
const UserLogic = require("../userlogic");
const QueueHelper = require("../../utils/queuehelper");
module.exports = class fenhongcatlogic {

	static async loadfenhongcat(db,uid){
		var u = new fenhongcatmodel(db,uid);
		await u.load();
		if (u._id == 0)
		{
			u._id = uid;
			u.uid = uid;
		}
		await u.save();
		await u.load();
		return u;
	}

	// 增加分红狗数量
	static async addcount(db, uid)
	{
		var fenhongdcat = await this.loadfenhongcat(db, uid);
		var user = await UserLogic.loaduser(db, uid);
		if (fenhongdcat._id == 0)
		{
			fenhongdcat._id = uid;
			fenhongdcat.uid = uid;
		}

		fenhongdcat.count = fenhongdcat.count + 1;
		fenhongdcat.save();
		
		const dbCmd = db.command;
		const res = await db.collection('allinfo').doc('yongjiucount').update({
			count:dbCmd.inc(1)
		});
		if (res.updated != 1) {
			await db.collection('allinfo').doc('yongjiucount').set({
				count:1
			});
		}
		

		// 记录下库
		var msg = {
			uid:uid,
			nickname:user.nickname,
			createtime:Math.floor(Date.now()/1000),
		};
		await QueueHelper.putLog(db,"user_getfenhongcatrecord",msg);  //分红狗轮播公告日志
	}

	// 计算分红
	static async calfenhong(db, uid)
	{
		const UserLogic = require("../userlogic");
		console.log(UserLogic)
		var fenhongdcat = await this.loadfenhongcat(db, uid);
		var user = await UserLogic.loaduser(db, uid);
		
		var price = await config.get("globalinfo", "todayprofit");
		price = parseFloat(price);
		var fen = fenhongdcat.count * price;
		
		if (fen > 0)
		{
			await user.shangfen(fen,"fen",true,true);
			await user.load();
			var u = await user.toparam();
			
			await this.profitrecord(db,user._id, fen, u['fen'], '永久金色招财猫分红', 3);  //后台全球分红日志
			
			fenhongdcat.leiji = fenhongdcat.leiji + fen;
			fenhongdcat.today = fenhongdcat.today + fen;
			
			await fenhongdcat.save();
			var f = await fenhongdcat.toparam();
			
			// 记录下库
			var todaybegin = await utils.today();
			var msg = {
				uid:uid,
				fen:fen,
				count:fenhongdcat.count,
				createtime:todaybegin,
			};

			await QueueHelper.putLog(db,"user_fenhongdcatrecord",msg);  //今日分红记录
		}
		
		await user.save();
		// await user.load();
		// await QueueHelper.putLog(db,"user_login",await user.toparam());
	}
	
	static async profitrecord(db,uid,count,balance,explane,t)
	{
		if (count != 0)
		{
			var msg = {
				uid:uid,
				t:t,
				count:count,
				balance:balance,
				explane:explane,
				createtime:Math.floor(Date.now()/1000),
			};

			await QueueHelper.putLog(db,"user_profitrecord",msg);
		}
	}
	
	
	static async loadgetfenhongcatrecord(db)
	{
		let res = await db.collection('user_getfenhongcatrecord').orderBy("createtime", "desc").limit(1).get();
		
		var tmp=[];
		if(res.data && res.data.length>0){
			return res.data;
		}
		return tmp;
	}
	
	static async loadfenhongdcatrecord(db,count=100)
	{
		var count = count || 20;
		let res = await db.collection('user_fenhongdcatrecord').orderBy("createtime", "asc").limit(count).get();
		
		var tmp=[];
		if(res.data && res.data.length>0){
			return res.data;
		}
		return tmp;
	}
}