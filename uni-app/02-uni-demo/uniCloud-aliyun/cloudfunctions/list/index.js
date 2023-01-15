'use strict';
// 连接数据库
const db = uniCloud.database();
// 连接test-demo表
const collection = db.collection('test-demo');
const dbcommand = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	// 新增
	// collection.add({
	// 	name: 'test2',
	// 	age: 19
	// })
	// 查询
	const {data} = await collection.get();
	// 计数
	const count = await collection.count();
	// doc
	const doc = await collection.doc("639c06eff43e609a3cfa3c95").get();
	
	// 显示指定字段
	const fieldRes = await collection.field({name: true}).get();
	
	// 限制多少组数据
	const limitRes = await collection.limit(1).get()
	
	// 查询条件
	const dbcommondRes = await collection.where({
		age: dbcommand.gt(20)
	}).get()
	//返回数据给客户端
	return {
		code: 0,
		text: 'Web技术学苑',
		user: data,
		count,
		doc,
		fieldRes,
		limitRes,
		dbcommondRes
	}
};
