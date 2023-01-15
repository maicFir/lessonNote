"use strict";
const config = require("../../utils/config");
const utils = require("../../utils/utils");

module.exports = class roulettelogic {
	
	static async getkey()
	{
		return 'roulette';
	}

	static async getshipinkey()
	{
		return 'rouletteshipin';
	}

	static async getrolltimeskey()
	{
		return 'rolltimes';
	}

	static async setrolltimes(db,uid,times)
	{
		var key = await this.getrolltimeskey();
		var time = Math.floor(Date.now()/1000);
		var res = await db.collection("rouletteinfo").doc(key+":"+uid).update({
			uid:uid,
			times:times,
			endtime:time+24*3600,
		});
		if (res.updated != 1) {
			await db.collection("rouletteinfo").doc(key+":"+uid).set({
				uid:uid,
				times:times,
				endtime:time+24*3600,
			});
		}
		return parseInt(times);
	}


	static async getrolltimes(db,uid)
	{
		var key = await this.getrolltimeskey();
		var res = await db.collection("rouletteinfo").doc(key+":"+uid).get();
		
		if(!res.data || res.data.length<=0){
			return 1;
		}
		return parseInt(res.data[0].times);
	}


	static async getrollcounterkey()
	{
		return 'rollcounter';
	}

	static async getrollcounter(db,uid)
	{
		var key = await this.getrollcounterkey();
		var res = await db.collection("rouletteinfo").doc(key+":"+uid).get();
		
		if(!res.data || res.data.length<=0){
			return 0;
		}

		return parseInt(res.data[0].times);
	}

	static async incrollcounter(db,uid)
	{
		var key = await this.getrollcounterkey();
		const dbCmd = db.command;
		var time = Math.floor(Date.now()/1000);
		var id = key+":"+uid
		var res = await db.collection("rouletteinfo").doc(id).update({
			times:dbCmd.inc(1),
			entime:time+24*3600,
		});
		console.log("res",res)
		if (res.updated != 1) {
			await db.collection("rouletteinfo").doc(id).set({entime:time+24*3600,times:1})
		}
		var res1 = await db.collection("rouletteinfo").doc(id).get();
		return parseInt(res1.data[0].times);
	}


	static async getcountkey()
	{
		var today = utils.today();
		console.log('今日开始时间',today)
		var key = await this.getkey();
		return key+":count"+today;
	}

	static async getquankey(uid)
	{
		var key = await this.getkey();
		var today = utils.today();

		var t = today+12*3600;
		var time = Math.floor(Date.now()/1000);
		if(time>t){
			return key+":quan:"+t;
		}

		return key+":quan:"+today;
	}

	static async getwatchcountkey(uid)
	{
		var key = await this.getkey();
		var todaybegin = utils.today();

		var t = todaybegin+12*3600;
		var time = Math.floor(Date.now()/1000);
		if(time>t){
			return key+":watchcount:"+t;
		}

		return key+":watchcount:"+todaybegin;
	}

	static async genshipintoken(db,uid)
	{
		var key = await this.getshipinkey();
		var k = await this.randomkeys(16);
		var time = Math.floor(Date.now()/1000);
		var res = await db.collection("rouletteinfo").doc(key+":"+uid).update({
			uid:uid,
			time:time,
			randomkeys:k
		});
		if (res.updated != 1) {
			await db.collection("rouletteinfo").doc(key+":"+uid).set({
				uid:uid,
				time:time,
				randomkeys:k
			});
		}
		return k;
	}

	static async randomkeys(length)
	{
		var pattern = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLOMNOPQRSTUVWXYZ';
		var key = '';
		for(i=0;i<length;i++)
		{
			key += pattern[utils.random((0,pattern.length-1))];
		}
		return key;
	}


	static async addcount(db,uid,count)
	{
		var key = await this.getcountkey();
		const dbCmd = db.command;
		var time = Math.floor(Date.now()/1000);
		var res = await db.collection("rouletteinfo").doc(key+":"+uid).update({
			times:dbCmd.inc(count),
			entime:time+12*3600,
		});
		if (res.updated != 1) {
			await db.collection("rouletteinfo").doc(key+":"+uid).set({entime:time+24*3600,times:count})
		}
	}

	static async clearcount(db,uid)
	{
		var key = await this.getcountkey();
		await db.collection("rouletteinfo").doc(key+":"+uid).remove();

		// 通过看视频获得抽奖机会的次数 
		var todaybegin = utils.today();
		var ckey = "lvxingapp:video2roll:"+todaybegin;
		const dbCmd = db.command;
		var time = Math.floor(Date.now()/1000);
		var res = await db.collection("rouletteinfo").doc(ckey+":"+uid).update({
			times:dbCmd.inc(1),
			entime:time+24*3600,
		});
		if (res.updated != 1) {
			await db.collection("rouletteinfo").doc(ckey+":"+uid).set({
				times:1,
				entime:time+24*3600,
			});
		}
	}

	static async addquan(db,uid)
	{
		var key = await this.getquankey();
		const dbCmd = db.command;
		var time = Math.floor(Date.now()/1000);
		var res = await db.collection("rouletteinfo").doc(key+":"+uid).update({
			times:dbCmd.inc(1),
			entime:time+12*3600,
		});
		if (res.updated != 1) {
			await db.collection("rouletteinfo").doc(key+":"+uid).set({
				times:1,
				entime:time+12*3600,
			});
		}
	}

	static async addwatchcount(db,uid)
	{
		var key = await this.getwatchcountkey();
		const dbCmd = db.command;
		var time = Math.floor(Date.now()/1000);
		var res = await db.collection("rouletteinfo").doc(key+":"+uid).update({
			times:dbCmd.inc(1),
			entime:time+12*3600,
		});
		if (res.updated != 1) {
			await db.collection("rouletteinfo").doc(key+":"+uid).set({
				times:1,
				entime:time+12*3600,
			});
		}
	}

   static async roll(db,uid)
	{
		var flag = [];
		for (var j=1; j <5 ; j++) { 
		   for(var i=1;i<=8;i++){
				flag.push(i);
			}
		}
		// flag.push(9);
		
		var r = utils.random(0,flag.length-1);
		return flag[r];
	}

	static async getcount(db,uid)
	{
		var key = await this.getcountkey();
		console.log('大转盘次数key',key)
		var res = await db.collection("rouletteinfo").doc(key+":"+uid).get();
		console.log("大转盘数据")
		console.log(res)
		if(!res.data || res.data.length<=0){
			return 5;
		}

		var c = parseInt(res.data[0].times);
		console.log('大转盘今日转了多少次',c)
		c = Math.min(c,5);
		c = Math.max(c,0);

		return Math.max(0,Math.min(5-c,5));
	}

	static async getquancount(db,uid)
	{
		var key = await this.getquankey();
		var res = await db.collection("rouletteinfo").doc(key+":"+uid).get();
		var count = await config.get("globalinfo","videocount");
		if(!res.data || res.data.length<=0){
			return count;
		}
		
		return Math.max(0,count-res.data[0].times);
	}

	static async getwatchcount(db,uid)
	{
		var key = await this.getwatchcountkey();
		var res = await db.collection("rouletteinfo").doc(key+":"+uid).get();
		
		if(!res.data || res.data.length<=0){
			return 0;
		}
		
		return res.data[0].times;
	}

	static async yqq2videocount(db, uid)
	{
		var key = await this.getquankey();
		var res = await db.collection("rouletteinfo").doc(key+":"+uid).get();
		const dbCmd = db.command;
		if(!res.data || res.data.length<=0){
			return 0;
		}
		
		if (res.data[0].times >= 15){
			var res = await db.collection("rouletteinfo").doc(key+":"+uid).update({
				times:dbCmd.inc(-1),
			});
			if (res.updated != 1) {
				await db.collection("rouletteinfo").doc(key+":"+uid).set({entime:time+24*3600,times:0})
			}
		}
	}
}