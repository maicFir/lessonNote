"use strict";

function clone(Obj){
	var buf;
	if(Obj instanceof Array){
		buf=[];
		var i=Obj.length;
		while(i--){
			buf[i]=clone(Obj[i]);
		}
		return buf;
	}
	else if(Obj instanceof Object){
		buf={};
		for(var k in Obj){
			buf[k]=clone(Obj[k]);
		}
		return buf;
	}else{
		return Obj;
	}
}

module.exports = class DBPOB
{
	constructor (_db,table,docId) {
		this._table = table;
		this._docId = docId;
		this._db = _db || uniCloud.database();
	}

	async load()
	{   
		var cmd = await this._db.collection(this._table).doc(this._docId).get();
		if(cmd.data){
			//转换类型
			//MongoDB
			//Redis 
			//Mysql
			for(let key in cmd.data[0]) {
				if(key!=undefined && key!=null){
					this[key] = cmd.data[0][key];
				}
			}
		}
	}

	async preservation(except = {})
	{
		const itermember = this.itermember();
		console.log("DBPOB preservation begin");
		// console.log(itermember)
		
		//如果没有则先set
		var cmd = await this._db.collection(this._table).doc(this._docId).get();
		if(!cmd.data || cmd.data.length<=0){
			await this._db.collection(this._table).doc(this._docId).set(itermember);
			return;
		}
		
		//有则更新，但需克隆
		var data = clone(itermember);
		//去除不需要更新字段
		for(let key in except) {
			if(key!=undefined && key!=null){
				delete data[key];
			}
		}
		await this._db.collection(this._table).doc(this._docId).update(data);
		console.log("DBPOB preservation update end");
		
		// 以后迭代merge 解开
		// const res = await this._db.collection(this._table).doc(this._docId).update(data);
		// if (res.updated != 1) {
		// 	await this._db.collection(this._table).doc(this._docId).set(data);
		// }
	}
	
	async add()
	{
		var itermember = this.itermember();
		//添加 无table 可能性
		try{
			//阿里云
			await this._db.collection(this._table).add(itermember);
		}catch(e){
			//腾讯云
			await this._db.createCollection(this._table);
			await this._db.collection(this._table).add(itermember);
		}
	}
	
	async remove()
	{
		await this._db.collection(this._table).doc(this._docId).remove();
	}

	itermember()
	{
		var data = {};
		for(let key in this) {
			if (key.substr(0,1) != "_") {
				data[key] = this[key];
			}
		}
		return data;
	}

	toarray()
	{
		var data = this.itermember();
		return data;
	}

}
