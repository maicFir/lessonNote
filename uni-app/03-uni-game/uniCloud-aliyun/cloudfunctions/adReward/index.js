'use strict';
const db = uniCloud.database();

exports.main = async (event, context) => {
	const today = new Date(new Date(new Date().toLocaleDateString()).getTime()); // 当天0点
	const trToday = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' ' + today
		.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
	console.log("trToday: ",trToday);
	const todayLast = new Date(trToday.replace(/-/g, '/')).getTime() - 8 * 60 * 60 * 1000;
	console.log("todayLast:",todayLast);

	const {data: rouletteCountRes} = await db.collection('rouletteinfo').where({
		"_id": new RegExp('^roulette:quan:' + todayLast),//roulette:quan看视频次数
		"times":db.command.gte(30)
	}).get()
	
	
	let create_date = Date.now()
	let data =  rouletteCountRes.map(({_id,times})=>{
		return {
			user_id:_id.slice(28, _id.length),
			times,
			reward_fen:0,
			create_date
		}
	})
	if(data.length){
		return await db.collection('video-reward').add(data)
	}else{
		return "当日数据为空"
	}
};
