'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	const collection = db.collection('test-demo')
	//event为客户端上传的参数
	console.log('event : ', event)
	const {id} = event;
	// 删除
	collection.where({_id: id}).remove();
	
	//返回数据给客户端
	return event
};
