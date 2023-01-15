'use strict';
const db = uniCloud.database()
const global = require("globalunit");
const crypto = require('crypto');
const createConfig = require('uni-config-center')
const uniPayConfig = createConfig({pluginId: 'uni-pay'})
exports.main = async (event, context) => {
	console.log("videocallback----->",event)
	const secret = uniPayConfig.config('app.AD.securitykey'); // uniad 后台开通激励视频回调后生成的 secret
	const trans_id = event.trans_id;
	console.log("secret---->"+secret)
	console.log("trans_id---->"+trans_id)
	const sign2 = crypto.createHash('sha256').update(`${secret}:${trans_id}`).digest('hex');
	console.log("sign2---->"+sign2)
	if (event.sign !== sign2) {
		return null;
	}
	var time = Math.floor(Date.now() / 1000)-48*3600;
	console.log(time)
	const dbCmd = db.command
	await db.collection("videocallback").where({createtime:dbCmd.lt(time)}).remove()
	var isover = await db.collection('videocallback').doc(trans_id).get()
	if(isover.data.length > 0){
		console.log("videocallback----->isover---->")
		return true;
	}
	
	if(event.user_id == null || event.user_id == undefined){
		return false;
	}
	if(event.extra == null || event.extra == undefined){
		return false;
	}
	
	
	
	var user = await global.UserLogic.loaduser(db, event.user_id);
	console.log("videocallback----->user---->")
	console.log(user)
	if (user._id == 0 || user._id != event.user_id) {
		return false;
	}
	var quancount = await global.RouletteLogic.getquancount(db, event.user_id);
	if (quancount <= 0) {
		return true;
	}
	var res = await db.collection('lastvideotimes').doc(event.user_id).update({
		time: Math.floor(Date.now() / 1000)
	})
	if (res.updated != 1) {
		await db.collection('lastvideotimes').doc(event.user_id).set({
			time: Math.floor(Date.now() / 1000)
		})
	}
	// 减视频次数
	await global.RouletteLogic.addquan(db, event.user_id);
	var extra = JSON.parse(event.extra)
	console.log(extra)
	var reward_name = extra.reward_name
	var videotime = extra.videotime
	var coin = "0"
	console.log("videocallback----->reward_name---->"+reward_name)
	
	console.log("videocallback----->usercoin---->"+user.coin)
	if (reward_name == "抽奖次数") {
		await global.RouletteLogic.clearcount(db, event.user_id);
	} else if (reward_name == "金币") {
		// var lvl = user.maxlvl
		var lvl = Math.max(1, Math.max(0, user.maxlvl - 7));
		if(lvl<1){
			lvl = 1
		}
		if(lvl>37){
			lvl = 37
		}
		// var grow = await global.config.get("cats","cat"+lvl,"price");
		// var c = await global.Decimal.add(grow, 0);
		
		var catinfo = await global.CatLogic.loadcat(db, event.user_id);
		console.log("CatLogic.loadcat end");
		// console.log(catinfo)
		var num = catinfo['cat'+lvl];
		var jie = 1;
		if(!num){
			jie = 1;
		}else{
			jie = num+1;
		}
		// 计算购买价格
		var price = await global.CatLogic.calprice(lvl, jie);
		console.log("calprice:", price);
		
		coin = price
		await user.shangcoin(price+"",false,"视频收益")
		await user.save()
		await user.load()
		
		console.log("videocallback----->endusercoin---->"+user.coin)
	} else if (reward_name == "5倍奖励") {
		await global.RouletteLogic.setrolltimes(db, event.user_id, 5);
	} else if (reward_name == "10倍奖励") {
		await global.RouletteLogic.setrolltimes(db, event.user_id, 10);
	} else if (reward_name == "离线收益") {
		var offlinedata = await db.collection('offlinebonus').doc(event.user_id).get();
		if (offlinedata.data.length > 0) {
			var offlinebonus = parseInt(offlinedata.data[0]['offlinebonus']) * 2
			await db.collection('offlinebonus').doc(event.user_id).update({
				offlinebonus: offlinebonus
			});
			coin = offlinebonus
		}
	}
	
	if (user.isauthentication == 1) {
		await global.FriendActiveLogic.addcount(db, event.user_id, "videocount");
	}
	await global.BideLogic.addcount(db, event.user_id, 'videocount', 1);
	

	user.videocount = user.videocount + 1;
	await user.save()
	await user.load()
	console.log("videocallback----->user---->addvideocount")
	await db.collection('videocallback').doc(trans_id).set({
		createtime: Math.floor(Date.now() / 1000),
		uid:event.user_id,
		reward_name:reward_name,
		coin:coin+"",
		videotime:videotime
	})
	return {
		"isValid": true
	}
};
