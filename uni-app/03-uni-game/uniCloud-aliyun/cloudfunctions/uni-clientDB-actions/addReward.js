// 开发文档：https://uniapp.dcloud.io/uniCloud/clientdb?id=action
const db = uniCloud.database();
const dbCmd = db.command
module.exports = {
	before: async (state, event) => {
		
	},
	after: async (state, event, error, result) => {
		if (error) {
			throw error
		}
		// console.log({state, event, error, result},"000000000000000");
		if(state.type == 'update' && result.updated){
			let [{user_id}] = state.command.getParam({
							"name":"where",
							index:0
						});
			let [{reward_fen}] =  state.command.getParam({
										"name":"update",
										index:0
									});
									
				console.log("reward_fen: ",reward_fen);					
									
									
			//增加看视频奖励金额
			let res = await db.collection("userinfo").doc(user_id).update({fen:dbCmd.inc(reward_fen)});
			
			//记录奖励流水
			if(res.updated){
				let {data:userInfo} =  await db.collection("userinfo").doc(user_id).get();
				
				const addRes = await db.collection("user_profitrecord").add({
					uid:user_id,
					t:20,
					count:reward_fen/1000,
					balance:userInfo[0].fen/1000,
					explane:"看视频奖励",
					createtime:Math.floor(Date.now()/1000)
				})
			}
			
		}
		return result
	}
}
