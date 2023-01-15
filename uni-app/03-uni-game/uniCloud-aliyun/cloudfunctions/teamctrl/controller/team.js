const {
	Controller
} = require('uni-cloud-router')
const global = require("globalunit");
const db = uniCloud.database()
const dbCmd = db.command
const $ = dbCmd.aggregate
module.exports = class TeamController extends Controller {



	async income(){
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			}
		}
		const {data:userFitrecord} = await db.collection('user_teamprofitrecord')
			.aggregate()
			.match({
				'uid':this.ctx.data.uid
			})
			.sort({
				createtime: -1
			})
			.skip(this.ctx.data.page*20)
			.limit(20)
			.lookup({
				from: 'userinfo',
				let: {
					uid: '$friend_id'
				},
				pipeline: $.pipeline()
					.match(
						dbCmd.expr(
							$.eq(
								['$$uid', '$_id']
							)
						)
					).project({
						nickname:true,
						avatar: true
					}).done(),
				as: 'uid'
			})
			.project({
				createtime: true,
				count: true,
				uid: true
			})
			.end()
			
		return {
			errcode:0,
			data:userFitrecord
		}
	}

	
	async getxiaji() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			}
		}

		var level = this.ctx.data.level || 1;
		var limit = this.ctx.data.limit || 20;
		var offset = this.ctx.data.offset || 0;
		var needTotal = this.ctx.data.needTotal || true;

		var res = await this.ctx.uniID.getInvitedUser({
			uid: this.ctx.data.uid,
			level: level,
			limit: limit,
			offset: offset*limit,
			needTotal: needTotal
		})
		console.log(res)
		if (res.code != 0) {
			return {
				errcode: 10001,
			}
		}
		var team = []
		for(var i=0;i<res['invitedUser'].length;i++){
			var id = res['invitedUser'][i]['_id']
			var user = await global.UserLogic.loaduser(this.db, id);
			team.push(await user.toparam())
		}
		console.log(team)
		return {
			errcode: 0,
			data: {
				list: team,
				total:res.total,
				offset:offset
			}
		}
	}

	// 获取上级信息
	async getshangji() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			}
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			}
		}
		
		if(user.shangji == 0){
			return {
				errcode: 10007,
			}
		}

		var sjuser = await global.UserLogic.loaduser(this.db, user.shangji);
		if (sjuser._id == 0) {
			return {
				errcode: 10005,
			}
		}

		return {
			errcode: 0,
			data: {
				user: await sjuser.toparam(),
			},
		};
	}

	// 社交信息
	async shejiao() {
		if (!this.ctx.data.uid || !this.ctx.data.weixin || !this.ctx.data.qq) {
			return {
				errcode: 10001,
			}
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			}
		}

		user.weixinid = this.ctx.data.weixin;
		user.qqid = this.ctx.data.qq;
		await user.save();
		await user.load();

		// await global.QueueHelper.putLog(this.db,"user_login", await user.toparam());

		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
			},
		};
	}

	//加载我的旅行团信息
	async loadteam() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			}
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			}
		}

		// 好友人数
		// var team1 = await this.ctx.uniID.getInvitedUser({
		// 	uid: this.ctx.data.uid,
		// 	level: 1,
		// 	limit: 10000,
		// 	offset: 0,
		// 	needTotal: true
		// })
		// var team2 = await this.ctx.uniID.getInvitedUser({
		// 	uid: this.ctx.data.uid,
		// 	level: 2,
		// 	limit: 10000,
		// 	offset: 0,
		// 	needTotal: true
		// })
		var u = await user.toparam();
		var friendcount = u.zhituifriend + u.kuosanfriend

		// 上级相关 
		var sjuser = await global.UserLogic.loaduser(this.db, user.shangji);
		var shangjifriendcount = 0;
		var shangjiprofit = 0.0;
		if (sjuser._id != 0) {
			// var t1 = await this.ctx.uniID.getInvitedUser({
			// 	uid: sjuser._id,
			// 	level: 1,
			// 	limit: 10000,
			// 	offset: 0,
			// 	needTotal: true
			// })

			// var zhituiuserlist = [];
			// for (var i = 0; i < t1.invitedUser.length; i++) {
			// 	var ztuser = await global.UserLogic.loaduser(this.db, t1.invitedUser[i]['_id']);
			// 	if (ztuser.isauthentication == 1) {
			// 		zhituiuserlist.push(await ztuser.toparam());
			// 	}
			// }

			// var t2 = await this.ctx.uniID.getInvitedUser({
			// 	uid: sjuser._id,
			// 	level: 2,
			// 	limit: 10000,
			// 	offset: 0,
			// 	needTotal: true
			// })

			// var kuosanuserlist = [];
			// for (var i = 0; i < t2.invitedUser.length; i++) {
			// 	var ksuser = await global.UserLogic.loaduser(this.db, t2.invitedUser[i]['_id']);
			// 	if (ksuser.isauthentication == 1) {
			// 		kuosanuserlist.push(await ksuser.toparam());
			// 	}
			// }
			var sju = await sjuser.toparam();
			shangjifriendcount = sju.zhituifriend + sju.kuosanfriend;
			shangjiprofit = sju['friendfen'];
		}
		var u = await user.toparam();

		var stages = await global.config.get("stage");
		var stage = stages[user.curstage - 1];

		var mubiao = stage["mubiao"];
		var beilv = stage["beilv"];

		var ok = await user.updatestage(mubiao);
		await user.load();

		var stage = stages[user.curstage - 1];
		var mubiao2 = stage["mubiao"];
		var beilv = stage["beilv"];
		if (ok.ok == 'ok') {
			var u = await user.toparam();
			await global.QueueHelper.profitrecord(this.db, user._id, mubiao, u['fen'], '喵喵团达标', 1);
		}

		var todaybegin = global.utils.today();
		
		var actiovecount = 0
		var task = await global.DialytaskLogic.loadtask(this.db, this.ctx.data.uid);
		var t = await task.toparam();
		var todaytotal = t['todayzhituifen'] + t['todaykuosanfen'];
		var count = await this.db.collection('huoyuerenshu').where({"parent":this.ctx.data.uid,"todaybegin":todaybegin}).count();
		var actiovecount = count.total
		return {
			errcode: 0,
			data: {
				friendcount: friendcount,
				firendfen: u['reqfriendfen'], // 好友累计赚钱
				todaytotal: todaytotal,
				todayzhitui: t['todayzhituifen'],
				todaykuosan: t['todaykuosanfen'],
				shangjifriendcount: shangjifriendcount,
				shangjiprofit: shangjiprofit,
				shangjiavater: sjuser.avatar,
				beilv: beilv,
				mubiao: mubiao2,
				actiovecount: actiovecount,
				stage: stage,
				stages:stages,
				shangjiid:u['shangji']
			},
		};
	}

	//加载旅行团
	async gettuijianrecord() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			}
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			}
		}

		var daijihuo = [];
		var zhituiuserlist = [];

		var team1 = await this.ctx.uniID.getInvitedUser({
			uid: this.ctx.data.uid,
			level: 1,
			limit: 10000,
			offset: 0,
			needTotal: true
		})

		for (var i = 0; i < team1.invitedUser.length; i++) {
			var ztuser = await global.UserLogic.loaduser(this.db, team1.invitedUser[i]['_id']);
			if (ztuser.lastlogintime > 0) {
				zhituiuserlist.push(await ztuser.toparam());
			} else {
				daijihuo.push(await ztuser.toparam());
			}
		}

		var team2 = await this.ctx.uniID.getInvitedUser({
			uid: this.ctx.data.uid,
			level: 2,
			limit: 10000,
			offset: 0,
			needTotal: true
		})

		var kuosanuserlist = [];
		for (var i = 0; i < team2.invitedUser.length; i++) {
			var ksuser = await global.UserLogic.loaduser(this.db, team2.invitedUser[i]['_id']);
			if (ksuser.lastlogintime > 0) {
				kuosanuserlist.push(await ksuser.toparam());
			} else {
				daijihuo.push(await ksuser.toparam());
			}
		}

		return {
			errcode: 0,
			data: {
				zhituiuserlist: zhituiuserlist,
				kuosanuserlist: kuosanuserlist,
				daijihuo: daijihuo,
			},
		};
	}

}
