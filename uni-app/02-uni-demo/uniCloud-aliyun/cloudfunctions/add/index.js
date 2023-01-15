'use strict';
const db = uniCloud.database();
// 连接test-demo表
const collection = db.collection('test-demo');
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {name, age} = event;
	collection.add({
		name,
		age
	})
	//返回数据给客户端
	return {
		code: 0
	}
};
