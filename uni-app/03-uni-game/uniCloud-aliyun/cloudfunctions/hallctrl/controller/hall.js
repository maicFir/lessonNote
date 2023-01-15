const {
	Controller
} = require('uni-cloud-router')
const global = require("globalunit");
module.exports = class HallController extends Controller {
	// async ceshi() {
	// 	await global.BideLogic.addcount(this.db, "60f155222c0a8000017b4646", 'friendcount', 1);
	// 	return {
	// 		errcode: 0,
			
	// 	};
	// }
	//注销账号
	async closeUser() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
		console.log("user:----- ",user);
		console.log("user: ",user._id);
		var res = await this.ctx.uniID.closeAccount({
			uid: user._id,
		});
		
		console.log("res: ",res);
		await user.save();
		return {
			errcode: 0,
			user: await user.toparam()
		};
	}
	async gettixiantype() {
		var tixiantype = await global.config.get("tixiantype", "type");
		return {
			errcode: 0,
			tixiantype: tixiantype
		};
	}
	async getadtime() {
		var time = await global.config.get("setadtime", "time");
		return {
			errcode: 0,
			time: time
		};
	}
	async geturl() {
		var url = await global.config.get("globalinfo", "url");
		return {
			errcode: 0,
			url: url
		};
	}
	async sendSmsCode() {
		if (!this.ctx.data.phone || !this.ctx.data.type) {
			return {
				errcode: 10001,
			};
		}

		//正则判断手机号
		if (!/^1\d{10}/.test(this.ctx.data.phone)) {
			return {
				errcode: 10001,
			};
		}

		//获取调用ip
		var clientIp = this.ctx.context.CLIENTIP;
		if (!clientIp) {
			return {
				errcode: 10001,
			};
		}

		//简单控制下调用次数
		var cansend = await global.UserLogic.cansendsms(this.db, clientIp);
		if (!cansend) {
			return {
				errcode: 10048,
			};
		}

		//发送验证码
		var randomStr = '00000' + Math.floor(Math.random() * 1000000);
		var code = randomStr.substring(randomStr.length - 6);
		var templateId = await global.config.get("globalinfo", "templateId")
		var res = await this.ctx.uniID.sendSmsCode({
			mobile: this.ctx.data.phone,
			code: code,
			expiresIn: 180,
			type: this.ctx.data.type,
			templateId: templateId + "" //短信模版id
		});

		return {
			errcode: 0,
			res: res
		};
	}

	async loginBySms() {
		if (!this.ctx.data.phone || !this.ctx.data.code) {
			return {
				errcode: 10001
			};
		}

		if (!/^1\d{10}/.test(this.ctx.data.phone)) {
			return {
				errcode: 10001
			};
		}

		var res = await this.ctx.uniID.loginBySms({
			mobile: this.ctx.data.phone,
			code: this.ctx.data.code
		});

		console.log('手机回执---->', res);

		if (res.code != 0) {
			return {
				errcode: 10005,
			};
		}

		if (res.code == 10202) {
			return {
				errcode: 10004,
			};
		}


		var user = await global.UserLogic.loaduser(this.db, res.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		// 查看账户异常
		if (user.accountstatus == 1 || user.accountstatus == "1") {
			return {
				errcode: 10008,
			};
		}

		//查看是否有邀请码
		if (user.inviteCode == '') {
			var res = await this.ctx.uniID.setUserInviteCode({
				uid: user._id,
			});

			if (res.code != 0) {
				return {
					errcode: 10049,
				};
			}

			user.inviteCode = res.myInviteCode;
		}

		user.persec = await global.RoomLogic.totalcal(this.db, res.uid, Math.min(4, user.city),user);
		var clientIp = this.ctx.context.CLIENTIP;
		user.ip = clientIp;
		user.lastlogintime = Math.floor(Date.now() / 1000);
		user.lastonlinetime = Math.floor(Date.now() / 1000);
		await user.save();
		await user.load();
		//TODO: 处理用户登录和注册的日志
		var userinfo = await user.toparam();
		await global.QueueHelper.putLog(this.db, "user_login", userinfo);
		return {
			errcode: 0,
			data: {
				user: userinfo,
				token: res.token
			}
		};
	}

	async bindWeixin() {
		if (!this.ctx.data.uid || !this.ctx.data.code) {
			return {
				errcode: 10001,
			};
		}
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
		const res = await this.ctx.uniID.bindWeixin({
			uid: this.ctx.data.uid,
			code: this.ctx.data.code
		})
		if (res.code != 0) {
			return {
				errcode: 60302,
			};
		}
		user.openid = res.openid
		await user.save();
		return {
			errcode: 0,
			user: await user.toparam()
		};
	}

	async loginByWeixin() {
		if (!this.ctx.data.code) {
			return {
				errcode: 10001
			};
		}

		//微信登录
		var res = await this.ctx.uniID.loginByWeixin({
			code: this.ctx.data.code,
		});

		console.log('微信回执---->', res);
		
		if(res.code === 10006){
			return {
				errcode: 30010
			};
		}
		
		if (res.code != 0) {
			return {
				errcode: 10005
			};
		}

		if (!res.unionid) {
			return {
				errcode: 10005
			};
		}

		var user = await global.UserLogic.loaduser(this.db, res.uid);
		// console.log('玩家信息---->', user);
		//首次需要创建
		if (user._id == 0) {
			user._id = res.uid;
			// user.nickname = res.userInfo.username;
			// user.avatar = res.userInfo.avatar;
			// user.sex = res.userInfo.sex;
			// 先装载插入
			await user.save();
			await user.load();
			await user.shangcity();
			user.curcat = 1;
			user.exceptcat = global.utils.random(2, 6);
			user.createtime = Math.floor(Date.now() / 1000);
			user.caltime = Math.floor(Date.now() / 1000);
			await user.save();
			// 赠送两条1级猫
			// 暂时mongo不支持有则获取，无则插入，所以先设置；
			await global.RoomLogic.setpos(this.db, res.uid, 1, 1);
			await global.RoomLogic.setpos(this.db, res.uid, 2, 1);
			await user.load();
			
			//重新计时
			await global.BonusLogic.reqbonus(this.db, res.uid);
		}
		console.log('初始化玩家成功')
		var user = await global.UserLogic.loaduser(this.db, res.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		//查看是否账号异常或封号
		if (user.accountstatus == 1 || user.accountstatus == "1") {
			return {
				errcode: 10008,
			};
		}

		//查看是否有邀请码
		if (user.inviteCode == '') {
			console.log("res", user._id)
			var res1 = await this.ctx.uniID.setUserInviteCode({
				uid: user._id,
			});
			if (res1.code != 0) {
				return {
					errcode: 10049,
				};
			}
			user.inviteCode = res1['myInviteCode'];
		}
		user.openid = res.openid;
		user.persec = await global.RoomLogic.totalcal(this.db, res.uid, Math.min(4, user.city),user);
		var clientIp = this.ctx.context.CLIENTIP;
		user.ip = clientIp;
		user.lastlogintime = Math.floor(Date.now() / 1000);
		user.lastonlinetime = Math.floor(Date.now() / 1000);
		if(user.isauthentication == 1 && user.isadd == 0){
			if(user.shangji != 0){
				var sjuser = await global.UserLogic.loaduser(this.db, user.shangji);
				sjuser.zhituifriend += 1
				await sjuser.save()
				if(sjuser.shangji != 0){
					var ssjuser = await global.UserLogic.loaduser(this.db, sjuser.shangji);
					ssjuser.kuosanfriend += 1
					await ssjuser.save()
				}
				user.isadd = 1
			}
		}
		await user.save();
		await user.load();
		//TODO: 处理用户登录和注册的日志
		// await global.QueueHelper.putLog(this.db, "user_login", await user.toparam());
		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
				token: res.token,
			}
		};
	}

	async loginByApple() {
		var params = this.ctx.data
		console.log(params, "参数")
		if (!params['identityToken']) {
			return {
				errcode: 10001,
			};
		}
		console.log("开始登录")
		const verifyApple = await this.ctx.uniID.verifyAppleIdentityToken({
			identityToken: params['identityToken']
		})
		console.log(verifyApple, "登录参数")
		if (verifyApple.code != 0) {
			return {
				errcode: 10050
			};
		}
		console.log("Apple登录校验verifyAppleIdentityToken: ", verifyApple);
		var res = await this.ctx.uniID.loginByApple(params)
		console.log("Apple登录返回 ", res);
		
		
		if(res.code === 10006){
			return {
				errcode: 30010
			};
		}
		
		var user = await global.UserLogic.loaduser(this.db, res.uid);
		//首次需要创建
		if (user._id == 0) {
			user._id = res.uid;
			user.nickname = res.userInfo.nickname;
			// user.avatar = res.userInfo.avatar;
			user.sex = 1;
			// 先装载插入
			await user.save();
			await user.load();
			await user.shangcity();
			user.curcat = 1;
			user.exceptcat = global.utils.random(2, 6);
			user.createtime = Math.floor(Date.now() / 1000);
			user.caltime = Math.floor(Date.now() / 1000);
			await user.save();
			// 赠送两条1级猫
			// 暂时mongo不支持有则获取，无则插入，所以先设置；
			await global.RoomLogic.setpos(this.db, res.uid, 1, 1);
			await global.RoomLogic.setpos(this.db, res.uid, 2, 1);
			await user.load();
			//重新计时
			await global.BonusLogic.reqbonus(this.db, res.uid);
		}
		console.log('初始化玩家成功')
		var user = await global.UserLogic.loaduser(this.db, res.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		//查看是否账号异常或封号
		if (user.accountstatus == 1 || user.accountstatus == "1") {
			return {
				errcode: 10008,
			};
		}

		//查看是否有邀请码
		if (user.inviteCode == '') {
			console.log("res", user._id)
			var res1 = await this.ctx.uniID.setUserInviteCode({
				uid: user._id,
			});
			if (res1.code != 0) {
				return {
					errcode: 10049,
				};
			}
			user.inviteCode = res1['myInviteCode'];
		}
		// user.openid = res.openid;
		user.persec = await global.RoomLogic.totalcal(this.db, res.uid, Math.min(4, user.city),user);
		var clientIp = this.ctx.context.CLIENTIP;
		user.ip = clientIp;
		user.lastlogintime = Math.floor(Date.now() / 1000);
		user.lastonlinetime = Math.floor(Date.now() / 1000);
		if(user.isauthentication == 1 && user.isadd == 0){
			if(user.shangji != 0){
				var sjuser = await global.UserLogic.loaduser(this.db, user.shangji);
				sjuser.zhituifriend += 1
				await sjuser.save()
				if(sjuser.shangji != 0){
					var ssjuser = await global.UserLogic.loaduser(this.db, sjuser.shangji);
					ssjuser.kuosanfriend += 1
					await ssjuser.save()
				}
				user.isadd = 1
			}
		}
		await user.save();
		await user.load();
		//TODO: 处理用户登录和注册的日志
		// await global.QueueHelper.putLog(this.db, "user_login", await user.toparam());
		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
				token: res.token,
			}
		};
	}

	async loginByUniverify() {
		var params = this.ctx.data
		console.log("params:------- ",params);
		// var phoneconfig = await global.config.get("phoneconfig")
		// const getPhone = await uniCloud.getPhoneNumber({
		// 	appid: phoneconfig['appid'],
		// 	provider: phoneconfig['provider'],
		// 	apiKey: phoneconfig['apiKey'],
		// 	apiSecret: phoneconfig['apiSecret'],
		// 	access_token: params['access_token'],
		// 	openid: params['openid']
		// })
		// console.log("getPhone: ", getPhone);

		var res = await this.ctx.uniID.loginByUniverify(params)
		console.log("res:---------- ",res);
		
		if(res.code === 10006){
			return {
				errcode: 30010
			};
		}
		
		
		if (res.code != 0) {
			return {
				errcode: 10051
			};
		}
		var user = await global.UserLogic.loaduser(this.db, res.uid);
		//首次需要创建
		if (user._id == 0) {
			user._id = res.uid;
			// user.nickname = res.userInfo.nickname;
			// user.avatar = res.userInfo.avatar;
			user.sex = 1;
			// 先装载插入
			await user.save();
			await user.load();
			await user.shangcity();
			user.curcat = 1;
			user.exceptcat = global.utils.random(2, 6);
			user.createtime = Math.floor(Date.now() / 1000);
			user.caltime = Math.floor(Date.now() / 1000);
			await user.save();
			// 赠送两条1级猫
			// 暂时mongo不支持有则获取，无则插入，所以先设置；
			await global.RoomLogic.setpos(this.db, res.uid, 1, 1);
			await global.RoomLogic.setpos(this.db, res.uid, 2, 1);
			await user.load();
			//重新计时
			await global.BonusLogic.reqbonus(this.db, res.uid);
		}
		console.log('初始化玩家成功')
		var user = await global.UserLogic.loaduser(this.db, res.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		//查看是否账号异常或封号
		if (user.accountstatus == 1 || user.accountstatus == "1") {
			return {
				errcode: 10008,
			};
		}

		//查看是否有邀请码
		if (user.inviteCode == '') {
			console.log("res", user._id)
			var res1 = await this.ctx.uniID.setUserInviteCode({
				uid: user._id,
			});
			if (res1.code != 0) {
				return {
					errcode: 10049,
				};
			}
			user.inviteCode = res1['myInviteCode'];
		}
		// user.openid = res.openid;
		user.persec = await global.RoomLogic.totalcal(this.db, res.uid, Math.min(4, user.city),user);
		var clientIp = this.ctx.context.CLIENTIP;
		user.ip = clientIp;
		user.lastlogintime = Math.floor(Date.now() / 1000);
		user.lastonlinetime = Math.floor(Date.now() / 1000);
		user.phone = res.mobile;
		
		if(user.isauthentication == 1 && user.isadd == 0){
			if(user.shangji != 0){
				var sjuser = await global.UserLogic.loaduser(this.db, user.shangji);
				sjuser.zhituifriend += 1
				await sjuser.save()
				if(sjuser.shangji != 0){
					var ssjuser = await global.UserLogic.loaduser(this.db, sjuser.shangji);
					ssjuser.kuosanfriend += 1
					await ssjuser.save()
				}
				user.isadd = 1
			}
		}
		await user.save();
		await user.load();
		//TODO: 处理用户登录和注册的日志
		// await global.QueueHelper.putLog(this.db, "user_login", await user.toparam());
		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
				token: res.token,
			}
		};
	}

	async setuserinfo() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		if (user.accountstatus == 1 || user.accountstatus == "1") {
			return {
				errcode: 10008,
			};
		}

		if (this.ctx.data.nickname) {
			user.nickname = this.ctx.data.nickname
		}
		if (this.ctx.data.avatar) {
			user.avatar = this.ctx.data.avatar
		}
		if (this.ctx.data.sex) {
			user.sex = this.ctx.data.sex
		}
        if (this.ctx.data.zhifubao) {
        	user.zhifubao = this.ctx.data.zhifubao
        }
		await user.save();
		await user.load();
		return {
			errcode: 0,
			data: {
				user: await user.toparam()
			}
		};
	}
	async getuserinfo() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		if (user.accountstatus == 1 || user.accountstatus == "1") {
			return {
				errcode: 10008,
			};
		}

		return {
			errcode: 0,
			data: {
				user: await user.toparam()
			}
		};
	}

	async bindMobile() {
		var params = this.ctx.data.params
		if (!this.ctx.data.uid || !params) {
			return {
				errcode: 10001,
			};
		}
		console.log('参数',params)
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
		
		const res = await this.ctx.uniID.bindMobile({
			uid:this.ctx.data.uid,
			type : 'univerify',
			openid:params.openid,
			access_token:params.access_token
		})
		console.log("短信", res)
		if (res.code != 0 || res.code == 60101) {
			return {
				errcode: 10010,
			};
		}
		
		user.phone = res.mobile;
		await user.save();
		return {
			errcode: 0,
			phone:res.mobile,
			res: res
		};
	}

	async bindshangji() {
		if (!this.ctx.data.uid || !this.ctx.data.inviteCode) {
			return {
				errcode: 10001,
			};
		}

		// 验证玩家信息
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		// 已经含有邀请人
		if (user.shangji != 0) {
			return {
				errcode: 10010,
			};
		}


		// 验证邀请人信息 
		var cmd = await this.db.collection('uni-id-users').where({
			my_invite_code: this.ctx.data.inviteCode,
		}).get();
		console.log("验证邀请人信息", cmd)
		// 实在是不知数据格式了
		if (!cmd.data || cmd.data.length <= 0) {
			return {
				errcode: 10005,
			};
		}

		var sjuid = cmd.data[0]._id;
		var sjuser = await global.UserLogic.loaduser(this.db, sjuid);
		if (sjuser._id == 0) {
			return {
				errcode: 10005,
			};
		}

		const res = await this.ctx.uniID.acceptInvite({
			uid: user._id,
			inviteCode: this.ctx.data.inviteCode,
		});

		if (res.code != 0) {
			return {
				errcode: 10001,
			}
		}

		// 邀请人与被邀请人重复
		if (sjuid == user._id) {
			return {
				errcode: 10009,
			};
		}

		//这里需要判断上级是否死循环

		//绑定上级
		if (user._id != 0 && sjuid != 0) {
			user.shangji = sjuid;
			user.bindtime = Math.floor(Date.now() / 1000)
			// 好友活跃
			if (user.isauthentication == 1) {
				user.isadd = 1;
				sjuser.zhituifriend += 1
				if(sjuser.shangji != 0){
					var ssjuser = await global.UserLogic.loaduser(this._db, sjuser.shangji);
					ssjuser.kuosanfriend += 1
					await ssjuser.save()
				}
			}
			await user.save();
			await user.load();
			if (user.isauthentication == 1) {
				await global.FriendActiveLogic.addcount(this.db, this.ctx.data.uid, "friendcount");
			}
			// 每日直推任务
			var task = await global.DialytaskLogic.loadtask(this.db, sjuid);
			if (task.uid == 0) {
				task.uid = sjuid;
			}
			task.zhituitoday += 1;
			if (task.zhituitoday >= 5) {
				task.m3 = 1;
			}
			await task.shangtodaydata('todayfriendcount');
			await task.shangtodaydata('todayzhituicount');
			await task.save();

			// 邀请券
			sjuser.yaoqingquan += 1;
			await sjuser.save();
			await sjuser.load();

			// 必得进度
			await global.BideLogic.addcount(this.db, sjuid, 'friendcount', 1);
			if (sjuser.shangji != 0) {
				tasksj = await global.DialytaskLogic.loadtask(this.db, sjuser.shangji);
				await tasksj.shangtodaydata('todaykuosancount');
				await tasksj.save();
				// 必得进度
				await global.BideLogic.addcount(this.db, sjuser.shangji, 'friendcount', 1);
			}
		}

		await global.QueueHelper.putLog(this.db, "user_login", await user.toparam());
		await global.QueueHelper.putLog(this.db, "user_login", await sjuser.toparam());

		return {
			errcode: 0,
			data: {
				user: await user.toparam()
			}
		};
	}

	// 获取仓库
	async loadstore() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		var store = await global.StoreLogic.loadstore(this.db, this.ctx.data.uid);
		var cap = await global.config.get("globalinfo", "initstorecap") + user.storeext;

		return {
			errcode: 0,
			data: {
				store: store['info'],
				count: store['count'],
				cap: cap,
			}
		};
	}

	async loadhall() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}
		console.log('用户uid',this.ctx.data.uid)
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		//刷新金币
		if(true){
			var fangda = await global.config.get('fangda') || 1000;
			//当前服务器时间
			var time = Math.floor(Date.now()/1000);
			var elapsed = time-user.caltime;
			elapsed =Math.max(0,elapsed);
			var grow = 0
			//超过5秒才计算金币，频繁操作不计算，节省DB操作
			if(elapsed>5){
				grow = await global.Decimal.multipliedBy(user.persec,elapsed);
				//若时间小于5分钟
				if (time - user.lastonlinetime < 300){
					var now = await global.Decimal.add(user.coin,grow);
					
					//增加积分记录
					await this.db.collection("uni-id-scores").add({
						user_id:this.ctx.data.uid,
						score:grow,
						type:1,
						balance:now,
						comment:elapsed+"秒在线收益",
						create_date:Date.now()
					})
					console.log("add uni-id-scores end");
					
					user.coin = now;
				}else{
					//TODO 大于5分钟如何处理？
					// 5分钟没有心跳，则理解为离线，暂不处理
				}
				user.caltime = time;
				
				var c = user.leijicoinrank;
				var newgrow = await global.Decimal.add(c,grow);
				var c1 = "0"
				var c2 = c1.repeat(60-newgrow.length)
				user.leijicoinrank = c2+newgrow
			}
		}
		
		var room = [];
		var now = Math.floor(Date.now() / 1000);
		for(var i = 1; i <= 12; i++){
			var s = user['poscatlvl' + i];
			s = parseInt(s);
			var fen = user['posfen' + i]
			var expiretime = user['posexpiretime' + i]
			
			if (fen > 0 && expiretime != -1 && (now >= expiretime)) {
				// 该到期分红
				s = 0;
				user['poscatlvl' + i] = 0
				user['posfen' + i] = 0
				user['posexpiretime' + i] = -1
				await user.shangfen(fen, "fen", true,true);
				var xscat = await global.XSCatLogic.loadxscat(this.db, this.ctx.data.uid);
				await global.XSCatLogic.setinfo(this.db, this.ctx.data.uid, expiretime, fen);
				var u = await user.toparam();
				await global.QueueHelper.profitrecord(this.db, this.ctx.data.uid, fen, u.fen, '限时金色招财猫分红', 2);
			}
			
			var catitem = {};
			if (s == 0) {
				catitem = {
					lvl: 0,
					pos: i,
					persec: 0,
					ttl: -1,
				};
			} else {
				var cat = await global.config.get('cats', 'cat' + s);
				var persec = cat['cal' + user.city];
				persec = parseInt(persec)
				catitem = {
					lvl: s,
					pos: i,
					persec: persec,
					// 在这和redis的ttl不一样 得先判断是否是限时
					ttl: (expiretime == -1 ? expiretime : expiretime - now)
				}
			}
			room.push(catitem);
		}
		var maxlvl = Math.max(1, Math.max(0, user.maxlvl - 7));
		var jie = await global.CatLogic.caljie(this.db, this.ctx.data.uid, maxlvl);
		console.log("caljie end",jie)
		var price = await global.CatLogic.calprice(maxlvl, jie);
		console.log("calprice end",price)

		var fenhongcat = await global.config.get("globalinfo", "todayprofit");

		var persec = await global.RoomLogic.totalcal(this.db, this.ctx.data.uid, Math.min(4, user.city),user)
		user.persec = persec
		console.log('persec', user.persec)
		await user.save();
		console.log('user.save end')
		// await user.load();
		// // 如果有显示分红猫信息   前端弹窗
		var xscat = await global.XSCatLogic.loadxscat(this.db, this.ctx.data.uid);
		var totaltime = 0;
		var totalfen = 0;

		if (xscat.time > 0) {
			totaltime = xscat.time;
			totalfen = xscat.fen;
			await global.XSCatLogic.remove(this.db, this.ctx.data.uid);
		}

		var offlinebonus = '0';
		var offlinedata = await this.db.collection('offlinebonus').doc(this.ctx.data.uid).get();
		if (offlinedata.data.length > 0) {
			console.log("offline 1");
			offlinebonus = offlinedata.data[0]['offlinebonus']
		} else {
			console.log("offline 2");
			if (Math.floor(Date.now() / 1000) - user.lastonlinetime > 20 * 60 && user.lastonlinetime != 0) {
				console.log("处理离线逻辑");
				var t = Math.floor(Date.now() / 1000) - user.lastonlinetime;
				if (t > 2 * 3600) {
					t = 2 * 3600;
				}
				var grow = await global.Decimal.multipliedBy(user.persec, Math.floor(t * 0.2));
				var c = await global.Decimal.add(grow, 0);
				offlinebonus = "" + c;
				var res = await this.db.collection('offlinebonus').doc(this.ctx.data.uid).update({
					"offlinebonus": offlinebonus
				});
				if (res.updated != 1) {
					await this.db.collection('offlinebonus').doc(this.ctx.data.uid).set({
						"offlinebonus": offlinebonus
					});
				}
				user.lastonlinetime = Math.floor(Date.now() / 1000);
				await user.save();
				//复用之前的，不在load
				//await user.load();
			}
		}
		var coin = await global.config.get('qiandao', 'coin')
		var qiandao = await global.Decimal.multipliedBy(user.persec, coin);
		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
				room: room,
				"bonustask": await global.BonusLogic.loadtask(this.db, this.ctx.data.uid),
				"offlinebonus": offlinebonus,
				"now": Math.floor(Date.now() / 1000),
				"curcanbuycat": maxlvl,
				"price": price,
				"fenhongcat": fenhongcat,
				// "cityprocess": cityprocess,
				"totaltime": totaltime,
				"totalfen": totalfen,
				// "isnewcity": isnewcity,
				"maxmoney": user.maxmoney,
				"qiandao": qiandao
			}
		};
	}

	//合成
	async hecheng() {
		var begin = new Date().getTime()
		if (!this.ctx.data.uid || !this.ctx.data.posfrom || !this.ctx.data.posto) {
			return {
				errcode: 10001,
			};
		}
        this.ctx.data.posfrom = Number(this.ctx.data.posfrom)
        this.ctx.data.posto = Number(this.ctx.data.posto)
		if (this.ctx.data.posto < 1 || this.ctx.data.posto > 12) {
			return {
				errcode: 10001,
			};
		}

		if (this.ctx.data.posfrom < 1 || this.ctx.data.posfrom > 12) {
			return {
				errcode: 10001,
			};
		}

		if (this.ctx.data.posfrom == this.ctx.data.posto) {
			return {
				errcode: 10001,
			};
		}
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		var room = [];
		var now = Math.floor(Date.now() / 1000);
		for(var i = 1; i <= 12; i++){
			var s = user['poscatlvl' + i];
			s = parseInt(s);
			var fen = user['posfen' + i]
			var expiretime = user['posexpiretime' + i]
			
			if (fen > 0 && expiretime != -1 && (now >= expiretime)) {
				// 该到期分红
				s = 0;
				user['poscatlvl' + i] = 0
				user['posfen' + i] = 0
				user['posexpiretime' + i] = -1
				await user.shangfen(fen, "fen", true,true);
				var xscat = await global.XSCatLogic.loadxscat(this.db, this.ctx.data.uid);
				await global.XSCatLogic.setinfo(this.db, this.ctx.data.uid, expiretime, fen);
				var u = await user.toparam();
				await global.QueueHelper.profitrecord(this.db, this.ctx.data.uid, fen, u.fen, '限时金色招财猫分红', 2);
			}
			
			var catitem = {};
			if (s == 0) {
				catitem = {
					lvl: 0,
					pos: i,
					persec: 0,
					ttl: -1,
				};
			} else {
				var cat = await global.config.get('cats', 'cat' + s);
				var persec = cat['cal' + user.city];
				persec = parseInt(persec)
				catitem = {
					lvl: s,
					pos: i,
					persec: persec,
					// 在这和redis的ttl不一样 得先判断是否是限时
					ttl: (expiretime == -1 ? expiretime : expiretime - now)
				}
			}
			room.push(catitem);
		}
		var kfrom = "pos" + this.ctx.data.posfrom;
		var kto = "pos" + this.ctx.data.posto;
        console.log(this.ctx.data.posfrom - 1)
        console.log(this.ctx.data.posto - 1)
		var didfrom = room[this.ctx.data.posfrom - 1]['lvl'];
		var didto = room[this.ctx.data.posto - 1]['lvl'];
        didfrom = Number(didfrom)
        didto = Number(didto)
        console.log('合成',didfrom+'-----'+didto)
		var ok = await global.CatLogic.canhecheng(didfrom, didto);
		if (!ok) {
			return {
				errcode: 20003,
			};
		}
		var bonuscat = -1;
		var newcat = -1;
		var expire = -1;
		var fen = 0;
		var hongbao = 0;
		var endtime = 0;

		var fenhong = await global.config.get("globalinfo", "todayprofit");
		var persecfen = Math.floor(fenhong / 24 / 60 * 10000) / 10000;
		console.log("persecfen", persecfen)
		var res = await global.CatLogic.hecheng(didfrom, didto, user.exceptcat, user.maxlvl, persecfen);
		console.log("resresres", res)
		if (res.hasOwnProperty('newcat')) {
			newcat = res['newcat'];
		}
		if (res.hasOwnProperty('fen')) {
			fen = res['fen'];
		}
		if (res.hasOwnProperty('bonuscat')) {
			bonuscat = res['bonuscat'];
			if (res.hasOwnProperty('expire')) {
				expire = res['expire'];
			}
			endtime = res['time'];

			// 替换当前猫
			user.curcat = bonuscat;
			await user.save();
		}


		var tmp = {
			'posto': this.ctx.data.posto,
			'posfrom': this.ctx.data.posfrom,
			'didfrom': didfrom,
			'didto': didto,
		};
		var ok1 = await global.RoomLogic.hecheng(this.db, this.ctx.data.uid, this.ctx.data.posfrom, this.ctx.data.posto,
			didfrom, didto, newcat, bonuscat, expire, fen);
		await user.load();
		tmp['ok'] = ok1['ok'];
		if (ok1['ok'] != 'ok') {
			return {
				'errcode': 10001,
				'a': 'hecheng'
			};
		}

		if (newcat == 1038) // 永久分红猫
		{
			var fenhongcat = await global.FenhongCatLogic.loadfenhongcat(this.db, this.ctx.data.uid);
			await fenhongcat.shangcat();
			var time = Math.floor(Date.now() / 1000);
			var msg = {
				_id: this.ctx.data.uid + '_' + time,
				uid: this.ctx.data.uid,
				nickname: user.nickname,
				createtime: time,
			};
			await global.QueueHelper.putLog(this._db, "user_getfenhongcatrecord", msg);
		}

		// 现金红包 
		if (res.hasOwnProperty('hongbao')) {
			var hongbao = res['hongbao'];
			await user.shangfen(hongbao,'fen',false,true);
			await user.save();
			await user.load();
			var u = await user.toparam();
			if (hongbao == 52) {
				global.QueueHelper.profitrecord(this.db, user._id, hongbao, u['fen'], '雷公电母合成', 7);
			} else if (res['hecheng'] == 1) {
				global.QueueHelper.profitrecord(this.db, user._id, hongbao, u['fen'], '合成红包', 10);
			} else {
				global.QueueHelper.profitrecord(this.db, user._id, hongbao, u['fen'], '5级红包', 5);
			}
		}

        
		var isnewmaxlvl = 0;
		if (newcat > user.maxlvl) {
			user.curcat = newcat;
			isnewmaxlvl = 1;
		}
        var cat=null;
        if(newcat > -1){
            cat = await global.config.get("cats", "cat" + newcat);
        }else{
            cat = await global.config.get("cats", "cat" + user.curcat);
        }
		var pre_lvl = user.maxlvl;
		user.maxlvl = Math.max(user.maxlvl, Math.min(38, didfrom + 1));
		//计算每秒产生金币总数
		user.persec = await global.RoomLogic.totalcal(this.db, this.ctx.data.uid, Math.min(4, user.city),user);
		user.hechengcount += 1;
		await user.refreshcoin();
		console.log("refreshcoin end:", new Date().getTime() - begin);
		await user.save();
		console.log("user.save end:", new Date().getTime() - begin);

		await global.BideLogic.addcount(this.db, user._id, 'hechengcount', 1);
		console.log("addcount end:", new Date().getTime() - begin);

		if (pre_lvl < 8 && newcat >= 8) {
			await global.FriendActiveLogic.addcount(this.db, user._id, "friendcount");
		}
		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
				"newcat": newcat,
				"hongbao": hongbao,
				"bonus": fen,
				"endtime": endtime,
				"isnewmaxlvl": isnewmaxlvl,
				"newcatname": cat['name'],
				room: await global.RoomLogic.loadroom(this.db, this.ctx.data.uid, Math.min(4, user.city))
			},
		};
	}

	//移动猫
	async movecat() {

		if (!this.ctx.data.uid || !this.ctx.data.posf || !this.ctx.data.post) {
			return {
				errcode: 10001,
			};
		}
		var post = parseInt(this.ctx.data.post)
		var posf = parseInt(this.ctx.data.posf)
		if (posf < 1 || posf > 12) {
			return {
				errcode: 10001,
			};
		}

		if (post < 1 || post > 12) {
			return {
				errcode: 10001,
			};
		}

		if (posf == post) {
			return {
				errcode: 10001,
			};
		}

		var ok = await global.RoomLogic.move(this.db, this.ctx.data.uid, posf, post);
		if(ok['ok']=='usererr'){
			return {
				errcode: 10005,
			};
		}
		if(ok['ok']=='ng'){
			return {
				errcode: 10048,
			};
		}
		var user = ok['user'];
		var room = [];
		var now = Math.floor(Date.now() / 1000);
		for(var i = 1; i <= 12; i++){
			var s = user['poscatlvl' + i];
			s = parseInt(s);
			var fen = user['posfen' + i]
			var expiretime = user['posexpiretime' + i]
			
			var catitem = {};
			if (s == 0) {
				catitem = {
					lvl: 0,
					pos: i,
					persec: 0,
					ttl: -1,
				};
			} else {
				var cat = await global.config.get('cats', 'cat' + s);
				var persec = cat['cal' + user.city];
				persec = parseInt(persec)
				catitem = {
					lvl: s,
					pos: i,
					persec: persec,
					// 在这和redis的ttl不一样 得先判断是否是限时
					ttl: (expiretime == -1 ? expiretime : expiretime - now)
				}
			}
			room.push(catitem);
		}
		return {
			errcode: 0,
			data: {
				room: room
			},
		};

	}

	//买猫
	async buycat() {
		var t = 1
		if (this.ctx.data.t) {
			t = this.ctx.data.t // 1 快捷购买   2   商店购买
		}
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		if (!this.ctx.data.did) {
			return {
				errcode: 10001,
			};
		}
		var did = this.ctx.data.did
		console.log(did)
		
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
		console.log('UserLogic.loaduser end')


		var canbuylvl = t == 1 ? 7 : 5;
		var maxlvl = Math.max(1, Math.max(0, user.maxlvl - canbuylvl));
		if (maxlvl < did && user.maxlvl<37) {
			return {
				errcode: 20009,
			};
		}
		await user.refreshcoin();
		console.log('refreshcoin end')
		//查找可用坑位
		var pos = await global.RoomLogic.findpos(this.db, this.ctx.data.uid,user);
		console.log('RoomLogic.findpos end')
		if (!pos) {
			return {
				errcode: 20001,
			};
		}
		var catinfo = await global.CatLogic.loadcat(this.db, this.ctx.data.uid);
		console.log("CatLogic.loadcat end");
		// console.log(catinfo)
		var lvl = catinfo['cat'+did];
		var jie = 1;
		if(!lvl){
			jie = 1;
		}else{
			jie = lvl+1;
		}
		// 计算购买价格
		var price = await global.CatLogic.calprice(did, jie);
		console.log("calprice:", price);
		//消耗积分
		var ok = await user.xiacoin(price);
		if (ok["ok"] != "ok") {
			return {
				errcode: 20002,
				'needcoin': user.maxmoney,
				'persec': user.persec
			};
		}
		if (price > user.maxmoney) {
			user.maxmoney = price;
		}
		
		var room = [];
		var now = Math.floor(Date.now() / 1000);
		for(var i = 1; i <= 12; i++){
			var s = user['poscatlvl' + i];
			s = parseInt(s);
			var fen = user['posfen' + i]
			var expiretime = user['posexpiretime' + i]
			
			if (fen > 0 && expiretime != -1 && (now >= expiretime)) {
				// 该到期分红
				s = 0;
				user['poscatlvl' + i] = 0
				user['posfen' + i] = 0
				user['posexpiretime' + i] = -1
				await user.shangfen(fen, "fen", true,true);
				var xscat = await global.XSCatLogic.loadxscat(this.db, this.ctx.data.uid);
				await global.XSCatLogic.setinfo(this.db, this.ctx.data.uid, expiretime, fen);
				var u = await user.toparam();
				await global.QueueHelper.profitrecord(this.db, this.ctx.data.uid, fen, u.fen, '限时金色招财猫分红', 2);
			}
			
			var catitem = {};
			if (s == 0) {
				catitem = {
					lvl: 0,
					pos: i,
					persec: 0,
					ttl: -1,
				};
			} else {
				var cat = await global.config.get('cats', 'cat' + s);
				var persec = cat['cal' + user.city];
				persec = parseInt(persec)
				catitem = {
					lvl: s,
					pos: i,
					persec: persec,
					// 在这和redis的ttl不一样 得先判断是否是限时
					ttl: (expiretime == -1 ? expiretime : expiretime - now)
				}
			}
			room.push(catitem);
		}
		user['poscatlvl' + pos] = did
		user['posexpiretime' + pos] = -1
		user['posfen' + pos] = 0
		// 新购时，可以无需计算每秒金币，留在laodhall中计算
		user.maxlvl = Math.max(user.maxlvl, did);
		await global.CatLogic.add(this.db, this.ctx.data.uid, did, 1);
		console.log('CatLogic.add end')
		catinfo['cat'+did] = jie;
		
		var loadhallmaxlvl = Math.max(1, Math.max(0, user.maxlvl - 7));
		var loadhalllvl = catinfo['cat'+loadhallmaxlvl];
		var loadhalljie = 1;
		if(!loadhalllvl){
			loadhalljie = 1;
		}
		loadhalljie = loadhalllvl+1;
		
		var loadhallprice = await global.CatLogic.calprice(loadhallmaxlvl, loadhalljie);
		console.log("calprice end")
		
		var fenhongcat = await global.config.get("globalinfo", "todayprofit");
		
		var persec = await global.RoomLogic.totalcal(this.db, this.ctx.data.uid, Math.min(4, user.city),user)
		console.log("RoomLogic.totalcal end")
		user.persec = persec + ''
		user.maxmoney = user.maxmoney + ''
		
		
		
		var xscat = await global.XSCatLogic.loadxscat(this.db, this.ctx.data.uid);
		console.log("XSCatLogic.loadxscat end")
		var totaltime = 0;
		var totalfen = 0;
		
		if (xscat.time > 0) {
			totaltime = xscat.time;
			totalfen = xscat.fen;
			await global.XSCatLogic.remove(this.db, this.ctx.data.uid);
		}
		
		var offlinebonus = '0';
		var offlinedata = await this.db.collection('offlinebonus').doc(this.ctx.data.uid).get();
		console.log("offlinebonus doc get")
		if (offlinedata.data.length > 0) {
			offlinebonus = offlinedata.data[0]['offlinebonus']
		} else {
			if (Math.floor(Date.now() / 1000) - user.lastonlinetime > 20 * 60 && user.lastonlinetime != 0) {
				console.log("处理离线逻辑");
				var t = Math.floor(Date.now() / 1000) - user.lastonlinetime;
				if (t > 2 * 3600) {
					t = 2 * 3600;
				}
				var grow = await global.Decimal.multipliedBy(user.persec, Math.floor(t * 0.2));
				var c = await global.Decimal.add(grow, 0);
				offlinebonus = "" + c;
				var res = await this.db.collection('offlinebonus').doc(this.ctx.data.uid).update({
					"offlinebonus": offlinebonus
				});
				if (res.updated != 1) {
					await this.db.collection('offlinebonus').doc(this.ctx.data.uid).set({
						"offlinebonus": offlinebonus
					});
				}
				user.lastonlinetime = Math.floor(Date.now() / 1000);
			}
		}
		console.log("user.save begin")
		await user.save();
		console.log("user.save end")
		var coin = await global.config.get('qiandao', 'coin')
		var qiandao = await global.Decimal.multipliedBy(user.persec, coin);
		var room = [];
		var now = Math.floor(Date.now() / 1000);
		for(var i = 1; i <= 12; i++){
			var s = user['poscatlvl' + i];
			s = parseInt(s);
			var fen = user['posfen' + i]
			var expiretime = user['posexpiretime' + i]
			
			var catitem = {};
			if (s == 0) {
				catitem = {
					lvl: 0,
					pos: i,
					persec: 0,
					ttl: -1,
				};
			} else {
				var cat = await global.config.get('cats', 'cat' + s);
				var persec = cat['cal' + user.city];
				persec = parseInt(persec)
				catitem = {
					lvl: s,
					pos: i,
					persec: persec,
					// 在这和redis的ttl不一样 得先判断是否是限时
					ttl: (expiretime == -1 ? expiretime : expiretime - now)
				}
			}
			room.push(catitem);
		}
		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
				room: room,
				"bonustask": await global.BonusLogic.loadtask(this.db, this.ctx.data.uid),
				"offlinebonus": offlinebonus,
				"now": Math.floor(Date.now() / 1000),
				"curcanbuycat": loadhallmaxlvl,
				"price": loadhallprice,
				"fenhongcat": fenhongcat,
				// "cityprocess": cityprocess,
				"totaltime": totaltime,
				"totalfen": totalfen,
				// "isnewcity": isnewcity,
				"maxmoney": user.maxmoney,
				"qiandao": qiandao
			}
		};
		
		
		// return {
		// 	errcode: 0,
		// 	data: {
		// 		"did": did,
		// 		"pos": pos,
		// 		"price": price,
		// 		"jie": jie,
		// 		user: await user.toparam(),
		// 		room: room
		// 	},
		// };
	}

	//保存 移动到仓库
	async store() {

		if (!this.ctx.data.uid || !this.ctx.data.pos) {
			return {
				errcode: 10001,
			};
		}
		var pos = this.ctx.data.pos

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		var cap = await global.config.get("globalinfo", "initstorecap") + user.storeext;
		var curcount = await global.StoreLogic.totalcount(this.db, this.ctx.data.uid);
		if (curcount >= cap) {
			return {
				errcode: 20010,
			};
		}

		var room = [];
		var now = Math.floor(Date.now() / 1000);
		for(var i = 1; i <= 12; i++){
			var s = user['poscatlvl' + i];
			s = parseInt(s);
			var fen = user['posfen' + i]
			var expiretime = user['posexpiretime' + i]
			
			if (fen > 0 && expiretime != -1 && (now >= expiretime)) {
				// 该到期分红
				s = 0;
				user['poscatlvl' + i] = 0
				user['posfen' + i] = 0
				user['posexpiretime' + i] = -1
				await user.shangfen(fen, "fen", true,true);
				var xscat = await global.XSCatLogic.loadxscat(this.db, this.ctx.data.uid);
				await global.XSCatLogic.setinfo(this.db, this.ctx.data.uid, expiretime, fen);
				var u = await user.toparam();
				await global.QueueHelper.profitrecord(this.db, this.ctx.data.uid, fen, u.fen, '限时金色招财猫分红', 2);
			}
			
			var catitem = {};
			if (s == 0) {
				catitem = {
					lvl: 0,
					pos: i,
					persec: 0,
					ttl: -1,
				};
			} else {
				var cat = await global.config.get('cats', 'cat' + s);
				var persec = cat['cal' + user.city];
				persec = parseInt(persec)
				catitem = {
					lvl: s,
					pos: i,
					persec: persec,
					// 在这和redis的ttl不一样 得先判断是否是限时
					ttl: (expiretime == -1 ? expiretime : expiretime - now)
				}
			}
			room.push(catitem);
		}
		var k = "pos" + pos;
		var did = room[pos - 1]["lvl"];
		if (did <= 0) {
			return {
				errcode: 20004,
			};
		}

		if (did == 138 || did == 1038) {
			return {
				errcode: 10025,
			};
		}

		if(user['poscatlvl' + pos] != did){
			return {
				errcode: 20004,
			};
		}
		
		user['posfen' + pos] = 0
		user['posexpiretime' + pos] = 0
		user['poscatlvl' + pos] = 0
		await global.StoreLogic.add(this.db, this.ctx.data.uid, did, 1);
		user.persec = await global.RoomLogic.totalcal(this.db, this.ctx.data.uid, Math.min(4, user.city),user);
		await user.refreshcoin();
		await user.save();
		var room = [];
		var now = Math.floor(Date.now() / 1000);
		for(var i = 1; i <= 12; i++){
			var s = user['poscatlvl' + i];
			s = parseInt(s);
			var fen = user['posfen' + i]
			var expiretime = user['posexpiretime' + i]
			
			var catitem = {};
			if (s == 0) {
				catitem = {
					lvl: 0,
					pos: i,
					persec: 0,
					ttl: -1,
				};
			} else {
				var cat = await global.config.get('cats', 'cat' + s);
				var persec = cat['cal' + user.city];
				persec = parseInt(persec)
				catitem = {
					lvl: s,
					pos: i,
					persec: persec,
					// 在这和redis的ttl不一样 得先判断是否是限时
					ttl: (expiretime == -1 ? expiretime : expiretime - now)
				}
			}
			room.push(catitem);
		}
		return {
			errcode: 0,
			data: {
				"did": did,
				"pos": pos,
				user: await user.toparam(),
				room: room,
			}
		};
	}


	//从仓库里面取出来
	async withdraw() {

		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		if (!this.ctx.data.did) {
			return {
				errcode: 10001,
			};
		}
		var did = this.ctx.data.did
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}


		var pos = await global.RoomLogic.findpos(this.db, this.ctx.data.uid,user);
		if (!pos) {
			return {
				errcode: 20001,
			};
		}

		await user.refreshcoin();
		await user.save();

		var count = await global.StoreLogic.count(this.db, this.ctx.data.uid, did);
		if (count <= 0) {
			return {
				errcode: 20005,
			};
		}

		var room = await global.RoomLogic.loadroom(this.db, this.ctx.data.uid, Math.min(4, user.city));
		var ok = await global.RoomLogic.setpos(this.db, this.ctx.data.uid, pos, did);
		await user.load();
		if (ok['ok'] != "ok") {
			return {
				errcode: 20005,
			};
		}

		await global.StoreLogic.remove(this.db, this.ctx.data.uid, did, 1);
		user.persec = await global.RoomLogic.totalcal(this.db, this.ctx.data.uid, Math.min(4, user.city),user);
		await user.refreshcoin();
		await user.save();
		await user.load();
		await global.QueueHelper.putLog(this.db, "user_login", await user.toparam());
		return {
			errcode: 0,
			data: {
				"did": did,
				"pos": pos,
				user: await user.toparam(),
				room: await global.RoomLogic.loadroom(this.db, this.ctx.data.uid, Math.min(4, user.city)),
			},
		};
	}

	//扩展仓库
	async storeext() {

		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		var cap = await global.config.get("globalinfo", "initstorecap") + user.storeext;
		// price = await global.StoreLogic.calprice(user.storeext);
		var price = await global.config.get('globalinfo', 'storeext');
		await user.refreshcoin();
		var ok = await user.xiacoin(price);
		if (ok['ok'] == 'ng') {
			return {
				errcode: 20002,
			};
		}

		user.storeext = user.storeext + 1;
		await user.save();
		await user.load();
		await global.QueueHelper.putLog(this.db, "user_login", await user.toparam());
		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
				"store": await global.StoreLogic.loadstore(this.db, this.ctx.data.uid),
				"cap": cap + 1,
			}
		};
	}

	//扩展仓库的价格
	async storeextprice() {

		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
		

		// price = await global.StoreLogic.calprice(user.storeext);
		var price = await global.config.get('globalinfo', 'storeext');
		return {
			errcode: 0,
			"price": price,
			"count": user.storeext,
		};
	}

	//销毁  获取回收价格
	async getdestoryprice() {

		if (!this.ctx.data.uid || !this.ctx.data.pos) {
			return {
				errcode: 10001,
			};
		}
		var pos = this.ctx.data.pos

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		var room = await global.RoomLogic.loadroom(this.db, this.ctx.data.uid, Math.min(4, user.city));
		var k = "pos" + pos;
		var did = room[pos - 1]["lvl"];
		if (did <= 0) {
			return {
				errcode: 20004,
			};
		}
		
		if (did == 138 || did == 1038 || did == 838 || did == 938) {
			return {
				errcode: 10031,
			};
		}
		

		var price = await global.config.get("cats", "cat" + did, "huishou");
		price = parseInt(price)
        if(did == 738){
            var fen1 = await global.config.get("sale", "hongbao1");
            var fen2 = await global.config.get("sale", "hongbao2");
            
            price = fen1 + '~' + fen2
        }
		return {
			errcode: 0,
			data: {
				"price": price,
			}
		};
	}

	//销毁
	async destory() {

		if (!this.ctx.data.uid || !this.ctx.data.pos) {
			return {
				errcode: 10001,
			};
		}
		var pos = this.ctx.data.pos

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		var room = await global.RoomLogic.loadroom(this.db, this.ctx.data.uid, Math.min(4, user.city));
		await user.load();
		var k = "pos" + pos;
		var did = parseInt(room[pos - 1]["lvl"]);
		if (did <= 0) {
			return {
				errcode: 20004,
			};
		}

		if (did == 138 || did == 1038 || did == 838 || did == 938) {
			return {
				errcode: 10031,
			};
		}

		var catcount = await global.RoomLogic.calcatcount(this.db, this.ctx.data.uid,user);
		if (catcount <= 1) {
			return {
				errcode: 10036,
			};
		}
		
		if(user['poscatlvl' + pos] != did){
			return {
				errcode: 20004,
			};
		}
		
		user['posfen' + pos] = 0
		user['posexpiretime' + pos] = 0
		user['poscatlvl' + pos] = 0
		

		var hongbao = 0;
		if (did == 738) // 回收白龙马  随机5-50元红吧
		{
			var fen1 = await global.config.get("sale", "hongbao1");
			var fen2 = await global.config.get("sale", "hongbao2");

			// var hongbao = randomFloat(fen1, fen2);
			var hongbao = Math.random() * (fen2 - fen1) + fen1
			hongbao = Math.floor(hongbao * 100) / 100
			await user.shangfen(hongbao,'fen',false,true);
			await user.save();
			await user.load();
			var u = await user.toparam();
			global.QueueHelper.profitrecord(this.db, user._id, hongbao, u['fen'], '风伯回收', 6);

		} else if (did <= 638 && did >= 238) {
			var price = await global.config.get("cats", "cat" + did, "huishou");
			price = parseInt(price)
			user.shangcoin(price, true, "回收猫")
			await user.refreshcoin();
			user.persec = await global.RoomLogic.totalcal(this.db, this.ctx.data.uid, Math.min(4, user.city),user);
			await user.save();
			await user.load();
		} else {
			var price = await global.config.get("cats", "cat" + did, "huishou");
			price = parseInt(price)
			user.shangcoin(price, true, "回收猫")
			await user.refreshcoin();
			user.persec = await global.RoomLogic.totalcal(this.db, this.ctx.data.uid, Math.min(4, user.city),user);
			await user.save();
			await user.load();
		}

		return {
			errcode: 0,
			data: {
				"did": did,
				"pos": pos,
				"hongbao": hongbao,
				user: await user.toparam(),
				room: await global.RoomLogic.loadroom(this.db, this.ctx.data.uid, Math.min(4, user.city)),
			}
		};
	}



	//每隔60分钟领取一次金币奖励的功能
	async reqbonus() {

		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		var bonustask = await global.BonusLogic.loadtask(this.db, this.ctx.data.uid);
		console.log("bonustask", bonustask)
		if (!bonustask['bonustask']['ok']) {
			// await global.BonusLogic.reqbonus(this.db, this.ctx.data.uid);
			return {
				errcode: 20006,
			};
		}

		var coin = await global.BonusLogic.calbonus(this.db, this.ctx.data.uid);
		await user.shangcoin(coin, false, "整点收益");
		await user.refreshcoin();
		await user.save();
		await user.load();
		await global.QueueHelper.putLog(this.db, "user_login", await user.toparam());

		// 重新计时
		await global.BonusLogic.reqbonus(this.db, this.ctx.data.uid);
		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
				"bonus": coin,
				"bonustask": await global.BonusLogic.loadtask(this.db, this.ctx.data.uid),
			},
		};
	}


	// 加载商店
	async loadshop() {
		var now = Date.now();
		console.log('时间戳',now)
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);

		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
		var offlinebonus1 = await user.refreshcoin();
		await user.save();

		var shoplist = [];
		var catinfo = await global.CatLogic.loadcat(this.db, this.ctx.data.uid);
		var cats = await global.config.get('cats');
		console.log(cats)
		for (var i = 1; i <= 37; i++) {
			var cat = cats['cat'+i];
			var lvl = catinfo['cat'+i];
			var jie = 1;
			if(!lvl){
				jie = 1;
			}
			jie = lvl+1;
			var price = await global.CatLogic.calprice(i, jie,cats);
			var city = user.city;
			if (city >= 4) {
				city = 4;
			}
			var persec = cat['cal' + city];
			var shopitem = {}
			if(user.maxlvl >= 37){
				shopitem = {
					'lvl': i,
					'name': cat['name'],
					'price': price,
					'persec': persec,
					'canbuy': (Math.max(user.maxlvl, 1) >= i)
				};
			}else{
				var shopitem = {
					'lvl': i,
					'name': cat['name'],
					'price': price,
					'persec': persec,
					'canbuy': (Math.max(user.maxlvl - 5, 1) >= i)
				};
			}
			shoplist.push(shopitem);
		}

		var u = await user.toparam();
		var now1 = Date.now();
		console.log('时间戳1',now)
		console.log('时间戳2',now1-now)
		return {
			errcode: 0,
			data: {
				"shoplist": shoplist,
				"coin": u['coin'],
			}
		};
	}

	// 获取大转盘次数
	async loadroulette() {

		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		var c = await global.RouletteLogic.getcount(this.db, this.ctx.data.uid);

		console.log('今日剩余转盘次数',c)
		return {
			errcode: 0,
			data: {
				"count": c,
			},
		};
	}

	// 大转盘
	async roll() {

		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		var c = await global.RouletteLogic.getcount(this.db, this.ctx.data.uid);
		var rc = await global.RouletteLogic.getrollcounter(this.db, this.ctx.data.uid);
		if (c <= 0) {
			return {
				errcode: 20007,
			};
		}
		var tp = await global.RouletteLogic.roll(this.db, this.ctx.data.uid);
		while (true) {
			tp = await global.RouletteLogic.roll(this.db, this.ctx.data.uid);
			if (c == 1) {
				if (tp != 4 && tp != 8 && tp != 9) {
					break;
				}
			} else {
				break;
			}
		}

		var times = await global.RouletteLogic.getrolltimes(this.db, this.ctx.data.uid);
		while (times > 1 && c > 1) {
			tp = await global.RouletteLogic.roll(this.db, this.ctx.data.uid);
			if (tp != 4 && tp != 8 && tp != 9) {
				break;
			}
		}
		if (times == 2) {
			times = 1;
		}
		var newbonuskey = "";
		var beishu = 0;
		var coin = 0;
		var hongbao = 0;
		var awards = await global.config.get("roulette");
		switch (tp) {
			case 1:
				coin = user.persec * awards['shaoliang'] * 60 * times;
				await global.RouletteLogic.incrollcounter(this.db, this.ctx.data.uid);
				await global.RouletteLogic.setrolltimes(this.db, this.ctx.data.uid, 1);
				break;
			case 2:
				coin = user.persec * awards['zhongliang'] * 60 * times;
				await global.RouletteLogic.incrollcounter(this.db, this.ctx.data.uid);
				await global.RouletteLogic.setrolltimes(this.db, this.ctx.data.uid, 1);
				break;
			case 3:
				coin = user.persec * awards['daliang'] * 60 * times;
				await global.RouletteLogic.incrollcounter(this.db, this.ctx.data.uid);
				await global.RouletteLogic.setrolltimes(this.db, this.ctx.data.uid, 1);
				break;
			case 4:
				// newbonuskey=strToHex(XXTEA::encrypt(json_encode(["counter" : rc+1,"times" : 5,]),"donotbullshitme"));
				beishu = 5;
				await global.RouletteLogic.incrollcounter(this.db, this.ctx.data.uid);
				await global.RouletteLogic.setrolltimes(this.db, this.ctx.data.uid, 2);
				break;
			case 5:
				coin = user.persec * awards['hailiang'] * 60 * times;
				await global.RouletteLogic.incrollcounter(this.db, this.ctx.data.uid);
				await global.RouletteLogic.setrolltimes(this.db, this.ctx.data.uid, 1);
				break;
			case 6:
				coin = user.persec * awards['zhongliang'] * 60 * times;
				await global.RouletteLogic.incrollcounter(this.db, this.ctx.data.uid);
				await global.RouletteLogic.setrolltimes(this.db, this.ctx.data.uid, 1);
				break;
			case 7:
				coin = user.persec * awards['daliang'] * 60 * times;
				await global.RouletteLogic.incrollcounter(this.db, this.ctx.data.uid);
				await global.RouletteLogic.setrolltimes(this.db, this.ctx.data.uid, 1);
				break;
			case 8:
				// newbonuskey=strToHex(XXTEA::encrypt(json_encode(["counter" : rc+1,"times" : 10,]),"donotbullshitme"));
				beishu = 10;
				await global.RouletteLogic.incrollcounter(this.db, this.ctx.data.uid);
				await global.RouletteLogic.setrolltimes(this.db, this.ctx.data.uid, 2);
				break;
			case 9:
				// 现金红包
				hongbao1 = await global.config.get('zphongbao', 'hongbao1');
				hongbao2 = await global.config.get('zphongbao', 'hongbao2');
				// hongbao = randomFloat(hongbao1, hongbao2);
				hongbao = Math.random() * (fen2 - fen1) + fen1
				hongbao = Math.floor(hongbao * 100) / 100
				break;
		}
		user.shangcoin(coin, false, "大转盘收益")
		await global.RouletteLogic.addcount(this.db, this.ctx.data.uid, 1);
		var c = await global.RouletteLogic.getcount(this.db, this.ctx.data.uid);
		if (hongbao > 0) {
			await user.shangfen(hongbao,'fen',false,true);
			await user.load();
			var u = await user.toparam();
			global.QueueHelper.profitrecord(this.db, user._id, hongbao, u['fen'], '幸运转盘抽奖红包', 4);
		}
		await user.refreshcoin();
		await user.save();
		await user.load();
		await global.QueueHelper.putLog(this.db, "user_login", await user.toparam());
		return {
			errcode: 0,
			data: {
				"count": c,
				"rc": rc,
				"tp": tp,
				"coin": coin,
				"times": times,
				user: await user.toparam(),
				// "bonuskey":newbonuskey,
				"beishu": beishu,
				"hongbao": hongbao,
			},
		};
	}

	async getroulettesetting() {

		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		var awards = await global.config.get("roulette");

		return {
			errcode: 0,
			data: {
				"awards": awards,
			}
		};
	}


	// 剩余视频次数
	async reqrollquan() {

		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		var quancount = await global.RouletteLogic.getquancount(this.db, this.ctx.data.uid);
		if (quancount <= 0) {
			// return {errcode:20008,};
			quancount = 0;
		}
		
		var catinfo = await global.CatLogic.loadcat(this.db, this.ctx.data.uid);
		console.log("CatLogic.loadcat end");
		var maxlvl = Math.max(1, Math.max(0, user.maxlvl - 7));
		// var maxlvl = user.maxlvl
		
		if(maxlvl<1){
			maxlvl = 1
		}
		
		if(maxlvl>37){
			maxlvl = 37
		}
		
		var lvl = catinfo['cat'+maxlvl];
		var jie = 1;
		if(!lvl){
			jie = 1;
		}else{
			jie = lvl+1;
		}
		// 计算购买价格
		var price = await global.CatLogic.calprice(maxlvl, jie);
		console.log("calprice:", price);
		
		return {
			errcode: 0,
			data: {
				quancount: quancount,
				coin: price + ""
			}
		};
	}


	// 签到
	async signin() {

		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
		var today = await global.utils.today()
		var _id = this.ctx.data.uid + today
		var res = await this.db.collection('qiandao').doc(_id).get();
		if (res.data && res.data.length > 0) {
			return {
				errcode: 10035,
			};
		}
		var data = {}
		data['uid'] = this.ctx.data.uid
		data['createtime'] = Math.floor(Date.now() / 1000)
		await this.db.collection('qiandao').doc(_id).set(data)
		var coin = await global.config.get('qiandao', 'coin')
		var grow = await global.Decimal.multipliedBy(user.persec, coin);
		await user.shangcoin(grow, true, "签到收益")

		await user.save()
		// var task = await global.DialytaskLogic.loadtask(this.db, this.ctx.data.uid);
		// if (task._id == 0) {
		// 	task._id = this.ctx.data.uid;
		// 	task.uid = this.ctx.data.uid;
		// }

		// if (task.m1 == 1) {
		// 	return {
		// 		errcode: 10035,
		// 	};
		// }

		// task.m1 = 1;
		// await task.save();
		// await task.load();
		return {
			errcode: 0,
		};
	}


	// 获取签到
	async getsignin() {

		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
		var today = global.utils.today()
		var res = await this.db.collection('qiandao').doc(this.ctx.data.uid + today).get();
		if (res.data && res.data.length > 0) {
			return {
				errcode: 0,
				data: {
					ok: "ok"
				}
			};
		}

		return {
			errcode: 0,
			data: {
				ok: "ng"
			},
		};
	}

	// 更换遛的猫
	async replacecurcat() {

		if (!this.ctx.data.uid || !this.ctx.data.did) {
			return {
				errcode: 10001,
			};
		}
		var did = this.ctx.data.did
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		user.curcat = did;
		await user.save();
		await user.load();
		await global.QueueHelper.putLog(this.db, "user_login", await user.toparam());

		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
			},
		};
	}

	// 点击当前遛的猫
	async getcurcatinfo() {

		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		var city = user.city;
		// 当前猫收益
		var persec = 0.0;
		var did = parseInt(user.curcat)
		var offlinebonus = 0
		if (did == 138) {
			// key = 'lvxingapp:todayprofit';
			// fenhong = this.db.get(key);
			// persec = fenhong / 24 / 60;
			// persec = floatval(sprintf("%.4f",fenhong / 24 / 60));
			persec = 0;
			offlinebonus = 0;
		} else {
			persec = await global.config.get("cats", "cat" + did, "cal" + (Math.min(4, user.city)));
			persec = parseInt(persec)
			offlinebonus = Math.floor(persec * 0.2 * 100) / 100;
		}

		var name = await global.config.get("cats", "cat" + did, "name");
		var catinfo = {
			"lvl": did,
			"persec": persec,
			"name": name,
			"offlinebonus": offlinebonus,
		};

		return {
			errcode: 0,
			data: {
				"catinfo": catinfo,
			},
		};
	}

	// 获取限时分红猫信息
	async getxscatinfo() {

		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		// var key = 'lvxingapp:todayprofit';
		// var persec = this.db.get(key) / 24 / 60 / 60;

		var fenhong = await global.config.get("globalinfo", "todayprofit");
		var persec = Math.floor(fenhong / 24 / 60 / 60 * 10000) / 10000;

		return {
			errcode: 0,
			data: {
				persec: persec,
			}
		};
	}

	// 五大洲猫合成永久分红猫
	async finalhecheng() {

		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		var obj = {
			"238": {
				"can": false,
				"pos": 0
			},
			"338": {
				"can": false,
				"pos": 0
			},
			"438": {
				"can": false,
				"pos": 0
			},
			"538": {
				"can": false,
				"pos": 0
			},
			"638": {
				"can": false,
				"pos": 0
			}
		};
		
		for (let key in obj) {
			for (var i = 1; i <= 12; i++) {
				var s = user['poscatlvl' + i];
				s = parseInt(s);
				if (key == '' + s) {
					obj[key]['can'] = true;
					obj[key]['pos'] = i;
				}
			}
		}
		
		for (let key in obj) {
			if (!obj[key]['can']) {
				return {errcode: 10037};
			}
		}
		
		for (let key in obj) {
			var j = obj[key]['pos']
			user['posfen' + j] = 0
			user['posexpiretime' + j] = -1
			user['poscatlvl' + j] = 0
		}
		
		var pos = await global.RoomLogic.findpos(this.db, this.ctx.data.uid,user);
		user['poscatlvl' + pos] = 1038
		user['posexpiretime' + pos] = -1
		user['posfen' + pos] = 0
		
		await user.save();
		await user.load();

		var fenhongcat = await global.FenhongCatLogic.loadfenhongcat(this.db, this.ctx.data.uid);
		await fenhongcat.shangcat();
		// 记录下库
		var time = Math.floor(Date.now() / 1000);
		var msg = {
			_id: this.ctx.data.uid + '_' + time,
			uid: this.ctx.data.uid,
			nickname: user.nickname,
			createtime: time,
		};
		await global.QueueHelper.putLog(this._db, "user_getfenhongcatrecord", msg);
		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
				room: await global.RoomLogic.loadroom(this.db, this.ctx.data.uid, Math.min(4, user.city)),
			},
		};
	}

	//  谁什么时候获得了分红猫
	async getfenhongcatrecord() {

		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		var fenhongcat = await global.FenhongCatLogic.loadfenhongcat(this.db, this.ctx.data.uid);
		const res = await global.FenhongCatLogic.loadgetfenhongcatrecord(this.db);
		var todayGet = await global.config.get("globalinfo", "todayprofit");
		return {
			errcode: 0,
			data: {
				"fenhongcat": await fenhongcat.toparam(),
				"gonggao": res,
				"todayGet": todayGet,
				"user": await user.toparam(),
			},
		};
	}

	// 分红猫分红记录
	async loadfenhongcat() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		var record = await global.FenhongCatLogic.loadfenhongdcatrecord(this.db, 100);;

		return {
			errcode: 0,
			data: {
				record: record,
			},
		};
	}

	// 在线时长
	async onlinetime() {

		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		var task = await global.DialytaskLogic.loadtask(this.db, this.ctx.data.uid);
		if (task._id == 0) // 创建任务
		{
			task.uid = this.ctx.data.uid;
			task._id = await global.DialytaskLogic.getkey(this.ctx.data.uid);
		}

		var debug = await global.config.get("debug");
		if (Math.floor(Date.now() / 1000) - task.heartbeat < 60) {
			return {
				errcode: 0,
				data: []
			};
		}

		task.onlinetime += 1;
		task.heartbeat = Math.floor(Date.now() / 1000);
		await task.save();
		await task.load();

		// if (task.onlinetime >= 30) {
		// 	task.m2 = 1;
		// 	await task.save();
		// 	await task.load();
		// }

		// 好友活跃 判断实名
		if (user.isauthentication == 1) {
			await global.FriendActiveLogic.addcount(this.db, this.ctx.data.uid, "onlinetime");
		}

		await task.shangtodaydata('todayonlinetime');
		user.lastonlinetime = Math.floor(Date.now() / 1000);
		await user.save();
		await user.load();
		await global.QueueHelper.putLog(this.db, "user_login", await user.toparam());

		return {
			errcode: 0,
			data: {
				"task": await task.toparam(),
				user: await user.toparam(),
			},
		};
	}

	// 领取离线收益
	async lingquofflinebonus() {

		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}
		
		//判断广告后是双倍还是关闭
		if (!this.ctx.data.type) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}


		var offlinebonus = 0
		var offlinedata = await this.db.collection('offlinebonus').doc(this.ctx.data.uid).get();
		if (offlinedata.data.length > 0) {
			offlinebonus = offlinedata.data[0]['offlinebonus']
			await this.db.collection('offlinebonus').doc(this.ctx.data.uid).remove();
		}

		if (offlinebonus > 0) {
			
			if(parseInt(this.ctx.data.type) == 1){
				offlinebonus = offlinebonus/2;
			}
			await user.shangcoin(offlinebonus, false, "离线收益");
			user.lastonlinetime = Math.floor(Date.now() / 1000);
			await user.save();
			// await user.load();
		}

		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
				coin: offlinebonus,
			}
		};
	}

	// 获取离线收益数值
	async getofflinebonus() {

		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
		var offlinebonus = 0
		var offlinedata = await this.db.collection('offlinebonus').doc(this.ctx.data.uid).get();
		if (offlinedata.data.length > 0) {
			offlinebonus = offlinedata.data[0]['offlinebonus']
		}

		return {
			errcode: 0,
			data: {
				offlinebonus: offlinebonus,
			}
		};
	}

	// 获取剩余看视频次数或者剩余多长时间可以看
	async reducevideocount() {

		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		var quancount = await global.RouletteLogic.getquancount(this.db, this.ctx.data.uid);
		if (quancount <= 0) {
			return {
				errcode: 10038,
			};
		}
		var lastvideotime = 0
		var lasttimedata = await this.db.collection('lastvideotimes').doc(this.ctx.data.uid).get();
		if (lasttimedata.data.length > 0) {
			lastvideotime = parseInt(lasttimedata.data[0].time)
		}
		var now = Math.floor(Date.now() / 1000);
		console.log("lastvideotime", lastvideotime)
		if (lastvideotime + 60 > now) {
			return {
				errcode: 10047,
				msg: "还有" + (lastvideotime + 60 - now) + "秒才可以看视频"
			};
		}
		return {
			errcode: 0,
			data: {
				"quancount": quancount,
				user: await user.toparam(),
			},
		};
	}

	// 限时分红猫提示
	async xscattip() {

		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		var xscat = await global.XSCatLogic.loadxscat(this.db, this.ctx.data.uid);
		var totaltime = 0;
		var totalfen = 0;
		if (xscat.time > 0) {
			totaltime = xscat.time;
			totalfen = xscat.fen;
			await global.XSCatLogic.remove(this.db, this.ctx.data.uid);
		}

		return {
			errcode: 0,
			data: {
				totaltime: totaltime,
				totalfen: totalfen,
			}
		};
	}



	async loadcatrank() {

		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		var count = 20
		if (this.ctx.data.count) {
			count = parseInt(this.ctx.data.count)
		}
		var page = 0
		if (this.ctx.data.page) {
			page = parseInt(this.ctx.data.page) - 1
		}

		const dbCmd = this.db.command
		let res = await this.db.collection('userinfo').where({
			fenhongrank: dbCmd.not(dbCmd.eq(0))
		}).orderBy("fenhongrank", "desc").skip(page * count).limit(count).get();
		var res1 = await this.db.collection('userinfo').where({
			fenhongrank: dbCmd.not(dbCmd.eq(0))
		}).count()
		var ranklist = [];
		var myscore = 0;
		var myrank = 0
		if (res.data && res.data.length > 0) {
			var fangda = await global.config.get('fangda') || 1000;
			for (var i = 0; i < res.data.length; i++) {
				var tmp = {};
				var userinfo = res.data[i]
				var name = ''
				if (userinfo.maxlvl == '38') {
					name = await global.config.get("cats", "cat338", "name");
				} else {
					name = await global.config.get("cats", "cat" + userinfo.maxlvl, "name");
				}
				tmp['cat'] = name + 'LV' + userinfo.maxlvl;
				tmp['avatar'] = userinfo.avatar;
				tmp['shouyi'] = Number(userinfo['fenhongrank']) / fangda;
				tmp['uid'] = userinfo._id;
				tmp['name'] = userinfo.nickname;
                console.log(tmp)
				ranklist.push(tmp)

				if (userinfo._id == this.ctx.data.uid) {
					myrank = i + 1 + page * count;
					myscore = Number(userinfo['fenhongrank']) / fangda;
				}
			}
		}
		return {
			errcode: 0,
			data: {
				"rank": ranklist,
				"total": res1['total'],
				"myrank": myrank,
				"myscore": myscore,
				"page": page + 1
			},
		};
	}

	async loadcoinrank() {

		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		var count = 20
		if (this.ctx.data.count) {
			count = parseInt(this.ctx.data.count)
		}
		var page = 0
		if (this.ctx.data.page) {
			page = parseInt(this.ctx.data.page) - 1
		}
		const dbCmd = this.db.command
		const $ = dbCmd.aggregate
		let res = await this.db.collection('userinfo').aggregate().match({
			coin: dbCmd.not(dbCmd.eq("0"))
		}).addFields({coinlength:$.strLenCP('$coin')}).sort({coinlength:-1,coin:-1}).skip(page * count).limit(count).end();
		var res1 = await this.db.collection('userinfo').where({
			coin: dbCmd.not(dbCmd.eq("0"))
		}).count()
		console.log('查询结果')
		console.log(res)
		var ranklist = [];
		if (res.data && res.data.length > 0) {
			var fangda = await global.config.get('fangda') || 1000;
			for (var i = 0; i < res.data.length; i++) {
				var tmp = {};
				var user = res.data[i]
				var name = ''
				if (user.maxlvl == '38') {
					name = await global.config.get("cats", "cat338", "name");
				} else {
					name = await global.config.get("cats", "cat" + user.maxlvl, "name");
				}
				tmp['cat'] = name + 'LV' + user.maxlvl;
				tmp['avatar'] = user.avatar;
				tmp['coin'] = user['coin'];
				tmp['uid'] = user._id;
				tmp['name'] = user.nickname;
				ranklist.push(tmp)
			}
		}

		return {
			errcode: 0,
			data: {
				"rank": ranklist,
				"total": res1['total'],
				"page": page + 1
			},
		};

	}
    
    // 现金红包排行榜
    async loadrmbrank() {
    
    	if (!this.ctx.data.uid) {
    		return {
    			errcode: 10001,
    		};
    	}
    
    	var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
    	if (user._id == 0) {
    		return {
    			errcode: 10005,
    		};
    	}
        
        var count = 20
        if (this.ctx.data.count) {
        	count = parseInt(this.ctx.data.count)
        }
        var page = 0
        if (this.ctx.data.page) {
        	page = parseInt(this.ctx.data.page) - 1
        }
        
    
    	const dbCmd = this.db.command
    	let res = await this.db.collection('userinfo').where({
    		rmbrank: dbCmd.not(dbCmd.eq(0))
    	}).orderBy("rmbrank", "desc").skip(page * count).limit(count).get();
        var res1 = await this.db.collection('userinfo').where({
        	rmbrank: dbCmd.not(dbCmd.eq(0))
        }).count()
    	var ranklist = [];
    	if (res.data && res.data.length > 0) {
    		var fangda = await global.config.get('fangda') || 1000;
    		for (var i = 0; i < res.data.length; i++) {
    			var tmp = {};
    			var userinfo = res.data[i]
    			var name = ''
    			if (userinfo.maxlvl == '38') {
    				name = await global.config.get("cats", "cat338", "name");
    			} else {
    				name = await global.config.get("cats", "cat" + userinfo.maxlvl, "name");
    			}
    			tmp['cat'] = name + 'LV' + userinfo.maxlvl;
    			tmp['avatar'] = userinfo.avatar;
    			tmp['shouyi'] = Number(userinfo['rmbrank']) / fangda;
    			tmp['uid'] = userinfo._id;
    			tmp['name'] = userinfo.nickname;
    			ranklist.push(tmp)
    		}
    	}
    
    	return {
    		errcode: 0,
    		data: {
    			"rank": ranklist,
                "total": res1['total'],
                "page": page + 1
    		},
    	};
    }
	
	
	
	// 广告回调
	async getvideocallback() {
	
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}
		if (!this.ctx.data.reward_name) {
			return {
				errcode: 10001,
			};
		}
		if (!this.ctx.data.videotime) {
			return {
				errcode: 10001,
			};
		}
		
		var user = await global.UserLogic.loaduser(this.db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
	    var list = await this.db.collection('videocallback').where({videotime:this.ctx.data.videotime,uid:this.ctx.data.uid,reward_name:this.ctx.data.reward_name}).get()
	
		return {
			errcode: 0,
			data: list.data,
		};
	}
}
