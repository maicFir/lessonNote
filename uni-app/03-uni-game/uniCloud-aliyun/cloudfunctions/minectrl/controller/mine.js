const {Controller} = require('uni-cloud-router')
const createConfig = require('uni-config-center')
const uniPayConfig = createConfig({pluginId: 'uni-pay'})
const global = require("globalunit");
const wxpay = require("wxpay");
module.exports = class MineController extends Controller {
	
	async getmyinfo() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}
		var user = await global.UserLogic.loaduser(this._db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
		return {
			errcode: 0,
			data: {
				user: await user.toparam()
			}
		};
	}

	async getyaoqing() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}
		var user = await global.UserLogic.loaduser(this._db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}
		// var team1 = await this.ctx.uniID.getInvitedUser({
		// 	uid: this.ctx.data.uid,
		// 	level: 1,
		// 	limit: 1,
		// 	offset: 0,
		// 	needTotal: true
		// })
		// var team2 = await this.ctx.uniID.getInvitedUser({
		// 	uid: this.ctx.data.uid,
		// 	level: 2,
		// 	limit: 1,
		// 	offset: 0,
		// 	needTotal: true
		// })
		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
				total1: user.zhituifriend,
				total2: user.kuosanfriend
			}
		};
	}

	//身份验证
	async authentication() {
		if (!this.ctx.data.uid || !this.ctx.data.idcard || !this.ctx.data.realname) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this._db, this.ctx.data.uid);
		if (user._id == 0) {
			return {
				errcode: 10005,
			};
		}

		// if (user.idcard != '') {
		// 	return {
		// 		errcode: 30001,
		// 	};
		// }

		// if (user.realname != '') {
		// 	return {
		// 		errcode: 30001,
		// 	};
		// }

		user.idcard = this.ctx.data.idcard;
		user.realname = this.ctx.data.realname;
		if(user.isauthentication != 1){
			user.isauthentication = 1;
			await user.save()
			if(user.shangji != 0){
				var sjuser = await global.UserLogic.loaduser(this._db, user.shangji);
				sjuser.zhituifriend += 1
				await sjuser.save()
				if(sjuser.shangji != 0){
					var ssjuser = await global.UserLogic.loaduser(this._db, sjuser.shangji);
					ssjuser.kuosanfriend += 1
					await ssjuser.save()
				}
				user.isadd = 1;
			}
			await global.FriendActiveLogic.addcount(this._db, this.ctx.data.uid, "friendcount");
		}
		user.isauthentication = 1;
		await user.save()
		await user.load()
		
		return {
			errcode: 0,
			data: {
				user: await user.toparam()
			}
		};
	}
	
	//微信提现
	async withdraw() {
		if (!this.ctx.data.uid || !this.ctx.data.amount) {
			return {
				errcode: 10001,
			};
		}

		var amount = parseFloat(this.ctx.data.amount);
		if (amount != 0.3 && amount != 20 && amount != 50 && amount != 100 && amount != 500 && amount != 1000) {
			return {
				errcode: 10028,
			};
		}

		var user = await global.UserLogic.loaduser(this._db, this.ctx.data.uid);
		if (user._id == 0 || user._id != this.ctx.data.uid) {
			return {
				errcode: 10005,
			};
		}
        
        if (user.realname == '') {
        	return {
        		errcode: 10018,
        	};
        }

		// 判断是不是首次提现   首次不收手续费
		var commissionbili = 0;
		if (user.isfirstwithdraw == 0) {
			commissionbili = await global.config.get("withdraw", "commission") / 100;
		}

		var commission = Math.floor(amount * commissionbili * 100) / 100;
		var realamount = amount - commission;
		var fangda = await global.config.get("fangda");
		if (user.fen < amount * fangda) {
			return {
				errcode: 10012,
			};
		}

		var tixiantype = await global.config.get('tixiantype','type')
        
        if(tixiantype == 'zhifubao'){
            if(user.zhifubao == ''){
                return {
                	errcode: 10052,
                };
            }
            // 判断是否已经申请提现
            const res = await this.db.collection('withdrawrecord_log').where({
            	uid: this.ctx.data.uid,
            	status: 0,
            }).get();
                        
            if (res.data && res.data.length > 0) {
            	return {
            		errcode: 10011,
            	};
            }
                        
            await user.xiafen(amount);
            if (user.isfirstwithdraw == 1) {
            	user.isfirstwithdraw = 0;
            }
            await user.save();
            await user.load();
            var up = await user.toparam();
            // 提交申请
            var msg = {
            	"uid": this.ctx.data.uid,
            	"count": amount,
            	"commission": commission,
            	"balance": up["fen"],
            	"status": 0,
               "msg":"",
               "type":"zhifubao",
            	"createtime": Math.floor(Date.now() / 1000),
            };
                        
            await global.QueueHelper.putLog(this.db, "withdrawrecord_log", msg);
        }else{
			if(user.openid == ''){
			    return {
			    	errcode: 10053,
			    };
			}
            if (amount != 0.3) {
            	// 判断是否已经申请提现
            	const res = await this.db.collection('withdrawrecord_log').where({
            		uid: this.ctx.data.uid,
            		status: 0,
            	}).get();
            
            	if (res.data && res.data.length > 0) {
            		return {
            			errcode: 10011,
            		};
            	}
            
            	await user.xiafen(amount);
            	if (user.isfirstwithdraw == 1) {
            		user.isfirstwithdraw = 0;
            	}
            	await user.save();
            	await user.load();
            	var up = await user.toparam();
            
            	// await global.QueueHelper.putLog(this.db, "user_login",up);
            	// 提交申请
            	var msg = {
            		"uid": this.ctx.data.uid,
            		"count": amount,
            		"commission": commission,
            		"balance": up["fen"],
            		"status": 0,
                  "msg":"",
                  "type":"wechat",
            		"createtime": Math.floor(Date.now() / 1000),
            	};
            
            	await global.QueueHelper.putLog(this.db, "withdrawrecord_log", msg);
            } else {
            	// TODO : 微信提现接口  返回成功之后  扣用户fen
            	// 通过code获取openid
            	if (user.isfirstwithdraw == 0) {
            		return {
            			errcode: 10042,
            		};
            	}
            
            	if (user.realname == '') {
            		return {
            			errcode: 10018,
            		};
            	}
				const config = {
					appid:uniPayConfig.config('app.weixin.appid') , //公众号id
					mchid:uniPayConfig.config('app.weixin.mchid') , //商户id
					partnerKey: uniPayConfig.config('app.weixin.partnerKey'), //安全密钥
					pfx: wxpay.fs.readFileSync(wxpay.path.resolve(__dirname, "apiclient_cert.p12")),
					notify_url:"",
					spbill_create_ip: 'IP地址'
				};
				
            	// const api = new tenpay(config);
            	// 调试模式(传入第二个参数为true, 可在控制台输出数据)
            	const api = new wxpay.tenpay(config, true);
            
            	let date = Date.now();
            	let rund = Math.ceil(date / 1000);
            	let partner = rund + '' + user.inviteCode;
            	console.log(' ceshi jin lai  99999--partner--->' + partner)
            	let result = await api.transfers({
            		partner_trade_no: partner, //订单号
            		openid: user.openid,
            		re_user_name: user.realname, //真实姓名
            		amount: Math.round(amount*100),
            		desc: '企业付款描述信息'
            	});
            	console.log(' ceshi jin lai  88888----->')
            	console.log(result)
            
            	if (result['return_code'] == 'SUCCESS' && result['result_code'] == 'SUCCESS') {
            		await user.xiafen(realamount);
            		if (user.isfirstwithdraw == 1) {
            			user.isfirstwithdraw = 0;
            		}
            		await user.save();
            		await user.load();
            		var up = await user.toparam();
            		// await global.QueueHelper.putLog(this.db, "user_login",up);
            
            		await global.QueueHelper.profitrecord(this.db, user._id, 0.3, up['fen'], '提现成功', 11);
            		var msg = {
            			"uid": this.ctx.data.uid,
            			"count": amount,
            			"commission": commission,
            			"balance": up["fen"],
            			"status": 1,
                     "msg":"",
                     "type":"wechat",
            			"createtime": Math.floor(Date.now() / 1000),
            		};
            		
            		await global.QueueHelper.putLog(this.db, "withdrawrecord_log", msg);
            	} else {
            		return {
            			errcode: 10042,
            		};
            	}
            }
        }
		return {
			'errcode': 0,
			"data": {
				"user": await user.toparam(),
				"amount": amount,
				"commission": commission
			}
		};
	}

	async ceshihuidiao() {
		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		console.log('ce shi  hui diao  打快成功？ --->')
		return {
			errcode: 0,
		};
	}

	async getwithdrawrecord() {

		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this._db, this.ctx.data.uid);
		if (user._id == 0 || user._id != this.ctx.data.uid) {
			return {
				errcode: 10005,
			};
		}

		var limit = this.ctx.data.limit || 20;
		var res = await this.db.collection('withdrawrecord_log').where({
			uid: this.ctx.data.uid,
		}).limit(limit).get();

		var count = await this.db.collection('withdrawrecord_log').where({
			uid: this.ctx.data.uid,
		}).count();

		return {
			'errcode': 0,
			"data": {
				"record": res.data,
				'totalcount': count,
			}
		};
	}

	async getprofitrecord() {

		if (!this.ctx.data.uid) {
			return {
				errcode: 10001,
			};
		}

		var user = await global.UserLogic.loaduser(this._db, this.ctx.data.uid);
		if (user._id == 0 || user._id != this.ctx.data.uid) {
			return {
				errcode: 10005,
			};
		}

		var limit = this.ctx.data.limit || 20;
		var res = await this.db.collection('user_profitrecord').where({
			uid: this.ctx.data.uid,
		}).limit(limit).get();

		var count = await this.db.collection('user_profitrecord').where({
			uid: this.ctx.data.uid,
		}).count();

		return {
			'errcode': 0,
			"data": {
				"record": res.data,
				'totalcount': count,
			}
		};
	}

	async videoCallBack() {
		if (!this.ctx.data.uid || !this.ctx.data.reward_amount || !this.ctx.data.reward_name) {
			return {
				errcode: 10001,
			};
		}
		var user = await global.UserLogic.loaduser(this._db, this.ctx.data.uid);
		if (user._id == 0 || user._id != this.ctx.data.uid) {
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
		var res = await this.db.collection('lastvideotimes').doc(this.ctx.data.uid).update({
			time: Math.floor(Date.now() / 1000)
		})
		if (res.updated != 1) {
			await this.db.collection('lastvideotimes').doc(this.ctx.data.uid).set({
				time: Math.floor(Date.now() / 1000)
			})
		}
		// 减视频次数
		await global.RouletteLogic.addquan(this.db, this.ctx.data.uid);
		var reward_name = this.ctx.data.reward_name
		var coin = "0"
		if (reward_name == "抽奖次数") {
			await global.RouletteLogic.clearcount(this.db, this.ctx.data.uid);
		} else if (reward_name == "金币") {
			// var time = await global.config.get("globalinfo", "videocoin");
			// var grow = await global.Decimal.multipliedBy(user.persec, time);
			// var c = await global.Decimal.add(grow, 0);
			// coin = c
			// await user.shangcoin(c,false,"视频收益")
			// await user.save()
			// await user.load()
			
			var lvl = user.maxlvl
			if(lvl<1){
				lvl = 1
			}
			if(lvl>37){
				lvl = 37
			}
			// var grow = await global.config.get("cats","cat"+lvl,"price");
			// var c = await global.Decimal.add(grow, 0);
			
			
			var catinfo = await global.CatLogic.loadcat(this.db, this.ctx.data.uid);
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
			
			coin = price+""
			await user.shangcoin(price+"",false,"视频收益")
			await user.save()
			await user.load()
		} else if (reward_name == "5倍奖励") {
			await global.RouletteLogic.setrolltimes(this.db, this.ctx.data.uid, 5);
		} else if (reward_name == "10倍奖励") {
			await global.RouletteLogic.setrolltimes(this.db, this.ctx.data.uid, 10);
		} else if (reward_name == "离线收益") {
			var offlinedata = await this.db.collection('offlinebonus').doc(this.ctx.data.uid).get();
			if (offlinedata.data.length > 0) {
				var offlinebonus = parseInt(offlinedata.data[0]['offlinebonus']) * 2
				await this.db.collection('offlinebonus').doc(this.ctx.data.uid).update({
					offlinebonus: offlinebonus
				});
				coin = offlinebonus+''
			}
		}

		if (user.isauthentication == 1) {
			await global.FriendActiveLogic.addcount(this.db, this.ctx.data.uid, "videocount");
		}
		await global.BideLogic.addcount(this.db, this.ctx.data.uid, 'videocount', 1);

		// var task = await global.DialytaskLogic.loadtask(this.db, this.ctx.data.uid);
		// await task.shangtodaydata('todayvideocount');
		// await task.save()
		user.videocount = user.videocount + 1;
		await user.save()
		await user.load()
		await global.QueueHelper.putLog(this.db, "user_login", await user.toparam());
		return {
			errcode: 0,
			data: {
				user: await user.toparam(),
				reward_name:reward_name,
				coin:coin
			},
		};
	}
}
