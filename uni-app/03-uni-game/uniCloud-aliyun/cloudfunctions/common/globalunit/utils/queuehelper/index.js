"use strict";
module.exports = class queuehelper {
	
	static async putLog(db,table,msg)
	{
		var MongoDB = db || uniCloud.database();
		try{
			//阿里云
			await MongoDB.collection(table).add(msg);
		}catch(e){
			//腾讯云
			await MongoDB.createCollection(table);
			await MongoDB.collection(table).add(msg);
		}
	}
	
	static async putBean(db,c,m,data,delay=0)
	{
		var MongoDB = db || uniCloud.database();
		// 延时执行
	}
	
	static async profitrecord(db,uid,count,balance,explane,t){
		var MongoDB = db || uniCloud.database();
		if(count != 0){
			var data = {
				uid:uid,
				t:t,
				count:count,
				balance:balance,
				explane:explane,
				createtime:Math.floor(Date.now()/1000)
			}
			await this.putLog(MongoDB, "user_profitrecord", data);
		}
	}
	
}
