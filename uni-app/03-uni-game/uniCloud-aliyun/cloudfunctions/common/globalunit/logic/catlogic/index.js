"use strict";
const config = require("../../utils/config");
const utils = require("../../utils/utils");
module.exports = class catlogic {
	
	static async calprice(id,jie,cats=null)
	{
		console.log("calprice begin",{id,jie});
		if(jie<1){
			return;
		}
		var catinfo;
		if(cats!=null){
			catinfo = cats
		}else{
			catinfo = await config.get("cats");
		}
		var k="cat"+id;
		if (jie > parseInt(catinfo[k]['fengding'])) // 封顶次数
		{
			jie = parseInt(catinfo[k]['fengding']);
		}
		console.log("fengding",catinfo[k]['fengding']);
		var cat = catinfo[k];
		var price = cat['price'];
        price = parseInt(price)
        console.log("价格",price);
        console.log("价格1",Math.floor(price*Math.pow(1.07,jie-1)));
		return Math.floor(price*Math.pow(1.07,jie-1));
	}

	static async caljie(db,uid,did)
	{
		console.log("caljie",{uid,did});
		var info = await this.loadcat(db,uid);
		var k='cat'+did;
		var lvl = info[k];
		if(!lvl){
			return 1;
		}
		return lvl+1;
	}

	static async getkey(uid)
	{
		var key = 'cat:zset:'+uid;
		return key;
	}

	static async canhecheng(did1,did2)
	{
		if(did1<=0 || did2<=0 ){
			return false;
		}

		if(did1>=1 && did2<37 && did1==did2){
			return true;
		}

		if(did1==did2 && did1==37){
			return true;
		}

		if((did1==938 && did2==838) || (did2==938 && did1==838)){
			return true;
		}

		if (did1 >= 238 && did1 <= 638 && did2 >= 238 && did2 <= 638)
		{
			return true;
		}

		return false;
	}

	static async hecheng(did1,did2,exceptcat,lvl, persecfen)
	{
		
		console.log("hecheng",{did1,did2,exceptcat,lvl, persecfen});
		
		if(did1>=1 && did2<37)
		{
			if (lvl<5 && did1+1>=5)
			{
				// 5级红包
				var lvl5hongbao = await config.get('lvl5', 'hongbao');
				return {newcat:did1+1,hongbao:lvl5hongbao};
			}
			
			if(did1+1>lvl)  // 升级
			{
				var time1 = await config.get('xianshicat', 'time1');
				var time2 = await config.get('xianshicat', 'time2');
				var gailv = await config.get('xianshicat', 'gailv');
				// var gailv = 100
				var rnd = utils.getRandom(time1,time2);
				// var rnd = 1
				var r = utils.getRandom(1, 100);
				var time = Math.floor(Date.now()/1000);
				if (r<=gailv && exceptcat != 138)
				{
					return {newcat:did1+1,bonuscat:138,expire:rnd * 60,fen:persecfen * rnd, time:time + rnd*60};
				}
				else
				{
					var fen1 = await config.get("hechenghongbao", "hongbao1");
					var fen2 = await config.get("hechenghongbao", "hongbao2");
				}

				return {newcat:did1+1,};
				
			}
			else
			{
				return {newcat:did1+1};
			}
			
		}

		var lvl37to1038 = await config.get("lvl37to1038", "gailv");
		if(did1==37 && did2==37 && lvl37to1038 < 100)
		{
			var tmp=[];

			do{
				for(var i=0;i<1;i++){
					var rnd = utils.getRandom(5,15);
					tmp.push({bonuscat:138,expire:rnd*60, fen:persecfen * rnd});
				}
			}while(0);


			do{
				for(var i=0;i<1;i++){
					tmp.push({newcat:738});
				}
			}while(0);

			do{
				for(var i=0;i<1;i++){
					tmp.push({newcat:838});
				}
			}while(0);

			do{
				for(var i=0;i<1;i++){
					tmp.push({newcat:938});
				}
			}while(0);


			do{
				var flag=[];
				for(var i=2;i<=6;i++){
					if(i!=exceptcat){
						flag.push(i);
					}
				}

				while(tmp.length<10000){
					var r= utils.getRandom(0,flag.length-1);
					var newcat = flag[r]*100+38;
					
					tmp.push({newcat:newcat});
				}
			}while(0);

			var r = utils.getRandom(0,tmp.length);
			return tmp[r];
		}
		else if (did1==37 && did2==37 && lvl37to1038 == 100)
		{
			return {newcat:1038};
		}

		// 情侣猫
		if((did1==938 && did2==838) || (did2==938 && did1==838)){
			return {hongbao:52};
		}

		// 五大洲猫合成
		// if (did1 >= 238 && did1 <= 638 && did2 >= 238 && did2 <= 638)
		// {
		//     return {newcat:1038};
		// }
		return null;
	}

	static async loadcat(db,uid)
	{
		var key = await this.getkey(uid);
		var a = {};
		
		let res = await db.collection('buycountinfo').doc(key).get();
		if(res.data && res.data.length>0){
			return res.data[0];
		}
		
		var a={};
		var catmaxid = await config.get("catinfo","catmaxid");
		for(var i=1;i<=catmaxid;i++){
			var k = "cat"+i;
			a[k] = 0;
		}
		return a;
	}

	static async add(db,uid,did,jie)
	{
		var key = await this.getkey(uid);
		var k="cat" + did;
		
		const dbCmd = db.command;
		var obj = {};
		obj[k] = dbCmd.inc(jie);
		let res = await db.collection('buycountinfo').doc(key).update(obj)
		if (res.updated != 1) {
			//创建
			var a={};
			var catmaxid = await config.get("catinfo","catmaxid");
			for(var i=1;i<=catmaxid;i++){
				var k = "cat"+i;
				a[k] = 0;
				if(i==did){
					a[k] = jie;
				}
			}
			await db.collection('buycountinfo').doc(key).set(a);
			return jie;
		}
		
		return jie;
	}
}