"use strict";
const config = require("../../utils/config");
const Decimal = require("../../utils/decimal");

module.exports = class storelogic {

	static async calprice(count)
	{
		var price = await config.get("globalinfo","storeext");
		var t = Decimal.pow(1.07,count);
		var bigprice = Decimal.multipliedBy(t,price);
		return bigprice.toString();
	}

	static async loadstore(db,uid)
	{
		var a = [];
		var catmaxid = await config.get("catinfo","catmaxid");
		var catinfo = await config.get("cats");
		var storeinfo = {};
		var count = 0;
		
		var res = await db.collection('storeinfobyuid').doc(uid).get();
		var cangku = {};
		if(res.data && res.data[0]){
			cangku = res.data[0];
		}
		for(var i=1;i<=catmaxid;i++)
		{
			if (i == 38)
			{
				for (var j=2;j<=10;j++)
				{
					var k = "cat"+(38+j*100);
					var c = cangku[k] || 0;
					if (c > 0)
					{
						var tem = {
							lvl : 38+j*100,
							name : catinfo[k]['name'],
							count : c
						};
						count += c;
						a.push(tem);
					}
				}
			}
			else
			{
				var k = "cat"+i;
				var c = cangku[k] || 0;
				if (c > 0)
				{
					var tem = {
						lvl:i,
						name:catinfo['cat'+i]['name'],
						count:c
					};
					count += c;
					a.push(tem);
				}
			}
		}

		storeinfo['info'] = a;
		storeinfo['count'] = count;

		return storeinfo;
	}

	static async totalcount(db,uid)
	{
		var res = await db.collection('storeinfobyuid').doc(uid).get();
		var cangku = {};
		if(res.data && res.data[0]){
			cangku = res.data[0];
		}
		
		var c = 0;
		for (let k in cangku) {
			if(k != '_id'){
				c += parseInt(cangku[k]);
			}
		}
		
		return c;
	}

	static async add(db,uid,lvl,count)
	{
		const dbCmd = db.command;
		var obj = {};
		obj['cat'+lvl] = dbCmd.inc(count);
		var res = await db.collection('storeinfobyuid').doc(uid).update(obj);
		if (res.updated != 1) {
			var data = {};
			for (var i = 0; i < 38; i++) {
				data['cat'+i] = 0;
			}
			var arr = [138,238,338,438,538,638,738,838,938,1038];
			for (var i = 0; i < arr.length; i++) {
				data['cat'+arr[i]] = 0;
			}
			data['cat'+lvl] = count;
			await db.collection('storeinfobyuid').doc(uid).set(data);
		}
		
		if(count<=0){
			return 0;
		}
		
		var res = await db.collection('storeinfobyuid').doc(uid).get();
		var c = res.data[0]["cat"+lvl];
		return c;
	}

	static async count(db,uid,lvl)
	{
		var res = await db.collection('storeinfobyuid').doc(uid).get();
		var cangku = {};
		if(res.data && res.data[0]){
			cangku = res.data[0];
		}
		var c = cangku["cat"+lvl] || 0;
		return parseInt(c);
	}

	static async remove(db,uid,lvl,count)
	{
		const dbCmd = db.command;
		var obj = {};
		obj['cat'+lvl] = dbCmd.inc(-count);
		var res = await db.collection('storeinfobyuid').doc(uid).update(obj);
		
		var res = await db.collection('storeinfobyuid').doc(uid).get();
		var cangku = {};
		if(res.data && res.data[0]){
			cangku = res.data[0];
		}
		
		var c = cangku["cat"+lvl] || 0;
		return c;
	}
	
}